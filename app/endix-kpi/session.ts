/**
 * Shared-password session helpers for the Endix May Showcase KPI report.
 * Password is "expo2026" by default; override via ENDIX_KPI_PASSWORD env var.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ENDIX_KPI_COOKIE = "endix_kpi_session";

export function getPassword(): string {
  return process.env.ENDIX_KPI_PASSWORD || "expo2026";
}

export function sign(): string {
  return createHmac("sha256", getPassword()).update("endix-kpi-access").digest("hex");
}

export function isUnlocked(): boolean {
  try {
    const val = cookies().get(ENDIX_KPI_COOKIE)?.value;
    if (!val) return false;
    const a = Buffer.from(val);
    const b = Buffer.from(sign());
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
