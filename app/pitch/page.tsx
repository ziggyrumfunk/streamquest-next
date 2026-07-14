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
  alternates: { canonical: "https://streamquest.io/pitch" },
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
  { src: "/firebase-public/Game Cover Art/taxi chaos 2 key art.webp",      className: "h1", depth: 0.7, priority: true },
  { src: "/firebase-public/Game Cover Art/aska key art.webp",              className: "h2", depth: 0.6, priority: true },
  { src: "/firebase-public/Game Cover Art/planet of lana 2 key art.webp",  className: "h3", depth: 0.55 },
  { src: "/firebase-public/Game Cover Art/wildcard key art.webp",          className: "h4", depth: 0.5 },
  { src: "/firebase-public/Game Cover Art/godbreakers key art.webp",       className: "h5", depth: 0.45 },
  { src: "/firebase-public/Game Screenshots/TAXI CHAOS 2.webp",            className: "h6", depth: 0.6 },
  { src: "/firebase-public/Game Screenshots/ENDIX.webp",                   className: "h7", depth: 0.5 },
];

const finalTiles = [
  { src: "/firebase-public/Game Cover Art/ascendant key art.webp",        className: "f1", depth: 0.6 },
  { src: "/firebase-public/Game Cover Art/cyberclutch key art.webp",      className: "f2", depth: 0.7 },
  { src: "/firebase-public/Game Screenshots/ASTRO BURN.webp",             className: "f3", depth: 0.55 },
  { src: "/firebase-public/Game Screenshots/MEXICAN NINJA.webp",          className: "f4", depth: 0.5 },
  { src: "/firebase-public/Game Screenshots/GOOD HEAVENS.webp",           className: "f5", depth: 0.45 },
];

const challenges = [
  { t: "Built for scale, not substance", d: "Traditional influencer marketing optimizes for reach, not resonance." },
  { t: "Indie budgets cannot compete", d: "Mega-creator slots eat a launch budget in one stream." },
  { t: "Vanity metrics hide performance", d: "Impressions and reach numbers do not translate into wishlists or sales." },
  { t: "Creators disconnected from outcomes", d: "One placement, one clip, contractually delivered and forgotten." },
];

const compareRows = [
  { label: "Community relationship", a: "Built through interaction. Viewers chat, get responses, form bonds.", b: "Built through scale. Reach is wide, interaction is limited." },
  { label: "Viewer trust", a: "Seen as peers or friends. Endorsements feel personal.", b: "Seen as a personality. Endorsements may feel branded." },
  { label: "Motivation", a: "Passion driven. Creators who genuinely want to play the game.", b: "Career focused. Often juggling multiple sponsor slots per week." },
  { label: "Spend behaviour", a: "Many voices, spread across communities. Campaigns scale horizontally.", b: "One slot, one audience. All or nothing." },
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
    body: "Optional extra challenges that unlock bonus XP. Post a gameplay clip, share the wishlist link, complete a feedback survey, hit an in-game milestone, post UGC on socials, or record a campaign recap.",
    clip: {
      mp4:  "/media/clips/clip-2.mp4",
    },
  },
  {
    name: "XP and tiers",
    body: "Bronze (5+ average viewers, top 6% of Twitch), Silver (15+ average viewers, top 3%), Gold (English-only, 50+ average viewers, 1,500+ followers, 2 hours streamed plus one UGC video outside Twitch). Creators level up across quests.",
    clip: {
      mp4:  "/media/clips/clip-3.mp4",
    },
  },
];

const steps = [
  { n: "Brief",      title: "Submit your brief",        sub: "You define the main objectives, stream hours, side quests, key milestones, and what proof you want from creators." },
  { n: "Build",      title: "We build the quest",      sub: "We configure the campaign, set objectives, define payout tiers, validate streamers, and record a mission brief video for creators." },
  { n: "Launch",     title: "We push the launch",     sub: "We push the quest across our creator community and StreamQuest socials so the right micro-streamers see it first." },
  { n: "Activate",   title: "Creators stream",        sub: "Curated micro-creators join the quest, stream the game live, and complete side quests across socials and storefronts." },
  { n: "Manage",     title: "Hands-on management",    sub: "Our team handles Discord coordination, reminders, approvals, key delivery, VOD and proof verification, and direct creator payouts." },
  { n: "Report",     title: "You get the final report", sub: "Full report with VODs, content links, proof, KPI metrics, creator feedback, and any unused credits returned where applicable." },
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
  { t: "Vetted Affiliates and Partners", d: "Hand-picked creators per campaign, from engaged micro-creators and Twitch Affiliates through to selected Twitch Partners. Manually reviewed for content fit, audience, region, and quality." },
  { t: "Discord management", d: "An active creator Discord where we brief, remind, answer, coordinate, and keep creators moving. Relationship-driven, not a self-serve listing board." },
  { t: "Proof checks", d: "Every submission is verified by a human: VODs, timestamps, categories, clips, social posts, and side-quest proof. No faked engagement or unrelated content." },
  { t: "Direct payouts", d: "We pay creators directly. Real cash, no crypto, no gift cards, no unnecessary middleman. Unused credits are refunded to you." },
  { t: "End-of-campaign KPI report", d: "A full close-out report with VODs, proof, watch-hours, creator feedback, content links, and budget reconciliation." },
];

/* Creator-side philosophy: how creators are treated, paid, and managed. */
const creatorSide = [
  {
    t: "An active creator Discord",
    d: "Not a self-serve listing board. Creators are briefed, reminded, updated, and coordinated directly by our team in Discord, and they can reach a real person when something is unclear.",
  },
  {
    t: "Real cash, short route",
    d: "We pay creators directly. No crypto, no gift cards, no sleazy payout tricks, no unnecessary middleman. Creators get real money they can spend however they want.",
  },
  {
    t: "Respect drives performance",
    d: "Creators perform better when they are respected, paid fairly, and given clear goals. That is why our campaigns are managed relationships, not transactions.",
  },
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
  keyart: "/firebase-public/TaxiChaos2/screenshot-4.webp",
  trailer: "odR4CLlU5NY",
  screenshots: [
    "/firebase-public/TaxiChaos2/screenshot-1.webp",
    "/firebase-public/TaxiChaos2/screenshot-2.webp",
    "/firebase-public/TaxiChaos2/screenshot-3.webp",
    "/firebase-public/TaxiChaos2/screenshot-5.webp",
    "/firebase-public/TaxiChaos2/screenshot-6.webp",
    "/firebase-public/TaxiChaos2/screenshot-7.webp",
    "/firebase-public/TaxiChaos2/screenshot-8.webp",
    "/firebase-public/TaxiChaos2/screenshot-9.webp",
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
  keyart: "/firebase-public/GoodHeavensRPG/library_hero (3840x1240).webp",
  logo: "/firebase-public/GoodHeavensRPG/library_logo_transparent (890x720).webp",
  trailer: "lXPPZyEKGtM",
  screenshots: [
    "/firebase-public/GoodHeavensRPG/gameplay (1).webp",
    "/firebase-public/GoodHeavensRPG/gameplay (2).webp",
    "/firebase-public/GoodHeavensRPG/gameplay (3).webp",
    "/firebase-public/GoodHeavensRPG/gameplay (4).webp",
    "/firebase-public/GoodHeavensRPG/Scholar City.webp",
    "/firebase-public/GoodHeavensRPG/War City 4.webp",
  ],
  scope: [
    "Active Discord community management: moderation, onboarding, weekly engagement, dev-to-community translation, event coordination.",
    "Heavy organic Reddit growth focus. Long-form posts designed to spark discussion, with multiple posts reaching the top of the month on r/gameart, r/IndieDev, and r/pcgames.",
    "Building familiarity with characters, mechanics, and world details well before Early Access launch, so launch day audiences already know what they are looking at.",
    "Social presence across Instagram, TikTok, X, Facebook, YouTube, and Reddit. Content tailored per platform, not cross-posted.",
    "Steam storefront support for events, capsules, and announcements.",
  ],
  status: "Ongoing pre-launch programme. Results pending.",
  landingPage: "https://www.goodheavensrpg.com",
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
              StreamQuest has two pillars. <strong>Creator activation</strong> runs paid
              campaigns through our quest platform, with hands-on management on top.
              <strong> Marketing support</strong> covers storefronts, social, content,
              community, and ads. Hire either one on its own, or run both together.
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
                href="mailto:contact@streamquest.io?subject=Request%20StreamQuest%20KPI%20examples"
                className="btn btn-secondary btn-xl"
              >
                Request KPI examples
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CREATOR ACTIVATION — the core product, leads the page ============ */}
      <section className="pitch-section pitch-section-shaded">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head-wide">
              <span className="rd-section-tag">The core product · Creator activation</span>
              <h2>
                Quest-based <span className="grad">Twitch creator campaigns</span>.
              </h2>
              <p>
                This is what StreamQuest is built on. Curated creators, from engaged
                micro-creators and Twitch Affiliates through to selected Twitch Partners, play
                your game live, hit measurable goals, and get paid per completed activation.
                Campaigns typically start around 50 creators and scale from there. Setup,
                vetting, Discord management, proof checks, payouts, and reporting are all on us.
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
          <Reveal>
            <div className="pitch-case-links" style={{ marginTop: 34 }}>
              <span className="pitch-case-links-label">Creator activation in practice</span>
              <div className="pitch-case-links-row">
                <Link className="pitch-case-link" href="/case-studies/planet-of-lana-2">
                  Planet of Lana 2 case study
                </Link>
                <Link className="pitch-case-link" href="/case-studies/replaced">
                  REPLACED case study
                </Link>
              </div>
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
                Gaming is <span className="grad">not one big audience</span>.
              </h2>
              <p>
                Gaming is a network of smaller communities. StreamQuest helps studios spread
                the budget of one large influencer across 50+ trusted creators, creating more
                consistent visibility, social proof, and verified reporting. Campaigns
                typically start around 50 creators and can scale depending on scope and
                availability.
              </p>
              <p>
                Our edge is that we combine platform structure with agency-style personal
                management. Quests, approvals, reminders, proof checks, payouts, and
                reporting are all handled hands-on by our team in Discord, not left to a
                self-serve dashboard.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="pitch-intro-mascot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/firebase-public/Questy New Folder/Questy Regular Size (2).webp"
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

      {/* ============ MANY CREATORS VS ONE PLACEMENT — comparison table ============ */}
      <section className="pitch-section">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head-wide">
              <span className="rd-section-tag">Why many creators win</span>
              <h2>
                Many trusted creators <span className="grad">vs</span> one large placement.
              </h2>
              <p>
                We activate 50+ trusted creators per campaign, a mix of engaged micro-creators,
                Twitch Affiliates, and selected Twitch Partners, creating real momentum through
                many voices instead of relying on one spotlight.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-compare">
              <div className="pitch-compare-head">
                <div className="pitch-compare-col-label"></div>
                <div className="pitch-compare-col-a">Micro-creators, Affiliates &amp; selected Partners (StreamQuest)</div>
                <div className="pitch-compare-col-b">One large sponsored placement</div>
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

      {/* ============ CREATOR SIDE — philosophy, Discord, payouts ============ */}
      <section className="pitch-section">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head-wide">
              <span className="rd-section-tag">The creator side</span>
              <h2>
                A managed creator community, <span className="grad">not a listing board</span>.
              </h2>
              <p>
                The quality of a campaign comes from how creators are treated. StreamQuest is a
                managed community built around fair rewards and real participation, which is why
                creators show up, deliver, and often keep playing after the brief is done.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-services">
              {creatorSide.map((s) => (
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
                Two pillars. <span className="grad">Either one</span>, or both.
              </h2>
              <p>
                StreamQuest is not a single bundled service. Creator activation runs your
                campaign on our platform with hands-on agency management. Marketing support
                covers everything else around the launch. Each pillar stands on its own.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-tracks">
              <div className="pitch-track pitch-track-a">
                <span className="pitch-track-eyebrow">Pillar 1</span>
                <h3>Creator activation</h3>
                <p>Platform plus hands-on management. We activate curated micro-creators through the quest model and run them like an agency: Discord, approvals, reminders, proof checks, payouts, reporting. Hireable on its own.</p>
              </div>
              <div className="pitch-track pitch-track-b">
                <span className="pitch-track-eyebrow">Pillar 2</span>
                <h3>Marketing support</h3>
                <p>Storefront optimization, social media, content, community management, paid ads, and broader campaign support. Works alongside creator activation, but never bundled into it. Hireable on its own.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ INDIE MARKETING STUDIO — service list ============ */}
      <section className="pitch-section">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head-wide">
              <span className="rd-section-tag">Pillar 2 · Marketing support</span>
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
        {/* Full-bleed image strip uses the proper key art for crisp rendering */}
        <div className="pitch-case-strip" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={taxiCase.keyart} alt={taxiCase.name} loading="lazy" />
          <div className="pitch-case-strip-veil" />
        </div>

        <div className="rd-shell pitch-case-wrap">
          <Reveal>
            <div className="pitch-case-head">
              <span className="rd-section-tag">Case study · {taxiCase.service}</span>
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
          <img src={goodHeavensCase.keyart} alt={goodHeavensCase.name} loading="lazy" />
          <div className="pitch-case-strip-veil" />
        </div>

        <div className="rd-shell pitch-case-wrap">
          <Reveal>
            <div className="pitch-case-head">
              <span className="rd-section-tag">Case study · {goodHeavensCase.service}</span>
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
              {goodHeavensCase.logo && (
                <div className="pitch-case-keyart-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={goodHeavensCase.logo} alt={goodHeavensCase.name} />
                </div>
              )}
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

          {goodHeavensCase.landingPage && (
            <Reveal>
              <a
                href={goodHeavensCase.landingPage}
                target="_blank"
                rel="noopener noreferrer"
                className="pitch-case-landing"
              >
                <span className="pitch-case-landing-eyebrow">Landing page we built</span>
                <span className="pitch-case-landing-title">
                  Visit <span className="grad">goodheavensrpg.com</span>
                </span>
                <span className="pitch-case-landing-arrow" aria-hidden="true">→</span>
              </a>
            </Reveal>
          )}

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
          <Reveal>
            <div className="pitch-case-links" style={{ marginTop: 34 }}>
              <span className="pitch-case-links-label">Named creator activation proof</span>
              <div className="pitch-case-links-row">
                <Link className="pitch-case-link" href="/case-studies/planet-of-lana-2">
                  Planet of Lana 2 case study
                </Link>
                <Link className="pitch-case-link" href="/case-studies/replaced">
                  REPLACED case study
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <p className="pitch-poc">
              Also in the portfolio: House Flipper / Frozen District, a rapid creator activation
              test. This was a short proof-of-concept activation rather than a full campaign.
            </p>
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
            <img src="/firebase-public/Questy New Folder/Questy Regular Size (7).webp" alt="" />
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
                href="mailto:contact@streamquest.io?subject=Send%20your%20Steam%20page%20to%20StreamQuest"
                className="btn btn-secondary btn-xl"
              >
                Send your Steam page
              </a>
              <Link href="/" className="btn btn-ghost btn-xl">Back to home</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
