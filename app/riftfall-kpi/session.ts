/**
 * Shared-password session helpers for the RIFTFALL KPI report.
 * Password is "riftwalker" by default; override via RIFTFALL_KPI_PASSWORD env var.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const RF_KPI_COOKIE = "riftfall_kpi_session";

export function getPassword(): string {
  return process.env.RIFTFALL_KPI_PASSWORD || "riftwalker";
}

export function sign(): string {
  return createHmac("sha256", getPassword()).update("riftfall-kpi-access").digest("hex");
}

export function isUnlocked(): boolean {
  try {
    const val = cookies().get(RF_KPI_COOKIE)?.value;
    if (!val) return false;
    const a = Buffer.from(val);
    const b = Buffer.from(sign());
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
