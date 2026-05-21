import Link from "next/link";
import type { Metadata } from "next";

import Reveal from "@/app/components/Reveal";
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
   /pitch — partner-facing pitch page.
   Style matches the rest of the site (lime, Jost, square corners,
   no emoji). Not linked from the nav, only from the footer.
   ============================================================ */

const partners = [
  "Thunderful", "Misty Whale", "1Minus1", "Current Games (2)",
  "NoWhere Studios", "Acclaim", "SandSailorStudio", "RocketRide",
  "Amber Studios", "Critical Hit PR", "Goose Byte", "PixelDoors",
  "Play Fusion", "Sad Cat Studios",
];

const challenges = [
  { t: "Built for scale, not substance", d: "Traditional influencer marketing optimizes for reach, not resonance." },
  { t: "Indie budgets cannot compete", d: "Mega-creator slots eat a launch budget in one stream." },
  { t: "Vanity metrics hide performance", d: "Impressions and reach numbers do not translate into wishlists or sales." },
  { t: "Creators disconnected from outcomes", d: "One placement, one clip, contractually delivered and forgotten." },
];

const compareRows = [
  {
    label: "Community relationship",
    a: "Built through interaction. Viewers chat, get responses, form bonds.",
    b: "Built through scale. Reach is wide, interaction is limited.",
  },
  {
    label: "Viewer trust",
    a: "Seen as peers or friends. Endorsements feel personal.",
    b: "Seen as personalities. Endorsements may feel branded.",
  },
  {
    label: "Motivation",
    a: "Passion driven. Early career creators deeply invested in the quest.",
    b: "Career focused. Often juggling multiple sponsor slots per week.",
  },
  {
    label: "Cost efficiency",
    a: "More creators per euro. Campaigns scale horizontally.",
    b: "High cost per placement. All or nothing.",
  },
  {
    label: "UGC potential",
    a: "Every stream is a unique voice, diverse content, honest reactions.",
    b: "Limited variations. Often one clip or VOD per campaign.",
  },
  {
    label: "Longevity",
    a: "High odds to continue streaming the game after contractual obligations.",
    b: "Unlikely to continue playing the game after contractual obligations.",
  },
];

const questModel = [
  {
    name: "Main quest",
    body: "The primary objective for a campaign. The core task creators must complete to get paid and earn XP.",
  },
  {
    name: "Side quests",
    body: "Optional extra challenges that unlock bonus XP. Post a gameplay clip, write a Steam review, share with followers, complete a survey.",
  },
  {
    name: "XP and tiers",
    body: "Bronze (min 5 average viewers, top 6% of Twitch), Silver (15 average viewers, top 3%), Gold (top XP earners, custom rates).",
  },
];

const steps = [
  { title: "Submit your brief", sub: "Define your main objectives, stream hours, and any bonus side quests like wishlists, surveys, or reviews." },
  { title: "We build the quest", sub: "We configure your campaign, set main and side quest objectives, validate streamers, assign keys, track rewards and progress." },
  { title: "Streamers activate", sub: "Qualified micro-creators join the quest, stream the game, and complete tasks to earn XP." },
  { title: "You get the report", sub: "Full campaign report with content links, engagement metrics, feedback, and unused credit returns." },
];

const usps = [
  { t: "Gamified campaigns", d: "We do not run influencer placements. We launch quests with objectives, XP, and leveling systems that incentivize real participation." },
  { t: "Micro creators", d: "50+ engaged micro-streamers per campaign whose smaller communities drive deeper watch time, higher trust, and stronger results." },
  { t: "Performance-based spend", d: "Campaigns are paid per successful activation. No empty impressions, no inflated costs. Unused credits are refunded." },
  { t: "Built-in QA layer", d: "Dozens of small creators streaming your game means organic QA at scale. See how real players engage, struggle, and react in real time." },
  { t: "Full service", d: "Setup, validation, key delivery, reporting, and side quest rewards handled in-house so lean studios do not need a marketing team." },
  { t: "Indie made for indies", d: "Built by people with a background in games and streaming who understand indie challenges and treat every campaign like it matters." },
];

const services = [
  { t: "Storefront", d: "Steam page audit, copy, capsules, localization, event timing. Custom GIFs and short video loops on the storefront." },
  { t: "Social and community", d: "Planning, publishing, optimization, multi-platform native content. Discord, Reddit, Steam Hub, comment moderation, weekly engagement." },
  { t: "Content and trailers", d: "Short-form video, graphics, screenshots, trailers, key art support. In-game capture handled by us." },
  { t: "Creator campaigns", d: "Vetted streamer activations through StreamQuest, mission briefs, payouts, KPI reporting baked in." },
  { t: "Paid ads", d: "Meta, Reddit, YouTube. Creative testing, region targeting, budget reallocation to top performers." },
  { t: "Media kit", d: "Press-ready media kits with key art, screenshots, logos, fact sheets, trailers, and embed-ready assets." },
  { t: "Reporting", d: "Monthly KPI deck, source-of-truth dashboards, budget reconciliation. Transparent close-out." },
  { t: "Launch ops", d: "Daily monitoring, rapid replies, post-launch momentum, post-mortem." },
];

const qaBenefits = [
  { t: "Gameplay clarity", d: "Watch dozens of streamers interpret your systems, solve puzzles, break things, or get stuck." },
  { t: "Audience reaction", d: "How do real viewers respond? What excites them? What makes them drop off?" },
  { t: "Mechanic testing at scale", d: "20 to 100+ unique playthroughs surface dozens of edge cases naturally." },
];

const testimonials = [
  {
    quote:
      "Great client service and an amazing pool of creators who genuinely engaged with our digital event. StreamQuest was a fantastic partner.",
    attrib: "Founder, virtual expo platform",
  },
  {
    quote:
      "Working with StreamQuest was a great experience and incredibly efficient. They managed the entire campaign for us and achieved better results and rates than agencies we have worked with in the past. Highly recommend.",
    attrib: "Marketing lead, AA studio",
  },
  {
    quote:
      "The streamers genuinely enjoyed themselves and it came through in the content. It felt natural, engaging, and fun to watch. The quality was higher than what we have seen on other small platforms, and the boutique way StreamQuest managed the campaign made a real difference.",
    attrib: "Operations manager, indie studio",
  },
];

const kpis = [
  {
    genre: "Online survival",
    rows: [
      "50 creators completed (100% of target slots)",
      "Average CCV Bronze 12 vs target 5, 2.4x over",
      "Average CCV Silver 26 vs target 15, 1.73x over",
      "181 hours streamed, 200% over-delivery",
      "Approximately 3,700 viewer-hours generated",
      "Cost per watch-hour ~€0.46 to €0.48",
      "80% of creators posted on socials",
    ],
  },
  {
    genre: "Roguelike co-op",
    rows: [
      "45 streamers activated (~90% of target slots)",
      "Average CCV 19.7 vs target 5, 3.94x over",
      "60 hours streamed, 267% over-delivery",
      "1,180 viewer-hours generated",
      "Effective cost per viewer-hour €0.37",
      "87% of creators posted on socials",
    ],
  },
  {
    genre: "Single player puzzle",
    rows: [
      "40 creators activated (~80% of target slots)",
      "Average CCV 27 vs target 5, 440% over",
      "92 hours streamed, 30% over-delivery",
      "~2,448 viewer-hours generated (target 190, 13x over-delivery)",
      "Cost per watch-hour ~€0.67",
      "70% of creators posted on socials",
    ],
  },
];

export default function PitchPage() {
  return (
    <div className="rd pitch">
      {/* ============ HERO ============ */}
      <section className="pitch-hero">
        <div className="rd-shell pitch-hero-inner">
          <Reveal>
            <span className="eyebrow">
              <span className="pulse" />
              For studios and publishers
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1>
              Gamified micro-creator campaigns for <span className="grad">indie and AA games</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="pitch-sub">
              StreamQuest activates 50+ trusted micro-streamers per campaign,
              creating real momentum through many voices instead of relying on
              one spotlight. Boutique service, transparent KPIs, performance-based spend.
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

      {/* ============ WHAT IS STREAMQUEST ============ */}
      <section className="pitch-section">
        <div className="rd-shell pitch-split">
          <Reveal>
            <div>
              <span className="rd-section-tag">What is StreamQuest</span>
              <h2>A platform that turns marketing into quests.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="pitch-prose">
              <p>
                We connect small streamers with video game publishers and developers
                through gamified quests. Affiliate Twitch streamers get real sponsorships,
                earn money, and grow their communities. Brands get authentic access to
                loyal micro-audiences.
              </p>
              <p>
                Instead of chasing mega-influencers, StreamQuest empowers the overlooked
                95% of streamers to turn passion into impact.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CHALLENGE ============ */}
      <section className="pitch-section pitch-section-bordered">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head">
              <span className="rd-section-tag">The challenge</span>
              <h2>Indie marketing is built for giants.</h2>
              <p className="pitch-lead">
                Indie developers face a marketing system that prioritizes reach over resonance,
                worships vanity metrics, and demands unsustainable budgets. Great games launch into silence.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-grid pitch-grid-2x2">
              {challenges.map((c) => (
                <div key={c.t} className="pitch-cell">
                  <div className="pitch-cell-dot" aria-hidden="true" />
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ AFFILIATE VS PARTNERED ============ */}
      <section className="pitch-section">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head">
              <span className="rd-section-tag">Why micro creators win</span>
              <h2>Affiliate streamers vs partnered streamers.</h2>
              <p className="pitch-lead">
                We activate 50+ trusted creators per campaign, creating real momentum through many voices
                instead of relying on one spotlight.
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

      {/* ============ QUEST MODEL ============ */}
      <section className="pitch-section pitch-section-bordered">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head">
              <span className="rd-section-tag">The StreamQuest model</span>
              <h2>Marketing through gamification.</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-grid pitch-grid-3">
              {questModel.map((m) => (
                <div key={m.name} className="pitch-cell">
                  <div className="pitch-cell-dot" aria-hidden="true" />
                  <h3>{m.name}</h3>
                  <p>{m.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="pitch-section">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head">
              <span className="rd-section-tag">How to create a quest</span>
              <h2>Marketing becomes a quest. We handle the journey, you get the results.</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-steps">
              {steps.map((s) => (
                <div key={s.title} className="pitch-step">
                  <div className="pitch-step-title">{s.title}</div>
                  <div className="pitch-step-sub">{s.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ UNIQUE SELLING POINTS ============ */}
      <section className="pitch-section pitch-section-bordered">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head">
              <span className="rd-section-tag">Why us</span>
              <h2>We do not outspend giants. We help indies outsmart them, one quest at a time.</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-grid pitch-grid-3">
              {usps.map((u) => (
                <div key={u.t} className="pitch-cell">
                  <div className="pitch-cell-dot" aria-hidden="true" />
                  <h3>{u.t}</h3>
                  <p>{u.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ MARKETING SERVICES ============ */}
      <section className="pitch-section">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head">
              <span className="rd-section-tag">Marketing services</span>
              <h2>One partner, modular scope.</h2>
              <p className="pitch-lead">
                Hire us for a single focused sprint, or plug us in as your external marketing team.
                We adapt to your roadmap: Steam Next Fest, Early Access, full launch, post-launch updates.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-grid pitch-grid-4">
              {services.map((s) => (
                <div key={s.t} className="pitch-cell">
                  <div className="pitch-cell-dot" aria-hidden="true" />
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PARTNERS ============ */}
      <section className="pitch-section pitch-section-bordered">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head">
              <span className="rd-section-tag">Trusted by</span>
              <h2>Studios and publishers we have worked with.</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-partners">
              {partners.map((p) => (
                <div key={p} className="pitch-partner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/firebase-public/Logos Partner/${p}.png`}
                    alt={p}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CASE STUDY: TRAILER + STATS ============ */}
      <section className="pitch-section">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head">
              <span className="rd-section-tag">Selected work</span>
              <h2>Real campaigns. Verified results.</h2>
              <p className="pitch-lead">
                A short look at what hands-on indie marketing actually delivers.
                Owned-channel reach, trailer pickups, sustained social presence,
                across studios, genres, and platforms.
              </p>
            </div>
          </Reveal>

          <div className="pitch-case">
            <Reveal>
              <div className="pitch-case-head">
                <span className="pitch-case-eyebrow">Full retainer, multi-platform launch</span>
                <h3>Trailer pickup on IGN, full storefront and social ownership</h3>
                <p>
                  Long-running marketing partnership covering trailer production, multi-platform
                  storefront management, ongoing social media, paid ads, and creator activation.
                  One client, one project, multi-platform scope.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="pitch-video">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/odR4CLlU5NY?rel=0&modestbranding=1"
                  title="Gameplay trailer picked up by IGN"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </Reveal>

            <Reveal>
              <div className="pitch-stats">
                <div className="pitch-stat">
                  <div className="pitch-stat-num">7.79M</div>
                  <div className="pitch-stat-label">Owned channel views</div>
                </div>
                <div className="pitch-stat">
                  <div className="pitch-stat-num">5.93M</div>
                  <div className="pitch-stat-label">Reddit reach</div>
                </div>
                <div className="pitch-stat">
                  <div className="pitch-stat-num">750K</div>
                  <div className="pitch-stat-label">Instagram</div>
                </div>
                <div className="pitch-stat">
                  <div className="pitch-stat-num">449K</div>
                  <div className="pitch-stat-label">Facebook</div>
                </div>
                <div className="pitch-stat">
                  <div className="pitch-stat-num">268K</div>
                  <div className="pitch-stat-label">TikTok</div>
                </div>
                <div className="pitch-stat">
                  <div className="pitch-stat-num">176K</div>
                  <div className="pitch-stat-label">IGN pickup</div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <ul className="pitch-case-list">
                <li>Storefront management across Steam, PlayStation 5, Xbox, Nintendo Switch, and Epic Games Store. Page builds, capsules, copy, localization, event timing handled in-house.</li>
                <li>Custom Steam description content with bespoke animated GIFs and short video loops that live directly inside the storefront.</li>
                <li>In-game screenshot and clip capture. We play through builds ourselves to produce storefront imagery and social-ready content.</li>
                <li>Social media management across Instagram, TikTok, Facebook, X, and Reddit. Native short-form video, graphics, weekly publishing.</li>
                <li>Influencer activation: vetted creator sourcing, onboarding, mission briefs, verified submissions, managed payouts.</li>
                <li>Paid ads: multi-region, multi-ad-set structure, creative A/B testing, budget reallocation, full CPC, CPM, CTR reporting.</li>
                <li>Community ops across Discord, Steam Hub, and Reddit with active moderation and engagement.</li>
                <li>Monthly KPI reporting with budget reconciliation and transparent close-out.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CASE STUDY: SOCIAL/COMMUNITY ============ */}
      <section className="pitch-section pitch-section-bordered">
        <div className="rd-shell">
          <div className="pitch-case">
            <Reveal>
              <div className="pitch-case-head">
                <span className="pitch-case-eyebrow">Social, community, and Reddit programme</span>
                <h3>Pre-launch presence built for an Early Access debut</h3>
                <p>
                  Ongoing pre-launch programme focused on building genuine familiarity with the
                  game and its systems before Early Access launch. Status: ongoing, results pending.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <ul className="pitch-case-list">
                <li>Active Discord community management: moderation, onboarding, weekly engagement, dev-to-community translation, event coordination.</li>
                <li>Heavy organic Reddit growth focus. Long-form posts designed to spark discussion. Multiple posts reached the top of the month on r/gameart, r/IndieDev, and r/pcgames.</li>
                <li>Building familiarity with characters, mechanics, world details surfaced in digestible posts and clips so launch day audiences already know what they are looking at.</li>
                <li>Social presence across Instagram, TikTok, X, Facebook, YouTube, and Reddit. Content tailored per platform.</li>
                <li>Steam storefront support for events, capsules, and announcements.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ PAST KPIs ============ */}
      <section className="pitch-section">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head">
              <span className="rd-section-tag">Past KPIs</span>
              <h2>What StreamQuest campaigns deliver.</h2>
              <p className="pitch-lead">
                Anonymized snapshots from past campaigns across genres. Full KPI reports
                available on request under NDA.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-kpi-grid">
              {kpis.map((k) => (
                <div key={k.genre} className="pitch-kpi-card">
                  <div className="pitch-kpi-genre">{k.genre}</div>
                  <ul>
                    {k.rows.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ QA BENEFITS ============ */}
      <section className="pitch-section pitch-section-bordered">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head">
              <span className="rd-section-tag">Beyond exposure</span>
              <h2>A cost-effective QA layer baked into the activation.</h2>
              <p className="pitch-lead">
                Marketing is not just about getting seen. It is about learning what works.
                At any stage of development, activating dozens of small streamers delivers
                authentic gameplay feedback and sentiment.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-grid pitch-grid-3">
              {qaBenefits.map((b) => (
                <div key={b.t} className="pitch-cell">
                  <div className="pitch-cell-dot" aria-hidden="true" />
                  <h3>{b.t}</h3>
                  <p>{b.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <p className="pitch-qa-note">
              You are not just tracking impressions. You are tracking honest first impressions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="pitch-section">
        <div className="rd-shell">
          <Reveal>
            <div className="pitch-head">
              <span className="rd-section-tag">From partners</span>
              <h2>What studios say after working with us.</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="pitch-quotes">
              {testimonials.map((t) => (
                <figure key={t.attrib} className="pitch-quote">
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>{t.attrib}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="pitch-final">
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
