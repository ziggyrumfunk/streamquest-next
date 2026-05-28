import type { Metadata } from "next";
import Link from "next/link";
import "@/app/redesign.css";
import "../case-studies.css";

export const metadata: Metadata = {
  title: "Planet of Lana II Case Study | StreamQuest",
  description:
    "How StreamQuest divided one influencer beat into 49 creator communities for Planet of Lana II. 159h verified livestream, 96.1% completion, 3,546.6 viewer-hours across 6 languages.",
  alternates: { canonical: "https://streamquest.io/case-studies/planet-of-lana-2" },
};

const PL2 = "/firebase-public/PlanetOfLana2";

const kpis = [
  { num: "49",         lbl: "Creators completed" },
  { num: "96.1%",      lbl: "Completion rate" },
  { num: "159h 08m",   lbl: "Verified stream time" },
  { num: "3,546.6",    lbl: "Viewer hours" },
  { num: "6",          lbl: "Live languages" },
  { num: "+85%",       lbl: "Runtime overdelivery" },
];

const creators = [
  "Gshiba", "Rhariane", "QueenJeey", "GirlWhoPlays", "Oimaai",
  "Undoubtedlylink", "HaouAnubis", "LunariValkyrie", "Paildry", "UmbritaC",
  "Eryuyu", "Gladiator50N", "Silent_genius", "Capsuhi", "AlinaKaidaVT",
];

const languages = ["English", "Portuguese", "French", "Spanish", "German", "Romanian"];

const topContrib = [
  { name: "Gshiba",       hours: "662.7" },
  { name: "Rhariane",     hours: "203.2" },
  { name: "QueenJeey",    hours: "164.7" },
  { name: "Oimaai",       hours: "138.8" },
  { name: "GirlWhoPlays", hours: "134.3" },
];

const socials = [
  {
    platform: "Instagram",
    pillClass: "ig",
    handle: "ItsTsubaki",
    meta: "Japanese-Brazilian Instagram Reel",
    href: "https://www.instagram.com/reels/DVm0EBcigDZ/",
  },
  {
    platform: "Instagram",
    pillClass: "ig",
    handle: "Silent_genius",
    meta: "English-language non-binary Instagram Reel",
    href: "https://www.instagram.com/reels/DVokOg3CCuu/",
  },
  {
    platform: "YouTube",
    pillClass: "yt",
    handle: "Capsuhi",
    meta: "French YouTube Shorts, face-cam reaction",
    href: "https://www.youtube.com/shorts/pJj6tR1rF6Q",
  },
  {
    platform: "X / Twitter",
    pillClass: "x",
    handle: "UmbritaC",
    meta: "X giveaway post tied to the launch activation",
    href: "https://x.com/UmbritaC/status/2029895704672391507",
  },
];

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://streamquest.io";
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Planet of Lana II x StreamQuest case study",
  description:
    "How StreamQuest divided one influencer beat into 49 creator communities for Planet of Lana II.",
  image: [`${SITE}${PL2}/PoL II Wemari Tree.jpg`],
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
    "@id": `${SITE}/case-studies/planet-of-lana-2`,
  },
};

export default function PlanetOfLana2CaseStudy() {
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
          style={{ backgroundImage: `url('${PL2}/PoL II Wemari Tree.jpg')` }}
        />
        <div className="cs-shell cs-hero-inner">
          <Link href="/case-studies" className="cs-back-link">
            ← All case studies
          </Link>
          <span className="cs-eyebrow">Case study · Thunderful x Wishfully</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="cs-hero-game-logo"
            src={`${PL2}/02_PoL_II_Logo_White_without_tagline.png`}
            alt="Planet of Lana II"
          />
          <h1>
            Dividing one influencer beat into{" "}
            <span className="grad">49 creator communities</span>.
          </h1>
          <p className="cs-hero-lead">
            For Planet of Lana II, StreamQuest turned what could have been a single
            mid-sized influencer placement into a managed micro-creator campaign
            across dozens of smaller Twitch communities. Across a focused two-week
            window: 49 completed creator streams, 159h 08m of verified coverage and
            3,546.6 viewer-hours.
          </p>

          <div className="cs-hero-partners">
            <span className="cs-hero-partners-label">In partnership with</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${PL2}/Thunderful_SecondaryLogo_White_RGB.png`} alt="Thunderful" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${PL2}/Wishfully_Logo_white.png`} alt="Wishfully" />
          </div>
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

      {/* ===== APPROACH / CAMPAIGN SETUP ===== */}
      <section className="cs-section cs-bg-rakuen">
        <div className="cs-section-bg" aria-hidden="true" />
        <div className="cs-shell">
          <div className="cs-split">
            <div>
              <span className="cs-tag">The Approach</span>
              <h2>One campaign beat, many smaller communities.</h2>
              <p>
                A common campaign choice is to spend a meaningful part of the budget on
                one mid-sized influencer and hope that single placement performs.
                StreamQuest takes a different approach: divide that attention across
                many smaller creators, then manage the campaign tightly so the output
                stays coordinated and measurable.
              </p>
              <p>
                The goal was not to replace the broader campaign around the game.
                StreamQuest acted as the micro-layer: building the mission structure,
                briefing creators, managing applications, coordinating access, collecting
                proof, and turning many smaller creator moments into a measurable
                launch-period activation.
              </p>
              <h3>The activation included</h3>
              <ul className="cs-list">
                <li>A creator-facing mission brief and dedicated StreamQuest campaign page</li>
                <li>Clear Bronze (1h) and Silver (2h) stream requirements</li>
                <li>Creator applications, manual approval, and quality checks</li>
                <li>Campaign instructions, proof requirements, and ongoing support</li>
                <li>Key distribution after access was cleared</li>
                <li>A concentrated two-week activation period</li>
                <li>VOD and social proof collection</li>
                <li>Final KPI reporting</li>
              </ul>
            </div>
            <div className="cs-split-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${PL2}/PoLII_GIF_01.gif`} alt="Planet of Lana II gameplay" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY THIS GAME WORKED ===== */}
      <section className="cs-section cs-section-shaded cs-bg-deer">
        <div className="cs-section-bg" aria-hidden="true" />
        <div className="cs-shell">
          <div className="cs-split cs-split-reverse">
            <div>
              <span className="cs-tag">Game Fit</span>
              <h2>Why this game worked for the format.</h2>
              <p>
                Planet of Lana II had a strong natural fit for Twitch discovery
                because it was recognizable, visually clear, and easy for creators to
                introduce to their communities.
              </p>
              <p>
                The cozy cinematic adventure feel of exploration, puzzle-solving,
                quiet worldbuilding, and character-driven moments works well for
                smaller streamers. It gives them room to talk with chat, react
                naturally, and let viewers settle into the atmosphere.
              </p>
              <p>
                Micro-creator campaigns work best when the creator can genuinely
                carry the game in their own voice. Planet of Lana II gave creators
                enough visual identity and emotional tone to do that without forcing
                artificial hype.
              </p>
            </div>
            <div className="cs-split-visual is-art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${PL2}/Pol2_Cutout_LanaMui_03.png`} alt="Lana and Mui" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CREATOR SELECTION ===== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 36 }}>
            <span className="cs-tag">Creator Selection</span>
            <h2>Built for spread, not concentration.</h2>
            <p>
              Creators applied through the StreamQuest dashboard and were reviewed
              before approval. The goal was to build a spread of communities rather
              than filling the campaign with one narrow audience type. The activation
              reached European, North American and LATAM-facing communities without
              needing to frame the campaign around one dominant region.
            </p>
            <p className="cs-muted">
              35 completed creators ranked inside Twitch's global top 2%, with 19
              inside the top 1%. Mostly smaller communities, but with enough channel
              quality to create meaningful live visibility.
            </p>
          </div>

          <div className="cs-creator-block">
            <div>
              <h3>Selected creators</h3>
              <div className="cs-chip-row">
                {creators.map((c) => (
                  <span key={c} className="cs-chip">{c}</span>
                ))}
              </div>
            </div>
            <div>
              <h3>Live stream languages</h3>
              <div className="cs-chip-row">
                {languages.map((l) => (
                  <span key={l} className="cs-chip is-lang">{l}</span>
                ))}
              </div>
              <p className="cs-muted" style={{ marginTop: 18 }}>
                6 languages, multiple regions, no single dominant audience.
                The campaign reached communities organically across continents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STREAM TIME DELIVERED ===== */}
      <section className="cs-section cs-section-shaded cs-bg-city">
        <div className="cs-section-bg" aria-hidden="true" />
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Runtime Overdelivery</span>
            <h2>+73h 08m beyond the contracted baseline.</h2>
            <p>
              StreamQuest partners only pay for the contracted quest requirement: 1
              hour for Bronze and 2 hours for Silver. Any stream time beyond that is
              organic overdelivery from creators choosing to keep playing, keep
              talking to chat, and keep the game live. In this campaign that meant
              almost double the expected stream time.
            </p>
          </div>

          <div className="cs-stream-bars">
            <div className="cs-bar-row">
              <div className="cs-bar-head">
                <span className="cs-bar-title">Silver creators (37 completions)</span>
                <span className="cs-bar-numbers">
                  baseline 74h · delivered <strong>116h 20m</strong>
                </span>
              </div>
              <div className="cs-bar-track">
                <div className="cs-bar-fill-baseline" style={{ width: "46.5%" }} />
                <div className="cs-bar-fill-actual" style={{ width: "73%" }} />
              </div>
            </div>

            <div className="cs-bar-row">
              <div className="cs-bar-head">
                <span className="cs-bar-title">Bronze creators (12 completions)</span>
                <span className="cs-bar-numbers">
                  baseline 12h · delivered <strong>42h 48m</strong>
                </span>
              </div>
              <div className="cs-bar-track">
                <div className="cs-bar-fill-baseline" style={{ width: "7.5%" }} />
                <div className="cs-bar-fill-actual" style={{ width: "27%" }} />
              </div>
            </div>

            <div className="cs-bar-row">
              <div className="cs-bar-head">
                <span className="cs-bar-title">Total runtime (all completions)</span>
                <span className="cs-bar-numbers">
                  baseline 86h · delivered <strong>159h 08m</strong>
                </span>
              </div>
              <div className="cs-bar-track">
                <div className="cs-bar-fill-baseline" style={{ width: "54%" }} />
                <div className="cs-bar-fill-actual" style={{ width: "100%" }} />
              </div>
            </div>

            <div className="cs-bar-legend">
              <span>
                <span
                  className="cs-bar-legend-swatch"
                  style={{ background: "rgba(178, 240, 72, 0.35)", borderRight: "2px dashed rgba(255,255,255,0.5)" }}
                />
                Contracted baseline
              </span>
              <span>
                <span
                  className="cs-bar-legend-swatch"
                  style={{ background: "linear-gradient(90deg, #B2F048, #D5FF78)" }}
                />
                Actual delivered runtime
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AUDIENCE DELIVERY ===== */}
      <section className="cs-section cs-bg-forest">
        <div className="cs-section-bg" aria-hidden="true" />
        <div className="cs-shell">
          <div className="cs-split">
            <div>
              <span className="cs-tag">Audience Delivery</span>
              <h2>3,546.6 viewer-hours of live gameplay attention.</h2>
              <p>
                Viewer-hours are one of the most useful StreamQuest metrics because they
                measure actual watched gameplay time, not just post volume or creator
                count. One small creator is not meant to carry the campaign alone. The
                value comes from many creators each contributing real watch time,
                repeated discovery moments, and community-level attention.
              </p>
              <ul className="cs-list">
                <li>3,546.6 total viewer-hours generated</li>
                <li>22.3 weighted average live viewers per stream</li>
                <li>18 median average viewers</li>
                <li>97 peak live viewers on the strongest stream</li>
              </ul>
            </div>
            <div>
              <h3 style={{ marginTop: 0 }}>Top viewer-hour contributors</h3>
              <div className="cs-top-contrib">
                {topContrib.map((c, i) => (
                  <div key={c.name} className="cs-top-contrib-row">
                    <span className="cs-top-contrib-rank">#{i + 1}</span>
                    <span className="cs-top-contrib-name">{c.name}</span>
                    <span className="cs-top-contrib-val">{c.hours}h</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SIDE QUESTS / SOCIAL PROOF ===== */}
      <section className="cs-section cs-section-shaded cs-bg-wall">
        <div className="cs-section-bg" aria-hidden="true" />
        <div className="cs-shell">
          <div style={{ maxWidth: 720 }}>
            <span className="cs-tag">Side Quests &amp; Organic Content</span>
            <h2>86 visible side-quest actions across platforms.</h2>
            <p>
              StreamQuest campaigns are built around a Main Quest (the verified
              livestream) and optional Side Quests that extend the campaign beyond
              Twitch: clips, social posts, tags, mentions, and other public activity
              around the game.
            </p>
            <ul className="cs-list" style={{ marginBottom: 8 }}>
              <li>35 public social posts and 4 bonus social posts</li>
              <li>35 Cinematic Clipper completions</li>
              <li>47 Hype Spreader completions</li>
              <li>35 creators completed two or more visible side-quest actions</li>
            </ul>
            <p className="cs-muted" style={{ marginTop: 22 }}>
              Awareness does not only come from one stream. It also comes from
              repeated signals: creators tagging the game, posting clips, mentioning
              the title, sharing content, and keeping the campaign visible across
              more than one feed.
            </p>
          </div>

          {/* ---- Featured viral example (GirlWhoPlays) ---- */}
          <div className="cs-viral-feature">
            <div className="cs-viral-embed">
              <div className="cs-viral-frame">
                <iframe
                  src="https://www.instagram.com/reel/DV9OyaakXft/embed"
                  title="GirlWhoPlays Planet of Lana II Instagram Reel"
                  loading="lazy"
                  allow="encrypted-media"
                  scrolling="no"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="cs-viral-text">
              <span className="cs-viral-badge">Example of a small clip that can go viral</span>
              <h3>40 posts. One of them takes off. That&apos;s the whole bet.</h3>
              <p>
                The micro-creator model is not built on every post overperforming. It is
                built on the math that when many creators post across many unique
                accounts, the campaign creates many chances for one piece of content to
                break out.
              </p>
              <p>
                @GirlWhoPlays&apos; Spanish-language reel was that piece on this campaign.
                A creator the algorithm liked, a clip that lined up with her audience,
                and the kind of organic reach a single paid placement is unlikely to
                buy on its own.
              </p>
              <p className="cs-muted">
                The rest of the activation still provides the base layer of proof,
                tags, and visibility. The viral hit sits on top of that base, not in
                place of it.
              </p>
              <a
                className="cs-viral-link"
                href="https://www.instagram.com/reels/DV9OyaakXft/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on Instagram →
              </a>
            </div>
          </div>

          <h3 style={{ marginTop: 48 }}>The rest of the social spread</h3>
          <p className="cs-muted">
            The output appeared across Instagram, YouTube Shorts and X. Each post added
            its own slice of proof and tags. Not every individual post needs to
            overperform for the campaign to be valuable.
          </p>

          <div className="cs-socials">
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cs-social"
              >
                <span className="cs-social-platform">
                  <span className={`cs-social-pill ${s.pillClass}`}>{s.platform}</span>
                </span>
                <div className="cs-social-handle">@{s.handle}</div>
                <p className="cs-social-meta">{s.meta}</p>
                <span className="cs-social-link">View post →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY THIS MATTERS ===== */}
      <section className="cs-section cs-bg-tree">
        <div className="cs-section-bg" aria-hidden="true" />
        <div className="cs-shell">
          <div className="cs-split">
            <div>
              <span className="cs-tag">Why It Matters</span>
              <h2>A complementary layer, not a replacement.</h2>
              <p>
                Planet of Lana II is a useful example of how StreamQuest can support a
                broader launch campaign without requiring the brand to bet everything
                on one creator.
              </p>
              <p>
                This is not a replacement for PR, paid media, or major influencer
                work. It is a complementary layer designed to make a campaign feel
                active across the creator ecosystem.
              </p>
              <h3>The distributed model in practice</h3>
              <ul className="cs-list">
                <li>Many creators going live during a focused window</li>
                <li>Many small communities seeing the game from trusted voices</li>
                <li>Many public posts and tags from unique accounts</li>
                <li>Many proof points collected into one KPI report</li>
                <li>Less dependence on a single creator&apos;s performance</li>
              </ul>
            </div>
            <div className="cs-split-visual is-art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${PL2}/Pol2_Cutout_Deer.png`} alt="Wemari deer" loading="lazy" />
            </div>
          </div>

          {/* ===== CLOSING CTA ===== */}
          <div className="cs-cta">
            <span className="cs-tag">Run this for your game</span>
            <h2>
              One campaign beat,{" "}
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
                distributed across many creators
              </span>
              .
            </h2>
            <p>
              For games with an existing hook, a strong visual identity, or a
              community-friendly gameplay loop, StreamQuest can help turn one
              campaign beat into many smaller moments of discovery.
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
