import Link from "next/link";
import type { Metadata } from "next";

import Reveal from "@/app/components/Reveal";
import "@/app/redesign.css";
import HeroChair from "./HeroChair";
import ReclineScroll from "./ReclineScroll";
import "./libernovo.css";

export const metadata: Metadata = {
  title: "LiberNovo creator sponsorship",
  description:
    "StreamQuest is helping LiberNovo find Twitch creators for a longer-term ergonomic chair sponsorship. Facecam creators with engaged audiences, apply to be considered.",
  // Sponsor-specific landing sent directly to creators — keep it out of search.
  robots: { index: false, follow: false },
  alternates: { canonical: "https://streamquest.io/libernovo" },
};

const APPLY_EMAIL =
  "mailto:contact@streamquest.io?subject=LiberNovo%20creator%20sponsorship%20application&body=Twitch%20channel%3A%0A30-day%20average%20viewers%3A%0AFollowers%3A%0ACountry%20%2F%20language%3A%0ASocial%20links%3A%0AUse%20a%20facecam%3F%20(yes%2Fno)%3A%0ACurrent%20chair%3A%0AExisting%20chair%2Ffurniture%20sponsorships%3F%3A%0AWhy%20you%27re%20a%20fit%3A%0A";
const DISCORD = "https://discord.gg/NhqfucYDXD";

/* Real product capabilities pulled from LiberNovo's Omni Pro page. */
const productVideos = [
  {
    src: "/media/libernovo/video-back.mp4",
    tag: "Dynamic support",
    title: "The backrest moves with you",
    body: "Synchronized support tracks your spine through every lean, so the chair reads on camera as part of how you play, not a prop.",
  },
  {
    src: "/media/libernovo/video-fan.mp4",
    tag: "Active ventilation",
    title: "Built-in airflow",
    body: "Active ventilation pulls heat away during the long sessions. Less sweat, fewer fidget breaks, steadier framing.",
  },
  {
    src: "/media/libernovo/video-auto.mp4",
    tag: "Smart on / off",
    title: "Senses when you sit",
    body: "The chair powers its active features up and down on its own, so it stays out of your way mid-stream.",
  },
];

const features = [
  { t: "Dynamic synchronized support", d: "The seat and backrest move together and follow your posture instead of forcing one fixed position." },
  { t: "OmniStretch spinal decompression", d: "An active stretch mode that opens up the lower back, on demand, between matches." },
  { t: "Active ventilation", d: "Airflow built into the seat keeps you cool across marathon streams." },
  { t: "160° multi-angle recline", d: "From locked-in upright to a full lean-back for breaks and watch-parties." },
];

const receive = [
  {
    t: "A premium LiberNovo chair",
    d: "Selected creators receive a premium LiberNovo ergonomic chair (approx. €1,200 retail value) as part of the sponsorship, subject to final approval and the separate creator agreement.",
  },
  {
    t: "Your own affiliate link",
    d: "A personal affiliate link or code with a current baseline commission of 5% on eligible attributed sales. There is no guaranteed sales target and no minimum to hit.",
  },
  {
    t: "A real, longer-term partner",
    d: "This is an ongoing collaboration, not a one-off unboxing. You get a direct line through StreamQuest and a brand that wants you on camera for the long run.",
  },
];

const deliver = [
  { t: "At least 4 facecam streams a month", d: "The current intended requirement. Stream as you normally would, with the chair part of your setup." },
  { t: "Keep the chair visible", d: "It should sit naturally in your usual camera framing during qualifying streams. No staged shots required." },
  { t: "Stream like yourself", d: "You do not turn streams into ad reads or product reviews. Lightweight and authentic is the whole point." },
  { t: "Light proof of delivery", d: "Reasonable evidence such as VOD links, stream dates, or clips so we can confirm the streams happened." },
  { t: "Disclose the sponsorship", d: "Follow your local advertising-disclosure rules and flag affiliate links where required." },
  { t: "Communicate early", d: "If something changes and you cannot continue, tell us. Honest and early beats silent." },
];

const idealProfile = [
  { t: "Facecam, every time", d: "Facecam use is mandatory for this opportunity. The chair needs to be visible, or able to be made visible, in your layout." },
  { t: "100+ average viewers preferred", d: "100 or more average concurrent viewers is the primary preference. Strong applications from 50+ CCV are genuinely considered when loyalty, engagement, setup, and market are there." },
  { t: "Consistent and active", d: "A regular schedule and recent activity, with enough monthly streams to hit four qualifying ones comfortably." },
  { t: "Western markets", d: "English-speaking creators are the top priority, alongside Germany, France, Italy, and Spain. Creators elsewhere may still be considered." },
  { t: "No conflicting deals", d: "An active exclusive chair or furniture sponsorship may rule you out. A previously gifted chair with no live obligation usually does not." },
];

const steps = [
  { title: "You apply", sub: "Send your channel, recent metrics, socials, facecam info, current chair, and any existing sponsorships. The prep list below covers it." },
  { title: "StreamQuest screens", sub: "We review your viewers, engagement, facecam use, chair visibility, content quality, location, and brand fit." },
  { title: "We shortlist to LiberNovo", sub: "Suitable creators are presented to LiberNovo with the context that makes the case for you." },
  { title: "LiberNovo decides", sub: "LiberNovo has final approval over who is selected, which chair is provided, and shipping eligibility. Applying does not guarantee acceptance." },
  { title: "Agreement and onboarding", sub: "Approved creators sign a separate creator agreement with the final terms before anything ships." },
  { title: "Ship and activate", sub: "LiberNovo arranges the chair and sets up your affiliate link. The sponsorship starts from a defined activation date." },
];

const applyFields = [
  { group: "You", items: ["Name and email", "Discord username", "Country, time zone, language(s)"] },
  { group: "Twitch", items: ["Channel URL and username", "Followers and 30-day average viewers", "Streams per month and typical length", "Main games or categories", "TwitchTracker or SullyGnome link"] },
  { group: "Socials", items: ["YouTube, TikTok, Instagram, X", "Rough follower counts", "Anywhere else you post"] },
  { group: "Setup", items: ["Do you use a facecam, and how often", "Is your chair visible on camera", "A screenshot of your normal layout", "Your current chair brand / model"] },
  { group: "Conflicts", items: ["Current chair or furniture sponsors", "Any exclusivity obligations", "Competing-brand restrictions"] },
  { group: "Commitment", items: ["Can you do 4 facecam streams a month", "Willing to commit for the full term", "Whether you expect a fee on top of the chair"] },
];

const confirmed = [
  "StreamQuest is working with LiberNovo to identify suitable Twitch creators.",
  "Selected creators may receive a premium LiberNovo chair (approx. €1,200 retail value) as part of a longer-term sponsorship.",
  "Facecam use is expected and the chair should be visible during qualifying streams.",
  "The current intended requirement is at least four qualifying streams per month.",
  "Creators receive a personal affiliate link or code, current baseline 5% on eligible attributed sales.",
  "There is no guaranteed sales requirement.",
  "StreamQuest reviews applicants; LiberNovo makes the final approval decision.",
];

const pending = [
  "The exact sponsorship length. Your individual agreement states the full period.",
  "Whether the chair is kept, kept on completion, or returned in some cases.",
  "Which chair models, colors, and countries are available.",
  "Who covers shipping, customs, returns, and warranty support.",
  "Affiliate attribution window, payout timing, and refund handling.",
  "Whether dedicated reviews, overlays, or social posts are required.",
];

const faqs = [
  {
    q: "Do I get to keep the chair?",
    a: "Selected creators receive a premium LiberNovo chair as part of the sponsorship. Whether it is kept, kept on completion, or returned in some situations is set in your individual creator agreement, not here.",
  },
  {
    q: "Is this a paid sponsorship?",
    a: "You get the chair and a 5% affiliate commission on eligible attributed sales. There is no guaranteed sales income. Some larger creators may discuss a fee on top, decided case by case by LiberNovo. It is not a standard cash offer.",
  },
  {
    q: "How long is the commitment?",
    a: "It is a longer-term collaboration. The exact length is being finalized, so selected creators commit to the full sponsorship period stated in their individual agreement.",
  },
  {
    q: "I'm under 100 average viewers. Should I apply?",
    a: "Possibly. 100+ is the preference, but strong applications from 50+ are genuinely reviewed when audience loyalty, engagement, your on-camera setup, and market are a good fit. Nothing here is an automatic accept or reject.",
  },
  {
    q: "Can I give my honest opinion on stream?",
    a: "Yes. You are never asked to pretend you love it. Base what you say on real experience, avoid misleading or medical claims, and disclose the sponsorship. Honest is what makes it work.",
  },
  {
    q: "Does applying guarantee a chair?",
    a: "No. StreamQuest screens applications and LiberNovo makes the final call on selection, chair, and shipping. Final participation is always subject to the separate creator agreement.",
  },
];

export default function LibernovoPage() {
  return (
    <div className="rd libernovo">
      {/* ============ HERO ============ */}
      <section className="lib-hero">
        <div className="rd-shell lib-hero-grid">
          <div className="lib-hero-copy">
            <Reveal>
              <span className="eyebrow">
                <span className="pulse" />
                StreamQuest × LiberNovo · Creator sponsorship
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1>
                Stream from a <span className="grad">€1,200 chair</span> you actually want on camera.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lib-hero-sub">
                StreamQuest is helping LiberNovo find established Twitch creators for a
                longer-term ergonomic chair sponsorship. Selected creators receive a premium
                LiberNovo chair as part of the deal, subject to final approval and a separate
                agreement. Show up on facecam, keep the chair in frame, stream like yourself.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="lib-cta-row">
                <a href={APPLY_EMAIL} className="btn btn-primary btn-xl">
                  Apply to be considered
                </a>
                <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-xl">
                  Ask in Discord
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <ul className="lib-hero-bullets">
                <li>Facecam creators</li>
                <li>100+ avg viewers preferred</li>
                <li>5% affiliate</li>
              </ul>
            </Reveal>
          </div>

          <div className="lib-hero-visual">
            <HeroChair />
          </div>
        </div>
      </section>

      {/* ============ WHAT THIS IS ============ */}
      <section className="lib-section">
        <div className="rd-shell lib-intro">
          <Reveal>
            <span className="rd-section-tag">What this is</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>
              Not a giveaway. A <span className="grad">real partnership</span> with a chair at the center of it.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              LiberNovo makes premium ergonomic chairs. StreamQuest sources and screens the
              creators. The goal is honest, visible product use over time: your audience seeing
              the chair in your setup, stream after stream, not a single sponsored clip that
              disappears. You are not asked to guarantee sales, and you are not asked to turn
              every stream into an advert.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ RECLINE SCROLL SEQUENCE ============ */}
      <ReclineScroll />

      {/* ============ PRODUCT — VIDEO FEATURE CARDS ============ */}
      <section className="lib-section lib-section-shaded">
        <div className="rd-shell">
          <Reveal>
            <div className="lib-head">
              <span className="rd-section-tag">The Omni Pro</span>
              <h2>
                A chair worth <span className="grad">putting on camera</span>.
              </h2>
              <p>
                The LiberNovo Omni Pro is a dynamic ergonomic chair built for people who sit for
                a living. These are its real features, the things your viewers will ask about.
              </p>
            </div>
          </Reveal>

          <div className="lib-videos">
            {productVideos.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <article className="lib-video-card">
                  <div className="lib-video-frame">
                    <video autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
                      <source src={v.src} type="video/mp4" />
                    </video>
                  </div>
                  <span className="lib-video-tag">{v.tag}</span>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="lib-features">
              {features.map((f) => (
                <div key={f.t} className="lib-feature">
                  <span className="lib-feature-mark" aria-hidden="true">+</span>
                  <div>
                    <h4>{f.t}</h4>
                    <p>{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ WHAT YOU RECEIVE ============ */}
      <section className="lib-section">
        <div className="rd-shell">
          <Reveal>
            <div className="lib-head">
              <span className="rd-section-tag">What you receive</span>
              <h2>
                The chair, plus a <span className="grad">reason to keep it on screen</span>.
              </h2>
            </div>
          </Reveal>
          <div className="lib-receive">
            {receive.map((r, i) => (
              <Reveal key={r.t} delay={i * 0.08}>
                <article className="lib-receive-card">
                  <h3>{r.t}</h3>
                  <p>{r.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="lib-fineline">
              No promise of cash, guaranteed earnings, or passive income. Affiliate terms,
              ownership, and the rest of the detail live in LiberNovo&rsquo;s terms and your
              creator agreement.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ WHAT YOU DELIVER ============ */}
      <section className="lib-section lib-section-shaded">
        <div className="rd-shell">
          <Reveal>
            <div className="lib-head">
              <span className="rd-section-tag">What you deliver</span>
              <h2>
                Lightweight on purpose. <span className="grad">Just show up</span> and play.
              </h2>
              <p>
                The commitment is deliberately small so it stays authentic. Here is the whole of
                it.
              </p>
            </div>
          </Reveal>
          <div className="lib-deliver">
            {deliver.map((d, i) => (
              <Reveal key={d.t} delay={i * 0.05} as="div">
                <div className="lib-deliver-row">
                  <h4>{d.t}</h4>
                  <p>{d.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="lib-fineline">
              Sponsorship length is being finalized. Selected creators commit to the full
              sponsorship period stated in their individual agreement.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ HONEST BY DESIGN ============ */}
      <section className="lib-section lib-honest">
        <div className="rd-shell lib-honest-inner">
          <Reveal>
            <span className="rd-section-tag">Honest by design</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>
              You never have to <span className="grad">fake it</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              Give your genuine opinion. Compare it to your old gaming chair or your last
              ergonomic one. Tell your chat what you actually think. All we ask is that your
              claims come from real experience, that you skip misleading or medical statements,
              and that you clearly disclose the sponsorship. Authenticity is the entire point.
              It is what makes a real creator worth more than an ad slot.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ IDEAL PROFILE ============ */}
      <section className="lib-section lib-section-shaded">
        <div className="rd-shell">
          <Reveal>
            <div className="lib-head">
              <span className="rd-section-tag">Who fits</span>
              <h2>
                Built for <span className="grad">facecam creators</span> with a loyal room.
              </h2>
              <p>
                This is the ideal profile, not a wall of hard gates. If you are close and a
                genuine fit, apply. Exceptional applications get a real look.
              </p>
            </div>
          </Reveal>
          <div className="lib-profile">
            {idealProfile.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.06}>
                <article className="lib-profile-card">
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SELECTION PROCESS ============ */}
      <section className="lib-section">
        <div className="rd-shell">
          <Reveal>
            <div className="lib-head">
              <span className="rd-section-tag">How selection works</span>
              <h2>
                Two companies, <span className="grad">one clear path</span>.
              </h2>
              <p>
                StreamQuest sources and screens. LiberNovo provides the chair and makes the final
                decision. Applying does not guarantee acceptance.
              </p>
            </div>
          </Reveal>
          <ol className="lib-steps">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05} as="li">
                <div className="lib-step">
                  <span className="lib-step-dot" aria-hidden="true" />
                  <div className="lib-step-body">
                    <h3>{s.title}</h3>
                    <p>{s.sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ APPLICATION PREP ============ */}
      <section className="lib-section lib-section-shaded">
        <div className="rd-shell">
          <Reveal>
            <div className="lib-head">
              <span className="rd-section-tag">Come prepared</span>
              <h2>
                What we&rsquo;ll <span className="grad">ask you</span>.
              </h2>
              <p>
                Have these ready and your application sails through screening. You do not need to
                send a shipping address yet. That is collected securely only after approval.
              </p>
            </div>
          </Reveal>
          <div className="lib-prep">
            {applyFields.map((f, i) => (
              <Reveal key={f.group} delay={i * 0.05}>
                <article className="lib-prep-card">
                  <h3>{f.group}</h3>
                  <ul>
                    {f.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="lib-fineline">
              By applying you understand StreamQuest may review your public channel data and
              share your application with LiberNovo to assess the sponsorship. Submission does not
              guarantee approval.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ TRANSPARENCY ============ */}
      <section className="lib-section">
        <div className="rd-shell">
          <Reveal>
            <div className="lib-head">
              <span className="rd-section-tag">Straight with you</span>
              <h2>
                What&rsquo;s <span className="grad">confirmed</span>, and what&rsquo;s still being finalized.
              </h2>
            </div>
          </Reveal>
          <div className="lib-transparency">
            <Reveal>
              <div className="lib-trans-col is-confirmed">
                <h3>Confirmed</h3>
                <ul>
                  {confirmed.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="lib-trans-col is-pending">
                <h3>Set in your agreement</h3>
                <ul>
                  {pending.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="lib-section lib-section-shaded">
        <div className="rd-shell">
          <Reveal>
            <div className="lib-head">
              <span className="rd-section-tag">Questions</span>
              <h2>
                The things creators <span className="grad">actually ask</span>.
              </h2>
            </div>
          </Reveal>
          <div className="lib-faq">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <details className="lib-faq-item">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="lib-final">
        <div className="lib-final-bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/libernovo/chair-side-black.png" alt="" />
        </div>
        <div className="rd-shell lib-final-inner">
          <Reveal>
            <span className="eyebrow">
              <span className="pulse" />
              Limited selection
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>
              Think your room is a <span className="grad">fit</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              Send your channel and the details above. StreamQuest screens every application and
              shortlists the strongest creators to LiberNovo. We would rather hear from you than
              have you talk yourself out of it.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="lib-cta-row">
              <a href={APPLY_EMAIL} className="btn btn-primary btn-xl">
                Apply to be considered
              </a>
              <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-xl">
                Ask in Discord
              </a>
              <Link href="/" className="btn btn-ghost btn-xl">
                Back to StreamQuest
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
