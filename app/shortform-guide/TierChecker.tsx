"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { platforms, fmtNum, eur, type Gate, type TierName } from "@/data/shortform";
import { useQuestContext } from "./useQuestContext";

/* ============================================================
   "Which tier am I?"
   A creator enters their typical numbers for one platform. We run
   them through that platform's four gates and show the highest tier
   where all four pass, plus which gates hold them back from the next.

   Tiers are general, payouts are per quest. So the payout estimate
   (base + rate x eligible views, capped) only appears when the
   creator arrived from a quest brief, via ?quest=<slug>. On a direct
   visit the checker points them to the brief instead.

   Indicative only, and says so. StreamQuest sets the real tier after
   reviewing the creator's 10 most recent comparable videos.
   ============================================================ */

type Check = { label: string; need: string; have: string; pass: boolean };

function checksFor(g: Gate, audienceLabel: string, a: number, v: number, rate: number, c: number): Check[] {
  return [
    { label: audienceLabel, need: `${fmtNum(g.audience)}+`, have: fmtNum(a), pass: a >= g.audience },
    { label: "Median views", need: `${fmtNum(g.viewsMin)}+`, have: fmtNum(v), pass: v >= g.viewsMin },
    { label: "Like rate", need: `${g.likeRate}%+`, have: `${rate.toFixed(2)}%`, pass: rate >= g.likeRate },
    { label: "Genuine commenters", need: `${g.comments}+`, have: fmtNum(c), pass: c >= g.comments },
  ];
}

const num = (s: string) => {
  const n = Number(String(s).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

export default function TierChecker() {
  const quest = useQuestContext();
  const [platformKey, setPlatformKey] = useState(platforms[0].key);
  const [audience, setAudience] = useState("2500");
  const [views, setViews] = useState("8500");
  const [likes, setLikes] = useState("420");
  const [comments, setComments] = useState("12");
  const [market, setMarket] = useState<"priority" | "other">("priority");
  const [campaignViews, setCampaignViews] = useState("");

  const platform = platforms.find((p) => p.key === platformKey) ?? platforms[0];

  const result = useMemo(() => {
    const a = num(audience);
    const v = num(views);
    const l = num(likes);
    const c = num(comments);
    const rate = v > 0 ? (l / v) * 100 : 0;

    // Highest tier where all four gates pass.
    let tier: TierName | null = null;
    for (const g of platform.gates) {
      if (checksFor(g, platform.audienceLabel, a, v, rate, c).every((k) => k.pass)) tier = g.tier;
    }
    const idx = tier ? platform.gates.findIndex((g) => g.tier === tier) : -1;
    const next = platform.gates[idx + 1];
    const nextChecks = next ? checksFor(next, platform.audienceLabel, a, v, rate, c) : [];
    const bronzeChecks = checksFor(platform.gates[0], platform.audienceLabel, a, v, rate, c);

    // Payout, only when we know which quest's reward table applies.
    const reward = tier && quest ? quest.rewards.find((r) => r.tier === tier) ?? null : null;
    const cv = campaignViews.trim() === "" ? v : num(campaignViews);
    const cpm = reward ? (market === "priority" ? reward.cpmPriority : reward.cpmOther) : 0;
    const estimate = reward ? Math.min(reward.max, reward.base + (cv / 1000) * cpm) : 0;
    // Rounded up to the nearest 50: it is quoted as "about", so 52,084 would be false precision.
    const capViews = reward && cpm > 0 ? Math.ceil((((reward.max - reward.base) / cpm) * 1000) / 50) * 50 : 0;

    return { rate, tier, next, nextChecks, bronzeChecks, reward, estimate, capViews, cv, cpm };
  }, [platform, audience, views, likes, comments, market, campaignViews, quest]);

  const field = (id: string, label: string, value: string, set: (s: string) => void, hint?: string) => (
    <label className="sfg-check-field" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        inputMode="numeric"
        value={value}
        onChange={(e) => set(e.target.value)}
        placeholder={hint}
        autoComplete="off"
      />
    </label>
  );

  const checkList = (checks: Check[]) => (
    <ul>
      {checks.map((k) => (
        <li key={k.label} className={k.pass ? "is-pass" : "is-miss"}>
          <span>{k.label}</span>
          <em>
            {k.have} of {k.need}
          </em>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="sfg-check">
      <div className="sfg-check-form">
        <div className="sfg-check-row">
          <span className="sfg-check-legend">Platform</span>
          <div className="sfg-seg" role="group" aria-label="Platform">
            {platforms.map((p) => (
              <button
                key={p.key}
                type="button"
                className={`sfg-seg-btn${p.key === platformKey ? " is-active" : ""}`}
                aria-pressed={p.key === platformKey}
                onClick={() => setPlatformKey(p.key)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="sfg-check-fields">
          {field("sfg-aud", platform.audienceLabel, audience, setAudience)}
          {field("sfg-views", "Typical views per video", views, setViews)}
          {field("sfg-likes", "Typical likes per video", likes, setLikes)}
          {field("sfg-com", "Genuine commenters per video", comments, setComments)}
        </div>
        <p className="sfg-check-hint">
          Use the middle value from your 10 most recent comparable videos, not your best one. Check
          each platform you post on: your tier can differ between them.
        </p>
      </div>

      <div className="sfg-check-result" aria-live="polite">
        {result.tier ? (
          <>
            <span className="sfg-check-kicker">Your likely tier on {platform.label}</span>
            <div className="sfg-check-tier">
              <span className={`sfg-tier is-${result.tier.toLowerCase()}`}>{result.tier}</span>
              {result.reward && (
                <strong>
                  {eur(result.reward.base)} guaranteed, up to {eur(result.reward.max)}
                </strong>
              )}
            </div>
            <p className="sfg-check-rate">Your like rate works out at {result.rate.toFixed(2)}%.</p>

            {quest && result.reward ? (
              <div className="sfg-check-est">
                <span className="sfg-check-kicker">What that could pay on the {quest.title} quest</span>
                <div className="sfg-check-row">
                  <span className="sfg-check-legend">Audience</span>
                  <div className="sfg-seg" role="group" aria-label="Audience market">
                    <button
                      type="button"
                      className={`sfg-seg-btn${market === "priority" ? " is-active" : ""}`}
                      aria-pressed={market === "priority"}
                      onClick={() => setMarket("priority")}
                    >
                      Priority markets
                    </button>
                    <button
                      type="button"
                      className={`sfg-seg-btn${market === "other" ? " is-active" : ""}`}
                      aria-pressed={market === "other"}
                      onClick={() => setMarket("other")}
                    >
                      Other markets
                    </button>
                  </div>
                </div>
                {field("sfg-cv", "Views your best post might get", campaignViews, setCampaignViews, fmtNum(num(views)))}
                <div className="sfg-check-payout">
                  <span>Estimated payout</span>
                  <strong>€{result.estimate.toFixed(2)}</strong>
                </div>
                <p className="sfg-check-math">
                  {eur(result.reward.base)} base + {fmtNum(result.cv)} views at {eur(result.cpm)} per 1,000
                  {result.estimate >= result.reward.max ? ", capped at the tier maximum" : ""}. The
                  maximum is reached at about {fmtNum(result.capViews)} eligible views.{" "}
                  <Link href={quest.href}>Back to the {quest.title} brief</Link>
                </p>
              </div>
            ) : (
              <div className="sfg-check-est">
                <span className="sfg-check-kicker">What does that tier pay?</span>
                <p className="sfg-check-math is-first">
                  That depends on the quest. Each quest brief lists the guaranteed base, the rate per
                  1,000 eligible views and the maximum payout for Bronze, Silver and Gold.
                </p>
              </div>
            )}

            {result.next && (
              <div className="sfg-check-next">
                <span className="sfg-check-kicker">What {result.next.tier} would need</span>
                {checkList(result.nextChecks)}
              </div>
            )}
          </>
        ) : (
          <>
            <span className="sfg-check-kicker">Not at Bronze on {platform.label} yet</span>
            <p className="sfg-check-rate">
              All four Bronze gates need to pass together. Your like rate works out at{" "}
              {result.rate.toFixed(2)}%.
            </p>
            <div className="sfg-check-next">{checkList(result.bronzeChecks)}</div>
            <p className="sfg-check-math">
              If you are just below a threshold, apply anyway. StreamQuest may review your profile
              manually, and another of your platforms may qualify.
            </p>
          </>
        )}
        <p className="sfg-check-disclaimer">
          Indicative only. StreamQuest confirms your tier on each platform, and what it pays, in your
          offer, after reviewing your 10 most recent comparable videos.
        </p>
      </div>
    </div>
  );
}
