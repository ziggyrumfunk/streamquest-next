import Link from "next/link";
import type { Metadata } from "next";

import Reveal from "@/app/components/Reveal";
import PolaroidField from "@/app/components/PolaroidField";
import "@/app/redesign.css";
import "./pitch.css";

export const metadata: Metadata = {
  title: "StreamQuest pitch deck for partners",
  description:
    "Gamified micro-creator campaigns and indie marketing services for game studios and publishers. Real campaigns, verified results, boutique service.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/pitch" },
};

/* ============================================================
   /pitch — partner-facing pitch page (v2, editorial layout).
   No nav entry; footer link only.
   ============================================================ */

const partners = [
  "Thunderful", "Misty Whale", "1Minus1", "Current Games (2)",
  "NoWhere Studios", "Acclaim", "SandSailorStudio", "RocketRide",
  "Amber Studios", "Critical Hit PR", "Goose Byte", "PixelDoors",
  "Play Fusion", "Sad Cat Studios",
];

/* PolaroidField hero tiles: a wide spread of game art + screenshots.
   Position classes mapped in pitch.css under .pitch-hero. */
const heroTiles = [
  { src: "/firebase-public/Game Cover Art/taxi chaos 2 key art.jpg",      className: "h1", depth: 0.7, priority: true },
  { src: "/firebase-public/Game Cover Art/aska key art.jpg",              className: "h2", depth: 0.6, priority: true },
  { src: "/firebase-public/Game Cover Art/planet of lana 2 key art.jpg",  className: "h3", depth: 0.55 },
  { src: "/firebase-public/Game Cover Art/wildcard key art.jpg",          className: "h4", depth: 0.5 },
  { src: "/firebase-public/Game Cover Art/godbreakers key art.jpg",       className: "h5", depth: 0.45 },
  { src: "/firebase-public/Game Screenshots/TAXI CHAOS 2.jpg",            className: "h6", depth: 0.6 },
  { src: "/firebase-public/Game Screenshots/ENDIX.jpg",                   className: "h7", depth: 0.5 },
];

const finalTiles = [
  { src: "/firebase-public/Game Cover Art/ascendant key art.jpg",        className: "f1", depth: 0.6 },
  { src: "/firebase-public/Game Cover Art/cyberclutch key art.jpg",      className: "f2", depth: 0.7 },
  { src: "/firebase-public/Game Screenshots/ASTRO BURN.jpg",             className: "f3", depth: 0.55 },
  { src: "/firebase-public/Game Screenshots/MEXICAN NINJA.jpg",          className: "f4", depth: 0.5 },
  { src: "/firebase-public/Game Screenshots/GOOD HEAVENS.jpg",           className: "f5", depth: 0.45 },
];

const challenges = [
  { t: "Built for scale, not substance", d: "Traditional influencer marketing optimizes for reach, not resonance." },
  { t: "Indie budgets cannot compete", d: "Mega-creator slots eat a launch budget in one stream." },
  { t: "Vanity metrics hide performance", d: "Impressions and reach numbers do not translate into wishlists or sales." },
  { t: "Creators disconnected from outcomes", d: "One placement, one clip, contractually delivered and forgotten." },
];

const compareRows = [
  { label: "Community relationship", a: "Built through interaction. Viewers chat, get responses, form bonds.", b: "Built through scale. Reach is wide, interaction is limited." },
  { label: "Viewer trust", a: "Seen as peers or friends. Endorsements feel personal.", b: "Seen as personalities. Endorsements may feel branded." },
  { label: "Motivation", a: "Passion driven. Early career creators deeply invested in the quest.", b: "Career focused. Often juggling multiple sponsor slots per week." },
  { label: "Cost efficiency", a: "More creators per euro. Campaigns scale horizontally.", b: "High cost per placement. All or nothing." },
  { label: "UGC potential", a: "Every stream is a unique voice, diverse content, honest reactions.", b: "Limited variations. Often one clip or VOD per campaign." },
  { label: "Longevity", a: "High odds to continue streaming the game after contractual obligations.", b: "Unlikely to continue playing the game after contractual obligations." },
];

type QuestModelClip = { mp4: string; poster?: string };
const questModel: { name: string; body: string; clip: QuestModelClip }[] = [
  {
    name: "Main quest",
    body: "The primary objective for a campaign. The core task creators must complete to get paid and earn XP. Stream hours, category, side quest requirements.",
    clip: {
      mp4:  "/media/clips/clip-1.mp4",
    },
  },
  {
    name: "Side quests",
    body: "Optional extra challenges that unlock bonus XP. Post a gameplay clip, write a Steam review, share the wishlist link, complete a survey, finish the game.",
    clip: {
      mp4:  "/media/clips/clip-2.mp4",
    },
  },
  {
    name: "XP and tiers",
    body: "Bronze (5+ average viewers, top 6% of Twitch), Silver (15+ average viewers, top 3%), Gold (top XP earners, custom rates). Creators level up across quests.",
    clip: {
      mp4:  "/media/clips/clip-3.mp4",
    },
  },
];

const steps = [
  { n: "Submit", title: "Submit your brief", sub: "Define your main objectives, stream hours, and any bonus side quests like wishlists, surveys, or reviews." },
  { n: "Build", title: "We build the quest", sub: "Configure your campaign, set objectives, validate streamers, assign keys, track rewards and progress." },
  { n: "Activate", title: "Streamers activate", sub: "Qualified micro-creators join the quest, stream the game, and complete tasks to earn XP." },
  { n: "Report", title: "You get the report", sub: "Full campaign report with content links, engagement metrics, feedback, and unused credit returns." },
];

const usps = [
  { t: "Gamified campaigns", d: "We do not run influencer placements. We launch quests with objectives, XP, and leveling systems that incentivize real participation." },
  { t: "Micro creators", d: "50+ engaged micro-streamers per campaign. Smaller communities drive deeper watch time, higher trust, and stronger results." },
  { t: "Performance-based spend", d: "Campaigns are paid per successful activation. No empty impressions, no inflated costs. Unused credits are refunded." },
  { t: "Built-in QA layer", d: "Dozens of small creators streaming your game means organic QA at scale. See how real players engage, struggle, and react in real time." },
  { t: "Full service", d: "Setup, validation, key delivery, reporting, and side quest rewards handled in-house so lean studios do not need a marketing team." },
  { t: "Indie made for indies", d: "Built by people with a background in games and streaming who understand indie challenges and treat every campaign like it matters." },
];

const creatorActivation = [
  { t: "Quest design", d: "We translate your launch goals into a mission brief: stream hours, category, side quests, payout tiers, proof rules." },
  { t: "Creator vetting", d: "Hand-picked micro-streamers per campaign. Manual review for content fit, audience, region, quality." },
  { t: "Mission ops", d: "Approvals, key distribution, Discord coordination, VOD verification, side quest submissions, all handled by us." },
  { t: "Payouts", d: "We pay creators directly via their Twitch donation setup. No invoices for them to chase. Unused credits are refunded to you." },
  { t: "KPI reporting", d: "Monthly KPI deck with creator-level stats, peak viewers, watch-hours, social proof, and storefront UTM tracking." },
];

const marketingStudio = [
  { t: "Storefront", d: "Steam page audit, copy, capsules, localization, event timing. Custom GIFs and short video loops on the storefront." },
  { t: "Social media", d: "Planning, publishing, optimization, multi-platform native content. Native short-form per platform, not cross-posted." },
  { t: "Community management", d: "Discord, Reddit, Steam Hub, comment moderation, weekly engagement, dev-to-community translation." },
  { t: "Content and trailers", d: "Short-form video, graphics, screenshots, trailers, key art support. In-game capture handled by us." },
  { t: "Paid ads", d: "Meta, Reddit, YouTube. Creative testing, region targeting, budget reallocation to top performers." },
  { t: "Media kit", d: "Press-ready media kits with key art, screenshots, logos, fact sheets, trailers, and embed-ready assets." },
  { t: "Reporting", d: "Monthly KPI deck, source-of-truth dashboards, budget reconciliation. Transparent close-out." },
  { t: "Launch ops", d: "Daily monitoring, rapid replies, post-launch momentum, post-mortem." },
];

/* Taxi Chaos 2 case study assets. */
const taxiCase = {
  name: "Taxi Chaos 2",
  studio: "Current Games and Focuspoint Studios",
  service: "Full marketing partnership",
  keyart: "/firebase-public/TaxiChaos2/key art.jpg",
  trailer: "odR4CLlU5NY",
  screenshots: [
    "/firebase-public/TaxiChaos2/screenshot-1.jpg",
    "/firebase-public/TaxiChaos2/screenshot-2.jpg",
    "/firebase-public/TaxiChaos2/screenshot-3.jpg",
    "/firebase-public/TaxiChaos2/screenshot-4.png",
    "/firebase-public/TaxiChaos2/screenshot-5.jpg",
    "/firebase-public/TaxiChaos2/screenshot-6.jpg",
    "/firebase-public/TaxiChaos2/screenshot-7.jpg",
    "/firebase-public/TaxiChaos2/screenshot-8.jpg",
  ],
  stats: [
    { num: "7.79M", label: "Owned channel views" },
    { num: "5.93M", label: "Reddit reach" },
    { num: "750K",  label: "Instagram" },
    { num: "449K",  label: "Facebook" },
    { num: "268K",  label: "TikTok" },
    { num: "176K",  label: "IGN pickup" },
  ],
  scope: [
    "Storefront management across Steam, PlayStation 5, Xbox, Nintendo Switch, and Epic Games Store. Page builds, capsules, copy, localization, event timing.",
    "Custom Steam description content with bespoke animated GIFs and short video loops that live directly inside the storefront.",
    "In-game screenshot and clip capture. We play through builds ourselves to produce storefront imagery and social-ready content.",
    "Social media management across Instagram, TikTok, Facebook, X, and Reddit. Native short-form video, graphics, weekly publishing.",
    "Influencer activation through StreamQuest: vetted creator sourcing, onboarding, mission briefs, verified submissions, managed payouts.",
    "Paid ads: multi-region, multi-ad-set structure, creative A/B testing, budget reallocation, full CPC, CPM, CTR reporting.",
    "Community ops across Discord, Steam Hub, and Reddit with active moderation and engagement.",
    "Monthly KPI reporting with budget reconciliation and transparent close-out.",
  ],
  links: [
    { label: "Instagram",  href: "https://www.instagram.com/current.games/" },
    { label: "Watch trailer", href: "https://www.youtube.com/watch?v=odR4CLlU5NY" },
  ],
};

/* Good Heavens case study assets. */
const goodHeavensCase = {
  name: "Good Heavens",
  studio: "Nowhere Studios and Rocketride Games",
  service: "Indie marketing studio (no creator activation)",
  keyart: "/firebase-public/GoodHeavensRPG/pitch deck cover.png",
  trailer: "lXPPZyEKGtM",
  screenshots: [
    "/firebase-public/GoodHeavensRPG/gameplay (1).jpg",
    "/firebase-public/GoodHeavensRPG/gameplay (2).jpg",
    "/firebase-public/GoodHeavensRPG/gameplay (3).jpg",
    "/firebase-public/GoodHeavensRPG/gameplay (4).jpg",
    "/firebase-public/GoodHeavensRPG/Scholar City.jpg",
    "/firebase-public/GoodHeavensRPG/War City 4.jpg",
  ],
  scope: [
    "Active Discord community management: moderation, onboarding, weekly engagement, dev-to-community translation, event coordination.",
    "Heavy organic Reddit growth focus. Long-form posts designed to spark discussion, with multiple posts reaching the top of the month on r/gameart, r/IndieDev, and r/pcgames.",
    "Building familiarity with characters, mechanics, and world details well before Early Access launch, so launch day audiences already know what they are looking at.",
    "Social presence across Instagram, TikTok, X, Facebook, YouTube, and Reddit. Content tailored per platform, not cross-posted.",
    "Steam storefront support for events, capsules, and announcements.",
  ],
  status: "Ongoing pre-launch programme. Results pending.",
  links: [
    { label: "Steam",      href: "https://store.steampowered.com/app/1617120/Good_Heavens/" },
    { label: "Instagram",  href: "https://www.instagram.com/goodheavensrpg/" },
    { label: "TikTok",     href: "https://www.tiktok.com/@good.heavens64" },
    { label: "Reddit",     href: "https://www.reddit.com/r/GoodHeavens/" },
  ],
};

const qaBenefits = [
  { t: "Gameplay clarity",          d: "Watch dozens of streamers interpret your systems, solve puzzles, break things, or get stuck." },
  { t: "Audience reaction",         d: "How do real viewers respond? What excites them? What makes them drop off?" },
  { t: "Mechanic testing at scale", d: "20 to 100+ unique playthroughs surface dozens of edge cases naturally." },
];

const testimonials = [
  { quote: "Great client service and an amazing pool of creators who genuinely engaged with our digital event. StreamQuest was a fantastic partner.", attrib: "Founder, virtual expo platform" },
  { quote: "Working with StreamQuest was a great experience and incredibly efficient. They managed the entire campaign for us and achieved better results and rates than agencies we have worked with in the past. Highly recommend.", attrib: "Marketing lead, AA studio" },
  { quote: "The streamers genuinely enjoyed themselves and it came through in the content. It felt natural, engaging, and fun to watch. The quality was higher than what we have seen on other small platforms, and the boutique way StreamQuest managed the campaign made a real difference.", attrib: "Operations manager, indie studio" },
];

const kpis = [
  {
    genre: "Online survival",
    head: "200% over-delivery, 100% slot fill",
    rows: [
      ["50 creators", "100% of target slots"],
      ["181 hours streamed", "+200% over-delivery"],
      ["~3,700 viewer-hours", "Generated total"],
      ["€0.46 to 0.48", "Cost per watch-hour"],
      ["Average CCV 12 / 26", "Bronze / Silver vs targets 5 / 15"],
      ["80% of creators", "Posted on socials"],
    ],
  },
  {
    genre: "Roguelike co-op",
    head: "267% over-delivery, 3.94x average CCV",
    rows: [
      ["45 streamers", "~90% of target slots"],
      ["60 hours streamed", "+267% over-delivery"],
      ["1,180 viewer-hours", "Generated total"],
      ["€0.37 / viewer-hour", "Effective cost"],
      ["Average CCV 19.7 vs 5", "3.94x over target"],
      ["87% of creators", "Posted on socials"],
    ],
  },
  {
    genre: "Single-player puzzle",
    head: "13x over-delivery, 440% average CCV",
    rows: [
      ["40 creators", "~80% of target slots"],
      ["92 hours streamed", "+30% over-delivery"],
      ["~2,448 viewer-hours", "Target 190 → 13x over"],
      ["€0.67 / watch-hour", "Cost efficiency"],
      ["Average CCV 27 vs 5", "440% over target"],
      ["70% of creators", "Posted on socials"],
    ],
  },
];

export default function PitchPage() {
  return (
    <div className="rd pitch">
      {/* ============ HERO — floating polaroid field with editorial headline ============ */}
      <section className="pitch-hero">
        <PolaroidField tiles={heroTiles} className="pitch-hero-polaroids" intensity={70} />
        <div className="rd-shell pitch-hero-inner">
          <Reveal>
            <span className="eyebrow">
              <span className="pulse" />
              For studios and publishers
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1>
              Indie marketing, <span className="grad">built to ship</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="pitch-sub">
              StreamQuest activates 50+ trusted micro-streamers per campaign and runs the
              indie marketing layer around it. Storefronts, social, content, community,
              creator activations, paid ads, media kits, reporting.
              Boutique service, transparent KPIs, performance-based spend.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="pitch-cta-row">
              <a
                href="mailto:contact@streamquest.io?subject=StreamQuest%20partner%20enquiry"
                className="btn btn-primary btn-xl"
              >
                Email contact@streamquest.io
              </a>
              <a
                href="https://discord.gg/NhqfucYDXD"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-xl"
              >
                Join Discord
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ WHO WE ARE — editorial prose with Questy mascot floating ============ */}
      <section className="pitch-intro">
        <div className="rd-shell pitch-intro-grid">
          <Reveal>
            <div className="pitch-intro-text">
              <span className="rd-section-tag">What is StreamQuest</span>
              <h2>
                A platform that turns marketing <span className="grad">into quests</span>.
              </h2>
              <p>
                We connect small streamers with video game publishers and developers
                through gamified quests. Affiliate Twitch streamers get real sponsorships,
                earn money, and grow their communities. Brands get authentic access to loyal
                micro-audiences without the agency overhead.
              </p>
              <p>
                Instead of chasing mega-influencers, we activate the overlooked 95% of
                streamers and turn passion into impact for the studios paying for it.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="pitch-intro-mascot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/firebase-public/Questy New Folder/Questy Regular Size (2).png"
                alt=""
                aria-hidden="true"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CHALLENGE — big editorial lead + grid below ============ */}
      <section className="pitch-section pitch-section-shaded">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-lead-row">
              <span className="rd-section-tag">The challenge</span>
              <h2>
                Indie marketing is built for <span className="grad-purple">giants</span>.
              </h2>
              <p>
                Indie developers face a marketing system that prioritizes reach over resonance,
                worships vanity metrics, and demands unsustainable budgets. Great games launch
                into silence.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-challenge-grid">
              {challenges.map((c) => (
                <div key={c.t} className="pitch-challenge-cell">
                  <div className="pitch-challenge-num" aria-hidden="true">—</div>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ AFFILIATE VS PARTNERED — comparison table ============ */}
      <section className="pitch-section">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head-wide">
              <span className="rd-section-tag">Why micro creators win</span>
              <h2>
                Affiliate streamers <span className="grad">vs</span> partnered streamers.
              </h2>
              <p>
                We activate 50+ trusted creators per campaign, creating real momentum
                through many voices instead of relying on one spotlight.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-compare">
              <div className="pitch-compare-head">
                <div className="pitch-compare-col-label"></div>
                <div className="pitch-compare-col-a">Affiliate (StreamQuest)</div>
                <div className="pitch-compare-col-b">Partnered (traditional)</div>
              </div>
              {compareRows.map((row) => (
                <div key={row.label} className="pitch-compare-row">
                  <div className="pitch-compare-col-label">{row.label}</div>
                  <div className="pitch-compare-col-a">{row.a}</div>
                  <div className="pitch-compare-col-b">{row.b}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ QUEST MODEL — zigzag splits with Questy / screenshot asides ============ */}
      <section className="pitch-section pitch-section-shaded">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head-wide">
              <span className="rd-section-tag">The StreamQuest model</span>
              <h2>
                Marketing through <span className="grad">gamification</span>.
              </h2>
            </div>
          </Reveal>
          <div className="pitch-zigzag">
            {questModel.map((m, i) => (
              <Reveal key={m.name}>
                <div className={`pitch-zig${i % 2 === 1 ? " reverse" : ""}`}>
                  <div className="pitch-zig-text">
                    <span className="pitch-zig-eyebrow">0{i + 1}</span>
                    <h3>{m.name}</h3>
                    <p>{m.body}</p>
                  </div>
                  <div className="pitch-zig-aside is-clip">
                    <video
                      className="pitch-zig-video"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                    >
                      <source src={m.clip.mp4} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS — horizontal step rail ============ */}
      <section className="pitch-section">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head-wide">
              <span className="rd-section-tag">How to create a quest</span>
              <h2>
                Marketing becomes a quest. <span className="grad">We handle the journey</span>, you get the results.
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <ol className="pitch-rail">
              {steps.map((s, i) => (
                <li key={s.title} className="pitch-rail-step">
                  <div className="pitch-rail-label">{s.n}</div>
                  <div className="pitch-rail-bar" aria-hidden="true">
                    <span className="pitch-rail-dot" />
                    {i < steps.length - 1 && <span className="pitch-rail-line" />}
                  </div>
                  <div className="pitch-rail-body">
                    <h3>{s.title}</h3>
                    <p>{s.sub}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ============ USPs — asymmetric grid: large + smaller cells ============ */}
      <section className="pitch-section pitch-section-shaded">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head-wide">
              <span className="rd-section-tag">Why us</span>
              <h2>
                We do not outspend giants. We help indies <span className="grad">outsmart them</span>, one quest at a time.
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-usps">
              {usps.map((u, i) => (
                <article key={u.t} className={`pitch-usp${i === 0 ? " is-feature" : ""}`}>
                  <span className="pitch-usp-num" aria-hidden="true">0{i + 1}</span>
                  <h3>{u.t}</h3>
                  <p>{u.d}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ TWO TRACKS — intro ============ */}
      <section className="pitch-section">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head-wide">
              <span className="rd-section-tag">Two services, separately or together</span>
              <h2>
                Creator activation <span className="grad">or</span> a full indie marketing studio.
              </h2>
              <p>
                These are two distinct offerings. Creator activation is our gamified StreamQuest
                quest model. The marketing studio is content, storefronts, social, community, paid ads,
                and reporting. Hire one without the other, or run both together.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-tracks">
              <div className="pitch-track pitch-track-a">
                <span className="pitch-track-eyebrow">Track 1</span>
                <h3>Creator activation</h3>
                <p>50+ vetted micro-streamers per campaign. Mission briefs, payouts, KPI reporting, all under the gamified StreamQuest model. Independent of any other marketing work.</p>
              </div>
              <div className="pitch-track pitch-track-b">
                <span className="pitch-track-eyebrow">Track 2</span>
                <h3>Indie marketing studio</h3>
                <p>Storefronts, social media, community, content, paid ads, media kits, reporting, launch ops. Full marketing partnership or single sprints. No creator activation required.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CREATOR ACTIVATION — service list ============ */}
      <section className="pitch-section pitch-section-shaded">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head-wide">
              <span className="rd-section-tag">Track 1 — Creator activation</span>
              <h2>
                What is included in a <span className="grad">StreamQuest campaign</span>.
              </h2>
              <p>
                Hand-picked micro-streamers play your game, hit measurable goals, and get paid per
                completed activation. Setup, vetting, key delivery, payouts, and reporting are all on us.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-services">
              {creatorActivation.map((s) => (
                <article key={s.t} className="pitch-service">
                  <span className="pitch-service-mark" aria-hidden="true">+</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ INDIE MARKETING STUDIO — service list ============ */}
      <section className="pitch-section">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head-wide">
              <span className="rd-section-tag">Track 2 — Indie marketing studio</span>
              <h2>
                Branding, social, storefronts, <span className="grad">community</span>, and more.
              </h2>
              <p>
                Hire us for a single focused sprint or as your external marketing team. Each service
                below can be scoped on its own. Creator activation is not required.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-services">
              {marketingStudio.map((s) => (
                <article key={s.t} className="pitch-service">
                  <span className="pitch-service-mark" aria-hidden="true">+</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PARTNERS — logo wall ============ */}
      <section className="pitch-section pitch-section-shaded">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head-wide pitch-head-center">
              <span className="rd-section-tag">Trusted by</span>
              <h2>
                Studios and publishers <span className="grad">we have shipped with</span>.
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-partners">
              {partners.map((p) => (
                <div key={p} className="pitch-partner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/firebase-public/Logos Partner/${p}.png`} alt={p} loading="lazy" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CASE STUDY: TAXI CHAOS 2 ============ */}
      <section className="pitch-case-section">
        {/* Full-bleed image strip uses one of the new screenshots */}
        <div className="pitch-case-strip" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={taxiCase.screenshots[0]} alt="" loading="lazy" />
          <div className="pitch-case-strip-veil" />
        </div>

        <div className="rd-shell pitch-case-wrap">
          <Reveal>
            <div className="pitch-case-head">
              <span className="rd-section-tag">Case study — {taxiCase.service}</span>
              <h2>
                {taxiCase.name}: <span className="grad">trailer pickup on IGN</span>.
              </h2>
              <p>
                {taxiCase.studio}. Long-running marketing partnership across Steam, PlayStation 5,
                Xbox, Nintendo Switch, and Epic Games Store. Trailer production, storefronts, social,
                paid ads, and creator activation, all under one roof.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="pitch-case-keyart">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={taxiCase.keyart} alt={`${taxiCase.name} key art`} loading="lazy" />
            </div>
          </Reveal>

          <Reveal>
            <div className="pitch-stats-hero">
              {taxiCase.stats.map((stat, i) => (
                <div key={stat.label} className={`pitch-stat-hero${i === 0 ? " is-lead" : ""}`}>
                  <div className="pitch-stat-num">{stat.num}</div>
                  <div className="pitch-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="pitch-video-wrap">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${taxiCase.trailer}?rel=0&modestbranding=1`}
                title={`${taxiCase.name} gameplay trailer picked up by IGN`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal>
            <ul className="pitch-case-list">
              {taxiCase.scope.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <div className="pitch-case-gallery">
              {taxiCase.screenshots.slice(1).map((src) => (
                <div key={src} className="pitch-case-shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="pitch-case-links">
              <span className="pitch-case-links-label">Follow {taxiCase.name}</span>
              <div className="pitch-case-links-row">
                {taxiCase.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="pitch-case-link">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CASE STUDY: GOOD HEAVENS ============ */}
      <section className="pitch-case-section pitch-section-shaded">
        <div className="pitch-case-strip" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={goodHeavensCase.keyart} alt="" loading="lazy" />
          <div className="pitch-case-strip-veil" />
        </div>

        <div className="rd-shell pitch-case-wrap">
          <Reveal>
            <div className="pitch-case-head">
              <span className="rd-section-tag">Case study — {goodHeavensCase.service}</span>
              <h2>
                {goodHeavensCase.name}: <span className="grad">pre-launch presence</span> for an Early Access debut.
              </h2>
              <p>
                {goodHeavensCase.studio}. {goodHeavensCase.status} Marketing studio engagement only: no
                creator activation in this scope. Heavy organic Reddit growth, with multiple posts hitting
                top of the month on r/gameart, r/IndieDev, and r/pcgames.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="pitch-case-keyart">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={goodHeavensCase.keyart} alt={`${goodHeavensCase.name} key art`} loading="lazy" />

            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="pitch-video-wrap">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${goodHeavensCase.trailer}?rel=0&modestbranding=1`}
                title={`${goodHeavensCase.name} trailer`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal>
            <ul className="pitch-case-list">
              {goodHeavensCase.scope.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <div className="pitch-case-gallery">
              {goodHeavensCase.screenshots.map((src) => (
                <div key={src} className="pitch-case-shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="pitch-case-links">
              <span className="pitch-case-links-label">Follow {goodHeavensCase.name}</span>
              <div className="pitch-case-links-row">
                {goodHeavensCase.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="pitch-case-link">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PAST KPIs ============ */}
      <section className="pitch-section">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head-wide">
              <span className="rd-section-tag">Past KPIs</span>
              <h2>
                What StreamQuest campaigns <span className="grad">deliver</span>.
              </h2>
              <p>Anonymized snapshots from past campaigns across genres. Full KPI reports available on request under NDA.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-kpis">
              {kpis.map((k) => (
                <article key={k.genre} className="pitch-kpi">
                  <div className="pitch-kpi-genre">{k.genre}</div>
                  <h3 className="pitch-kpi-head">{k.head}</h3>
                  <dl className="pitch-kpi-rows">
                    {k.rows.map(([a, b]) => (
                      <div key={a} className="pitch-kpi-row">
                        <dt>{a}</dt>
                        <dd>{b}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ QA BENEFITS — editorial 3-row with Questy floating ============ */}
      <section className="pitch-section pitch-section-shaded pitch-qa">
        <div className="rd-shell pitch-qa-inner">
          <Reveal>
            <div className="pitch-head-wide">
              <span className="rd-section-tag">Beyond exposure</span>
              <h2>
                A cost-effective <span className="grad">QA layer</span> baked into the activation.
              </h2>
              <p>
                Marketing is not just about getting seen. It is about learning what works.
                At any stage of development, activating dozens of small streamers delivers
                authentic gameplay feedback and sentiment.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-qa-rows">
              {qaBenefits.map((b, i) => (
                <div key={b.t} className="pitch-qa-row">
                  <div className="pitch-qa-num">0{i + 1}</div>
                  <div>
                    <h3>{b.t}</h3>
                    <p>{b.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="pitch-qa-mascot" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/firebase-public/Questy New Folder/Questy Regular Size (7).png" alt="" />
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS — big editorial blockquotes ============ */}
      <section className="pitch-section">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head-wide pitch-head-center">
              <span className="rd-section-tag">From partners</span>
              <h2>
                What studios say <span className="grad">after working with us</span>.
              </h2>
            </div>
          </Reveal>
          <div className="pitch-bigquotes">
            {testimonials.map((t, i) => (
              <Reveal key={t.attrib} delay={i * 0.08}>
                <figure className="pitch-bigquote">
                  <span className="pitch-bigquote-mark" aria-hidden="true">&ldquo;</span>
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>{t.attrib}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA — floating polaroids ============ */}
      <section className="pitch-final">
        <PolaroidField tiles={finalTiles} className="pitch-final-polaroids" intensity={55} />
        <div className="rd-shell pitch-final-inner">
          <Reveal>
            <span className="eyebrow">
              <span className="pulse" />
              Talk to us
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>
              Tell us where your <span className="grad">launch hurts</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              Steam page not converting? Social channel quiet? Trailer not landing?
              Send a short note and we come back within 48 hours with a take and a proposal,
              not a sales pitch.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="pitch-cta-row">
              <a
                href="mailto:contact@streamquest.io?subject=StreamQuest%20partner%20enquiry"
                className="btn btn-primary btn-xl"
              >
                Email contact@streamquest.io
              </a>
              <a
                href="https://discord.gg/NhqfucYDXD"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-xl"
              >
                Join Discord
              </a>
              <Link href="/" className="btn btn-ghost btn-xl">Back to home</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
