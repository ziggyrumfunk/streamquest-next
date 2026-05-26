/**
 * Shared-password session helpers for the Temtem Swarm KPI report.
 * Password is "1minus1" by default; override via TEMTEM_KPI_PASSWORD env var if rotated.
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const TEMTEM_KPI_COOKIE = "tem_kpi_session";

export function getPassword(): string {
  return process.env.TEMTEM_KPI_PASSWORD || "1minus1";
}

export function sign(): string {
  return createHmac("sha256", getPassword()).update("temtem-kpi-access").digest("hex");
}

export function isUnlocked(): boolean {
  try {
    const val = cookies().get(TEMTEM_KPI_COOKIE)?.value;
    if (!val) return false;
    const a = Buffer.from(val);
    const b = Buffer.from(sign());
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
