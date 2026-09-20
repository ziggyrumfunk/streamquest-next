import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import Reveal from "@/app/components/Reveal";
import PolaroidField from "@/app/components/PolaroidField";
import PlatformTabs from "./PlatformTabs";
import TierChecker from "./TierChecker";
import QuestBackLink from "./QuestBackLink";
import "@/app/redesign.css";
import "@/app/quests-guide/quests-guide.css";
import "./shortform-guide.css";

/* ============================================================
   /shortform-guide: how StreamQuest short-form quests work.

   The general, in-depth companion to every short-form quest brief
   (TikTok, Instagram Reels, YouTube Shorts). A brief stays short and
   covers its own campaign: the product, the must-haves, what each
   tier pays. Everything that is the same from quest to quest lives
   here: the process, how payouts are built, posting on several
   platforms, tiers and their thresholds, proof, and the rules.

   Nothing on this page may be specific to one client. Per-quest
   numbers come in only through the tier checker, and only when the
   creator arrived from that quest's brief (?quest=<slug>).

   Shares the hero, section frame and closing of /quests-guide so the
   two guides read as a pair; owns everything prefixed .sfg-.
   ============================================================ */

/* Flip to true once the first short-form quest is publicly listed. Until
   then the guide is reachable by link only: noindex, and not in the nav
   or the sitemap. When you flip it, also add the route to app/sitemap.ts. */
const LISTED = false;

export const metadata: Metadata = {
  title: "Short-form quest guide: tiers, payouts and rules",
  description:
    "How StreamQuest short-form quests work on TikTok, Instagram Reels and YouTube Shorts: the process, how creator tiers are set, how payouts are calculated, posting on several platforms, proof and the rules.",
  alternates: { canonical: "https://streamquest.io/shortform-guide" },
  ...(LISTED ? {} : { robots: { index: false, follow: false } }),
};

const SQ_DISCORD = "https://discord.gg/NhqfucYDXD";
const Q = "/firebase-public/Questy%20New%20Folder/Questy%20";
const questy = (n: number) => `${Q}Regular%20Size%20(${n}).webp`;
const questySmall = (n: number) => `${Q}Small%20Size%20(${n}).webp`;

/* Same scrolling gameplay wall as /quests-guide. */
const gameplayPool: string[] = [
  "/firebase-public/Game Screenshots/ASCENDANT.webp",
  "/firebase-public/Game Screenshots/ASKA.webp",
  "/firebase-public/Game Screenshots/ASTRO BURN.webp",
  "/firebase-public/Game Screenshots/CYBERCLUTCH.webp",
  "/firebase-public/Game Screenshots/DRILL AND DELVE.webp",
  "/firebase-public/Game Screenshots/ENDIX.webp",
  "/firebase-public/Game Screenshots/GODBREAKERS.webp",
  "/firebase-public/Game Screenshots/GOOD HEAVENS.webp",
  "/firebase-public/Game Screenshots/GRIDBEAT (1).webp",
  "/firebase-public/Game Screenshots/MEXICAN NINJA.webp",
  "/firebase-public/Game Screenshots/ORBYSS.webp",
  "/firebase-public/Game Screenshots/PLANET OF LANA 2.webp",
  "/firebase-public/Game Screenshots/SIGNAL.webp",
  "/firebase-public/Game Screenshots/TAXI CHAOS 2.webp",
  "/firebase-public/Game Screenshots/TEMTEM SWARM.webp",
  "/firebase-public/Game Screenshots/WILDCARD.webp",
];
const rotate = (a: string[], n: number) => [...a.slice(n), ...a.slice(0, n)];
const heroRowA = [...gameplayPool, ...gameplayPool];
const heroRowB = [...rotate(gameplayPool, 7), ...rotate(gameplayPool, 7)];

const finalQuesties = [
  { src: questySmall(1), className: "f1", depth: 0.5 },
  { src: questySmall(2), className: "f2", depth: 0.6 },
  { src: questySmall(3), className: "f3", depth: 0.45 },
  { src: questySmall(8), className: "f4", depth: 0.55 },
];

const toc = [
  { href: "#process", label: "The process" },
  { href: "#payouts", label: "Getting paid" },
  { href: "#multi-post", label: "Posting everywhere" },
  { href: "#tiers", label: "Tiers" },
  { href: "#tier-check", label: "Tier checker" },
  { href: "#proof", label: "Proof" },
  { href: "#rules", label: "The rules" },
];

const facts = [
  {
    big: "Guaranteed",
    label: "A base payment",
    body: "Yours once your approved video is live and your proof is in. Performance can add to it, never take it away.",
  },
  {
    big: "Per 1,000",
    label: "A performance reward",
    body: "Every 1,000 eligible views adds to your payout, up to the maximum for your tier.",
  },
  {
    big: "Everywhere",
    label: "One video, many posts",
    body: "Post on as many of the supported platforms as you like. You are paid once, on the post that does best.",
  },
  {
    big: "30 days",
    label: "The measuring window",
    body: "We look at your numbers around Day 7 and again at Day 30 after you publish.",
  },
];

const process = [
  {
    title: "Apply",
    body: "Apply through StreamQuest and tell us which short-form accounts you want reviewed. You can submit more than one platform.",
  },
  {
    title: "We review your accounts",
    body: "We look at your 10 most recent comparable videos on each platform and work out your tier per platform. We may ask for native analytics.",
  },
  {
    title: "You get an offer",
    body: "It confirms your tier on each platform, your guaranteed base, your performance rate, your maximum payout and the deliverables. You create nothing before you have accepted it.",
  },
  {
    title: "Make your video",
    body: "The quest brief lists the must-haves. The hook, the edit and the style are yours.",
  },
  {
    title: "Send the draft",
    body: "We check facts and compliance, not your creative choices. If something needs correcting, we tell you exactly what. No approval, no publication.",
  },
  {
    title: "Publish",
    body: "Post inside your campaign window, on every platform you want to use.",
  },
  {
    title: "Send your numbers",
    body: "An early snapshot around Day 7 and your final analytics at Day 30, for every post.",
  },
  {
    title: "Get paid",
    body: "Your guaranteed base, plus the verified performance reward on your best-performing post.",
  },
];

const multiPost = [
  {
    title: "Post wherever you have an audience",
    body: "Publish your approved video on any of the platforms the quest supports. TikTok, Instagram Reels and YouTube Shorts all count, and you do not have to pick one.",
  },
  {
    title: "Send us every number",
    body: "Submit the analytics for each post, not only the strongest one. It shows the client the full reach of the campaign, and it can never cost you anything.",
  },
  {
    title: "One payout, on your best post",
    body: "We work out the reward for each post you submit and pay the one that earns you the most. In practice that is nearly always the post with the most views. Extra posts never lower your payout, they only give you more chances at your maximum.",
  },
  {
    title: "Your tier is set per platform",
    body: "The thresholds differ per platform, so you might be Silver on TikTok and Bronze on Shorts. Each post is calculated at the tier you hold on the platform it was posted on.",
  },
];

const tierFaq: { q: string; body: ReactNode }[] = [
  {
    q: "How do you calculate my metrics?",
    body: (
      <>
        <p>
          From your 10 most recent comparable original short-form videos on a platform, StreamQuest
          works out four measures.
        </p>
        <dl className="sfg-defs">
          <div>
            <dt>Median views</dt>
            <dd>The middle view count from the sample. One viral video cannot carry your whole application.</dd>
          </div>
          <div>
            <dt>
              Median like rate
              <small>Likes ÷ views × 100</small>
            </dt>
            <dd>Worked out for every video. We then look at your typical result across the sample.</dd>
          </div>
          <div>
            <dt>Genuine commenters</dt>
            <dd>The normal number of distinct genuine viewers leaving comments on your content.</dd>
          </div>
          <div>
            <dt>Followers or subscribers</dt>
            <dd>An extra credibility and account-history check. It does not replace your performance requirements.</dd>
          </div>
        </dl>
      </>
    ),
  },
  {
    q: "What gets left out of my sample?",
    body: (
      <p>
        Sponsored posts, obviously boosted content, paid traffic and clear viral outliers may be
        excluded when we assess your normal performance. The aim is to see what a typical video of
        yours does, not your best day or your worst.
      </p>
    ),
  },
  {
    q: "What counts as a genuine comment?",
    body: (
      <>
        <p>
          We are looking for evidence of a real audience, not inflated interaction numbers. A genuine
          comment is normally a top-level comment made by a real viewer reacting to the content. We
          may exclude:
        </p>
        <ul className="sfg-notes">
          <li>Your own comments or replies</li>
          <li>Obvious bot comments</li>
          <li>Repeated copy-and-paste comments</li>
          <li>Spam</li>
          <li>Engagement-pod activity</li>
          <li>Giveaway spam unrelated to the content</li>
          <li>Multiple comments from the same viewer, when assessing unique participation</li>
          <li>Clearly purchased engagement</li>
        </ul>
        <p>
          We primarily look at the number of distinct genuine commenters, not the largest raw comment
          number displayed under the video.
        </p>
      </>
    ),
  },
  {
    q: "Why several metrics instead of just views?",
    body: (
      <>
        <p>A healthy creator should show more than reach. We want to see:</p>
        <ul className="sfg-signals">
          <li>People watching</li>
          <li>People reacting</li>
          <li>People talking</li>
          <li>A real account behind those numbers</li>
        </ul>
        <p>
          Follower count alone can be misleading. Views alone can be misleading too. That is why every
          paid StreamQuest short-form tier combines reach and engagement.
        </p>
      </>
    ),
  },
  {
    q: "I am just under a threshold. Should I still apply?",
    body: (
      <p>
        Yes. If one of your metrics is just below a threshold, StreamQuest may manually review your
        profile, and another of your platforms may qualify on its own. Tier exceptions are not
        automatic, though.
      </p>
    ),
  },
];

const rules = [
  {
    heading: "Original and edited",
    body: "A short-form quest pays for a video you made for it. It has to be edited: cuts, captions, voice-over, facecam, whatever your style is. A raw clip or an unedited screen recording does not qualify, and neither does someone else's footage. Length and must-haves are in the quest brief.",
  },
  {
    heading: "Draft approval",
    body: "Do not publish before your video is approved. Create your video, submit the draft to StreamQuest, complete any required factual or compliance corrections, receive approval, then publish during your assigned campaign window. No approval, no publication.",
  },
  {
    heading: "Keep your posts live",
    body: "Every post you submit for a quest must normally remain publicly available for at least 60 days after publication. Do not delete, privatise or materially change it during that period without contacting StreamQuest.",
  },
  {
    heading: "Disclose the sponsorship",
    body: "A quest video is sponsored content and has to be clearly disclosed as such on every platform you post it on. Your quest brief or offer tells you what is required.",
  },
  {
    heading: "Content rights",
    body: "You remain the creator and owner of your original content. By accepting a paid commission, you also allow the approved final sponsored video to be reused by the client for marketing purposes, including permitted organic and paid-media use under the applicable StreamQuest campaign terms. This does not give the client your account, raw footage, editable project files or rights to unrelated content.",
  },
  {
    heading: "Honest content",
    body: "This is sponsored content. It is not a paid positive review. Payment is for producing and publishing the agreed campaign content, not for pretending to have an opinion you do not have.",
  },
];

const honest = [
  {
    label: "Applying does not guarantee a spot",
    body: "Short-form quests are curated and places are limited. We pick by fit for the quest, not by lottery, and not by follower count.",
  },
  {
    label: "Your offer comes before any work",
    body: "Tier, guaranteed base, rate, maximum payout and deliverables are all confirmed in your individual offer. You decide whether to accept before you create anything.",
  },
  {
    label: "Not selected this time is not the end",
    body: "Every quest has its own brief and its own shortlist. You can apply again for the next one.",
  },
];

export default function ShortformGuidePage() {
  return (
    <div className="rd sfg-page">
      {/* ============ HERO ============ */}
      <section className="qg-hero">
        <div className="qg-hero-bg" aria-hidden="true">
          <div className="qg-hero-row a">
            {heroRowA.map((src, i) => (
              <div key={`a-${i}`} className="qg-hero-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading={i < 4 ? "eager" : "lazy"} decoding="async" />
              </div>
            ))}
          </div>
          <div className="qg-hero-row b">
            {heroRowB.map((src, i) => (
              <div key={`b-${i}`} className="qg-hero-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>

        <div className="qg-hero-inner">
          <div className="qg-hero-text">
            <Reveal>
              <span className="eyebrow">
                <span className="pulse" />
                Short-form quest guide
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1>
                How short-form quests <span className="grad">work</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="qg-hero-sub sfg-hero-sub">
                Paid missions for TikTok, Instagram Reels and YouTube Shorts. This is the long
                version: how your tier is set, how you get paid, what we check and what we expect
                from you. Each quest brief covers its own campaign. This page covers everything that
                stays the same.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="qg-hero-ctas">
                <a href="#tier-check" className="btn btn-primary">Check your tier</a>
                <QuestBackLink
                  className="btn btn-secondary"
                  fallback={
                    <a href={SQ_DISCORD} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      Join the StreamQuest Discord
                    </a>
                  }
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="qg-hero-mascot" src={questy(2)} alt="" aria-hidden="true" loading="eager" />
          </Reveal>
        </div>
      </section>

      <div className="qg-hero-sep" aria-hidden="true" />

      {/* ============ ON THIS PAGE ============ */}
      <nav className="sfg-toc" aria-label="On this page">
        <div className="rd-shell">
          <span className="sfg-toc-label">On this page</span>
          <ul>
            {toc.map((t) => (
              <li key={t.href}>
                <a href={t.href}>{t.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ============ IN SHORT ============ */}
      <section className="qg-requirements">
        <div className="rd-shell">
          <div className="qg-requirements-inner">
            <Reveal>
              <div className="qg-req-head">
                <span className="qg-req-tag">
                  <span className="pulse" />
                  In short
                </span>
                <h2>Four things to remember.</h2>
                <p className="sfg-lead">If you read nothing else on this page, read these.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="sfg-facts">
                {facts.map((f) => (
                  <div key={f.label} className="sfg-fact">
                    <div className="sfg-fact-big">{f.big}</div>
                    <div className="sfg-fact-label">{f.label}</div>
                    <p>{f.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ THE PROCESS ============ */}
      <section id="process" className="qg-section purple-tint dotgrid sfg-anchor">
        <div className="rd-shell">
          <Reveal>
            <div className="qg-section-head">
              <span className="qg-section-tag">The process</span>
              <h2>
                From application to <span className="grad">payout</span>.
              </h2>
              <p className="sfg-lead">
                The same eight steps on every short-form quest. Nothing is created, and nothing is
                posted, before you have a confirmed offer.
              </p>
            </div>
          </Reveal>
          <div className="qg-journey sfg-journey">
            {process.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i, 4) * 0.05}>
                <div className="qg-step">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GETTING PAID ============ */}
      <section id="payouts" className="qg-section sfg-anchor">
        <div className="rd-shell">
          <Reveal>
            <div className="qg-section-head">
              <span className="qg-section-tag">Getting paid</span>
              <h2>A guaranteed base, plus what your video earns.</h2>
              <p className="sfg-lead">
                Every short-form quest pays in two parts. The amounts differ per quest and per tier,
                and the quest brief lists them.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="sfg-pay">
              <div className="sfg-pay-card">
                <span className="sfg-box-tag">Part one</span>
                <h3>Guaranteed base</h3>
                <p>
                  Earned once your approved video has been published correctly and the required proof
                  has been submitted. Poor campaign performance does not remove it.
                </p>
              </div>
              <div className="sfg-pay-plus" aria-hidden="true">+</div>
              <div className="sfg-pay-card">
                <span className="sfg-box-tag">Part two</span>
                <h3>Performance reward</h3>
                <p>
                  Paid per 1,000 eligible views, on verified organic performance in the 30 days after
                  you publish. It stops at your tier&apos;s maximum total payout, which includes the
                  base.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="sfg-formula">
              <span className="sfg-box-tag">The sum</span>
              <p className="sfg-formula-line">
                Guaranteed base + (eligible views ÷ 1,000 × your rate), up to your tier maximum
              </p>
              <div className="sfg-formula-example">
                <p>
                  <strong>An example with made-up numbers.</strong> Say your tier pays a €40 base, €3
                  per 1,000 eligible views and a €150 maximum. Your best post reaches 22,000 eligible
                  views:
                </p>
                <p className="sfg-formula-math">€40 + (22 × €3) = €106</p>
                <p>
                  At 50,000 views the sum would come to €190, so you would receive the €150 maximum.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="sfg-duo">
              <div>
                <h3>Priority markets</h3>
                <p>
                  Some quests pay a higher rate for views from the countries the client cares most
                  about. Those priority markets are listed in the quest brief. Views from other
                  countries count at a lower rate, and for a mixed audience StreamQuest may calculate
                  a blended rate based on your verified audience geography.
                </p>
              </div>
              <div>
                <h3>When the numbers look off</h3>
                <p>
                  An unusually large mismatch between views and genuine audience activity may trigger
                  additional verification before a performance reward is approved. That does not
                  remove your guaranteed base if you completed the mission correctly.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ POSTING EVERYWHERE ============ */}
      <section id="multi-post" className="qg-section lime-tint sfg-anchor">
        <div className="rd-shell">
          <div className="sfg-split">
            <Reveal>
              <div className="sfg-split-head">
                <span className="qg-section-tag">Posting everywhere</span>
                <h2>One video. Every platform. Paid on your best.</h2>
                <p className="sfg-lead">
                  You do not choose a platform up front. Post your video wherever you have an
                  audience, and let the strongest post decide your payout.
                </p>
              </div>
            </Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="sfg-questy" src={questy(6)} alt="" loading="lazy" />
          </div>
          <Reveal>
            <div className="sfg-cards">
              {multiPost.map((m) => (
                <div key={m.title} className="sfg-card">
                  <h3>{m.title}</h3>
                  <p>{m.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ TIERS ============ */}
      <section id="tiers" className="qg-section sfg-anchor">
        <div className="rd-shell">
          <div className="sfg-split">
            <Reveal>
              <div className="sfg-split-head">
                <span className="qg-section-tag">Creator tiers</span>
                <h2>Bronze, Silver, Gold. Views alone are not enough.</h2>
                <p className="sfg-lead">
                  A creator with 50,000 views and almost no likes or real conversation may not be more
                  valuable than a creator with 8,000 views and an active gaming community. So we do
                  not set your tier from followers, or from one viral video. We review your 10 most
                  recent comparable videos and look at four things together.
                </p>
                <div className="sfg-chips">
                  <span className="sfg-chip">Typical views</span>
                  <span className="sfg-chip">Account size</span>
                  <span className="sfg-chip">Like rate</span>
                  <span className="sfg-chip">Genuine comments</span>
                </div>
              </div>
            </Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="sfg-questy is-late" src={questy(3)} alt="" loading="lazy" />
          </div>

          <Reveal>
            <p className="sfg-body">
              You need to pass all four gates for a tier, on that platform. Each platform is judged on
              its own terms, because people behave differently on each one. A quest brief can set its
              own thresholds; if it does, the brief wins.
            </p>
            <PlatformTabs />
          </Reveal>

          <Reveal>
            <div className="sfg-acc">
              {tierFaq.map((f, i) => (
                <details key={f.q} className="sfg-acc-item" open={i === 0}>
                  <summary>{f.q}</summary>
                  <div className="sfg-acc-body">{f.body}</div>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ TIER CHECKER ============ */}
      <section id="tier-check" className="qg-section purple-tint sfg-anchor">
        <div className="rd-shell">
          <Reveal>
            <div className="qg-section-head">
              <span className="qg-section-tag">Tier checker</span>
              <h2>Where would you land?</h2>
              <p className="sfg-lead">
                Put in your typical numbers for one platform. You get the tier you would likely
                qualify for and what the next one would need.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <TierChecker />
          </Reveal>
        </div>
      </section>

      {/* ============ PROOF ============ */}
      <section id="proof" className="qg-section sfg-anchor">
        <div className="rd-shell">
          <Reveal>
            <div className="qg-section-head">
              <span className="qg-section-tag">Proof and analytics</span>
              <h2>Organic only, and we do check.</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="sfg-duo">
              <div>
                <h3>What counts as organic</h3>
                <p>
                  Purchased views, likes, comments, bots, engagement exchanges, artificial traffic,
                  spam and undisclosed paid boosting do not count toward performance rewards.
                </p>
                <p>
                  Do not boost a commissioned post during the 30-day measurement window unless
                  StreamQuest approves it beforehand. Where unusual activity appears, we may compare
                  the sponsored video&apos;s performance with your normal historical metrics.
                </p>
              </div>
              <div>
                <h3>What you send, and when</h3>
                <p>
                  The performance window lasts 30 days after publication. We normally ask for an early
                  snapshot around Day 7 and your final campaign analytics at Day 30, for every post.
                  The exact fields per platform are listed in the{" "}
                  <a href="#tiers">platform tabs above</a>.
                </p>
                <p>
                  Screenshots or native exports are accepted, and StreamQuest may request a dashboard
                  walkthrough if metrics need additional verification. We will never ask for your
                  password.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ THE RULES ============ */}
      <section id="rules" className="qg-section lime-tint sfg-anchor">
        <div className="rd-shell">
          <div className="sfg-split">
            <Reveal>
              <div className="sfg-split-head">
                <span className="qg-section-tag">The rules</span>
                <h2>Six things that apply to every quest.</h2>
                <p className="sfg-lead">
                  Short version: make something of your own, get approval before you post, keep it
                  up, and say what you actually think.
                </p>
              </div>
            </Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="sfg-questy" src={questy(9)} alt="" loading="lazy" />
          </div>
          <Reveal>
            <div className="sfg-cards is-rules">
              {rules.map((r) => (
                <div key={r.heading} className="sfg-card">
                  <h3>{r.heading}</h3>
                  <p>{r.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ HONEST NOTE ============ */}
      <section className="qg-section">
        <div className="rd-shell">
          <Reveal>
            <div className="qg-section-head">
              <span className="qg-section-tag">A quick honest note</span>
              <h2>On selection and offers.</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="qg-notes sfg-honest">
              {honest.map((h) => (
                <div key={h.label} className="qg-note">
                  <div className="qg-note-label">{h.label}</div>
                  <p>{h.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="qg-final">
        <PolaroidField tiles={finalQuesties} className="qg-questies" tileClass="qg-questy" intensity={55} />
        <div className="qg-final-inner">
          <Reveal>
            <span className="eyebrow">
              <span className="pulse" />
              That is the long version
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>
              Now go make <span className="grad">something good</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="sfg-lead">
              New short-form quests are announced in the StreamQuest Discord first. Questions about a
              quest you are already on go to the campaign-support channel there.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="qg-final-actions">
              <QuestBackLink className="btn btn-primary btn-xl" />
              <a href={SQ_DISCORD} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-xl">
                Join the StreamQuest Discord
              </a>
              <Link href="/quests-guide" className="btn btn-ghost btn-xl">
                Twitch quests guide
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
