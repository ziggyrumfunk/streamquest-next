import type { Metadata } from "next";
import "@/app/redesign.css";
import "@/app/case-studies/case-studies.css";
import "./ludeo.css";

/* ============================================================
   /proposals/ludeo-shortform
   Unlisted proposal page for Ludeo. No nav entry, no sitemap
   entry, noindex, disallowed in robots.txt. Reachable by URL only.
   Client-facing copy only: no creator payouts, margins or
   internal planning material belongs here.
   ============================================================ */

export const metadata: Metadata = {
  title: "StreamQuest × Ludeo: short-form pilot proposal",
  description:
    "Original short-form pilot proposal for Ludeo: a €3,000 budget-led managed creator campaign with a planning target of approximately 8 to 10 original videos.",
  robots: { index: false, follow: false },
};

const L = "/media/ludeo";
const SQ_LOGO = "/firebase-public/Logos%20Partner/streamquest%20logo.webp";
const MAIL = "mailto:contact@streamquest.io";

const glance = [
  {
    stat: "8 to 10",
    label: "Planning target",
    sub: "Original videos, subject to the final creator mix and available budget. Not a guaranteed minimum.",
  },
  {
    stat: "Bronze · Silver · Gold",
    label: "Curated creators",
    sub: "Selected for the brief, with no fixed tier split.",
  },
  {
    stat: "€3,000",
    label: "Total campaign budget",
    sub: "Setup, management, creator payouts, agreed rewards and reporting. Ex VAT.",
    budget: true,
  },
  {
    stat: "€0",
    label: "Additional invoices",
    sub: "No CPM or milestone invoices, whatever the posts do.",
  },
];

const budgetRows = [
  {
    item: "Creator recruitment and curation",
    detail: "Relevant Bronze, Silver and Gold creators. Mix agreed after recruitment and budget checks.",
  },
  {
    item: "Original videos and creator-owned publication",
    detail: "Planning target of approximately 8 to 10 originals. Actual volume depends on the chosen mix and scope.",
  },
  {
    item: "Setup, briefing, coordination and review",
    detail: "Shared brief, access and key coordination, factual and compliance review, scheduling, payment administration.",
  },
  {
    item: "Creator fees, agreed capped performance rewards and analytics checks",
    detail: "Every enabled reward is reserved inside the budget before booking.",
  },
  { item: "Consolidated reporting", detail: "One report covering delivery, attention, audience fit and evidenced actions." },
];

const tiers = [
  { tier: "Bronze", cls: "is-bronze", views: "1,000 to 9,999", role: "Smaller original-content tests and relevant niche coverage" },
  { tier: "Silver", cls: "is-silver", views: "10,000 to 49,999", role: "The core of a balanced creator campaign" },
  { tier: "Gold", cls: "is-gold", views: "50,000+", role: "Proven short-form accounts, with capped breakout upside where expressly enabled" },
];

const t1 = [
  "EU countries",
  "United States",
  "Canada",
  "United Kingdom",
  "Norway",
  "Switzerland",
  "Iceland",
  "Australia",
  "New Zealand",
];

const deliverables = [
  "One original vertical video, normally around 20 to 45 seconds.",
  "A concise explanation of Ludeo in the creator's style.",
  "Demonstration of two selected Playables from the approved bank.",
  "One clear Discord call to action and an accurate desktop-use explanation.",
  "One publication on the named primary creator account.",
  "Appropriate sponsorship disclosure.",
  "One consolidated minor correction round against the agreed brief.",
  "A proposed 60-day live-post commitment, subject to agreed platform, legal and safety exceptions.",
];

const structure = [
  { section: "Opening few seconds", purpose: "A clear hook and the idea behind Ludeo" },
  { section: "Main demonstration", purpose: "Two concise Playable examples with creator commentary" },
  { section: "Closing seconds", purpose: "Desktop reminder and the approved Discord call to action" },
];

const steps = [
  {
    label: "Confirm",
    title: "Confirm the brief and budget",
    body: "Agree objectives, audience, scope, the €3,000 all-in campaign budget, the non-guaranteed planning target, rights and reporting access.",
  },
  {
    label: "Approve",
    title: "Approve the recruitment plan",
    body: "Confirm suitable creators, primary accounts, the achievable mix, full reward reservations and publishing windows before production commitments.",
  },
  {
    label: "Prepare",
    title: "Prepare and review",
    body: "Ludeo supplies approved facts, product access and the Playables bank. StreamQuest coordinates the shared brief and the factual and compliance review.",
  },
  {
    label: "Publish",
    title: "Publish the first wave",
    body: "Review early delivery and audience responses to identify practical creative adjustments.",
  },
  {
    label: "Continue",
    title: "Continue within the funded plan",
    body: "Apply agreed learning to later commissions. Add a suitable creator only when all existing commitments, maximum rewards and remaining operating costs are covered.",
  },
  {
    label: "Close out",
    title: "Close out the campaign",
    body: "Collect and review the mandatory video analytics after each post's 30-day window, settle creator rewards within the package and report results. No success-fee invoice is added.",
  },
];

const breakouts = [
  { milestone: "First breakout", core: "200k eligible views and Q of at least 2,000", other: "250k eligible views and Q of at least 2,500" },
  { milestone: "Second breakout", core: "500k eligible views and Q of at least 5,000", other: "625k eligible views and Q of at least 6,250" },
];

const reporting = [
  { layer: "Delivery", includes: "Accepted originals, creator accounts, post links, publication dates and compliance checks" },
  { layer: "Attention", includes: "Available native views, likes, comments, shares and retention measures; per-post results, medians and totals" },
  { layer: "Audience fit", includes: "Supported native country evidence with its actual denominator and limitations" },
  { layer: "Discovery", includes: "Tested creator-specific link activity and reliable Discord invite-use data" },
  { layer: "Community and product quality", includes: "Retained arrivals or playable starts only where a tested source-to-event method exists" },
];

const needs = [
  "The current Playables bank and the access needed for recording.",
  "Approved product explanation, desktop requirements and factual claims.",
  "The target country and language list and preferred primary platforms.",
  "An approved Discord destination and current community and prize wording.",
  "The practical source-reporting contact and available Discord and product data.",
  "Any intended paid-ad or client repost use, so rights can be quoted correctly.",
  "A single owner for consolidated approvals and scheduling decisions.",
  "Agreement on the budget-led scope, the approximate 8 to 10 video planning target, the achievable creator mix, the €3,000 total budget and final commercial terms.",
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
          <span className="cs-eyebrow">Original short-form pilot proposal</span>
          <h1>Show the moment. Explain Ludeo. Invite players in.</h1>
          <p className="cs-hero-lead">
            Introduce Ludeo through original gaming videos made and published by selected
            creators. The pilot combines a clear product explanation, demonstrations from your
            Playables bank and a focused Discord invitation, while StreamQuest manages creator
            selection, briefing, review and reporting.
          </p>
          <div className="ld-hero-ctas">
            <a href={`${MAIL}?subject=Ludeo%20short-form%20pilot`} className="btn btn-primary btn-xl">
              Discuss this pilot
            </a>
            <a href="#scope" className="btn btn-secondary btn-xl">
              View scope and pricing
            </a>
          </div>
          <p className="ld-small-print">
            Proposal subject to agreed scope, suitable creator availability and written commercial
            terms. Historical creator performance is not a guarantee of campaign views or
            conversions.
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

      {/* =============== CAMPAIGN OBJECTIVE =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div className="cs-split">
            <div>
              <span className="cs-tag">Campaign objective</span>
              <h2>Make the idea understandable, and the next step clear.</h2>
              <p>
                The creative starting point is your brief: Ludeo turns gameplay moments into
                instantly playable browser experiences. A moment becomes a link that opens the
                real game in a desktop browser, no download, so people can try the moment rather
                than only watch it. Each creator will explain the concept, demonstrate selected
                Playables and invite interested viewers into your Discord community, where weekly
                activities, new games, prizes and keys are promoted.
              </p>
              <p>
                The content must make clear that the Playables require desktop. A short-form
                viewer should understand both what makes the experience interesting and how to
                explore it later on a compatible device.
              </p>
              <p>
                This first campaign is a structured learning test: which creators and
                explanations produce relevant attention, useful interest and measurable community
                or product activity where attribution is available?
              </p>
              <h3>Three things every video should communicate</h3>
              <ul className="cs-list">
                <li>What Ludeo does, in a concise and accurate explanation.</li>
                <li>What trying a playable gameplay moment looks like.</li>
                <li>Why and how to explore Ludeo&rsquo;s Discord community, with the desktop requirement clear.</li>
              </ul>
              <p className="cs-muted">
                Product claims, available experiences and community and prize wording will be
                approved with Ludeo before creators begin production.
              </p>
            </div>
            <div className="cs-split-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${L}/ludeo-og.webp`} alt="Ludeo: playable PC game moments from a link" loading="lazy" />
            </div>
          </div>
          <div className="ld-art-strip">
            {["game-coh3", "game-cronos", "game-payday3"].map((f) => (
              <div key={f} className="ld-art">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${L}/${f}.webp`} alt="" loading="lazy" />
              </div>
            ))}
          </div>
          <p className="ld-art-caption">
            Game artwork from ludeo.com. The Playables bank for this pilot is agreed with Ludeo
            before production.
          </p>
        </div>
      </section>

      {/* =============== CAMPAIGN AND BUDGET =============== */}
      <section id="scope" className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">Recommended campaign and budget</span>
            <h2>A €3,000 campaign budget, shaped around the right creators.</h2>
          </div>
          <div className="ld-budget">
            <div className="ld-budget-head">
              <div className="ld-budget-num">€3,000</div>
              <div className="ld-budget-lbl">Total campaign budget, excluding applicable VAT</div>
              <div className="ld-budget-note">
                One budget-led managed campaign. Management, creator fees and every agreed capped
                reward sit inside it.
              </div>
            </div>
            <div className="ld-budget-body">
              {budgetRows.map((r) => (
                <div key={r.item} className="ld-budget-row">
                  <div>
                    <strong>{r.item}</strong>
                    <br />
                    <span>{r.detail}</span>
                  </div>
                  <em>Included</em>
                </div>
              ))}
              <div className="ld-budget-foot">
                Planning target: approximately 8 to 10 original videos, subject to creator mix,
                recruitment and budget; not a guaranteed minimum or fixed quantity.
              </div>
            </div>
          </div>
          <div style={{ maxWidth: 760, marginTop: 34 }}>
            <p>
              We aim to use the budget effectively across relevant creators, rather than commit
              to a fixed number of videos before recruitment. A mix with more smaller creators
              can support more originals; a mix with higher-cost talent or more reserved
              performance upside may support fewer. The planning range is not a minimum delivery
              guarantee, and ten is not an automatic maximum.
            </p>
            <p>
              The target counts original commissioned videos, not reshares or additional uploads
              of the same video. Each approved original includes one agreed primary placement on
              a creator-owned TikTok, Reels or Shorts account. The number of distinct creators is
              reported separately.
            </p>
            <p>
              We agree the achievable recruitment plan, creator mix, reward commitments and
              publishing windows with Ludeo before binding production commitments. If recruitment
              points to a material shortfall against the planning target, we discuss a revised
              mix, timing or scope rather than silently lowering quality or claiming the target
              was met.
            </p>
            <p>
              StreamQuest manages the campaign and individual creator settlements. Ludeo does not
              calculate creator CPMs. The €3,000 includes management and service fees as well as
              creator payouts and agreed rewards; it is not a €3,000 pass-through creator wallet.
              Strong performance cannot generate an additional invoice. Correction, cancellation
              and non-delivery treatment are agreed in the contract.
            </p>
          </div>
        </div>
      </section>

      {/* =============== CREATOR SELECTION =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">Creator selection and audience fit</span>
            <h2>Curated for the explanation, not just the view count.</h2>
            <p>
              We assess relevant original gaming content, recent short-form performance, audience
              fit, production quality, reliability and the evidence available for reporting.
              Twitch activity or follower count alone does not determine short-form eligibility.
            </p>
          </div>
          <div className="ld-table-wrap">
            <table className="ld-table">
              <thead>
                <tr>
                  <th>Available tier</th>
                  <th>Recent median short-form qualification</th>
                  <th>Role in the campaign</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t) => (
                  <tr key={t.tier}>
                    <td><span className={`ld-tier ${t.cls}`}>{t.tier}</span></td>
                    <td className="is-num">{t.views} eligible views per reviewed original</td>
                    <td>{t.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ maxWidth: 760, marginTop: 26 }}>
            <p>
              These are historical selection standards, not promised views for the commissioned
              videos. The normal review uses ten relevant originals published within the previous
              120 days, comparing their first-30-day performance. The proposed account, platform
              metric and supporting evidence will be identified before booking.
            </p>
            <h3>Audience countries and languages</h3>
            <p>
              We will agree the audience countries and languages with Ludeo before selection. The
              proposed T1, high-buying-market campaign group comprises:
            </p>
          </div>
          <div className="ld-chips">
            {t1.map((c) => (
              <span key={c} className="ld-chip">{c}</span>
            ))}
          </div>
          <div style={{ maxWidth: 760, marginTop: 22 }}>
            <p>
              Other priority markets can be added before booking where supported by Ludeo&rsquo;s
              product and audience goals. This is a commercial targeting convention, not an
              official universal Tier-1 classification.
            </p>
            <p>
              T1 selection normally requires at least 60% of relevant recent native audience
              activity in the agreed countries. The denominator and reporting limits must be
              clear. A creator&rsquo;s nationality does not establish audience location, and
              English-language content alone does not prove a US or UK audience. Historical
              selection does not guarantee the new video&rsquo;s exact country mix.
            </p>
            <p>
              Creators with other audience profiles can be included where Ludeo agrees that those
              audiences are relevant. They can earn the same rewards, but their view and
              weighted-engagement thresholds are 25% higher. This affects performance rewards, not
              the historical Bronze, Silver and Gold admission floors. Unknown geography is
              unverified, not automatically assigned to the other-market band.
            </p>
          </div>
        </div>
      </section>

      {/* =============== DELIVERABLES AND CREATIVE =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">What every original includes</span>
            <h2>A focused brief with room for the creator&rsquo;s own voice.</h2>
          </div>
          <ul className="ld-checklist">
            {deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <div style={{ maxWidth: 760, marginTop: 26 }}>
            <p>
              The two-Playable scope narrows the initial two-to-three-game suggestion and needs
              Ludeo&rsquo;s approval. Three can be included where specifically agreed without
              expanding the standard workload. Material changes of concept, additional capture or
              extra revisions are separately scoped.
            </p>
            <p>
              The final brief will identify approved product claims, accessible Playables, any
              capture requirements and practical link placement on each account. Creators must
              not imply that the desktop Playables run directly on a phone.
            </p>
          </div>

          <div style={{ maxWidth: 760, marginTop: 56 }}>
            <span className="cs-tag">Creative directions</span>
            <h2>Test two clear explanations of the same product.</h2>
          </div>
          <div className="ld-directions">
            <article className="ld-direction">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${L}/game-cronos.webp`} alt="" loading="lazy" />
              <span className="ld-direction-tag">Direction A</span>
              <h3>Play the moment</h3>
              <p>
                Start with a compelling gameplay moment. Explain how Ludeo lets someone try that
                experience on desktop, demonstrate the chosen Playables and finish with the agreed
                Discord invitation.
              </p>
            </article>
            <article className="ld-direction">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${L}/game-payday3.webp`} alt="" loading="lazy" />
              <span className="ld-direction-tag">Direction B</span>
              <h3>Discover something new</h3>
              <p>
                Start with the creator exploring supported experiences. Show what makes two of
                them interesting, explain the playable-moment concept and invite viewers to
                discover more through Ludeo&rsquo;s community.
              </p>
            </article>
          </div>
          <div className="ld-table-wrap">
            <table className="ld-table">
              <thead>
                <tr>
                  <th>Approximate section</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {structure.map((s) => (
                  <tr key={s.section}>
                    <td><strong>{s.section}</strong></td>
                    <td>{s.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="cs-muted" style={{ maxWidth: 760, marginTop: 16 }}>
            Illustrative video structure, not a mandatory script. Creators retain room to
            communicate naturally. These are proposed test directions, not proven winning hooks or
            guarantees of virality.
          </p>
        </div>
      </section>

      {/* =============== DELIVERY PROCESS =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">Delivery process</span>
            <h2>Shared preparation. Flexible publishing waves. One consolidated report.</h2>
          </div>
          <ol className="ld-steps">
            {steps.map((s) => (
              <li key={s.label} className="ld-step">
                <span className="ld-step-label">{s.label}</span>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="cs-muted" style={{ maxWidth: 760, marginTop: 22 }}>
            Publishing dates and the number of waves depend on creator availability, product
            access, the funded plan and approvals. Early results can inform later creative work;
            they do not release another creator&rsquo;s reserved reward budget. Material changes
            or a likely significant shortfall against the plan must be discussed with Ludeo. Each
            approved creator commission still has its own concrete delivery obligation.
          </p>
        </div>
      </section>

      {/* =============== CREATOR REWARDS =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">Creator rewards inside the budget</span>
            <h2>Performance incentives for creators. No extra bill for Ludeo.</h2>
            <p>
              Creators receive an agreed publication fee and can unlock additional rewards through
              eligible organic views and weighted engagement. Both audience bands have the same
              tier-based reward ceilings. Creators outside the agreed T1 audience band need 25%
              more views and engagement to reach the same performance reward.
            </p>
            <h3>How engagement is weighted</h3>
          </div>
          <div className="ld-chips">
            <span className="ld-chip"><strong>1</strong> point per like</span>
            <span className="ld-chip"><strong>3</strong> points per distinct eligible commenter account</span>
            <span className="ld-chip"><strong>5</strong> points per share action, capped at the like and comment subtotal</span>
          </div>
          <div style={{ maxWidth: 760, marginTop: 18 }}>
            <p>
              Repeated comments by the same account count once; native shares are actions, not
              unique people. Views alone do not establish reward eligibility.
            </p>
            <h3>Capped breakout opportunity, selected Gold commissions</h3>
            <p>
              Selected Gold commissions may include the following capped breakout opportunity,
              only if enabled and fully funded before booking. The number of enabled commissions
              depends on the final budget plan.
            </p>
          </div>
          <div className="ld-table-wrap">
            <table className="ld-table">
              <thead>
                <tr>
                  <th>Creator milestone</th>
                  <th>T1 audience threshold</th>
                  <th>Other approved audience threshold</th>
                </tr>
              </thead>
              <tbody>
                {breakouts.map((b) => (
                  <tr key={b.milestone}>
                    <td><strong>{b.milestone}</strong></td>
                    <td>{b.core}</td>
                    <td>{b.other}</td>
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
          <div style={{ maxWidth: 760, marginTop: 22 }}>
            <p>
              Both stages also require the agreed audience-fit evidence and mandatory native video
              analytics. Non-enabled commissions have ordinary rewards only, clearly stated before
              acceptance. There is no first-come pool that can erase another booked creator&rsquo;s
              entitlement; all enabled maximums are reserved individually.
            </p>
            <p>
              Thresholds apply to each named primary post during its first 30 days; campaign totals
              and unbooked cross-posts are not pooled. Paid, identified artificial and self or
              team activity are excluded. The 25% uplift is a proposed campaign rule, not a proven
              estimate of relative country value. The agreed creator maximums remain capped even
              above the final milestone.
            </p>
            <div className="ld-statement">
              Ludeo&rsquo;s price remains €3,000 ex VAT whether the posts underperform, meet their
              targets or go viral.
            </div>
          </div>
        </div>
      </section>

      {/* =============== MEASUREMENT AND REPORTING =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">Measurement and reporting</span>
            <h2>Separate delivered content, observed attention and evidenced actions.</h2>
          </div>
          <div className="ld-table-wrap">
            <table className="ld-table">
              <thead>
                <tr>
                  <th>Reporting layer</th>
                  <th>What the report can include</th>
                </tr>
              </thead>
              <tbody>
                {reporting.map((r) => (
                  <tr key={r.layer}>
                    <td><strong>{r.layer}</strong></td>
                    <td>{r.includes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ maxWidth: 760, marginTop: 26 }}>
            <p>
              Native views are not deduplicated people. Discord invite uses are not automatically
              unique new members, retained members or playable users. Attribution is not proof
              that every action was caused incrementally by the campaign.
            </p>
            <p>
              <strong>Every creator must submit native analytics for the commissioned video as proof of performance.</strong>{" "}
              The evidence must identify the account and post, publication and reporting period,
              native views and available engagement metrics. Relevant audience, retention,
              traffic-source and promotion screens are included where supported. StreamQuest may
              request an export or continuous dashboard recording to validate the submission.
              Self-reported numbers or a public view count alone do not suffice.
            </p>
            <p>
              The evidence route and treatment of platform-unavailable fields are agreed before
              booking. Missing fields are not invented or silently treated as zero. Performance
              rewards are settled only against verified evidence or an expressly agreed auditable
              fallback. Accepted production and publication fees are not retrospectively erased
              because a platform metric is unavailable. No process eliminates all fraud.
            </p>
            <p>
              Ludeo should define what a meaningful retained or activated arrival looks like and
              identify who can supply the relevant data. If deeper attribution is unavailable, the
              pilot can still test explanation and discovery, with that reporting limit explicit.
              No new integration is represented as already operational.
            </p>
            <p className="cs-muted">
              This pilot uses awareness and engagement rewards. It does not apply Steam wishlist
              payout conditions or guarantee views, Discord joins, playable starts, wishlists or
              sales.
            </p>
          </div>
        </div>
      </section>

      {/* =============== ONE PURCHASE + TERMS =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div className="cs-split">
            <div>
              <span className="cs-tag">One clearly scoped purchase</span>
              <h2>A single campaign offer, not a menu of escalating invoices.</h2>
              <p>
                The proposal is a €3,000 budget-led managed campaign, ex VAT, with a planning
                target of approximately 8 to 10 originals rather than a promised quantity. It
                includes management, creator compensation, verification and any specifically
                enabled, budgeted capped reward opportunities.
              </p>
              <p>
                This page does not sell a fixed-count package or an automatic success-fee upgrade.
                Further originals can be recruited within the existing budget where the approved
                plan and fully funded commitments allow. Work beyond that budget, paid-media rights
                or material scope changes require separate written agreement; none is added
                automatically because views increase.
              </p>
            </div>
            <div>
              <span className="cs-tag">Rights and commercial terms</span>
              <h2>Clear scope before anyone starts creating.</h2>
              <p>
                Creators retain ownership. The agreed campaign scope covers original production
                and the agreed organic creator-channel placement. Client re-uploads, paid
                advertising, Spark and partnership-ad permissions, raw files, exclusivity,
                additional languages and extra platforms require separately agreed rights and
                pricing.
              </p>
              <p>
                Do not boost a commissioned post during its organic measurement window without
                first agreeing authorization, rights and the measurement and settlement method.
                Client- or creator-funded paid activity does not become organic milestone
                performance.
              </p>
              <p>
                Lower-than-expected reach does not itself reduce the fixed campaign fee. Missing or
                materially non-compliant deliverables require the agreed correction, replacement
                or proportionate credit process. Lower-tier creators are not substituted without
                agreement. Material scope changes require written approval, not automatic fees
                outside the campaign ceiling.
              </p>
              <p>
                Proposed payment schedule: invoice the €3,000 managed-campaign fee after the
                recruitment plan, feasible scope and contract are agreed, with payment before
                production commitments. No subsequent CPM or milestone invoice is issued. The
                contract sets out the planning target, funded commitments, treatment of material
                delivery shortfalls, cancellation and client-approval deadlines; a non-guaranteed
                target does not waive responsibility for booked deliverables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =============== WHAT WE NEED FROM LUDEO =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 760 }}>
            <span className="cs-tag">What we need from Ludeo</span>
            <h2>Eight things that let us book with confidence.</h2>
          </div>
          <ul className="ld-checklist">
            {needs.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* =============== CLOSING =============== */}
      <section className="ld-close" aria-label="Closing">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ld-close-img" src={`${L}/game-coh3.webp`} alt="" loading="lazy" />
        <div className="ld-close-veil" aria-hidden="true" />
        <div className="cs-shell ld-close-inner">
          <span className="cs-tag">Closing</span>
          <h2>A focused first test, with room to grow.</h2>
          <p>
            Start with a €3,000 budget, original explanations and a creator mix selected for the
            brief. We plan for approximately 8 to 10 originals and confirm what the funded
            recruitment plan can support. Use the results to decide what Ludeo should repeat,
            refine or scale next.
          </p>
          <div className="ld-hero-ctas" style={{ marginTop: 0 }}>
            <a href={`${MAIL}?subject=Ludeo%20short-form%20pilot%3A%20the%20%E2%82%AC3%2C000%20campaign`} className="btn btn-primary btn-xl">
              Discuss the €3,000 campaign
            </a>
            <a href={`${MAIL}?subject=Ludeo%20short-form%20pilot%3A%20scope%20changes`} className="btn btn-secondary btn-xl">
              Request changes to the scope
            </a>
          </div>
          <p className="ld-support-line">
            €3,000 total campaign budget · Curated creator mix · Approximately 8 to 10 originals
            targeted, not guaranteed · Excluding applicable VAT
          </p>
        </div>
      </section>

      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="cs-shell">
          <div className="ld-foot">
            <span>Prepared by StreamQuest for Ludeo · September 2026 · A proposal, not a confirmation of purchase</span>
            <span>contact@streamquest.io</span>
          </div>
        </div>
      </section>
    </main>
  );
}
