/* Shared data for the Ludeo brief: reward tiers and the per-platform
   qualification gates. Used by the platform tabs and by the tier checker,
   so the numbers live in exactly one place. */

export type TierName = "Bronze" | "Silver" | "Gold";

export type Reward = {
  tier: TierName;
  base: number;
  /** EUR per 1,000 eligible views, priority markets. */
  cpmPriority: number;
  /** EUR per 1,000 eligible views, other markets. */
  cpmOther: number;
  /** Maximum total payout, guaranteed base included. */
  max: number;
};

export const rewards: Reward[] = [
  { tier: "Bronze", base: 25, cpmPriority: 3, cpmOther: 1.8, max: 100 },
  { tier: "Silver", base: 50, cpmPriority: 4, cpmOther: 2.4, max: 175 },
  { tier: "Gold", base: 100, cpmPriority: 5, cpmOther: 3, max: 250 },
];

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
  format: string;
  mission: string;
  extra?: string;
  analytics: string;
  example?: { lines: string[]; result: string; verdict: string };
};

export const platforms: Platform[] = [
  {
    key: "tiktok",
    label: "TikTok",
    audienceLabel: "Followers",
    viewsLabel: "Median views",
    gates: [
      { tier: "Bronze", audience: 500, viewsMin: 500, viewsLabel: "500 to 5,000", likeRate: 3, comments: 3 },
      { tier: "Silver", audience: 2000, viewsMin: 5001, viewsLabel: "5,001 to 20,000", likeRate: 3, comments: 8 },
      { tier: "Gold", audience: 5000, viewsMin: 20001, viewsLabel: "20,001+", likeRate: 2.5, comments: 15 },
    ],
    note: "All four gates count together. Passing on views alone does not set your tier.",
    format: "Vertical 9:16, normally 20 to 45 seconds",
    mission:
      "Your TikTok must introduce Ludeo, feature 2 to 3 approved Playables, explain the playable-moment concept, mention desktop availability, include the Discord call to action and clearly disclose the sponsorship.",
    analytics: "Views, likes, comments, shares, watch time, retention and audience geography.",
    example: {
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
      { tier: "Bronze", audience: 500, viewsMin: 500, viewsLabel: "500 to 5,000", likeRate: 2.5, comments: 2 },
      { tier: "Silver", audience: 1500, viewsMin: 5001, viewsLabel: "5,001 to 20,000", likeRate: 2.25, comments: 5 },
      { tier: "Gold", audience: 5000, viewsMin: 20001, viewsLabel: "20,001+", likeRate: 2, comments: 10 },
    ],
    note: "Reels often reach people who do not follow the account, so follower count alone is not enough to qualify. We care much more about whether your videos consistently reach viewers, and whether those viewers actually react to the content.",
    format: "Vertical 9:16, normally 20 to 45 seconds",
    mission:
      "Your Reel must introduce Ludeo, feature 2 to 3 approved Playables, explain how playable gaming moments work, mention desktop availability, include the Discord call to action and clearly disclose the paid promotion.",
    analytics: "Views, accounts reached, likes, comments, shares, saves, watch time, retention and audience geography.",
  },
  {
    key: "shorts",
    label: "YouTube Shorts",
    audienceLabel: "Subscribers",
    viewsLabel: "Median Short views",
    gates: [
      { tier: "Bronze", audience: 250, viewsMin: 500, viewsLabel: "500 to 5,000", likeRate: 2, comments: 1 },
      { tier: "Silver", audience: 750, viewsMin: 5001, viewsLabel: "5,001 to 20,000", likeRate: 2, comments: 2 },
      { tier: "Gold", audience: 2000, viewsMin: 20001, viewsLabel: "20,001+", likeRate: 2, comments: 5 },
    ],
    note: "YouTube Shorts naturally receives fewer comments per view than TikTok and Instagram Reels, so the comment requirement is intentionally lower. A creator will not be penalised simply because normal interaction behaviour differs between platforms.",
    format: "Vertical short-form video, normally 20 to 45 seconds",
    mission:
      "Your Short must introduce Ludeo, feature 2 to 3 approved Playables, explain that viewers can play those moments themselves, mention desktop availability, direct viewers toward the Ludeo Discord and clearly disclose the sponsorship.",
    extra:
      "Do not rely on a URL inside the Shorts description as your only Discord call to action. StreamQuest will provide the approved link route.",
    analytics:
      "Views, likes, comments, shares, average view duration, audience retention, viewed versus swiped-away metrics and audience geography.",
  },
];

export const fmtPct = (n: number) => `${Number.isInteger(n) ? n.toFixed(1) : String(n)}%+`;
export const fmtNum = (n: number) => n.toLocaleString("en-US");
