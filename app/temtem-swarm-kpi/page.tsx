import type { Metadata } from "next";
import { isUnlocked } from "./session";
import { signInAction, signOutAction } from "./actions";
import SubmissionTable from "./SubmissionTable";
import "@/app/redesign.css";
import "./temtem.css";

export const metadata: Metadata = {
  title: "Temtem Swarm KPI Report | StreamQuest",
  description: "Client-facing StreamQuest KPI report for Temtem Swarm.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { searchParams: { err?: string } };

const TEM = "https://firebasestorage.googleapis.com/v0/b/streamdash-12aa9.firebasestorage.app/o/public%2FTemTem";

const heroNotes = [
  { num: "56", note: "Completed creators, or 112% of the original 50-slot plan." },
  { num: "219h05", note: "Total airtime delivered against only 96 paid minimum hours." },
  { num: "€2,820", note: "All-in campaign cost. Actual creator payout landed at €2,320." },
  { num: "5,476", note: "Viewer-hours generated, with strong watch-hour economics for a client-facing launch push." },
];

const kpiCards = [
  { big: "56 creators completed", sub: "112% of target slots" },
  { big: "Avg CCV Bronze 9.6", sub: "vs target 5 → 1.91x" },
  { big: "219h05 total streamed", sub: "+123h05 unpaid overdelivery" },
  { big: "Avg CCV Silver 30.6", sub: "vs target 15 → 2.04x" },
  { big: "5,476 viewer-hours", sub: "generated across completed streams" },
  { big: "Top peak: Gshiba", sub: "138 peak viewers" },
  { big: "CPV efficiency", sub: "€0.42 payout-only / €0.51 all-in per watch-hour" },
  { big: "2 giveaway posts amplified launch", sub: "Each reached 100+ reshares and 5K+ views" },
];

const screenshots = [
  `${TEM}%2FTEMTEM%20GAMEPLAYSCREENSHOT%20(1).jpg?alt=media&token=9272fbd4-4bb2-40bc-b055-d01b1775258b`,
  `${TEM}%2FTEMTEM%20GAMEPLAYSCREENSHOT%20(2).jpg?alt=media&token=2b1643fa-0ab4-41d5-a522-9f2b05211636`,
  `${TEM}%2FTEMTEM%20GAMEPLAYSCREENSHOT%20(3).jpg?alt=media&token=14d7d29c-fa13-4560-a22d-7fa59b3835a8`,
  `${TEM}%2FTEMTEM%20GAMEPLAYSCREENSHOT%20(4).jpg?alt=media&token=44eb74c5-c39b-496c-976c-9b5f30ae97fc`,
  `${TEM}%2FTEMTEM%20GAMEPLAYSCREENSHOT%20(5).jpg?alt=media&token=6c423d4e-18fc-4c4f-b6c1-ab7430d43a48`,
  `${TEM}%2FTEMTEM%20GAMEPLAYSCREENSHOT%20(6).jpg?alt=media&token=ad643209-09b5-4e8b-bb8b-bf882150e40a`,
];

const proofs = [
  {
    badge: "Top peak",
    name: "Gshiba",
    line: "80 avg · 138 peak · 7h40 streamed",
    text: "Highest peak of the campaign and a strong proof point that Temtem Swarm translated well on stream. Also completed TemTeam Up and Wishlist Spreader.",
    bg: screenshots[0],
    links: [{ label: "Open VOD", href: "https://www.twitch.tv/videos/2741313240?t=1h3m9s" }],
  },
  {
    badge: "Long-form standout",
    name: "Torynho",
    line: "15 avg · 24 peak · 23h20 streamed",
    text: "The clearest example of unpaid overdelivery. Silver only pays for 2 hours, yet this run kept going for more than 23 hours.",
    bg: screenshots[1],
    links: [
      { label: "Open proof", href: "https://youtube.com/shorts/p9n7z5QPbgw" },
      { label: "Open VOD", href: "https://www.twitch.tv/videos/2740077616" },
    ],
  },
  {
    badge: "French standout",
    name: "LaDespTv",
    line: "35 avg · 52 peak · 4h40 streamed",
    text: "One of the strongest French-language activations, with healthy CCV, extended playtime, and full quest execution.",
    bg: screenshots[2],
    links: [
      { label: "Open proof", href: "https://www.tiktok.com/@vdesp_antho/video/7625033265606429985" },
      { label: "Open VOD", href: "https://www.twitch.tv/videos/2739733520" },
    ],
  },
  {
    badge: "10h+ overdelivery",
    name: "MistAntics",
    line: "22 avg · 50 peak · 10h20 streamed",
    text: "A strong example of creator enthusiasm converting directly into unpaid extra airtime, while also completing all three quest actions.",
    bg: screenshots[3],
    links: [
      { label: "Open proof", href: "https://x.com/mistantics/status/2041215889308045372" },
      { label: "Open VOD", href: "https://www.twitch.tv/videos/2741541791" },
    ],
  },
  {
    badge: "Portuguese reach",
    name: "Foythtv",
    line: "71 avg · 91 peak · 6h10 streamed",
    text: "A high-impact Portuguese activation with strong CCV and broad quest execution. Useful proof that the campaign created repeat visibility in active creator clusters.",
    bg: screenshots[4],
    links: [
      { label: "Open proof", href: "https://x.com/FoythTv/status/2040224257376952795" },
      { label: "Open VOD", href: "https://www.twitch.tv/videos/2739009585" },
    ],
  },
  {
    badge: "English long-tail",
    name: "WildAnnie",
    line: "48 avg · 62 peak · 6h08 streamed",
    text: "Strong English-language session with both decent reach and playtime far beyond the paid minimum, helping stretch long-tail exposure.",
    bg: screenshots[5],
    links: [
      { label: "Open proof", href: "https://x.com/PaperGoblin/status/2041840912624386223" },
      { label: "Open VOD", href: "https://www.twitch.tv/videos/2742813794?t=1h47m43s" },
    ],
  },
];

export default function TemtemSwarmKpi({ searchParams }: Props) {
  if (!isUnlocked()) {
    return (
      <main className="tem-lock">
        <div className="tem-lock-card">
          <div className="tem-lock-eyebrow">
            <span className="tem-dot" />
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
    <main className="tem-wrap">
      <div className="tem-shell">
        {/* ============ HERO ============ */}
        <section className="tem-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="tem-mascot"
            alt=""
            aria-hidden="true"
            src={`${TEM}%2FTEM%20(9).png?alt=media&token=4ec734b5-3592-474c-bbaf-935608a7364f`}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="tem-sticker st1"
            alt=""
            aria-hidden="true"
            src={`${TEM}%2FTEM%20(6).png?alt=media&token=9258ae03-b4a5-4bbf-a326-c97e268745f6`}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="tem-sticker st2"
            alt=""
            aria-hidden="true"
            src={`${TEM}%2FTEM%20(2).png?alt=media&token=f81c1073-49a9-4bb8-a651-4f78c3e137f0`}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="tem-sticker st3"
            alt=""
            aria-hidden="true"
            src={`${TEM}%2FTEM%20(11).png?alt=media&token=c696eec0-9e67-49d8-b6a5-db56ea36839c`}
          />

          <div className="tem-hero-inner">
            <div className="tem-eyebrow">
              <span className="tem-dot" />
              StreamQuest KPI report
            </div>
            <h1>Temtem Swarm</h1>
            <p className="tem-lead">
              Temtem Swarm became a campaign where creators did not just hit the minimum and leave.
              The original plan started around a 50-slot activation, but strong creator demand and
              positive in-stream reception pushed the campaign beyond that cap. Because Silver only
              pays for the first 2 hours and Bronze is a flat one-hour equivalent, a large share of
              the airtime below is genuine unpaid overdelivery created by streamers choosing to keep
              playing.
            </p>
            <div className="tem-hero-notes">
              {heroNotes.map((n) => (
                <div key={n.num} className="tem-hero-note">
                  <b>{n.num}</b>
                  <span>{n.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CAMPAIGN SNAPSHOT ============ */}
        <section className="tem-section">
          <h2>Campaign snapshot</h2>
          <div className="tem-kpi-grid">
            {kpiCards.map((k) => (
              <div key={k.big} className="tem-kpi-card">
                <b>{k.big}</b>
                <span>{k.sub}</span>
              </div>
            ))}
          </div>
          <div className="tem-footer-note">
            The campaign closed at <b>56 completed creators</b>, or <b>112%</b> of the
            original slot plan. Against the minimum paid hours implied by the final tier
            mix (<b>96h</b>), creators delivered <b>219h05</b>. That means{" "}
            <b>+123h05</b> of extra airtime, or <b>128% more</b> than the paid baseline.
          </div>
        </section>

        {/* ============ WHY THIS WORKED ============ */}
        <section className="tem-section">
          <div className="tem-two-col">
            <div>
              <h2>Why this campaign worked</h2>
              <p>
                Temtem Swarm proved highly streamable thanks to short-session readability,
                co-op friendliness, replay loops, and clear quest hooks. That translated
                into strong creator participation, broad quest completion, and play sessions
                that regularly extended beyond the paid requirement.
              </p>
              <div className="tem-pill-row">
                <span className="tem-info-pill">Original plan: 50 slots</span>
                <span className="tem-info-pill">Final completions: 56</span>
                <span className="tem-info-pill">7 languages</span>
                <span className="tem-info-pill">10h+ streams: 3</span>
                <span className="tem-info-pill">20h+ streams: 1</span>
              </div>
              <div className="tem-metric-list">
                <div className="tem-metric-box">
                  <b>Extension beyond the original cap</b>
                  <span>
                    The campaign moved past the initial 50-slot ceiling because creator
                    pull and on-stream momentum kept the queue active instead of dropping off.
                  </span>
                </div>
                <div className="tem-metric-box">
                  <b>Genuine unpaid overdelivery</b>
                  <span>
                    Silver only pays for the first 2 hours. Despite that, creators still pushed
                    3 streams above 10 hours and one beyond 20 hours, which materially improved
                    efficiency.
                  </span>
                </div>
                <div className="tem-metric-box">
                  <b>Healthy creator action rate</b>
                  <span>
                    32 Swarm Signal posts, 39 TemTeam Up completions, and 44 Wishlist Spreader
                    completions show the campaign added more than livestream time alone.
                  </span>
                </div>
              </div>
              <p style={{ marginTop: 14 }}>
                Language mix stayed broad across{" "}
                <strong style={{ color: "#fff" }}>Dutch, English, French, German, Portuguese, Spanish and Turkish</strong>
                , which helped spread exposure across multiple creator communities rather than
                relying on a single cluster.
              </p>
            </div>
            <div>
              <div className="tem-gallery">
                {screenshots.map((src, i) => (
                  <a key={src} className="tem-shot" href={src} target="_blank" rel="noopener noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Temtem Swarm gameplay screenshot ${i + 1}`} loading="lazy" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ SIDE QUESTS ============ */}
        <section className="tem-section">
          <h2>Side quest execution</h2>
          <div className="tem-side-grid">
            <div className="tem-side-card">
              <b>32</b>
              <span>Swarm Signal completions</span>
            </div>
            <div className="tem-side-card">
              <b>39</b>
              <span>TemTeam Up completions</span>
            </div>
            <div className="tem-side-card">
              <b>44</b>
              <span>Wishlist Spreader completions</span>
            </div>
          </div>
          <div className="tem-emphasis">
            <b>51 of 56</b> creators completed at least one quest mechanic, and <b>42</b>{" "}
            completed two or more. This layered social proof, co-op activity, and
            storefront-oriented actions on top of the live sessions, giving the campaign
            more value than stream time alone.
          </div>
        </section>

        {/* ============ GIVEAWAY AMPLIFICATION ============ */}
        <section className="tem-section">
          <h2>Giveaway amplification</h2>
          <div className="tem-giveaway-grid">
            <article className="tem-giveaway-card">
              <div className="tem-mini-cap">Giveaway support</div>
              <h3>The Games Detective</h3>
              <p>
                Giveaway key support post that helped extend social visibility outside the
                live campaign window. This post reached <b>5,500 views</b> and crossed the{" "}
                <b>100+ reshare</b> mark, turning a single giveaway into meaningful extra
                reach for Temtem Swarm.
              </p>
              <div className="tem-giveaway-stats">
                <span className="tem-giveaway-tag">5,500 views</span>
                <span className="tem-giveaway-tag">100+ reshares</span>
                <span className="tem-giveaway-tag">Giveaway key</span>
              </div>
              <a
                className="tem-mini-btn"
                href="https://x.com/TheGamesDet/status/2039818955355783542"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open giveaway post ↗
              </a>
            </article>
            <article className="tem-giveaway-card">
              <div className="tem-mini-cap">Giveaway support</div>
              <h3>Umbrita C</h3>
              <p>
                Second giveaway support wave that reinforced repeat social exposure during
                the campaign. Umbrita C's giveaway post also cleared the <b>100+ reshare</b>{" "}
                mark and reached <b>5,700 views</b>, adding another strong burst of audience
                visibility around Temtem Swarm.
              </p>
              <div className="tem-giveaway-stats">
                <span className="tem-giveaway-tag">5,700 views</span>
                <span className="tem-giveaway-tag">100+ reshares</span>
                <span className="tem-giveaway-tag">Repeat visibility</span>
              </div>
              <a
                className="tem-mini-btn"
                href="https://x.com/UmbritaC/status/2038637675381440708"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open giveaway post ↗
              </a>
            </article>
          </div>
        </section>

        {/* ============ BUDGET ============ */}
        <section className="tem-section">
          <div className="tem-budget-wrap">
            <div>
              <h2>Budget efficiency</h2>
              <div className="tem-budget-big">€2,820</div>
              <p>
                Paid creator time was capped, but delivered exposure was not. Bronze
                activations pay a flat <strong style={{ color: "#fff" }}>€20</strong> and
                Silver pays <strong style={{ color: "#fff" }}>€50</strong> for the first
                <strong style={{ color: "#fff" }}> 2 hours</strong>. Everything above that
                threshold was free overdelivery.
              </p>
              <div className="tem-budget-stat">
                Creator payout actual: €2,320
                <small>40 Silver × €50 = €2,000 · 16 Bronze × €20 = €320</small>
              </div>
              <div className="tem-budget-stat">
                All-in campaign cost: €2,820
                <small>Includes the standard StreamQuest setup fee of €500</small>
              </div>
              <div className="tem-budget-stat">
                Cost per watch-hour: €0.42 payout only · €0.51 all-in
                <small>Calculated against 5,476 delivered viewer-hours</small>
              </div>
              <div className="tem-budget-stat">
                Cost per creator: €41.43 payout only · €50.36 all-in
                <small>Reference for comparing creator breadth versus managed execution cost</small>
              </div>
            </div>
            <div>
              <h2>Commercial takeaway</h2>
              <div className="tem-metric-list">
                <div className="tem-metric-box">
                  <b>Paid minimum hours: 96h</b>
                  <span>The billable baseline implied by the final Bronze/Silver mix.</span>
                </div>
                <div className="tem-metric-box">
                  <b>Actual delivered hours: 219h05</b>
                  <span>Equivalent to 228% of the paid minimum, or +123h05 extra.</span>
                </div>
                <div className="tem-metric-box">
                  <b>Unpaid overdelivery: 123h05</b>
                  <span>
                    The majority of the extra airtime came from creators choosing to continue
                    past the paid threshold, which sharply improved efficiency.
                  </span>
                </div>
                <div className="tem-metric-box">
                  <b>Client-facing efficiency profile</b>
                  <span>
                    Scale, broad language coverage, side quest execution, and unusually strong
                    hour overdelivery without raising the paid hour cap.
                  </span>
                </div>
              </div>
              <div className="tem-footer-note">
                This is where Temtem Swarm stands out commercially:{" "}
                <b>hours exploded upward while paid time stayed capped</b>. The result is a
                client-friendly efficiency profile built on genuine creator enthusiasm rather
                than forced minimums.
              </div>
            </div>
          </div>
        </section>

        {/* ============ SUBMISSION HIGHLIGHTS ============ */}
        <section className="tem-section">
          <h2>Submission highlights</h2>
          <p>
            Standout creator submissions selected for a mix of reach, CCV, unusually long
            playtime, and proof of extra quest execution.
          </p>
          <div className="tem-proof-grid">
            {proofs.map((p) => (
              <article key={p.name} className="tem-proof-card">
                <div
                  className="tem-proof-thumb"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(8,31,52,0.1), rgba(11,23,35,0.9)), url('${p.bg}')`,
                  }}
                >
                  <span className="tem-proof-badge">{p.badge}</span>
                  <h3>{p.name}</h3>
                  <p>{p.line}</p>
                </div>
                <div className="tem-proof-body">
                  <div className="tem-mini-cap">Submission highlight</div>
                  <p className="tem-proof-text">{p.text}</p>
                  <div className="tem-proof-actions">
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        className="tem-mini-btn"
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
        </section>

        {/* ============ FULL CREATOR LOG ============ */}
        <section className="tem-section">
          <h2>Full creator submission log</h2>
          <p>
            The full creator row directly in the report. Use search and filters to isolate
            creators by tier, language, quest mechanic, or long-form overdelivery.
          </p>
          <SubmissionTable />
        </section>

        {/* ============ FOOTER + SIGN OUT ============ */}
        <div className="tem-foot">
          <span>Prepared by StreamQuest for Crema · Confidential client report</span>
          <form action={signOutAction}>
            <button type="submit" className="tem-foot-signout">Sign out</button>
          </form>
        </div>
      </div>
    </main>
  );
}
