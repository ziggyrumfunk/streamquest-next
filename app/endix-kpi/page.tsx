import type { Metadata } from "next";
import { isUnlocked } from "./session";
import { signInAction, signOutAction } from "./actions";
import CreatorTable from "./CreatorTable";
import "@/app/redesign.css";
import "@/app/case-studies/case-studies.css";
import "./endix.css";

export const metadata: Metadata = {
  title: "Endix May Showcase 2026 KPI Report | StreamQuest",
  description: "Client-facing StreamQuest KPI report for Endix May Showcase 2026.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { searchParams: { err?: string } };

const HERO_BG = "/firebase-public/Game Screenshots/ENDIX.jpg";
const PARTNER_LOGO = "/firebase-public/Logos Partner/Endix.png";

const kpis = [
  { num: "75",       lbl: "Applications" },
  { num: "60",       lbl: "Approved / greenlisted" },
  { num: "32",       lbl: "Verified completions" },
  { num: "1,948.6",  lbl: "Viewer-hours" },
  { num: "82h 30",   lbl: "Verified stream time" },
  { num: "€0.77",    lbl: "Cost per watch-hour" },
];

const highestVisibility = [
  { name: "SOGAeon",            avg: 133, peak: 149, hours: "2h10", vh: 288.2 },
  { name: "ARTTT",              avg: 81,  peak: 84,  hours: "2h08", vh: 172.8 },
  { name: "SadWrathProduction", avg: 36,  peak: 49,  hours: "2h30", vh: 90.0 },
  { name: "sbuddypoke",         avg: 32,  peak: 43,  hours: "2h27", vh: 78.4 },
  { name: "HaouAnubis",         avg: 30,  peak: 33,  hours: "2h03", vh: 61.5 },
  { name: "UndoubtedlyLink",    avg: 30,  peak: 35,  hours: "2h00", vh: 60.0 },
];

const longestActivations = [
  { name: "TattyHikari", hours: "5h",    avg: 27, peak: 45, vh: 135.0 },
  { name: "ScorpiNhoO",  hours: "4h20",  avg: 17, peak: 25, vh: 73.7 },
  { name: "Paschoalin",  hours: "3h29",  avg: 22, peak: 28, vh: 76.6 },
  { name: "Phenexa",     hours: "3h02",  avg: 19, peak: 27, vh: 57.6 },
  { name: "Findseloy",   hours: "2h55",  avg: 25, peak: 46, vh: 72.9 },
  { name: "ToKy",        hours: "2h50",  avg: 10, peak: 14, vh: 28.3 },
];

const languages = ["English", "French", "German", "Portuguese", "Romanian"];

export default function EndixKpiPage({ searchParams }: Props) {
  if (!isUnlocked()) {
    return (
      <main className="endix-lock">
        <div className="endix-lock-card">
          <div className="endix-lock-eyebrow">
            <span className="endix-lock-dot" />
            StreamQuest KPI report
          </div>
          <h1>Endix May Showcase 2026</h1>
          <p>Enter the access code to view this client report.</p>
          <form action={signInAction} className="endix-lock-form">
            <input
              type="password"
              name="password"
              placeholder="Access code"
              autoFocus
              required
              className="endix-lock-input"
            />
            <button type="submit" className="endix-lock-btn">Unlock report</button>
          </form>
          {searchParams.err && (
            <p className="endix-lock-err">Wrong access code, try again.</p>
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
          <span className="cs-eyebrow">KPI Report · Endix</span>
          <h1>
            Endix May Showcase 2026.{" "}
            <span className="grad">Tight weekend, verified output</span>.
          </h1>
          <p className="cs-hero-lead">
            The campaign delivered a strong verified creator layer within a very
            short execution window. 75 applications in, 60 greenlisted, 32 verified
            completions, all concentrated around a single Saturday/Sunday slot. The
            completers showcased every required booth area and supported the activation
            with multi-platform posts.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="endix-partner-logo" src={PARTNER_LOGO} alt="Endix" />
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
              <h2>Tight scheduling window, strong completer quality.</h2>
              <p>
                The Endix May Showcase campaign delivered a verified creator layer in
                a very short execution window. StreamQuest received{" "}
                <strong style={{ color: "#fff" }}>75 applications</strong>, approved
                or greenlisted{" "}
                <strong style={{ color: "#fff" }}>60 creators</strong>, and verified{" "}
                <strong style={{ color: "#fff" }}>32 completed creator submissions</strong>.
              </p>
              <p>
                The lower completion volume should be read in context. The campaign
                was concentrated around a tight Saturday/Sunday window, which made
                scheduling difficult for many creators who expressed interest.
                StreamQuest also held off on accepting more creators after 60 approvals
                because the budget was set tightly and approving too broadly would
                have created budget pressure.
              </p>
              <p>
                The completers performed very well: they showcased the required booth
                areas, provided proof for each section visited, wishlisted at least
                five games, and either brought viewers/buddies into Endix or supported
                the activation through additional social posts tagging Endix.
              </p>
              <h3>Languages represented</h3>
              <div className="endix-langs">
                {languages.map((l) => (
                  <span key={l} className="endix-lang-chip">{l}</span>
                ))}
              </div>
            </div>
            <div className="cs-split-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO_BG} alt="Endix May Showcase 2026" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* =============== APPLICATION FUNNEL =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Application funnel</span>
            <h2>75 applications, 60 approved, 32 verified completions.</h2>
            <p>
              Approvals were capped at 60 to protect the campaign budget, with
              completions reduced further by the Saturday/Sunday scheduling
              constraint.
            </p>
          </div>
          <div className="endix-stat-list">
            <div className="endix-stat-row is-total">
              <span className="endix-stat-label">Applications received</span>
              <span className="endix-stat-num">75</span>
              <span className="endix-stat-note">Total incoming interest.</span>
            </div>
            <div className="endix-stat-row">
              <span className="endix-stat-label">Approved / greenlisted</span>
              <span className="endix-stat-num">60</span>
              <span className="endix-stat-note">
                Approvals capped to protect the campaign budget.
              </span>
            </div>
            <div className="endix-stat-row">
              <span className="endix-stat-label">Verified completions</span>
              <span className="endix-stat-num">32</span>
              <span className="endix-stat-note">
                Creator rows with verified VOD and performance submission.
              </span>
            </div>
            <div className="endix-stat-row">
              <span className="endix-stat-label">Approved without verified completion</span>
              <span className="endix-stat-num">28</span>
              <span className="endix-stat-note">
                Mainly explained by the tight weekend execution window.
              </span>
            </div>
            <div className="endix-stat-row">
              <span className="endix-stat-label">Open / rejected / not accepted</span>
              <span className="endix-stat-num">15</span>
              <span className="endix-stat-note">
                Applications outside the approved creator pool.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== BUDGET RECONCILIATION =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Budget reconciliation</span>
            <h2>€1,500 final cost. €500 reimbursement on the prepay.</h2>
            <p>
              The setup/management fee was reduced so creator payout stayed secured
              while keeping the final invoice fair against the lower-than-planned
              completion count.
            </p>
          </div>
          <div className="endix-stat-list">
            <div className="endix-stat-row">
              <span className="endix-stat-label">Silver activations · 26 × €50</span>
              <span className="endix-stat-num">€1,300</span>
              <span className="endix-stat-note">Creator payout, Silver tier.</span>
            </div>
            <div className="endix-stat-row">
              <span className="endix-stat-label">Bronze activations · 6 × €20</span>
              <span className="endix-stat-num">€120</span>
              <span className="endix-stat-note">Creator payout, Bronze tier.</span>
            </div>
            <div className="endix-stat-row">
              <span className="endix-stat-label">Adjusted setup / management fee</span>
              <span className="endix-stat-num">€80</span>
              <span className="endix-stat-note">
                Reduced to keep the invoice fair against actual completions.
              </span>
            </div>
            <div className="endix-stat-row is-total">
              <span className="endix-stat-label">Final campaign cost</span>
              <span className="endix-stat-num">€1,500</span>
              <span className="endix-stat-note">Billed against the €2,000 prepay.</span>
            </div>
            <div className="endix-stat-row">
              <span className="endix-stat-label">Prepaid amount</span>
              <span className="endix-stat-num">€2,000</span>
              <span className="endix-stat-note">Originally invoiced at planning.</span>
            </div>
            <div className="endix-stat-row is-total">
              <span className="endix-stat-label">Reimbursement to Endix</span>
              <span className="endix-stat-num">€500</span>
              <span className="endix-stat-note">€2,000 − €1,500.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== CREATOR HIGHLIGHTS =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 32 }}>
            <span className="cs-tag">Creator highlights</span>
            <h2>Where the live attention concentrated.</h2>
            <p>
              Two angles: creators who delivered the biggest live audience, and
              creators who stretched playtime well beyond the paid minimum. The
              two lists overlap meaningfully.
            </p>
          </div>

          <h3 style={{ marginBottom: 10 }}>Highest live visibility</h3>
          <div className="endix-top">
            {highestVisibility.map((c, i) => (
              <div key={c.name} className="endix-top-row">
                <span className="endix-top-rank">#{i + 1}</span>
                <span className="endix-top-name">{c.name}</span>
                <span className="endix-top-cell">{c.avg} avg</span>
                <span className="endix-top-cell">{c.peak} peak · {c.hours}</span>
                <span className="endix-top-val">{c.vh.toFixed(1)} vh</span>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: 36, marginBottom: 10 }}>Longest verified activations</h3>
          <div className="endix-top">
            {longestActivations.map((c, i) => (
              <div key={c.name} className="endix-top-row">
                <span className="endix-top-rank">#{i + 1}</span>
                <span className="endix-top-name">{c.name}</span>
                <span className="endix-top-cell">{c.avg} avg · {c.peak} peak</span>
                <span className="endix-top-cell">{c.hours} streamed</span>
                <span className="endix-top-val">{c.vh.toFixed(1)} vh</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== SIDE QUEST ENGAGEMENT =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Side quest engagement</span>
            <h2>Booth proof, EXPO clips, wishlist signals.</h2>
            <p>
              Verified creators showcased every required booth area and provided
              proof for each section visited. The campaign also generated
              buddy/event participation and social support where creators reinforced
              the buddy side quest through posts tagging Endix.
            </p>
          </div>
          <div className="endix-stat-list">
            <div className="endix-stat-row">
              <span className="endix-stat-label">StreamQuest photobooth / event proof</span>
              <span className="endix-stat-num">28</span>
              <span className="endix-stat-note">Verified.</span>
            </div>
            <div className="endix-stat-row">
              <span className="endix-stat-label">EXPO clip / Bring a friend</span>
              <span className="endix-stat-num">29</span>
              <span className="endix-stat-note">Verified.</span>
            </div>
            <div className="endix-stat-row">
              <span className="endix-stat-label">Wishlist signal proof</span>
              <span className="endix-stat-num">21</span>
              <span className="endix-stat-note">Verified.</span>
            </div>
          </div>
          <p className="cs-muted" style={{ marginTop: 22 }}>
            Additional social/content support appeared across Bluesky, Instagram,
            TikTok, Twitch, X/Twitter and YouTube.
          </p>
        </div>
      </section>

      {/* =============== FULL CREATOR TABLE =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 24 }}>
            <span className="cs-tag">Ordered creator log</span>
            <h2>All named applications, in submission order.</h2>
            <p>
              57 named rows below: 32 completed, 17 approved without final submission,
              and 8 late/full applications. The remaining count to reach 75 total
              applications is made up of 11 anonymous approved slots and 7 open or
              rejected application records — kept as count-level reconciliation
              rather than padding this table.
            </p>
          </div>
          <CreatorTable />
        </div>
      </section>

      {/* =============== FOOTER =============== */}
      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="cs-shell">
          <div className="endix-foot">
            <span>Prepared by StreamQuest for Endix · Confidential client report</span>
            <form action={signOutAction}>
              <button type="submit" className="endix-foot-signout">Sign out</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
