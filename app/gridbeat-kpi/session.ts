/**
 * Shared-password session helpers for the GRIDbeat KPI report.
 * Password is "gridbeat" by default; override via GRIDBEAT_KPI_PASSWORD env var.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const GRIDBEAT_KPI_COOKIE = "gridbeat_kpi_session";

export function getPassword(): string {
  return process.env.GRIDBEAT_KPI_PASSWORD || "gridbeat";
}

export function sign(): string {
  return createHmac("sha256", getPassword()).update("gridbeat-kpi-access").digest("hex");
}

export function isUnlocked(): boolean {
  try {
    const val = cookies().get(GRIDBEAT_KPI_COOKIE)?.value;
    if (!val) return false;
    const a = Buffer.from(val);
    const b = Buffer.from(sign());
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
