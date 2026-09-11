import type { Metadata } from "next";
import type { QuestSwarmItem } from "@/data/quests";
import MutantSwarm from "@/app/components/MutantSwarm";
import { isUnlocked } from "./session";
import { signInAction, signOutAction } from "./actions";
import CreatorTable from "./CreatorTable";
import "@/app/redesign.css";
import "@/app/case-studies/case-studies.css";
import "./gzh.css";

export const metadata: Metadata = {
  title: "Ground Zero Hero Creator Campaign KPI Report | StreamQuest",
  description: "Client-facing StreamQuest KPI report for the Ground Zero Hero launch activation.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { searchParams: { err?: string } };

const M = "/media/ground-zero-hero";
const HERO_POSTER = `${M}/chaos-poster.webp`;
const HERO_VIDEO = `${M}/chaos.mp4`;

const WORKBOOK =
  "https://docs.google.com/spreadsheets/d/1Zsyqlxz0DWRvczs0W0nsDyRbJ_WaQDJwDYdjmJjw0eI/edit?gid=569902293#gid=569902293";

/* Twitch player needs every host it will render on listed as a parent. */
const TWITCH_PARENTS = ["streamquest.io", "www.streamquest.io", "localhost", "127.0.0.1"];
const twitchVod = (id: string, time?: string) =>
  `https://player.twitch.tv/?video=${id}&${TWITCH_PARENTS.map((p) => `parent=${p}`).join("&")}` +
  `&autoplay=false&muted=true${time ? `&time=${time}` : ""}`;

/* Mutant cutouts from the mission brief, drifting down both margins behind the report. */
const SWARM: QuestSwarmItem[] = [
  { src: `${M}/characters/hero.webp`, x: 78, y: 6, size: 190, depth: 0.9 },
  { src: `${M}/characters/croc.webp`, x: 4, y: 13, size: 166, depth: 0.75 },
  { src: `${M}/characters/flyboss.webp`, x: 80, y: 21, size: 156, depth: 0.7, flip: true },
  { src: `${M}/characters/skeleton.webp`, x: 5, y: 29, size: 128, depth: 0.6 },
  { src: `${M}/characters/yeti.webp`, x: 81, y: 37, size: 146, depth: 0.65 },
  { src: `${M}/characters/bear.webp`, x: 4, y: 45, size: 152, depth: 0.7, flip: true },
  { src: `${M}/characters/alien.webp`, x: 82, y: 53, size: 136, depth: 0.55 },
  { src: `${M}/characters/slug.webp`, x: 5, y: 61, size: 140, depth: 0.6 },
  { src: `${M}/characters/snail.webp`, x: 82, y: 69, size: 128, depth: 0.5 },
  { src: `${M}/characters/chicken.webp`, x: 5, y: 77, size: 118, depth: 0.45 },
  { src: `${M}/characters/bloaty.webp`, x: 83, y: 85, size: 122, depth: 0.5, flip: true },
  { src: `${M}/characters/pinata.webp`, x: 6, y: 92, size: 110, depth: 0.4 },
];

const kpis = [
  { num: "27", lbl: "Completed creators" },
  { num: "71.9h", lbl: "Live coverage" },
  { num: "2,510", lbl: "Est. viewer-hours" },
  { num: "34.9", lbl: "Weighted avg viewers" },
  { num: "22 / 27", lbl: "Launch-window streams" },
  { num: "16", lbl: "Social posts delivered" },
];

const tldrTiles = [
  { stat: "27", label: "Creators", sub: "5 Bronze, 18 Silver, 4 Gold" },
  { stat: "71.9h", label: "Live coverage", sub: "71h 53m of Ground Zero Hero streamed" },
  { stat: "2,510", label: "Viewer-hours", sub: "Estimated from logged hours and averages" },
  { stat: "179", label: "Peak viewers", sub: "SOGAeon, highest single stream" },
  { stat: "22 / 27", label: "Launch window", sub: "Streamed on 20 or 21 August" },
  { stat: "7", label: "Languages", sub: "English led at 51.9%" },
];

const featuredVods = [
  {
    name: "SOGAeon",
    id: "2858477009",
    tier: "Gold",
    meta: "179 peak, 138 average, 3h36 streamed. 497 viewer-hours, the largest single contribution in the campaign.",
  },
  {
    name: "J0SH",
    id: "2852763452",
    tier: "Gold",
    meta: "121 peak, 112 average across 2h30 on launch day. Also cut a YouTube Short from the session.",
  },
  {
    name: "GirlWhoPlays",
    id: "2851945966",
    time: "1h03m13s",
    tier: "Silver",
    meta: "86 peak, 70 average over 2h35, streaming Ground Zero Hero to a Spanish-language audience.",
  },
];

const languages = [
  { name: "English", n: 14, pct: 51.9 },
  { name: "French", n: 7, pct: 25.9 },
  { name: "Spanish", n: 2, pct: 7.4 },
  { name: "Arabic", n: 1, pct: 3.7 },
  { name: "German", n: 1, pct: 3.7 },
  { name: "Portuguese", n: 1, pct: 3.7 },
  { name: "Romanian", n: 1, pct: 3.7 },
];

const topDrivers = [
  { name: "SOGAeon", tier: "Gold", avg: 138, dur: "3.6h", vh: 497 },
  { name: "J0SH", tier: "Gold", avg: 112, dur: "2.5h", vh: 280 },
  { name: "saremugames", tier: "Gold", avg: 50, dur: "3.8h", vh: 192 },
  { name: "GirlWhoPlays", tier: "Silver", avg: 70, dur: "2.6h", vh: 181 },
  { name: "fleapuff", tier: "Gold", avg: 57, dur: "2.3h", vh: 128 },
  { name: "azano__", tier: "Silver", avg: 47, dur: "2.6h", vh: 121 },
  { name: "MarianaAr32", tier: "Silver", avg: 26, dur: "4.6h", vh: 121 },
  { name: "Foythtv", tier: "Silver", avg: 55, dur: "2.1h", vh: 114 },
];

const overdelivery = [
  { name: "MarianaAr32", tier: "Silver", delivered: "4.6h", baseline: "2.0h", extra: "2.6h" },
  { name: "iowacountry21", tier: "Bronze", delivered: "3.6h", baseline: "1.0h", extra: "2.6h" },
  { name: "LordacrisPlays", tier: "Silver", delivered: "3.9h", baseline: "2.0h", extra: "1.9h" },
  { name: "saremugames", tier: "Gold", delivered: "3.8h", baseline: "2.0h", extra: "1.8h" },
  { name: "SOGAeon", tier: "Gold", delivered: "3.6h", baseline: "2.0h", extra: "1.6h" },
  { name: "ShockAndAwh", tier: "Bronze", delivered: "2.4h", baseline: "1.0h", extra: "1.4h" },
  { name: "Phenexa", tier: "Silver", delivered: "3.3h", baseline: "2.0h", extra: "1.3h" },
  { name: "Toky", tier: "Bronze", delivered: "2.0h", baseline: "1.0h", extra: "1.0h" },
];

const contextCards = [
  {
    num: "608",
    lbl: "Twitch category peak viewers",
    src: "20 August, 17:00 UTC. Streams Charts.",
    href: "https://streamscharts.com/games/ground-zero-hero/statistics",
  },
  {
    num: "12",
    lbl: "Concurrent Ground Zero Hero channels",
    src: "20 August, 19:30 UTC. Streams Charts.",
    href: "https://streamscharts.com/games/ground-zero-hero/statistics",
  },
  {
    num: "20 Aug",
    lbl: "Full Steam release, 12:36 UTC",
    src: "SteamDB release record.",
    href: "https://steamdb.info/app/2570580/charts/",
  },
  {
    num: "74",
    lbl: "Steam concurrent-player peak",
    src: "22 August, all-time. SteamDB.",
    href: "https://steamdb.info/app/2570580/charts/",
  },
  {
    num: "76.8%",
    lbl: "Positive Steam reviews, Very Positive",
    src: "58 reviews at the 7 September snapshot. SteamDB.",
    href: "https://steamdb.info/app/2570580/charts/",
  },
  {
    num: "499",
    lbl: "Steam store followers",
    src: "7 September snapshot. SteamDB.",
    href: "https://steamdb.info/app/2570580/charts/",
  },
];

export default function GroundZeroHeroKpiPage({ searchParams }: Props) {
  if (!isUnlocked()) {
    return (
      <main className="gzh-lock">
        <div className="gzh-lock-card">
          <div className="gzh-lock-eyebrow">
            <span className="gzh-lock-dot" />
            StreamQuest KPI report
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="gzh-lock-logo" src={`${M}/logo.webp`} alt="Ground Zero Hero" />
          <h1>Launch activation report</h1>
          <p>Enter the access code to view this client report.</p>
          <form action={signInAction} className="gzh-lock-form">
            <input
              type="password"
              name="password"
              placeholder="Access code"
              autoFocus
              required
              className="gzh-lock-input"
            />
            <button type="submit" className="gzh-lock-btn">Unlock report</button>
          </form>
          {searchParams.err && (
            <p className="gzh-lock-err">Wrong access code, try again.</p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="cs-wrap gzh-wrap">
      {/* Mutants from the mission brief drift down both margins, behind everything. */}
      <MutantSwarm items={SWARM} />

      {/* =============== HERO =============== */}
      <section className="cs-hero">
        <div
          className="cs-hero-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url('${HERO_POSTER}')` }}
        >
          <video
            className="gzh-hero-video"
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
          <span className="cs-eyebrow">KPI Report · Acclaim</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="gzh-hero-logo" src={`${M}/logo.webp`} alt="Ground Zero Hero" />
          <h1>
            Ground Zero Hero launch activation.{" "}
            <span className="grad">27 creators, one release beat</span>.
          </h1>
          <p className="cs-hero-lead">
            StreamQuest ran a curated creator activation around the 20 to 21 August Steam release
            of Ground Zero Hero. 27 creators completed, logging 71.9 hours of live coverage and an
            estimated 2,510 viewer-hours at a weighted average of 34.9 concurrent viewers. 22 of
            the 27 streamed inside the launch window, every creator pushed the tracked wishlist
            link, and 14 creators delivered 16 social posts across seven language communities.
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
          <div className="gzh-tldr">
            <div className="gzh-tldr-head">
              <h2>The short version.</h2>
              <span>Reporting cut 10 September 2026, data reconciled through 7 September.</span>
            </div>
            <div className="gzh-tldr-grid">
              {tldrTiles.map((t) => (
                <div key={t.label} className="gzh-tldr-tile">
                  <div className="gzh-tldr-stat">{t.stat}</div>
                  <div className="gzh-tldr-label">{t.label}</div>
                  <div className="gzh-tldr-sub">{t.sub}</div>
                </div>
              ))}
            </div>
            <ul className="gzh-tldr-lines">
              <li>
                Every creator completed the wishlist side quest. 16 social posts from 14 creators
                carried the campaign beyond Twitch, onto X, TikTok, Instagram, YouTube Shorts and
                Reddit.
              </li>
              <li>
                The roster delivered 22.9 hours more than the tiers required, 47% above the 49.0
                hour baseline. 8 creators streamed at least a full extra hour.
              </li>
              <li>
                The Ground Zero Hero Twitch category peaked at 608 viewers with 12 channels live at
                once on launch day, per Streams Charts. That is launch context, not a number
                StreamQuest claims credit for.
              </li>
              <li className="is-caveat">
                Not claimed in this report: unique reach, link clicks, confirmed Steam wishlists,
                or a causal Steam lift. The data set does not support those numbers, so they are
                not presented as outcomes.
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
              <h2>A concentrated launch beat, delivered in full and then some.</h2>
              <p>
                Ground Zero Hero is a bullet-heaven roguelite by Acclaim and Rowan Edmondson. The
                activation was built to land creator coverage on and around the 20 August Steam
                release, distribute the tracked wishlist link, and give Acclaim a set of native
                social assets to reuse. All 27 creator submissions were verified and reconciled
                against TwitchTracker through 7 September.
              </p>
              <p>
                The roster paired a Gold layer of higher-reach channels with a broad Silver and
                Bronze base. English creators made up just over half of the cohort, French was the
                second-largest group, and Spanish, Arabic, German, Portuguese and Romanian creators
                widened the footprint.
              </p>
              <h3>Highlights</h3>
              <ul className="cs-list">
                <li>27 completed creators: 5 Bronze, 18 Silver, 4 Gold</li>
                <li>71.9 hours of live Ground Zero Hero coverage, 22.9 hours above the tier baseline</li>
                <li>An estimated 2,510 viewer-hours at a weighted average of 34.9 concurrent viewers</li>
                <li>22 of 27 creators streamed inside the 20 to 21 August launch window</li>
                <li>27 of 27 wishlist side quests completed, 16 social posts from 14 creators</li>
                <li>Seven language communities, with English at 51.9% of the roster</li>
              </ul>
            </div>
            <div className="cs-split-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${M}/screenshot-1.webp`} alt="Ground Zero Hero gameplay" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* =============== FEATURED STREAMS =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 8 }}>
            <span className="cs-tag">Featured streams</span>
            <h2>Three VODs that show the range of the roster.</h2>
            <p>
              The two biggest Gold streams and the strongest non-English activation. Every VOD
              from the campaign is linked in the creator log further down.
            </p>
          </div>
          <div className="gzh-vods">
            {featuredVods.map((v) => (
              <article key={v.name} className="gzh-vod">
                <div className="gzh-vod-frame">
                  <iframe
                    src={twitchVod(v.id, v.time)}
                    title={`${v.name} Ground Zero Hero VOD`}
                    loading="lazy"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="gzh-vod-meta">
                  <span className={`gzh-tier-tag is-${v.tier.toLowerCase()}`}>{v.tier} tier</span>
                  <h4>{v.name}</h4>
                  <p>{v.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== DELIVERY KPIs =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">What StreamQuest delivered</span>
            <h2>27 verified activations, 71.9 hours live.</h2>
            <p>
              Headline delivery across the completed roster. Stream-hour and viewer-hour figures
              come from the creator rows in the completion workbook and describe tracked Ground
              Zero Hero programming. They are not unique viewers, impressions, or a single
              simultaneous campaign peak.
            </p>
          </div>
          <div className="gzh-stat-list">
            <div className="gzh-stat-row is-total">
              <span className="gzh-stat-label">Completed creators</span>
              <span className="gzh-stat-num">27</span>
              <span className="gzh-stat-note">5 Bronze, 18 Silver and 4 Gold, all verified and paid.</span>
            </div>
            <div className="gzh-stat-row">
              <span className="gzh-stat-label">Live coverage</span>
              <span className="gzh-stat-num">71.9h</span>
              <span className="gzh-stat-note">71 hours 53 minutes of tracked Ground Zero Hero stream time across 28 streams.</span>
            </div>
            <div className="gzh-stat-row">
              <span className="gzh-stat-label">Estimated viewer-hours</span>
              <span className="gzh-stat-num">2,510</span>
              <span className="gzh-stat-note">Each creator&rsquo;s logged hours multiplied by their average viewers. Watch time, not unique reach.</span>
            </div>
            <div className="gzh-stat-row">
              <span className="gzh-stat-label">Weighted average viewers</span>
              <span className="gzh-stat-num">34.9</span>
              <span className="gzh-stat-note">Duration-weighted across all 71.9 logged hours.</span>
            </div>
            <div className="gzh-stat-row">
              <span className="gzh-stat-label">Highest stream peak</span>
              <span className="gzh-stat-num">179</span>
              <span className="gzh-stat-note">SOGAeon, Gold tier. Individual peaks are not summed into a campaign peak because the streams ran at different times.</span>
            </div>
            <div className="gzh-stat-row">
              <span className="gzh-stat-label">Launch-window streams</span>
              <span className="gzh-stat-num">22 / 27</span>
              <span className="gzh-stat-note">81.5% of the roster streamed on 20 or 21 August.</span>
            </div>
            <div className="gzh-stat-row">
              <span className="gzh-stat-label">Wishlist push</span>
              <span className="gzh-stat-num">27 / 27</span>
              <span className="gzh-stat-note">Every creator distributed the tracked wishlist call to action.</span>
            </div>
            <div className="gzh-stat-row">
              <span className="gzh-stat-label">Social posts delivered</span>
              <span className="gzh-stat-num">16</span>
              <span className="gzh-stat-note">From 14 creators, across X, TikTok, Instagram, YouTube Shorts and Reddit.</span>
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
              <img src={`${M}/screenshot-3.webp`} alt="Ground Zero Hero gameplay" loading="lazy" />
            </div>
            <div>
              <span className="cs-tag">Audience and community mix</span>
              <h2>Seven language communities, English out front.</h2>
              <p>
                Stream language per completed creator. English carried the majority, French was a
                strong second, and five further languages each added a community the campaign
                would not otherwise have reached.
              </p>
              <div className="gzh-langs">
                {languages.map((l) => (
                  <div key={l.name} className="gzh-lang">
                    <span className="gzh-lang-name">{l.name}</span>
                    <div className="gzh-lang-track">
                      <div className="gzh-lang-fill" style={{ width: `${l.pct}%` }} />
                    </div>
                    <span className="gzh-lang-val">
                      {l.n} <small>{l.pct}%</small>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="gzh-stat-list" style={{ marginTop: 34 }}>
            <div className="gzh-stat-row">
              <span className="gzh-stat-label">Combined Twitch following</span>
              <span className="gzh-stat-num">120,935</span>
              <span className="gzh-stat-note">Across the 26 populated follower fields. Not deduplicated, and audience overlap is unknown, so read it as potential audience rather than reach.</span>
            </div>
            <div className="gzh-stat-row">
              <span className="gzh-stat-label">Twitch global top 1%</span>
              <span className="gzh-stat-num">11+ / 27</span>
              <span className="gzh-stat-note">At least 40.7% of the roster sits inside the global top 1% by TwitchTracker&rsquo;s source-time ranking. A curation-quality signal, not evidence of rank movement during the campaign.</span>
            </div>
            <div className="gzh-stat-row is-muted">
              <span className="gzh-stat-label">Confirmed Partner status</span>
              <span className="gzh-stat-num">1+</span>
              <span className="gzh-stat-note">Explicitly recorded for MarianaAr32. Partner status was not captured consistently this round, so one is a floor, not a count.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== SIDE QUESTS =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Side quests and creator content</span>
            <h2>Every creator pushed the wishlist. Most hit launch day.</h2>
            <p>
              The three optional side quests from the mission brief, tracked per creator.
              Completion is evidence of creator action, not proof of a Steam wishlist or a
              conversion.
            </p>
          </div>
          <div className="gzh-stat-list">
            <div className="gzh-stat-row is-total">
              <span className="gzh-stat-label">Wishlist Transmission</span>
              <span className="gzh-stat-num">27 / 27</span>
              <span className="gzh-stat-note">Tracked wishlist CTA distributed on every stream.</span>
            </div>
            <div className="gzh-stat-row">
              <span className="gzh-stat-label">Launch Window Deployment</span>
              <span className="gzh-stat-num">22 / 27</span>
              <span className="gzh-stat-note">Creator activity concentrated on 20 and 21 August, giving Acclaim a coordinated release beat.</span>
            </div>
            <div className="gzh-stat-row">
              <span className="gzh-stat-label">Social Mutation Report</span>
              <span className="gzh-stat-num">16 posts</span>
              <span className="gzh-stat-note">14 creators published native posts or clips. MarianaAr32 alone posted to YouTube, TikTok and Instagram.</span>
            </div>
            <div className="gzh-stat-row is-muted">
              <span className="gzh-stat-label">Known public views</span>
              <span className="gzh-stat-num">2.9K+</span>
              <span className="gzh-stat-note">Two measured posts: UmbritaC&rsquo;s giveaway post at 2.2K and Toky&rsquo;s X post at 739. The other 14 posts have no captured analytics yet, so the real total is higher.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== SOCIAL HIGHLIGHTS =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 8 }}>
            <span className="cs-tag">Social highlights</span>
            <h2>Native clips that outlive the stream.</h2>
            <p>
              A selection of the 16 posts creators published outside Twitch. All of them stay
              online and reusable for Acclaim after the campaign window closes.
            </p>
          </div>

          <div className="gzh-social-grid">
            <article className="gzh-social">
              <div className="gzh-social-frame">
                <iframe
                  src="https://www.instagram.com/p/DcRmrewOQSr/embed"
                  title="saremugames Ground Zero Hero reel on Instagram"
                  loading="lazy"
                  allow="encrypted-media"
                  scrolling="no"
                  allowFullScreen
                />
              </div>
              <div className="gzh-social-meta">
                <span className="gzh-social-platform is-ig">Instagram</span>
                <h4 className="gzh-social-handle">saremugames</h4>
                <p className="gzh-social-caption">
                  Gold tier, 192 viewer-hours on Twitch, then a reel cut from the run for
                  Instagram.
                </p>
                <a
                  className="gzh-social-link"
                  href="https://www.instagram.com/reel/DcRmrewOQSr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open on Instagram →
                </a>
              </div>
            </article>

            <article className="gzh-social">
              <div className="gzh-social-frame">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/CnsR5owtnwk?rel=0&modestbranding=1"
                  title="J0SH Ground Zero Hero YouTube Short"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="gzh-social-meta">
                <span className="gzh-social-platform is-yt">YouTube Shorts</span>
                <h4 className="gzh-social-handle">J0SH</h4>
                <p className="gzh-social-caption">
                  Gold tier, 121 peak viewers on launch day. A Short pulled from the same
                  session.
                </p>
                <a
                  className="gzh-social-link"
                  href="https://www.youtube.com/shorts/CnsR5owtnwk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open on YouTube →
                </a>
              </div>
            </article>

            <article className="gzh-social">
              <div className="gzh-social-frame">
                <iframe
                  src="https://www.tiktok.com/embed/v2/7676629531893026081"
                  title="EnguyTV Ground Zero Hero TikTok"
                  loading="lazy"
                  allow="encrypted-media"
                  allowFullScreen
                />
              </div>
              <div className="gzh-social-meta">
                <span className="gzh-social-platform is-tt">TikTok</span>
                <h4 className="gzh-social-handle">EnguyTV</h4>
                <p className="gzh-social-caption">
                  French-language Silver creator, 34 peak. Ground Zero Hero clipped for a TikTok
                  audience.
                </p>
                <a
                  className="gzh-social-link"
                  href="https://www.tiktok.com/@enguyclip/video/7676629531893026081"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open on TikTok →
                </a>
              </div>
            </article>
          </div>

          <div className="gzh-social-cards">
            <article className="gzh-social-card">
              <span className="gzh-social-platform is-x">X</span>
              <div className="gzh-social-stat">2.2K views</div>
              <h4>UmbritaC</h4>
              <p>
                Romanian creator who ran a giveaway around the stream. The most-viewed social post
                measured in the campaign.
              </p>
              <a
                className="gzh-social-link"
                href="https://x.com/UmbritaC/status/2089625848252961086"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on X →
              </a>
            </article>
            <article className="gzh-social-card">
              <span className="gzh-social-platform is-x">X</span>
              <div className="gzh-social-stat">739 views</div>
              <h4>Toky</h4>
              <p>
                Bronze creator with a 25.8K Twitch following. Public view count captured at the 7
                September cut.
              </p>
              <a
                className="gzh-social-link"
                href="https://x.com/ToKymonGrey/status/2090492754249806267"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on X →
              </a>
            </article>
            <article className="gzh-social-card">
              <span className="gzh-social-platform is-rd">Reddit</span>
              <div className="gzh-social-stat">r/JempGames</div>
              <h4>jemplfg</h4>
              <p>
                Posted the stream to their own community subreddit, a channel the other creators
                did not use.
              </p>
              <a
                className="gzh-social-link"
                href="https://www.reddit.com/r/JempGames/comments/1vvyers/ground_zero_hero/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on Reddit →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* =============== TOP VIEWER-HOUR DRIVERS =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 28 }}>
            <span className="cs-tag">Top viewer-hour drivers</span>
            <h2>Where the watch time concentrated.</h2>
            <p>
              SOGAeon alone delivered 497 viewer-hours, a fifth of the campaign total. The four
              Gold creators together produced 1,097 viewer-hours, 44% of the total from 15% of the
              roster.
            </p>
          </div>
          <div className="gzh-top">
            {topDrivers.map((c, i) => (
              <div key={`${c.name}-${i}`} className="gzh-top-row">
                <span className="gzh-top-rank">#{i + 1}</span>
                <span className="gzh-top-name">{c.name}</span>
                <span className="gzh-top-cell">{c.avg} avg · {c.tier}</span>
                <span className="gzh-top-cell">{c.dur} streamed</span>
                <span className="gzh-top-val">{c.vh} vh</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== OVERDELIVERY =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Overdelivery</span>
            <h2>71.9h delivered against 49.0h of tier baseline.</h2>
            <p>
              Bronze creators were scoped around one hour, Silver and Gold around two. The cohort
              streamed 22.9 hours on top of that baseline, 47% more than required. 18 creators
              delivered at least 30 minutes above their tier, and 8 delivered at least a full extra
              hour.
            </p>
          </div>
          <div className="gzh-top">
            {overdelivery.map((c, i) => (
              <div key={`${c.name}-${i}`} className="gzh-top-row">
                <span className="gzh-top-rank">#{i + 1}</span>
                <span className="gzh-top-name">{c.name}</span>
                <span className="gzh-top-cell">{c.delivered} delivered · {c.tier}</span>
                <span className="gzh-top-cell">{c.baseline} baseline</span>
                <span className="gzh-top-val">+{c.extra}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== LAUNCH CONTEXT =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 8 }}>
            <span className="cs-tag">Twitch and Steam launch context</span>
            <h2>What the public platforms recorded around release.</h2>
            <p>
              Third-party category and store tracking, included as launch context. These
              snapshots include activity from other channels and other launch drivers, so they
              are not presented as conversions caused by StreamQuest.
            </p>
          </div>
          <div className="gzh-context">
            {contextCards.map((c) => (
              <div key={c.lbl} className="gzh-context-card">
                <div className="gzh-context-num">{c.num}</div>
                <div className="gzh-context-lbl">{c.lbl}</div>
                <div className="gzh-context-src">
                  <a href={c.href} target="_blank" rel="noopener noreferrer">{c.src}</a>
                </div>
              </div>
            ))}
          </div>
          <h3 style={{ marginTop: 36, marginBottom: 6 }}>What is not claimed</h3>
          <ul className="cs-list">
            <li>
              Streams Charts&rsquo; August monthly peak of 855 viewers landed on 11 August, before
              release, and SteamDB&rsquo;s all-time Twitch peak of 3,176 dates from 6 May. Neither
              is attributed to this campaign.
            </li>
            <li>
              No dated pre-campaign category-rank snapshot exists, and the public TwitchTracker
              summary only exposes a rolling window. This report therefore makes no start-to-peak
              rank claim and no week-on-week ranking growth claim.
            </li>
            <li>
              Without a control group, creator-level timestamps matched to the category curve,
              native social analytics and tracked Steam conversion data, the incremental share of
              the Steam signals above cannot be isolated.
            </li>
          </ul>
        </div>
      </section>

      {/* =============== BUDGET RECONCILIATION =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Budget reconciliation</span>
            <h2>€2,000 activation budget, reconciled on verified completions.</h2>
            <p>
              Client-facing tier values of €20 Bronze, €50 Silver and €100 Gold, plus the fixed
              setup and operations fee. This report deliberately does not present cost per
              viewer-hour or CPM: Twitch watch time is not comparable to paid-media impressions,
              and stating it as if it were would overclaim.
            </p>
          </div>
          <div className="gzh-stat-list">
            <div className="gzh-stat-row">
              <span className="gzh-stat-label">Bronze completions · 5 × €20</span>
              <span className="gzh-stat-num">€100</span>
              <span className="gzh-stat-note">Creator allocation, Bronze tier.</span>
            </div>
            <div className="gzh-stat-row">
              <span className="gzh-stat-label">Silver completions · 18 × €50</span>
              <span className="gzh-stat-num">€900</span>
              <span className="gzh-stat-note">Creator allocation, Silver tier.</span>
            </div>
            <div className="gzh-stat-row">
              <span className="gzh-stat-label">Gold completions · 4 × €100</span>
              <span className="gzh-stat-num">€400</span>
              <span className="gzh-stat-note">Creator allocation, Gold tier.</span>
            </div>
            <div className="gzh-stat-row">
              <span className="gzh-stat-label">Creator allocation subtotal</span>
              <span className="gzh-stat-num">€1,400</span>
              <span className="gzh-stat-note">27 completed creators.</span>
            </div>
            <div className="gzh-stat-row">
              <span className="gzh-stat-label">Setup and campaign operations</span>
              <span className="gzh-stat-num">€500</span>
              <span className="gzh-stat-note">Brief, screening, coordination, validation and reporting.</span>
            </div>
            <div className="gzh-stat-row is-muted">
              <span className="gzh-stat-label">Reserved: Acclaim&rsquo;s Favorite Stream</span>
              <span className="gzh-stat-num">€50</span>
              <span className="gzh-stat-note">Held for the client-selected favourite stream bonus.</span>
            </div>
            <div className="gzh-stat-row is-muted">
              <span className="gzh-stat-label">Remaining headroom</span>
              <span className="gzh-stat-num">€50</span>
              <span className="gzh-stat-note">Unallocated at the reporting cut.</span>
            </div>
            <div className="gzh-stat-row is-total">
              <span className="gzh-stat-label">Total activation budget</span>
              <span className="gzh-stat-num">€2,000</span>
              <span className="gzh-stat-note">Fixed all-in budget for the launch activation.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== NEXT CAMPAIGN =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div className="cs-split">
            <div>
              <span className="cs-tag">Measurement gaps and next campaign</span>
              <h2>How the next activation gets a real start-versus-peak read.</h2>
              <p>
                The delivery footprint here is solid and defensible. The reach and conversion
                layer is not, because the fields were never captured in a comparable way. For
                the next activation, capture the same set of fields at four points: seven days
                before launch, launch hour, 24 hours after, and seven days after.
              </p>
              <ul className="cs-list">
                <li>Twitch category rank, peak viewers, average viewers, hours watched and concurrent channels</li>
                <li>Each creator&rsquo;s native social views, reach, clicks and engagement</li>
                <li>Tracked-link clicks and Steam wishlist events, with a clear UTM or referral convention</li>
                <li>Creator-level stream timestamps, so campaign activity can be laid over the public category curve</li>
              </ul>
            </div>
            <div className="cs-split-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${M}/screenshot-5.webp`} alt="Ground Zero Hero gameplay" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* =============== CINEMATIC BAND =============== */}
      <section className="gzh-band" aria-label="Ground Zero Hero key art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="gzh-band-img" src={`${M}/key-art-horizontal.webp`} alt="" loading="lazy" />
        <div className="gzh-band-veil" aria-hidden="true" />
        <div className="cs-shell gzh-band-inner">
          <span className="gzh-band-eyebrow">The full log</span>
          <h2>27 creators, one launch.</h2>
          <p>
            Every completed activation with tier, ranking, language, performance, viewer-hours,
            and links to every VOD and social post submitted.
          </p>
        </div>
      </section>

      {/* =============== FULL CREATOR TABLE =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 24 }}>
            <span className="cs-tag">Ordered creator log</span>
            <h2>All 27 completed activations.</h2>
            <p>
              Filter by tier, language or launch window, and sort by any performance column. Top
              % and language rank are TwitchTracker source-time values captured at screening.
            </p>
          </div>
        </div>
        {/* Widened out of the content shell so every column fits on desktop without sideways scrolling. */}
        <div className="gzh-log-wrap">
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
              <li>Live viewer-hours are each creator&rsquo;s logged Ground Zero Hero hours multiplied by their logged average viewers. An estimate of watch time, not unique reach.</li>
              <li>Individual stream peaks are not summed into a campaign peak, because the streams ran at different times.</li>
              <li>Combined followers are not deduplicated and do not imply every follower saw the campaign.</li>
              <li>Side-quest completion is evidence of creator action, not proof of a completed Steam wishlist or a conversion.</li>
              <li>SteamDB and Streams Charts values are external snapshots that include activity from other creators, channels and launch drivers.</li>
            </ul>
          </div>
          <div className="gzh-sources">
            <a className="gzh-source" href={WORKBOOK} target="_blank" rel="noopener noreferrer">Creator completion workbook</a>
            <a className="gzh-source" href="https://streamscharts.com/games/ground-zero-hero/statistics" target="_blank" rel="noopener noreferrer">Streams Charts</a>
            <a className="gzh-source" href="https://steamdb.info/app/2570580/charts/" target="_blank" rel="noopener noreferrer">SteamDB</a>
            <a className="gzh-source" href="https://twitchtracker.com/api/games/summary/Ground%20Zero%20Hero" target="_blank" rel="noopener noreferrer">TwitchTracker summary</a>
            <a className="gzh-source" href="/quests/groundzerohero" target="_blank" rel="noopener noreferrer">Mission brief</a>
          </div>
          <div className="gzh-foot">
            <span>Prepared by StreamQuest for Acclaim · Reporting cut 10 September 2026 · Confidential</span>
            <form action={signOutAction}>
              <button type="submit" className="gzh-foot-signout">Sign out</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
