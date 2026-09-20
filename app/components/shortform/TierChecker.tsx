"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { platforms, shortformQuests, fmtNum, eur, type Gate, type TierName } from "@/data/shortform";
import PlatformIcon from "./PlatformIcon";
import { useQuestContext } from "./useQuestContext";

/* ============================================================
   "Which tier am I?"

   A creator picks a platform and enters two numbers they know by
   heart: their followers and the views a typical video gets. Those
   two decide the likely tier. The other two gates (like rate and
   genuine commenters) are not asked for. Instead the result turns
   them into targets: "your videos also need 255+ likes and 8+
   genuine commenters", worked out from the views they typed.

   Tiers are general, payouts are per quest. The payout range only
   shows when we know the quest: passed in as `questSlug` on a quest
   brief, or read from ?quest=<slug> on the guide (`fromUrl`). The
   range runs from the other-markets rate to the priority-markets
   rate, so nobody has to know their audience split to use it.

   Two layouts: "full" sits in a page section, "compact" fits the
   floating widget's panel.

   Indicative only, and says so. StreamQuest sets the real tier after
   reviewing the creator's 10 most recent comparable videos.
   ============================================================ */

type Props = {
  variant?: "full" | "compact";
  /** Quest whose reward table applies. Wins over `fromUrl`. */
  questSlug?: string;
  /** Read the quest from ?quest=<slug>. For the general guide. */
  fromUrl?: boolean;
  /** Where "how tiers work" points. Leave out on the guide itself. */
  guideHref?: string;
};

type Check = { label: string; need: string; have: string; pass: boolean };

const reachChecks = (g: Gate, audienceLabel: string, a: number, v: number): Check[] => [
  { label: audienceLabel, need: `${fmtNum(g.audience)}+`, have: fmtNum(a), pass: a >= g.audience },
  { label: "Typical views", need: `${fmtNum(g.viewsMin)}+`, have: fmtNum(v), pass: v >= g.viewsMin },
];

const num = (s: string) => {
  const n = Number(String(s).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const pct = (n: number) => `${Number.isInteger(n) ? n : n.toFixed(2).replace(/0$/, "")}%`;

export default function TierChecker({ variant = "full", questSlug, fromUrl = false, guideHref }: Props) {
  const uid = useId();
  const urlQuest = useQuestContext();
  const quest = (questSlug ? shortformQuests[questSlug] : null) ?? (fromUrl ? urlQuest : null);

  const [platformKey, setPlatformKey] = useState(platforms[0].key);
  const [audience, setAudience] = useState("2500");
  const [views, setViews] = useState("8500");

  const platform = platforms.find((p) => p.key === platformKey) ?? platforms[0];
  const compact = variant === "compact";

  const r = useMemo(() => {
    const a = num(audience);
    const v = num(views);

    // Highest tier whose follower and view gates both pass.
    let gate: Gate | null = null;
    for (const g of platform.gates) {
      if (a >= g.audience && v >= g.viewsMin) gate = g;
    }
    const tier: TierName | null = gate ? gate.tier : null;
    const next = platform.gates[gate ? platform.gates.indexOf(gate) + 1 : 0];

    // The engagement gates, turned into per-video targets.
    const likesNeeded = gate ? Math.ceil((v * gate.likeRate) / 100) : 0;

    const reward = tier && quest ? quest.rewards.find((x) => x.tier === tier) ?? null : null;
    const lo = reward ? Math.round(Math.min(reward.max, reward.base + (v / 1000) * reward.cpmOther)) : 0;
    const hi = reward ? Math.round(Math.min(reward.max, reward.base + (v / 1000) * reward.cpmPriority)) : 0;
    // Rounded up to the nearest 50: it is quoted as "about", so 31,234 would be false precision.
    const capViews = reward ? Math.ceil((((reward.max - reward.base) / reward.cpmPriority) * 1000) / 50) * 50 : 0;

    return { a, v, gate, tier, next, likesNeeded, reward, lo, hi, capViews };
  }, [platform, audience, views, quest]);

  const field = (key: string, label: string, value: string, set: (s: string) => void) => (
    <label className="tc-field" htmlFor={`${uid}-${key}`}>
      <span>{label}</span>
      <input
        id={`${uid}-${key}`}
        inputMode="numeric"
        value={value}
        onChange={(e) => set(e.target.value)}
        autoComplete="off"
      />
    </label>
  );

  const checkList = (checks: Check[]) => (
    <ul className="tc-checks">
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
    <div className={`tc tc--${variant}`}>
      <div className="tc-form">
        <div className="tc-row">
          <span className="tc-legend">
            Platform <b>{platform.label}</b>
          </span>
          <div className="tc-platforms" role="group" aria-label="Platform">
            {platforms.map((p) => (
              <button
                key={p.key}
                type="button"
                className={`tc-platform${p.key === platformKey ? " is-active" : ""}`}
                aria-pressed={p.key === platformKey}
                aria-label={p.label}
                title={p.label}
                onClick={() => setPlatformKey(p.key)}
              >
                <PlatformIcon name={p.key} size={compact ? 22 : 26} />
              </button>
            ))}
          </div>
        </div>
        <div className="tc-fields">
          {field("aud", platform.audienceLabel, audience, setAudience)}
          {field("views", compact ? "Typical views" : "Typical views per video", views, setViews)}
        </div>
        <p className="tc-hint">
          Use the middle value from your 10 most recent comparable videos, not your best one.
          {compact ? "" : " Check each platform you post on: your tier can differ between them."}
        </p>
      </div>

      <div className="tc-result" aria-live="polite">
        {r.gate && r.tier ? (
          <>
            <span className="tc-kicker">
              Your likely tier on <PlatformIcon name={platform.key} size={14} /> {platform.label}
            </span>
            <div className="tc-tier">
              <span className={`sf-tier is-${r.tier.toLowerCase()}`}>{r.tier}</span>
              {r.reward && (
                <strong>
                  {eur(r.reward.base)} guaranteed, up to {eur(r.reward.max)}
                </strong>
              )}
            </div>

            <div className="tc-block">
              <span className="tc-kicker is-plain">To hold {r.tier}, your videos also need</span>
              <div className="tc-needs">
                <div className="tc-need">
                  <strong>{fmtNum(r.likesNeeded)}+</strong>
                  <span>likes per video</span>
                  <small>
                    a {pct(r.gate.likeRate)} like rate on {fmtNum(r.v)} views
                  </small>
                </div>
                <div className="tc-need">
                  <strong>{r.gate.comments}+</strong>
                  <span>genuine {r.gate.comments === 1 ? "commenter" : "commenters"} per video</span>
                  <small>real viewers, not bots or your own replies</small>
                </div>
              </div>
              <p className="tc-note">
                {r.tier === "Bronze"
                  ? "Fall short on either and you may not qualify on this platform yet."
                  : "Fall short on either and you may be placed a tier lower."}
              </p>
            </div>

            <div className="tc-block">
              {quest && r.reward ? (
                <>
                  <span className="tc-kicker is-plain">What that could pay on the {quest.title} quest</span>
                  <div className="tc-payout">
                    <span>At {fmtNum(r.v)} views</span>
                    <strong>{r.lo === r.hi ? `€${r.hi}` : `€${r.lo} to €${r.hi}`}</strong>
                  </div>
                  <p className="tc-note">
                    {r.lo >= r.reward.max
                      ? `That is the ${r.tier} maximum.`
                      : `Depends on where your viewers are. The ${r.tier} maximum of ${eur(r.reward.max)} is reached at about ${fmtNum(r.capViews)} views from priority markets.`}
                  </p>
                </>
              ) : (
                <>
                  <span className="tc-kicker is-plain">What does that tier pay?</span>
                  <p className="tc-note is-first">
                    That depends on the quest. Each quest brief lists the guaranteed base, the rate per
                    1,000 eligible views and the maximum payout for Bronze, Silver and Gold.
                  </p>
                </>
              )}
            </div>

            {r.next &&
              (compact ? (
                <p className="tc-note tc-nextline">
                  <b>{r.next.tier}</b> needs {fmtNum(r.next.audience)}+ {platform.audienceLabel.toLowerCase()} and{" "}
                  {fmtNum(r.next.viewsMin)}+ typical views.
                </p>
              ) : (
                <div className="tc-block">
                  <span className="tc-kicker is-plain">What {r.next.tier} would need</span>
                  {checkList(reachChecks(r.next, platform.audienceLabel, r.a, r.v))}
                </div>
              ))}
          </>
        ) : (
          <>
            <span className="tc-kicker">
              Not at Bronze on <PlatformIcon name={platform.key} size={14} /> {platform.label} yet
            </span>
            <p className="tc-note is-first">Bronze starts at these two numbers.</p>
            {checkList(reachChecks(platform.gates[0], platform.audienceLabel, r.a, r.v))}
            <p className="tc-note">
              If you are just below, apply anyway. StreamQuest may review your profile manually, and
              another of your platforms may qualify.
            </p>
          </>
        )}

        <p className="tc-disclaimer">
          Indicative only. StreamQuest confirms your tier on each platform
          {quest ? ", and what it pays," : ""} in your offer, after reviewing your 10 most recent
          comparable videos.
          {guideHref && (
            <>
              {" "}
              <Link href={guideHref}>How tiers work</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
