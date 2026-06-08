/**
 * Shared-password session helpers for the House Flipper Remastered KPI report.
 * Password is "flipper" by default; override via HOUSE_FLIPPER_KPI_PASSWORD env var.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const HOUSE_FLIPPER_KPI_COOKIE = "house_flipper_kpi_session";

export function getPassword(): string {
  return process.env.HOUSE_FLIPPER_KPI_PASSWORD || "flipper";
}

export function sign(): string {
  return createHmac("sha256", getPassword()).update("house-flipper-kpi-access").digest("hex");
}

export function isUnlocked(): boolean {
  try {
    const val = cookies().get(HOUSE_FLIPPER_KPI_COOKIE)?.value;
    if (!val) return false;
    const a = Buffer.from(val);
    const b = Buffer.from(sign());
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
