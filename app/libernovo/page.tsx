import Link from "next/link";
import type { Metadata } from "next";

import Reveal from "@/app/components/Reveal";
import FloatingApply from "@/app/components/FloatingApply";
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
  "mailto:contact@streamquest.io?subject=LiberNovo%20chair%20application&body=Twitch%20channel%3A%0A30-day%20average%20viewers%3A%0AFollowers%3A%0ACountry%20%2F%20language%3A%0ASocial%20links%3A%0AUse%20a%20facecam%3F%20(yes%2Fno)%3A%0ACurrent%20chair%3A%0AExisting%20chair%2Ffurniture%20sponsorships%3F%3A%0AWhy%20you%27re%20a%20fit%3A%0A";
const DISCORD = "https://discord.gg/NhqfucYDXD";

/* Real product capabilities from LiberNovo's Omni Pro page and Maxis deck. */
const productVideos = [
  {
    src: "/media/libernovo/video-back.mp4",
    tag: "Dynamic support",
    title: "The backrest moves with you",
    body: "60 precision joints and 4 synchronized mechanisms track your neck, spine, hips, and arms in real time. No lever fiddling.",
  },
  {
    src: "/media/libernovo/video-fan.mp4",
    tag: "Active airflow",
    title: "Built-in ventilation",
    body: "A quiet centrifugal fan pulls cool air through a 5-layer breathable seat. Less heat over a long session on camera.",
  },
  {
    src: "/media/libernovo/video-auto.mp4",
    tag: "Smart sensor",
    title: "Senses when you sit",
    body: "Airflow powers down when you stand and restarts when you return, so the chair stays out of your way mid-stream.",
  },
];

const comfortCards = [
  {
    img: "/media/libernovo/comfort-neck.png",
    title: "Breathable neck support",
    body: "A hydrophilic-sponge neck rest with a cozy wrap, built for comfort across work and rest.",
  },
  {
    img: "/media/libernovo/comfort-back.png",
    title: "Triple-layer back fit",
    body: "A stretch layer, pressure-relief wrap, and aerospace-grade resilient panels sense and support your back's curves.",
  },
  {
    img: "/media/libernovo/comfort-seat.png",
    title: "Zoned seat support",
    body: "A multi-density cushion: firm at the rear for your sit bones, soft at the front to ease leg pressure on long sits.",
  },
];

const features = [
  { t: "Moves with you", d: "Headrest tracks your neck, backrest contours your spine, armrests follow your arms, the seat adapts to your hips." },
  { t: "Five recline modes", d: "From 105° deep focus through 115°, 125°, and 135°, all the way to a 160° spine-flow recline." },
  { t: "OmniStretch decompression", d: "A five-minute decompression-style stretch that resets built-up tension during long sessions." },
  { t: "Premium materials", d: "Danish Gabriel Atlantic fabric rated to 100,000+ rubs, in Graphite or Glacier. Built to look right on camera for years." },
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
    d: "An ongoing collaboration, not a one-off unboxing. A direct line through StreamQuest and a brand that wants you on camera for the long run.",
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
  { title: "StreamQuest screens and onboards you", sub: "We review your fit and walk approved creators through onboarding. LiberNovo gives final approval and provides the chair, so applying does not guarantee acceptance." },
  { title: "Your chair ships", sub: "Once you're approved and onboarded, LiberNovo arranges the chair and sets up your affiliate link, and the sponsorship begins." },
];

const applyFields = [
  { group: "You", items: ["Name, email, Discord", "Country, time zone, language"] },
  { group: "Twitch", items: ["Channel and 30-day average viewers", "Followers and streams per month", "Main games or categories"] },
  { group: "Socials", items: ["YouTube, TikTok, Instagram, X", "Rough follower counts"] },
  { group: "Setup", items: ["How often you use a facecam", "A screenshot of your layout", "Your current chair"] },
  { group: "Conflicts", items: ["Current chair or furniture sponsors", "Any exclusivity obligations"] },
  { group: "Commitment", items: ["4 facecam streams a month", "Whether you expect a fee on top"] },
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

/* Reusable, heavily highlighted email CTA — the primary action on the page. */
function EmailCTA() {
  return (
    <a href={APPLY_EMAIL} className="lib-email-cta" aria-label="Email contact@streamquest.io to apply for a chair">
      <span className="lib-email-cta-eyebrow">
        <span className="pulse" />
        Apply for your chair
      </span>
      <span className="lib-email-cta-addr">
        contact@streamquest.io
        <span className="lib-email-cta-arrow" aria-hidden="true">→</span>
      </span>
      <span className="lib-email-cta-hint">Email us with the details below. A real person reads every one.</span>
    </a>
  );
}

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
                StreamQuest × LiberNovo · Free chair for creators
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1>
                Stream from a <span className="grad">€1,200 chair</span>, built for creators.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lib-hero-sub">
                StreamQuest is helping LiberNovo put its premium ergonomic chair under established
                Twitch creators. Selected creators receive one as part of a longer-term
                sponsorship, subject to final approval and a separate agreement. Show up on
                facecam, keep the chair in frame, stream like yourself.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <EmailCTA />
            </Reveal>
            <Reveal delay={0.4}>
              <div className="lib-hero-secondary">
                <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  Or ask in Discord
                </a>
                <ul className="lib-hero-bullets">
                  <li>Facecam creators</li>
                  <li>100+ avg viewers preferred</li>
                  <li>5% affiliate</li>
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="lib-hero-visual">
            <HeroChair />
          </div>
        </div>
      </section>

      {/* ============ WHAT THIS IS — with lifestyle background ============ */}
      <section className="lib-section lib-section-bg">
        <div className="lib-section-bg-img" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/libernovo/room-1.png" alt="" loading="lazy" />
          <div className="lib-section-bg-veil" />
        </div>
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
              LiberNovo makes premium ergonomic chairs and builds them, in their own words, for
              creators. StreamQuest sources and screens the creators. The goal is honest, visible
              product use over time: your audience seeing the chair in your setup, stream after
              stream, not a single sponsored clip that disappears. You are not asked to guarantee
              sales, and you are not asked to turn every stream into an advert.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ RECLINE SCROLL SEQUENCE ============ */}
      <ReclineScroll />

      {/* ============ LIFESTYLE BAND ============ */}
      <section className="lib-band">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="lib-band-img" src="/media/libernovo/room-2.png" alt="A LiberNovo Omni Pro chair in a creator's room" loading="lazy" />
        <div className="lib-band-veil" aria-hidden="true" />
        <div className="rd-shell lib-band-inner">
          <Reveal>
            <h2>
              A quiet companion through every <span className="grad">task, breakthrough, and moment of focus</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>LiberNovo&rsquo;s words, not ours. The kind of chair that earns a place in your setup, not just a sponsored mention.</p>
          </Reveal>
        </div>
      </section>

      {/* ============ PRODUCT — VIDEOS + COMFORT + FEATURES ============ */}
      <section className="lib-section lib-section-shaded">
        <div className="rd-shell">
          <Reveal>
            <div className="lib-head">
              <span className="rd-section-tag">The Omni Pro</span>
              <h2>
                A chair worth <span className="grad">putting on camera</span>.
              </h2>
              <p>
                The LiberNovo Omni Pro is a dynamic ergonomic chair. Sixty precision joints and
                four synchronized mechanisms move with you in real time, so the support reads as
                part of how you play. These are its real features, the things your chat will ask
                about.
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

          <div className="lib-comfort">
            {comfortCards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <article className="lib-comfort-card">
                  <div className="lib-comfort-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.img} alt={c.title} loading="lazy" />
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
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

          <Reveal>
            <a
              href="/media/libernovo/LiberNovo-Pitch-Deck.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="lib-deck"
            >
              <span className="lib-deck-badge" aria-hidden="true">PDF</span>
              <span className="lib-deck-text">
                <span className="lib-deck-title">Download the LiberNovo pitch deck</span>
                <span className="lib-deck-sub">More about the product, the materials, and the tech behind it.</span>
              </span>
              <span className="lib-deck-arrow" aria-hidden="true">↓</span>
            </a>
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
          <div className="lib-receive-layout">
            <Reveal>
              <div className="lib-receive-visual">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media/libernovo/chair-studio.png" alt="LiberNovo Omni Pro ergonomic chair" loading="lazy" />
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
      <section className="lib-section lib-section-shaded lib-tex">
        <div className="lib-tex-img" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/libernovo/fabric-graphite.png" alt="" loading="lazy" />
          <div className="lib-tex-veil" />
        </div>
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

      {/* ============ PERFORMANCE BANNER (full-bleed) ============ */}
      <section className="lib-banner" aria-label="LiberNovo Omni Pro — where performance peaks">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="lib-banner-img" src="/media/libernovo/performance-banner.png" alt="LiberNovo Omni Pro chairs in a modern room — where performance peaks" loading="lazy" />
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

      {/* ============ HOW IT WORKS — simplified 3-step journey ============ */}
      <section className="lib-section">
        <div className="rd-shell">
          <Reveal>
            <div className="lib-head">
              <span className="rd-section-tag">How it works</span>
              <h2>
                Three steps. <span className="grad">That&rsquo;s it</span>.
              </h2>
              <p>
                StreamQuest sources and screens. LiberNovo provides the chair and makes the final
                decision. Applying does not guarantee acceptance.
              </p>
            </div>
          </Reveal>
          <ol className="lib-steps">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06} as="li">
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
          <Reveal>
            <figure className="lib-ships">
              <figcaption className="lib-ships-cap">
                <span className="lib-ships-eyebrow">In the box</span>
                Precision-engineered and shipped flat, ready to build.
              </figcaption>
              <div className="lib-ships-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media/libernovo/omni-pro-wide.webp" alt="LiberNovo Omni Pro components: backrest, neck support, seat base, base, and hardware" loading="lazy" />
              </div>
            </figure>
          </Reveal>
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
                Have these ready and your application sails through screening. No shipping address
                yet, that is collected securely only after approval.
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

      {/* ============ FAQ ============ */}
      <section className="lib-section">
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
          <img src="/media/libernovo/chair-side-black.png" alt="" loading="lazy" />
        </div>
        <div className="rd-shell lib-final-inner">
          <Reveal>
            <h2>
              Think your room is a <span className="grad">fit</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              Send your channel and the details above. StreamQuest screens every application and
              shortlists the strongest creators to LiberNovo.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <EmailCTA />
          </Reveal>
          <Reveal delay={0.35}>
            <div className="lib-final-links">
              <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Or ask in Discord
              </a>
              <Link href="/" className="btn btn-ghost">
                Back to StreamQuest
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Floating email apply widget */}
      <FloatingApply
        line1="Want a free LiberNovo chair?"
        line2="Email us to apply"
        ctaText="Email us →"
        ctaHref={APPLY_EMAIL}
        ctaClass="btn-primary"
        accent="lime"
        mascot="/media/libernovo/chair-front-white.webp"
      />
    </div>
  );
}
