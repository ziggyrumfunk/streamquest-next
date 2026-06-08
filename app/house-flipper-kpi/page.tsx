import type { Metadata } from "next";
import { isUnlocked } from "./session";
import { signInAction, signOutAction } from "./actions";
import CreatorTable from "./CreatorTable";
import { rows } from "./data";
import "@/app/redesign.css";
import "@/app/case-studies/case-studies.css";
import "./house-flipper.css";

export const metadata: Metadata = {
  title: "House Flipper Remastered KPI Report | StreamQuest",
  description: "Client-facing StreamQuest KPI report for House Flipper Remastered Collection trial campaign.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const KEY_ART = "/media/house-flipper/key%20art.jpg";
const COZY = "/media/house-flipper/cozy-living-room.jpg";
const TOPDOWN = "/media/house-flipper/top%20down%20house.jpg";
const OUTDOORS = "/media/house-flipper/outdoors.jpg";

type Props = { searchParams: { err?: string } };

const kpis = [
  { num: "10",       lbl: "Creators activated" },
  { num: "27h 46",   lbl: "Total stream time" },
  { num: "391.6",    lbl: "Live viewer-hours" },
  { num: "16.1",     lbl: "Avg campaign CCV" },
  { num: "202",      lbl: "Combined peak viewers" },
  { num: "€1.05",    lbl: "Cost per viewer-hour" },
];

const topByViewerHours = [...rows]
  .sort((a, b) => b.viewerHours - a.viewerHours)
  .slice(0, 5);

const topByAvgCcv = [...rows]
  .sort((a, b) => b.avgCcv - a.avgCcv)
  .slice(0, 5);

const topByStreamTime = [...rows]
  .sort((a, b) => b.streamHours - a.streamHours)
  .slice(0, 5);

export default function HouseFlipperKpiPage({ searchParams }: Props) {
  if (!isUnlocked()) {
    return (
      <main className="hf-lock">
        <div className="hf-lock-card">
          <div className="hf-lock-eyebrow">
            <span className="hf-lock-dot" />
            StreamQuest KPI report
          </div>
          <h1>House Flipper Remastered Collection</h1>
          <p>Enter the access code to view this client report.</p>
          <form action={signInAction} className="hf-lock-form">
            <input
              type="password"
              name="password"
              placeholder="Access code"
              autoFocus
              required
              className="hf-lock-input"
            />
            <button type="submit" className="hf-lock-btn">Unlock report</button>
          </form>
          {searchParams.err && (
            <p className="hf-lock-err">Wrong access code, try again.</p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="cs-wrap">
      {/* =============== HERO =============== */}
      <section className="hf-hero hf-hero-img">
        <div
          className="hf-hero-art"
          aria-hidden="true"
          style={{ backgroundImage: `url('${KEY_ART}')` }}
        />
        <div className="hf-hero-bg" aria-hidden="true" />
        <div className="cs-shell hf-hero-grid">
          <div className="hf-hero-copy">
            <span className="cs-eyebrow">Trial Campaign KPI Report</span>
            <h1>
              House Flipper Remastered Collection.{" "}
              <span className="grad">10 creators, 4 languages, one launch window</span>.
            </h1>
            <p className="cs-hero-lead">
              This trial campaign activated 10 Twitch creators across multiple
              language markets with a very short turnaround. All creators streamed
              during the launch window and completed their activation either on
              launch day or the day after, creating immediate live visibility,
              social proof, and social media coverage around the campaign.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="hf-hero-thumb"
            src={KEY_ART}
            alt="House Flipper Remastered Collection key art"
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

      {/* =============== KEY RESULTS =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div className="hf-split">
            <div className="hf-split-copy">
              <span className="cs-tag">Key results</span>
              <h2>10 creators. 4 languages. 27h 46m of launch-window Twitch content.</h2>
              <p>
                For a €410 equivalent activation cost, the campaign generated
                nearly 28 hours of live Twitch content, almost 392 live
                viewer-hours, and additional launch-window social posting across
                multiple creator audiences.
              </p>
            </div>
            <div className="hf-split-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={COZY}
                alt="House Flipper Remastered cozy interior — fireplace, sofa, candles"
                loading="lazy"
              />
            </div>
          </div>
          <div className="hf-split-spacer" />
          <div className="hf-stat-list">
            <div className="hf-stat-row is-total">
              <span className="hf-stat-label">Creators activated</span>
              <span className="hf-stat-num">10</span>
              <span className="hf-stat-note">7 Silver · 3 Bronze. All completed within the launch window.</span>
            </div>
            <div className="hf-stat-row">
              <span className="hf-stat-label">Total creator follower reach</span>
              <span className="hf-stat-num">13,993</span>
              <span className="hf-stat-note">Combined follower base across all 10 activated channels.</span>
            </div>
            <div className="hf-stat-row">
              <span className="hf-stat-label">Total listed channel reach / views</span>
              <span className="hf-stat-num">382,995</span>
              <span className="hf-stat-note">Aggregate listed views across the 10 creator channels.</span>
            </div>
            <div className="hf-stat-row">
              <span className="hf-stat-label">Total stream time</span>
              <span className="hf-stat-num">27h 46</span>
              <span className="hf-stat-note">Live launch-window Twitch content delivered.</span>
            </div>
            <div className="hf-stat-row">
              <span className="hf-stat-label">Estimated live viewer-hours</span>
              <span className="hf-stat-num">391.6</span>
              <span className="hf-stat-note">CCV × hours streamed, across all activations.</span>
            </div>
            <div className="hf-stat-row">
              <span className="hf-stat-label">Average live CCV</span>
              <span className="hf-stat-num">16.1</span>
              <span className="hf-stat-note">Mean concurrent viewers across activations.</span>
            </div>
            <div className="hf-stat-row">
              <span className="hf-stat-label">Combined peak live viewers</span>
              <span className="hf-stat-num">202</span>
              <span className="hf-stat-note">Sum of individual peak viewers across activations.</span>
            </div>
            <div className="hf-stat-row">
              <span className="hf-stat-label">Languages activated</span>
              <span className="hf-stat-num">4</span>
              <span className="hf-stat-note">English, French, Spanish, German.</span>
            </div>
            <div className="hf-stat-row">
              <span className="hf-stat-label">Social posts completed</span>
              <span className="hf-stat-num">10 / 10</span>
              <span className="hf-stat-note">Every activated creator delivered a launch-window social post.</span>
            </div>
            <div className="hf-stat-row is-total">
              <span className="hf-stat-label">Equivalent activation cost</span>
              <span className="hf-stat-num">€410</span>
              <span className="hf-stat-note">Estimated CPVH €1.05 per viewer-hour.</span>
            </div>
          </div>
          <p className="cs-muted" style={{ marginTop: 18 }}>
            <strong>CPVH calculation:</strong> €410 total activation value divided
            by ~391.6 estimated live viewer-hours. This excludes additional value
            from social posts, VOD views, clips, and long-tail Twitch / social
            visibility.
          </p>
        </div>
      </section>

      {/* =============== COST BREAKDOWN =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Cost breakdown</span>
            <h2>€410 equivalent activation cost.</h2>
            <p>
              Tier-based pricing: Silver activations at €50, Bronze activations
              at €20.
            </p>
          </div>
          <div className="hf-stat-list">
            <div className="hf-stat-row">
              <span className="hf-stat-label">Silver · 7 × €50</span>
              <span className="hf-stat-num">€350</span>
              <span className="hf-stat-note">Creator payout, Silver tier.</span>
            </div>
            <div className="hf-stat-row">
              <span className="hf-stat-label">Bronze · 3 × €20</span>
              <span className="hf-stat-num">€60</span>
              <span className="hf-stat-note">Creator payout, Bronze tier.</span>
            </div>
            <div className="hf-stat-row is-total">
              <span className="hf-stat-label">Total equivalent activation cost</span>
              <span className="hf-stat-num">€410</span>
              <span className="hf-stat-note">10 creators across both tiers.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== LANGUAGE COVERAGE =============== */}
      <section className="cs-section hf-section-bg">
        <div
          className="hf-section-bg-img"
          aria-hidden="true"
          style={{ backgroundImage: `url('${TOPDOWN}')` }}
        />
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Language &amp; market coverage</span>
            <h2>4 language markets in a single launch window.</h2>
            <p>
              The campaign was not limited to one market. It activated creators
              across English, French, Spanish, and German-speaking communities,
              giving the title wider international launch-day visibility.
            </p>
          </div>
          <div className="hf-stat-list">
            <div className="hf-stat-row">
              <span className="hf-stat-label">English · 5 creators</span>
              <span className="hf-stat-num">9,428</span>
              <span className="hf-stat-note">Follower reach · 300,118 listed channel reach / views.</span>
            </div>
            <div className="hf-stat-row">
              <span className="hf-stat-label">French · 3 creators</span>
              <span className="hf-stat-num">1,339</span>
              <span className="hf-stat-note">Follower reach · 51,898 listed channel reach / views.</span>
            </div>
            <div className="hf-stat-row">
              <span className="hf-stat-label">Spanish · 1 creator</span>
              <span className="hf-stat-num">2,420</span>
              <span className="hf-stat-note">Follower reach · 22,557 listed channel reach / views.</span>
            </div>
            <div className="hf-stat-row">
              <span className="hf-stat-label">German · 1 creator</span>
              <span className="hf-stat-num">806</span>
              <span className="hf-stat-note">Follower reach · 8,422 listed channel reach / views.</span>
            </div>
            <div className="hf-stat-row is-total">
              <span className="hf-stat-label">Total follower reach</span>
              <span className="hf-stat-num">13,993</span>
              <span className="hf-stat-note">382,995 combined listed channel reach / views.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== TOP CREATORS =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 32 }}>
            <span className="cs-tag">Top creator highlights</span>
            <h2>Three angles on where the campaign concentrated.</h2>
            <p>
              Top performers by viewer-hours, by campaign average viewers, and by
              streamed time.
            </p>
          </div>

          <h3 style={{ marginBottom: 10 }}>Top by viewer-hours</h3>
          <div className="hf-top">
            {topByViewerHours.map((c, i) => (
              <div key={`vh-${c.creator}`} className="hf-top-row">
                <span className="hf-top-rank">#{i + 1}</span>
                <span className="hf-top-name">{c.creator}</span>
                <span className="hf-top-cell">{c.language} · {c.tier}</span>
                <span className="hf-top-cell">{c.streamTime} · {c.avgCcv} avg</span>
                <span className="hf-top-val">{c.viewerHours.toFixed(1)} vh</span>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: 36, marginBottom: 10 }}>Top by average CCV</h3>
          <div className="hf-top">
            {topByAvgCcv.map((c, i) => (
              <div key={`avg-${c.creator}`} className="hf-top-row">
                <span className="hf-top-rank">#{i + 1}</span>
                <span className="hf-top-name">{c.creator}</span>
                <span className="hf-top-cell">{c.language} · {c.tier}</span>
                <span className="hf-top-cell">{c.peakViewers} peak · {c.streamTime}</span>
                <span className="hf-top-val">{c.avgCcv} avg</span>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: 36, marginBottom: 10 }}>Top by streamed time</h3>
          <div className="hf-top">
            {topByStreamTime.map((c, i) => (
              <div key={`st-${c.creator}`} className="hf-top-row">
                <span className="hf-top-rank">#{i + 1}</span>
                <span className="hf-top-name">{c.creator}</span>
                <span className="hf-top-cell">{c.language} · {c.tier}</span>
                <span className="hf-top-cell">{c.avgCcv} avg · {c.viewerHours.toFixed(1)} vh</span>
                <span className="hf-top-val">{c.streamTime}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== FULL CREATOR TABLE =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 24 }}>
            <span className="cs-tag">Creator performance overview</span>
            <h2>All 10 verified activations.</h2>
            <p>
              The full breakdown by creator: language, tier, followers, average
              CCV, peak viewers, stream time, viewer-hours, and social-post status.
            </p>
          </div>
          <CreatorTable />
        </div>
      </section>

      {/* =============== OUTDOORS BREAK =============== */}
      <section className="hf-break">
        <div
          className="hf-break-img"
          style={{ backgroundImage: `url('${OUTDOORS}')` }}
          aria-hidden="true"
        />
      </section>

      {/* =============== MAIN TAKEAWAYS =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">Main takeaways</span>
            <h2>Proof that a short-turnaround trial activation moves real launch numbers.</h2>
            <p>
              The trial campaign successfully proved that StreamQuest can activate
              a targeted group of nano and micro creators quickly, even with a
              short launch-window turnaround. For an equivalent activation value
              of €410, the campaign delivered 10 creators, 13,993 follower reach,
              382,995 combined listed channel reach / views, 27h 46m of Twitch
              content, 391.6 estimated live viewer-hours, 4 language markets, and
              10 / 10 creators streamed and posted socially around launch.
            </p>
            <p>
              The key value of the campaign was not just the live CCV, but the
              combination of Twitch presence, creator authenticity, immediate
              social proof, multilingual coverage, VOD availability, and social
              posting around launch.
            </p>
            <p>
              At an estimated €1.05 CPVH, the campaign shows strong efficiency
              for a trial activation, especially because the calculation does not
              include the additional value of social media posts, VOD replay
              views, or long-tail discoverability after the live streams ended.
            </p>
          </div>
        </div>
      </section>

      {/* =============== FOOTER =============== */}
      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="cs-shell">
          <div className="hf-foot">
            <span>Prepared by StreamQuest · Confidential</span>
            <form action={signOutAction}>
              <button type="submit" className="hf-foot-signout">Sign out</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
