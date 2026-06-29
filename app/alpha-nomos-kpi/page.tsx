import type { Metadata } from "next";
import { isUnlocked } from "./session";
import { signInAction, signOutAction } from "./actions";
import CreatorTable from "./CreatorTable";
import "@/app/redesign.css";
import "@/app/case-studies/case-studies.css";
import "./nomos.css";

export const metadata: Metadata = {
  title: "Alpha Nomos Creator Campaign KPI Report | StreamQuest",
  description: "Client-facing StreamQuest KPI report for the Alpha Nomos creator campaign.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { searchParams: { err?: string } };

const HERO_BG = "/media/alpha-nomos/key%20art%20horizontal.webp";

/* Twitch clip embed needs every host domain it will render on as a parent. */
const CLIP_SLUG = "PreciousVenomousSlothDxCat-BIWbNuCb5KD9xYzD";
const CLIP_PARENTS = ["streamquest.io", "www.streamquest.io", "localhost", "127.0.0.1"];
const CLIP_EMBED = `https://clips.twitch.tv/embed?clip=${CLIP_SLUG}&${CLIP_PARENTS.map(
  (p) => `parent=${p}`
).join("&")}&autoplay=false&muted=false`;
const CLIP_LINK = `https://www.twitch.tv/uclaoboat/clip/${CLIP_SLUG}`;

const kpis = [
  { num: "48 / 50", lbl: "Completed creators" },
  { num: "€2,450", lbl: "Final all-in spend" },
  { num: "33 / 15", lbl: "Silver / Bronze" },
  { num: "45 / 48", lbl: "Wishlist completions" },
  { num: "2,945", lbl: "Viewer-hours" },
  { num: "€0.83", lbl: "Cost per viewer-hour" },
];

const PARTNERS = [
  "Foyhtv", "SOGAeon", "fleapuff", "LunariValkyrie", "Shalalaka", "Genkaku",
  "Uclaoboat", "Maveco", "Saremugames", "Elllandria", "MarianaAr32", "Toky",
  "ItsJosh", "Kiuzinho",
];

/* Top viewer-hour drivers (figures as reported in the campaign report). */
const topDrivers = [
  { name: "SOGAeon", tier: "Silver", avg: 176, dur: "4.2h", vh: 748 },
  { name: "Saremugames", tier: "Silver", avg: 52, dur: "3.4h", vh: 179 },
  { name: "igorek_games", tier: "Silver", avg: 35, dur: "3.5h", vh: 122 },
  { name: "Foyhtv", tier: "Silver", avg: 57, dur: "2.0h", vh: 117 },
  { name: "Genkaku", tier: "Silver", avg: 53, dur: "2.0h", vh: 109 },
  { name: "Shalalaka", tier: "Silver", avg: 43, dur: "2.3h", vh: 100 },
  { name: "MarianaAr32", tier: "Silver", avg: 96, dur: "1.0h", vh: 96 },
  { name: "fleapuff", tier: "Silver", avg: 35, dur: "2.5h", vh: 88 },
];

const overdelivery = [
  { name: "SOGAeon", tier: "Silver", delivered: "4.2h", baseline: "2.0h", extra: "2.2h" },
  { name: "igorek_games", tier: "Silver", delivered: "3.5h", baseline: "2.0h", extra: "1.5h" },
  { name: "Saremugames", tier: "Silver", delivered: "3.4h", baseline: "2.0h", extra: "1.4h" },
  { name: "soulessiren", tier: "Silver", delivered: "3.3h", baseline: "2.0h", extra: "1.3h" },
  { name: "BumquackZA", tier: "Bronze", delivered: "2.3h", baseline: "1.0h", extra: "1.3h" },
  { name: "Savage_Kai", tier: "Bronze", delivered: "2.3h", baseline: "1.0h", extra: "1.3h" },
  { name: "Capsuhi", tier: "Bronze", delivered: "2.0h", baseline: "1.0h", extra: "1.0h" },
  { name: "Velko_live", tier: "Silver", delivered: "2.6h", baseline: "2.0h", extra: "0.6h" },
];

const feedback = [
  {
    theme: "Strong core concept",
    signal: "Creators described the game as fun, vibey, promising, improved, and full-release worthy.",
    action: "Keep leaning into the rhythm roguelite identity in creator messaging.",
  },
  {
    theme: "Beat, BPM and calibration clarity",
    signal: "Multiple comments mentioned beat timing, BPM readability, or calibration feeling off.",
    action: "Prioritize calibration UX, clearer beat feedback, and music / controller sync checks.",
  },
  {
    theme: "Tutorial and combo learning",
    signal: "Creators found the tutorial dense and some combo / plugin language confusing.",
    action: "Simplify onboarding, explain upgrades and plugins more plainly, reinforce combo discovery.",
  },
  {
    theme: "Collision and arena issues",
    signal: "Several creators reported getting stuck on terrain, enemies, walls, or arena edges.",
    action: "Route to QA as a visible demo-friction issue; improve collision escape and arena boundaries.",
  },
  {
    theme: "Combat readability and difficulty",
    signal: "Feedback mentioned hectic fights, dodge expectations, hitboxes, health and healing, and difficulty spikes.",
    action: "Review early difficulty ramp, dodge affordance, healing availability, and enemy readability.",
  },
  {
    theme: "Feature requests",
    signal: "Creators suggested co-op, track and music choice, stronger upgrade paths, and clearer route selection.",
    action: "Use as roadmap and community-interest signals rather than immediate must-fix items.",
  },
];

const contributors = [
  "Undoubtedlylink", "HaouAnubis", "Paildry", "Silent_Genius", "beacan_",
  "Saremugames", "MarianaAr32", "Toky", "Savage_Kai", "Kiuzinho", "randomgamer1927",
];

export default function AlphaNomosKpiPage({ searchParams }: Props) {
  if (!isUnlocked()) {
    return (
      <main className="nomos-lock">
        <div className="nomos-lock-card">
          <div className="nomos-lock-eyebrow">
            <span className="nomos-lock-dot" />
            StreamQuest KPI report
          </div>
          <h1>Alpha Nomos</h1>
          <p>Enter the access code to view this client report.</p>
          <form action={signInAction} className="nomos-lock-form">
            <input
              type="password"
              name="password"
              placeholder="Access code"
              autoFocus
              required
              className="nomos-lock-input"
            />
            <button type="submit" className="nomos-lock-btn">Unlock report</button>
          </form>
          {searchParams.err && (
            <p className="nomos-lock-err">Wrong access code, try again.</p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="cs-wrap">
      {/* =============== HERO =============== */}
      <section className="cs-hero">
        <div
          className="cs-hero-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="cs-shell cs-hero-inner">
          <span className="cs-eyebrow">KPI Report · RibCage Games</span>
          <h1>
            Alpha Nomos creator campaign.{" "}
            <span className="grad">Broad reach, partner-grade credibility</span>.
          </h1>
          <p className="cs-hero-lead">
            The Alpha Nomos campaign closed at a final spend of €2,450 with 48 of 50
            creators completing, across a mix of 33 Silver and 15 Bronze tiers. The campaign
            pushed hard for wishlists and landed 45 of 48 completions, generated 2,945
            viewer-hours, and reached audiences in 8 languages. 14 of the creators were
            Twitch Partner-status channels, giving the campaign a strong layer of credibility
            and reach on top of community-driven coverage.
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

      {/* =============== EXECUTIVE SUMMARY =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div className="cs-split">
            <div>
              <span className="cs-tag">Executive summary</span>
              <h2>Full creator delivery, a strong wishlist push, and broad language coverage.</h2>
              <p>
                Alpha Nomos is a rhythm-based action roguelite by RibCage Games. The campaign
                was built to put the demo in front of varied, engaged Twitch audiences, drive
                Steam wishlists, and gather honest creator feedback while the game is still in
                development. 48 of the 50 booked creators completed their activation.
              </p>
              <p>
                The blend of established Partner channels and community-driven creators gave the
                campaign both credibility and range, with coverage led by English while still
                reaching Portuguese, French, Spanish, Romanian, German, Russian, and Arabic
                audiences.
              </p>
              <h3>Highlights</h3>
              <ul className="cs-list">
                <li>48 of 50 creators completed, 33 Silver and 15 Bronze</li>
                <li>45 of 48 wishlist completions (94%) and 28 of 48 outside-Twitch posts (58%)</li>
                <li>2,945 viewer-hours delivered at €0.83 all-in per viewer-hour</li>
                <li>14 Twitch Partner-status channels participated</li>
                <li>Combined creator following of 345,576, median Twitch top 1.79%</li>
                <li>Coverage across English, Portuguese, French, Spanish, Romanian, German, Russian, Arabic</li>
              </ul>
            </div>
            <div className="cs-split-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/alpha-nomos/screenshot%20(1).jpg"
                alt="Alpha Nomos gameplay screenshot"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =============== FEATURED CLIP =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Most-watched clip</span>
            <h2>The campaign&rsquo;s top Twitch highlight.</h2>
            <p>
              The most-watched clip from across the campaign, captured live on Twitch during an
              Alpha Nomos stream.
            </p>
          </div>
          <div className="nomos-clip">
            <div className="nomos-clip-frame">
              <iframe
                src={CLIP_EMBED}
                title="Most-watched Alpha Nomos clip on Twitch"
                loading="lazy"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="nomos-clip-meta">
              <span className="nomos-clip-tag">Twitch · Partner channel</span>
              <h3>Uclaoboat</h3>
              <p>
                Pulled by Uclaoboat, a Twitch Partner with 94K followers. The most-watched single
                clip generated by the Alpha Nomos campaign.
              </p>
              <a className="nomos-clip-link" href={CLIP_LINK} target="_blank" rel="noopener noreferrer">
                Open clip on Twitch →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =============== PARTNERED CREATORS =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 10 }}>
            <span className="cs-tag">Partner-status creators</span>
            <h2>14 Twitch Partners added credibility and reach.</h2>
            <p>
              Nearly a third of the roster were Twitch Partner-status channels. Partner creators
              carry vetted audiences and stronger platform standing, which raised the overall
              credibility and reach of the campaign well beyond a pure community activation.
              Partner status was checked against public TwitchTracker creator profiles.
            </p>
          </div>
          <div className="nomos-partners">
            {PARTNERS.map((p) => (
              <span key={p} className="nomos-partner-chip">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* =============== DELIVERY KPIs =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Delivery KPIs</span>
            <h2>48 of 50 creators completed.</h2>
            <p>
              Headline delivery across the full roster, with wishlist and outside-Twitch quests
              tracked per creator.
            </p>
          </div>
          <div className="nomos-stat-list">
            <div className="nomos-stat-row is-total">
              <span className="nomos-stat-label">Completed creators</span>
              <span className="nomos-stat-num">48 / 50</span>
              <span className="nomos-stat-note">48 of 50 booked creators delivered.</span>
            </div>
            <div className="nomos-stat-row">
              <span className="nomos-stat-label">Viewer-hours delivered</span>
              <span className="nomos-stat-num">2,945</span>
              <span className="nomos-stat-note">Campaign average viewers multiplied by stream duration.</span>
            </div>
            <div className="nomos-stat-row">
              <span className="nomos-stat-label">Wishlist push</span>
              <span className="nomos-stat-num">45 / 48</span>
              <span className="nomos-stat-note">94% completion of the wishlist quest.</span>
            </div>
            <div className="nomos-stat-row">
              <span className="nomos-stat-label">Outside-Twitch content</span>
              <span className="nomos-stat-num">28 / 48</span>
              <span className="nomos-stat-note">58% posted a clip or social content off Twitch.</span>
            </div>
            <div className="nomos-stat-row">
              <span className="nomos-stat-label">Combined creator following</span>
              <span className="nomos-stat-num">345,576</span>
              <span className="nomos-stat-note">Across all 48 channels.</span>
            </div>
            <div className="nomos-stat-row">
              <span className="nomos-stat-label">Ranking quality</span>
              <span className="nomos-stat-num">Top 1.79%</span>
              <span className="nomos-stat-note">Median Twitch rank; 37 of 47 ranked creators inside the global top 3%.</span>
            </div>
            <div className="nomos-stat-row">
              <span className="nomos-stat-label">Languages represented</span>
              <span className="nomos-stat-num">8</span>
              <span className="nomos-stat-note">English 22, Portuguese 12, French 8, plus Spanish, Romanian, German, Russian, Arabic.</span>
            </div>
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
              The creators that generated the most viewer-hours. SOGAeon alone drove 748
              viewer-hours, more than a quarter of the campaign total.
            </p>
          </div>
          <div className="nomos-top">
            {topDrivers.map((c, i) => (
              <div key={`${c.name}-${i}`} className="nomos-top-row">
                <span className="nomos-top-rank">#{i + 1}</span>
                <span className="nomos-top-name">{c.name}</span>
                <span className="nomos-top-cell">{c.avg} avg · {c.tier}</span>
                <span className="nomos-top-cell">{c.dur} streamed</span>
                <span className="nomos-top-val">{c.vh} vh</span>
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
            <h2>97.3h delivered against 81.0h of contracted baseline.</h2>
            <p>
              Bronze creators were scoped around one hour and Silver creators around two. The
              campaign delivered 19.2h of incremental stream time on top of baseline. 15 creators
              delivered at least 30 minutes above their tier baseline, and 7 delivered at least a
              full extra hour.
            </p>
          </div>
          <div className="nomos-top">
            {overdelivery.map((c, i) => (
              <div key={`${c.name}-${i}`} className="nomos-top-row">
                <span className="nomos-top-rank">#{i + 1}</span>
                <span className="nomos-top-name">{c.name}</span>
                <span className="nomos-top-cell">{c.delivered} delivered · {c.tier}</span>
                <span className="nomos-top-cell">{c.baseline} baseline</span>
                <span className="nomos-top-val">+{c.extra}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== SPEND EFFICIENCY =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Spend efficiency</span>
            <h2>€0.83 all-in per delivered viewer-hour.</h2>
            <p>
              Final spend of €2,450 against 2,945 viewer-hours, with creator fees alone landing
              at €0.66 per viewer-hour.
            </p>
          </div>
          <div className="nomos-stat-list">
            <div className="nomos-stat-row">
              <span className="nomos-stat-label">Creator-fee efficiency</span>
              <span className="nomos-stat-num">€0.66</span>
              <span className="nomos-stat-note">€1,950 of creator fees across 2,945 viewer-hours.</span>
            </div>
            <div className="nomos-stat-row is-total">
              <span className="nomos-stat-label">All-in per viewer-hour</span>
              <span className="nomos-stat-num">€0.83</span>
              <span className="nomos-stat-note">€2,450 final spend across 2,945 viewer-hours.</span>
            </div>
            <div className="nomos-stat-row">
              <span className="nomos-stat-label">Viewer-hours per euro</span>
              <span className="nomos-stat-num">1.20</span>
              <span className="nomos-stat-note">2,945 viewer-hours generated per €2,450 spent.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== FINANCIAL SUMMARY =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Financial summary</span>
            <h2>€2,450 final spend, calculated on verified completions.</h2>
            <p>
              Creator fees calculated at €50 per Silver creator and €20 per Bronze creator, plus
              a fixed setup fee.
            </p>
          </div>
          <div className="nomos-stat-list">
            <div className="nomos-stat-row">
              <span className="nomos-stat-label">Silver completions · 33 × €50</span>
              <span className="nomos-stat-num">€1,650</span>
              <span className="nomos-stat-note">Creator payout, Silver tier.</span>
            </div>
            <div className="nomos-stat-row">
              <span className="nomos-stat-label">Bronze completions · 15 × €20</span>
              <span className="nomos-stat-num">€300</span>
              <span className="nomos-stat-note">Creator payout, Bronze tier.</span>
            </div>
            <div className="nomos-stat-row">
              <span className="nomos-stat-label">Creator fees subtotal</span>
              <span className="nomos-stat-num">€1,950</span>
              <span className="nomos-stat-note">33 Silver and 15 Bronze creators.</span>
            </div>
            <div className="nomos-stat-row">
              <span className="nomos-stat-label">Setup fee</span>
              <span className="nomos-stat-num">€500</span>
              <span className="nomos-stat-note">Campaign setup, brief, screening, coordination.</span>
            </div>
            <div className="nomos-stat-row is-total">
              <span className="nomos-stat-label">Final all-in spend</span>
              <span className="nomos-stat-num">€2,450</span>
              <span className="nomos-stat-note">Billed on verified completions.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== CREATOR FEEDBACK =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Creator feedback</span>
            <h2>11 creators sent written feedback that routes straight to the team.</h2>
            <p>
              The feedback combined positive affinity signals with specific product notes that
              can be routed to design, UX, and QA. Themes below, with a recommended action for
              each.
            </p>
          </div>
          <div className="nomos-feedback">
            {feedback.map((f) => (
              <article key={f.theme} className="nomos-feedback-card">
                <h4>{f.theme}</h4>
                <dl>
                  <dt>Creator signal</dt>
                  <dd>{f.signal}</dd>
                  <dt>Recommended action</dt>
                  <dd>{f.action}</dd>
                </dl>
              </article>
            ))}
          </div>
          <h3 style={{ marginTop: 34, marginBottom: 4 }}>Feedback contributors</h3>
          <div className="nomos-contributors">
            {contributors.map((c) => (
              <span key={c} className="nomos-contributor">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* =============== FULL CREATOR TABLE =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 24 }}>
            <span className="cs-tag">Ordered creator log</span>
            <h2>All 48 verified activations.</h2>
            <p>
              The full breakdown by creator: tier, Partner status, follower count, Twitch
              ranking, language, campaign performance, viewer-hours, and links to every VOD and
              proof submitted. Filter and sort to explore.
            </p>
          </div>
        </div>
        {/* Widened out of the content shell so every column, VOD link included,
            fits on screen without sideways scrolling on desktop. */}
        <div className="nomos-log-wrap">
          <CreatorTable />
        </div>
      </section>

      {/* =============== FOOTER =============== */}
      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="cs-shell">
          <div className="nomos-foot">
            <span>Prepared by StreamQuest for RibCage Games · Confidential</span>
            <form action={signOutAction}>
              <button type="submit" className="nomos-foot-signout">Sign out</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
