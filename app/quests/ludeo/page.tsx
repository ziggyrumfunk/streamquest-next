import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/app/components/Reveal";
import { getQuestBySlug } from "@/data/quests";
import { shortformQuests, platforms, viewsBand, guideHref, eur } from "@/data/shortform";
import { getQuestSpots, formatSpotsDate } from "@/lib/questSpots";
import PlatformIcon, { type PlatformIconName } from "@/app/components/shortform/PlatformIcon";
import TierCheckWidget from "@/app/components/shortform/TierCheckWidget";
import OpenTierCheck from "@/app/components/shortform/OpenTierCheck";
import LudeoHero from "./LudeoHero";
import ApplyBar from "./ApplyBar";
import "@/app/redesign.css";
import "@/app/quests/[slug]/quest.css";
import "@/app/components/shortform/shortform.css";
import "./ludeo-quest.css";

/* ============================================================
   /quests/ludeo: StreamQuest x Ludeo paid short-form mission.

   Deliberately short. This page covers what is specific to Ludeo:
   the product, the must-haves, what each tier pays. Everything that
   is the same on every short-form quest (how tiers are set, how
   payouts are calculated, proof, the full rules, the tier checker)
   lives on /shortform-guide, and this page links there.

   Hand-built brief (see ludeo-quest.css for why). The matching entry
   in data/quests.ts carries `customPage: true`, which keeps the
   generic [slug] template from generating this path, and
   `limitedSpots: true`, which gives it a spots counter in /admin.
   Listed since 20 Sep 2026. To pull it from the listings again without
   taking the page down, put `unlisted: true` back on the entry: that
   also marks this page noindex (see the metadata below).
   ============================================================ */

const SLUG = "ludeo";
const quest = getQuestBySlug(SLUG);
const { rewards, priorityMarkets } = shortformQuests[SLUG];

export const metadata: Metadata = {
  title: "Ludeo: paid short-form creator mission",
  description:
    "Get paid to showcase Ludeo. One edited vertical video, 45 seconds or longer, posted on TikTok, Instagram Reels and YouTube Shorts. Guaranteed base plus performance rewards, up to €250.",
  ...(quest?.unlisted ? { robots: { index: false, follow: false } } : {}),
  alternates: { canonical: "https://streamquest.io/quests/ludeo" },
  openGraph: {
    title: "Ludeo: paid short-form creator mission | StreamQuest",
    description:
      "One edited short-form video introducing Ludeo. Guaranteed base plus performance rewards, up to €250.",
    images: ["/media/ludeo/quest/cover.webp"],
  },
};

const APPLY = "https://app.streamquest.io";
const LUDEO = "https://ludeo.com";
const LUDEO_DISCORD = "https://discord.com/invite/ludeo-892682814938566707";
const SQ_DISCORD = "https://discord.gg/NhqfucYDXD";
const GUIDE = guideHref(SLUG);
const TIER_CHECK = guideHref(SLUG, "tier-check");

const Q = "/firebase-public/Questy%20New%20Folder/Questy%20Regular%20Size%20";
const questy = (n: number) => `${Q}(${n}).webp`;

/** Shown in the banner and again at the closing call to action. */
const CAMPAIGN_START = { full: "25 September 2026", short: "25 September" };

/* Platform logos in the banner. They stand alone there, without a name beside
   them, so YouTube gets its classic play-button logo and not the Shorts mark.
   The Platforms tile right below spells the three names out. */
const bannerLogos: { icon: PlatformIconName; label: string }[] = [
  { icon: "tiktok", label: "TikTok" },
  { icon: "reels", label: "Instagram Reels" },
  { icon: "youtube", label: "YouTube Shorts" },
];

/** Three rising bars, for Bronze, Silver and Gold. Sits in the "Check your tier" buttons. */
const tierIcon = (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <rect x="3" y="13" width="5" height="8" />
    <rect x="9.5" y="8" width="5" height="13" />
    <rect x="16" y="3" width="5" height="18" />
  </svg>
);

/** "a, b and c" */
const listOf = (items: string[]) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

const base = rewards.map((r) => r.base);
const topPayout = Math.max(...rewards.map((r) => r.max));

const art = ["game-robocop", "game-payday3", "game-lostcastle", "game-cronos", "game-coh3", "game-redacted"];

const mission = [
  "Be edited. A raw clip or an unedited screen recording does not count.",
  "Run 45 seconds or longer.",
  "Explain what Ludeo is, in your own words.",
  "Show 2 to 3 approved Playables.",
  "Tell viewers they can play those moments themselves, on desktop.",
  "Invite viewers to join the Ludeo Discord.",
  "Carry the required sponsored-content disclosure.",
];

const steps = [
  { title: "Apply", sub: "Tell us which accounts to review" },
  { title: "Get your offer", sub: "Tier, base, rate and maximum, up front" },
  { title: "Make it", sub: "Send the draft, wait for approval" },
  { title: "Post everywhere", sub: "Inside your campaign window" },
  { title: "Send your numbers", sub: "Around Day 7 and Day 30" },
  { title: "Get paid", sub: "Base plus verified performance" },
];

const groundRules = [
  { lead: "Approval first.", body: "Send us your draft and wait for a yes before you post anything." },
  { lead: "Keep it up.", body: "Your posts stay public for at least 60 days." },
  { lead: "Organic only.", body: "No bought views, bots, engagement swaps or paid boosting." },
  { lead: "Say what you think.", body: "This is sponsored content, not a paid positive review." },
  { lead: "You own it.", body: "Ludeo may reuse the approved final video in its marketing. Your account and raw footage stay yours." },
];

export default async function LudeoQuestPage() {
  // Null until someone saves a count in /admin; the page then falls back to
  // plain "limited spots" wording instead of showing a number nobody maintains.
  const spots = await getQuestSpots(SLUG);
  const full = spots?.left === 0;
  /** For the hero tile, which already carries the label "Spots". */
  const spotsShort = spots ? (full ? `All ${spots.total} filled` : `${spots.left} of ${spots.total} left`) : null;
  /** For running text. */
  const spotsText = spots ? (full ? `All ${spots.total} spots filled` : `${spots.left} of ${spots.total} spots left`) : null;
  const spotsDate = spots ? formatSpotsDate(spots.updatedAt) : "";

  return (
    <div className="rd lq-page">
      {/* ============ HERO ============ */}
      <LudeoHero>
        <div className="lq-badges">
          <span className="q-status active">
            <span className="pulse" />
            Paid creator mission
          </span>
          <span className="q-category">Short-form</span>
          <ul className="lq-logos" aria-label="Platforms">
            {bannerLogos.map((l) => (
              <li key={l.icon} title={l.label}>
                <PlatformIcon name={l.icon} size={25} />
                <span className="sr-only">{l.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="lq-kicker">StreamQuest x Ludeo</p>
        <h1>
          Create gaming content? <span className="grad">Get paid to showcase Ludeo.</span>
        </h1>
        <p className="lq-lead">
          Ludeo turns gameplay moments into something people can play, straight from a desktop
          browser. Introduce it in your own style, show a few Playables, and invite your audience
          into the Ludeo community.
        </p>
        <div className="lq-cta-row">
          <a href={APPLY} className="btn btn-primary btn-xl">Apply for the quest</a>
          <a href={LUDEO} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-xl">
            Explore Ludeo
          </a>
        </div>
        <div className="lq-meta">
          <div className="lq-meta-item">
            <span className="lq-meta-label">Platforms</span>
            <span className="lq-meta-value">{platforms.map((p) => p.label).join(" · ")}</span>
          </div>
          <div className="lq-meta-item">
            <span className="lq-meta-label">Format</span>
            <span className="lq-meta-value">Edited vertical video, 45 seconds or longer</span>
          </div>
          <div className="lq-meta-item">
            <span className="lq-meta-label">Campaign starts</span>
            <span className="lq-meta-value">{CAMPAIGN_START.full}</span>
          </div>
          <div className="lq-meta-item">
            <span className="lq-meta-label">Guaranteed</span>
            <span className="lq-meta-value">
              {eur(Math.min(...base))} to {eur(Math.max(...base))}, by tier
            </span>
          </div>
          <div className="lq-meta-item is-max">
            <span className="lq-meta-label">Maximum payout</span>
            <span className="lq-meta-value">Up to {eur(topPayout)}</span>
          </div>
          {spots && spotsShort ? (
            <div className="lq-meta-item is-spots">
              <span className="lq-meta-label">Spots</span>
              <span className="lq-meta-value">{spotsShort}</span>
              <span className="lq-spots-bar" aria-hidden="true">
                <span style={{ width: `${((spots.total - spots.left) / spots.total) * 100}%` }} />
              </span>
              {spotsDate && <span className="lq-spots-date">Updated {spotsDate}</span>}
            </div>
          ) : (
            <div className="lq-meta-item">
              <span className="lq-meta-label">Selection</span>
              <span className="lq-meta-value">Curated, limited spots</span>
            </div>
          )}
        </div>
      </LudeoHero>

      {/* ============ WHAT IS LUDEO ============ */}
      <section className="q-section">
        <div className="rd-shell">
          <Reveal>
            <div className="q-section-head">
              <span className="q-tag">What is Ludeo?</span>
              <h2>What if you could play the clip instead of only watching it?</h2>
              <p>
                Ludeo takes memorable moments from PC games and turns them into playable experiences.
                Someone discovers a Ludeo moment, opens it on desktop and can jump directly into that
                part of the game through their browser.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="lq-flow">
              <span className="lq-flow-step">Watch the moment</span>
              <span className="lq-flow-arrow" aria-hidden="true">→</span>
              <span className="lq-flow-step">Click</span>
              <span className="lq-flow-arrow" aria-hidden="true">→</span>
              <span className="lq-flow-step">Play it yourself</span>
            </div>
            <p>
              Your job is to make that idea easy to understand, fun to watch and worth trying.
            </p>
          </Reveal>
          <Reveal>
            <div className="lq-art">
              {art.map((f) => (
                <div key={f} className="lq-art-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/media/ludeo/${f}.webp`} alt="" loading="lazy" />
                </div>
              ))}
            </div>
            <p className="lq-art-caption">
              Game artwork from ludeo.com. The approved Playables bank is shared with selected creators.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ YOUR MISSION ============ */}
      <section className="q-section q-section-strip">
        <div className="rd-shell">
          <div className="lq-split">
            <Reveal>
              <span className="q-tag">Your mission</span>
              <h2>One edited video, 45 seconds or longer.</h2>
              <p>Make one original vertical video that introduces Ludeo. It needs to:</p>
              <ul className="q-list" style={{ marginTop: 22 }}>
                {mission.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <p style={{ marginTop: 24 }}>
                Everything else is yours: the hook, the humour, voice-over, facecam, captions, pacing.
                There is no script to follow.
              </p>
            </Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="lq-questy" src={questy(2)} alt="" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ============ WHAT IT PAYS ============ */}
      <section className="q-section" id="rewards">
        <div className="rd-shell">
          <div className="lq-split is-reverse">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="lq-questy is-late" src={questy(7)} alt="" loading="lazy" />
            <Reveal>
              <span className="q-tag">What it pays</span>
              <h2>Three tiers. A guaranteed base, plus what your video earns.</h2>
              <p>
                Your tier comes from the numbers your videos usually get, not from one viral hit.
                Every tier has a guaranteed payment, and every 1,000 eligible views adds to it until
                you reach the maximum.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="lq-tiers">
              {rewards.map((r) => (
                <div key={r.tier} className={`lq-tier-card is-${r.tier.toLowerCase()}`}>
                  <span className={`lq-tier is-${r.tier.toLowerCase()}`}>{r.tier}</span>
                  <div className="lq-tier-base">{eur(r.base)}</div>
                  <div className="lq-tier-base-label">guaranteed</div>
                  <ul className="lq-tier-lines">
                    <li>
                      <strong>+ {eur(r.cpmPriority)}</strong> per 1,000 eligible views
                    </li>
                    <li>
                      <strong>Up to {eur(r.max)}</strong> in total
                    </li>
                  </ul>
                  <p className="lq-tier-fit">
                    Your videos usually get <strong>{viewsBand[r.tier]}</strong> views
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <ul className="lq-notes">
              <li>
                The guaranteed base is yours once your approved video is live and your proof is in.
                Performance can only add to it, never take it away.
              </li>
              <li>
                Rates shown are for views from priority markets: {listOf(priorityMarkets)}. Views from
                other countries count at {listOf(rewards.map((r) => eur(r.cpmOther)))} per 1,000.
              </li>
              <li>
                Views are one of four checks. Followers, like rate and genuine comments count too, and
                the thresholds differ per platform.
              </li>
            </ul>
            <div className="lq-inline-actions">
              <OpenTierCheck href={TIER_CHECK} className="btn btn-primary sf-btn-big">
                {tierIcon}
                Check your tier
              </OpenTierCheck>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ POST EVERYWHERE ============ */}
      <section className="q-section q-section-strip">
        <div className="rd-shell">
          <div className="lq-split">
            <Reveal>
              <span className="q-tag">Post it everywhere</span>
              <h2>One video. Every platform. Paid on your best.</h2>
              <p>
                You do not have to pick a platform. Put your video on TikTok, Instagram Reels and
                YouTube Shorts, or whichever of them you use, and send us the numbers for every post.
              </p>
              <p style={{ marginTop: 16 }}>
                You are paid once, on the post that does best. So every extra platform is simply
                another shot at your maximum.
              </p>
              <div className="lq-chips">
                {platforms.map((p) => (
                  <span key={p.key} className="lq-chip">
                    <PlatformIcon name={p.key} size={18} />
                    {p.label}
                  </span>
                ))}
              </div>
            </Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="lq-questy" src={questy(6)} alt="" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="q-section">
        <div className="rd-shell">
          <Reveal>
            <div className="q-section-head q-section-head-center">
              <span className="q-tag">How it works</span>
              <h2>Apply, get your offer, then create.</h2>
              <p>
                We confirm your tier and what it pays before you make anything. Nothing goes live
                without approval.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="q-steps">
              {steps.map((s) => (
                <div key={s.title} className="q-step">
                  <div className="q-step-title">{s.title}</div>
                  <div className="q-step-sub">{s.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ GROUND RULES + GUIDE ============ */}
      <section className="q-section q-section-strip">
        <div className="rd-shell">
          <Reveal>
            <div className="q-section-head">
              <span className="q-tag">Ground rules</span>
              <h2>Five things, in one line each.</h2>
            </div>
            <ul className="lq-rules">
              {groundRules.map((r) => (
                <li key={r.lead}>
                  <strong>{r.lead}</strong> {r.body}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <div className="lq-guide">
              <div className="lq-guide-text">
                <span className="q-tag">Want the detail?</span>
                <h2>Read the short-form quest guide.</h2>
                <p>
                  How tiers are set on each platform, how your payout is calculated, what we verify
                  and the full version of every rule. It also has a tier checker, so you can see
                  where you would land before you apply.
                </p>
                <div className="lq-guide-actions">
                  <Link href={GUIDE} className="btn btn-primary sf-btn-big">
                    How it works, in depth
                    <span className="sf-btn-arrow" aria-hidden="true">→</span>
                  </Link>
                  <OpenTierCheck href={TIER_CHECK} className="btn btn-secondary sf-btn-big">
                    {tierIcon}
                    Check your tier
                  </OpenTierCheck>
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="lq-questy lq-guide-questy is-late" src={questy(3)} alt="" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ READY ============ */}
      <section className="q-final lq-final-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="lq-questy lq-final-questy" src={questy(10)} alt="" loading="lazy" />
        <div className="rd-shell">
          <Reveal>
            <span className="q-tag">Ready?</span>
            <h2>
              Make the video. <span className="grad">Post it everywhere.</span>
            </h2>
            <p className="lq-final-sum">
              {eur(Math.min(...base))} to {eur(Math.max(...base))} guaranteed, up to {eur(topPayout)} with
              performance. Campaign starts {CAMPAIGN_START.short}.{spotsText ? ` ${spotsText}.` : ""}
            </p>
            <div className="q-final-actions">
              <a href={APPLY} className="btn btn-primary btn-xl">Apply for Ludeo</a>
              <a href={LUDEO_DISCORD} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-xl">
                Join the Ludeo Discord
              </a>
            </div>
            <p className="lq-final-help">
              Questions? Join the{" "}
              <a href={SQ_DISCORD} target="_blank" rel="noopener noreferrer">StreamQuest Discord</a>{" "}
              and contact us through the campaign-support channel.
            </p>
          </Reveal>
        </div>
      </section>

      <ApplyBar href={APPLY} note={spotsText} />
      {/* Opens in place, with Ludeo's payouts. Sits above the apply bar (see --tcw-lift). */}
      <TierCheckWidget questSlug={SLUG} guideHref={GUIDE} hideWhenVisible={[".lq-hero", "footer"]} />
    </div>
  );
}
