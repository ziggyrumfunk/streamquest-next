/**
 * Shared-password session helpers for the Good Heavens! KPI report.
 * Password is "raar" by default; override via GOOD_HEAVENS_KPI_PASSWORD env var.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const GOOD_HEAVENS_KPI_COOKIE = "good_heavens_kpi_session";

export function getPassword(): string {
  return process.env.GOOD_HEAVENS_KPI_PASSWORD || "raar";
}

export function sign(): string {
  return createHmac("sha256", getPassword()).update("good-heavens-kpi-access").digest("hex");
}

export function isUnlocked(): boolean {
  try {
    const val = cookies().get(GOOD_HEAVENS_KPI_COOKIE)?.value;
    if (!val) return false;
    const a = Buffer.from(val);
    const b = Buffer.from(sign());
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
