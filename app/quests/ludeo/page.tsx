import type { Metadata } from "next";
import Reveal from "@/app/components/Reveal";
import { getQuestBySlug } from "@/data/quests";
import LudeoHero from "./LudeoHero";
import PlatformTabs from "./PlatformTabs";
import "@/app/redesign.css";
import "@/app/quests/[slug]/quest.css";
import "./ludeo-quest.css";

/* ============================================================
   /quests/ludeo: StreamQuest x Ludeo paid short-form mission.
   Hand-built brief (see ludeo-quest.css for why). The matching
   entry in data/quests.ts carries `customPage: true`, which keeps
   the generic [slug] template from generating this path, and
   `unlisted: true` until launch, which keeps it out of listings
   and marks it noindex here.
   ============================================================ */

const quest = getQuestBySlug("ludeo");

export const metadata: Metadata = {
  title: "Ludeo: paid short-form creator mission",
  description:
    "Get paid to showcase Ludeo. One original 20 to 45 second vertical video for TikTok, Instagram Reels or YouTube Shorts. Guaranteed base plus performance rewards, up to €250.",
  ...(quest?.unlisted ? { robots: { index: false, follow: false } } : {}),
  alternates: { canonical: "https://streamquest.io/quests/ludeo" },
  openGraph: {
    title: "Ludeo: paid short-form creator mission | StreamQuest",
    description:
      "One original short-form video introducing Ludeo. Guaranteed base plus performance rewards, up to €250.",
    images: ["/media/ludeo/quest/cover.webp"],
  },
};

const APPLY = "https://app.streamquest.io";
const LUDEO = "https://ludeo.com";
const LUDEO_DISCORD = "https://discord.com/invite/ludeo-892682814938566707";
const SQ_DISCORD = "https://discord.gg/NhqfucYDXD";

const Q = "/firebase-public/Questy%20New%20Folder/Questy%20Regular%20Size%20";
const questy = (n: number) => `${Q}(${n}).webp`;

const heroMeta = [
  { label: "Platforms", value: "TikTok · Instagram Reels · YouTube Shorts" },
  { label: "Format", value: "Original vertical video" },
  { label: "Selection", value: "Curated, limited spots" },
  { label: "Campaign window", value: "Dates announced soon" },
  { label: "Reward", value: "Guaranteed base plus performance rewards" },
  { label: "Maximum payout", value: "Up to €250", max: true },
];

const tldr = [
  { stat: "€25", label: "Bronze", sub: "Guaranteed, up to €100 total" },
  { stat: "€50", label: "Silver", sub: "Guaranteed, up to €175 total" },
  { stat: "€100", label: "Gold", sub: "Guaranteed, up to €250 total" },
  { stat: "20 to 45s", label: "One original video", sub: "Vertical, on TikTok, Reels or Shorts" },
];

const rewards = [
  { tier: "Bronze", base: "€25", priority: "€3", other: "€1.80", max: "€100" },
  { tier: "Silver", base: "€50", priority: "€4", other: "€2.40", max: "€175" },
  { tier: "Gold", base: "€100", priority: "€5", other: "€3", max: "€250" },
];

const art = ["game-robocop", "game-payday3", "game-lostcastle", "game-cronos", "game-coh3", "game-redacted"];

const mission = [
  "Introduce Ludeo.",
  "Feature 2 to 3 approved Playables.",
  "Explain that viewers can play the showcased moments themselves.",
  "Make clear that Playables currently require desktop.",
  "Invite viewers to join the Ludeo Discord.",
  "Include the required sponsored-content disclosure.",
  "Feel like content you would actually publish on your own channel.",
];

const metrics = [
  {
    title: "Median views",
    body: "The middle view count from the sample. One viral video cannot carry your whole application.",
  },
  {
    title: "Median like rate",
    formula: "Likes ÷ views × 100",
    body: "Worked out for every video. We then look at your typical result across the sample.",
  },
  {
    title: "Genuine commenters",
    body: "The normal number of distinct genuine viewers leaving comments on your content.",
  },
  {
    title: "Followers or subscribers",
    body: "Your current audience size is an extra credibility and account-history check. It does not replace your performance requirements.",
  },
];

const notGenuine = [
  "Your own comments or replies",
  "Obvious bot comments",
  "Repeated copy-and-paste comments",
  "Spam",
  "Engagement-pod activity",
  "Giveaway spam unrelated to the content",
  "Multiple comments from the same viewer, when assessing unique participation",
  "Clearly purchased engagement",
];

const markets = [
  "European Union",
  "United States",
  "Canada",
  "United Kingdom",
  "Norway",
  "Switzerland",
  "Iceland",
  "Australia",
  "New Zealand",
];

const performance = [
  {
    heading: "Performance rewards",
    body: "Your guaranteed base protects the work you put into producing an approved video. Verified organic performance then increases your payout until you reach your tier cap. A Gold creator, for example, may receive a €100 guaranteed base, €5 per 1,000 eligible views in priority markets, and a €250 maximum total payout. The exact calculation and rate are confirmed in your offer. An unusually large mismatch between views and genuine audience activity may trigger additional verification before variable rewards are approved. That does not remove your guaranteed base if you completed the mission correctly.",
  },
  {
    heading: "Organic performance only",
    body: "Purchased views, likes, comments, bots, engagement exchanges, artificial traffic, spam and undisclosed paid boosting do not count toward performance rewards. Do not boost the commissioned post during the 30-day measurement window unless StreamQuest approves it beforehand. We may compare the sponsored video's performance with your normal historical metrics where unusual activity appears.",
  },
  {
    heading: "Analytics and verification",
    body: "The performance window lasts 30 days after publication. We normally request an early performance snapshot around Day 7 and final campaign analytics at Day 30. Screenshots or native exports are accepted, and StreamQuest may request a dashboard walkthrough if metrics need additional verification. We will never ask for your password.",
  },
];

const rules = [
  {
    heading: "Draft approval",
    body: "Do not publish before your video is approved. Create your video, submit the draft to StreamQuest, complete any required factual or compliance corrections, receive approval, then publish during your assigned campaign window. No approval, no publication.",
  },
  {
    heading: "Keep your post live",
    body: "The commissioned post must normally remain publicly available for at least 60 days after publication. Do not delete, privatise or materially change it during that period without contacting StreamQuest.",
  },
  {
    heading: "Cross-posting",
    body: "Your commission includes the specific primary placement listed in your offer. Posting the same video on another platform does not automatically create another base payment or performance reward. Additional placements must be included in your individual commission.",
  },
  {
    heading: "Content rights",
    body: "You remain the creator and owner of your original content. By accepting this paid commission, you also allow the approved final sponsored video to be reused by Ludeo for marketing purposes, including permitted organic and paid-media use under the applicable StreamQuest campaign terms. This does not give Ludeo your account, raw footage, editable project files or rights to unrelated content.",
  },
  {
    heading: "Honest content",
    body: "This is sponsored content. It is not a paid positive review. Payment is for producing and publishing the agreed campaign content, not for pretending to have an opinion you do not have.",
  },
];

const steps = [
  { title: "Create", sub: "Make your video once your offer is confirmed" },
  { title: "Submit", sub: "Send the draft to StreamQuest" },
  { title: "Get approved", sub: "Factual and compliance check" },
  { title: "Publish", sub: "During your assigned campaign window" },
  { title: "Send analytics", sub: "Around Day 7 and Day 30" },
  { title: "Get paid", sub: "Base plus verified performance" },
];

const ready = [
  { tier: "Bronze", cls: "is-bronze", base: "€25 guaranteed", max: "up to €100" },
  { tier: "Silver", cls: "is-silver", base: "€50 guaranteed", max: "up to €175" },
  { tier: "Gold", cls: "is-gold", base: "€100 guaranteed", max: "up to €250" },
];

export default function LudeoQuestPage() {
  return (
    <div className="rd lq-page">
      {/* ============ HERO ============ */}
      <LudeoHero>
        <div className="lq-badges">
          <span className="q-status active">
            <span className="pulse" />
            Paid creator mission
          </span>
          <span className="q-category">Short-form</span>
        </div>
        <p className="lq-kicker">StreamQuest x Ludeo</p>
        <h1>
          Create gaming content? <span className="grad">Get paid to showcase Ludeo.</span>
        </h1>
        <p className="lq-lead">
          Ludeo turns memorable gameplay moments into experiences people can actually play, straight
          from their desktop browser. Instead of only watching a gaming clip, someone can open the
          Ludeo link and jump into that moment themselves. We are looking for gaming creators who can
          introduce Ludeo in their own style, showcase a few Playables and invite their audience into
          the Ludeo community.
        </p>
        <div className="lq-cta-row">
          <a href={APPLY} className="btn btn-primary btn-xl">Apply for the quest</a>
          <a href={LUDEO} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-xl">
            Explore Ludeo
          </a>
          <a href={LUDEO_DISCORD} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-xl">
            Join the Ludeo Discord
          </a>
        </div>
        <div className="lq-meta">
          {heroMeta.map((m) => (
            <div key={m.label} className={`lq-meta-item${m.max ? " is-max" : ""}`}>
              <span className="lq-meta-label">{m.label}</span>
              <span className="lq-meta-value">{m.value}</span>
            </div>
          ))}
        </div>
      </LudeoHero>

      {/* ============ TL;DR ============ */}
      <section className="q-section">
        <div className="rd-shell">
          <Reveal>
            <div className="q-section-head q-section-head-center">
              <span className="q-tag">At a glance</span>
              <h2>TL;DR</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="q-tldr-grid">
              {tldr.map((t) => (
                <div key={t.label} className="q-tldr-card">
                  <div className="q-tldr-stat">{t.stat}</div>
                  <div className="q-tldr-label">{t.label}</div>
                  <div className="q-tldr-sub">{t.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="q-tldr-foot">
              <p>Your maximum payout includes your guaranteed base.</p>
              <p>The guaranteed base is earned once your approved video is published correctly and the required proof is submitted.</p>
              <p>Poor campaign performance does not remove your guaranteed base.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ WHAT IS LUDEO ============ */}
      <section className="q-section q-section-strip">
        <div className="rd-shell">
          <Reveal>
            <div className="q-section-head">
              <span className="q-tag">What is Ludeo?</span>
              <h2>What if you could play the clip instead of only watching it?</h2>
              <p>
                Ludeo takes memorable moments from PC games and turns them into playable experiences.
                Someone discovers a Ludeo moment, opens it on desktop and can jump directly into that
                part of the game through their browser.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="lq-flow">
              <span className="lq-flow-step">Watch the moment</span>
              <span className="lq-flow-arrow" aria-hidden="true">→</span>
              <span className="lq-flow-step">Click</span>
              <span className="lq-flow-arrow" aria-hidden="true">→</span>
              <span className="lq-flow-step">Play it yourself</span>
            </div>
            <p>
              For this campaign, your job is to make that concept easy to understand, interesting to
              watch and worth trying.
            </p>
          </Reveal>
          <Reveal>
            <div className="lq-art">
              {art.map((f) => (
                <div key={f} className="lq-art-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/media/ludeo/${f}.webp`} alt="" loading="lazy" />
                </div>
              ))}
            </div>
            <p className="lq-art-caption">
              Game artwork from ludeo.com. The approved Playables bank is shared with selected creators.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ YOUR MISSION ============ */}
      <section className="q-section">
        <div className="rd-shell">
          <div className="lq-split">
            <Reveal>
              <span className="q-tag">Your mission</span>
              <h2>One original 20 to 45 second vertical video.</h2>
              <p>Create one original vertical video introducing Ludeo. Your video should:</p>
              <ul className="q-list" style={{ marginTop: 22 }}>
                {mission.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <p style={{ marginTop: 24 }}>
                You do not need to follow a word-for-word script. Use your own hook, editing, humour,
                voice-over, facecam, captions and style.
              </p>
            </Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="lq-questy" src={questy(2)} alt="" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ============ CREATOR REWARDS ============ */}
      <section className="q-section q-section-strip">
        <div className="rd-shell">
          <div className="lq-split is-reverse">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="lq-questy is-late" src={questy(7)} alt="" loading="lazy" />
            <Reveal>
              <span className="q-tag">Creator rewards</span>
              <h2>Guaranteed payment plus performance upside.</h2>
              <p>
                We do not determine your tier from followers or one viral video. StreamQuest reviews
                your 10 most recent comparable original short-form videos and looks at four things
                together.
              </p>
              <div className="lq-chips">
                <span className="lq-chip is-key">Typical views</span>
                <span className="lq-chip is-key">Account size</span>
                <span className="lq-chip is-key">Like rate</span>
                <span className="lq-chip is-key">Genuine comments</span>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div className="lq-table-wrap">
              <table className="lq-table">
                <thead>
                  <tr>
                    <th>Tier</th>
                    <th>Guaranteed base</th>
                    <th>Priority-market CPM</th>
                    <th>Other-market CPM</th>
                    <th>Maximum total payout</th>
                  </tr>
                </thead>
                <tbody>
                  {rewards.map((r) => (
                    <tr key={r.tier}>
                      <td><span className={`lq-tier is-${r.tier.toLowerCase()}`}>{r.tier}</span></td>
                      <td className="is-base">{r.base}</td>
                      <td className="is-num">
                        {r.priority} <small>per 1,000 eligible views</small>
                      </td>
                      <td>
                        {r.other} <small>per 1,000 eligible views</small>
                      </td>
                      <td className="is-max">{r.max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="lq-notes">
              <li>Your maximum payout includes your guaranteed base.</li>
              <li>The guaranteed base is earned after your approved video has been published correctly and the required proof has been submitted.</li>
              <li>Poor campaign performance does not remove your guaranteed base.</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============ HOW WE DETERMINE YOUR TIER ============ */}
      <section className="q-section">
        <div className="rd-shell">
          <div className="lq-split">
            <Reveal>
              <span className="q-tag">How we determine your tier</span>
              <h2>Views alone are not enough.</h2>
              <p>
                A creator with 50,000 views and almost no likes or real conversation may not be more
                valuable than a creator with 8,000 views and an active gaming community. Your tier
                therefore requires you to pass all of the normal qualification gates for your
                platform, calculated from your recent comparable original short-form content.
              </p>
              <p>
                Sponsored posts, obviously boosted content, paid traffic and clear viral outliers may
                be excluded when assessing your normal performance.
              </p>
            </Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="lq-questy" src={questy(3)} alt="" loading="lazy" />
          </div>

          <Reveal>
            <div style={{ marginTop: 52 }}>
              <span className="q-tag">Choose your platform</span>
              <h2>Three platforms, each judged on its own terms.</h2>
              <p>
                Your commission will specify one primary platform. You can apply with multiple
                accounts, and StreamQuest evaluates each submitted platform separately, so you could
                qualify as Silver on TikTok, Bronze on Instagram and Gold on YouTube Shorts. Your paid
                offer states which account and platform the commission applies to.
              </p>
            </div>
            <PlatformTabs />
          </Reveal>
        </div>
      </section>

      {/* ============ HOW WE CALCULATE ============ */}
      <section className="q-section q-section-strip">
        <div className="rd-shell">
          <Reveal>
            <div className="q-section-head">
              <span className="q-tag">How we calculate your metrics</span>
              <h2>Your 10 most recent comparable videos, four measures.</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="lq-cards">
              {metrics.map((m) => (
                <div key={m.title} className="lq-card">
                  <h3>{m.title}</h3>
                  {m.formula && <span className="lq-formula">{m.formula}</span>}
                  <p>{m.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="lq-twocol">
            <Reveal>
              <h3>What counts as a genuine comment?</h3>
              <p>
                For creator qualification, we are looking for evidence of a real audience, not
                inflated interaction numbers. A genuine comment is normally a top-level comment made
                by a real viewer reacting to the content. We may exclude:
              </p>
              <ul className="lq-notes">
                {notGenuine.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
              <p style={{ marginTop: 18 }}>
                We primarily look at the number of distinct genuine commenters, not the largest raw
                comment number displayed under the video.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h3>Why we use multiple metrics</h3>
              <p>A healthy creator should show more than reach. We want to see:</p>
              <ul className="lq-signals">
                <li>People watching</li>
                <li>People reacting</li>
                <li>People talking</li>
                <li>A real account behind those numbers</li>
              </ul>
              <p>
                Follower count alone can be misleading. Views alone can be misleading too. That is
                why every paid StreamQuest Short-Form tier combines reach and engagement.
              </p>
              <p>
                If one of your metrics is just below a threshold, StreamQuest may manually review your
                profile, but tier exceptions are not automatic.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ PRIORITY MARKETS ============ */}
      <section className="q-section">
        <div className="rd-shell">
          <Reveal>
            <div className="q-section-head">
              <span className="q-tag">Priority markets</span>
              <h2>Where the higher CPM applies.</h2>
              <p>The higher CPM applies to qualifying audiences primarily located in:</p>
            </div>
            <div className="lq-chips">
              {markets.map((m) => (
                <span key={m} className="lq-chip">{m}</span>
              ))}
            </div>
            <p style={{ marginTop: 22 }}>
              Performance from other markets may use the lower CPM. For mixed audiences, StreamQuest
              may calculate a blended rate based on verified audience geography.
            </p>
            <p>
              Your exact tier, base, CPM, platform and maximum payout will be confirmed before you
              accept the mission.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ PERFORMANCE AND VERIFICATION ============ */}
      <section className="q-section q-section-strip">
        <div className="rd-shell">
          <Reveal>
            <div className="q-section-head">
              <span className="q-tag">Performance and verification</span>
              <h2>How the variable part of your payout works.</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="q-rules">
              {performance.map((r) => (
                <div key={r.heading} className="q-rules-block">
                  <h3>{r.heading}</h3>
                  <p>{r.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ THE RULES ============ */}
      <section className="q-section">
        <div className="rd-shell">
          <div className="lq-split">
            <Reveal>
              <span className="q-tag">The rules</span>
              <h2>Five things to know before you accept.</h2>
              <p>
                Short version: get approval before you post, keep the video up, and say what you
                actually think.
              </p>
            </Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="lq-questy is-late" src={questy(9)} alt="" loading="lazy" />
          </div>
          <Reveal>
            <div className="q-rules" style={{ marginTop: 34 }}>
              {rules.map((r) => (
                <div key={r.heading} className="q-rules-block">
                  <h3>{r.heading}</h3>
                  <p>{r.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ HOW TO APPLY ============ */}
      <section className="q-section q-section-strip">
        <div className="rd-shell">
          <Reveal>
            <div className="q-section-head q-section-head-center">
              <span className="q-tag">How to apply</span>
              <h2>Apply, get your offer, then create.</h2>
              <p>
                Apply through StreamQuest and submit the short-form accounts you want reviewed. We may
                request native analytics from your recent content. StreamQuest then confirms your
                platform, tier, guaranteed base, CPM, maximum payout and deliverables before you
                create anything.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="q-steps">
              {steps.map((s) => (
                <div key={s.title} className="q-step">
                  <div className="q-step-title">{s.title}</div>
                  <div className="q-step-sub">{s.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ READY ============ */}
      <section className="q-final lq-final-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="lq-questy lq-final-questy" src={questy(10)} alt="" loading="lazy" />
        <div className="rd-shell">
          <Reveal>
            <span className="q-tag">Ready?</span>
            <h2>
              Pick your platform. <span className="grad">Make the video.</span>
            </h2>
            <div className="lq-ready">
              {ready.map((r) => (
                <div key={r.tier} className="lq-ready-row">
                  <span className={`lq-tier ${r.cls}`}>{r.tier}</span>
                  <span className="lq-ready-base">{r.base}</span>
                  <span className="lq-ready-max">{r.max}</span>
                </div>
              ))}
            </div>
            <div className="q-final-actions">
              <a href={APPLY} className="btn btn-primary btn-xl">Apply for Ludeo</a>
              <a href={LUDEO} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-xl">
                Explore Ludeo
              </a>
              <a href={LUDEO_DISCORD} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-xl">
                Join the Ludeo Discord
              </a>
            </div>
            <p className="lq-final-help">
              Questions? Join the{" "}
              <a href={SQ_DISCORD} target="_blank" rel="noopener noreferrer">StreamQuest Discord</a>{" "}
              and contact us through the campaign-support channel.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
