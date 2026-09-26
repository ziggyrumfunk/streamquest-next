/**
 * Shared-password session helpers for the Abstraction marketing proposal.
 * Password is "warstories" by default (any capitalisation); override via the
 * ABSTRACTION_PASSWORD env var if it needs rotating.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ABX_COOKIE = "abx_session";
export const ABX_PATH = "/proposals/abstraction";

export function getPassword(): string {
  return (process.env.ABSTRACTION_PASSWORD || "warstories").trim().toLowerCase();
}

/** Forgiving comparison: ignores surrounding spaces and capitalisation. */
export function passwordMatches(input: string): boolean {
  return input.trim().toLowerCase() === getPassword();
}

export function sign(): string {
  return createHmac("sha256", getPassword()).update("abx-access").digest("hex");
}

export function isUnlocked(): boolean {
  try {
    const val = cookies().get(ABX_COOKIE)?.value;
    if (!val) return false;
    const a = Buffer.from(val);
    const b = Buffer.from(sign());
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
