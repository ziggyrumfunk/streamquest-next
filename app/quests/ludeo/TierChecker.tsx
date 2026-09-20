"use client";

import { useMemo, useState } from "react";
import { platforms, rewards, fmtNum, type Gate, type TierName } from "./platformData";

/* ============================================================
   "Which tier am I, and what could I earn?"
   A creator enters their typical numbers for one platform. We run
   them through that platform's four gates and show the highest tier
   where all four pass, which gates held them back from the next one,
   and a payout estimate: base + CPM x eligible views, capped.

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

    const reward = tier ? rewards.find((r) => r.tier === tier)! : null;
    const cv = campaignViews.trim() === "" ? v : num(campaignViews);
    const cpm = reward ? (market === "priority" ? reward.cpmPriority : reward.cpmOther) : 0;
    const estimate = reward ? Math.min(reward.max, reward.base + (cv / 1000) * cpm) : 0;
    // Rounded up to the nearest 50: it is quoted as "about", so 52,084 would be false precision.
    const capViews = reward ? Math.ceil((((reward.max - reward.base) / cpm) * 1000) / 50) * 50 : 0;

    return { rate, tier, next, nextChecks, reward, estimate, capViews, cv, cpm };
  }, [platform, audience, views, likes, comments, market, campaignViews]);

  const field = (id: string, label: string, value: string, set: (s: string) => void, hint?: string) => (
    <label className="lq-check-field" htmlFor={id}>
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

  return (
    <div className="lq-check">
      <div className="lq-check-form">
        <div className="lq-check-row">
          <span className="lq-check-legend">Platform</span>
          <div className="lq-seg" role="group" aria-label="Platform">
            {platforms.map((p) => (
              <button
                key={p.key}
                type="button"
                className={`lq-seg-btn${p.key === platformKey ? " is-active" : ""}`}
                aria-pressed={p.key === platformKey}
                onClick={() => setPlatformKey(p.key)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="lq-check-fields">
          {field("lq-aud", platform.audienceLabel, audience, setAudience)}
          {field("lq-views", "Typical views per video", views, setViews)}
          {field("lq-likes", "Typical likes per video", likes, setLikes)}
          {field("lq-com", "Genuine commenters per video", comments, setComments)}
        </div>
        <p className="lq-check-hint">
          Use the middle value from your 10 most recent comparable videos, not your best one.
        </p>
      </div>

      <div className="lq-check-result" aria-live="polite">
        {result.tier && result.reward ? (
          <>
            <span className="lq-check-kicker">Your likely tier on {platform.label}</span>
            <div className="lq-check-tier">
              <span className={`lq-tier is-${result.tier.toLowerCase()}`}>{result.tier}</span>
              <strong>
                €{result.reward.base} guaranteed, up to €{result.reward.max}
              </strong>
            </div>
            <p className="lq-check-rate">Your like rate works out at {result.rate.toFixed(2)}%.</p>

            <div className="lq-check-est">
              <div className="lq-check-row">
                <span className="lq-check-legend">Audience</span>
                <div className="lq-seg" role="group" aria-label="Audience market">
                  <button type="button" className={`lq-seg-btn${market === "priority" ? " is-active" : ""}`} aria-pressed={market === "priority"} onClick={() => setMarket("priority")}>
                    Priority markets
                  </button>
                  <button type="button" className={`lq-seg-btn${market === "other" ? " is-active" : ""}`} aria-pressed={market === "other"} onClick={() => setMarket("other")}>
                    Other markets
                  </button>
                </div>
              </div>
              {field("lq-cv", "Views your Ludeo video might get", campaignViews, setCampaignViews, fmtNum(num(views)))}
              <div className="lq-check-payout">
                <span>Estimated payout</span>
                <strong>€{result.estimate.toFixed(2)}</strong>
              </div>
              <p className="lq-check-math">
                €{result.reward.base} base + {fmtNum(result.cv)} views at €
                {Number.isInteger(result.cpm) ? result.cpm : result.cpm.toFixed(2)} per 1,000
                {result.estimate >= result.reward.max ? ", capped at the tier maximum" : ""}. The cap is
                reached at about {fmtNum(result.capViews)} eligible views.
              </p>
            </div>

            {result.next && (
              <div className="lq-check-next">
                <span className="lq-check-kicker">What {result.next.tier} would need</span>
                <ul>
                  {result.nextChecks.map((k) => (
                    <li key={k.label} className={k.pass ? "is-pass" : "is-miss"}>
                      <span>{k.label}</span>
                      <em>
                        {k.have} of {k.need}
                      </em>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <>
            <span className="lq-check-kicker">Not at Bronze on {platform.label} yet</span>
            <p className="lq-check-rate">
              All four Bronze gates need to pass together. Your like rate works out at{" "}
              {result.rate.toFixed(2)}%.
            </p>
            <div className="lq-check-next">
              <ul>
                {checksFor(platform.gates[0], platform.audienceLabel, num(audience), num(views), result.rate, num(comments)).map((k) => (
                  <li key={k.label} className={k.pass ? "is-pass" : "is-miss"}>
                    <span>{k.label}</span>
                    <em>
                      {k.have} of {k.need}
                    </em>
                  </li>
                ))}
              </ul>
            </div>
            <p className="lq-check-math">
              If you are just below a threshold, apply anyway. StreamQuest may review your profile
              manually, and another of your platforms may qualify.
            </p>
          </>
        )}
        <p className="lq-check-disclaimer">
          Indicative only. StreamQuest confirms your tier, base, CPM and maximum payout after
          reviewing your 10 most recent comparable videos, before you accept anything.
        </p>
      </div>
    </div>
  );
}
