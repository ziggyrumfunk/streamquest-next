"use client";

import { useEffect, useState } from "react";
import { shortformQuests, type ShortformQuest } from "@/data/shortform";

/**
 * The quest a creator arrived from, taken from ?quest=<slug>. Null on a
 * direct visit. Read after mount rather than from searchParams on the
 * server, so the guide itself stays a static page.
 */
export function useQuestContext(): ShortformQuest | null {
  const [quest, setQuest] = useState<ShortformQuest | null>(null);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("quest");
    if (slug && Object.prototype.hasOwnProperty.call(shortformQuests, slug)) {
      setQuest(shortformQuests[slug]);
    }
  }, []);

  return quest;
}
