/* ============================================================
   Short-form quests (TikTok, Instagram Reels, YouTube Shorts).

   Two kinds of data live here, and the split matters:

   1. GENERAL: the creator tiers and the per-platform qualification
      gates. These are StreamQuest's standard and apply to every
      short-form quest. Shown on /shortform-guide.

   2. PER QUEST: what each tier actually pays, and which countries
      count as priority markets. These differ per campaign, so they
      hang off the quest slug in `shortformQuests`. Shown on the
      quest's own brief, and used by the guide's tier checker when a
      creator arrives from that brief (?quest=<slug>).

   Pure data, safe to import from client components.
   ============================================================ */

export type TierName = "Bronze" | "Silver" | "Gold";

/** Median-views band per tier. The same on every platform today. */
export const viewsBand: Record<TierName, string> = {
  Bronze: "500 to 5,000",
  Silver: "5,001 to 20,000",
  Gold: "20,001+",
};

export type Gate = {
  tier: TierName;
  /** Minimum followers or subscribers. */
  audience: number;
  /** Lower bound of the median-views band. */
  viewsMin: number;
  /** Display label for the band. */
  viewsLabel: string;
  /** Minimum median like rate, percent. */
  likeRate: number;
  /** Minimum distinct genuine commenters. */
  comments: number;
};

export type Platform = {
  key: "tiktok" | "reels" | "shorts";
  label: string;
  audienceLabel: string;
  viewsLabel: string;
  gates: Gate[];
  note: string;
  /** Platform quirk a creator should know before posting. */
  extra?: string;
  /** What we ask for at Day 7 and Day 30. */
  analytics: string;
  example?: { intro: string; lines: string[]; result: string; verdict: string };
};

export const platforms: Platform[] = [
  {
    key: "tiktok",
    label: "TikTok",
    audienceLabel: "Followers",
    viewsLabel: "Median views",
    gates: [
      { tier: "Bronze", audience: 500, viewsMin: 500, viewsLabel: viewsBand.Bronze, likeRate: 3, comments: 3 },
      { tier: "Silver", audience: 2000, viewsMin: 5001, viewsLabel: viewsBand.Silver, likeRate: 3, comments: 8 },
      { tier: "Gold", audience: 5000, viewsMin: 20001, viewsLabel: viewsBand.Gold, likeRate: 2.5, comments: 15 },
    ],
    note: "All four gates count together. Passing on views alone does not set your tier.",
    analytics: "Views, likes, comments, shares, watch time, retention and audience geography.",
    example: {
      intro: "If your recent TikToks normally receive:",
      lines: ["8,500 views", "420 likes", "12 genuine commenters"],
      result: "420 ÷ 8,500 = 4.94% like rate",
      verdict: "That comfortably passes the Silver engagement requirement.",
    },
  },
  {
    key: "reels",
    label: "Instagram Reels",
    audienceLabel: "Followers",
    viewsLabel: "Median Reel views",
    gates: [
      { tier: "Bronze", audience: 500, viewsMin: 500, viewsLabel: viewsBand.Bronze, likeRate: 2.5, comments: 2 },
      { tier: "Silver", audience: 1500, viewsMin: 5001, viewsLabel: viewsBand.Silver, likeRate: 2.25, comments: 5 },
      { tier: "Gold", audience: 5000, viewsMin: 20001, viewsLabel: viewsBand.Gold, likeRate: 2, comments: 10 },
    ],
    note: "Reels often reach people who do not follow the account, so follower count alone is not enough to qualify. We care much more about whether your videos consistently reach viewers, and whether those viewers actually react to the content.",
    analytics: "Views, accounts reached, likes, comments, shares, saves, watch time, retention and audience geography.",
  },
  {
    key: "shorts",
    label: "YouTube Shorts",
    audienceLabel: "Subscribers",
    viewsLabel: "Median Short views",
    gates: [
      { tier: "Bronze", audience: 250, viewsMin: 500, viewsLabel: viewsBand.Bronze, likeRate: 2, comments: 1 },
      { tier: "Silver", audience: 750, viewsMin: 5001, viewsLabel: viewsBand.Silver, likeRate: 2, comments: 2 },
      { tier: "Gold", audience: 2000, viewsMin: 20001, viewsLabel: viewsBand.Gold, likeRate: 2, comments: 5 },
    ],
    note: "YouTube Shorts naturally receives fewer comments per view than TikTok and Instagram Reels, so the comment requirement is intentionally lower. A creator will not be penalised simply because normal interaction behaviour differs between platforms.",
    extra:
      "Links in a Shorts description are not a reliable call to action on their own. If a quest asks you to send viewers somewhere, StreamQuest provides the approved link route.",
    analytics:
      "Views, likes, comments, shares, average view duration, audience retention, viewed versus swiped-away metrics and audience geography.",
  },
];

/* ---------- Per quest ---------- */

export type Reward = {
  tier: TierName;
  /** Guaranteed base, EUR. */
  base: number;
  /** EUR per 1,000 eligible views, priority markets. */
  cpmPriority: number;
  /** EUR per 1,000 eligible views, other markets. */
  cpmOther: number;
  /** Maximum total payout, guaranteed base included. */
  max: number;
};

export type ShortformQuest = {
  slug: string;
  title: string;
  /** Path of the quest brief. */
  href: string;
  rewards: Reward[];
  priorityMarkets: string[];
};

/**
 * Creator-facing payouts only. Never put client rates or budgets in here:
 * this file ships to the browser.
 */
export const shortformQuests: Record<string, ShortformQuest> = {
  ludeo: {
    slug: "ludeo",
    title: "Ludeo",
    href: "/quests/ludeo",
    rewards: [
      { tier: "Bronze", base: 25, cpmPriority: 3, cpmOther: 1.8, max: 100 },
      { tier: "Silver", base: 50, cpmPriority: 4, cpmOther: 2.4, max: 175 },
      { tier: "Gold", base: 100, cpmPriority: 5, cpmOther: 3, max: 250 },
    ],
    priorityMarkets: [
      "European Union",
      "United States",
      "Canada",
      "United Kingdom",
      "Norway",
      "Switzerland",
      "Iceland",
      "Australia",
      "New Zealand",
    ],
  },
};

export const GUIDE_PATH = "/shortform-guide";
/** Link into the guide that remembers which quest the creator came from. */
export const guideHref = (slug?: string, hash?: string) =>
  `${GUIDE_PATH}${slug ? `?quest=${slug}` : ""}${hash ? `#${hash}` : ""}`;

export const fmtPct = (n: number) => `${Number.isInteger(n) ? n.toFixed(1) : String(n)}%+`;
export const fmtNum = (n: number) => n.toLocaleString("en-US");
export const eur = (n: number) => (Number.isInteger(n) ? `€${n}` : `€${n.toFixed(2)}`);
