/**
 * Shared-password session helpers for the GHmarketing proposal page.
 * Password is "chosenone" by default; override via GHM_PASSWORD env var if rotated.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const GHM_COOKIE = "ghm_session";

export function getPassword(): string {
  return process.env.GHM_PASSWORD || "chosenone";
}

export function sign(): string {
  return createHmac("sha256", getPassword()).update("ghm-access").digest("hex");
}

export function isUnlocked(): boolean {
  try {
    const val = cookies().get(GHM_COOKIE)?.value;
    if (!val) return false;
    const a = Buffer.from(val);
    const b = Buffer.from(sign());
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
