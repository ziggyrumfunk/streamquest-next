import type { Metadata } from "next";
import type { QuestSwarmItem } from "@/data/quests";
import MutantSwarm from "@/app/components/MutantSwarm";
import { isUnlocked } from "./session";
import { signInAction, signOutAction } from "./actions";
import CreatorTable from "./CreatorTable";
import "@/app/redesign.css";
import "@/app/case-studies/case-studies.css";
import "./riftfall.css";

/* ============================================================
   /riftfall-kpi
   Client-facing KPI report for GameEra Studios, built from the
   final campaign KPI brief of 4 October 2026. Same structure as
   the other KPI reports. Internal figures from the brief (net
   receipts, payment fees, internal payouts) and the completion
   sheet link, which still holds internal reward figures, are
   deliberately left out.
   ============================================================ */

export const metadata: Metadata = {
  title: "RIFTFALL Creator Campaign KPI Report",
  description: "Client-facing StreamQuest KPI report for the RIFTFALL demo campaign.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { searchParams: { err?: string } };

const M = "/media/riftfall";
const HERO_POSTER = `${M}/kpi/hero-poster.webp`;
const HERO_VIDEO = `${M}/kpi/hero.mp4`;
const SESSION_PASCHOALIN = "https://twitchtracker.com/paschoalin/streams/319045439221";

/* Twitch player needs every host it will render on listed as a parent. */
const TWITCH_PARENTS = ["streamquest.io", "www.streamquest.io", "localhost", "127.0.0.1"];
const twitchVod = (id: string) =>
  `https://player.twitch.tv/?video=${id}&${TWITCH_PARENTS.map((p) => `parent=${p}`).join("&")}&autoplay=false&muted=true`;

/* Promo art from the mission brief, drifting down both margins behind the report. */
const SWARM: QuestSwarmItem[] = [
  { src: `${M}/art/promo-1.webp`, x: 79, y: 6, size: 200, depth: 0.9 },
  { src: `${M}/art/promo-4.webp`, x: 3, y: 14, size: 186, depth: 0.75 },
  { src: `${M}/art/promo-2.webp`, x: 80, y: 23, size: 176, depth: 0.7 },
  { src: `${M}/art/promo-6.webp`, x: 4, y: 32, size: 170, depth: 0.65 },
  { src: `${M}/art/promo-3.webp`, x: 81, y: 41, size: 168, depth: 0.65 },
  { src: `${M}/art/promo-8.webp`, x: 3, y: 50, size: 172, depth: 0.7 },
  { src: `${M}/art/promo-5.webp`, x: 81, y: 60, size: 160, depth: 0.55 },
  { src: `${M}/art/promo-7.webp`, x: 4, y: 70, size: 158, depth: 0.55 },
];

const kpis = [
  { num: "20", lbl: "Completed creators" },
  { num: "43h34", lbl: "Twitch gameplay" },
  { num: "2,150", lbl: "Est. viewer-hours" },
  { num: "€0.93", lbl: "Per viewer-hour" },
  { num: "5", lbl: "Languages" },
  { num: "19 / 19", lbl: "Twitch creators at tier floor" },
];

const tldrTiles = [
  { stat: "€2,000", label: "Campaign investment", sub: "€100 gross per completed activation" },
  { stat: "20", label: "Creators", sub: "8 Gold, 12 Silver. 19 on Twitch, 1 on Kick" },
  { stat: "2,150", label: "Viewer-hours", sub: "Estimated from reported gameplay and averages" },
  { stat: "202.8%", label: "Of benchmark", sub: "Against the 1,060 viewer-hour tier-floor benchmark" },
  { stat: "262", label: "Highest average", sub: "SOGAeon, with a 287-viewer peak" },
  { stat: "4h21", label: "Longest session", sub: "Paschoalin, Portuguese" },
];

const featured: { name: string; tier: string; lang: string; vod?: string; thumb?: string; href?: string; meta: string }[] = [
  {
    name: "SOGAeon",
    tier: "Gold",
    lang: "English",
    vod: "2868725155",
    meta: "262 average and a 287 peak across 2h00. 524 estimated viewer-hours, about a quarter of the campaign total, at 5.24 times the Gold audience floor.",
  },
  {
    name: "TheNoctis90",
    tier: "Gold",
    lang: "Spanish",
    vod: "2867974154",
    meta: "140 average and a 239 peak across 2h16. 317 estimated viewer-hours from a Spanish-language audience, 2.80 times the Gold floor.",
  },
  {
    name: "Paschoalin",
    tier: "Silver",
    lang: "Portuguese",
    thumb: `${M}/screenshot-6.webp`,
    href: SESSION_PASCHOALIN,
    meta: "4h21 of RIFTFALL, the longest verified session of the campaign: 117.5% more gameplay than the two-hour baseline.",
  },
];

const languages = [
  { name: "English", n: 9, pct: 45 },
  { name: "Portuguese", n: 6, pct: 30 },
  { name: "French", n: 2, pct: 10 },
  { name: "Spanish", n: 2, pct: 10 },
  { name: "Arabic", n: 1, pct: 5 },
];

const PARTNERED = [
  { name: "LoupScar", avg: 97 },
  { name: "J0SH", avg: 69 },
];

const platformSplit = [
  { n: 5, label: "Instagram posts" },
  { n: 3, label: "TikToks" },
  { n: 2, label: "YouTube Shorts" },
  { n: 2, label: "X posts" },
  { n: 1, label: "Reddit post" },
];

const topDrivers = [
  { name: "SOGAeon", tier: "Gold", avg: 262, dur: "2h00", vh: 524 },
  { name: "TheNoctis90", tier: "Gold", avg: 140, dur: "2h16", vh: 317 },
  { name: "LoupScar", tier: "Gold", avg: 97, dur: "2h00", vh: 194 },
  { name: "J0SH", tier: "Gold", avg: 69, dur: "2h00", vh: 138 },
  { name: "Shalalaka", tier: "Gold", avg: 56, dur: "2h25", vh: 135 },
  { name: "Genkaku", tier: "Gold", avg: 58, dur: "2h07", vh: 123 },
  { name: "HaouAnubis", tier: "Gold", avg: 50, dur: "2h14", vh: 112 },
  { name: "Foythtv", tier: "Silver", avg: 36, dur: "2h15", vh: 81 },
];

const overdelivery = [
  { name: "Paschoalin", tier: "Silver", delivered: "4h21", extra: "2h21" },
  { name: "Maveco", tier: "Silver", delivered: "2h30", extra: "0h30" },
  { name: "Shalalaka", tier: "Gold", delivered: "2h25", extra: "0h25" },
  { name: "LunariValkyrie", tier: "Silver", delivered: "2h20", extra: "0h20" },
  { name: "LordacrisPlays", tier: "Silver", delivered: "2h20", extra: "0h20" },
  { name: "TheNoctis90", tier: "Gold", delivered: "2h16", extra: "0h16" },
  { name: "Adwuin", tier: "Silver", delivered: "2h15", extra: "0h15" },
  { name: "Foythtv", tier: "Silver", delivered: "2h15", extra: "0h15" },
];

const floorLeaders = [
  { name: "SOGAeon", multiple: "5.24×" },
  { name: "TheNoctis90", multiple: "2.80×" },
  { name: "LoupScar", multiple: "1.94×" },
];

export default function RiftfallKpiPage({ searchParams }: Props) {
  if (!isUnlocked()) {
    return (
      <main className="rf-lock">
        <div className="rf-lock-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="rf-lock-art" src={`${M}/promo.webp`} alt="RIFTFALL" />
          <div className="rf-lock-eyebrow">
            <span className="rf-lock-dot" />
            StreamQuest KPI report
          </div>
          <h1>RIFTFALL demo campaign report</h1>
          <p>Enter the access code to view this client report.</p>
          <form action={signInAction} className="rf-lock-form">
            <input
              type="password"
              name="password"
              placeholder="Access code"
              aria-label="Access code"
              autoFocus
              required
              className="rf-lock-input"
            />
            <button type="submit" className="rf-lock-btn">Unlock report</button>
          </form>
          {searchParams.err && <p className="rf-lock-err">Wrong access code, try again.</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="cs-wrap rf-wrap">
      {/* Promo art from the mission brief drifts down both margins, behind everything. */}
      <MutantSwarm items={SWARM} />

      {/* =============== HERO =============== */}
      <section className="cs-hero">
        <div
          className="cs-hero-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url('${HERO_POSTER}')` }}
        >
          <video
            className="rf-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_POSTER}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        </div>
        <div className="cs-shell cs-hero-inner">
          <span className="cs-eyebrow">KPI Report · GameEra Studios</span>
          <h1>
            RIFTFALL demo campaign.{" "}
            <span className="grad">20 creators, five languages</span>.
          </h1>
          <p className="cs-hero-lead">
            StreamQuest ran a curated Twitch campaign for the free RIFTFALL demo. €2,000 activated
            20 creators across five languages, delivering 43h34 of reported Twitch gameplay and an
            estimated 2,150 viewer-hours at €0.93 per viewer-hour. The campaign started in English
            and then opened to other languages, bringing partnered Twitch streamers into the mix
            alongside smaller channels.
          </p>
        </div>
      </section>

      {/* =============== KPI STRIP =============== */}
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

      {/* =============== TL;DR =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div className="rf-tldr">
            <div className="rf-tldr-head">
              <h2>The short version.</h2>
              <span>Final results, 4 October 2026.</span>
            </div>
            <div className="rf-tldr-grid">
              {tldrTiles.map((t) => (
                <div key={t.label} className="rf-tldr-tile">
                  <div className="rf-tldr-stat">{t.stat}</div>
                  <div className="rf-tldr-label">{t.label}</div>
                  <div className="rf-tldr-sub">{t.sub}</div>
                </div>
              ))}
            </div>
            <ul className="rf-tldr-lines">
              <li>
                All 19 Twitch creators streamed at least two hours of RIFTFALL and 14 went beyond
                it: 43h34 against a 38-hour baseline, 5h34 or 14.6% more airtime.
              </li>
              <li>
                Every Twitch creator met their tier&rsquo;s audience floor and 16 of 19 exceeded
                it. Estimated viewer-hours came in at more than double the tier-floor benchmark.
              </li>
              <li>
                Opening the campaign beyond English broadened participation to five language
                communities, while partnered Twitch creators added higher-audience activations to
                the roster.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =============== EXECUTIVE SUMMARY =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div className="cs-split">
            <div>
              <span className="cs-tag">Executive summary</span>
              <h2>A two-hour demo brief, delivered above the line.</h2>
              <p>
                RIFTFALL is a fast retro FPS by GameEra Studios. Each creator streamed at least two
                hours of the free Steam demo live on Twitch, with three side quests on top:
                Wishlist Supporter for the tracked wishlist link, Co-op Companion for a co-op run
                with a friend, and Rift Social for a clip outside Twitch.
              </p>
              <p>
                Recruitment started with English-speaking creators and then opened to other
                languages. The final roster of 20 covered five language communities and paired
                partnered Twitch streamers with smaller channels, across Silver and Gold tiers.
              </p>
              <p>
                Every completed activation is in the creator log at the bottom of the page, with
                its VOD, audience, gameplay time, side quests and any social posts.
              </p>
            </div>
            <div className="cs-split-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${M}/loading-4.webp`} alt="RIFTFALL key art" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* =============== STANDOUT CREATORS =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 8 }}>
            <span className="cs-tag">Featured streams</span>
            <h2>Three streams that show the range of the roster.</h2>
            <p>
              The largest audience, the strongest non-English stream and the longest session.
              Every VOD and social post from the campaign is linked in the creator log further
              down.
            </p>
          </div>
          <div className="rf-vods">
            {featured.map((v) => {
              if (v.vod) {
                return (
                  <article key={v.name} className="rf-vod">
                    <div className="rf-vod-frame">
                      <iframe
                        src={twitchVod(v.vod)}
                        title={`${v.name} RIFTFALL VOD`}
                        loading="lazy"
                        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="rf-vod-meta">
                      <span className={`rf-tier-tag is-${v.tier.toLowerCase()}`}>
                        {v.tier} tier · {v.lang}
                      </span>
                      <h4>{v.name}</h4>
                      <p>{v.meta}</p>
                    </div>
                  </article>
                );
              }
              const inner = (
                <>
                  <div className="rf-vod-frame rf-vod-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={v.thumb} alt="" loading="lazy" />
                    {v.href && <span className="rf-vod-play">View session</span>}
                  </div>
                  <div className="rf-vod-meta">
                    <span className={`rf-tier-tag is-${v.tier.toLowerCase()}`}>
                      {v.tier} tier · {v.lang}
                    </span>
                    <h4>{v.name}</h4>
                    <p>{v.meta}</p>
                  </div>
                </>
              );
              return v.href ? (
                <a
                  key={v.name}
                  className="rf-vod rf-vod--link"
                  href={v.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <article key={v.name} className="rf-vod">
                  {inner}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =============== WHAT THE DELIVERY MEANS =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">What StreamQuest delivered</span>
            <h2>Depth per creator, and where the watch time came from.</h2>
            <p>
              The headline numbers are in the strip at the top. This is what they mean per
              creator, and how they compare with the tier floors.
            </p>
          </div>
          <div className="rf-stat-list">
            <div className="rf-stat-row">
              <span className="rf-stat-label">Gameplay per Twitch creator</span>
              <span className="rf-stat-num">2h18</span>
              <span className="rf-stat-note">Silver and Gold were scoped at two hours. 14 of 19 Twitch creators streamed longer, led by Paschoalin&rsquo;s 4h21.</span>
            </div>
            <div className="rf-stat-row">
              <span className="rf-stat-label">Weighted average audience</span>
              <span className="rf-stat-num">49.3</span>
              <span className="rf-stat-note">Concurrent viewers across all reported Twitch gameplay: viewer-hours divided by hours. Not a sum of creator averages.</span>
            </div>
            <div className="rf-stat-row">
              <span className="rf-stat-label">Gold share of watch time</span>
              <span className="rf-stat-num">72%</span>
              <span className="rf-stat-note">Seven Twitch Gold creators delivered 1,543 of the 2,150 estimated viewer-hours. SOGAeon alone delivered 524.</span>
            </div>
            <div className="rf-stat-row is-total">
              <span className="rf-stat-label">Viewer-hours against the benchmark</span>
              <span className="rf-stat-num">202.8%</span>
              <span className="rf-stat-note">2,149.8 estimated viewer-hours against a 1,060 tier-floor benchmark: Gold at 50 and Silver at 15 viewers, two hours each. A comparison point, not a contractual guarantee.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== AUDIENCE MIX =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div className="cs-split cs-split-reverse">
            <div className="cs-split-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${M}/loading-1.webp`} alt="RIFTFALL key art" loading="lazy" />
            </div>
            <div>
              <span className="cs-tag">Audience and community mix</span>
              <h2>Five language communities, 55% beyond English.</h2>
              <p>
                Stream language per completed creator. The campaign opened beyond English during
                recruitment, and 11 of the 20 creators streamed in Portuguese, French, Spanish or
                Arabic.
              </p>
              <div className="rf-langs">
                {languages.map((l) => (
                  <div key={l.name} className="rf-lang">
                    <span className="rf-lang-name">{l.name}</span>
                    <div className="rf-lang-track">
                      <div className="rf-lang-fill" style={{ width: `${l.pct}%` }} />
                    </div>
                    <span className="rf-lang-val">
                      {l.n} <small>{l.pct}%</small>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rf-stat-list" style={{ marginTop: 34 }}>
            <div className="rf-stat-row">
              <span className="rf-stat-label">Portuguese and Spanish watch time</span>
              <span className="rf-stat-num">41%</span>
              <span className="rf-stat-note">886 of the 2,150 estimated viewer-hours came from Portuguese and Spanish streams, led by TheNoctis90.</span>
            </div>
            <div className="rf-stat-row">
              <span className="rf-stat-label">Partnered Twitch creators</span>
              <span className="rf-stat-num">97 · 69</span>
              <span className="rf-stat-note">The roster included partnered creators such as LoupScar and J0SH, with campaign averages of 97 and 69 viewers.</span>
            </div>
            <div className="rf-stat-row is-muted">
              <span className="rf-stat-label">What language means here</span>
              <span className="rf-stat-num">Stream</span>
              <span className="rf-stat-note">Language is the stream language. Viewer countries and regional reach were not measured.</span>
            </div>
          </div>
          <div className="rf-partners">
            {PARTNERED.map((p) => (
              <span key={p.name} className="rf-partner-chip">
                {p.name} · {p.avg} avg
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =============== SIDE QUESTS =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Side quests and creator content</span>
            <h2>19 of 20 pushed the wishlist.</h2>
            <p>The three side quests from the mission brief, tracked per creator.</p>
          </div>
          <div className="rf-stat-list">
            <div className="rf-stat-row is-total">
              <span className="rf-stat-label">Wishlist Supporter</span>
              <span className="rf-stat-num">19 / 20</span>
              <span className="rf-stat-note">The tracked wishlist link and call to action. This records creator activity, not a count of wishlists or a conversion lift.</span>
            </div>
            <div className="rf-stat-row">
              <span className="rf-stat-label">Co-op Companion</span>
              <span className="rf-stat-num">11 / 20</span>
              <span className="rf-stat-note">Creators who pulled a friend into an online co-op run on stream.</span>
            </div>
            <div className="rf-stat-row">
              <span className="rf-stat-label">Off-platform social proof</span>
              <span className="rf-stat-num">13 links</span>
              <span className="rf-stat-note">11 creators supplied 13 links to clips and posts outside Twitch. Counted as submitted links, not impressions.</span>
            </div>
            <div className="rf-stat-row is-muted">
              <span className="rf-stat-label">Creator payment completion</span>
              <span className="rf-stat-num">20 / 20</span>
              <span className="rf-stat-note">Every completed creator marked paid.</span>
            </div>
          </div>
          <div className="rf-split" aria-label="Platform split of the 13 posts">
            {platformSplit.map((p) => (
              <span key={p.label} className="rf-split-chip">
                <strong>{p.n}</strong> {p.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =============== SOCIAL HIGHLIGHTS =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 8 }}>
            <span className="cs-tag">Social highlights</span>
            <h2>Clips that outlive the stream.</h2>
            <p>
              A selection of the 13 posts creators published outside Twitch. They stay online
              after the campaign window closes.
            </p>
          </div>

          <div className="rf-social-grid">
            <article className="rf-social">
              <div className="rf-social-frame">
                <iframe
                  src="https://www.tiktok.com/embed/v2/7684642814164061460"
                  title="Shalalaka RIFTFALL TikTok"
                  loading="lazy"
                  allow="encrypted-media"
                  allowFullScreen
                />
              </div>
              <div className="rf-social-meta">
                <span className="rf-social-platform is-tt">TikTok</span>
                <h4 className="rf-social-handle">Shalalaka</h4>
                <p className="rf-social-caption">
                  Portuguese-language Gold creator. A killstreak from the demo, cut for TikTok.
                </p>
                <a
                  className="rf-social-link"
                  href="https://www.tiktok.com/@shalalakacidade/video/7684642814164061460"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open on TikTok →
                </a>
              </div>
            </article>

            <article className="rf-social">
              <div className="rf-social-frame">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/W67q-bhEe5k?rel=0&modestbranding=1"
                  title="IgorBay0 RIFTFALL YouTube Short"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="rf-social-meta">
                <span className="rf-social-platform is-yt">YouTube Shorts</span>
                <h4 className="rf-social-handle">IgorBay0</h4>
                <p className="rf-social-caption">
                  Portuguese-language Silver creator. A Short pulled from the RIFTFALL stream.
                </p>
                <a
                  className="rf-social-link"
                  href="https://www.youtube.com/shorts/W67q-bhEe5k"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open on YouTube →
                </a>
              </div>
            </article>

            <article className="rf-social">
              <div className="rf-social-frame">
                <iframe
                  src="https://www.tiktok.com/embed/v2/7682690424112237838"
                  title="LunariValkyrie RIFTFALL TikTok"
                  loading="lazy"
                  allow="encrypted-media"
                  allowFullScreen
                />
              </div>
              <div className="rf-social-meta">
                <span className="rf-social-platform is-tt">TikTok</span>
                <h4 className="rf-social-handle">LunariValkyrie</h4>
                <p className="rf-social-caption">
                  English-language Silver creator, who also completed Co-op Companion and
                  Wishlist Supporter.
                </p>
                <a
                  className="rf-social-link"
                  href="https://www.tiktok.com/@lunarivalkyrie/video/7682690424112237838"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open on TikTok →
                </a>
              </div>
            </article>
          </div>

          <div className="rf-social-cards">
            <article className="rf-social-card">
              <span className="rf-social-platform is-x">X</span>
              <div className="rf-social-stat">262 avg</div>
              <h4>SOGAeon</h4>
              <p>The campaign&rsquo;s largest stream, followed up with a post on X.</p>
              <a
                className="rf-social-link"
                href="https://x.com/SOGAeon/status/2097352459043971552"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on X →
              </a>
            </article>
            <article className="rf-social-card">
              <span className="rf-social-platform is-rd">Reddit</span>
              <div className="rf-social-stat">r/JempGames</div>
              <h4>JempLFG</h4>
              <p>&ldquo;Let&rsquo;s support RIFTFALL&rdquo;, posted to the creator&rsquo;s own community subreddit.</p>
              <a
                className="rf-social-link"
                href="https://www.reddit.com/r/JempGames/comments/1wqf53d/lets_support_riftfall/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on Reddit →
              </a>
            </article>
            <article className="rf-social-card">
              <span className="rf-social-platform is-ig">Instagram</span>
              <div className="rf-social-stat">3 platforms</div>
              <h4>MarianaAr32</h4>
              <p>One clip, posted to Instagram, TikTok and YouTube Shorts for an Arabic-speaking audience.</p>
              <a
                className="rf-social-link"
                href="https://www.instagram.com/reel/Dc3lQaSIIFx/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on Instagram →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* =============== TOP VIEWER-HOUR DRIVERS =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 28 }}>
            <span className="cs-tag">Top viewer-hour drivers</span>
            <h2>Where the watch time concentrated.</h2>
            <p>
              SOGAeon alone delivered 524 estimated viewer-hours, about a quarter of the total. The
              seven Twitch Gold creators together produced 72%.
            </p>
          </div>
          <div className="rf-top">
            {topDrivers.map((c, i) => (
              <div key={`${c.name}-${i}`} className="rf-top-row">
                <span className="rf-top-rank">#{i + 1}</span>
                <span className="rf-top-name">{c.name}</span>
                <span className="rf-top-cell">{c.avg} avg · {c.tier}</span>
                <span className="rf-top-cell">{c.dur} gameplay</span>
                <span className="rf-top-val">{c.vh} vh</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== OVERDELIVERY =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Overdelivery</span>
            <h2>43h34 delivered against a 38-hour baseline.</h2>
            <p>
              Silver and Gold creators were scoped at two hours. All 19 Twitch creators reached it
              and 14 went beyond, adding 5h34 of airtime. On audience, every Twitch creator met
              their tier&rsquo;s floor and 16 exceeded it.
            </p>
          </div>
          <div className="rf-top">
            {overdelivery.map((c, i) => (
              <div key={`${c.name}-${i}`} className="rf-top-row">
                <span className="rf-top-rank">#{i + 1}</span>
                <span className="rf-top-name">{c.name}</span>
                <span className="rf-top-cell">{c.delivered} delivered · {c.tier}</span>
                <span className="rf-top-cell">2h00 baseline</span>
                <span className="rf-top-val">+{c.extra}</span>
              </div>
            ))}
          </div>
          <div className="rf-split" aria-label="Highest averages against the tier floor">
            {floorLeaders.map((f) => (
              <span key={f.name} className="rf-split-chip">
                <strong>{f.multiple}</strong> {f.name}, against the Gold floor
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =============== INVESTMENT =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Investment</span>
            <h2>€2,000 campaign investment, €0.93 per estimated viewer-hour.</h2>
            <p>
              Calculated as the €2,000 campaign investment divided by 2,149.8 estimated Twitch
              viewer-hours. Viewer-hours are estimated watch time, not unique viewers or
              impressions.
            </p>
          </div>
          <div className="rf-stat-list">
            <div className="rf-stat-row is-total">
              <span className="rf-stat-label">Cost per estimated viewer-hour</span>
              <span className="rf-stat-num">€0.93</span>
              <span className="rf-stat-note">€2,000 over 2,149.8 estimated viewer-hours.</span>
            </div>
            <div className="rf-stat-row">
              <span className="rf-stat-label">Gross cost per activation</span>
              <span className="rf-stat-num">€100</span>
              <span className="rf-stat-note">€2,000 across 20 completed activations.</span>
            </div>
            <div className="rf-stat-row">
              <span className="rf-stat-label">Silver completions · 12 × €50</span>
              <span className="rf-stat-num">€600</span>
              <span className="rf-stat-note">Creator-tier value at the client-facing Silver rate.</span>
            </div>
            <div className="rf-stat-row">
              <span className="rf-stat-label">Gold completions · 8 × €100</span>
              <span className="rf-stat-num">€800</span>
              <span className="rf-stat-note">Creator-tier value at the client-facing Gold rate.</span>
            </div>
            <div className="rf-stat-row">
              <span className="rf-stat-label">Creator-tier value</span>
              <span className="rf-stat-num">€1,400</span>
              <span className="rf-stat-note">The tier component at client-facing rates. Not the total investment, and not a statement of payments to creators.</span>
            </div>
            <div className="rf-stat-row is-total">
              <span className="rf-stat-label">Total campaign investment</span>
              <span className="rf-stat-num">€2,000</span>
              <span className="rf-stat-note">The figure behind every efficiency calculation in this report.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== CINEMATIC BAND =============== */}
      <section className="rf-band" aria-label="RIFTFALL key art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="rf-band-img" src={`${M}/key-art-horizontal.webp`} alt="" loading="lazy" />
        <div className="rf-band-veil" aria-hidden="true" />
        <div className="cs-shell rf-band-inner">
          <span className="rf-band-eyebrow">The full log</span>
          <h2>20 creators, five languages.</h2>
          <p>
            Every completed activation with tier, platform, language, audience, gameplay time,
            estimated viewer-hours, and links to every VOD and social post submitted.
          </p>
        </div>
      </section>

      {/* =============== FULL CREATOR TABLE =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 24 }}>
            <span className="cs-tag">Ordered creator log</span>
            <h2>All 20 completed activations.</h2>
            <p>
              Filter by tier, language or platform, and sort by any performance column. Vs floor
              is the campaign average divided by the tier&rsquo;s audience floor: 50 viewers for
              Gold, 15 for Silver.
            </p>
          </div>
        </div>
        {/* Widened out of the content shell so every column fits on desktop without sideways scrolling. */}
        <div className="rf-log-wrap">
          <CreatorTable />
        </div>
      </section>

      {/* =============== SOURCES AND METHOD =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">Sources and method</span>
            <h2>How the numbers were built.</h2>
            <ul className="cs-list">
              <li>Viewer-hours are each Twitch creator&rsquo;s final campaign average viewers multiplied by their reported RIFTFALL hours. An estimate of watch time, not unique viewers, impressions or deduplicated reach.</li>
              <li>Cost per viewer-hour is €2,000 divided by 2,149.8 viewer-hours: €0.9303, rounded to €0.93.</li>
              <li>The tier-floor benchmark is 7 Twitch Gold creators at 50 viewers plus 12 Silver creators at 15 viewers, two hours each: 1,060 viewer-hours. A comparison point, not a contractual delivery guarantee.</li>
              <li>The 49.3 weighted average is viewer-hours divided by gameplay hours. Creator averages and peaks are not summed into a reach or simultaneous-audience figure, because the streams ran at different times.</li>
              <li>MarianaAr32&rsquo;s 4h31 Kick stream lacks confirmed RIFTFALL attribution. It stays in the roster, language mix and tier totals but is left out of the headline gameplay, viewer-hours and cost per viewer-hour.</li>
              <li>The completion list holds 18 direct Twitch VOD links, one Twitch tracker-only entry (LoupScar) and one Kick VOD. GoKatGo&rsquo;s tracker link is profile-level, so that aggregate is reported as supplied.</li>
              <li>Wishlist Supporter records creator activity; it does not establish a number of wishlists or a measured conversion lift. Social totals count submitted links, not impressions.</li>
            </ul>
          </div>
          <div className="rf-sources">
            <a className="rf-source" href="/quests/riftfall" target="_blank" rel="noopener noreferrer">Mission brief</a>
            <a className="rf-source" href={SESSION_PASCHOALIN} target="_blank" rel="noopener noreferrer">Paschoalin&rsquo;s session on TwitchTracker</a>
            <a className="rf-source" href="https://store.steampowered.com/app/4965490/RIFTFALL/" target="_blank" rel="noopener noreferrer">RIFTFALL on Steam</a>
          </div>
          <div className="rf-foot">
            <span>Prepared by StreamQuest for GameEra Studios · Final results, 4 October 2026 · Confidential</span>
            <form action={signOutAction}>
              <button type="submit" className="rf-foot-signout">Sign out</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
