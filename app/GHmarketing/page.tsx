import type { Metadata } from "next";
import { isUnlocked } from "./session";
import { signInAction, signOutAction } from "./actions";
import "@/app/redesign.css";
import "./ghm.css";

export const metadata: Metadata = {
  title: "Good Heavens Marketing Proposal",
  description: "Private StreamQuest proposal for Good Heavens.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { searchParams: { err?: string } };

const GH = "/firebase-public/GoodHeavensRPG";

export default function GHmarketingPage({ searchParams }: Props) {
  if (!isUnlocked()) {
    return (
      <main className="ghm-lock">
        <div className="ghm-lock-card">
          <div className="ghm-lock-eyebrow">Private proposal</div>
          <h1>Good Heavens marketing proposal</h1>
          <p>Enter the access code to view this page.</p>
          <form action={signInAction} className="ghm-lock-form">
            <input
              type="password"
              name="password"
              placeholder="Access code"
              autoFocus
              required
              className="ghm-lock-input"
            />
            <button type="submit" className="ghm-lock-btn">Unlock</button>
          </form>
          {searchParams.err && (
            <p className="ghm-lock-err">Wrong access code, try again.</p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="ghm">
      {/* ============ HERO ============ */}
      <section className="ghm-hero">
        <div className="ghm-hero-bg" aria-hidden="true" />
        <div className="ghm-hero-chars" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ghm-char ghm-char-1" src={`${GH}/scholar mayor.png`} alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ghm-char ghm-char-2" src={`${GH}/alchemist.png`} alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ghm-char ghm-char-3" src={`${GH}/hunter.png`} alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ghm-char ghm-char-4" src={`${GH}/Fox sit.png`} alt="" />
        </div>
        <div className="ghm-hero-inner">
          <span className="ghm-eyebrow">
            <span className="ghm-pulse" />
            StreamQuest proposal
          </span>
          <h1>
            Good Heavens. <span className="grad">Marketing &amp; launch plan</span>.
          </h1>
          <p>
            A practical launch support plan for Steam Next Fest, Gamescom preparation,
            and a potential late-August release push. The goal is to keep momentum
            growing while staying realistic about budget, team capacity, PR timing,
            ad spend, and the polish the game still needs before launch.
          </p>
          <div className="ghm-pills">
            {["Steam Next Fest", "Gamescom runway", "Late-August launch push", "Storefront", "Paid ads", "Creator campaign", "Press kit support"].map((p) => (
              <span key={p} className="ghm-pill">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OBJECTIVE ============ */}
      <section className="ghm-section">
        <div className="ghm-shell ghm-obj-split">
          <div className="ghm-block">
            <span className="ghm-tag">Objective</span>
            <h2>Continue as an execution layer around the team, not above it.</h2>
            <p>
              Over the past months, StreamQuest has become closely involved with Good Heavens across Reddit,
              social media, Steam page improvements, content direction, creator thinking, and broader campaign
              planning. This has gone beyond high-level advice. We have worked closely with Faruk and Gün on
              content creation, supported the internal workflow, created additional content ourselves where
              needed, and helped turn weekly ideas into posts, videos, Steam updates, and campaign actions.
            </p>
            <p>
              The recent Reddit results show the value of this hands-on approach. By finding creative angles,
              adapting posts to subreddit rules, and navigating communities carefully, we have reached several
              number 1 positions across relevant niche subreddits. This kind of traction is not only about
              posting more. It comes from understanding where the game fits, how each community behaves, and
              how to frame Good Heavens in a way that feels native instead of promotional.
            </p>
            <p>
              Going forward, StreamQuest can continue acting as an execution layer around the team. The Good
              Heavens team remains in control of the game, roadmap, priorities, and launch decisions.
              StreamQuest helps offset the marketing workload by staying close to the team, supporting weekly
              execution, creating and adapting content where needed, managing ads, assisting with creator and
              influencer outreach, coordinating with the selected PR partner, and making sure Steam, social,
              Reddit, ads, creators, and PR are connected instead of scattered.
            </p>
            <p>
              This support is especially valuable because the team has limited time and many important
              priorities ahead. By taking pressure off the recurring marketing execution, StreamQuest helps
              the team focus on the work only they can do: improving the build, preparing better assets,
              making key launch decisions, and delivering the most polished version of Good Heavens possible.
            </p>
          </div>
          <div className="ghm-char-stack ghm-char-stack-tall" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ghm-stack-main" src={`${GH}/Rar.png`} alt="" loading="lazy" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ghm-stack-side" src={`${GH}/Keebr.png`} alt="" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ============ STRATEGY SPLIT ============ */}
      <section className="ghm-section ghm-section-shaded">
        <div className="ghm-shell ghm-split">
          <div className="ghm-block">
            <span className="ghm-tag ghm-tag-purple">Budget-sensitive structure</span>
            <h3>Modular by design</h3>
            <p>
              The total marketing budget is limited and a large part of it needs to remain available for
              ad spend, Gamescom travel, PR, and other launch costs.
            </p>
            <p>
              For that reason this proposal is built modularly. Instead of forcing one large combined
              package, each part can be selected based on priority and available budget.
            </p>
          </div>
          <div className="ghm-block">
            <span className="ghm-tag">Recommended direction</span>
            <h3>June test, July prepare, August push</h3>
            <p>
              The strongest route uses June as the Steam Next Fest visibility and testing beat, July as the
              pre-Gamescom preparation month, and August as the Gamescom and post-Gamescom release push.
            </p>
            <p>
              This gives the game more time to polish, gives PR better assets, gives ads time to collect data,
              and gives the team a better chance to launch with momentum.
            </p>
          </div>
        </div>
      </section>

      {/* ============ PR SCOPE ============ */}
      <section className="ghm-section">
        <div className="ghm-shell ghm-pr-split">
          <div className="ghm-block">
            <span className="ghm-tag">PR scope</span>
            <h2>PR ownership stays with the team and their chosen partner. We support the execution layer around it.</h2>
            <p>
              PR ownership remains with Critical Hit, Theofanis, or whichever PR partner the team chooses.
              StreamQuest does not decide the PR direction or replace the PR partner. Our role is to support
              the execution layer around the PR campaign so the selected partner and the Good Heavens team
              have what they need, when they need it.
            </p>
            <p>
              This can include syncing with the PR partner, preparing or organizing the media kit, making
              sure assets are delivered on time, following up on missing materials, helping avoid delays
              caused by slow decision-making, and keeping PR activity aligned with Steam page updates, ads,
              creators, Reddit, and social content.
            </p>

            <div className="ghm-note">
              <strong>Why timing matters:</strong> Steam Next Fest and Gamescom are crowded marketing beats.
              Many games will be pushing demos, press, creators, ads, and social at the same time. Because
              of this, timing and execution matter. StreamQuest can help reduce the risk of missed beats by
              keeping the campaign moving, making sure materials are ready, and supporting the chosen PR
              partner with the assets and coordination they need.
            </div>

            <h3>StreamQuest PR support can include</h3>
            <ul className="ghm-list">
              <li>Syncing with the PR partner and keeping a shared view of the upcoming beats</li>
              <li>Preparing or organizing the press and media kit</li>
              <li>Making sure assets, links, builds, and messaging reach the partner on time</li>
              <li>Following up on missing materials and chasing decisions where things stall</li>
              <li>Supporting Burak and the team with organic influencer outreach where useful</li>
              <li>Helping position creator access around demo keys and embargo timing</li>
              <li>Aligning Steam page updates, ads, Reddit, social, and creator activity with PR timing</li>
              <li>Supporting the team with practical weekly execution needs</li>
            </ul>
          </div>
          <div className="ghm-char-stack ghm-char-stack-side" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ghm-stack-main" src={`${GH}/scholar mayor.png`} alt="" loading="lazy" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ghm-stack-side" src={`${GH}/enchanter.png`} alt="" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ============ CURRENT LEARNINGS ============ */}
      <section className="ghm-section ghm-section-shaded">
        <div className="ghm-shell">
          <div className="ghm-block ghm-head-block">
            <span className="ghm-tag">Current learnings</span>
            <h2>What the latest meetings show</h2>
            <p>
              The team wants to keep the collaboration going. Reddit is working but has natural limits.
              The Steam page still needs refinement, and launch assets need to be prepared with more structure.
            </p>
          </div>

          <div className="ghm-timeline">
            {[
              {
                t: "Reddit is working, but organic reach has limits",
                d: [
                  "Strong Reddit progress through creative angles, niche subreddit targeting, and community-native posts. At the same time, many larger subreddits limit posting frequency or do not allow direct self-promotion.",
                  "Reddit stays part of the plan, but larger reach will need to be supported by paid Reddit ads and stronger campaign moments.",
                ],
              },
              {
                t: "Content should become sharper and more platform-ready",
                d: [
                  "The team aligned around shorter, faster, mechanics-focused videos that work better across Reddit, X, Instagram, Facebook, and paid ads. Human-centric content like team clips and thank-you videos should also be used where it adds personality.",
                ],
              },
              {
                t: "The Steam page needs final conversion work",
                d: [
                  "The page has already improved a lot, but several areas still need work before bigger traffic is pushed towards it. Capsule alignment, page layout refinement, localized assets, clearer feature presentation, updated WebMs, and stronger footage around biomes, bosses, combat, and building.",
                ],
              },
              {
                t: "The August route needs preparation before Gamescom",
                d: [
                  "Since Gamescom itself is in August, the plan should not be framed as building a post-Gamescom campaign in July.",
                  "Better framing: June gathers data, July prepares the launch campaign and assets, August uses Gamescom momentum and pushes hard around the late-August release window.",
                ],
              },
            ].map((row) => (
              <div key={row.t} className="ghm-timeline-row">
                <h3>{row.t}</h3>
                {row.d.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PACKAGE 1 — Reddit only ============ */}
      <section className="ghm-section">
        <div className="ghm-shell">
          <div className="ghm-block ghm-package">
            <span className="ghm-tag">Package 1</span>
            <h2>Reddit communication only</h2>

            <table className="ghm-table">
              <thead>
                <tr><th>Package</th><th>Price</th><th>Best use case</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Reddit communication and management</td>
                  <td className="ghm-price">€3,000 / month</td>
                  <td>Light continuation of Reddit traction and organic community visibility</td>
                </tr>
              </tbody>
            </table>

            <h3>Scope</h3>
            <ul className="ghm-list">
              <li>Up to 10 to 15 Reddit posts per week</li>
              <li>Subreddit research and rule-checking</li>
              <li>Native Reddit copywriting</li>
              <li>Comment monitoring where relevant</li>
              <li>Community replies where appropriate</li>
              <li>Testing angles around co-op, RPG depth, base building, biomes, humor, weird NPCs, city rebuilding, and player stories</li>
              <li>Weekly feedback on which angles are working</li>
            </ul>

            <p className="ghm-muted">
              The leanest possible continuation package. We can do it, but we do not recommend it as the full
              launch plan. Reddit is valuable, but organic posting alone cannot carry the launch, especially
              because the biggest relevant subreddits often limit or block promotion.
            </p>
          </div>
        </div>
      </section>

      {/* ============ PACKAGE 2 — June essentials ============ */}
      <section className="ghm-section ghm-section-shaded">
        <div className="ghm-shell">
          <div className="ghm-block ghm-package">
            <span className="ghm-tag">Package 2</span>
            <h2>June-only essentials</h2>
            <p>
              Timeline: <strong>June 1st until Steam Next Fest.</strong> Essentials needed before and during
              Steam Next Fest, without requiring the team to commit to the full August runway yet.
            </p>

            <table className="ghm-table">
              <thead>
                <tr><th>Item</th><th>Price</th><th>Notes</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>June marketing support retainer</td>
                  <td className="ghm-price">€4,500</td>
                  <td>Marketing support, Steam page work, Reddit and social support, ad setup, team coordination</td>
                </tr>
                <tr>
                  <td>StreamQuest Steam Next Fest creator campaign</td>
                  <td className="ghm-price">€2,500</td>
                  <td>Dedicated creator push around the Steam Next Fest demo window</td>
                </tr>
              </tbody>
            </table>

            <p className="ghm-muted">Paid ad spend is separate. External PR costs are separate. Trailer production is separate.</p>
          </div>

          <div className="ghm-grid-2">
            <div className="ghm-block">
              <h3>Steam store page essentials</h3>
              <ul className="ghm-list">
                <li>Localize Steam store page banners and key assets</li>
                <li>Support in-house store page localization where needed</li>
                <li>Review page layout and reduce rough draft elements</li>
                <li>Fix or support investigation of capsule and social image issues</li>
                <li>Refine copy tone with more humor where appropriate</li>
                <li>Improve feature clarity around co-op, building, combat, RPG systems, and biomes</li>
                <li>Update WebMs if stronger footage becomes available</li>
              </ul>
            </div>
            <div className="ghm-block">
              <h3>Ads setup and testing</h3>
              <ul className="ghm-list">
                <li>Run and compare campaigns across X, Meta, and Reddit</li>
                <li>Test different audiences and hooks</li>
                <li>Use shorter, faster content formats suitable for paid ads</li>
                <li>Review early performance and wishlist signals where trackable</li>
                <li>Identify which platform deserves heavier spend later</li>
              </ul>
            </div>
            <div className="ghm-block">
              <h3>Content support</h3>
              <ul className="ghm-list">
                <li>Guide fast-cut mechanics-focused videos</li>
                <li>Support content around fishing, boss fights, combat, building, and city progression</li>
                <li>Use human-centric content where relevant, such as thank-you clips and team moments</li>
                <li>Help turn available footage into useful social, ad, and press kit assets</li>
              </ul>
            </div>
            <div className="ghm-block">
              <h3>Steam Next Fest creator campaign</h3>
              <p className="ghm-price">€2,500 one-off</p>
              <ul className="ghm-list">
                <li>Activate selected creators around Steam Next Fest</li>
                <li>Drive live gameplay visibility</li>
                <li>Generate social proof during the demo window</li>
                <li>Support demo key distribution and timing</li>
                <li>Coordinate with the broader Steam Next Fest messaging</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RECOMMENDED ROUTE ============ */}
      <section className="ghm-section">
        <div className="ghm-shell">
          <div className="ghm-cta">
            <span className="ghm-cta-eyebrow">Recommended route</span>
            <h2>
              Gamescom runway <span className="grad">and late-August launch support</span>.
            </h2>
            <p>
              If the launch is pushed to late August, treat June, July, and August as one connected campaign
              runway. Steam Next Fest visibility and testing in June, pre-Gamescom preparation in July, then
              Gamescom momentum and post-Gamescom launch execution in August.
            </p>
          </div>

          <div className="ghm-block">
            <h3>Monthly support</h3>
            <table className="ghm-table">
              <thead>
                <tr><th>Item</th><th>Monthly price</th><th>Purpose</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>StreamQuest marketing support retainer</td>
                  <td className="ghm-price">€4,500 / month</td>
                  <td>Ongoing marketing support, team coordination, store page support, social and Reddit management, ad coordination, content guidance, and PR support layer</td>
                </tr>
              </tbody>
            </table>
            <p className="ghm-muted">
              Kept as a monthly support line rather than one combined retainer total. The goal is to remain
              flexible around the team&apos;s remaining budget, ad spend, Gamescom travel, and external PR costs.
            </p>
          </div>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section className="ghm-section ghm-section-shaded">
        <div className="ghm-shell">
          <div className="ghm-block ghm-head-block">
            <span className="ghm-tag">Timeline</span>
            <h2>Proposed campaign timeline</h2>
          </div>

          <div className="ghm-months">
            <article className="ghm-month">
              <div className="ghm-month-art ghm-month-art-chars" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ghm-month-char ghm-month-char-main" src={`${GH}/hunter.png`} alt="" loading="lazy" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ghm-month-char ghm-month-char-mini" src={`${GH}/Fox sit.png`} alt="" loading="lazy" />
              </div>
              <div className="ghm-month-body">
                <span className="ghm-month-tag">June</span>
                <h3>Steam Next Fest, storefront essentials, testing</h3>
                <ul className="ghm-list">
                  <li>Finalize essential Steam page improvements before Steam Next Fest</li>
                  <li>Localize store page banners and key assets</li>
                  <li>Support internal store page localization workflow</li>
                  <li>Run X, Meta, and Reddit ad tests</li>
                  <li>Use Steam Next Fest to gather wishlist and creative performance data</li>
                  <li>Support demo key and influencer access timing</li>
                  <li>Run the StreamQuest Steam Next Fest creator campaign</li>
                  <li>Continue Reddit, social, and community communication</li>
                  <li>Create or guide fresh fast-cut content for ads and social</li>
                  <li>Prepare the first version of the media kit for PR partners</li>
                </ul>
              </div>
            </article>

            <article className="ghm-month">
              <div className="ghm-month-art ghm-month-art-chars" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ghm-month-char ghm-month-char-main" src={`${GH}/alchemist.png`} alt="" loading="lazy" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ghm-month-char ghm-month-char-mini" src={`${GH}/flying rat.png`} alt="" loading="lazy" />
              </div>
              <div className="ghm-month-body">
                <span className="ghm-month-tag">July</span>
                <h3>Pre-Gamescom campaign preparation</h3>
                <ul className="ghm-list">
                  <li>Support the marketing team with weekly needs and content planning</li>
                  <li>Prepare the late-August launch messaging</li>
                  <li>Improve the press and media kit before the PR push scales</li>
                  <li>Support Burak with organic influencer outreach and negotiation</li>
                  <li>Help structure creator and influencer follow-up</li>
                  <li>Refine Steam page assets and WebMs where possible</li>
                  <li>Support capsule art and store asset improvements</li>
                  <li>Prepare Gamescom and post-Gamescom content beats</li>
                  <li>Continue ad testing and narrow down the strongest platform</li>
                  <li>Prepare the launch trailer if selected as an add-on</li>
                </ul>
                <p className="ghm-muted">
                  July is not the post-Gamescom push itself. July is the preparation month that makes the
                  Gamescom and late-August push possible.
                </p>
              </div>
            </article>

            <article className="ghm-month">
              <div className="ghm-month-art ghm-month-art-chars" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ghm-month-char ghm-month-char-main" src={`${GH}/troll.png`} alt="" loading="lazy" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ghm-month-char ghm-month-char-mini" src={`${GH}/rar floating.png`} alt="" loading="lazy" />
              </div>
              <div className="ghm-month-body">
                <span className="ghm-month-tag">August</span>
                <h3>Gamescom momentum and post-Gamescom launch push</h3>
                <ul className="ghm-list">
                  <li>Support Gamescom-related messaging and visibility</li>
                  <li>Coordinate with the selected PR partner around timing and assets</li>
                  <li>Push the strongest new campaign assets, ideally including a new trailer</li>
                  <li>Focus heavier launch ad spend on the best-performing platform from June and July</li>
                  <li>Support creator and influencer activity</li>
                  <li>Continue Reddit communication and community engagement</li>
                  <li>Keep Steam page, ads, creators, PR, and social aligned around the same launch message</li>
                  <li>Support follow-ups with organic influencers and press-facing contacts where needed</li>
                </ul>
                <p className="ghm-muted">
                  By August we should not be guessing anymore. We should know which content angles and ad
                  platforms are performing best, then push harder where the data is strongest.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============ TRAILER ADD-ON ============ */}
      <section className="ghm-section">
        <div className="ghm-shell">
          <div className="ghm-trailer">
            <div>
              <span className="ghm-tag">Trailer add-on</span>
              <h2>New launch trailer</h2>
              <p className="ghm-trailer-price">€7,000</p>
              <p>
                For a serious PR push, an updated trailer is highly recommended. We should not rely only on a
                trailer that is already public and has already been circulated through existing platforms. PR
                needs a fresh asset and a fresh reason to talk about the game.
              </p>
              <p>
                Unlike short-form social content, a launch trailer needs clear ownership. One person needs to
                take responsibility from concept to final delivery, in close collaboration with the art and
                development side of the team.
              </p>
              <ul className="ghm-list">
                <li>Trailer concept and structure</li>
                <li>Footage planning</li>
                <li>Capture direction</li>
                <li>Editing</li>
                <li>Music and pacing</li>
                <li>Revision rounds</li>
                <li>Final delivery</li>
              </ul>
              <p>
                Treat this as a central launch asset, not as regular social content. It can support PR, Steam,
                creators, paid ads, and the broader late-August release push.
              </p>
            </div>
            <div className="ghm-trailer-art ghm-trailer-art-chars" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="ghm-trailer-char ghm-trailer-char-main" src={`${GH}/player attack.png`} alt="" loading="lazy" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="ghm-trailer-char ghm-trailer-char-side" src={`${GH}/drunk orc.png`} alt="" loading="lazy" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="ghm-trailer-char ghm-trailer-char-mini" src={`${GH}/ant drone.png`} alt="" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRICE GRID ============ */}
      <section className="ghm-section ghm-section-shaded">
        <div className="ghm-shell">
          <div className="ghm-block ghm-head-block">
            <span className="ghm-tag">Individual pricing</span>
            <h2>Selectable services</h2>
          </div>
          <table className="ghm-table ghm-table-wide">
            <thead>
              <tr><th>Service</th><th>Price</th><th>Notes</th></tr>
            </thead>
            <tbody>
              <tr><td>Reddit communication only</td><td className="ghm-price">€3,000 / month</td><td>Leanest continuation option</td></tr>
              <tr><td>StreamQuest Steam Next Fest creator campaign</td><td className="ghm-price">€2,500 one-off</td><td>Creator activation around Steam Next Fest</td></tr>
              <tr><td>Launch trailer production</td><td className="ghm-price">€7,000 one-off</td><td>Recommended if PR and late-August launch push move forward</td></tr>
              <tr><td>External PR partner</td><td className="ghm-price ghm-price-muted">Separate</td><td>Handled by Critical Hit, Theofanis, or selected partner</td></tr>
              <tr><td>Paid media spend</td><td className="ghm-price ghm-price-muted">Separate</td><td>Should remain available for X, Meta, Reddit, and launch push</td></tr>
              <tr><td>Larger paid influencer campaign beyond Steam Next Fest</td><td className="ghm-price ghm-price-muted">Separate</td><td>Scoped based on campaign size and creator targets</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ============ THREE ROUTES ============ */}
      <section className="ghm-section">
        <div className="ghm-shell">
          <div className="ghm-routes">
            <article className="ghm-route">
              <div className="ghm-route-eyebrow">Lightest</div>
              <h3>Reddit only</h3>
              <p className="ghm-price">€3,000 / month</p>
              <p className="ghm-muted">Best if the goal is only to keep Reddit activity going. Not recommended as the complete launch plan.</p>
            </article>
            <article className="ghm-route">
              <div className="ghm-route-eyebrow">June essentials</div>
              <h3>Steam Next Fest preparation</h3>
              <p className="ghm-price">€4,500 / month + optional €2,500 creator campaign</p>
              <p className="ghm-muted">Best if the team wants immediate Steam Next Fest support while keeping scope controlled.</p>
            </article>
            <article className="ghm-route ghm-route-recommended">
              <div className="ghm-route-eyebrow">Recommended</div>
              <h3>Gamescom runway and late-August launch</h3>
              <p className="ghm-price">€4,500 / month, selected add-ons as needed</p>
              <p className="ghm-muted">Best if the launch moves to late August and the team wants a structured marketing layer alongside PR.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ============ FINAL RECOMMENDATION ============ */}
      <section className="ghm-section ghm-section-shaded">
        <div className="ghm-shell">
          <div className="ghm-cta">
            <span className="ghm-cta-eyebrow">Final recommendation</span>
            <h2>
              Use June to test, July to prepare, <span className="grad">August to push</span>.
            </h2>
            <p>
              Use June to test and prepare for Steam Next Fest, July to prepare the campaign and assets
              before Gamescom, and August to use Gamescom momentum for a focused late-August and
              post-Gamescom release push. The Good Heavens team keeps ownership of the key product and
              launch decisions. StreamQuest supports the execution layer around them by reducing workload,
              managing recurring marketing tasks, supporting content and ads, coordinating Reddit and
              creator activity, helping with Steam page work, and making sure the PR partner receives the
              materials needed to do their work properly.
            </p>
            <p>
              The goal is not to take control away from the team. The goal is to create more breathing
              room so the team can focus on delivering a polished game while the marketing layer keeps
              moving.
            </p>
            <ul className="ghm-list ghm-list-recap">
              <li>June for Steam Next Fest visibility, ad testing, creator activity, and store page essentials</li>
              <li>July for pre-Gamescom preparation, press kit work, content planning, Steam page polish, and influencer outreach support</li>
              <li>August for Gamescom momentum and a focused late-August release push</li>
              <li>The Good Heavens team keeps ownership of product, roadmap, priorities, and launch decisions</li>
              <li>StreamQuest supports the execution layer with content, creators, ads, Reddit, Steam page work, and PR coordination</li>
              <li>Keep enough budget free for paid ads, Gamescom costs, PR, and launch execution</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="ghm-foot">
        <div className="ghm-shell ghm-foot-inner">
          <span>Prepared by StreamQuest for Good Heavens.</span>
          <form action={signOutAction}>
            <button type="submit" className="ghm-foot-signout">Sign out</button>
          </form>
        </div>
      </footer>
    </main>
  );
}
