/**
 * Shared-password session helpers for the Alpha Nomos KPI report.
 * Password is "nomos" by default; override via ALPHA_NOMOS_KPI_PASSWORD env var.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const NOMOS_KPI_COOKIE = "alpha_nomos_kpi_session";

export function getPassword(): string {
  return process.env.ALPHA_NOMOS_KPI_PASSWORD || "nomos";
}

export function sign(): string {
  return createHmac("sha256", getPassword()).update("alpha-nomos-kpi-access").digest("hex");
}

export function isUnlocked(): boolean {
  try {
    const val = cookies().get(NOMOS_KPI_COOKIE)?.value;
    if (!val) return false;
    const a = Buffer.from(val);
    const b = Buffer.from(sign());
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
