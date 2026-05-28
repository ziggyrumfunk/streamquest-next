import Link from "next/link";
import type { Metadata } from "next";

import Reveal from "@/app/components/Reveal";
import PolaroidField from "@/app/components/PolaroidField";
import FloatingApply from "@/app/components/FloatingApply";
import "@/app/redesign.css";
import "./quests-guide.css";

export const metadata: Metadata = {
  title: "How to join StreamQuest — Creator quests guide",
  description:
    "Learn how to join StreamQuest as a streamer, how quests work, how rewards are handled, and how creators progress from Bronze to Silver.",
  alternates: { canonical: "/quests-guide" },
};

/* Pool of gameplay screenshots used for the scrolling background of the compact hero */
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
  "/firebase-public/Replaced/sq-replaced-screenshot-01.webp",
  "/firebase-public/Replaced/sq-replaced-screenshot-02.webp",
  "/firebase-public/Replaced/sq-replaced-screenshot-03.webp",
  "/firebase-public/TemTem/TEMTEM GAMEPLAYSCREENSHOT (1).jpg",
  "/firebase-public/TemTem/TEMTEM GAMEPLAYSCREENSHOT (3).jpg",
  "/firebase-public/TemTem/TEMTEM GAMEPLAYSCREENSHOT (5).jpg",
];
const rotate = (a: string[], n: number) => [...a.slice(n), ...a.slice(0, n)];
const heroRowA: string[] = [...gameplayPool, ...gameplayPool];
const heroRowB: string[] = [...rotate(gameplayPool, 11), ...rotate(gameplayPool, 11)];

/* Questy mascots floating around the final CTA section */
const finalQuesties = [
  { src: "/firebase-public/Questy New Folder/Questy Small Size (1).webp", className: "f1", depth: 0.5 },
  { src: "/firebase-public/Questy New Folder/Questy Small Size (2).webp", className: "f2", depth: 0.6 },
  { src: "/firebase-public/Questy New Folder/Questy Small Size (3).webp", className: "f3", depth: 0.45 },
  { src: "/firebase-public/Questy New Folder/Questy Small Size (4).webp", className: "f4", depth: 0.55 },
];

const criteria = [
  "Energy and personality on stream — you carry the room",
  "A real connection with your viewers, not just a follower count",
  "Some signs of community outside of just pressing go live",
  "A clean creator profile and a track record of finishing what you start",
];

const journey = [
  { num: "01", title: "Discover a quest", body: "Quests drop in our Discord, in weekly updates, and on the active quests page of the site." },
  { num: "02", title: "Read the mission brief", body: "Game, campaign timing, payout tiers, side quests, embargo notes — everything in one place." },
  { num: "03", title: "Apply via Twitch", body: "Log in to the Creator Dashboard with your Twitch account. Status goes to Pending while we review fit for the quest." },
  { num: "04", title: "Stream the quest", body: "Most quests run about two weeks. Hit the main objective. Add side quests for extra XP." },
  { num: "05", title: "Submit and get paid", body: "Drop your VOD, viewer stats, and side-quest proof in the dashboard. Reviewed by a real person. Most payouts within 48 hours, max 5 business days." },
];

export default function QuestsGuidePage() {
  return (
    <div className="rd">
      <FloatingApply />
      {/* ============ HERO — compact docs-style header w/ scrolling bg ============ */}
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
                Creator journey
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1>
                How to join <span className="grad">StreamQuest</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="qg-hero-sub">
                Mission briefs, dashboard applications, manual review, Discord support, and a clear Bronze-to-Silver journey. Built for creators with real communities.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="qg-hero-ctas">
                <a href="https://discord.gg/NhqfucYDXD" className="btn btn-primary">
                  Apply on Discord →
                </a>
                <a href="https://app.streamquest.io" className="btn btn-secondary">
                  Open Creator Dashboard
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="qg-hero-mascot"
              src="/firebase-public/Questy New Folder/Questy Regular Size (1).webp"
              alt=""
              aria-hidden="true"
              loading="eager"
            />
          </Reveal>
        </div>
      </section>

      <div className="qg-hero-sep" aria-hidden="true" />

      {/* ============ MINIMUM REQUIREMENTS (highlighted) ============ */}
      <section className="qg-requirements">
        <div className="rd-shell">
          <div className="qg-requirements-inner">
            <Reveal>
              <div className="qg-req-head">
                <span className="qg-req-tag">
                  <span className="pulse" />
                  The minimum bar
                </span>
                <h2>To be considered for any quest.</h2>
                <p>This is the hard floor. Below these numbers we cannot place you on a campaign, even if everything else looks great.</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="qg-req-grid">
                <div className="qg-req-item">
                  <div className="qg-req-num">300+</div>
                  <div className="qg-req-label">Twitch followers</div>
                  <div className="qg-req-body">Real audience baseline. Exceptions only for clearly authentic small communities.</div>
                </div>
                <div className="qg-req-item">
                  <div className="qg-req-num">5+</div>
                  <div className="qg-req-label">Average CCV</div>
                  <div className="qg-req-body">Recent average concurrent viewers across your last streams. View-bombing disqualifies instantly.</div>
                </div>
                <div className="qg-req-item">
                  <div className="qg-req-num">Active</div>
                  <div className="qg-req-label">Twitch + Discord</div>
                  <div className="qg-req-body">Account in good standing on Twitch. Discord account for quest drops and support.</div>
                </div>
                <div className="qg-req-item">
                  <div className="qg-req-num">All</div>
                  <div className="qg-req-label">Regions welcome</div>
                  <div className="qg-req-body">EU, LATAM, Asia, Africa, anywhere. Payouts work globally via your Twitch donation provider.</div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <p className="qg-req-foot">
                Hit these numbers and you qualify to apply. Final selection is per-quest and based on <strong>fit</strong> — your content, audience, and the campaign brief.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ WHO WE LOOK FOR ============ */}
      <section className="qg-section lime-tint">
        <div className="rd-shell">
          <Reveal>
            <div className="qg-section-head">
              <span className="qg-section-tag">Who we look for</span>
              <h2>Creators who show up, engage, and care.</h2>
              <p>We don&apos;t chase follower counts. We pick creators whose viewers actually stick around and whose chats are real.</p>
            </div>
          </Reveal>

          <Reveal>
            <ul className="qg-criteria">
              {criteria.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </Reveal>

          <Reveal>
            <div className="qg-helpful">
              <div className="qg-helpful-label">Helpful but not required</div>
              <p>A working webcam or strong on-stream presence. Some activity outside Twitch — a Discord, socials, or any visible community ties. Consistency in tone, profile, and content quality.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ THE JOURNEY ============ */}
      <section className="qg-section purple-tint dotgrid">
        <div className="rd-shell">
          <Reveal>
            <div className="qg-section-head">
              <span className="qg-section-tag">The journey</span>
              <h2>From discovery to <span className="grad">reward</span>.</h2>
              <p>Five steps from your first quest application to your first paid stream.</p>
            </div>
          </Reveal>

          <div className="qg-journey">
            {journey.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.06}>
                <div className="qg-step">
                  <span className="qg-step-num">Step {s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PAYOUTS & REWARDS ============ */}
      <section className="qg-section">
        <div className="rd-shell">
          <Reveal>
            <div className="qg-section-head">
              <span className="qg-section-tag">Payouts &amp; rewards</span>
              <h2>What you actually get.</h2>
              <p>Real money, paid through tools you already use. Plus a free game key on every accepted quest.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="qg-payouts">
              <div className="qg-payout">
                <div className="qg-payout-num">01</div>
                <h3>Paid in EUR via Streamlabs or StreamElements</h3>
                <p>Your existing Twitch donation provider receives the payout. No bank details required for standard payouts. Alternative methods on request.</p>
              </div>
              <div className="qg-payout">
                <div className="qg-payout-num">02</div>
                <h3>48 hours typical · 5 business days max</h3>
                <p>After we manually review your VOD and side-quest proof, the payout clears. We process most within two days.</p>
              </div>
              <div className="qg-payout">
                <div className="qg-payout-num">03</div>
                <h3>Free game key for every accepted quest</h3>
                <p>Approved on a quest? Key gets delivered through Discord. Yours to keep regardless of how the run goes.</p>
              </div>
              <div className="qg-payout">
                <div className="qg-payout-num">04</div>
                <h3>Tracked links for community impact</h3>
                <p>Wishlist and demo links are unique so we can measure the actual lift you drive. Your community work gets credited.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ BRONZE → SILVER ============ */}
      <section className="qg-section lime-tint">
        <div className="rd-shell">
          <Reveal>
            <div className="qg-section-head">
              <span className="qg-section-tag">Tier progression</span>
              <h2>Bronze to <span className="grad">Silver</span>.</h2>
              <p>Every creator starts at Bronze. Earn XP, build a track record, climb up.</p>
            </div>
          </Reveal>

          <div className="qg-tiers">
            <Reveal>
              <div className="qg-tier">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="qg-tier-questy"
                  src="/firebase-public/Questy New Folder/Questy Small Size (1).webp"
                  alt="Questy Bronze"
                  loading="lazy"
                />
                <div className="qg-tier-name">Bronze</div>
                <h3>Your starting point</h3>
                <p>Every approved creator starts here. Complete quests, earn XP, get rewarded, and build your profile over time. Free game key on every accepted quest, access to the Bronze Lounge on Discord, and a 100 XP bonus on your first completed quest.</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="qg-tier silver">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="qg-tier-questy"
                  src="/firebase-public/Questy New Folder/Questy Small Size (8).webp"
                  alt="Questy Silver"
                  loading="lazy"
                />
                <div className="qg-tier-name">Silver</div>
                <h3>The next step up</h3>
                <p>Higher expectations, higher rewards, more trust inside the StreamQuest ecosystem. Silver creators can access longer paid stream caps and Silver-exclusive quests. Earn the badge by completing four quests and maintaining a 15 viewer average.</p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <p className="qg-tier-note">
              Right now XP mainly unlocks tiers like Silver. Over time, StreamQuest will expand the journey further.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ HONEST NOTE ============ */}
      <section className="qg-section">
        <div className="rd-shell">
          <Reveal>
            <div className="qg-section-head">
              <span className="qg-section-tag">A quick honest note</span>
              <h2>On selection and intake.</h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="qg-notes">
              <div className="qg-note">
                <div className="qg-note-label">Applying does not guarantee selection</div>
                <p>We pick by fit per quest, not by lottery. Some quests want atmospheric streamers. Others want chaotic co-op energy. Different briefs, different shortlists.</p>
              </div>
              <div className="qg-note">
                <div className="qg-note-label">Not selected this time is not the end</div>
                <p>The next quest is usually days away. We keep your application on file and you can re-apply for every campaign.</p>
              </div>
              <div className="qg-note">
                <div className="qg-note-label">Intake is sometimes paused</div>
                <p>When we are at capacity reviewing campaigns, new applications can wait a beat. Discord is the fastest way to find out current intake status.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="qg-final">
        <PolaroidField
          tiles={finalQuesties}
          className="qg-questies"
          tileClass="qg-questy"
          intensity={55}
        />

        <div className="qg-final-inner">
          <Reveal>
            <span className="eyebrow">
              <span className="pulse" />
              Build your journey
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>
              Start at <span className="grad">Bronze</span>. Climb from there.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p>Join Discord to catch the next quest drop. Apply via the Creator Dashboard when one lands that fits your stream.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="qg-final-actions">
              <a href="https://discord.gg/NhqfucYDXD" className="btn btn-primary btn-xl">
                Apply on Discord →
              </a>
              <a href="https://app.streamquest.io" className="btn btn-secondary btn-xl">
                Open Creator Dashboard
              </a>
              <Link href="/streamers" className="btn btn-ghost btn-xl">
                Back to streamers landing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
