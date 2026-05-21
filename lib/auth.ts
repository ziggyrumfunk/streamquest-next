/**
 * Tiny cookie-based admin session.
 *
 * - Login: compare submitted password against ADMIN_PASSWORD env var in
 *   constant time. On match, set an HTTP-only session cookie whose value
 *   is an HMAC of "admin" using ADMIN_PASSWORD as the secret.
 * - Auth check: recompute the HMAC, compare against the cookie value.
 *
 * No third-party auth provider, no database, no external deps.
 * Rotate ADMIN_PASSWORD to invalidate every session.
 */

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "sq_admin_session";

function getSecret(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || pw.length < 4) {
    throw new Error(
      "ADMIN_PASSWORD env var is missing or too short (set it in Vercel project settings)."
    );
  }
  return pw;
}

function signSession(): string {
  return createHmac("sha256", getSecret()).update("admin").digest("hex");
}

/** Constant-time password compare to mitigate timing attacks. */
export function verifyPassword(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || !submitted) return false;
  const a = Buffer.from(submitted);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Sets the session cookie. Called from a server action after a successful login. */
export function setSessionCookie() {
  cookies().set(SESSION_COOKIE, signSession(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export function clearSessionCookie() {
  cookies().delete(SESSION_COOKIE);
}

/** Returns true if the current request has a valid admin session cookie. */
export function isAdmin(): boolean {
  try {
    const cookie = cookies().get(SESSION_COOKIE)?.value;
    if (!cookie) return false;
    const expected = signSession();
    const a = Buffer.from(cookie);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
