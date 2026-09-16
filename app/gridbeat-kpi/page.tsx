import type { Metadata } from "next";
import { isUnlocked } from "./session";
import { signInAction, signOutAction } from "./actions";
import CreatorTable from "./CreatorTable";
import TopFive from "./TopFive";
import "@/app/redesign.css";
import "@/app/case-studies/case-studies.css";
import "./gridbeat.css";

export const metadata: Metadata = {
  title: "GRIDbeat Creator Campaign KPI Report | StreamQuest",
  description: "Client-facing StreamQuest KPI report for the GRIDbeat demo-to-launch creator campaign.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { searchParams: { err?: string } };

const HERO_BG = "/media/gridbeat/key-art-wide.webp";
const SHOT_1 = "/firebase-public/Game%20Screenshots/GRIDBEAT%20(1).webp";
const SHOT_2 = "/media/gridbeat/screenshot-2.webp";
const BAND = "/media/gridbeat/boss-fight.webp";
const MASCOT = "/firebase-public/Questy%20New%20Folder/Questy%20Regular%20Size%20(10).webp";

/* Campaign totals as reported in the source sheet. Live totals count the 46 rows marked Done;
   phase and support counts cover all 48 accepted rows. */
const kpis = [
  { num: "48 / 50", lbl: "Slots filled", sub: "96.0% fill rate" },
  { num: "46", lbl: "Verified completions", sub: "2 creators still marked open" },
  { num: "104h 18m", lbl: "Verified stream time", sub: "33.7% above the 78h baseline" },
  { num: "2,696.3", lbl: "Viewer-hours generated", sub: "Weighted live average of 25.9 viewers" },
  { num: "25", lbl: "Dual-phase creators", sub: "Verified creators who streamed both phases" },
  { num: "36 / 38", lbl: "Demo / launch logged", sub: "Accepted creator rows with phase coverage" },
  { num: "36", lbl: "Signal boosts logged", sub: "Public social support attached in the sheet" },
  { num: "26", lbl: "Link syncs / wishlist shares", sub: "Launch-day supporters logged: 36" },
];

const tldrTiles = [
  { stat: "32", label: "Silver completions at €50 each" },
  { stat: "14", label: "Bronze completions at €20 each" },
  { stat: "€1,880", label: "Creator payout actual" },
  { stat: "€2,380", label: "Total spend including €500 setup" },
  { stat: "€0.70", label: "Cost per viewer-hour, creator payout only" },
  { stat: "€0.012", label: "Cost per live viewer-minute" },
];

const takeaways = [
  {
    title: "Strong campaign demand",
    body: "48 of 50 available slots were filled, a clean signal that the quest structure and the game proposition were attractive to the creator pool.",
  },
  {
    title: "Repeat coverage became a real strength",
    body: "25 completed creators showed up in both demo week and launch week, pushing GRIDbeat beyond the default single-stream activation format.",
  },
  {
    title: "Coverage stayed staggered across beats",
    body: "9 completed creators covered demo only and 11 covered launch only, helping the campaign stay visible before and during release week.",
  },
  {
    title: "Wishlist spreading stayed visible",
    body: "26 creator rows logged link-sync or wishlist-share proof, giving the campaign a clear store-page support layer outside the live streams.",
  },
  {
    title: "Social proof outside Twitch stayed strong",
    body: "36 signal boosts and 36 launch-day support entries show creators did more than go live, with standout creator-backed posts like Gshiba's TikTok helping extend visibility.",
  },
  {
    title: "Top-end performance came from real standouts",
    body: "Gshiba pulled the highest live averages and peak, Rhariane led total viewer-hours, and 18 completed creators ranked inside Twitch's global top 1%.",
  },
];

export default function GridbeatKpiPage({ searchParams }: Props) {
  if (!isUnlocked()) {
    return (
      <main className="gb-lock">
        <div className="gb-lock-card">
          <div className="gb-lock-eyebrow">
            <span className="gb-lock-dot" />
            StreamQuest KPI report
          </div>
          <h1>GRIDbeat</h1>
          <p>Enter the access code to view this client report.</p>
          <form action={signInAction} className="gb-lock-form">
            <input
              type="password"
              name="password"
              placeholder="Access code"
              autoFocus
              required
              className="gb-lock-input"
            />
            <button type="submit" className="gb-lock-btn">Unlock report</button>
          </form>
          {searchParams.err && (
            <p className="gb-lock-err">Wrong access code, try again.</p>
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
          <span className="cs-eyebrow">KPI Report · Amber Studios</span>
          <h1>
            GRIDbeat demo-to-launch quest.{" "}
            <span className="grad">Repeat coverage, visible support</span>.
          </h1>
          <p className="cs-hero-lead">
            GRIDbeat landed as a strong multi-phase activation: repeat creator coverage across demo
            and launch week, clear wishlist-sharing support, and social proof that extended beyond
            the default one-stream format. 25 verified creators covered both demo and launch week,
            26 creator rows logged wishlist or link-sync proof, 36 logged a signal boost, and the
            campaign generated 104h 18m of live coverage for 2,696.3 viewer-hours.
          </p>
          <div className="gb-tags" style={{ marginTop: 22 }}>
            <span className="gb-tag is-ok">48 / 50 slots filled</span>
            <span className="gb-tag is-ok">25 verified dual-phase creators</span>
            <span className="gb-tag is-ok">26 wishlist / link-share proofs</span>
          </div>
        </div>
      </section>

      {/* =============== KPI GRID =============== */}
      <section className="cs-kpi-strip">
        <div className="cs-shell">
          <div className="gb-kpi-grid">
            {kpis.map((k) => (
              <div key={k.lbl} className="gb-kpi">
                <div className="gb-kpi-num">{k.num}</div>
                <div className="gb-kpi-lbl">{k.lbl}</div>
                <div className="gb-kpi-sub">{k.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== TL;DR =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div className="gb-tldr">
            <h2>TL;DR campaign read</h2>
            <p>
              The strongest story in GRIDbeat is the combination of slot demand, repeat coverage
              and visible support actions. Instead of collapsing into a default one-stream
              activation, the campaign pulled creators into demo coverage, launch-week coverage
              and off-stream wishlist support.
            </p>
            <ul className="gb-tldr-lines">
              <li>
                48 out of 50 slots were filled, a strong interest signal for the game and for the
                campaign structure itself.
              </li>
              <li>
                25 verified creators showed up in both demo week and launch week, while 9 covered
                demo only and 11 covered launch only. That pushed GRIDbeat beyond the default
                single-stream format and kept visibility alive across multiple beats.
              </li>
              <li>
                26 creator rows logged link-sync or wishlist-share proof, while 36 logged signal
                boosts and 36 logged launch-day support. GRIDbeat&rsquo;s support behaviour was
                visible well beyond Twitch VODs.
              </li>
            </ul>
            <div className="gb-tldr-grid">
              {tldrTiles.map((t) => (
                <div key={t.label} className="gb-tldr-tile">
                  <div className="gb-tldr-stat">{t.stat}</div>
                  <div className="gb-tldr-label">{t.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =============== THE QUEST =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div className="cs-split">
            <div>
              <span className="cs-tag">The quest</span>
              <h2>Two phases, three side quests, one wishlist push.</h2>
              <p>
                GRIDbeat is a rhythm action game by Amber Studios. The quest was built around the
                demo and the launch: Bronze creators streamed one hour and Silver creators two,
                with three optional side quests on top. Link Sync asked creators to bring a friend
                into the game and prove the session, Signal Boost asked for a GRIDbeat clip on
                social media outside Twitch, and Launch Sequence rewarded creators who returned
                for launch day after streaming the demo.
              </p>
              <p>
                That structure is why this report tracks phase coverage and support actions per
                creator, not just hours and viewers. The full log at the bottom carries every VOD,
                post and proof link submitted.
              </p>
            </div>
            <div className="cs-split-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SHOT_1} alt="GRIDbeat gameplay" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* =============== TOP CREATOR HIGHLIGHTS =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">Top creator highlights</span>
            <h2>Where the campaign concentrated.</h2>
            <p>
              Tuned to GRIDbeat&rsquo;s strongest angles: repeat coverage across demo and launch,
              wishlist and support behaviour, and standout creator performance. Switch the view to
              rank the completed creators by a different measure.
            </p>
          </div>
          <TopFive />
        </div>
      </section>

      {/* =============== ROSTER QUALITY =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 760, marginBottom: 22 }}>
            <span className="cs-tag">Roster quality</span>
            <h2>Who completed the quest.</h2>
            <p>Channel standing and live performance across the 46 completed creators.</p>
          </div>
          <div className="gb-stat-list">
            <div className="gb-stat-row is-total">
              <span className="gb-stat-label">Completion rate</span>
              <span className="gb-stat-num">95.8%</span>
              <span className="gb-stat-note">46 of 48 accepted creator rows marked Done.</span>
            </div>
            <div className="gb-stat-row">
              <span className="gb-stat-label">Twitch global top 1%</span>
              <span className="gb-stat-num">18 / 46</span>
              <span className="gb-stat-note">Completed creators inside TwitchTracker&rsquo;s global top 1% at screening. 36 sit inside the top 2%.</span>
            </div>
            <div className="gb-stat-row">
              <span className="gb-stat-label">10K+ followers</span>
              <span className="gb-stat-num">6</span>
              <span className="gb-stat-note">Completed creators with a large profile.</span>
            </div>
            <div className="gb-stat-row">
              <span className="gb-stat-label">20+ average viewers</span>
              <span className="gb-stat-num">21</span>
              <span className="gb-stat-note">Completed streams that averaged 20 or more. 13 averaged 30 or more.</span>
            </div>
            <div className="gb-stat-row">
              <span className="gb-stat-label">50+ peak viewers</span>
              <span className="gb-stat-num">10</span>
              <span className="gb-stat-note">Completed streams that peaked at 50 viewers or more.</span>
            </div>
            <div className="gb-stat-row">
              <span className="gb-stat-label">Two hours or more streamed</span>
              <span className="gb-stat-num">33</span>
              <span className="gb-stat-note">Completed creators who streamed at least two hours.</span>
            </div>
            <div className="gb-stat-row">
              <span className="gb-stat-label">Median average viewers</span>
              <span className="gb-stat-num">17.5</span>
              <span className="gb-stat-note">Weighted live average across all completed hours: 25.9.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== BUDGET EFFICIENCY =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div className="cs-split cs-split-reverse">
            <div className="cs-split-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SHOT_2} alt="GRIDbeat gameplay" loading="lazy" />
            </div>
            <div>
              <span className="cs-tag">Budget efficiency</span>
              <h2>€0.70 per viewer-hour on creator payout, €0.88 all-in.</h2>
              <p>
                Total campaign spend of €2,380 including the €500 setup fee. Creator payout actual
                of €1,880: 32 Silver completions at €50 and 14 Bronze at €20.
              </p>
              <p>
                The completed pool delivered 2,696.3 viewer-hours and 104h 18m of verified
                streaming. That landed at €0.70 per viewer-hour on creator payout alone, or €0.88
                including setup, while still overdelivering the runtime baseline by 33.7%.
              </p>
            </div>
          </div>
          <div className="gb-stat-list" style={{ marginTop: 34 }}>
            <div className="gb-stat-row">
              <span className="gb-stat-label">Creator payout</span>
              <span className="gb-stat-num">€1,880</span>
              <span className="gb-stat-note">32 Silver completions at €50 and 14 Bronze at €20.</span>
            </div>
            <div className="gb-stat-row is-total">
              <span className="gb-stat-label">Total including setup</span>
              <span className="gb-stat-num">€2,380</span>
              <span className="gb-stat-note">Creator payout plus the €500 setup fee.</span>
            </div>
            <div className="gb-stat-row">
              <span className="gb-stat-label">Cost per viewer-hour, creator only</span>
              <span className="gb-stat-num">€0.70</span>
              <span className="gb-stat-note">€1,880 across 2,696.3 viewer-hours.</span>
            </div>
            <div className="gb-stat-row">
              <span className="gb-stat-label">Cost per viewer-hour, including setup</span>
              <span className="gb-stat-num">€0.88</span>
              <span className="gb-stat-note">€2,380 across 2,696.3 viewer-hours.</span>
            </div>
            <div className="gb-stat-row">
              <span className="gb-stat-label">Cost per streamed hour</span>
              <span className="gb-stat-num">€18.02</span>
              <span className="gb-stat-note">Creator payout across 104h 18m of verified streaming.</span>
            </div>
            <div className="gb-stat-row">
              <span className="gb-stat-label">Cost per live viewer-minute</span>
              <span className="gb-stat-num">€0.012</span>
              <span className="gb-stat-note">Creator payout across the completed pool&rsquo;s live viewer-minutes.</span>
            </div>
            <div className="gb-stat-row">
              <span className="gb-stat-label">Weighted live average viewers</span>
              <span className="gb-stat-num">25.9</span>
              <span className="gb-stat-note">Duration-weighted across all completed hours.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== KEY TAKEAWAYS =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">Key takeaways</span>
            <h2>Six things worth carrying into the next campaign.</h2>
          </div>
          <div className="gb-takeaways">
            {takeaways.map((t) => (
              <article key={t.title} className="gb-takeaway">
                <h4>{t.title}</h4>
                <p>{t.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== CINEMATIC BAND =============== */}
      <section className="gb-band" aria-label="GRIDbeat gameplay">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="gb-band-img" src={BAND} alt="" loading="lazy" />
        <div className="gb-band-veil" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="gb-mascot" src={MASCOT} alt="" loading="lazy" />
        <div className="cs-shell gb-band-inner">
          <span className="cs-tag">The full log</span>
          <h2>48 creators, two phases.</h2>
          <p>
            Every accepted creator row with channel quality, live performance, phase coverage,
            campaign support and every proof link submitted.
          </p>
        </div>
      </section>

      {/* =============== FULL CREATOR BREAKDOWN =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 760, marginBottom: 24 }}>
            <span className="cs-tag">Full creator breakdown</span>
            <h2>All 48 accepted creator rows.</h2>
            <p>
              Totals above are based on the 46 creators marked Done. The table keeps the 2 open
              rows visible so campaign follow-up stays easy. Search, filter by language, tier,
              status or support action, and sort by any measure.
            </p>
          </div>
        </div>
        {/* Widened out of the content shell so the grouped columns fit on desktop. */}
        <div className="gb-log-wrap">
          <CreatorTable />
        </div>
      </section>

      {/* =============== NOTES + FOOTER =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">Notes</span>
            <ul className="cs-list">
              <li>Cost assumptions: Silver €50, Bronze €20, setup €500.</li>
              <li>Viewer-hours are each creator&rsquo;s logged hours multiplied by their average viewers, summed across the completed rows.</li>
              <li>Some source rows carried extra social URLs in adjacent columns, so support totals use non-empty proof fields rather than only literal checkmarks.</li>
              <li>Top % and language rank are TwitchTracker values captured at screening.</li>
            </ul>
          </div>
          <div className="gb-foot">
            <span>Prepared by StreamQuest for Amber Studios · Confidential</span>
            <form action={signOutAction}>
              <button type="submit" className="gb-foot-signout">Sign out</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
