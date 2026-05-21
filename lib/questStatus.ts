/**
 * Merges the static quest list from data/quests.ts with the live status
 * overrides stored in Vercel KV.
 *
 * KV schema:
 *   key:   STATUS_KEY ("quest:status:overrides")
 *   value: { [slug]: "active" | "completed" }   (Record<string, QuestStatus>)
 *
 * A slug missing from the override map keeps the status declared in
 * data/quests.ts. The admin panel writes to this same map.
 */

import { unstable_cache, revalidateTag } from "next/cache";
import { kvGet, kvSet } from "./kv";
import { quests as staticQuests, type Quest, type QuestStatus } from "@/data/quests";

export const STATUS_KEY = "quest:status:overrides";
export const STATUS_TAG = "quest-status";

export type StatusOverrides = Record<string, QuestStatus>;

/**
 * Cached reader so the homepage and Header don't hit KV on every request.
 * Admin actions call revalidateTag(STATUS_TAG) after writes to bust this.
 */
const getStatusOverridesCached = unstable_cache(
  async (): Promise<StatusOverrides> => {
    return (await kvGet<StatusOverrides>(STATUS_KEY)) ?? {};
  },
  ["quest-status-overrides"],
  { tags: [STATUS_TAG] }
);

/** Direct (uncached) read. Use in admin reads where you want fresh data. */
export async function getStatusOverrides(): Promise<StatusOverrides> {
  return (await kvGet<StatusOverrides>(STATUS_KEY)) ?? {};
}

export async function setQuestStatus(slug: string, status: QuestStatus): Promise<boolean> {
  const current = await getStatusOverrides();
  const next: StatusOverrides = { ...current, [slug]: status };
  const ok = await kvSet(STATUS_KEY, next);
  if (ok) {
    revalidateTag(STATUS_TAG);
  }
  return ok;
}

/** Returns all quests with status patched from the override map. */
export async function getQuestsWithLiveStatus(): Promise<Quest[]> {
  const overrides = await getStatusOverridesCached();
  return staticQuests.map((q) => {
    const override = overrides[q.slug];
    if (override && override !== q.status) {
      return { ...q, status: override };
    }
    return q;
  });
}

export async function getActiveQuestsLive(): Promise<Quest[]> {
  return (await getQuestsWithLiveStatus()).filter((q) => q.status === "active");
}

export async function getCompletedQuestsLive(): Promise<Quest[]> {
  return (await getQuestsWithLiveStatus()).filter((q) => q.status === "completed");
}
