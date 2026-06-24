import type { Metadata } from "next";
import { isUnlocked } from "./session";
import { signInAction, signOutAction } from "./actions";
import CreatorTable from "./CreatorTable";
import { rows } from "./data";
import "@/app/redesign.css";
import "@/app/case-studies/case-studies.css";
import "./good-heavens.css";

export const metadata: Metadata = {
  title: "Good Heavens! KPI Report | StreamQuest",
  description: "Confidential StreamQuest creator-campaign KPI report for Good Heavens!",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const ART = "/firebase-public/GoodHeavensRPG";
const HERO_ART = `${ART}/library_hero%20%283840x1240%29.webp`;
const HERO_THUMB = `${ART}/store_capsule_main%20%281232%20x%20706%29.webp`;
const GAME_LOGO = `${ART}/library_logo_transparent%20%28890x720%29.webp`;
const GAMEPLAY = `${ART}/gameplay%20%281%29.webp`;
const SCENE_WARCITY = `${ART}/War%20City%204.webp`;
const SCENE_SCHOLAR = `${ART}/Scholar%20City.webp`;
const BREAK_IMG = `${ART}/background%20dark.webp`;
// Decorative character art
const CHAR_RAR = `${ART}/rar%20floating.webp`;
const CHAR_ALCH = `${ART}/alchemist.webp`;
const CHAR_HUNTER = `${ART}/hunter.webp`;
const CHAR_FOX = `${ART}/Fox%20sit.webp`;
const CHAR_TROLL = `${ART}/troll.webp`;
const CHAR_SHEEP = `${ART}/sheep%20pink.webp`;
const CHAR_ENCH = `${ART}/enchanter.webp`;

type Props = { searchParams: { err?: string } };

const kpis = [
  { num: "29 / 30", lbl: "Creators completed" },
  { num: "7",       lbl: "Stream languages" },
  { num: "65.0h",   lbl: "Stream time delivered" },
  { num: "3,114",   lbl: "Viewer-hours" },
  { num: "233,644", lbl: "Combined following" },
  { num: "€0.48",   lbl: "Cost per viewer-hour" },
];

const topByAvg = [...rows].sort((a, b) => b.avgViewers - a.avgViewers).slice(0, 5);
const topByPeak = [...rows].sort((a, b) => b.peakViewers - a.peakViewers).slice(0, 5);
const topByStream = [...rows].sort((a, b) => b.streamHours - a.streamHours).slice(0, 5);

const efficiencyDrivers = [
  { creator: "Genkaku",   tier: "Silver", vh: "1,197", paid: "€50", cpvh: "€0.04", vhEur: "23.94" },
  { creator: "Teteia",    tier: "Silver", vh: "340",   paid: "€50", cpvh: "€0.15", vhEur: "6.80" },
  { creator: "Foyhtv",    tier: "Silver", vh: "260",   paid: "€50", cpvh: "€0.19", vhEur: "5.20" },
  { creator: "SOGAeon",   tier: "Silver", vh: "172",   paid: "€50", cpvh: "€0.29", vhEur: "3.44" },
  { creator: "fleapuff",  tier: "Silver", vh: "150",   paid: "€50", cpvh: "€0.33", vhEur: "3.00" },
  { creator: "Shalalaka", tier: "Silver", vh: "88",    paid: "€50", cpvh: "€0.57", vhEur: "1.76" },
];

export default function GoodHeavensKpiPage({ searchParams }: Props) {
  if (!isUnlocked()) {
    return (
      <main className="gh-lock">
        <div className="gh-lock-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="gh-lock-logo" src={GAME_LOGO} alt="Good Heavens!" />
          <div className="gh-lock-eyebrow">
            <span className="gh-lock-dot" />
            StreamQuest KPI report
          </div>
          <h1>Good Heavens! creator campaign</h1>
          <p>Enter the access code to view this confidential client report.</p>
          <form action={signInAction} className="gh-lock-form">
            <input
              type="password"
              name="password"
              placeholder="Access code"
              autoFocus
              required
              className="gh-lock-input"
            />
            <button type="submit" className="gh-lock-btn">Unlock report</button>
          </form>
          {searchParams.err && (
            <p className="gh-lock-err">Wrong access code, try again.</p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="cs-wrap">
      {/* =============== HERO =============== */}
      <section className="gh-hero gh-hero-img">
        <div
          className="gh-hero-art"
          aria-hidden="true"
          style={{ backgroundImage: `url('${HERO_ART}')` }}
        />
        <div className="gh-hero-bg" aria-hidden="true" />
        <div className="cs-shell gh-hero-grid">
          <div className="gh-hero-copy">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="gh-hero-logo" src={GAME_LOGO} alt="Good Heavens! logo" loading="eager" />
            <span className="cs-eyebrow">Creator Campaign KPI Report</span>
            <h1>
              Good Heavens!{" "}
              <span className="grad">29 creators, 7 languages, one tightly-run budget</span>.
            </h1>
            <p className="cs-hero-lead">
              The campaign performed strongly across creator delivery, English-led
              international reach, budget discipline, and community activation. Total
              spend was hard-capped at €1,500, with setup cut to €300 so the budget
              could prioritise creator delivery. The strongest signals were high
              wishlist-push completion, bring-a-friend activation, majority
              outside-Twitch content proof, and meaningful stream-time overdelivery.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="gh-hero-thumb"
            src={HERO_THUMB}
            alt="Good Heavens! key art"
            loading="eager"
          />
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

      {/* =============== EXECUTIVE SUMMARY / KEY RESULTS =============== */}
      <section className="cs-section">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="gh-deco is-faded" src={CHAR_ALCH} alt="" aria-hidden="true"
             style={{ top: 60, right: "1%", width: 130, transform: "rotate(4deg)" }} />
        <div className="cs-shell">
          <div className="gh-split">
            <div className="gh-split-copy">
              <span className="cs-tag">Executive summary</span>
              <h2>Broad activation, high completion, low cost per viewer-hour.</h2>
              <p>
                29 of 30 tracked creators completed the campaign, with a healthy mix
                of 22 Silver and 7 Bronze. The program reached creators across 7
                stream languages, led by English while still covering multiple
                regions, and included 8 Twitch Partner channels alongside Affiliate
                creators. The best framing is the mix: international coverage, highly
                ranked channels, Partner participation, strong wishlist and
                bring-a-friend execution, and measurable viewer-hour efficiency at low
                cost.
              </p>
            </div>
            <div className="gh-split-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={GAMEPLAY} alt="Good Heavens! gameplay" loading="lazy" />
            </div>
          </div>

          <div className="gh-stat-list">
            <div className="gh-stat-row is-total">
              <span className="gh-stat-label">Completed creators</span>
              <span className="gh-stat-num">29 / 30</span>
              <span className="gh-stat-note">Broad creator activation; only one tracked creator did not complete.</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">Tier mix</span>
              <span className="gh-stat-num">22 S · 7 B</span>
              <span className="gh-stat-note">Bronze paid cap held to 5; 2 extra Bronze completions counted as overperformance.</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">Combined following</span>
              <span className="gh-stat-num">233,644</span>
              <span className="gh-stat-note">Across the approved 30-creator roster; small, mid-size and larger channels.</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">Ranking quality</span>
              <span className="gh-stat-num">Top 1.51%</span>
              <span className="gh-stat-note">Median global TwitchTracker rank. 25 creators inside the top 3%, 19 inside the top 2%.</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">Partner-status creators</span>
              <span className="gh-stat-num">8</span>
              <span className="gh-stat-note">Foyhtv, SOGAeon, fleapuff, Shalalaka, Teteia, LunariValkyrie, MarianaAr32, Genkaku.</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">Stream time delivered</span>
              <span className="gh-stat-num">65.0h</span>
              <span className="gh-stat-note">16.0h above the 51.0h tier baseline (Bronze 1h, Silver 2h).</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">Viewer-hours delivered</span>
              <span className="gh-stat-num">3,114</span>
              <span className="gh-stat-note">Campaign average viewers multiplied by stream duration.</span>
            </div>
            <div className="gh-stat-row is-total">
              <span className="gh-stat-label">All-in cost per viewer-hour</span>
              <span className="gh-stat-num">€0.48</span>
              <span className="gh-stat-note">2.08 viewer-hours per €1 including setup; €0.39 on creator fees alone.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== BUDGET RECONCILIATION =============== */}
      <section className="cs-section cs-section-shaded">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="gh-deco is-faded" src={CHAR_SHEEP} alt="" aria-hidden="true"
             style={{ bottom: 30, left: "1.5%", width: 120, transform: "rotate(-5deg)" }} />
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Budget reconciliation</span>
            <h2>€1,500 hard cap, weighted toward creators.</h2>
            <p>
              Tier-based pricing: Silver at €50, Bronze at €20. Setup was reduced to
              €300 so the budget could prioritise creator delivery. The first 5 Bronze
              creators were paid; additional Bronze completions counted as
              overperformance.
            </p>
          </div>
          <div className="gh-stat-list">
            <div className="gh-stat-row">
              <span className="gh-stat-label">Silver · 22 × €50</span>
              <span className="gh-stat-num">€1,100</span>
              <span className="gh-stat-note">Creator payout, Silver tier.</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">Bronze paid · 5 × €20</span>
              <span className="gh-stat-num">€100</span>
              <span className="gh-stat-note">Creator payout, Bronze tier (paid cap).</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">Bronze overperformance · 2 × €0</span>
              <span className="gh-stat-num">€0</span>
              <span className="gh-stat-note">Teecups and ShrillGoblin completed above the paid Bronze cap.</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">Creator fees subtotal</span>
              <span className="gh-stat-num">€1,200</span>
              <span className="gh-stat-note">All creator payouts combined.</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">Setup</span>
              <span className="gh-stat-num">€300</span>
              <span className="gh-stat-note">Reduced from standard to preserve creator coverage.</span>
            </div>
            <div className="gh-stat-row is-total">
              <span className="gh-stat-label">Total spend</span>
              <span className="gh-stat-num">€1,500</span>
              <span className="gh-stat-note">On the hard-capped target.</span>
            </div>
          </div>

          <h3 style={{ marginTop: 40, marginBottom: 12 }}>Viewer-hour efficiency</h3>
          <div className="gh-table-wrap">
            <table className="gh-table">
              <thead>
                <tr>
                  <th>Spend basis</th>
                  <th>Spend</th>
                  <th>Viewer-hours</th>
                  <th>Cost / viewer-hour</th>
                  <th>Viewer-hours / €</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Creator fees only</strong></td>
                  <td>€1,200</td>
                  <td>3,114</td>
                  <td>€0.39</td>
                  <td>2.60</td>
                </tr>
                <tr>
                  <td><strong>All-in incl. setup</strong></td>
                  <td>€1,500</td>
                  <td>3,114</td>
                  <td>€0.48</td>
                  <td>2.08</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =============== DELIVERY SIGNALS =============== */}
      <section className="cs-section">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="gh-deco" src={CHAR_HUNTER} alt="" aria-hidden="true"
             style={{ top: 80, right: "2%", width: 116, transform: "rotate(3deg)" }} />
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Delivery signals</span>
            <h2>The campaign moved store-page intent, not just awareness.</h2>
            <p>
              Beyond the live stream, creators delivered against the conversion-oriented
              deliverables. Wishlist push completion was very high, and bring-a-friend
              directly supported in-match concurrency and additional downloads.
            </p>
          </div>
          <div className="gh-stat-list">
            <div className="gh-stat-row">
              <span className="gh-stat-label">Wishlist push</span>
              <span className="gh-stat-num">26 / 29</span>
              <span className="gh-stat-note">90% completion. The strongest conversion-oriented signal in the tracker.</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">Bring-a-friend</span>
              <span className="gh-stat-num">22 / 29</span>
              <span className="gh-stat-note">76% completion. Sustained multiplayer sessions and a path from stream to downloads.</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">Outside-Twitch content proof</span>
              <span className="gh-stat-num">16 / 29</span>
              <span className="gh-stat-note">55%. Majority coverage extended beyond the live Twitch session.</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">Streamed beyond tier baseline</span>
              <span className="gh-stat-num">12 / 29</span>
              <span className="gh-stat-note">41% played beyond the paid minimum, a sign sessions had real momentum.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== TOP EFFICIENCY DRIVERS =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Top efficiency drivers</span>
            <h2>A handful of Silver creators carried outsized viewer-hours.</h2>
            <p>
              Genkaku alone delivered roughly 1,197 viewer-hours for a €50 fee,
              including frontpage Twitch coverage from May. The most efficient
              activations returned viewer-hours per euro well into double digits.
            </p>
          </div>
          <div className="gh-table-wrap">
            <table className="gh-table">
              <thead>
                <tr>
                  <th>Creator</th>
                  <th>Tier</th>
                  <th>Viewer-hours</th>
                  <th>Paid</th>
                  <th>Cost / VH</th>
                  <th>VH / €</th>
                </tr>
              </thead>
              <tbody>
                {efficiencyDrivers.map((d) => (
                  <tr key={d.creator}>
                    <td><strong>{d.creator}</strong></td>
                    <td><span className="gh-pill is-silver">{d.tier}</span></td>
                    <td>{d.vh}</td>
                    <td>{d.paid}</td>
                    <td>{d.cpvh}</td>
                    <td>{d.vhEur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =============== LANGUAGE COVERAGE =============== */}
      <section className="cs-section gh-section-bg">
        <div
          className="gh-section-bg-img"
          aria-hidden="true"
          style={{ backgroundImage: `url('${SCENE_WARCITY}')` }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="gh-deco" src={CHAR_FOX} alt="" aria-hidden="true"
             style={{ bottom: 24, right: "2%", width: 124, transform: "rotate(-3deg)" }} />
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Reach &amp; market coverage</span>
            <h2>English-led, with multilingual international reach.</h2>
            <p>
              The roster spanned 7 stream languages. English was the focus with 16
              approved creators, supported by regional coverage across French,
              Portuguese, Spanish, German, Romanian and Arabic. Portuguese carried the
              largest follower reach, driven by Partner channels Teteia and Genkaku.
            </p>
          </div>
          <div className="gh-stat-list">
            <div className="gh-stat-row">
              <span className="gh-stat-label">English · 15 creators</span>
              <span className="gh-stat-num">70,110</span>
              <span className="gh-stat-note">Follower reach across completed English activations.</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">Portuguese · 5 creators</span>
              <span className="gh-stat-num">141,322</span>
              <span className="gh-stat-note">Largest reach; Partner-heavy (Teteia, Genkaku, Shalalaka, Foyhtv).</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">French · 5 creators</span>
              <span className="gh-stat-num">9,670</span>
              <span className="gh-stat-note">Community-driven coverage across French channels.</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">Spanish · 1 creator</span>
              <span className="gh-stat-num">5,096</span>
              <span className="gh-stat-note">Eryuyu.</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">Arabic · 1 creator</span>
              <span className="gh-stat-num">3,550</span>
              <span className="gh-stat-note">MarianaAr32, who amplified across YouTube, TikTok and Instagram.</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">Romanian · 1 creator</span>
              <span className="gh-stat-num">2,765</span>
              <span className="gh-stat-note">UmbritaC.</span>
            </div>
            <div className="gh-stat-row">
              <span className="gh-stat-label">German · 1 creator</span>
              <span className="gh-stat-num">802</span>
              <span className="gh-stat-note">Paildry.</span>
            </div>
            <div className="gh-stat-row is-total">
              <span className="gh-stat-label">Completed roster total</span>
              <span className="gh-stat-num">233,315</span>
              <span className="gh-stat-note">29 completed creators; 233,644 across the full 30-creator approved roster.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== TOP CREATORS =============== */}
      <section className="cs-section">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="gh-deco is-faded" src={CHAR_TROLL} alt="" aria-hidden="true"
             style={{ top: 70, left: "1%", width: 128, transform: "rotate(5deg)" }} />
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 32 }}>
            <span className="cs-tag">Top creator highlights</span>
            <h2>Three angles on where the campaign concentrated.</h2>
            <p>
              Top performers by campaign average viewers, by peak viewers, and by
              streamed time.
            </p>
          </div>

          <h3 style={{ marginBottom: 10 }}>Top by average viewers</h3>
          <div className="gh-top">
            {topByAvg.map((c, i) => (
              <div key={`avg-${c.creator}`} className="gh-top-row">
                <span className="gh-top-rank">#{i + 1}</span>
                <span className="gh-top-name">{c.creator}</span>
                <span className="gh-top-cell">{c.language} · {c.tier}</span>
                <span className="gh-top-cell">{c.peakViewers} peak · {c.streamTime}</span>
                <span className="gh-top-val">{c.avgViewers} avg</span>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: 36, marginBottom: 10 }}>Top by peak viewers</h3>
          <div className="gh-top">
            {topByPeak.map((c, i) => (
              <div key={`peak-${c.creator}`} className="gh-top-row">
                <span className="gh-top-rank">#{i + 1}</span>
                <span className="gh-top-name">{c.creator}</span>
                <span className="gh-top-cell">{c.language} · {c.tier}</span>
                <span className="gh-top-cell">{c.avgViewers} avg · {c.streamTime}</span>
                <span className="gh-top-val">{c.peakViewers} peak</span>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: 36, marginBottom: 10 }}>Top by streamed time</h3>
          <div className="gh-top">
            {topByStream.map((c, i) => (
              <div key={`st-${c.creator}`} className="gh-top-row">
                <span className="gh-top-rank">#{i + 1}</span>
                <span className="gh-top-name">{c.creator}</span>
                <span className="gh-top-cell">{c.language} · {c.tier}</span>
                <span className="gh-top-cell">{c.avgViewers} avg · {c.peakViewers} peak</span>
                <span className="gh-top-val">{c.streamTime}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== FEATURED EMBEDS =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 760, marginBottom: 28 }}>
            <span className="cs-tag">Featured creator content</span>
            <h2>Top social posts and highlight VODs.</h2>
            <p>
              A cross-section of the most-amplified coverage from the larger creators.
              Every activation&apos;s VOD and social proof link is also in the creator
              table below.
            </p>
          </div>

          <div className="gh-embed-grid">
            {/* TikTok — LunariValkyrie (9:16) */}
            <article className="gh-embed">
              <div className="gh-embed-frame">
                <iframe
                  src="https://www.tiktok.com/embed/v2/7653577528921099533"
                  title="LunariValkyrie on TikTok"
                  loading="lazy"
                  allow="encrypted-media; clipboard-write"
                  scrolling="no"
                  allowFullScreen
                />
              </div>
              <div className="gh-embed-meta">
                <span className="gh-embed-platform is-tiktok">TikTok</span>
                <div className="gh-embed-handle">LunariValkyrie</div>
                <p className="gh-embed-caption">
                  English · Silver · Partner · 16,207 followers. Largest-reach creator
                  with an off-Twitch post.
                </p>
                <a className="gh-embed-link" href="https://www.tiktok.com/@lunarivalkyrie/video/7653577528921099533" target="_blank" rel="noopener noreferrer">
                  Open post &rarr;
                </a>
              </div>
            </article>

            {/* YouTube Short — fleapuff (16:9) */}
            <article className="gh-embed">
              <div className="gh-embed-frame is-landscape">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/IkSaczS9Oos"
                  title="fleapuff on YouTube"
                  loading="lazy"
                  allow="encrypted-media; accelerometer; clipboard-write; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="gh-embed-meta">
                <span className="gh-embed-platform is-yt">YouTube</span>
                <div className="gh-embed-handle">fleapuff</div>
                <p className="gh-embed-caption">
                  English · Silver · Partner · 5,262 followers. Posted across YouTube,
                  Instagram and TikTok.
                </p>
                <a className="gh-embed-link" href="https://www.youtube.com/shorts/IkSaczS9Oos" target="_blank" rel="noopener noreferrer">
                  Open video &rarr;
                </a>
              </div>
            </article>

            {/* Instagram — MarianaAr32 (9:16) */}
            <article className="gh-embed">
              <div className="gh-embed-frame">
                <iframe
                  src="https://www.instagram.com/reel/DZ3bLv1juLc/embed"
                  title="MarianaAr32 on Instagram"
                  loading="lazy"
                  allow="encrypted-media; clipboard-write; picture-in-picture"
                  scrolling="no"
                  allowFullScreen
                />
              </div>
              <div className="gh-embed-meta">
                <span className="gh-embed-platform is-ig">Instagram</span>
                <div className="gh-embed-handle">MarianaAr32</div>
                <p className="gh-embed-caption">
                  Arabic · Silver · Partner · 79 avg, 99 peak. Amplified across three
                  platforms for the widest regional reach.
                </p>
                <a className="gh-embed-link" href="https://www.instagram.com/reel/DZ3bLv1juLc/" target="_blank" rel="noopener noreferrer">
                  Open post &rarr;
                </a>
              </div>
            </article>

            {/* Twitch VOD — Genkaku (16:9) */}
            <article className="gh-embed">
              <div className="gh-embed-frame is-landscape">
                <iframe
                  src="https://player.twitch.tv/?video=2762403097&parent=streamquest.io&parent=www.streamquest.io&parent=localhost&autoplay=false"
                  title="Genkaku Twitch VOD"
                  loading="lazy"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
              <div className="gh-embed-meta">
                <span className="gh-embed-platform is-twitch">Twitch VOD</span>
                <div className="gh-embed-handle">Genkaku</div>
                <p className="gh-embed-caption">
                  Portuguese · Silver · Partner · 399 avg, 540 peak. ~1,197 viewer-hours
                  plus frontpage Twitch coverage.
                </p>
                <a className="gh-embed-link" href="https://www.twitch.tv/videos/2762403097" target="_blank" rel="noopener noreferrer">
                  Open VOD &rarr;
                </a>
              </div>
            </article>

            {/* Twitch VOD — Teteia (16:9) */}
            <article className="gh-embed">
              <div className="gh-embed-frame is-landscape">
                <iframe
                  src="https://player.twitch.tv/?video=2799545176&parent=streamquest.io&parent=www.streamquest.io&parent=localhost&autoplay=false"
                  title="Teteia Twitch VOD"
                  loading="lazy"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
              <div className="gh-embed-meta">
                <span className="gh-embed-platform is-twitch">Twitch VOD</span>
                <div className="gh-embed-handle">Teteia</div>
                <p className="gh-embed-caption">
                  Portuguese · Silver · Partner · 76,084 followers, 170 avg, 225 peak.
                </p>
                <a className="gh-embed-link" href="https://www.twitch.tv/videos/2799545176" target="_blank" rel="noopener noreferrer">
                  Open VOD &rarr;
                </a>
              </div>
            </article>
          </div>

          {/* X / Twitter posts — cards (X widgets need their own JS loader) */}
          <h3 style={{ marginTop: 44, marginBottom: 14 }}>X / Twitter campaign posts</h3>
          <div className="gh-x-grid">
            <a className="gh-x-card" href="https://x.com/UndoubtedlyLink/status/2067375221531677126" target="_blank" rel="noopener noreferrer">
              <span className="gh-x-pill">X</span>
              <div className="gh-x-handle">@UndoubtedlyLink</div>
              <div className="gh-x-meta">English &middot; Silver</div>
            </a>
            <a className="gh-x-card" href="https://x.com/VelizarPetrov2/status/2068659429646483951" target="_blank" rel="noopener noreferrer">
              <span className="gh-x-pill">X</span>
              <div className="gh-x-handle">@VelizarPetrov2</div>
              <div className="gh-x-meta">English &middot; Silver (Velko_live)</div>
            </a>
            <a className="gh-x-card" href="https://x.com/Skye_McCloud/status/2067769143462375794" target="_blank" rel="noopener noreferrer">
              <span className="gh-x-pill">X</span>
              <div className="gh-x-handle">@Skye_McCloud</div>
              <div className="gh-x-meta">English &middot; Bronze (ShrillGoblin)</div>
            </a>
            <a className="gh-x-card" href="https://x.com/Paildry/status/2069129710974493112" target="_blank" rel="noopener noreferrer">
              <span className="gh-x-pill">X</span>
              <div className="gh-x-handle">@Paildry</div>
              <div className="gh-x-meta">German &middot; Silver</div>
            </a>
          </div>
        </div>
      </section>

      {/* =============== SCENE BREAK =============== */}
      <section className="gh-break">
        <div
          className="gh-break-img"
          style={{ backgroundImage: `url('${SCENE_SCHOLAR}')` }}
          aria-hidden="true"
        />
      </section>

      {/* =============== FULL CREATOR TABLE =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 24 }}>
            <span className="cs-tag">Creator performance overview</span>
            <h2>All 29 completed activations.</h2>
            <p>
              The full breakdown by creator: language, tier, followers, Twitch ranking,
              campaign average and peak viewers, stream time, and proof links. Search,
              filter and sort to explore.
            </p>
          </div>
          <CreatorTable />
        </div>
      </section>

      {/* =============== COMMUNITY OUTCOMES =============== */}
      <section className="cs-section cs-section-shaded">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="gh-deco is-faded" src={CHAR_ENCH} alt="" aria-hidden="true"
             style={{ bottom: 30, right: "1.5%", width: 120, transform: "rotate(-4deg)" }} />
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">Community &amp; qualitative outcomes</span>
            <h2>From a one-off content buy to early community-building.</h2>
            <p>
              Beyond the paid deliverables, the campaign generated several signals of
              healthy affinity: creator comments directed at the developers, Discord
              joins that can kickstart community engagement, and Steam reviews that were
              encouraged but never rewarded. These outcomes move the campaign from a
              one-off content buy toward early community-building.
            </p>
            <p>
              Bring-a-friend activations helped sustain multiplayer sessions and created
              a practical path from stream exposure to additional downloads. Observed
              sessions ran from two players up to roughly five or six in the largest
              groups, supporting continuous in-match concurrency during streams.
            </p>
            <p>
              Wishlist-push completion was very high, making the campaign useful not just
              for awareness but for store-page intent. Genkaku&apos;s May activity also
              produced frontpage Twitch coverage, included here as an additional
              visibility point in the campaign record.
            </p>
          </div>
        </div>
      </section>

      {/* =============== FINAL READ =============== */}
      <section className="cs-section">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="gh-deco" src={CHAR_RAR} alt="" aria-hidden="true"
             style={{ top: 56, right: "2%", width: 110, transform: "rotate(4deg)" }} />
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">Recommended framing</span>
            <h2>The campaign overdelivered on breadth, completion, and efficiency.</h2>
            <p>
              The most credible story is the mix, not a single language or region:
              international creator coverage, highly ranked channels, Partner-status
              participation, strong wishlist and bring-a-friend execution, and
              measurable viewer-hour efficiency at low cost. 29 of 30 creators
              completed, 7 languages were represented, 65.0h of stream time was
              delivered (16h over baseline), and 3,114 viewer-hours came in at €0.48
              all-in per viewer-hour.
            </p>
            <p className="cs-muted" style={{ marginTop: 16 }}>
              Calculation notes: viewer-hours = campaign average viewers × stream
              duration; cost per viewer-hour = spend ÷ viewer-hours. Tier baseline:
              Bronze 1h, Silver 2h. Bronze budget cap: first 5 Bronze creators paid at
              €20, additional completions counted as overperformance. Partner/Affiliate
              status and ranking stats checked against public TwitchTracker pages.
            </p>
          </div>
        </div>
      </section>

      {/* =============== FOOTER =============== */}
      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="cs-shell">
          <div className="gh-foot">
            <span>Prepared by StreamQuest · Confidential · Good Heavens!</span>
            <form action={signOutAction}>
              <button type="submit" className="gh-foot-signout">Sign out</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
