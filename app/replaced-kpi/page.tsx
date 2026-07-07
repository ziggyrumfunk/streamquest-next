import type { Metadata } from "next";
import { isUnlocked } from "./session";
import { signInAction, signOutAction } from "./actions";
import CreatorTable from "./CreatorTable";
import { rows } from "./data";
import "@/app/redesign.css";
import "@/app/case-studies/case-studies.css";
import "./replaced.css";

export const metadata: Metadata = {
  title: "REPLACED Campaign KPI Report | StreamQuest",
  description: "Client-facing StreamQuest KPI report for the REPLACED creator campaign.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { searchParams: { err?: string } };

const HERO_BG = "/media/replaced/Replaced_Release_Date_Trailer_Screenshot_05.webp";

/* Twitch VOD embeds need every host domain they render on as a parent. */
const PARENTS = ["streamquest.io", "www.streamquest.io", "localhost", "127.0.0.1"];
const parentQS = PARENTS.map((p) => `parent=${p}`).join("&");
const vodEmbed = (id: string, t?: string) =>
  `https://player.twitch.tv/?video=${id}${t ? `&t=${t}` : ""}&${parentQS}&autoplay=false`;

const kpis = [
  { num: "62", lbl: "Creators logged" },
  { num: "279h45", lbl: "Total stream time" },
  { num: "6,783", lbl: "Viewer hours" },
  { num: "€3,180", lbl: "Total campaign cost" },
  { num: "€0.47", lbl: "Cost per viewer hour" },
  { num: "+15", lbl: "Extra slots added" },
];

const standouts = [
  { t: "Deep engagement", d: "8 creators streamed 10h+, and 13 streamed 5h+, well beyond the required window." },
  { t: "Completion signal", d: "7 creators completed the Completionist quest, finishing the full game." },
  { t: "Social spread", d: "52 social and bonus post links, 55 total proof URLs including wishlist and giveaway proofs." },
  { t: "Audience quality", d: "302,434 combined followers with a median of 2,346, plus 21 creators in the Twitch top 1%." },
  { t: "Diverse pool", d: "7 languages, led by English, Portuguese, and French coverage." },
];

/* Language distribution computed from the logged creator list. */
const langBars = Object.entries(
  rows.reduce<Record<string, number>>((acc, r) => {
    if (r.language) acc[r.language] = (acc[r.language] || 0) + 1;
    return acc;
  }, {})
).sort((a, b) => b[1] - a[1]);
const langMax = Math.max(...langBars.map(([, n]) => n));

const platformBars: [string, number][] = [
  ["X / Twitter", 30],
  ["Instagram", 10],
  ["TikTok", 5],
  ["Bluesky", 4],
  ["YouTube", 4],
  ["Threads", 1],
];
const platMax = Math.max(...platformBars.map(([, n]) => n));

const funnel = [
  { num: "45", t: "Main Social Agent posts", d: "Primary social proof links logged in the creator sheet." },
  { num: "50", t: "Growing Together / wishlist", d: "Completed checkmarks or direct wishlist proof links." },
  { num: "7", t: "Completionist runs", d: "Strong dedication signal for a campaign with a required viewing window." },
];

const giveaways = [
  { name: "The Games Detective", views: "12.3K", reshares: "223", href: "" },
  { name: "UmbritaC", views: "6K", reshares: "221", href: "https://x.com/UmbritaC/status/2043348075565994016" },
  { name: "Lordacris", views: "4.2K", reshares: "150", href: "https://x.com/Lordacris/status/2042606663585116573" },
];

const topByVh = [
  { name: "Vols_lol", a: "55 avg", b: "17h05 streamed", val: "939.6 vh" },
  { name: "Shalalaka", a: "40 avg", b: "19h57 streamed", val: "798.0 vh" },
  { name: "GirlWhoPlays", a: "55 avg", b: "11h20 streamed", val: "623.3 vh" },
  { name: "jemplfg", a: "19 avg", b: "20h streamed", val: "380.0 vh" },
  { name: "gshiba", a: "85 avg", b: "2h30 streamed", val: "212.5 vh" },
];

const mostDedicated = [
  { name: "jemplfg", a: "19 avg", b: "Silver", val: "20h" },
  { name: "Shalalaka", a: "40 avg", b: "Silver", val: "19h57" },
  { name: "BumquackZA", a: "7 avg", b: "Bronze", val: "17h12" },
  { name: "Vols_lol", a: "55 avg", b: "Silver", val: "17h05" },
  { name: "Paschoalin", a: "16 avg", b: "Silver", val: "12h45" },
];

const highestCcv = [
  { name: "gshiba", a: "108 peak", b: "Silver", val: "85 avg" },
  { name: "Foythtv", a: "97 peak", b: "Silver", val: "73 avg" },
  { name: "Saremu", a: "82 peak", b: "Silver", val: "68 avg" },
  { name: "Vols_lol", a: "163 peak", b: "Silver", val: "55 avg" },
  { name: "GirlWhoPlays", a: "77 peak", b: "Silver", val: "55 avg" },
];

const completionists = [
  { name: "jemplfg", a: "19 avg", b: "Silver", val: "20h" },
  { name: "Shalalaka", a: "40 avg", b: "Silver", val: "19h57" },
  { name: "Vols_lol", a: "55 avg", b: "Silver", val: "17h05" },
  { name: "Paschoalin", a: "16 avg", b: "Silver", val: "12h45" },
  { name: "Adwuin", a: "10 avg", b: "Bronze", val: "11h" },
  { name: "rainezest", a: "15 avg", b: "Silver", val: "8h00" },
  { name: "KamilCesaro", a: "22 avg", b: "Silver", val: "3h30" },
];

const featuredVods = [
  { name: "Saremu", meta: "Silver · Spanish · 68 avg CCV · 82 peak", embed: vodEmbed("2762346356") },
  { name: "GirlWhoPlays", meta: "Silver · Spanish · 11h20 streamed · 55 avg CCV", embed: vodEmbed("2748253844") },
  { name: "gshiba", meta: "Silver · Portuguese · 85 avg CCV · starts at 45m", embed: vodEmbed("2749379972", "00h45m01s") },
];

function RankRows({ items }: { items: { name: string; a: string; b: string; val: string }[] }) {
  return (
    <div className="replaced-top">
      {items.map((c, i) => (
        <div key={`${c.name}-${i}`} className="replaced-top-row">
          <span className="replaced-top-rank">#{i + 1}</span>
          <span className="replaced-top-name">{c.name}</span>
          <span className="replaced-top-cell">{c.a}</span>
          <span className="replaced-top-cell">{c.b}</span>
          <span className="replaced-top-val">{c.val}</span>
        </div>
      ))}
    </div>
  );
}

export default function ReplacedKpiPage({ searchParams }: Props) {
  if (!isUnlocked()) {
    return (
      <main className="replaced-lock">
        <div className="replaced-lock-card">
          <div className="replaced-lock-eyebrow">
            <span className="replaced-lock-dot" />
            StreamQuest KPI report
          </div>
          <h1>REPLACED</h1>
          <p>Enter the access code to view this client report.</p>
          <form action={signInAction} className="replaced-lock-form">
            <input
              type="password"
              name="password"
              placeholder="Access code"
              autoFocus
              required
              className="replaced-lock-input"
            />
            <button type="submit" className="replaced-lock-btn">Unlock report</button>
          </form>
          {searchParams.err && (
            <p className="replaced-lock-err">Wrong access code, try again.</p>
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
          <span className="cs-eyebrow">KPI Report · Thunderful x Sad Cat Studios</span>
          <h1>
            REPLACED.{" "}
            <span className="grad">One of StreamQuest&rsquo;s strongest campaigns to date</span>.
          </h1>
          <p className="cs-hero-lead">
            The REPLACED quest delivered a wide, diverse creator spread with standout dedication.
            Demand was high across the StreamQuest pool, so the campaign was expanded with 15
            additional slots as agreed. The final logged list shows 62 creators, a Silver-heavy
            mix, 279h45 streamed, and 6,782.6 viewer hours based on logged average viewers.
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

      {/* =============== EXECUTIVE READOUT =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div className="cs-split">
            <div>
              <span className="cs-tag">Executive readout</span>
              <h2>Wide creator variety, partnered coverage, and high organic dedication.</h2>
              <p>
                REPLACED is a handcrafted pixel-art, cinematic 2.5D action game set in the
                R.E.A.C.H. and Phoenix-City world. Instead of concentrating keys in one audience
                cluster, StreamQuest distributed coverage across different languages, creator
                sizes, and communities to maximize authentic reach and reduce overlap.
              </p>
              <p>
                Creators did not just sample the game: many streamed far beyond the required
                window, played across multiple days, and several completed the full game.
              </p>
              <h3>Highlights</h3>
              <ul className="cs-list">
                <li>62 creators logged, 48 Silver and 14 Bronze completions</li>
                <li>279h45 total stream time, 6,782.6 viewer hours</li>
                <li>8 creators streamed 10h+, 7 completed the full game</li>
                <li>302,434 combined followers, median 2,346</li>
                <li>21 creators in the Twitch top 1%, 44 in the top 2%</li>
                <li>7 languages, led by English, Portuguese, and French</li>
              </ul>
            </div>
            <div className="cs-split-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/replaced/Replaced_Release_Date_Trailer_Screenshot_03.webp"
                alt="REPLACED gameplay screenshot"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =============== CORE KPI SNAPSHOT =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Core KPI snapshot</span>
            <h2>All delivery metrics, calculated from the logged creator list.</h2>
            <p>Pricing is calculated at Bronze €20, Silver €50, plus €500 setup.</p>
          </div>
          <div className="replaced-stat-list">
            <div className="replaced-stat-row is-total">
              <span className="replaced-stat-label">Creators logged</span>
              <span className="replaced-stat-num">62</span>
              <span className="replaced-stat-note">48 Silver / 14 Bronze completions.</span>
            </div>
            <div className="replaced-stat-row">
              <span className="replaced-stat-label">Total stream time</span>
              <span className="replaced-stat-num">279h45</span>
              <span className="replaced-stat-note">Median stream: 2h43.</span>
            </div>
            <div className="replaced-stat-row">
              <span className="replaced-stat-label">Viewer hours</span>
              <span className="replaced-stat-num">6,783</span>
              <span className="replaced-stat-note">406,957 live viewer-minutes.</span>
            </div>
            <div className="replaced-stat-row">
              <span className="replaced-stat-label">Weighted avg CCV</span>
              <span className="replaced-stat-num">24.2</span>
              <span className="replaced-stat-note">2,012 summed peak viewers.</span>
            </div>
            <div className="replaced-stat-row">
              <span className="replaced-stat-label">Main social posts</span>
              <span className="replaced-stat-num">45</span>
              <span className="replaced-stat-note">7 extra bonus links logged.</span>
            </div>
            <div className="replaced-stat-row">
              <span className="replaced-stat-label">Side quests</span>
              <span className="replaced-stat-num">50</span>
              <span className="replaced-stat-note">Growing Together / wishlist proofs.</span>
            </div>
            <div className="replaced-stat-row">
              <span className="replaced-stat-label">Completionist</span>
              <span className="replaced-stat-num">7</span>
              <span className="replaced-stat-note">Full game dedication signal.</span>
            </div>
            <div className="replaced-stat-row">
              <span className="replaced-stat-label">Creator quality</span>
              <span className="replaced-stat-num">21 / 44</span>
              <span className="replaced-stat-note">Creators in Twitch top 1% / top 2%.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== BUDGET & EFFICIENCY =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">Budget &amp; efficiency</span>
            <h2>€3,180 all-in, €0.47 per viewer hour.</h2>
            <p>
              CPVH is cost per viewer hour. Live CPM equivalent is spend divided by viewer-minutes
              times 1,000, a live attention proxy rather than ad-server impressions.
            </p>
          </div>
          <div className="replaced-stat-list">
            <div className="replaced-stat-row">
              <span className="replaced-stat-label">Creator activation budget</span>
              <span className="replaced-stat-num">€2,680</span>
              <span className="replaced-stat-note">48 Silver at €50, 14 Bronze at €20.</span>
            </div>
            <div className="replaced-stat-row">
              <span className="replaced-stat-label">Setup fee</span>
              <span className="replaced-stat-num">€500</span>
              <span className="replaced-stat-note">Campaign setup, brief, screening, coordination.</span>
            </div>
            <div className="replaced-stat-row is-total">
              <span className="replaced-stat-label">Total campaign cost</span>
              <span className="replaced-stat-num">€3,180</span>
              <span className="replaced-stat-note">Creator budget plus setup.</span>
            </div>
            <div className="replaced-stat-row">
              <span className="replaced-stat-label">Cost per streamed hour</span>
              <span className="replaced-stat-num">€11.37</span>
              <span className="replaced-stat-note">Across 279h45 of logged stream time.</span>
            </div>
            <div className="replaced-stat-row is-total">
              <span className="replaced-stat-label">Cost per viewer hour (incl. setup)</span>
              <span className="replaced-stat-num">€0.47</span>
              <span className="replaced-stat-note">€0.40 on the creator budget alone.</span>
            </div>
            <div className="replaced-stat-row">
              <span className="replaced-stat-label">Live CPM equivalent</span>
              <span className="replaced-stat-num">€7.81</span>
              <span className="replaced-stat-note">€6.59 on the creator budget alone.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =============== WHAT STANDS OUT =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 22 }}>
            <span className="cs-tag">What stands out</span>
            <h2>Beyond the headline numbers.</h2>
          </div>
          <div className="replaced-cards">
            {standouts.map((s) => (
              <article key={s.t} className="replaced-card">
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== DISTRIBUTIONS =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 8 }}>
            <span className="cs-tag">Coverage spread</span>
            <h2>Language and social platform distribution.</h2>
            <p>
              Coverage was spread deliberately across languages and platforms to widen authentic
              reach rather than concentrate it.
            </p>
          </div>

          <h3 style={{ marginTop: 28, marginBottom: 4 }}>Language distribution</h3>
          <div className="replaced-bars">
            {langBars.map(([lang, n]) => (
              <div key={lang} className="replaced-bar-row">
                <span className="replaced-bar-label">{lang}</span>
                <span className="replaced-bar-track">
                  <span className="replaced-bar-fill" style={{ width: `${(n / langMax) * 100}%` }} />
                </span>
                <span className="replaced-bar-val">{n}</span>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: 40, marginBottom: 4 }}>Social platform spread</h3>
          <div className="replaced-bars">
            {platformBars.map(([plat, n]) => (
              <div key={plat} className="replaced-bar-row">
                <span className="replaced-bar-label">{plat}</span>
                <span className="replaced-bar-track">
                  <span className="replaced-bar-fill" style={{ width: `${(n / platMax) * 100}%` }} />
                </span>
                <span className="replaced-bar-val">{n}</span>
              </div>
            ))}
          </div>
          <p className="cs-muted" style={{ marginTop: 18 }}>
            Includes confirmed URLs from main Social Agent links, bonus social links, and direct
            Growing Together proofs. One non-social TwitchTracker proof link is intentionally
            excluded from social-post counts.
          </p>
        </div>
      </section>

      {/* =============== SIDE QUEST FUNNEL =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 8 }}>
            <span className="cs-tag">Side quest funnel</span>
            <h2>Social proof, wishlist, and completion.</h2>
          </div>
          <div className="replaced-cards">
            {funnel.map((f) => (
              <article key={f.t} className="replaced-card">
                <div className="replaced-card-num">{f.num}</div>
                <h4>{f.t}</h4>
                <p>{f.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== GIVEAWAY HIGHLIGHTS =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 8 }}>
            <span className="cs-tag">Giveaway and wishlist highlights</span>
            <h2>A strong amplification layer on top of Twitch coverage.</h2>
            <p>
              Three follow-plus-wishlist giveaway posts alone generated 22.5K views and 594
              reshares at the time of logging.
            </p>
          </div>
          <div className="replaced-cards">
            {giveaways.map((g) => (
              <article key={g.name} className="replaced-card">
                <h4>{g.name}</h4>
                <p>Follow + wishlist giveaway</p>
                <div className="replaced-card-sub">
                  <span><strong>{g.views}</strong> views</span>
                  <span><strong>{g.reshares}</strong> reshares</span>
                </div>
                {g.href && (
                  <a className="replaced-card-link" href={g.href} target="_blank" rel="noopener noreferrer">
                    View post →
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== TOP CREATOR LISTS =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 8 }}>
            <span className="cs-tag">Top creator impact</span>
            <h2>Where the campaign concentrated.</h2>
          </div>

          <h3 style={{ marginTop: 26, marginBottom: 4 }}>Top by viewer hours</h3>
          <RankRows items={topByVh} />

          <h3 style={{ marginTop: 38, marginBottom: 4 }}>Most dedicated by stream time</h3>
          <RankRows items={mostDedicated} />

          <h3 style={{ marginTop: 38, marginBottom: 4 }}>Highest average CCV</h3>
          <RankRows items={highestCcv} />

          <h3 style={{ marginTop: 38, marginBottom: 4 }}>Completionist creators</h3>
          <RankRows items={completionists} />
        </div>
      </section>

      {/* =============== FEATURED VODS =============== */}
      <section className="cs-section">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 8 }}>
            <span className="cs-tag">Featured stream VODs</span>
            <h2>Three creator VODs from the campaign window.</h2>
            <p>
              Showing the depth of play, tone variety, and community engagement REPLACED generated
              across the pool.
            </p>
          </div>
          <div className="replaced-vods">
            {featuredVods.map((v) => (
              <article key={v.name} className="replaced-vod">
                <div className="replaced-vod-frame">
                  <iframe
                    src={v.embed}
                    title={`${v.name} REPLACED VOD`}
                    loading="lazy"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="replaced-vod-meta">
                  <h4>{v.name}</h4>
                  <p>{v.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== FULL CREATOR TABLE =============== */}
      <section className="cs-section cs-section-shaded">
        <div className="cs-shell">
          <div style={{ maxWidth: 720, marginBottom: 24 }}>
            <span className="cs-tag">Creator list</span>
            <h2>All 62 logged creators.</h2>
            <p>
              The full breakdown by creator: tier, language, Twitch ranking, followers, campaign
              performance, viewer-hours, and side-quest completion. Filter and sort to explore.
            </p>
          </div>
        </div>
        <div className="replaced-log-wrap">
          <CreatorTable />
        </div>
      </section>

      {/* =============== FOOTER =============== */}
      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="cs-shell">
          <div className="replaced-foot">
            <span>Prepared by StreamQuest for Thunderful x Sad Cat Studios · Confidential</span>
            <form action={signOutAction}>
              <button type="submit" className="replaced-foot-signout">Sign out</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
