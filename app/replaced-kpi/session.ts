/**
 * Shared-password session helpers for the REPLACED KPI report.
 * Password is "replaced" by default; override via REPLACED_KPI_PASSWORD env var.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const REPLACED_KPI_COOKIE = "replaced_kpi_session";

export function getPassword(): string {
  return process.env.REPLACED_KPI_PASSWORD || "replaced";
}

export function sign(): string {
  return createHmac("sha256", getPassword()).update("replaced-kpi-access").digest("hex");
}

export function isUnlocked(): boolean {
  try {
    const val = cookies().get(REPLACED_KPI_COOKIE)?.value;
    if (!val) return false;
    const a = Buffer.from(val);
    const b = Buffer.from(sign());
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
