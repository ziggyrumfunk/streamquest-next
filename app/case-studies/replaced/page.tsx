import type { Metadata } from "next";
import Link from "next/link";
import "@/app/redesign.css";
import "../case-studies.css";

export const metadata: Metadata = {
  title: "REPLACED Case Study | StreamQuest",
  description:
    "How StreamQuest distributed REPLACED's launch across 62 micro-creators, generating 279h of stream time, 6,782 viewer-hours, and demand strong enough to add 15 extra slots mid-campaign.",
  alternates: { canonical: "https://streamquest.io/case-studies/replaced" },
};

const RP = "/firebase-public/Replaced";
const IK = "https://ik.imagekit.io/rumfunk/StreamQuest/REPLACED";

const HERO_BG = `${RP}/sq-replaced-screenshot-01.webp`;
const GAME_LOGO = `${RP}/sq-replaced-logo-white.webp`;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://streamquest.io";
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "REPLACED x StreamQuest case study",
  description:
    "Inside the REPLACED launch activation: 62 creators, 279h of verified stream time, 6,782 viewer-hours, and 15 extra slots added mid-campaign due to demand.",
  image: [`${SITE}${RP}/sq-replaced-keyart-landscape-1920.webp`],
  author: { "@type": "Organization", name: "StreamQuest" },
  publisher: {
    "@type": "Organization",
    name: "StreamQuest",
    logo: {
      "@type": "ImageObject",
      url: `${SITE}/firebase-public/Logos%20Partner/streamquest%20logo.png`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE}/case-studies/replaced`,
  },
};

const kpis = [
  { num: "62",      lbl: "Creators logged" },
  { num: "279h",    lbl: "Total stream time" },
  { num: "6,782",   lbl: "Viewer-hours" },
  { num: "55",      lbl: "Proof links logged" },
  { num: "50",      lbl: "Wishlist proofs" },
  { num: "+15",     lbl: "Slots added mid-flight" },
];

const dedication = [
  { label: "Total stream time across all creators",  value: "279h 45m" },
  { label: "Creators who streamed 10 hours or more", value: "8" },
  { label: "Top creator stream length",              value: "~20h" },
  { label: "Completionist objective completions",    value: "7" },
  { label: "Weighted average CCV",                   value: "24.2" },
  { label: "Total viewer-hours generated",           value: "6,782.6" },
];

const xPosts = [
  {
    handle: "@TheGamesDet",
    label: "The Games Detective",
    views: "12.3K",
    reshares: "223",
    href: "https://x.com/TheGamesDet/status/2042554494563536954",
  },
  {
    handle: "@UmbritaC",
    label: "Umbrita C",
    views: "6K",
    reshares: "221",
    href: "https://x.com/UmbritaC/status/2043348075565994016",
  },
  {
    handle: "@Lordacris",
    label: "Lordacris",
    views: "4.2K",
    reshares: "150",
    href: "https://x.com/Lordacris/status/2042606663585116573",
  },
];

const reasons = [
  { num: "01", title: "REPLACED had natural creator pull",
    body: "The game's visual identity and pre-launch anticipation gave creators a strong reason to participate. StreamQuest turned that interest into structured coverage instead of forced placements." },
  { num: "02", title: "The creator pool was intentionally spread",
    body: "Keys went out across regions, languages, and creator sizes — reaching more distinct audience pockets than a concentrated big-creator buy would have." },
  { num: "03", title: "Micro-creators created longer attention windows",
    body: "Instead of one big spike, the campaign generated many smaller community-led waves. Sustained exposure with more authentic interaction around the game." },
  { num: "04", title: "Side quests created extra value",
    body: "Social posts, wishlist proofs, and giveaway activity gave the campaign more than Twitch airtime. Creators supported the game across X, Instagram, TikTok, YouTube, and Bluesky." },
  { num: "05", title: "Manual verification kept reporting clean",
    body: "Every result tied back to proof: VODs, TwitchTracker links, social posts, and submitted side-quest links. Reporting stayed transparent and auditable." },
  { num: "06", title: "Demand justified campaign expansion",
    body: "Creator applications exceeded initial capacity. StreamQuest and the publisher agreed to expand by 15 slots — a rare signal of genuine market interest in a campaign activation." },
];

export default function ReplacedCaseStudy() {
  return (
    <main className="cs-wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ===== HERO ===== */}
      <section className="cs-hero">
        <div
          className="cs-hero-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="cs-shell cs-hero-inner">
          <Link href="/case-studies" className="cs-back-link">
            ← All case studies
          </Link>
          <span className="cs-eyebrow">Case study · Thunderful x Sad Cat Studios</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="cs-hero-game-logo"
            src={GAME_LOGO}
            alt="REPLACED"
          />
          <h1>
            62 creators, 279 hours,{" "}
            <span className="grad">15 extra slots opened mid-flight</span>.
          </h1>
          <p className="cs-hero-lead">
            One of StreamQuest's strongest campaigns to date. A carefully structured
            micro-creator activation turned REPLACED's launch window into 279h 45m
            of verified stream time, 6,782 viewer-hours, and creator demand strong
            enough that the slot count was expanded by 15 mid-campaign.
          </p>
        </div>
      </section>

      {/* ===== KPI STRIP ===== */}
      <section className="cs-kpi-strip">
        <div className="cs-shell">
          <div className="cs-kpi-grid">
            {kpis.map((k) => (
              <div key={k.lbl} className="cs-kpi">
                <div className="cs-kpi-num">{k.num}</div>
                <div className="cs-kpi-lbl">{k.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE APPROACH ===== */}
      <section className="cs-section cs-bg-replaced-01">
        <div className="cs-section-bg" aria-hidden="true" />
        <div className="cs-shell">
          <div className="cs-split">
            <div>
              <span className="cs-tag">The Approach</span>
              <h2>One campaign beat, distributed across 62 creator communities.</h2>
              <p>
                Rather than concentrating campaign value into a small number of
                large creators, StreamQuest distributed keys across a wide mix of
                streamers, languages, and communities — reaching different audience
                pockets while keeping coverage authentic and community-driven.
              </p>
              <h3>What the activation included</h3>
              <ul className="cs-list">
                <li>A dedicated mission brief with clear objectives and tone guidance</li>
                <li>Bronze and Silver stream commitments (1h / 2h baselines)</li>
                <li>Tracked wishlist link for proof attribution</li>
                <li>Manual creator screening and key distribution</li>
                <li>Side quests for social posts, clips, and Growing Together submissions</li>
                <li>Manual VOD verification + side-quest proof audit</li>
                <li>Final KPI report with traceable per-creator data</li>
              </ul>
              <div className="cs-pullquote">
                The campaign performed strongly enough that the slot count was
                expanded by 15 additional creators as part of the agreement.
              </div>
            </div>
            <div className="cs-split-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${IK}/Replaced_Release_Date_Trailer_Screenshot_03.webp?updatedAt=1775748514628`}
                alt="REPLACED gameplay — R.E.A.C.H. Phoenix-City"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY THIS GAME WORKED ===== */}
      <section className="cs-section cs-section-shaded cs-bg-replaced-02">
        <div className="cs-section-bg" aria-hidden="true" />
        <div className="cs-shell">
          <div className="cs-split cs-split-reverse">
            <div>
              <span className="cs-tag">Game Fit</span>
              <h2>Why this game worked for the format.</h2>
              <p>
                REPLACED combined a highly anticipated indie title with the kind of
                cinematic, side-scrolling identity that creators love to introduce
                to their audiences. The game showed well on stream, generated
                strong organic curiosity in chat, and gave creators something
                visually distinct to react to.
              </p>
              <p>
                That natural pull is what made the micro-creator model land. The
                campaign didn't have to manufacture interest — it had to channel
                existing creator enthusiasm into structured, verifiable coverage.
              </p>
            </div>
            <div className="cs-split-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${IK}/Replaced_Release_Date_Trailer_Screenshot_07.webp?updatedAt=1775748514537`}
                alt="REPLACED gameplay screenshot"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== MISSION BRIEF + TRAILER ===== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 12 }}>
            <span className="cs-tag">The Brief</span>
            <h2>Trailer + mission brief, embedded for every creator.</h2>
            <p>
              The mission brief anchored the campaign — giving creators clear
              objectives, tone guidance, and the tracked wishlist link. Both the
              trailer and the brief video were embedded for creators to reference
              before going live.
            </p>
          </div>

          <div className="cs-video-pair">
            <div className="cs-video-item">
              <p className="cs-video-label">
                <span className="cs-video-pip" aria-hidden="true" />
                Official Trailer
              </p>
              <div className="cs-video-frame">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/fuUo7_VaboE?rel=0&modestbranding=1"
                  title="REPLACED — official trailer"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="cs-video-item">
              <p className="cs-video-label">
                <span className="cs-video-pip" aria-hidden="true" />
                Mission Brief Video
              </p>
              <div className="cs-video-frame">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/pYxgYoaJL9M?rel=0&modestbranding=1"
                  title="REPLACED — mission brief video"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CREATOR DEDICATION ===== */}
      <section className="cs-section cs-section-shaded cs-bg-replaced-03">
        <div className="cs-section-bg" aria-hidden="true" />
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Creator dedication</span>
            <h2>Creators went far beyond the minimum.</h2>
            <p>
              The strongest indicator of campaign quality isn't how many creators
              activated — it's how deeply they engaged. On REPLACED, many streamed
              well beyond the required window, returned across multiple days, and
              completed the full game.
            </p>
          </div>

          <div className="cs-top-contrib">
            {dedication.map((row, i) => (
              <div key={row.label} className="cs-top-contrib-row">
                <span className="cs-top-contrib-rank">{String(i + 1).padStart(2, "0")}</span>
                <span className="cs-top-contrib-name">{row.label}</span>
                <span className="cs-top-contrib-val">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIVE COVERAGE ===== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Live coverage</span>
            <h2>A spread of creator VODs from the campaign window.</h2>
            <p>
              A small selection showing the range of playstyles and audience
              engagement REPLACED generated across the creator pool.
            </p>
          </div>

          <div className="cs-streams-grid">
            <div className="cs-stream">
              <div className="cs-stream-frame">
                <iframe
                  src="https://player.twitch.tv/?video=2762346356&parent=streamquest.io&autoplay=false"
                  title="REPLACED stream VOD 1"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <div className="cs-stream-meta">
                <strong>Creator VOD</strong>
                <span>REPLACED full session</span>
              </div>
            </div>
            <div className="cs-stream">
              <div className="cs-stream-frame">
                <iframe
                  src="https://player.twitch.tv/?video=2748253844&parent=streamquest.io&autoplay=false"
                  title="REPLACED stream VOD 2"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <div className="cs-stream-meta">
                <strong>Creator VOD</strong>
                <span>REPLACED campaign stream</span>
              </div>
            </div>
            <div className="cs-stream">
              <div className="cs-stream-frame">
                <iframe
                  src="https://player.twitch.tv/?video=2749379972&t=00h45m01s&parent=streamquest.io&autoplay=false"
                  title="REPLACED stream VOD 3"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <div className="cs-stream-meta">
                <strong>Creator VOD</strong>
                <span>REPLACED — starts at 45m</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOCIAL AMPLIFICATION ===== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Social amplification</span>
            <h2>22.5K views and 594 reshares from the giveaway wave alone.</h2>
            <p>
              Creators submitted 45 confirmed main social posts, 7 bonus links, and
              55 total proof links — creating a second layer of reach across X,
              Instagram, TikTok, YouTube and Bluesky. Below are the three
              giveaway-anchored posts that drove the bulk of the second-wave reach.
            </p>
          </div>

          <div className="cs-x-grid">
            {xPosts.map((p) => (
              <a
                key={p.href}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cs-x-card"
              >
                <span className="cs-x-pill">X / Twitter</span>
                <div className="cs-x-handle">{p.handle}</div>
                <div className="cs-x-stats">
                  <div>
                    <strong>{p.views}</strong>
                    <span>Views</span>
                  </div>
                  <div>
                    <strong>{p.reshares}</strong>
                    <span>Reshares</span>
                  </div>
                </div>
                <span className="cs-x-link">Open post →</span>
              </a>
            ))}
          </div>

          <div className="cs-giveaway">
            <div className="cs-giveaway-head">Giveaway totals</div>
            <table className="cs-giveaway-table">
              <thead>
                <tr>
                  <th>Creator</th>
                  <th className="num">Views</th>
                  <th className="num">Reshares</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>The Games Detective</td>
                  <td className="num">12.3K</td>
                  <td className="num">223</td>
                </tr>
                <tr>
                  <td>Umbrita C</td>
                  <td className="num">6K</td>
                  <td className="num">221</td>
                </tr>
                <tr>
                  <td>Lordacris</td>
                  <td className="num">4.2K</td>
                  <td className="num">150</td>
                </tr>
                <tr className="is-total">
                  <td><strong>Total</strong></td>
                  <td className="num">22.5K</td>
                  <td className="num">594</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== VIRAL MOMENT ===== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Viral moment</span>
            <h2>The post that broke through.</h2>
            <p>
              The post below is a clear signal of what micro-creator campaigns
              produce when the game has real pull. The creator posted beyond their
              minimum brief requirements — genuine enthusiasm, not paid compliance.
            </p>
          </div>

          <div className="cs-viral-feature">
            <div className="cs-viral-embed">
              <div className="cs-viral-frame">
                <iframe
                  src="https://www.instagram.com/p/DUtKmewidMY/embed"
                  title="REPLACED viral Instagram post"
                  loading="lazy"
                  allow="encrypted-media"
                  scrolling="no"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="cs-viral-text">
              <span className="cs-viral-badge">Organic reach beyond the brief</span>
              <h3>The campaign bought attention. The game earned the engagement.</h3>
              <p>
                The most valuable creators were not simply posting because they
                were asked to. They were genuinely interested in the game and
                willing to give it extended attention beyond the minimum brief
                requirements.
              </p>
              <p className="cs-muted">
                This is the structural advantage of the micro-creator model: when a
                game lands, the distributed creator base is the layer where
                authentic, repeating attention shows up across multiple feeds.
              </p>
              <a
                className="cs-viral-link"
                href="https://www.instagram.com/p/DUtKmewidMY/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on Instagram →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY IT WORKED ===== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Analysis</span>
            <h2>Why this campaign worked.</h2>
            <p>
              Six structural reasons REPLACED outperformed expectations — and a
              template for what a strong micro-creator activation looks like when
              the underlying game has real pull.
            </p>
          </div>

          <div className="cs-why-grid">
            {reasons.map((r) => (
              <div key={r.num} className="cs-why-card">
                <div className="cs-why-num">{r.num}</div>
                <h3 className="cs-why-title">{r.title}</h3>
                <p className="cs-why-body">{r.body}</p>
              </div>
            ))}
          </div>

          {/* ===== CLOSING CTA ===== */}
          <div className="cs-cta">
            <span className="cs-tag">Run this for your game</span>
            <h2>
              Real dedication.{" "}
              <span
                className="grad"
                style={{
                  background:
                    "linear-gradient(105deg, #B2F048 0%, #D5FF78 35%, #ffffff 78%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                Measurable live attention
              </span>
              . Verifiable proof.
            </h2>
            <p>
              REPLACED is the proof point that a structured micro-creator campaign
              can produce real dedication, measurable live attention, strong social
              proof, and meaningful community reach. If your game has the pull, we
              can run the layer that turns it into structured coverage.
            </p>
            <div className="cs-cta-row">
              <Link href="/brands" className="btn btn-neon">For studios</Link>
              <Link href="/pitch" className="btn btn-neon">See the full pitch</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
