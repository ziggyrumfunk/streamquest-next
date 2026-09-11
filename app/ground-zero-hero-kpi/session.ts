/**
 * Shared-password session helpers for the Ground Zero Hero KPI report.
 * Password is "zerohero" by default; override via GROUND_ZERO_HERO_KPI_PASSWORD env var.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const GZH_KPI_COOKIE = "gzh_kpi_session";

export function getPassword(): string {
  return process.env.GROUND_ZERO_HERO_KPI_PASSWORD || "zerohero";
}

export function sign(): string {
  return createHmac("sha256", getPassword()).update("ground-zero-hero-kpi-access").digest("hex");
}

export function isUnlocked(): boolean {
  try {
    const val = cookies().get(GZH_KPI_COOKIE)?.value;
    if (!val) return false;
    const a = Buffer.from(val);
    const b = Buffer.from(sign());
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
