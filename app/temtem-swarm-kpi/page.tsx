import type { Metadata } from "next";
import { isUnlocked } from "./session";
import { signInAction, signOutAction } from "./actions";
import SubmissionTable from "./SubmissionTable";
import "@/app/redesign.css";
import "@/app/case-studies/case-studies.css";
import "./temtem.css";

export const metadata: Metadata = {
  title: "Temtem Swarm KPI Report | StreamQuest",
  description: "Client-facing StreamQuest KPI report for Temtem Swarm.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { searchParams: { err?: string } };

const KEY_ART =
  "https://firebasestorage.googleapis.com/v0/b/streamdash-12aa9.firebasestorage.app/o/public%2FGame%20Cover%20Art%2FCrema_Temtem_Swarm_KeyArt%20(1)%20(1).jpg?alt=media&token=f61f686d-76fc-47e7-a926-b9cb44c5934d";

const TEM = "https://firebasestorage.googleapis.com/v0/b/streamdash-12aa9.firebasestorage.app/o/public%2FTemTem";

const SCREENSHOTS = [
  `${TEM}%2FTEMTEM%20GAMEPLAYSCREENSHOT%20(1).jpg?alt=media&token=9272fbd4-4bb2-40bc-b055-d01b1775258b`,
  `${TEM}%2FTEMTEM%20GAMEPLAYSCREENSHOT%20(2).jpg?alt=media&token=2b1643fa-0ab4-41d5-a522-9f2b05211636`,
  `${TEM}%2FTEMTEM%20GAMEPLAYSCREENSHOT%20(3).jpg?alt=media&token=14d7d29c-fa13-4560-a22d-7fa59b3835a8`,
  `${TEM}%2FTEMTEM%20GAMEPLAYSCREENSHOT%20(4).jpg?alt=media&token=44eb74c5-c39b-496c-976c-9b5f30ae97fc`,
  `${TEM}%2FTEMTEM%20GAMEPLAYSCREENSHOT%20(5).jpg?alt=media&token=6c423d4e-18fc-4c4f-b6c1-ab7430d43a48`,
  `${TEM}%2FTEMTEM%20GAMEPLAYSCREENSHOT%20(6).jpg?alt=media&token=ad643209-09b5-4e8b-bb8b-bf882150e40a`,
];

const kpis = [
  { num: "56",      lbl: "Creators completed" },
  { num: "112%",    lbl: "Of original 50-slot plan" },
  { num: "219h 05", lbl: "Verified stream time" },
  { num: "+85%",    lbl: "Runtime overdelivery" },
  { num: "5,476",   lbl: "Viewer-hours" },
  { num: "€0.42",   lbl: "Cost per watch-hour" },
];

const highlights = [
  {
    badge: "Top peak",
    name: "Gshiba",
    line: "80 avg · 138 peak · 7h40 streamed",
    text: "Highest peak of the campaign and the clearest proof that Temtem Swarm translates well on stream. Also completed TemTeam Up and Wishlist Spreader.",
    bg: SCREENSHOTS[0],
    links: [{ label: "VOD", href: "https://www.twitch.tv/videos/2741313240?t=1h3m9s" }],
  },
  {
    badge: "Long-form standout",
    name: "Torynho",
    line: "15 avg · 24 peak · 23h20 streamed",
    text: "The clearest example of unpaid overdelivery on the entire campaign. Silver only pays for 2 hours, yet this run kept going for more than 23.",
    bg: SCREENSHOTS[1],
    links: [
      { label: "Proof", href: "https://youtube.com/shorts/p9n7z5QPbgw" },
      { label: "VOD",   href: "https://www.twitch.tv/videos/2740077616" },
    ],
  },
  {
    badge: "French standout",
    name: "LaDespTv",
    line: "35 avg · 52 peak · 4h40 streamed",
    text: "One of the strongest French-language activations: healthy CCV, extended playtime, full quest execution.",
    bg: SCREENSHOTS[2],
    links: [
      { label: "Proof", href: "https://www.tiktok.com/@vdesp_antho/video/7625033265606429985" },
      { label: "VOD",   href: "https://www.twitch.tv/videos/2739733520" },
    ],
  },
  {
    badge: "10h+ overdelivery",
    name: "MistAntics",
    line: "22 avg · 50 peak · 10h20 streamed",
    text: "Creator enthusiasm converting directly into unpaid extra airtime, while also completing all three quest mechanics.",
    bg: SCREENSHOTS[3],
    links: [
      { label: "Proof", href: "https://x.com/mistantics/status/2041215889308045372" },
      { label: "VOD",   href: "https://www.twitch.tv/videos/2741541791" },
    ],
  },
  {
    badge: "Portuguese reach",
    name: "Foythtv",
    line: "71 avg · 91 peak · 6h10 streamed",
    text: "High-impact Portuguese activation. Strong CCV and broad quest execution, useful proof that the campaign hit active creator clusters.",
    bg: SCREENSHOTS[4],
    links: [
      { label: "Proof", href: "https://x.com/FoythTv/status/2040224257376952795" },
      { label: "VOD",   href: "https://www.twitch.tv/videos/2739009585" },
    ],
  },
  {
    badge: "English long-tail",
    name: "WildAnnie",
    line: "48 avg · 62 peak · 6h08 streamed",
    text: "Strong English-language session with decent reach and playtime far beyond the paid minimum, helping stretch long-tail exposure.",
    bg: SCREENSHOTS[5],
    links: [
      { label: "Proof", href: "https://x.com/PaperGoblin/status/2041840912624386223" },
      { label: "VOD",   href: "https://www.twitch.tv/videos/2742813794?t=1h47m43s" },
    ],
  },
];

export default function TemtemSwarmKpi({ searchParams }: Props) {
  if (!isUnlocked()) {
    return (
      <main className="tem-lock">
        <div className="tem-lock-card">
          <div className="tem-lock-eyebrow">
            <span className="tem-lock-dot" />
            StreamQuest KPI report
          </div>
          <h1>Temtem Swarm</h1>
          <p>Enter the access code to view this client report.</p>
          <form action={signInAction} className="tem-lock-form">
            <input
              type="password"
              name="password"
              placeholder="Access code"
              autoFocus
              required
              className="tem-lock-input"
            />
            <button type="submit" className="tem-lock-btn">Unlock report</button>
          </form>
          {searchParams.err && (
            <p className="tem-lock-err">Wrong access code, try again.</p>
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
          style={{ backgroundImage: `url('${KEY_ART}')` }}
        />
        <div className="cs-shell cs-hero-inner">
          <span className="cs-eyebrow">KPI Report · Crema</span>
          <h1>
            Temtem Swarm. <span className="grad">Capped budget, uncapped delivery</span>.
          </h1>
          <p className="cs-hero-lead">
            Temtem Swarm closed at 56 completed creators against a 50-slot plan, with
            219h 05m of verified stream time on 96h of paid baseline. Most of the extra
            airtime came from streamers choosing to keep playing well past their paid
            requirement — genuine unpaid overdelivery, not forced minimums.
          </p>
        </div>
      </section>

      {/* =============== HERO KPI STRIP =============== */}
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

      {/* =============== WHAT MADE IT WORK =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div className="cs-split">
            <div>
              <span className="cs-tag">What worked</span>
              <h2>A streamable game that pulled creators past the paid line.</h2>
              <p>
                Temtem Swarm proved highly streamable thanks to short-session
                readability, co-op friendliness, replay loops, and clear quest hooks.
                That translated into strong creator participation, broad quest
                completion, and play sessions that regularly extended beyond the paid
                requirement.
              </p>
              <h3>What that gave us</h3>
              <ul className="cs-list">
                <li>Campaign moved past the initial 50-slot ceiling: 56 completions</li>
                <li>3 streams above 10 hours, one above 23 hours</li>
                <li>32 Swarm Signal posts, 39 TemTeam Up completions, 44 Wishlist Spreader completions</li>
                <li>Broad language spread: Dutch, English, French, German, Portuguese, Spanish, Turkish</li>
              </ul>
            </div>
            <div className="cs-split-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SCREENSHOTS[0]} alt="Temtem Swarm gameplay" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* =============== STREAM TIME VISUALIZATION =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Runtime Overdelivery</span>
            <h2>96h paid. 219h delivered. +123h on the house.</h2>
            <p>
              Bronze pays a flat €20 (1h baseline), Silver pays €50 for the first 2 hours.
              Anything beyond those thresholds is organic overdelivery. On this campaign
              creators delivered 228% of the paid baseline.
            </p>
          </div>

          <div className="cs-stream-bars">
            <div className="cs-bar-row">
              <div className="cs-bar-head">
                <span className="cs-bar-title">Silver creators (40 completions)</span>
                <span className="cs-bar-numbers">
                  baseline 80h · delivered <strong>~158h</strong>
                </span>
              </div>
              <div className="cs-bar-track">
                <div className="cs-bar-fill-baseline" style={{ width: "36.5%" }} />
                <div className="cs-bar-fill-actual" style={{ width: "72%" }} />
              </div>
            </div>

            <div className="cs-bar-row">
              <div className="cs-bar-head">
                <span className="cs-bar-title">Bronze creators (16 completions)</span>
                <span className="cs-bar-numbers">
                  baseline 16h · delivered <strong>~61h</strong>
                </span>
              </div>
              <div className="cs-bar-track">
                <div className="cs-bar-fill-baseline" style={{ width: "7.3%" }} />
                <div className="cs-bar-fill-actual" style={{ width: "28%" }} />
              </div>
            </div>

            <div className="cs-bar-row">
              <div className="cs-bar-head">
                <span className="cs-bar-title">Total runtime (all completions)</span>
                <span className="cs-bar-numbers">
                  baseline 96h · delivered <strong>219h 05m</strong>
                </span>
              </div>
              <div className="cs-bar-track">
                <div className="cs-bar-fill-baseline" style={{ width: "44%" }} />
                <div className="cs-bar-fill-actual" style={{ width: "100%" }} />
              </div>
            </div>

            <div className="cs-bar-legend">
              <span>
                <span
                  className="cs-bar-legend-swatch"
                  style={{
                    background: "rgba(178, 240, 72, 0.35)",
                    borderRight: "2px dashed rgba(255,255,255,0.5)",
                  }}
                />
                Contracted baseline
              </span>
              <span>
                <span
                  className="cs-bar-legend-swatch"
                  style={{ background: "linear-gradient(90deg, #B2F048, #D5FF78)" }}
                />
                Actual delivered runtime
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== AUDIENCE + SIDE QUESTS =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 36 }}>
            <span className="cs-tag">Audience &amp; activity</span>
            <h2>5,476 viewer-hours, with side-quest activity layered on top.</h2>
            <p>
              CCV ran well above target across both tiers: Bronze 9.6 avg (vs 5 target),
              Silver 30.6 avg (vs 15 target). On top of the livestream attention, creators
              executed almost two side-quests on average — clips, social posts, wishlist
              spreads, and co-op proofs.
            </p>
          </div>

          <div className="cs-creator-block">
            <div>
              <h3 style={{ marginTop: 0 }}>Side quest execution</h3>
              <div className="cs-top-contrib">
                <div className="cs-top-contrib-row">
                  <span className="cs-top-contrib-rank">★</span>
                  <span className="cs-top-contrib-name">Swarm Signal posts</span>
                  <span className="cs-top-contrib-val">32</span>
                </div>
                <div className="cs-top-contrib-row">
                  <span className="cs-top-contrib-rank">★</span>
                  <span className="cs-top-contrib-name">TemTeam Up co-op</span>
                  <span className="cs-top-contrib-val">39</span>
                </div>
                <div className="cs-top-contrib-row">
                  <span className="cs-top-contrib-rank">★</span>
                  <span className="cs-top-contrib-name">Wishlist Spreader</span>
                  <span className="cs-top-contrib-val">44</span>
                </div>
              </div>
              <p className="cs-muted" style={{ marginTop: 18 }}>
                51 of 56 creators completed at least one quest mechanic. 42 completed
                two or more. The campaign delivered measurable proof beyond livestream
                attention alone.
              </p>
            </div>

            <div>
              <h3 style={{ marginTop: 0 }}>CCV vs target</h3>
              <div className="cs-top-contrib">
                <div className="cs-top-contrib-row">
                  <span className="cs-top-contrib-rank">B</span>
                  <span className="cs-top-contrib-name">Bronze avg CCV: 9.6 (target 5)</span>
                  <span className="cs-top-contrib-val">1.91×</span>
                </div>
                <div className="cs-top-contrib-row">
                  <span className="cs-top-contrib-rank">S</span>
                  <span className="cs-top-contrib-name">Silver avg CCV: 30.6 (target 15)</span>
                  <span className="cs-top-contrib-val">2.04×</span>
                </div>
                <div className="cs-top-contrib-row">
                  <span className="cs-top-contrib-rank">★</span>
                  <span className="cs-top-contrib-name">Highest peak: Gshiba</span>
                  <span className="cs-top-contrib-val">138</span>
                </div>
              </div>
              <p className="cs-muted" style={{ marginTop: 18 }}>
                Both tiers nearly doubled their CCV target, which moved viewer-hour
                economics in the same direction as the runtime overdelivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =============== GIVEAWAY AMPLIFICATION =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Giveaway amplification</span>
            <h2>Two giveaway posts, each above 5K views and 100+ reshares.</h2>
            <p>
              Beyond the live campaign, two creator-led giveaway posts kept Temtem Swarm
              visible in social feeds during the activation window.
            </p>
          </div>

          <div className="tem-giveaway-grid">
            <article className="tem-giveaway">
              <div className="tem-giveaway-eyebrow">Wave 1</div>
              <h3>The Games Detective</h3>
              <p>
                Giveaway key support post that extended visibility outside the live
                campaign window. Reached <b>5,500 views</b> and cleared <b>100+ reshares</b>,
                turning a single giveaway into meaningful extra reach.
              </p>
              <div className="tem-giveaway-stats">
                <span className="tem-giveaway-tag">5,500 views</span>
                <span className="tem-giveaway-tag">100+ reshares</span>
                <span className="tem-giveaway-tag">Giveaway key</span>
              </div>
              <a
                className="tem-giveaway-link"
                href="https://x.com/TheGamesDet/status/2039818955355783542"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open giveaway post →
              </a>
            </article>
            <article className="tem-giveaway">
              <div className="tem-giveaway-eyebrow">Wave 2</div>
              <h3>Umbrita C</h3>
              <p>
                Second giveaway wave that reinforced repeat social exposure during the
                campaign. Reached <b>5,700 views</b> and also cleared <b>100+ reshares</b>,
                stacking another burst of visibility on top of the Twitch coverage.
              </p>
              <div className="tem-giveaway-stats">
                <span className="tem-giveaway-tag">5,700 views</span>
                <span className="tem-giveaway-tag">100+ reshares</span>
                <span className="tem-giveaway-tag">Repeat exposure</span>
              </div>
              <a
                className="tem-giveaway-link"
                href="https://x.com/UmbritaC/status/2038637675381440708"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open giveaway post →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* =============== BUDGET =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 32 }}>
            <span className="cs-tag">Budget efficiency</span>
            <h2>€2,820 all-in. €0.51 per delivered watch-hour.</h2>
            <p>
              Paid creator time was capped. Delivered exposure was not. The watch-hour
              economics on this campaign make it cheaper per delivered viewer-hour than
              most paid influencer alternatives at this size.
            </p>
          </div>

          <div className="tem-budget">
            <div>
              <div className="tem-budget-big">€2,820</div>
              <p className="cs-muted" style={{ marginTop: -8 }}>
                All-in including the standard StreamQuest setup fee of €500.
              </p>
            </div>
            <div>
              <div className="tem-budget-stat">
                <strong>Creator payout: €2,320</strong>
                <small>40 Silver × €50 = €2,000 · 16 Bronze × €20 = €320</small>
              </div>
              <div className="tem-budget-stat">
                <strong>Cost per watch-hour: €0.42 / €0.51</strong>
                <small>Payout-only / all-in, calculated against 5,476 viewer-hours</small>
              </div>
              <div className="tem-budget-stat">
                <strong>Cost per creator: €41.43 / €50.36</strong>
                <small>Payout-only / all-in. Useful for comparing breadth of creator coverage</small>
              </div>
              <div className="tem-budget-stat">
                <strong>Paid hours: 96 · Delivered: 219h 05m</strong>
                <small>+123h 05m unpaid overdelivery, or 228% of the paid baseline</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============== SUBMISSION HIGHLIGHTS =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720 }}>
            <span className="cs-tag">Submission highlights</span>
            <h2>Standout creators across reach, runtime and language.</h2>
            <p>
              Selected for a mix of CCV, unusually long playtime, and proof of extra quest
              execution. The full creator log sits below this section.
            </p>
          </div>

          <div className="tem-highlight-grid">
            {highlights.map((h) => (
              <article key={h.name} className="tem-highlight">
                <div
                  className="tem-highlight-thumb"
                  style={{ backgroundImage: `url('${h.bg}')` }}
                >
                  <span className="tem-highlight-badge">{h.badge}</span>
                  <h3 className="tem-highlight-name">{h.name}</h3>
                  <p className="tem-highlight-line">{h.line}</p>
                </div>
                <div className="tem-highlight-body">
                  <p>{h.text}</p>
                  <div className="tem-highlight-links">
                    {h.links.map((l) => (
                      <a
                        key={l.href}
                        className="tem-highlight-link"
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== FULL CREATOR LOG =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 24 }}>
            <span className="cs-tag">Full creator submission log</span>
            <h2>All 56 creators with proof links.</h2>
            <p>
              Use the filters to isolate creators by tier, language, quest mechanic, or
              hour range. Every row links to the original VOD and any social proof we
              have on record.
            </p>
          </div>
          <SubmissionTable />
        </div>
      </section>

      {/* =============== FOOTER =============== */}
      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="cs-shell">
          <div className="tem-foot">
            <span>Prepared by StreamQuest for Crema · Confidential client report</span>
            <form action={signOutAction}>
              <button type="submit" className="tem-foot-signout">Sign out</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
