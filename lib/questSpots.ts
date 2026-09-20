/**
 * "Spots remaining" for quests with a limited number of places.
 *
 * The numbers live in Vercel KV so the team can update them from /admin
 * without a deploy. A quest brief shows the counter only when a valid value
 * is stored; with nothing stored it falls back to plain "limited spots"
 * wording. A counter nobody maintains is worse than no counter, so there is
 * deliberately no default in code.
 *
 * KV schema:
 *   key:   SPOTS_KEY ("quest:spots")
 *   value: { [slug]: { total, left, updatedAt } }
 */

import { unstable_cache, revalidateTag } from "next/cache";
import { kvGet, kvSet } from "./kv";

export const SPOTS_KEY = "quest:spots";
export const SPOTS_TAG = "quest-spots";

export type QuestSpots = {
  total: number;
  left: number;
  /** ISO timestamp of the last save, shown next to the counter. */
  updatedAt: string;
};

export type SpotsMap = Record<string, QuestSpots>;

/** True for whole numbers that make sense together: total 1+, left 0..total. */
export function isValidSpots(total: number, left: number): boolean {
  return Number.isInteger(total) && Number.isInteger(left) && total >= 1 && left >= 0 && left <= total;
}

/**
 * Cached reader for the public brief. Admin writes bust it via the tag; the
 * five-minute revalidate is a safety net so one failed KV read can never
 * stick around until the next deploy.
 */
const getSpotsMapCached = unstable_cache(
  async (): Promise<SpotsMap> => (await kvGet<SpotsMap>(SPOTS_KEY)) ?? {},
  ["quest-spots"],
  { tags: [SPOTS_TAG], revalidate: 300 }
);

/** Direct (uncached) read, for the admin page. */
export async function getSpotsMap(): Promise<SpotsMap> {
  return (await kvGet<SpotsMap>(SPOTS_KEY)) ?? {};
}

/** Spots for one quest, or null when nothing valid is stored. */
export async function getQuestSpots(slug: string): Promise<QuestSpots | null> {
  const s = (await getSpotsMapCached())[slug];
  if (!s || !isValidSpots(s.total, s.left)) return null;
  return s;
}

/** Save a quest's spots, or pass null to remove the counter from its brief. */
export async function setQuestSpots(
  slug: string,
  spots: { total: number; left: number } | null
): Promise<boolean> {
  const next: SpotsMap = { ...(await getSpotsMap()) };
  if (spots) {
    next[slug] = { total: spots.total, left: spots.left, updatedAt: new Date().toISOString() };
  } else {
    delete next[slug];
  }
  const ok = await kvSet(SPOTS_KEY, next);
  if (ok) revalidateTag(SPOTS_TAG);
  return ok;
}

/** "20 Sep", for the small "updated" note beside the counter. */
export function formatSpotsDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Europe/Amsterdam" });
}
