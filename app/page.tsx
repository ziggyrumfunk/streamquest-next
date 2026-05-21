import Link from "next/link";
import Reveal from "./components/Reveal";
import FloatingDiscord from "./components/FloatingDiscord";
import PolaroidField from "./components/PolaroidField";
import SteamGrowthCounter from "./components/SteamGrowthCounter";
import { getQuestsWithLiveStatus } from "@/lib/questStatus";
import "./redesign.css";

/* ============================================================
   StreamQuest — HOMEPAGE v3
   Editorial, polaroid-driven, no boxes (except Discord).
   Classic version preserved at /classic.
   ============================================================ */

/* ===== DATA ===== */

const partners = [
  "Thunderful", "Misty Whale", "1Minus1", "Current Games (2)",
  "NoWhere Studios", "Acclaim", "SandSailorStudio", "RocketRide",
  "Amber Studios", "Critical Hit PR", "Goose Byte", "PixelDoors",
  "Play Fusion", "Sad Cat Studios",
];

// activeQuests + library are derived per-request from the live status helper,
// so admin flips show up here without a rebuild. See HomePage() below.

/** Floating mixed-media tiles in the hero — big game art at the corners,
    medium gameplay screenshots on the sides, small circular streamer avatars scattered. */
const heroTiles = [
  // Top corners — big portrait game key art (anchors)
  { src: "/firebase-public/Game Cover Art/planet of lana 2 key art.jpg", className: "p1",  depth: 0.7, priority: true },
  { src: "/firebase-public/Game Cover Art/aska key art.jpg",             className: "p2",  depth: 0.6, priority: true },

  // Bottom corners — more big game key art (anchors)
  { src: "/firebase-public/Game Cover Art/godbreakers key art.jpg",      className: "p7",  depth: 0.5 },
  { src: "/firebase-public/Game Cover Art/wildcard key art.jpg",         className: "p8",  depth: 0.6 },

  // Mid sides — landscape gameplay screenshots
  { src: "/firebase-public/Game Screenshots/PLANET OF LANA 2.jpg",       className: "p5",  depth: 0.55 },
  { src: "/firebase-public/Game Screenshots/ASKA.jpg",                   className: "p6",  depth: 0.65 },

  // Bottom outer — landscape gameplay screenshots
  { src: "/firebase-public/Game Screenshots/GODBREAKERS.jpg",            className: "p15", depth: 0.5 },
  { src: "/firebase-public/Game Screenshots/TEMTEM SWARM.jpg",           className: "p16", depth: 0.55 },

  // Small circular streamer avatars (8 of them, scattered)
  { src: "/firebase-public/Streamer Icons/CaedesEnder.png",              className: "p3 is-avatar",  depth: 0.4 },
  { src: "/firebase-public/Streamer Icons/Findseloy.png",                className: "p4 is-avatar",  depth: 0.5 },
  { src: "/firebase-public/Streamer Icons/Paildry.png",                  className: "p9 is-avatar",  depth: 0.35 },
  { src: "/firebase-public/Streamer Icons/ShrillGoblin.png",             className: "p10 is-avatar", depth: 0.45 },
  { src: "/firebase-public/Streamer Icons/FalaMarkao.png",               className: "p11 is-avatar", depth: 0.4 },
  { src: "/firebase-public/Streamer Icons/Fradda.png",                   className: "p12 is-avatar", depth: 0.5 },
  { src: "/firebase-public/Streamer Icons/lunarivalkyrie.png",           className: "p13 is-avatar", depth: 0.45 },
  { src: "/firebase-public/Streamer Icons/ItsTsubaki.png",               className: "p14 is-avatar", depth: 0.4 },
];

/** Floating game-art tiles in the final CTA — 8 different ones. */
const finalTiles = [
  { src: "/firebase-public/Game Cover Art/ascendant key art.jpg",        className: "f1", depth: 0.6 },
  { src: "/firebase-public/Game Cover Art/cyberclutch key art.jpg",      className: "f2", depth: 0.7 },
  { src: "/firebase-public/Game Cover Art/drill and delve key art.jpg",  className: "f3", depth: 0.35 },
  { src: "/firebase-public/Game Cover Art/Crema_Temtem_Swarm_KeyArt (1) (1).jpg", className: "f4", depth: 0.45 },
  { src: "/firebase-public/Game Screenshots/ASTRO BURN.jpg",             className: "f5", depth: 0.55 },
  { src: "/firebase-public/Game Screenshots/MEXICAN NINJA.jpg",          className: "f6", depth: 0.65 },
  { src: "/firebase-public/Game Screenshots/GOOD HEAVENS.jpg",           className: "f7", depth: 0.4 },
  { src: "/firebase-public/Game Screenshots/ENDIX.jpg",                  className: "f8", depth: 0.5 },
];

const features = [
  { num: "01", title: "Real money, not 'exposure'.", body: "Every quest has a clear payout in euros, paid through your existing Twitch donation setup. No keys-for-coverage, no IOUs, no 'we will send you free stuff'." },
  { num: "02", title: "No follower-count gatekeepers.", body: "300+ followers and 5+ average concurrent viewers is the bar. All regions welcome. No slot monopolies, no auto-rejections from real, engaged communities." },
  { num: "03", title: "Paid within five business days.", body: "After your VOD is manually verified, payout lands in five business days via Streamlabs, StreamElements, or alternative methods on request." },
];

/** Real testimonials pulled from the existing testimonials page. */
const testimonials = [
  {
    name: "Paildry",
    handle: "twitch.tv/paildry",
    twitch: "https://twitch.tv/Paildry",
    avatar: "/firebase-public/Streamer Icons/Paildry.png",
    quote: "Completed 10+ quests across several great games, and every payment arrived on time as promised. StreamQuest has been reliable and transparent in what it offers, and I'd definitely recommend it.",
  },
  {
    name: "ShrillGoblin",
    handle: "twitch.tv/shrillgoblin",
    twitch: "https://www.twitch.tv/shrillgoblin",
    avatar: "/firebase-public/Streamer Icons/ShrillGoblin.png",
    quote: "Administration is thorough and responsive, with quick turn arounds for quest completions. Wide variety of games to cover. I have been more than happy to recommend the program to several of my content creator friends.",
  },
  {
    name: "Findseloy",
    handle: "twitch.tv/findseloy",
    twitch: "https://www.twitch.tv/findseloy",
    avatar: "/firebase-public/Streamer Icons/Findseloy.png",
    quote: "I have been here practically since the beginning and I have never seen a project so friendly to smaller creators. Everything has been and continues to be incredible. Very interesting games and the support is amazing.",
  },
  {
    name: "LunariValkyrie",
    handle: "twitch.tv/lunarivalkyrie",
    twitch: "https://www.twitch.tv/lunarivalkyrie",
    avatar: "/firebase-public/Streamer Icons/lunarivalkyrie.png",
    quote: "My experience with StreamQuest has been nothing but wonderful. After being treated so poorly on another platform, despite being a top performer, I was scared to try another. But I couldn't be happier here.",
  },
];

/** Earnings ladder shown on the homepage. */
const tiers = [
  {
    code: "TIER 01",
    title: "Bronze quest",
    stats: ["Stream 1 hour", "5 average concurrent viewers", "Correct Twitch category"],
    payout: "€10",
  },
  {
    code: "TIER 02",
    title: "Silver quest",
    stats: ["Stream 2+ hours", "15 average concurrent viewers", "Side quests count toward XP"],
    payout: "€25+",
  },
  {
    code: "BONUS",
    title: "Side quests",
    stats: ["Clips, social posts, surveys", "In-game objectives", "Unlock higher reward tiers"],
    payout: "EXTRA XP",
    isText: true,
  },
];

const streamerSteps = [
  { n: "01", t: "Connect Twitch", d: "Log in via the Creator Dashboard. Baseline: 300+ followers and 5+ average concurrent viewers. Real communities, real engagement." },
  { n: "02", t: "Pick a quest", d: "Browse active campaigns. Each one has a mission brief with payouts, side quests, and clear timing." },
  { n: "03", t: "Go live", d: "Stream under the correct Twitch category. Side Quests unlock additional XP and reward tiers." },
  { n: "04", t: "Submit your VOD", d: "Drop your VOD link in the dashboard. A human reviews for category, time, and brief compliance." },
  { n: "05", t: "Get paid", d: "Payout within 5 business days via Streamlabs or StreamElements. No bank details for standard payouts." },
];

const studioSteps = [
  { n: "01", t: "Share your assets", d: "Logo and cover art minimum. Trailers, Steam links, key art all help us build a stronger brief." },
  { n: "02", t: "We write the brief", d: "Streaming requirements, Side Quest options, timing, embargo notes, specific CTAs. You approve before launch." },
  { n: "03", t: "Hand-screened 50+ creators", d: "Every applicant manually reviewed for community quality, eligibility, and content fit. Zero auto-approvals." },
  { n: "04", t: "VOD verification", d: "Each stream manually reviewed for correct category, minimum gameplay time, and brief compliance." },
  { n: "05", t: "Full KPI report", d: "Viewer hours, cost per viewer hour, creator list, tier completion, top streams, language and geo." },
];

const streamerFaqs = [
  { q: "How do I get paid as a small Twitch streamer?", a: "After our team manually verifies your completed Quest, your payout is processed within 5 business days through your existing Twitch donation setup (Streamlabs or StreamElements). No bank details required for standard payouts." },
  { q: "Do I need a big audience to join?", a: "No huge audience needed. Baseline is 300+ Twitch followers and 5+ average concurrent viewers. Exceptions possible for clearly real, engaged communities. All regions welcome." },
  { q: "What is a Main Quest, and what are Side Quests?", a: "Each campaign has a Main Quest (paid streaming requirement) and optional Side Quests (clips, social sharing, surveys, in-game objectives) that earn extra XP and unlock higher reward tiers." },
  { q: "Do I need to share bank details?", a: "Not for standard payouts. Payments go through your existing Twitch donation provider. Alternative methods may be available depending on the campaign." },
  { q: "Where do I find help during a campaign?", a: "Discord is the main hub. Real answers from a real team, onboarding help, campaign updates, and live community support." },
];

const studioFaqs = [
  { q: "What kinds of game campaigns can we run?", a: "Demos, Steam Next Fest pushes, full launches, update campaigns, multiplayer playtests, vertical slice feedback, discount window activations. Typical window is 2 weeks with 50+ creator slots." },
  { q: "How does StreamQuest measure campaign performance?", a: "Full KPI report after every campaign: total viewer hours, cost-per-viewer-hour, creator list with follower and CCV data, tier completion, top streams, language and geo distribution." },
  { q: "Do we control what streamers say?", a: "No, and that is by design. Streamers keep full freedom of opinion. Specific CTAs can be implemented as optional Side Quests. Authenticity is what makes the campaigns work." },
  { q: "How much does a campaign cost?", a: "Estimated upfront, reconciled on verified completions. You pay only for filled, verified Quest slots. Unused budget above the agreed threshold is refunded. No hidden fees." },
  { q: "Can you track wishlists and demo downloads?", a: "Yes. Wishlist, demo, and click tracking via unique UTM links agreed at campaign setup. Specific CTAs can be built into Side Quests without compromising creator authenticity." },
];

/* ===== JSON-LD ===== */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...streamerFaqs, ...studioFaqs].map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "StreamQuest",
  url: "https://streamquest.io",
  description: "Paid quest-based Twitch streamer campaigns for indie and AA games.",
  sameAs: [
    "https://www.instagram.com/streamquest.io/",
    "https://www.youtube.com/@StreamQuest_io",
    "https://www.tiktok.com/@streamquest.io",
    "https://www.linkedin.com/company/streamquestio/",
  ],
};

/* ===== PAGE ===== */

export default async function HomePage() {
  const all = await getQuestsWithLiveStatus();
  const activeQuests = all
    .filter((q) => q.status === "active")
    .map((q, i) => ({
      slug: q.slug,
      title: q.title,
      tagline: q.tagline,
      cover: q.cover,
      logo: q.logo,
      feature: i === 0,
    }));
  const library = all.map((q) => ({
    slug: q.slug,
    title: q.title,
    cover: q.portrait || q.cover,
    status: q.status === "active" ? ("Active" as const) : undefined,
  }));
  return (
    <div className="rd">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* ============ HERO (centered + cursor-reactive 3:4 tiles) ============ */}
      <section className="rd-hero">
        <PolaroidField tiles={heroTiles} className="rd-polaroids" intensity={85} />

        <div className="rd-hero-inner">
          {activeQuests.length > 0 && (
            <Reveal>
              <span className="eyebrow">
                <span className="pulse" />
                {activeQuests.length} active campaigns running now
              </span>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <h1>
              <span className="line">Paid Twitch streams.</span>
              <span className="line grad">Real reach.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="rd-hero-sub">
              StreamQuest is the quest-based Twitch creator platform. Micro-streamers earn real money playing new indie and AA games. Studios get authentic launch reach with full KPI reporting and zero bot inventory.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="rd-hero-ctas">
              <a href="https://discord.gg/NhqfucYDXD" className="btn btn-primary btn-xl">
                Join Discord →
              </a>
              <Link href="/brands" className="btn btn-secondary btn-xl">
                Launch a campaign
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="rd-hero-trust">
              <div className="rd-trust-item"><span className="rd-trust-num">5d</span><span className="rd-trust-label">payout window</span></div>
              <div className="rd-trust-item"><span className="rd-trust-num">25+</span><span className="rd-trust-label">successful campaigns</span></div>
              <div className="rd-trust-item"><span className="rd-trust-num">50+</span><span className="rd-trust-label">creators per launch</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PARTNERS (trust signal #1) ============ */}
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

      {/* ============ EARN + VIDEO (simplified: header → video → tiers) ============ */}
      <section className="rd-earn-video">
        <Reveal>
          <div className="rd-earn-head">
            <span className="rd-section-tag">What you earn</span>
            <h2>Stream. Verify. <span className="grad">Get paid.</span></h2>
            <p>Every quest has clear tiers. Hit the requirements, submit your VOD, a real person reviews it before payout lands.</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="rd-earn-video-wrap">
            <iframe
              src="https://www.youtube.com/embed/RVqwzxQ32qA"
              title="StreamQuest: how paid Twitch quests work for streamers and studios"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal>
          <div className="rd-earn-tiers">
            <div className="rd-earn-tier">
              <div className="rd-earn-tier-name">Bronze</div>
              <div className="rd-earn-tier-payout">€10</div>
              <div className="rd-earn-tier-req">Stream 1 hour · 5 CCV</div>
            </div>
            <div className="rd-earn-tier">
              <div className="rd-earn-tier-name">Silver</div>
              <div className="rd-earn-tier-payout">€25+</div>
              <div className="rd-earn-tier-req">Stream 2+ hours · 15 CCV</div>
            </div>
            <div className="rd-earn-tier bonus">
              <div className="rd-earn-tier-name">Bonus</div>
              <div className="rd-earn-tier-payout">Extra XP</div>
              <div className="rd-earn-tier-req">Side quests · clips · in-game objectives</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ ACTIVE CAMPAIGNS (only if any) ============ */}
      {activeQuests.length > 0 && (
      <section className="rd-section tight-top">
        <div className="rd-shell-wide">
          <Reveal>
            <div className="rd-campaigns-head">
              <span className="rd-section-tag">Active campaigns</span>
              <h2>Live quests right now</h2>
              <p>{activeQuests.length} indie and AA games are running paid streamer campaigns this minute. Apply via Discord or the Creator Dashboard.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className={`rd-active-featured${activeQuests.length === 1 ? " is-single" : ""}`}>
              {activeQuests.map((q) => (
                <Link
                  key={q.slug}
                  href={`/quests/${q.slug}`}
                  className={`rd-active-card is-active ${q.feature ? "feature" : ""}${q.logo ? " has-logo" : ""}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={q.cover} alt={`${q.title} key art`} loading="lazy" />
                  {q.logo && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={q.logo} alt={q.title} className="rd-active-logo" loading="lazy" />
                  )}
                  <div className="rd-active-body">
                    <div className="rd-active-status">
                      <span className="pd" />
                      Active
                    </div>
                    {!q.logo && <h3>{q.title}</h3>}
                    <p className="rd-active-tag">{q.tagline}</p>
                    <span className="rd-active-cta">Mission brief →</span>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>

        </div>
      </section>
      )}

      {/* ============ TESTIMONIALS (real streamer quotes) ============ */}
      <section className="rd-testimonials">
        <div className="rd-shell">
          <Reveal>
            <div className="rd-testimonials-head">
              <span className="rd-section-tag">From the streamers</span>
              <h2>Real quotes. Real creators.</h2>
              <p>Every voice below comes from a streamer who has run a paid StreamQuest campaign. Pulled straight from our testimonials page.</p>
            </div>
          </Reveal>

          <div className="rd-testimonials-grid">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <figure className="rd-quote">
                  <span className="rd-quote-mark" aria-hidden="true">“</span>
                  <blockquote className="rd-quote-body">{t.quote}</blockquote>
                  <figcaption className="rd-quote-author">
                    <div className="rd-quote-avatar">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.avatar} alt={`${t.name} avatar`} loading="lazy" />
                    </div>
                    <div>
                      <span className="rd-quote-name">{t.name}</span>
                      <a className="rd-quote-handle" href={t.twitch} rel="noopener">{t.handle}</a>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CAMPAIGN LIBRARY (moved under testimonials) ============ */}
      <section className="rd-section" style={{ paddingTop: 60 }}>
        <div className="rd-shell-wide">
          <Reveal>
            <div className="rd-library-head" style={{ paddingTop: 0, borderTop: "none" }}>
              <span className="rd-section-tag">Campaign library</span>
              <h3>Every quest we have ever shipped.</h3>
              <p>Real indie and AA games activated across dozens of verified streamers. Hover any tile to see the title.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="rd-library-grid">
              {library.map((g) => (
                <Link key={g.slug} href={`/quests/${g.slug}`} className="rd-lib-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.cover} alt={`${g.title} key art`} loading="lazy" />
                  {g.status === "Active" && (
                    <span className="rd-lib-badge">Active</span>
                  )}
                  <div className="rd-lib-name">{g.title}</div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ WHY STREAMQUEST (no boxes) ============ */}
      <section className="rd-section rd-why">
        <div className="rd-shell">
          <Reveal>
            <div className="rd-why-head">
              <span className="rd-section-tag">Why StreamQuest</span>
              <h2>Discovery happens in the <span className="grad">micro-community</span>.</h2>
              <p className="rd-why-lead">
                Real gaming discovery happens inside smaller streams where viewers talk, trust the host, and try games together. Instead of betting on one big creator, studios run across 50+ authentic micro-streamers simultaneously. More gameplay footage. More language coverage. More chat-level discovery.
              </p>
            </div>
          </Reveal>

          <div className="rd-why-features">
            {features.map((f, i) => (
              <Reveal key={f.num} delay={i * 0.08}>
                <div className="rd-feat">
                  <span className="rd-feat-num">{f.num}</span>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="rd-why-cta-row">
              <Link href="/streamers" className="rd-prominent-cta">
                <span className="rd-prominent-cta-tag">For Streamers</span>
                <h3>Become a paid streamer.</h3>
                <p>Earn real money playing new indie and AA games. No follower minimum gatekeepers.</p>
                <span className="rd-prominent-cta-link">Open dashboard →</span>
              </Link>
              <Link href="/brands" className="rd-prominent-cta twitch">
                <span className="rd-prominent-cta-tag">For Studios</span>
                <h3>Launch a campaign.</h3>
                <p>Activate 50+ verified creators with manual VOD review and full KPI reporting.</p>
                <span className="rd-prominent-cta-link">Talk to us →</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ STEAM GROWTH (animated counter) ============ */}
      <section className="rd-section" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="rd-shell">
          <Reveal>
            <div className="rd-section-head center" style={{ marginBottom: 40 }}>
              <span className="rd-section-tag">The market</span>
              <h2>
                <span className="grad">21,489 games</span> launched on Steam in 2025.
              </h2>
              <p>
                The market has gotten 300x bigger since 2006. Discovery has not. StreamQuest is where the noise becomes attention — paid, verified streamers cutting through for the games worth playing.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <SteamGrowthCounter />
          </Reveal>
        </div>
      </section>

      {/* ============ STATS (numerical proof, above Process) ============ */}
      <section className="rd-stats" aria-label="StreamQuest platform statistics">
        <div className="rd-stats-bg" aria-hidden="true">
          {[
            "/firebase-public/Game Screenshots/GODBREAKERS.jpg",
            "/firebase-public/Game Screenshots/TAXI CHAOS 2.jpg",
            "/firebase-public/Game Screenshots/PLANET OF LANA 2.jpg",
            "/firebase-public/Game Screenshots/TEMTEM SWARM.jpg",
            "/firebase-public/Game Screenshots/ASKA.jpg",
            "/firebase-public/Game Screenshots/GRIDBEAT (1).jpg",
          ].map((src) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img key={src} src={src} alt="" loading="lazy" decoding="async" />
          ))}
        </div>
        <div className="rd-stats-overlay" aria-hidden="true" />
        <div className="rd-shell">
          <Reveal>
            <div className="rd-stats-grid">
              <div className="rd-stat">
                <div className="rd-stat-num">50+</div>
                <div className="rd-stat-label">Creators per launch</div>
              </div>
              <div className="rd-stat">
                <div className="rd-stat-num">13+</div>
                <div className="rd-stat-label">Indie & AA campaigns</div>
              </div>
              <div className="rd-stat">
                <div className="rd-stat-num">20+</div>
                <div className="rd-stat-label">Countries reached</div>
              </div>
              <div className="rd-stat">
                <div className="rd-stat-num">5d</div>
                <div className="rd-stat-label">Max payout window</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PROCESS (timeline, no boxes) ============ */}
      <section className="rd-section">
        <div className="rd-shell">
          <Reveal>
            <div className="rd-section-head center" style={{ marginBottom: 72, marginLeft: "auto", marginRight: "auto" }}>
              <span className="rd-section-tag">Process</span>
              <h2>One platform. Two paths.</h2>
              <p>Pick yours. Five steps from connect to completion on both sides.</p>
            </div>
          </Reveal>

          <div className="rd-process">
            <Reveal>
              <div className="rd-process-col streamers">
                <h3>For streamers</h3>
                <p className="rd-process-sub">Earn real money playing new games.</p>
                <div className="rd-process-timeline">
                  {streamerSteps.map((s) => (
                    <div key={s.n} className="rd-process-step">
                      <span className="rd-process-num">Step {s.n}</span>
                      <h4>{s.t}</h4>
                      <p>{s.d}</p>
                    </div>
                  ))}
                </div>
                <a href="https://app.streamquest.io" className="btn btn-primary rd-process-cta">
                  Become a paid streamer
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rd-process-col studios">
                <h3>For studios</h3>
                <p className="rd-process-sub">Authentic launch reach across 50+ creators.</p>
                <div className="rd-process-timeline">
                  {studioSteps.map((s) => (
                    <div key={s.n} className="rd-process-step">
                      <span className="rd-process-num">Step {s.n}</span>
                      <h4>{s.t}</h4>
                      <p>{s.d}</p>
                    </div>
                  ))}
                </div>
                <Link href="/brands" className="btn btn-twitch rd-process-cta">
                  Launch a campaign
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ DISCORD (the one allowed card) ============ */}
      <section className="rd-section rd-discord">
        <div className="rd-shell">
          <Reveal>
            <div className="rd-discord-card">
              <div>
                <span className="rd-section-tag" style={{ color: "var(--rd-twitch-2)" }}>Community</span>
                <h2>Discord is where StreamQuest lives.</h2>
                <p>The fastest way to see new quests, get real support from the team, meet other creators, and stay close to the community between campaigns.</p>

                <div className="rd-discord-points">
                  <div className="rd-discord-point">See new quest drops before anyone else.</div>
                  <div className="rd-discord-point">Real human support, not bot replies.</div>
                  <div className="rd-discord-point">Meet other creators in your region.</div>
                  <div className="rd-discord-point">Track brief updates, embargo notes, payout status.</div>
                </div>

                <div className="rd-discord-actions">
                  <a href="https://discord.gg/NhqfucYDXD" className="btn btn-twitch">Join Discord</a>
                  <a href="https://app.streamquest.io" className="btn btn-secondary">Open Dashboard</a>
                </div>
              </div>

              <div className="rd-discord-widget">
                <iframe
                  src="https://discord.com/widget?id=1365282965487226960&theme=dark"
                  title="StreamQuest Discord community widget"
                  loading="lazy"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FAQ (no boxes) ============ */}
      <section className="rd-section">
        <div className="rd-shell">
          <Reveal>
            <div className="rd-section-head center" style={{ marginBottom: 72, marginLeft: "auto", marginRight: "auto" }}>
              <span className="rd-section-tag">Answers</span>
              <h2>Frequently asked</h2>
              <p>Direct answers for streamers and studios. Discord works for everything else.</p>
            </div>
          </Reveal>

          <div className="rd-faq-grid">
            <Reveal>
              <div>
                <div className="rd-faq-col-title">For streamers</div>
                {streamerFaqs.map((f) => (
                  <details key={f.q} className="rd-faq-item">
                    <summary>
                      <h3>{f.q}</h3>
                    </summary>
                    <div className="a">{f.a}</div>
                  </details>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <div className="rd-faq-col-title purple">For studios</div>
                {studioFaqs.map((f) => (
                  <details key={f.q} className="rd-faq-item">
                    <summary>
                      <h3>{f.q}</h3>
                    </summary>
                    <div className="a">{f.a}</div>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA (floating 3:4 tiles) ============ */}
      <section className="rd-final">
        <PolaroidField tiles={finalTiles} className="rd-polaroids" intensity={65} />

        <div className="rd-final-inner">
          <Reveal>
            <span className="eyebrow">
              <span className="pulse" />
              Get started in minutes
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>
              Your first quest is <span className="grad">one click away</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p>Whether you are a creator chasing your first paid stream or a studio ready to activate 50+ authentic creators, the door is open.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="rd-final-actions">
              <a href="https://discord.gg/NhqfucYDXD" className="btn btn-primary btn-xl">
                Join Discord →
              </a>
              <a href="https://app.streamquest.io" className="btn btn-secondary btn-xl">
                Become a paid streamer
              </a>
              <Link href="/brands" className="btn btn-twitch btn-xl">
                Launch a campaign
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FloatingDiscord />
    </div>
  );
}
