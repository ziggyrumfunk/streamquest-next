import Link from "next/link";
import type { Metadata } from "next";

import Reveal from "@/app/components/Reveal";
import FloatingApply from "@/app/components/FloatingApply";
import SteamGrowthCounter from "@/app/components/SteamGrowthCounter";
import { quests } from "@/data/quests";
import "@/app/redesign.css";
import "./brands.css";

export const metadata: Metadata = {
  title: "For studios & publishers — launch with 50+ verified creators",
  description:
    "StreamQuest runs gamified Twitch micro-streamer campaigns for indie and AA games. Verified metrics, transparent KPI reporting, and authentic creator communities.",
  alternates: { canonical: "https://streamquest.io/brands" },
};

/* ============ DATA ============ */

const partners = [
  "Thunderful", "Misty Whale", "1Minus1", "Current Games (2)",
  "NoWhere Studios", "Acclaim", "SandSailorStudio", "RocketRide",
  "Amber Studios", "Critical Hit PR", "Goose Byte", "PixelDoors",
  "Play Fusion", "Sad Cat Studios",
];

const benefits = [
  {
    num: "01",
    title: "Activate dozens of micro-creators in one shot.",
    body: "Spread your launch budget across 50+ verified small streamers in parallel. More gameplay hours, more language coverage, more chat-level discovery than betting on one big influencer.",
  },
  {
    num: "02",
    title: "Pay only for verified, completed Quests.",
    body: "Every submission is reviewed by a human for category, gameplay time, and brief compliance. No bot inventory, no padded numbers. Unused budget above threshold is refunded.",
  },
  {
    num: "03",
    title: "Verified KPI reporting after every campaign.",
    body: "Average viewers, watch time, chat sentiment, VOD links, geo and language distribution, tier completion, top streams. Real data you can take into the next campaign.",
  },
  {
    num: "04",
    title: "QA, UX feedback, and player insights along the way.",
    body: "Harvest organic gameplay footage for QA reviews, UX testing, vertical-slice feedback, or social recaps. Streamers reveal things no internal playtest will.",
  },
];

const campaignTypes = [
  { title: "Game launches", body: "Day-one paid streamer coverage timed to your release window with maximum simultaneous activation." },
  { title: "Steam Next Fest", body: "Demo-focused pushes for visibility, wishlist lift, and creator chemistry during the fest window." },
  { title: "Update & patch campaigns", body: "Reactivate creators around major content drops, expansions, or seasonal updates." },
  { title: "Multiplayer playtests", body: "Co-op or PvP playtest activations with structured side quests for feedback and viral moments." },
  { title: "Discount window pushes", body: "Sales, Steam fests, anniversary discounts — match the activation window to the storefront moment." },
  { title: "Vertical slice & demo reviews", body: "Bring early creators in for atmosphere checks, gameplay loop feedback, and qualitative reads before launch." },
];

const studioSteps = [
  { n: "01", t: "Share your game assets",      d: "Logo and cover art minimum. Trailers, Steam links, embargo notes, key art all help us write a stronger brief." },
  { n: "02", t: "We build the mission brief",  d: "Streaming requirements, side quest options, timing, specific CTAs, payout tiers. You approve before anything goes live." },
  { n: "03", t: "Hand-screened 50+ creators",  d: "Every applicant manually reviewed for community quality, content fit, and authentic engagement. Zero automated bulk approvals." },
  { n: "04", t: "Live and verified",           d: "Two-week activation window. Each VOD reviewed by a human for category, gameplay time, and brief compliance before payout." },
  { n: "05", t: "Transparent KPI report",      d: "Viewer hours, cost per viewer hour, creator list with follower/CCV data, tier completion, language and geo breakdown." },
];

const studioTestimonials = [
  {
    quote: "Working with StreamQuest was a great experience for our game and was incredibly efficient. Besides the initial set up call, Murat and his team managed the entire campaign for us. They were also able to achieve better results and rates than the agencies we've worked with in the past.",
    studio: "Wildcard Alliance",
    role: "Multiplayer arena PvP",
    logo: "/firebase-public/Logos Partner/Acclaim.webp",
  },
  {
    quote: "Murat offered a great client service and an amazing pool of creators who genuinely engaged with our digital event. StreamQuest was a fantastic partner for Endix.",
    studio: "Endix",
    role: "Industry expo event partner",
    logo: "/firebase-public/Logos Partner/Endix.webp",
  },
  {
    quote: "StreamQuest has been a great tool for our influencer marketing! Our clients loved working with Murat and his team.",
    studio: "Critical Hit PR",
    role: "Games marketing agency",
    logo: "/firebase-public/Logos Partner/Critical Hit PR.webp",
  },
  {
    quote: "They were able to achieve better results and rates than the agencies we've worked with in the past. Would highly recommend working with them to help get streamer coverage for your indie game.",
    studio: "1 Minus 1",
    role: "Indie studio",
    logo: "/firebase-public/Logos Partner/1Minus1.webp",
  },
];

/* Three rows of game art for the hero marquee background. Different games per row, dup'd for seamless loop. */
const heroRowA = [...quests, ...quests];
const heroRowB = [...quests.slice(5).concat(quests.slice(0, 5)), ...quests.slice(5).concat(quests.slice(0, 5))];
const heroRowC = [...quests.slice(8).concat(quests.slice(0, 8)), ...quests.slice(8).concat(quests.slice(0, 8))];

/* ============ PAGE ============ */

export default function BrandsPage() {
  return (
    <div className="rd">
      <FloatingApply
        line1="Launching a game?"
        line2="Book a free strategy call"
        ctaText="Book →"
        ctaClass="btn-twitch"
        accent="purple"
      />

      {/* ============ HERO ============ */}
      <section className="br-hero">
        {/* Multi-row game art marquee background */}
        <div className="br-hero-bg" aria-hidden="true">
          <div className="br-hero-row a">
            {heroRowA.map((q, i) => (
              <div key={`a-${q.slug}-${i}`} className="br-hero-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={q.cover} alt={q.title} loading={i < 3 ? "eager" : "lazy"} />
              </div>
            ))}
          </div>
          <div className="br-hero-row b">
            {heroRowB.map((q, i) => (
              <div key={`b-${q.slug}-${i}`} className="br-hero-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={q.cover} alt={q.title} loading="lazy" />
              </div>
            ))}
          </div>
          <div className="br-hero-row c">
            {heroRowC.map((q, i) => (
              <div key={`c-${q.slug}-${i}`} className="br-hero-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={q.cover} alt={q.title} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="br-hero-inner">
          <Reveal>
            <span className="br-eyebrow">
              <span className="pulse" />
              For studios &amp; publishers
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1>
              <span className="line">Launch with</span>
              <span className="line grad-purple">50+ verified creators.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="br-hero-sub">
              StreamQuest runs gamified Twitch streamer campaigns for indie and AA games. Authentic micro-creators, manual VOD verification, and transparent KPI reporting from day one. You pay for completed, verified Quests — nothing else.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="br-hero-ctas">
              <a href="https://discord.gg/NhqfucYDXD" className="btn btn-twitch btn-xl">
                Book a strategy call →
              </a>
              <Link href="#campaigns" className="btn btn-secondary btn-xl">
                See past campaigns
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="br-hero-trust">
              <div className="rd-trust-item"><span className="rd-trust-num">50+</span><span className="rd-trust-label">creators / launch</span></div>
              <div className="rd-trust-item"><span className="rd-trust-num">13+</span><span className="rd-trust-label">campaigns shipped</span></div>
              <div className="rd-trust-item"><span className="rd-trust-num">20+</span><span className="rd-trust-label">countries reached</span></div>
              <div className="rd-trust-item"><span className="rd-trust-num">100%</span><span className="rd-trust-label">manual VOD review</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ KEY BENEFITS ============ */}
      <section className="br-section">
        <div className="rd-shell">
          <Reveal>
            <div className="br-section-head">
              <span className="br-section-tag">Why studios pick us</span>
              <h2>Built for indie & AA launches, <span className="grad-purple">not influencer auctions</span>.</h2>
              <p>The same launch budget spread across 50+ verified micro-streamers produces more gameplay footage, more language coverage, and more chat-level discovery than a single big creator deal.</p>
            </div>
          </Reveal>

          <div className="br-benefits">
            {benefits.map((b, i) => (
              <Reveal key={b.num} delay={i * 0.08}>
                <div className="br-benefit">
                  <span className="br-num">{b.num}</span>
                  <h3>{b.title}</h3>
                  <p>{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STEAM GROWTH (animated counter) ============ */}
      <section className="br-section" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="rd-shell">
          <Reveal>
            <div className="br-section-head" style={{ marginBottom: 40 }}>
              <span className="br-section-tag">The Steam reality</span>
              <h2>
                Your game is launching into the <span className="grad-purple">most crowded storefront</span> in history.
              </h2>
              <p>
                Two decades of growth. 131,000+ games on Steam, with another 8,800 added this year alone. Discovery now hinges on creators who can cut through the noise — and that is exactly what we are built to deliver.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <SteamGrowthCounter />
          </Reveal>
        </div>
      </section>

      {/* ============ IMAGE BREAK (replaces stats) ============ */}
      <section className="br-break" aria-label="Performance-based pricing">
        <div className="br-break-bg" aria-hidden="true">
          {[
            "/firebase-public/Game Screenshots/GODBREAKERS.webp",
            "/firebase-public/Game Screenshots/TAXI CHAOS 2.webp",
            "/firebase-public/Game Screenshots/PLANET OF LANA 2.webp",
            "/firebase-public/Game Screenshots/TEMTEM SWARM.webp",
            "/firebase-public/Game Screenshots/ASKA.webp",
            "/firebase-public/Game Screenshots/GRIDBEAT (1).webp",
          ].map((src) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img key={src} src={src} alt="" loading="lazy" decoding="async" />
          ))}
        </div>
        <div className="br-break-overlay" aria-hidden="true" />
        <div className="br-break-inner">
          <Reveal>
            <span className="br-break-tag">Performance based</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>
              Pay only for <span className="grad-purple">successful streamer activations</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              Every Quest is manually verified before payout. No bots, no padded numbers, no charging for partial runs. Unused budget above the agreed threshold is refunded.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ CAMPAIGN TYPES ============ */}
      <section className="br-section">
        <div className="rd-shell">
          <Reveal>
            <div className="br-section-head">
              <span className="br-section-tag lime">Campaign types</span>
              <h2>The activations we run.</h2>
              <p>Pick the moment that matters most. We build the brief, screen creators, run the activation, and deliver the report.</p>
            </div>
          </Reveal>

          <div className="br-types">
            {campaignTypes.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.05}>
                <div className="br-type">
                  <div className="br-type-num">{String(i + 1).padStart(2, "0")}</div>
                  <h3>{t.title}</h3>
                  <p>{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GAMES SHOWCASE ============ */}
      <section className="br-section" id="campaigns" style={{ padding: "24px 0" }}>
        <Reveal>
          <div className="br-section-head" style={{ marginBottom: 28 }}>
            <span className="br-section-tag">Recent campaigns</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}>The library so far.</h2>
          </div>
        </Reveal>

        <div className="br-strip" aria-hidden="true">
          <div className="br-strip-track">
            {[...quests, ...quests].map((q, i) => (
              <div key={`${q.slug}-${i}`} className="br-strip-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={q.cover} alt={q.title} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STUDIO TESTIMONIALS ============ */}
      <section className="br-section">
        <div className="rd-shell">
          <Reveal>
            <div className="br-section-head">
              <span className="br-section-tag">From the studios</span>
              <h2>What partners say.</h2>
              <p>Quotes from real studio and publisher teams that shipped campaigns with us.</p>
            </div>
          </Reveal>

          <div className="br-testimonials">
            {studioTestimonials.map((t, i) => (
              <Reveal key={t.studio} delay={i * 0.08}>
                <figure className="br-quote">
                  <span className="br-quote-mark" aria-hidden="true">“</span>
                  <blockquote className="br-quote-body">{t.quote}</blockquote>
                  <figcaption className="br-quote-author">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="br-quote-logo" src={t.logo} alt={`${t.studio} logo`} loading="lazy" />
                    <div className="br-quote-attr">
                      <span className="br-quote-name">{t.studio}</span>
                      <span className="br-quote-role">{t.role}</span>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PARTNERS ============ */}
      <div className="rd-partners">
        <div className="rd-partners-wrap">
          <div className="rd-partners-track" aria-hidden="true">
            {[...partners, ...partners].map((name, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={`${name}-${i}`}
                className="rd-partner-logo"
                src={`/firebase-public/Logos Partner/${name}.png`}
                alt={name === "Current Games (2)" ? "Current Games" : name}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ============ PROCESS ============ */}
      <section className="br-section">
        <div className="rd-shell">
          <Reveal>
            <div className="br-section-head">
              <span className="br-section-tag">How a campaign runs</span>
              <h2>From brief to <span className="grad-purple">KPI report</span>.</h2>
              <p>Five steps. Two weeks typical activation. Everything fully managed by us.</p>
            </div>
          </Reveal>

          <div className="br-process">
            {studioSteps.map((s) => (
              <Reveal key={s.n}>
                <div className="br-step">
                  <span className="br-step-num">Step {s.n}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="br-final">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="br-final-questy left"
          src="/firebase-public/Questy New Folder/Questy Regular Size (3).webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="br-final-questy"
          src="/firebase-public/Questy New Folder/Questy Regular Size (1).webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />

        <div className="br-final-inner">
          <Reveal>
            <span className="br-eyebrow">
              <span className="pulse" />
              Ready to launch
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>
              See the power of <span className="grad-purple">hundreds of micro-quests</span> in action.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              Book a free strategy call. We&apos;ll walk you through campaign types, expected KPIs for your title, and a flexible budget range that fits your launch.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="br-final-actions">
              <a href="https://discord.gg/NhqfucYDXD" className="btn btn-twitch btn-xl">
                Book a strategy call →
              </a>
              <Link href="/quests-guide" className="btn btn-secondary btn-xl">
                See the creator side
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
