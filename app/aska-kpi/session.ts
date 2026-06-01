/**
 * Shared-password session helpers for the ASKA Hearth & Honey KPI report.
 * Password is "viking" by default; override via ASKA_KPI_PASSWORD env var.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ASKA_KPI_COOKIE = "aska_kpi_session";

export function getPassword(): string {
  return process.env.ASKA_KPI_PASSWORD || "viking";
}

export function sign(): string {
  return createHmac("sha256", getPassword()).update("aska-kpi-access").digest("hex");
}

export function isUnlocked(): boolean {
  try {
    const val = cookies().get(ASKA_KPI_COOKIE)?.value;
    if (!val) return false;
    const a = Buffer.from(val);
    const b = Buffer.from(sign());
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
