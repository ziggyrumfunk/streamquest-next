import type { Metadata } from "next";
import "@/app/redesign.css";
import "@/app/case-studies/case-studies.css";
import "./ludeo.css";

/* ============================================================
   /proposals/ludeo-shortform
   Unlisted proposal page for Ludeo, kept short enough to present
   on a call. No nav entry, no sitemap entry, noindex, disallowed in
   robots.txt. Client-facing copy only: no creator payouts, margins
   or internal planning material belongs here.
   ============================================================ */

export const metadata: Metadata = {
  title: "StreamQuest × Ludeo: short-form pilot proposal",
  description:
    "Short-form pilot proposal for Ludeo: a €3,000 budget-led managed creator campaign with a planning target of approximately 8 to 10 original videos.",
  robots: { index: false, follow: false },
};

const L = "/media/ludeo";
const SQ_LOGO = "/firebase-public/Logos%20Partner/streamquest%20logo.webp";

const glance = [
  {
    stat: "8 to 10",
    label: "Planning target",
    sub: "Original videos. Depends on the creator mix and budget, not guaranteed.",
  },
  {
    stat: "3 tiers",
    label: "Curated creators",
    sub: "Bronze, Silver and Gold, selected for the brief. No fixed split.",
  },
  {
    stat: "€3,000",
    label: "Total budget",
    sub: "Setup, management, creator fees, rewards and reporting. Ex VAT.",
    budget: true,
  },
  {
    stat: "€0",
    label: "Extra invoices",
    sub: "No CPM, milestone or success-fee invoices.",
  },
];

const beats = [
  {
    label: "Explain",
    title: "What Ludeo is",
    body: "In the creator's own words, in a few seconds. The message above is the brief; the delivery is theirs.",
  },
  {
    label: "Show",
    title: "Two to three Playables",
    body: "Picked by the creator from the Playables bank, so they work with games they actually want to play.",
  },
  {
    label: "Invite",
    title: "A quick Discord call to action",
    body: "Weekly activities, new games, prizes and game keys. The video says Playables run on desktop.",
  },
];

const budgetRows = [
  "Creator recruitment and curation",
  "Original videos on creator-owned TikTok, Reels or Shorts",
  "Briefing, review and coordination",
  "Creator fees and capped performance rewards",
  "One consolidated report",
];

const tiers = [
  { tier: "Bronze", cls: "is-bronze", views: "1,000 to 9,999", role: "Niche coverage and creative tests" },
  { tier: "Silver", cls: "is-silver", views: "10,000 to 49,999", role: "The core of the campaign" },
  { tier: "Gold", cls: "is-gold", views: "50,000+", role: "Proven short-form accounts, with a capped breakout upside where enabled" },
];

const steps = [
  { label: "Confirm", body: "Brief, Playables bank, Discord wording, audience and the €3,000 budget agreed." },
  { label: "Recruit", body: "We shortlist creators, agree the mix with you and reserve every reward inside the budget." },
  { label: "Create", body: "Creators produce, we review, they publish in waves on their own accounts." },
  { label: "Report", body: "Native analytics collected after each video's first 30 days, creators settled, one report to Ludeo." },
];

const breakouts = [
  { milestone: "First breakout", t1: "200k views and Q of at least 2,000", t2: "250k views and Q of at least 2,500" },
  { milestone: "Second breakout", t1: "500k views and Q of at least 5,000", t2: "625k views and Q of at least 6,250" },
];

export default function LudeoShortformProposalPage() {
  return (
    <main className="rd cs-wrap ludeo-wrap">
      {/* =============== HERO =============== */}
      <section className="cs-hero">
        <div
          className="cs-hero-bg ld-hero-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url('${L}/hero-frame.webp')` }}
        />
        <div className="cs-shell cs-hero-inner">
          <div className="ld-lockup" aria-label="StreamQuest and Ludeo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SQ_LOGO} alt="StreamQuest" />
            <span className="ld-x" aria-hidden="true">×</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${L}/ludeo-logo-light.svg`} alt="Ludeo" />
          </div>
          <span className="cs-eyebrow">Short-form pilot proposal</span>
          <h1>Show the moment. Explain Ludeo. Invite players in.</h1>
          <p className="cs-hero-lead">
            Original short-form videos, made and published by selected creators. Each one
            explains Ludeo, shows a few Playables and sends viewers to your Discord. StreamQuest
            selects the creators, briefs them, reviews the videos and reports back.
          </p>
          <p className="ld-small-print">
            Proposal subject to agreed scope, creator availability and written terms. Past creator
            performance is no guarantee of views or conversions.
          </p>
        </div>
      </section>

      {/* =============== AT A GLANCE =============== */}
      <section className="cs-kpi-strip">
        <div className="cs-shell">
          <div className="ld-glance">
            {glance.map((g) => (
              <div key={g.label} className={`ld-glance-tile${g.budget ? " is-budget" : ""}`}>
                <div className="ld-glance-stat">{g.stat}</div>
                <div className="ld-glance-label">{g.label}</div>
                <div className="ld-glance-sub">{g.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== THE MESSAGE =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">The message</span>
            <h2>What every creator gets across.</h2>
          </div>
          <blockquote className="ld-quote">
            Ludeo turns gameplay moments into instantly playable experiences. Instead of just
            watching a clip of a game, anyone can click it and play that exact moment themselves
            in the browser, no download or install needed. We call these moments Ludeos.
          </blockquote>
          <div className="ld-beats">
            {beats.map((b) => (
              <div key={b.label} className="ld-beat">
                <span className="ld-beat-label">{b.label}</span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
          <div className="ld-art-strip">
            {["game-coh3", "game-cronos", "game-payday3"].map((f) => (
              <div key={f} className="ld-art">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${L}/${f}.webp`} alt="" loading="lazy" />
              </div>
            ))}
          </div>
          <p className="ld-art-caption">Game artwork from ludeo.com. Creators pick from the Playables bank you supply.</p>
        </div>
      </section>

      {/* =============== THE CAMPAIGN =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">The campaign</span>
            <h2>One budget, shaped around the right creators.</h2>
          </div>
          <div className="ld-budget">
            <div className="ld-budget-head">
              <div className="ld-budget-num">€3,000</div>
              <div className="ld-budget-lbl">Total campaign budget, ex VAT</div>
              <div className="ld-budget-note">
                Management, creator fees and every agreed reward sit inside it.
              </div>
            </div>
            <div className="ld-budget-body">
              {budgetRows.map((r) => (
                <div key={r} className="ld-budget-row">
                  <span>{r}</span>
                  <em>Included</em>
                </div>
              ))}
              <div className="ld-budget-foot">
                Planning target: approximately 8 to 10 original videos, subject to creator mix,
                recruitment and budget; not a guaranteed minimum or fixed quantity.
              </div>
            </div>
          </div>
          <p style={{ maxWidth: 760, marginTop: 28 }}>
            The budget leads, not a fixed video count. More smaller creators means more videos;
            higher-reach creators or more reward headroom means fewer. StreamQuest settles every
            creator. Ludeo gets one invoice and nothing extra, whatever the videos do.
          </p>
        </div>
      </section>

      {/* =============== CREATORS =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">Creators</span>
            <h2>Curated for the explanation, not the follower count.</h2>
            <p>
              We look at recent short-form performance, audience fit, production quality and
              reliability. Twitch numbers alone do not qualify anyone.
            </p>
          </div>
          <div className="ld-table-wrap">
            <table className="ld-table">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Recent median views per original</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t) => (
                  <tr key={t.tier}>
                    <td><span className={`ld-tier ${t.cls}`}>{t.tier}</span></td>
                    <td className="is-num">{t.views}</td>
                    <td>{t.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ maxWidth: 760, marginTop: 24 }}>
            <p>
              T1 and T2 audiences are both in from the start. T1 covers the EU, the United States,
              Canada, the United Kingdom, Norway, Switzerland, Iceland, Australia and New Zealand;
              T2 covers other approved markets. Creators in both earn the same rewards; outside T1
              the performance thresholds sit 25% higher.
            </p>
            <p>Each creator can submit up to two videos.</p>
          </div>
        </div>
      </section>

      {/* =============== EVERY VIDEO =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">Every video</span>
            <h2>A short brief, then creative freedom.</h2>
            <ul className="cs-list">
              <li>Vertical, roughly 20 to 45 seconds, edited rather than a raw clip.</li>
              <li>Explains what Ludeo is.</li>
              <li>Shows two to three Playables from the bank.</li>
              <li>Ends with a quick invite to your Discord.</li>
              <li>Published on the creator&rsquo;s own TikTok, Reels or Shorts account.</li>
            </ul>
            <p>
              Beyond that, no script and no mandated hooks. The creator&rsquo;s own voice is the
              point.
            </p>
          </div>
        </div>
      </section>

      {/* =============== HOW IT RUNS =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">How it runs</span>
            <h2>Four steps, one report.</h2>
          </div>
          <ol className="ld-steps">
            {steps.map((s) => (
              <li key={s.label} className="ld-step">
                <span className="ld-step-label">{s.label}</span>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =============== CREATOR REWARDS =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">Creator rewards</span>
            <h2>Performance upside for creators. No extra bill for Ludeo.</h2>
            <p>
              Creators get a publication fee and can unlock capped extra rewards on eligible views
              and weighted engagement (likes, distinct commenters and shares). Selected Gold
              videos can carry a capped breakout bonus, funded inside the budget before booking.
            </p>
          </div>
          <div className="ld-table-wrap">
            <table className="ld-table">
              <thead>
                <tr>
                  <th>Milestone</th>
                  <th>T1 audience</th>
                  <th>T2 audience</th>
                </tr>
              </thead>
              <tbody>
                {breakouts.map((b) => (
                  <tr key={b.milestone}>
                    <td><strong>{b.milestone}</strong></td>
                    <td>{b.t1}</td>
                    <td>{b.t2}</td>
                  </tr>
                ))}
                <tr>
                  <td><strong>Additional client charge</strong></td>
                  <td className="is-zero">€0</td>
                  <td className="is-zero">€0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="ld-statement">
            Ludeo&rsquo;s price remains €3,000 ex VAT whether the videos underperform, hit their
            targets or go viral.
          </div>
        </div>
      </section>

      {/* =============== REPORTING =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">Reporting</span>
            <h2>What comes back after 30 days.</h2>
            <ul className="cs-list">
              <li>Every accepted video, with creator, platform, link and publication date.</li>
              <li>Native views, likes, comments and shares per video, plus medians and totals.</li>
              <li>Audience country evidence where the platform supports it.</li>
              <li>Discord invite activity where the route is tested.</li>
            </ul>
            <p>
              Every creator submits native analytics for their video. Public view counters or
              typed numbers do not count.
            </p>
          </div>
        </div>
      </section>

      {/* =============== RIGHTS AND WHAT WE NEED =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div className="cs-split">
            <div>
              <span className="cs-tag">Rights and terms</span>
              <h2>Clear scope before anyone starts.</h2>
              <ul className="cs-list">
                <li>Creators keep ownership. Organic placement on their own channels is included.</li>
                <li>Paid use, re-uploads, raw files, extra platforms or languages are quoted separately.</li>
                <li>One invoice, after the plan and contract are agreed and before production starts.</li>
                <li>Product claims, Playables and Discord wording are approved by Ludeo before scripts are locked.</li>
              </ul>
            </div>
            <div>
              <span className="cs-tag">What we need from Ludeo</span>
              <h2>Six things to get going.</h2>
              <ul className="cs-list">
                <li>The Playables bank and access for recording.</li>
                <li>The approved explanation of Ludeo and the desktop note.</li>
                <li>Target countries and languages, and preferred platforms.</li>
                <li>The Discord link and current wording for activities and prizes.</li>
                <li>One person for approvals and scheduling.</li>
                <li>A yes on the scope and the €3,000 budget.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =============== CLOSING =============== */}
      <section className="ld-close" aria-label="Closing">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ld-close-img" src={`${L}/game-coh3.webp`} alt="" loading="lazy" />
        <div className="ld-close-veil" aria-hidden="true" />
        <div className="cs-shell ld-close-inner">
          <span className="cs-tag">Next step</span>
          <h2>A focused first test, with room to grow.</h2>
          <p>
            Start with one budget, a curated creator mix and clear explanations. Use the results
            to decide what Ludeo should repeat, refine or scale next.
          </p>
          <a className="ld-contact" href="mailto:contact@streamquest.io">contact@streamquest.io</a>
          <p className="ld-support-line">
            €3,000 total budget · Curated creator mix · Approximately 8 to 10 originals targeted,
            not guaranteed · Ex VAT
          </p>
        </div>
      </section>

      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="cs-shell">
          <div className="ld-foot">
            <span>Prepared by StreamQuest for Ludeo · September 2026 · A proposal, not a confirmation of purchase</span>
            <span>StreamQuest</span>
          </div>
        </div>
      </section>
    </main>
  );
}
