import Link from "next/link";
import FloatingDiscord from "@/app/components/FloatingDiscord";
import type { Metadata } from "next";

import Reveal from "@/app/components/Reveal";
import PolaroidField from "@/app/components/PolaroidField";
import { quests } from "@/data/quests";
import "@/app/redesign.css";
import "./streamers.css";

export const metadata: Metadata = {
  title: "For streamers — get paid to play indie & AA games",
  description:
    "Real money for real streams. Apply for paid Twitch quests with indie and AA games. 300+ followers, 5+ CCV, all regions welcome.",
};

/* Real creators displayed in the hero avatar wall (13 streamers) */
const creators = [
  { name: "CaedesEnder",    handle: "@caedesender",   twitch: "https://www.twitch.tv/caedesender",   avatar: "/firebase-public/Streamer Icons/CaedesEnder.png" },
  { name: "Drowsbicycle",   handle: "@drowsybicycle", twitch: "https://www.twitch.tv/drowsybicycle", avatar: "/firebase-public/Streamer Icons/Drowsbicycle.png" },
  { name: "FalaMarkao",     handle: "@falamarkao",    twitch: "https://www.twitch.tv/falamarkao",    avatar: "/firebase-public/Streamer Icons/FalaMarkao.png" },
  { name: "Findseloy",      handle: "@findseloy",     twitch: "https://www.twitch.tv/findseloy",     avatar: "/firebase-public/Streamer Icons/Findseloy.png" },
  { name: "Fradda",         handle: "@fradda",        twitch: "https://www.twitch.tv/fradda",        avatar: "/firebase-public/Streamer Icons/Fradda.png" },
  { name: "ItsTsubaki",     handle: "@itstsubaki",    twitch: "https://linktr.ee/itstsubaki",        avatar: "/firebase-public/Streamer Icons/ItsTsubaki.png" },
  { name: "John_Shinoda",   handle: "@john_shinoda",  twitch: "https://www.twitch.tv/john_shinoda",  avatar: "/firebase-public/Streamer Icons/John_Shinoda.png" },
  { name: "Paildry",        handle: "@paildry",       twitch: "https://twitch.tv/Paildry",            avatar: "/firebase-public/Streamer Icons/Paildry.png" },
  { name: "Paschoalin",     handle: "@paschoalin",    twitch: "https://www.twitch.tv/paschoalin",    avatar: "/firebase-public/Streamer Icons/Paschaolin.jpeg" },
  { name: "Scorpinhoo",     handle: "@scorpinhoo",    twitch: "https://www.twitch.tv/scorpinhoo",    avatar: "/firebase-public/Streamer Icons/Scorphinhoo.png" },
  { name: "ShrillGoblin",   handle: "@shrillgoblin",  twitch: "https://www.twitch.tv/shrillgoblin",  avatar: "/firebase-public/Streamer Icons/ShrillGoblin.png" },
  { name: "igorbay0",       handle: "@igorbay0",      twitch: "https://twitch.tv/igorbay0",          avatar: "/firebase-public/Streamer Icons/igorbay0.png" },
  { name: "lunarivalkyrie", handle: "@lunarivalkyrie",twitch: "https://www.twitch.tv/lunarivalkyrie",avatar: "/firebase-public/Streamer Icons/lunarivalkyrie.png" },
];

/* alternate circle / square shapes per slot for visual rhythm */
const slotShape = (i: number) => (i % 3 === 1 ? "square" : "circle");

const requirements = [
  { num: "01", title: "300+ Twitch followers", body: "Real audience baseline. Exceptions made for clearly real, engaged communities below this line." },
  { num: "02", title: "5+ average concurrent viewers", body: "Recent average across your streams. Bot traffic and view-bombing disqualify instantly." },
  { num: "03", title: "Real engagement, real chat", body: "Your community talks. Your viewers stay. That is the bar. Niche size is fine." },
  { num: "04", title: "All regions welcome", body: "No US-only nonsense. EU, LATAM, Asia, Africa, anywhere. Payouts work across borders." },
];

const ranks = [
  {
    code: "BRONZE",
    title: "Bronze creator",
    body: "Welcome rank. Every approved streamer starts here.",
    perks: [
      "100 bonus XP on first completed Quest",
      "Free game key for every Quest you accept",
      "Access to the Bronze Lounge on Discord",
    ],
    promo: "Complete 4 quests · maintain 5 viewers/hr",
  },
  {
    code: "SILVER",
    title: "Silver creator",
    body: "Promotion unlocks higher-paid quests and a stream-time multiplier.",
    perks: [
      "10 XP per completed Quest",
      "Up to 3 hours paid stream per Quest",
      "Free game key for every Quest",
      "Access to Silver-exclusive Quests",
      "Silver badge + leaderboard placement",
    ],
    promo: "Maintain 15 viewers/hr average",
  },
  {
    code: "GOLD",
    title: "Gold creator",
    body: "Top-tier rank. Highest payout caps and exclusive launch slots.",
    perks: [
      "Premium quest invitations",
      "Higher per-hour payout caps",
      "Direct support channel",
      "Featured spotlight on StreamQuest",
    ],
    promo: "Sustained performance over multiple campaigns",
  },
];

const testimonials = [
  {
    name: "Paildry",
    handle: "twitch.tv/paildry",
    twitch: "https://twitch.tv/Paildry",
    avatar: "/firebase-public/Streamer Icons/Paildry.png",
    quote: "Completed 10+ quests across several great games, and every payment arrived on time as promised. StreamQuest has been reliable and transparent.",
  },
  {
    name: "Findseloy",
    handle: "twitch.tv/findseloy",
    twitch: "https://www.twitch.tv/findseloy",
    avatar: "/firebase-public/Streamer Icons/Findseloy.png",
    quote: "I have been here practically since the beginning and I have never seen a project so friendly to smaller creators.",
  },
  {
    name: "ShrillGoblin",
    handle: "twitch.tv/shrillgoblin",
    twitch: "https://www.twitch.tv/shrillgoblin",
    avatar: "/firebase-public/Streamer Icons/ShrillGoblin.png",
    quote: "Quick turn arounds for quest completions. I have been more than happy to recommend the program to my content creator friends.",
  },
  {
    name: "LunariValkyrie",
    handle: "twitch.tv/lunarivalkyrie",
    twitch: "https://www.twitch.tv/lunarivalkyrie",
    avatar: "/firebase-public/Streamer Icons/lunarivalkyrie.png",
    quote: "After being treated so poorly on another platform, despite being a top performer, I was scared to try another. But I couldn't be happier here.",
  },
];

export default function StreamersPage() {
  return (
    <div className="rd">
      {/* ============ HERO — creator avatar wall ============ */}
      <section className="sm-hero">
        <div className="sm-hero-grid">
          <div className="sm-hero-left">
            <Reveal>
              <span className="eyebrow">
                <span className="pulse" />
                Paid Twitch quests for real streamers
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1>
                <span className="line">Stream for studios.</span>
                <span className="line grad">Get paid.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="sm-hero-sub">
                Level up, build community, earn cash. StreamQuest pays real money to small and mid-tier Twitch streamers for playing indie and AA games. No follower-count gatekeepers, no exposure-bucks, no bot traffic.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="sm-hero-ctas">
                <a href="https://discord.gg/NhqfucYDXD" className="btn btn-primary btn-xl">
                  Apply on Discord →
                </a>
                <a href="https://app.streamquest.io" className="btn btn-secondary btn-xl">
                  Open Creator Dashboard
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="sm-hero-trust">
                <div className="rd-trust-item"><span className="rd-trust-num">5d</span><span className="rd-trust-label">payout</span></div>
                <div className="rd-trust-item"><span className="rd-trust-num">€0</span><span className="rd-trust-label">hidden fees</span></div>
                <div className="rd-trust-item"><span className="rd-trust-num">20+</span><span className="rd-trust-label">countries</span></div>
                <div className="rd-trust-item"><span className="rd-trust-num">100%</span><span className="rd-trust-label">human review</span></div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="sm-wall" aria-label="Real creators on StreamQuest">
              <span className="sm-wall-label">
                <span className="pulse" />
                Real creators · real payouts
              </span>
              {creators.map((c, i) => (
                <a
                  key={c.name}
                  href={c.twitch}
                  rel="noopener"
                  target="_blank"
                  className={`sm-creator c${i + 1} ${slotShape(i)}`}
                  aria-label={`${c.name} on Twitch`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.avatar} alt="" loading={i < 5 ? "eager" : "lazy"} />
                  <span className="sm-creator-handle">{c.handle}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ VIDEO EMBED ============ */}
      <section className="rd-video">
        <div className="rd-shell">
          <Reveal>
            <div className="rd-video-head">
              <span className="rd-section-tag">See it in action</span>
              <h2>Watch how <span className="grad">StreamQuest</span> works.</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="rd-video-wrap">
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
        </div>
      </section>

      {/* ============ ELIGIBILITY ============ */}
      <section className="rd-section">
        <div className="rd-shell">
          <Reveal>
            <div className="rd-section-head center" style={{ marginBottom: 64, marginLeft: "auto", marginRight: "auto" }}>
              <span className="rd-section-tag">Streamer requirements</span>
              <h2>The bar is real, but reachable.</h2>
              <p>If your community talks, trusts you, and shows up, you qualify.</p>
            </div>
          </Reveal>

          <div className="rd-why-features">
            {requirements.map((r, i) => (
              <Reveal key={r.num} delay={i * 0.08}>
                <div className="rd-feat">
                  <span className="rd-feat-num">{r.num}</span>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GAMES SHOWCASE — scrolling angle-cut strip ============ */}
      <section className="sm-showcase" aria-label="Games we've worked with">
        <Reveal>
          <div className="sm-showcase-head">
            <span className="sm-showcase-tag">Games we&apos;ve worked with</span>
            <h2>The library so far.</h2>
          </div>
        </Reveal>

        <div className="sm-strip" aria-hidden="true">
          <div className="sm-strip-track">
            {[...quests, ...quests].map((q, i) => (
              <div key={`${q.slug}-${i}`} className="sm-strip-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={q.cover} alt="" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STREAMER RANKS ============ */}
      <section className="rd-section">
        <div className="rd-shell">
          <Reveal>
            <div className="rd-section-head center" style={{ marginBottom: 56, marginLeft: "auto", marginRight: "auto" }}>
              <span className="rd-section-tag">Tiers explained</span>
              <h2>Climb from Bronze to Gold.</h2>
              <p>Three creator ranks. Higher tier unlocks better-paying quests, longer paid stream caps, and exclusive launch slots.</p>
            </div>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 56,
            position: "relative",
            maxWidth: 1100,
            margin: "0 auto",
          }}>
            {ranks.map((r, i) => (
              <Reveal key={r.code} delay={i * 0.1}>
                <div style={{ textAlign: "center", padding: "0 12px" }}>
                  <div className="rd-tier-badge">{r.code}</div>
                  <h3 style={{ fontSize: "1.5rem", marginBottom: 10, letterSpacing: "-0.01em" }}>{r.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.62)", fontSize: 14, marginBottom: 22, lineHeight: 1.6 }}>
                    {r.body}
                  </p>
                  <ul style={{
                    listStyle: "none",
                    padding: 0,
                    textAlign: "left",
                    display: "grid",
                    gap: 10,
                    marginBottom: 22,
                  }}>
                    {r.perks.map((p) => (
                      <li key={p} style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", display: "flex", gap: 10 }}>
                        <span style={{ color: "var(--rd-lime)", fontWeight: 700 }}>·</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--rd-twitch-2)",
                    paddingTop: 18,
                    borderTop: "1px solid var(--rd-line)",
                  }}>
                    Promo: {r.promo}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="rd-testimonials">
        <div className="rd-shell">
          <Reveal>
            <div className="rd-testimonials-head">
              <span className="rd-section-tag">Streamer testimonials</span>
              <h2>Real money. Real quotes.</h2>
              <p>Every voice below is a streamer who has been paid by StreamQuest.</p>
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

      {/* ============ FINAL CTA ============ */}
      <section className="rd-final">
        <PolaroidField
          tiles={quests.slice(5, 13).map((q, i) => ({
            src: q.cover, className: `f${i + 1}`, depth: 0.35 + (i % 4) * 0.1,
          }))}
          className="rd-polaroids"
          intensity={65}
        />

        <div className="rd-final-inner">
          <Reveal>
            <span className="eyebrow">
              <span className="pulse" />
              Apply in under 2 minutes
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>Your first paid stream is <span className="grad">one quest away</span>.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p>Join Discord, link your Twitch in the Creator Dashboard, pick a quest, go live. Get paid in five business days.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="rd-final-actions">
              <a href="https://discord.gg/NhqfucYDXD" className="btn btn-primary btn-xl">
                Join Discord →
              </a>
              <a href="https://app.streamquest.io" className="btn btn-secondary btn-xl">
                Open Creator Dashboard
              </a>
              <Link href="/quests-guide" className="btn btn-ghost btn-xl">
                Read the Quests Guide
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
          <FloatingDiscord />
      </div>
  );
}
