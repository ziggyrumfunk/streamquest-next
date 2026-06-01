import type { Metadata } from "next";
import { isUnlocked } from "./session";
import { signInAction, signOutAction } from "./actions";
import CreatorTable from "./CreatorTable";
import "@/app/redesign.css";
import "@/app/case-studies/case-studies.css";
import "./aska.css";

export const metadata: Metadata = {
  title: "ASKA Hearth & Honey KPI Report | StreamQuest",
  description: "Client-facing StreamQuest KPI report for ASKA: Hearth & Honey update.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { searchParams: { err?: string } };

const HERO_BG = "/media/aska/ASKA - Key Art 1 - Horizontal - No Logo.webp";
const PARTNER_LOGO = "/media/aska/ASKA_Logo_01_Oatmeal.webp";

const kpis = [
  { num: "47",        lbl: "Verified activations" },
  { num: "163h 35",   lbl: "Total stream time" },
  { num: "+78h 35",   lbl: "Above the minimum" },
  { num: "3,302.9",   lbl: "Viewer-hours" },
  { num: "41 / 47",   lbl: "Raise The Horn" },
  { num: "€0.78",     lbl: "Cost per watch-hour" },
];

const topByViewerHours = [
  { name: "Scorphinhooo",       activations: 1, hours: "18h05", vh: 271.2, avg: 15, peak: 25 },
  { name: "Foythtv",            activations: 2, hours: "5h03",  vh: 201.8, avg: 41, peak: 90 },
  { name: "Findseloy",          activations: 1, hours: "3h15",  vh: 178.8, avg: 55, peak: 66 },
  { name: "Gshiba",             activations: 1, hours: "2h05",  vh: 168.8, avg: 81, peak: 91 },
  { name: "SadWrathProduction", activations: 1, hours: "4h15",  vh: 161.5, avg: 38, peak: 44 },
  { name: "Hinogashy",          activations: 2, hours: "4h40",  vh: 121.3, avg: 26, peak: 29 },
  { name: "TattyHikari",        activations: 1, hours: "4h26",  vh: 97.5,  avg: 22, peak: 34 },
  { name: "MaekaAmaya",         activations: 1, hours: "4h21",  vh: 95.7,  avg: 22, peak: 31 },
];

const topByAvgViewers = [
  { name: "Gshiba",             avg: 81, peak: 91, hours: "2h05" },
  { name: "Findseloy",          avg: 55, peak: 66, hours: "3h15" },
  { name: "Shalalaka",          avg: 45, peak: 49, hours: "2h05" },
  { name: "Foythtv",            avg: 41, peak: 90, hours: "2h24" },
  { name: "Foythtv",            avg: 39, peak: 90, hours: "2h39" },
  { name: "SadWrathProduction", avg: 38, peak: 44, hours: "4h15" },
  { name: "FabetaGames",        avg: 35, peak: 50, hours: "2h37" },
  { name: "Lishou",             avg: 34, peak: 41, hours: "2h" },
];

const topByHours = [
  { name: "Scorphinhooo", hours: "18h05", avg: 15, vh: 271.2 },
  { name: "Weber90",      hours: "15h05", avg: 5,  vh: 75.4 },
  { name: "Paschaolin",   hours: "6h14",  avg: 15, vh: 93.5 },
  { name: "Adwuin",       hours: "6h10",  avg: 15, vh: 92.5 },
  { name: "Velko_Live",   hours: "5h26",  avg: 15, vh: 81.5 },
  { name: "TattyHikari",  hours: "4h26",  avg: 22, vh: 97.5 },
  { name: "Eyklor",       hours: "4h25",  avg: 20, vh: 88.3 },
  { name: "MaekaAmaya",   hours: "4h21",  avg: 22, vh: 95.7 },
];

const socials = [
  {
    handle: "@Paschaolin",
    platform: "Instagram",
    pillClass: "is-ig",
    caption: "Instagram Reel — Portuguese audience, deep-dive coverage of the update.",
    embed: "https://www.instagram.com/p/DXhO9yTDnGb/embed",
    href: "https://www.instagram.com/p/DXhO9yTDnGb/",
    portrait: true,
  },
  {
    handle: "@mishoots_gaming",
    platform: "TikTok",
    pillClass: "is-tt",
    caption: "TikTok — German audience, ItsMischa.",
    embed: "https://www.tiktok.com/embed/v2/7633100297031748897",
    href: "https://www.tiktok.com/@mishoots_gaming/video/7633100297031748897",
    portrait: true,
  },
  {
    handle: "@Eryuyu",
    platform: "YouTube",
    pillClass: "is-yt",
    caption: "YouTube Live — Spanish audience, full update walkthrough.",
    embed: "https://www.youtube-nocookie.com/embed/rWz3LOYmHl8",
    href: "https://www.youtube.com/live/rWz3LOYmHl8",
    portrait: false,
  },
  {
    handle: "@eyklorju",
    platform: "TikTok",
    pillClass: "is-tt",
    caption: "TikTok — French audience, Eyklor.",
    embed: "https://www.tiktok.com/embed/v2/7633163273394851094",
    href: "https://www.tiktok.com/@eyklorju/video/7633163273394851094",
    portrait: true,
  },
  {
    handle: "@lunarivalkyrie",
    platform: "TikTok",
    pillClass: "is-tt",
    caption: "TikTok — English audience, Skald's Highlight bonus content.",
    embed: "https://www.tiktok.com/embed/v2/7631169828081962254",
    href: "https://www.tiktok.com/@lunarivalkyrie/video/7631169828081962254",
    portrait: true,
  },
];

export default function AskaKpiPage({ searchParams }: Props) {
  if (!isUnlocked()) {
    return (
      <main className="aska-lock">
        <div className="aska-lock-card">
          <div className="aska-lock-eyebrow">
            <span className="aska-lock-dot" />
            StreamQuest KPI report
          </div>
          <h1>ASKA: Hearth &amp; Honey</h1>
          <p>Enter the access code to view this client report.</p>
          <form action={signInAction} className="aska-lock-form">
            <input
              type="password"
              name="password"
              placeholder="Access code"
              autoFocus
              required
              className="aska-lock-input"
            />
            <button type="submit" className="aska-lock-btn">Unlock report</button>
          </form>
          {searchParams.err && (
            <p className="aska-lock-err">Wrong access code, try again.</p>
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
          <span className="cs-eyebrow">KPI Report · Thunderful x Sand Sailor Studio</span>
          <h1>
            ASKA: Hearth &amp; Honey.{" "}
            <span className="grad">Long-form depth, broad creator reach</span>.
          </h1>
          <p className="cs-hero-lead">
            The Hearth &amp; Honey update campaign closed at 47 verified activations
            across 45 unique creator channels, generating 163h 35m of ASKA stream
            time and 3,302.9 viewer-hours. Stream time landed at 192% of the agreed
            minimum, and 41 of 47 creators completed Raise The Horn — sustained,
            authentic coverage of the update rather than a single launch spike.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PARTNER_LOGO}
            alt="ASKA"
            style={{ height: 48, marginTop: 18, opacity: 0.9 }}
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

      {/* =============== EXECUTIVE SUMMARY =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div className="cs-split">
            <div>
              <span className="cs-tag">Executive summary</span>
              <h2>Returning ASKA creators showed depth. New creators broadened the entry point.</h2>
              <p>
                Hearth &amp; Honey worked particularly well as a StreamQuest beat
                because ASKA is a game where the deeper appeal becomes clearer once
                creators understand the colony flow, building logic, resource
                management and progression systems. Returning ASKA creators helped
                by showing more advanced gameplay and late-game footage, including
                proof around tavern / Mead Hall style progression. Newer creators
                added fresh first-session reactions and a broader discovery layer.
              </p>
              <p>
                This mix made the campaign feel less like one-off sponsored coverage
                and more like an update beat with different stages of player
                experience: new players learning the systems, returning players
                showing how far the game can go, and longer-session creators giving
                the update room to breathe.
              </p>
              <h3>Highlights</h3>
              <ul className="cs-list">
                <li>47 verified activations across 45 unique creator channels</li>
                <li>38 Silver completions, 9 Bronze completions</li>
                <li>163h 35m total stream time — 192% of the agreed minimum (85h)</li>
                <li>3,302.9 viewer-hours, 22.5 average campaign CCV (vs 13.1 target)</li>
                <li>41 of 47 creators completed Raise The Horn (87% completion)</li>
                <li>Audience coverage across English, French, German, Spanish, Romanian, Turkish, Portuguese</li>
              </ul>
            </div>
            <div className="cs-split-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/aska/ASKA_2025_Big-Village.webp"
                alt="ASKA village screenshot"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =============== STREAMING KPIs =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Streaming KPIs</span>
            <h2>192% of the agreed minimum stream time.</h2>
            <p>
              All 47 verified activations met or exceeded their Bronze / Silver CCV
              target. Many creators streamed well beyond the required window —
              giving ASKA more on-screen time than baseline alone would have
              delivered.
            </p>
          </div>
          <div className="aska-stat-list">
            <div className="aska-stat-row is-total">
              <span className="aska-stat-label">Total stream time delivered</span>
              <span className="aska-stat-num">163h 35</span>
              <span className="aska-stat-note">vs 85h00 baseline — 192% of required duration.</span>
            </div>
            <div className="aska-stat-row">
              <span className="aska-stat-label">Stream time above the minimum</span>
              <span className="aska-stat-num">+78h 35</span>
              <span className="aska-stat-note">Overdelivery beyond the agreed baseline.</span>
            </div>
            <div className="aska-stat-row">
              <span className="aska-stat-label">Total viewer-hours generated</span>
              <span className="aska-stat-num">3,302.9</span>
              <span className="aska-stat-note">279% of the baseline target viewer-hours.</span>
            </div>
            <div className="aska-stat-row">
              <span className="aska-stat-label">Average campaign CCV</span>
              <span className="aska-stat-num">22.5</span>
              <span className="aska-stat-note">vs 13.1 target — 172%. Median 20.0, weighted 20.2.</span>
            </div>
            <div className="aska-stat-row">
              <span className="aska-stat-label">Highest campaign peak</span>
              <span className="aska-stat-num">91</span>
              <span className="aska-stat-note">Top single-stream peak viewers.</span>
            </div>
            <div className="aska-stat-row">
              <span className="aska-stat-label">Silver / Bronze completions</span>
              <span className="aska-stat-num">38 / 9</span>
              <span className="aska-stat-note">All verified as completed.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== TOP CREATOR HIGHLIGHTS =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 32 }}>
            <span className="cs-tag">Top creator highlights</span>
            <h2>Three angles on where the campaign concentrated.</h2>
            <p>
              Top performers by viewer-hours, by campaign average viewers, and by
              streamed hours. The lists overlap in places — Scorphinhooo, Foythtv,
              Findseloy and Gshiba all appear across multiple cuts of the data.
            </p>
          </div>

          <h3 style={{ marginBottom: 10 }}>Top by viewer-hours</h3>
          <div className="aska-top">
            {topByViewerHours.map((c, i) => (
              <div key={`vh-${c.name}-${i}`} className="aska-top-row">
                <span className="aska-top-rank">#{i + 1}</span>
                <span className="aska-top-name">{c.name}</span>
                <span className="aska-top-cell">{c.avg} avg · {c.peak} peak</span>
                <span className="aska-top-cell">{c.hours} streamed</span>
                <span className="aska-top-val">{c.vh.toFixed(1)} vh</span>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: 36, marginBottom: 10 }}>Top by campaign average viewers</h3>
          <div className="aska-top">
            {topByAvgViewers.map((c, i) => (
              <div key={`avg-${c.name}-${i}`} className="aska-top-row">
                <span className="aska-top-rank">#{i + 1}</span>
                <span className="aska-top-name">{c.name}</span>
                <span className="aska-top-cell">{c.avg} avg viewers</span>
                <span className="aska-top-cell">{c.peak} peak · {c.hours}</span>
                <span className="aska-top-val">{c.avg.toFixed(1)}</span>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: 36, marginBottom: 10 }}>Top by streamed hours</h3>
          <div className="aska-top">
            {topByHours.map((c, i) => (
              <div key={`h-${c.name}-${i}`} className="aska-top-row">
                <span className="aska-top-rank">#{i + 1}</span>
                <span className="aska-top-name">{c.name}</span>
                <span className="aska-top-cell">{c.avg} avg viewers</span>
                <span className="aska-top-cell">{c.vh.toFixed(1)} vh</span>
                <span className="aska-top-val">{c.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== SOCIAL EMBEDS =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Raise The Horn — featured proof</span>
            <h2>Selected social posts across Instagram, TikTok and YouTube.</h2>
            <p>
              Five featured creator posts from the Raise The Horn social quest. The
              full breakdown across all 6 platforms sits below.
            </p>
          </div>

          <div className="aska-social-grid">
            {socials.map((s) => (
              <article key={s.embed} className="aska-social">
                <div
                  className={`aska-social-frame${s.portrait ? "" : " is-landscape"}`}
                >
                  <iframe
                    src={s.embed}
                    title={`${s.handle} on ${s.platform}`}
                    loading="lazy"
                    allow="encrypted-media; accelerometer; clipboard-write; gyroscope; picture-in-picture"
                    scrolling="no"
                    allowFullScreen
                  />
                </div>
                <div className="aska-social-meta">
                  <span className={`aska-social-platform ${s.pillClass}`}>{s.platform}</span>
                  <div className="aska-social-handle">{s.handle}</div>
                  <p className="aska-social-caption">{s.caption}</p>
                  <a
                    className="aska-social-link"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open post →
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Raise The Horn platform breakdown */}
          <h3 style={{ marginTop: 40 }}>Raise The Horn platform breakdown</h3>
          <div className="aska-stat-list">
            <div className="aska-stat-row">
              <span className="aska-stat-label">X / Twitter</span>
              <span className="aska-stat-num">27</span>
              <span className="aska-stat-note">Main social channel for the quest.</span>
            </div>
            <div className="aska-stat-row">
              <span className="aska-stat-label">Instagram</span>
              <span className="aska-stat-num">5</span>
              <span className="aska-stat-note">Reels + posts.</span>
            </div>
            <div className="aska-stat-row">
              <span className="aska-stat-label">YouTube</span>
              <span className="aska-stat-num">4</span>
              <span className="aska-stat-note">Shorts and live coverage.</span>
            </div>
            <div className="aska-stat-row">
              <span className="aska-stat-label">TikTok</span>
              <span className="aska-stat-num">3</span>
              <span className="aska-stat-note">Short-form clips.</span>
            </div>
            <div className="aska-stat-row">
              <span className="aska-stat-label">Bluesky</span>
              <span className="aska-stat-num">2</span>
              <span className="aska-stat-note">Niche but engaged.</span>
            </div>
            <div className="aska-stat-row">
              <span className="aska-stat-label">Threads</span>
              <span className="aska-stat-num">1</span>
              <span className="aska-stat-note">Single submission.</span>
            </div>
            <div className="aska-stat-row is-total">
              <span className="aska-stat-label">Raise The Horn completions</span>
              <span className="aska-stat-num">41 / 47</span>
              <span className="aska-stat-note">87% of completed activations.</span>
            </div>
          </div>
          <p className="cs-muted" style={{ marginTop: 20 }}>
            Optional bonus content: 14 verified Skald&apos;s Highlight submissions
            and 4 Mead Hall Rising / tavern progression proofs.
          </p>
        </div>
      </section>

      {/* =============== FINANCIAL SUMMARY =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Financial summary</span>
            <h2>€2,580 final cost. €80 surplus invoiced against the €2,500 prepay.</h2>
            <p>
              All-in price based on final verified completions and agreed Bronze /
              Silver pricing. The surplus has been invoiced.
            </p>
          </div>
          <div className="aska-stat-list">
            <div className="aska-stat-row">
              <span className="aska-stat-label">Setup fee · 1 × €500</span>
              <span className="aska-stat-num">€500</span>
              <span className="aska-stat-note">Campaign setup, brief, screening, key distribution.</span>
            </div>
            <div className="aska-stat-row">
              <span className="aska-stat-label">Silver completions · 38 × €50</span>
              <span className="aska-stat-num">€1,900</span>
              <span className="aska-stat-note">Creator payout, Silver tier.</span>
            </div>
            <div className="aska-stat-row">
              <span className="aska-stat-label">Bronze completions · 9 × €20</span>
              <span className="aska-stat-num">€180</span>
              <span className="aska-stat-note">Creator payout, Bronze tier.</span>
            </div>
            <div className="aska-stat-row is-total">
              <span className="aska-stat-label">Final campaign cost</span>
              <span className="aska-stat-num">€2,580</span>
              <span className="aska-stat-note">Billed against the €2,500 prepay.</span>
            </div>
            <div className="aska-stat-row">
              <span className="aska-stat-label">Prepaid budget</span>
              <span className="aska-stat-num">€2,500</span>
              <span className="aska-stat-note">Originally invoiced at planning.</span>
            </div>
            <div className="aska-stat-row is-total">
              <span className="aska-stat-label">Surplus invoiced</span>
              <span className="aska-stat-num">€80</span>
              <span className="aska-stat-note">€2,580 − €2,500.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== EFFICIENCY =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Efficiency metrics</span>
            <h2>€0.78 per delivered viewer-hour.</h2>
            <p>
              Across €2,580 of campaign cost and 3,302.9 generated viewer-hours,
              this lands as one of the cleaner cost-per-viewer-hour outcomes for
              this campaign size.
            </p>
          </div>
          <div className="aska-stat-list">
            <div className="aska-stat-row">
              <span className="aska-stat-label">Cost per activation</span>
              <span className="aska-stat-num">€55</span>
              <span className="aska-stat-note">All-in, across all 47 verified activations.</span>
            </div>
            <div className="aska-stat-row">
              <span className="aska-stat-label">Cost per streamed hour</span>
              <span className="aska-stat-num">€15.77</span>
              <span className="aska-stat-note">Against 163h 35 verified stream time.</span>
            </div>
            <div className="aska-stat-row">
              <span className="aska-stat-label">Cost per viewer-hour</span>
              <span className="aska-stat-num">€0.78</span>
              <span className="aska-stat-note">Against 3,302.9 generated viewer-hours.</span>
            </div>
            <div className="aska-stat-row">
              <span className="aska-stat-label">Stream time vs. minimum</span>
              <span className="aska-stat-num">192%</span>
              <span className="aska-stat-note">163h 35 delivered vs 85h required.</span>
            </div>
            <div className="aska-stat-row">
              <span className="aska-stat-label">Campaign CCV vs. target</span>
              <span className="aska-stat-num">172%</span>
              <span className="aska-stat-note">22.5 avg vs 13.1 target.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== FULL CREATOR TABLE =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 24 }}>
            <span className="cs-tag">Ordered creator log</span>
            <h2>All 47 verified activations.</h2>
            <p>
              The full breakdown by creator: tier, follower count, all-time avg
              CCV, language rank, campaign performance, raise platform, and links
              to every VOD and side-quest proof submitted.
            </p>
          </div>
          <CreatorTable />
        </div>
      </section>

      {/* =============== FOOTER =============== */}
      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="cs-shell">
          <div className="aska-foot">
            <span>Prepared by StreamQuest for Thunderful x Sand Sailor Studio · Confidential</span>
            <form action={signOutAction}>
              <button type="submit" className="aska-foot-signout">Sign out</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
