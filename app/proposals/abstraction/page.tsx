import type { Metadata } from "next";
import { isUnlocked } from "./session";
import { signInAction, signOutAction } from "./actions";
import RumfunkFrame from "./RumfunkFrame";
import "./abstraction.css";

/* ============================================================
   /proposals/abstraction
   Password-gated marketing partnership proposal for Abstraction
   (Ralph Egas and Guy DeRosa). Built from "StreamQuest x Abstraction
   Marketing Partnership Proposal" (26 Sep 2026), cut down for the web.
   Styled in Abstraction's own black and yellow. No nav entry, no
   sitemap entry, noindex, and /proposals is disallowed in robots.txt.
   ============================================================ */

export const metadata: Metadata = {
  title: "StreamQuest × Abstraction: marketing partnership proposal",
  description: "Private StreamQuest proposal for Abstraction.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { searchParams: { err?: string } };

const SQ_LOGO = "/firebase-public/Logos%20Partner/streamquest%20logo.webp";
const ABX_LOGO = "/media/proposals/abstraction/abstraction-logo.svg";

/** GDC Festival of Gaming 2027 opens on 1 March 2027. */
const GDC_START = Date.UTC(2027, 2, 1);

function daysUntilGdc(): number | null {
  const days = Math.ceil((GDC_START - Date.now()) / 86_400_000);
  return days > 0 ? days : null;
}

const heard = [
  {
    lead: "Specialists, not capacity.",
    body: "You step in for short, critical problems like performance and multiplayer scaling, and stay out of the race to the bottom.",
  },
  {
    lead: "The brand is ready.",
    body: "Beyond Boundaries and its guidelines are in place. What is missing is a steady flow of content that puts them to work.",
  },
  {
    lead: "Patterns are a story.",
    body: "Nineteen years of experience, codified into transparently priced solutions. That is worth talking about.",
  },
  {
    lead: "Guy leads the direction.",
    body: "He knows the company best and owns the plan. His time belongs to sales and relationships, not to posting and editing.",
  },
];

const goals = [
  { title: "Active on socials", body: "A steady, recognisable presence where studio decision makers spend their time." },
  { title: "Brand and story", body: "The bold identity in everything, from a LinkedIn post to a jacket at GDC." },
  { title: "Thought leadership", body: "Ralph, Guy and the engineers become the people others quote on hard technical problems." },
];

const pillars = [
  {
    title: "War Stories",
    body: "How the team solved a critical problem, told without breaking an embargo. Clients and titles stay unnamed; the engineering does the talking.",
  },
  { title: "Patterns", body: "Why specialists beat capacity, and what nineteen years of codified knowledge looks like." },
  { title: "The people", body: "Short interviews and behind the scenes that turn engineers into familiar faces." },
  { title: "Out in the world", body: "Events, merch and moments in the spirit of the flaming tour bus to Cologne." },
];

const channels = [
  { name: "LinkedIn", note: "The main channel: the company page plus Ralph's and Guy's own profiles, because most B2B reach comes from people.", weight: 100 },
  { name: "Reddit", note: "Real participation in developer communities: deep technical write-ups and AMAs, no hard selling.", weight: 72 },
  { name: "X", note: "Industry conversation, event updates and sharing the LinkedIn work.", weight: 50 },
  { name: "Instagram / Meta", note: "Culture, team and event visuals.", weight: 40 },
  { name: "TikTok", note: "Optional, for short clips from shoots and events if it proves worthwhile.", weight: 22, optional: true },
];

const month = [
  { title: "Calendar", body: "Next month's content planned and approved in one go, not message by message." },
  { title: "Shoot day", body: "Ziggy films interviews, War Stories and behind the scenes at the studio." },
  { title: "Publishing", body: "2 posts and 3 to 5 stories a week, plus LinkedIn posts for Ralph and Guy in their own tone." },
  { title: "Report", body: "What went out, what worked, and what we suggest next." },
];

const promises = [
  { title: "Embargo-safe", body: "We never name clients or titles, and nothing technical goes out without your sign-off." },
  { title: "Your voices", body: "We draft for Ralph and Guy, supply the photos and clips, and coach what works. They review and post." },
  { title: "Your brand", body: "We build on Beyond Boundaries and check anything brand-related with Guy, so nothing is duplicated." },
];

const brandItems = [
  "1 photo and video shoot at the studio every month",
  "2 social posts a week across LinkedIn, Reddit, X, Instagram/Meta and TikTok",
  "3 to 5 stories a week",
  "About 1 LinkedIn post a week each for Ralph and Guy: drafted, with photos and clips, plus coaching",
  "Thought leadership and War Stories videos from the monthly shoot",
  "Website news and article updates",
  "Merchandise and graphic design",
  "Monthly report and a short weekly alignment call",
];

const growthItems = [
  "In-depth website management, source code provided",
  "Paid advertising on social channels",
  "Ad analytics and tracking",
  "Intro calls booked from ads, with attribution",
];

const extras = [
  { title: "Fairs and events", body: "Priced per event, depending on location and days. Travel and stay at cost. Fair days never replace the monthly shoot." },
  { title: "Merch production", body: "Design is included. Production is quoted per order and billed at cost." },
  { title: "Ad spend", body: "Paid by Abstraction directly to the platforms, on top of the Growth fee." },
];

const funnel = ["LinkedIn ads", "Booking page", "Intro call with Guy", "Logged in your CRM", "Cost per qualified call"];

const growthFacts = [
  {
    title: "Qualified means",
    body: "A decision maker with a concrete technical challenge, a realistic budget and a timeline. We agree the exact definition with Guy before launch.",
  },
  {
    title: "Numbers, honestly",
    body: "Months 1 to 3 test audiences, messages and formats. From month 4 we report cost per qualified call, then cost per client as deals close.",
  },
  {
    title: "Ad budget",
    body: "Start with €500 to €700 a month, paid directly to LinkedIn, and raise it only when campaigns bring in qualified calls.",
  },
];

const road = [
  { date: "November 2026", body: "Merch concepts presented to Guy: premium pieces in the spirit of the leather varsity jacket we showed." },
  { date: "11 December 2026", body: "Merch designs and quantities approved. Apparel of this quality needs 6 to 10 weeks." },
  { date: "1 January 2027", body: "Step up to Growth. Paid campaigns start promoting meetings with Guy at GDC." },
  { date: "February 2027", body: "“Meet us at GDC” posts from Ralph and Guy, with a link to book time, for example in the Business Hall." },
  { date: "12 February 2027", body: "Merch delivered, with two weeks of buffer." },
  { date: "1 to 5 March 2027", body: "GDC Festival of Gaming, Moscone Center, San Francisco. Optional on-site coverage, priced in consultation.", gdc: true },
];

const terms = [
  "Monthly, no minimum term. Either side can stop before the next month starts.",
  "Invoiced monthly in advance. All prices ex VAT.",
  "Two rounds of feedback per piece of content.",
  "Abstraction owns everything published. Raw footage on request.",
  "Switch between packages from any new month.",
];

const nextSteps = [
  "We walk through this proposal with Ralph and Guy.",
  "We agree on the package, Guy's marketing plan and a start date.",
  "Month one: onboarding, the first content calendar and the first studio shoot.",
];

function Lockup() {
  return (
    <div className="abx-lockup" aria-label="StreamQuest and Abstraction">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="abx-lockup-sq" src={SQ_LOGO} alt="StreamQuest" />
      <span className="abx-lockup-x" aria-hidden="true">×</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="abx-lockup-abx" src={ABX_LOGO} alt="Abstraction" />
    </div>
  );
}

export default function AbstractionProposalPage({ searchParams }: Props) {
  if (!isUnlocked()) {
    return (
      <div className="abx abx-lock">
        <div className="abx-lock-card">
          <Lockup />
          <span className="abx-eyebrow">Private proposal</span>
          <h1>Marketing partnership proposal</h1>
          <p>For Ralph and Guy at Abstraction. Enter the access code to continue.</p>
          <form action={signInAction} className="abx-lock-form">
            <label className="abx-sr" htmlFor="abx-password">Access code</label>
            <input
              id="abx-password"
              type="password"
              name="password"
              placeholder="Access code"
              autoComplete="off"
              autoFocus
              required
              className="abx-lock-input"
            />
            <button type="submit" className="abx-btn">Open proposal</button>
          </form>
          {searchParams.err && <p className="abx-lock-err" role="alert">That code did not work. Try again.</p>}
        </div>
      </div>
    );
  }

  const days = daysUntilGdc();

  return (
    <div className="abx">
      {/* =============== HERO =============== */}
      <header className="abx-hero">
        <div className="abx-shell">
          <Lockup />
          <span className="abx-eyebrow">Marketing partnership proposal</span>
          <h1>
            Beyond boundaries,<br /> <span className="abx-mark">out loud.</span>
          </h1>
          <p className="abx-lead">
            Abstraction has nineteen years of hard problems solved and a story almost nobody is
            telling. We become your flexible marketing arm: we plan, shoot, write, post and report,
            so Guy can spend his week on business development.
          </p>
          <p className="abx-byline">
            For Ralph Egas and Guy DeRosa · From Murat Cakir and Ziggy Valiulis · 26 September 2026
          </p>
          <nav className="abx-jump" aria-label="Sections">
            <a href="#plan">The plan</a>
            <a href="#how">How we work</a>
            <a href="#packages">Packages</a>
            <a href="#gdc">Road to GDC</a>
          </nav>
        </div>
      </header>

      {/* =============== AT A GLANCE =============== */}
      <section className="abx-glance" aria-label="At a glance">
        <div className="abx-shell abx-glance-grid">
          <div className="abx-glance-tile">
            <strong>€3,850</strong>
            <span>A month to start</span>
            <em>Brand &amp; Presence, ex VAT</em>
          </div>
          <div className="abx-glance-tile">
            <strong>1 shoot</strong>
            <span>Every month</span>
            <em>At the studio, for interviews and War Stories</em>
          </div>
          <div className="abx-glance-tile">
            <strong>{days ? `${days} days` : "GDC 2027"}</strong>
            <span>{days ? "Until GDC 2027" : "1 to 5 March 2027"}</span>
            <em>1 to 5 March, San Francisco</em>
          </div>
          <div className="abx-glance-tile">
            <strong>Monthly</strong>
            <span>No minimum term</span>
            <em>We would rather earn the next month than lock it in.</em>
          </div>
        </div>
      </section>

      {/* =============== WHAT WE HEARD =============== */}
      <section className="abx-section">
        <div className="abx-shell abx-split">
          <div className="abx-head">
            <span className="abx-eyebrow">What we heard</span>
            <h2>A rare story, and almost nobody telling it.</h2>
            <p>
              Nineteen years and more than 200 shipped projects. The brand is strong; the channels
              have been quiet since last year. GDC in March is the next big moment, with a clean
              runway to build towards it.
            </p>
          </div>
          <ul className="abx-heard">
            {heard.map((h) => (
              <li key={h.lead}>
                <strong>{h.lead}</strong> {h.body}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =============== THE PLAN =============== */}
      <section className="abx-section abx-section-alt" id="plan">
        <div className="abx-shell">
          <div className="abx-head">
            <span className="abx-eyebrow">The plan</span>
            <h2>Three goals. Everything we make serves at least one.</h2>
          </div>
          <div className="abx-goals">
            {goals.map((g) => (
              <div key={g.title} className="abx-goal">
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </div>
            ))}
          </div>

          <div className="abx-stories">
            <div>
              <span className="abx-eyebrow">What we make</span>
              <h2>Four kinds of stories.</h2>
              <ul className="abx-pillars">
                {pillars.map((p) => (
                  <li key={p.title}>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* An example War Stories post, drawn as a LinkedIn post. */}
            <figure className="abx-post">
              <div className="abx-post-card">
                <div className="abx-post-head">
                  <span className="abx-post-avatar" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ABX_LOGO} alt="" />
                  </span>
                  <span className="abx-post-who">
                    <strong>Abstraction</strong>
                    <span>War Stories · 2:14</span>
                  </span>
                </div>
                <p className="abx-post-text">
                  One coastline, months of work, and the moment it finally clicked. Our tech art
                  team on how they fixed it, without naming names.
                </p>
                <div className="abx-titlecard" aria-hidden="true">
                  <span className="abx-titlecard-corner is-tl" />
                  <span className="abx-titlecard-corner is-tr" />
                  <span className="abx-titlecard-corner is-bl" />
                  <span className="abx-titlecard-corner is-br" />
                  <span className="abx-titlecard-kicker">Abstraction presents</span>
                  <span className="abx-titlecard-title">War Stories</span>
                  <span className="abx-titlecard-ep">The shoreline</span>
                  <span className="abx-titlecard-play" />
                </div>
                <div className="abx-post-actions" aria-hidden="true">
                  <span>Like</span>
                  <span>Comment</span>
                  <span>Repost</span>
                  <span>Send</span>
                </div>
              </div>
              <figcaption>
                Example format. Nothing technical or client-related goes out without your sign-off.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* =============== CHANNELS =============== */}
      <section className="abx-section">
        <div className="abx-shell">
          <div className="abx-head">
            <span className="abx-eyebrow">Channels</span>
            <h2>LinkedIn first. People over logos.</h2>
            <p>Quality over quantity: every post should be something Abstraction is proud to put its name on.</p>
          </div>
          <ul className="abx-channels">
            {channels.map((c) => (
              <li key={c.name} className={c.optional ? "is-optional" : undefined}>
                <span className="abx-channel-name">{c.name}</span>
                <span className="abx-channel-bar" aria-hidden="true">
                  <i style={{ width: `${c.weight}%` }} />
                </span>
                <span className="abx-channel-note">{c.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =============== HOW WE WORK =============== */}
      <section className="abx-section abx-section-alt" id="how">
        <div className="abx-shell">
          <div className="abx-head">
            <span className="abx-eyebrow">How we work</span>
            <h2>Guy sets the direction. We do the rest.</h2>
          </div>
          <div className="abx-month">
            <div className="abx-month-rail">
              <span>Every week</span>
              <p>A short alignment call with Guy</p>
            </div>
            <ol className="abx-month-strip">
              {month.map((m) => (
                <li key={m.title}>
                  <h3>{m.title}</h3>
                  <p>{m.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="abx-promises">
            {promises.map((p) => (
              <div key={p.title} className="abx-promise">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== PROOF: RUMFUNK =============== */}
      <section className="abx-section">
        <div className="abx-shell">
          <div className="abx-head">
            <span className="abx-eyebrow">Behind the camera</span>
            <h2>See the work first.</h2>
            <p>
              Ziggy runs Rumfunk, a creative studio for photography, video, branding and social
              media management. These are his shoots, live from rumfunk.nl.
            </p>
          </div>
          <RumfunkFrame />
        </div>
      </section>

      {/* =============== PACKAGES =============== */}
      <section className="abx-section abx-section-alt" id="packages">
        <div className="abx-shell">
          <div className="abx-head">
            <span className="abx-eyebrow">Packages</span>
            <h2>Two packages. Switch any month.</h2>
          </div>
          <div className="abx-packages">
            <div className="abx-package">
              <div className="abx-package-top">
                <h3>Brand &amp; Presence</h3>
                <p className="abx-price">
                  €3,850 <span>/ month</span>
                </p>
                <p className="abx-package-tag">Visibility and voice</p>
              </div>
              <ul className="abx-checks">
                {brandItems.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div className="abx-package is-growth">
              <span className="abx-package-badge">Suggested from 1 January 2027</span>
              <div className="abx-package-top">
                <h3>Growth</h3>
                <p className="abx-price">
                  €5,500 <span>/ month</span>
                </p>
                <p className="abx-package-tag">Everything in Brand &amp; Presence, plus:</p>
              </div>
              <ul className="abx-checks">
                {growthItems.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="abx-statement">
            Our suggestion: start on Brand &amp; Presence now and step up to Growth on 1 January 2027.
            That gives paid campaigns eight weeks before GDC opens and three full months of data by
            the end of March. After GDC, stay on Growth or step back, month by month.
          </p>
          <div className="abx-extras">
            <span className="abx-eyebrow">Not in the monthly fee</span>
            <div className="abx-extras-grid">
              {extras.map((e) => (
                <div key={e.title}>
                  <h3>{e.title}</h3>
                  <p>{e.body}</p>
                </div>
              ))}
            </div>
            <p className="abx-small">All prices ex VAT.</p>
          </div>
        </div>
      </section>

      {/* =============== PAID GROWTH =============== */}
      <section className="abx-section">
        <div className="abx-shell">
          <div className="abx-head">
            <span className="abx-eyebrow">Growth package</span>
            <h2>Ads that fill Guy&apos;s calendar.</h2>
            <p>
              Engineering deals are large and sales cycles long, so we measure honestly instead of
              promising a number up front.
            </p>
          </div>
          <ol className="abx-funnel">
            {funnel.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ol>
          <div className="abx-facts">
            {growthFacts.map((f) => (
              <div key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
          <p className="abx-small">
            Attribution needs a CRM or booking tool on your side, such as HubSpot, Pipedrive or
            Calendly. We set up the tracking and connect it. LinkedIn&apos;s minimum is €10 a day per
            campaign.
          </p>
        </div>
      </section>

      {/* =============== ROAD TO GDC =============== */}
      <section className="abx-section abx-section-alt" id="gdc">
        <div className="abx-shell abx-gdc">
          <div className="abx-head">
            <span className="abx-eyebrow">Road to GDC</span>
            <h2>Arrive at GDC already known.</h2>
            <p>
              Months of War Stories and leadership posts mean the people Guy meets have seen the
              faces and the thinking before the first handshake.
            </p>
            {days && (
              <p className="abx-countdown">
                <strong>{days}</strong>
                <span>days to go</span>
              </p>
            )}
          </div>
          <ol className="abx-road">
            {road.map((r) => (
              <li key={r.date} className={r.gdc ? "is-gdc" : undefined}>
                <span className="abx-road-date">{r.date}</span>
                <p>{r.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="abx-shell">
          <p className="abx-small">
            Sources: event dates from <a href="https://gdconf.com/" target="_blank" rel="noopener noreferrer">gdconf.com</a>;
            merch lead times from{" "}
            <a href="https://www.broidr.com/blog/blogs/what-event-marketers-need-to-know-about-merchandise-lead-times" target="_blank" rel="noopener noreferrer">Broidr</a>{" "}
            and{" "}
            <a href="https://idxbrands.com/how-much-trade-show-merchandise/" target="_blank" rel="noopener noreferrer">IDX</a>.
          </p>
        </div>
      </section>

      {/* =============== TERMS AND NEXT STEPS =============== */}
      <section className="abx-section">
        <div className="abx-shell abx-split">
          <div>
            <span className="abx-eyebrow">Terms</span>
            <h2>Simple on purpose.</h2>
            <ul className="abx-list">
              {terms.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="abx-eyebrow">Next steps</span>
            <h2>Three steps to the first shoot.</h2>
            <ol className="abx-steps">
              {nextSteps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* =============== CLOSE =============== */}
      <section className="abx-close">
        <div className="abx-shell">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="abx-close-mark" src={ABX_LOGO} alt="" />
          <h2>We look forward to telling Abstraction&apos;s story.</h2>
          <p className="abx-sign">Murat Cakir and Ziggy Valiulis, StreamQuest</p>
          <a className="abx-btn is-plain" href="mailto:contact@streamquest.io?subject=StreamQuest%20x%20Abstraction">
            contact@streamquest.io
          </a>
          <form action={signOutAction} className="abx-lock-again">
            <button type="submit">Lock this page</button>
          </form>
        </div>
      </section>
    </div>
  );
}
