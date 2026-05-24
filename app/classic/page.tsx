import Link from "next/link";
import "../home.css";

export const metadata = {
  title: "StreamQuest — Classic homepage",
  description: "Original homepage layout (preserved for comparison).",
};

/* ====================== DATA ====================== */

const partners = [
  "Thunderful",
  "Misty Whale",
  "1Minus1",
  "Current Games (2)",
  "NoWhere Studios",
  "Acclaim",
  "SandSailorStudio",
  "RocketRide",
  "Amber Studios",
  "Critical Hit PR",
  "Goose Byte",
  "PixelDoors",
  "Play Fusion",
  "Sad Cat Studios",
];

const partnerLogoSrc = (name: string) =>
  `/firebase-public/Logos Partner/${name}.png`;
const partnerDisplayName = (name: string) =>
  name === "Current Games (2)" ? "Current Games" : name;

const mosaicImages = [
  { src: "/firebase-public/Game Screenshots/GODBREAKERS.webp", alt: "Godbreakers gameplay" },
  { src: "/firebase-public/Game Screenshots/PLANET OF LANA 2.webp", alt: "Planet of Lana 2 gameplay" },
  { src: "/firebase-public/Game Screenshots/TAXI CHAOS 2.webp", alt: "Taxi Chaos 2 gameplay" },
  { src: "/firebase-public/Game Screenshots/ASKA.webp", alt: "ASKA gameplay" },
  { src: "/firebase-public/Game Screenshots/GRIDBEAT (1).webp", alt: "GRIDbeat gameplay" },
  { src: "/firebase-public/Game Screenshots/ORBYSS.webp", alt: "Orbyss gameplay" },
  { src: "/firebase-public/Game Screenshots/TEMTEM SWARM.webp", alt: "Temtem Swarm gameplay" },
  { src: "/firebase-public/Game Screenshots/WILDCARD.webp", alt: "Wildcard gameplay" },
  { src: "/firebase-public/Game Screenshots/ASCENDANT.webp", alt: "Ascendant gameplay" },
  { src: "/firebase-public/Game Screenshots/CYBERCLUTCH.webp", alt: "CyberClutch gameplay" },
  { src: "/firebase-public/Game Screenshots/DRILL AND DELVE.webp", alt: "Drill and Delve gameplay" },
  { src: "/firebase-public/Game Screenshots/SIGNAL.webp", alt: "Signal gameplay" },
  { src: "/firebase-public/Game Screenshots/ENDIX.webp", alt: "Endix gameplay" },
  { src: "/firebase-public/Game Screenshots/GOOD HEAVENS.webp", alt: "Good Heavens gameplay" },
];

const socials = [
  { href: "https://www.instagram.com/streamquest.io/", label: "Instagram", icon: "/firebase-public/Social Icons PNG/instagram.png" },
  { href: "https://www.reddit.com/r/StreamQuest/", label: "Reddit", icon: "/firebase-public/Social Icons PNG/reddit.png" },
  { href: "https://www.youtube.com/@StreamQuest_io", label: "YouTube", icon: "/firebase-public/Social Icons PNG/youtube.png" },
  { href: "https://discord.gg/NhqfucYDXD", label: "Discord", icon: "/firebase-public/Social Icons PNG/discord.png" },
  { href: "https://www.tiktok.com/@streamquest.io", label: "TikTok", icon: "/firebase-public/Social Icons PNG/tiktok.png" },
];

const activeQuests = [
  {
    slug: "gridbeat",
    title: "GRIDbeat",
    cover: "/firebase-public/Game Cover Art/gridbeat key art.webp",
    desc: "Demo-to-launch quest focused on awareness, launch momentum, and measurable wishlist lift.",
    tldr: ["Bronze: Stream 1 hour, 5 CCV, €10", "Silver: Stream 2 hours, 15 CCV, €25"],
    href: "/quests/gridbeat",
  },
  {
    slug: "temtem",
    title: "Temtem: Swarm",
    cover: "/firebase-public/Game Cover Art/Crema_Temtem_Swarm_KeyArt (1) (1).webp",
    desc: "Full-release launch quest built for co-op visibility, storefront traffic, and launch support.",
    tldr: ["Bronze: Stream 1 hour, 5 CCV, €10", "Silver: Stream 2 hours, 15 CCV, €25"],
    href: "/quests/temtem",
  },
  {
    slug: "aska",
    title: "ASKA",
    cover: "/firebase-public/Game Cover Art/aska key art.webp",
    desc: "Early Access momentum campaign built around ASKA's Hearth & Honey update and the Steam Medieval Fest 20% discount. By Sand Sailor Studio × Thunderful.",
    tldr: ["Bronze: 1h stream, 5 CCV, €10", "Silver: 2h stream, 15 CCV, €20 (€10/h)"],
    href: "/quests/aska",
  },
  {
    slug: "replaced",
    title: "REPLACED",
    cover: "/firebase-public/Replaced/sq-replaced-screenshot-01.webp",
    desc: "Launch-window campaign for REPLACED — a cinematic 2.5D cyberpunk action platformer by Thunderful × Sad Cat Studios.",
    tldr: ["Bronze: 1h stream, 5 CCV, €10", "Silver: 2h+ at €10/h (e.g. €20 for 2h)"],
    href: "/quests/replaced",
  },
  {
    slug: "astroburn",
    title: "Astro Burn",
    cover: "/firebase-public/Game Screenshots/ASTRO BURN.webp",
    desc: "Score-chasing bullet-hell cute-em-up with co-op chaos and giant adorable bosses. By Pixel Doors × Beyond The Pixels. Physical copy prize for the highest score.",
    tldr: ["Bronze: 1h stream, 5 CCV, €10", "Silver: 2h+ at €10/h (e.g. €20 for 2h)"],
    href: "/quests/astroburn",
  },
];

const completedQuests = [
  { title: "Ascendant", cover: "/firebase-public/Game Cover Art/ascendant key art.webp", href: "/quests/ascendant" },
  { title: "CyberClutch", cover: "/firebase-public/Game Cover Art/cyberclutch key art.webp", href: null },
  { title: "Drill & Delve", cover: "/firebase-public/Game Cover Art/drill and delve key art.webp", href: "/quests/drilldelve" },
  { title: "Godbreakers", cover: "/firebase-public/Game Cover Art/godbreakers key art.webp", href: "/quests/godbreakers" },
  { title: "Orbyss", cover: "/firebase-public/Game Cover Art/orbyss key art.webp", href: "/quests/orbyss" },
  { title: "Planet of Lana 2", cover: "/firebase-public/Game Cover Art/planet of lana 2 key art.webp", href: "/quests/planetoflana2" },
  { title: "Signal", cover: "/firebase-public/Game Cover Art/signal key art.webp", href: "/quests/signal" },
  { title: "TableFlip Sim", cover: "/firebase-public/Game Cover Art/tableflip key art.webp", href: "/quests/tableflip" },
  { title: "Taxi Chaos 2", cover: "/firebase-public/Game Cover Art/taxi chaos 2 key art.webp", href: "/quests/taxichaos2" },
  { title: "Wildcard", cover: "/firebase-public/Game Cover Art/wildcard key art.webp", href: "/quests/wildcard" },
];

const features = [
  { icon: "/firebase-public/Questy New Folder/Questy Small Size (1).webp", title: "Quest-based campaigns", body: "Clear objectives, mission briefs, requirements. Streamers know what to do. Studios know what they're buying." },
  { icon: "/firebase-public/Questy New Folder/Questy Regular Size (2).webp", title: "Manual VOD review", body: "Every submission verified by a human. Correct category, gameplay time, brief compliance before any payout." },
  { icon: "/firebase-public/Questy New Folder/Questy Small Size (8).webp", title: "Transparent payouts", body: "Paid within 5 business days via Twitch donation setup. No bank details needed for standard payouts." },
  { icon: "/firebase-public/Questy New Folder/Questy Small Size (3).webp", title: "KPI reporting", body: "Viewer hours, cost-per-viewer-hour, creator lists, tier completion, top streams, geo distribution." },
];

const stats = [
  { num: "50+", label: "Creator slots per campaign activation" },
  { num: "13+", label: "Indie and AA game campaigns completed" },
  { num: "20+", label: "Countries reached through creator campaigns" },
  { num: "5 days", label: "Maximum wait time for creator payout" },
];

const statBgImages = [
  "/firebase-public/Game Screenshots/GODBREAKERS.webp",
  "/firebase-public/Game Screenshots/TAXI CHAOS 2.webp",
  "/firebase-public/Game Screenshots/PLANET OF LANA 2.webp",
  "/firebase-public/Game Screenshots/TEMTEM SWARM.webp",
  "/firebase-public/Game Screenshots/ASKA.webp",
  "/firebase-public/Game Screenshots/GRIDBEAT (1).webp",
];

const streamerSteps = [
  { num: 1, title: "Log in with Twitch", body: "Connect your Twitch account in the Creator Dashboard. Baseline: 300+ followers, 5+ average concurrent viewers. Exceptions possible for clearly real communities." },
  { num: 2, title: "Apply for a Quest", body: "Browse available campaigns and apply for ones that match your content and schedule. Each Quest has a mission brief with clear requirements and timing." },
  { num: 3, title: "Go live and complete the Main Quest", body: "Stream under the correct Twitch category. Optional Side Quests unlock additional XP and rewards." },
  { num: 4, title: "Submit your VOD", body: "Drop your VOD link and Side Quest proof in the dashboard. Team manually reviews your submission for category, gameplay time, and compliance." },
  { num: 5, title: "Get paid within 5 business days", body: "Payout via your Twitch donation setup (Streamlabs, StreamElements). No bank details needed for standard payouts." },
];

const studioSteps = [
  { num: 1, title: "Share your game assets", body: "Minimum viable: logo and cover art. Trailers, Steam links, key art all help." },
  { num: 2, title: "We build the mission brief", body: "Full mission brief: streaming requirements, Side Quest options, timing, key links, embargo notes, specific CTAs." },
  { num: 3, title: "Creators apply, we manually approve 50+", body: "Hand-screen every applicant for community quality, eligibility, and content fit. No automated bulk approvals." },
  { num: 4, title: "We verify every VOD submission", body: "Each stream manually reviewed: correct category, minimum gameplay time, brief compliance." },
  { num: 5, title: "Transparent KPI reporting", body: "Full report: viewer hours, cost-per-viewer-hour, creator list, tier completion, top streams, geo breakdown." },
];

const pastCampaigns = [
  {
    title: "Planet of Lana 2",
    img: "/firebase-public/Game Screenshots/PLANET OF LANA 2.webp",
    tags: ["Launch Campaign", "Story-Driven"],
    body: "A cinematic campaign built around indie storytelling, creator atmosphere, tracked wishlist pushes, and mission brief clarity.",
    studioLogo: "/firebase-public/Logos Partner/SandSailorStudio.webp",
    studioAlt: "Sand Sailor Studio",
    href: "/quests/planetoflana2",
  },
  {
    title: "GRIDbeat",
    img: "/firebase-public/Game Screenshots/GRIDBEAT (1).webp",
    tags: ["Launch Window", "Wishlist-Focused"],
    body: "A rhythm-heavy activation built for demo visibility, launch-day repetition, and social-friendly creator output.",
    studioLogo: "/firebase-public/Logos Partner/Amber Studios.webp",
    studioAlt: "Amber Studios",
    href: "/quests/gridbeat",
  },
  {
    title: "Temtem: Swarm",
    img: "/firebase-public/Game Screenshots/TEMTEM SWARM.webp",
    tags: ["Full Release", "Cross-Platform Hype"],
    body: "A release support setup designed around creator energy, visibility spikes, and indie launch framing that feels community-led.",
    studioLogo: "/firebase-public/TemTem/CREMA LOGO.png",
    studioAlt: "Crema",
    href: "/quests/temtem",
  },
  {
    title: "ASKA",
    img: "/firebase-public/Game Screenshots/ASKA.webp",
    tags: ["Update Push", "Community Growth"],
    body: "Campaigns that support updates, longer-tail discovery, and creator reactivation matter just as much as launch day.",
    studioLogo: "/firebase-public/Logos Partner/Thunderful.webp",
    studioAlt: "Thunderful",
    href: "/quests/aska",
  },
  {
    title: "Taxi Chaos 2",
    img: "/firebase-public/Game Screenshots/TAXI CHAOS 2.webp",
    tags: ["Launch Support", "Flexible Scope"],
    body: "Streamer activation expanded into broader support: social content, storefront updates, ad testing, and community replies.",
    studioLogo: "/firebase-public/Logos Partner/Current Games (2).webp",
    studioAlt: "Current Games",
    href: "/quests/taxichaos2",
  },
  {
    title: "TableFlip Simulator",
    img: "/firebase-public/Game Cover Art/tableflip key art.webp",
    tags: ["Viral-Friendly", "Clip Potential"],
    body: "Some games win because they are instantly streamable. Short quests, high shareability, massive clip output.",
    studioLogo: "/firebase-public/Logos Partner/Misty Whale.webp",
    studioAlt: "Misty Whale",
    href: "/quests/tableflip",
  },
];

const streamerFaqs = [
  { q: "How do I get paid as a small Twitch streamer?", a: "After our team manually verifies your completed Quest, your payout is processed within 5 business days through your existing Twitch donation setup (Streamlabs or StreamElements). No bank details needed for standard payouts." },
  { q: "Do I need a big audience to join?", a: "No huge audience needed. Typical baseline is 300+ Twitch followers and 5+ average concurrent viewers. Exceptions are possible for clearly real, engaged communities. All regions welcome." },
  { q: "What is a Main Quest and what are Side Quests?", a: "Each campaign has a Main Quest (the paid streaming requirement) and optional Side Quests (clips, social sharing, surveys, in-game objectives) that earn extra XP and unlock better reward tiers. Everything is defined in the mission brief." },
  { q: "Do I need to share bank details?", a: "Not for standard payouts. Payments are sent through your existing Twitch donation provider (Streamlabs, StreamElements). Alternative payout methods may be available depending on the campaign." },
  { q: "Where do I find help during a campaign?", a: "Discord is the main hub for onboarding, campaign updates, and support. Real answers from a real team. Join the StreamQuest Discord to get started and stay up to date on open Quests." },
];

const studioFaqs = [
  { q: "What kinds of game campaigns can we run?", a: "Demos, Steam Next Fest pushes, game launches, update campaigns, multiplayer playtests, vertical slice feedback, and discount window activations. Campaigns run across a 2-week window with 50+ creator slots." },
  { q: "How does StreamQuest measure campaign performance?", a: "Full KPI report after every campaign: total viewer hours, cost-per-viewer-hour, creator list with follower and CCV data, tier completion, top streams and highlights, language and geo distribution." },
  { q: "Do we control what streamers say?", a: "No, and that is by design. Streamers keep full freedom of opinion. Specific CTAs can be implemented as optional Side Quests. Authenticity is what makes the campaigns work." },
  { q: "How much does a campaign cost?", a: "Campaigns are estimated upfront and reconciled based on verified completions. You pay only for filled, verified Quest slots. Unused budget above the agreed threshold is refunded. No hidden fees." },
  { q: "Can StreamQuest track wishlists and demo downloads?", a: "Yes. Wishlist, demo, and click tracking is supported through unique UTM links agreed during campaign setup. Specific CTAs can also be built into Side Quests while keeping creator authenticity intact." },
];

/* ====================== JSON-LD (SEO) ====================== */

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...streamerFaqs, ...studioFaqs].map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/* ====================== PAGE ====================== */

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ============ HERO ============ */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-bg-img" />
          <div className="hero-grad" />
          <div className="hero-grid" />
          <div className="orb orb-1" />
          <div className="orb orb-2" />
        </div>

        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <div className="dot" />
              <span>Live campaigns running now</span>
            </div>

            <h1 className="hero-h1" id="hero-heading">
              <span className="hl">Paid</span> Twitch
              <br />
              Campaigns for
              <br />
              <span className="hl">Indie</span> &amp; AA Games
            </h1>

            <p className="hero-sub">
              StreamQuest is the quest-based Twitch creator platform where{" "}
              <strong style={{ color: "var(--offwhite)", fontWeight: 600 }}>
                micro-streamers earn real money
              </strong>{" "}
              playing new games and studios get authentic reach across 50+
              verified creators with full KPI reporting.
            </p>

            <a
              href="https://www.trustpilot.com/review/streamquest.io"
              className="trustpilot-strip"
              rel="noopener"
              aria-label="Read StreamQuest reviews on Trustpilot"
            >
              <strong>Trustpilot</strong>
              <span>4.0 rating • Read creator reviews</span>
            </a>

            <div className="hero-ctas">
              <a href="https://discord.gg/NhqfucYDXD" className="btn btn-lime">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/firebase-public/Questy New Folder/Questy Small Size (1).webp"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                />
                Join Discord
              </a>
              <Link href="/brands" className="btn btn-outline">
                Launch a Campaign
              </Link>
              <Link href="/testimonials" className="btn btn-ghost">
                Testimonials
              </Link>
            </div>

            <div className="hero-socials" aria-label="StreamQuest social links">
              <span className="hero-socials-label">Find us on</span>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="hero-social-link"
                  aria-label={s.label}
                  rel="noopener"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.icon} alt="" aria-hidden="true" loading="lazy" />
                </a>
              ))}
              <a
                href="https://www.facebook.com/people/StreamQuest/61581522924905/"
                className="hero-social-link facebook"
                aria-label="Facebook"
                rel="noopener"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M13.5 8.5V6.8c0-.7.5-.8.8-.8h2.1V2.5h-3.1C9.8 2.5 9 5 9 6.6v1.9H6.5V12H9v9.5h4.5V12h2.8l.4-3.5h-3.2Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/streamquestio/"
                className="hero-social-link linkedin"
                aria-label="LinkedIn"
                rel="noopener"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M6.94 8.5a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM5.16 9.98h3.56v9.86H5.16V9.98Zm5.6 0h3.41v1.35h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.21 4.26 5.08v5.28h-3.56v-4.68c0-1.12-.02-2.55-1.67-2.55-1.67 0-1.92 1.22-1.92 2.47v4.76h-3.56V9.98Z" />
                </svg>
              </a>
            </div>

            <div className="hero-proof-row" role="list">
              <div className="proof-stat" role="listitem">
                <strong>50+</strong>
                <span>creators per campaign</span>
              </div>
              <div className="proof-stat" role="listitem">
                <strong>5 days</strong>
                <span>payout turnaround</span>
              </div>
              <div className="proof-stat" role="listitem">
                <strong>30+</strong>
                <span>studio partners</span>
              </div>
              <div className="proof-stat" role="listitem">
                <strong>4.0★</strong>
                <span>Trustpilot rating</span>
              </div>
            </div>
          </div>

          <div className="hero-right" aria-hidden="true">
            <div className="hero-mosaic">
              {mosaicImages.map((img, i) => (
                <div key={img.src} className={`mosaic-card mc-${i + 1}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ============ PARTNERS ============ */}
      <section className="partners-section" aria-labelledby="partners-label">
        <p className="partners-label" id="partners-label">
          Trusted by indie studios &amp; publishers worldwide
        </p>
        <div className="partners-track-wrap">
          <div className="partners-track" aria-hidden="true">
            {[...partners, ...partners].map((name, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={`${name}-${i}`}
                className="partner-logo"
                src={partnerLogoSrc(name)}
                alt={partnerDisplayName(name)}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ ACTIVE QUESTS ============ */}
      <section
        className="quests-section"
        id="quests"
        aria-labelledby="quests-heading"
      >
        <div className="shell">
          <div className="quests-header">
            <span className="section-label">Past &amp; Active Quests</span>
            <h2 className="section-h2" id="quests-heading">
              Campaigns <span className="hl">streamers</span> have completed
            </h2>
            <p
              className="section-sub"
              style={{ maxWidth: 500, margin: "0 auto" }}
            >
              Every card is a real indie or AA game that ran through
              StreamQuest. Streamers applied, went live, and got paid. This is
              the library.
            </p>
          </div>
        </div>

        <p className="quests-subrow-title">Active &amp; upcoming quests</p>
        <div className="active-quests-grid">
          {activeQuests.map((q) => (
            <article key={q.slug} className="active-quest-card">
              <div className="active-quest-inner">
                <div className="active-quest-front">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={q.cover} alt={`${q.title} key art`} loading="lazy" />
                  <div className="active-quest-front-content">
                    <span className="quest-badge">Active</span>
                    <h3>{q.title}</h3>
                  </div>
                </div>
                <div className="active-quest-back">
                  <div>
                    <h3>{q.title} Mission Brief</h3>
                    <p>{q.desc}</p>
                    <div className="active-quest-tldr">
                      <strong>TL;DR</strong>
                      <br />
                      {q.tldr.join(" — ")}
                    </div>
                  </div>
                  <Link
                    className="btn btn-outline active-quest-cta"
                    href={q.href}
                    aria-label={`Open ${q.title} mission brief`}
                  >
                    More Information
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p
          className="quests-subrow-title"
          style={{ marginTop: 26 }}
        >
          Completed quests
        </p>
        <div className="quests-strip-wrap">
          <div className="quests-strip">
            {[...completedQuests, ...completedQuests].map((q, i) => {
              const inner = (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={q.cover} alt={`${q.title} quest`} loading="lazy" />
                  <div className="quest-card-overlay" />
                  <div className="quest-card-info">
                    <span className="quest-badge">Completed</span>
                    <h3>{q.title}</h3>
                  </div>
                </>
              );
              return q.href ? (
                <Link
                  key={`${q.title}-${i}`}
                  className="quest-card"
                  href={q.href}
                  aria-label={`Open ${q.title} mission brief`}
                >
                  {inner}
                </Link>
              ) : (
                <div key={`${q.title}-${i}`} className="quest-card">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ WHAT ============ */}
      <section className="what-section" aria-labelledby="what-heading">
        <div className="shell">
          <div className="what-grid">
            <div className="what-left">
              <span className="section-label">What is StreamQuest</span>
              <h2 className="section-h2" id="what-heading">
                Discovery happens in the{" "}
                <span className="hl">micro-community</span>
              </h2>
              <p className="section-sub" style={{ marginBottom: 20 }}>
                Real gaming discovery happens inside smaller streams where
                viewers talk, trust the host, and try games together.
                StreamQuest exists to activate that reach, at scale, for indie
                and AA games.
              </p>
              <p className="section-sub" style={{ marginBottom: 32 }}>
                Instead of betting on one big creator, studios run across 50+
                authentic micro-streamers simultaneously. More gameplay footage.
                More community coverage. All verified by hand.
              </p>

              <div className="what-quote">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/firebase-public/Questy New Folder/Questy Regular Size (1).webp"
                  alt="Questy mascot"
                  loading="lazy"
                />
                <p>
                  &quot;Paid opportunities at small-creator scale, detailed
                  briefs, and fast human support.&quot; — Trustpilot review
                </p>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/streamers" className="btn btn-outline">
                  I&apos;m a Streamer
                </Link>
                <Link href="/brands" className="btn btn-lime">
                  I&apos;m a Studio
                </Link>
              </div>
            </div>

            <div className="what-right">
              {features.map((f) => (
                <div key={f.title} className="feature-card">
                  <h3>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={f.icon}
                      alt=""
                      aria-hidden="true"
                      className="feature-inline-icon"
                      loading="lazy"
                    />
                    {f.title}
                  </h3>
                  <p>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ VIDEO ============ */}
      <section className="video-section" aria-labelledby="video-heading">
        <div className="shell">
          <div className="video-label">
            <span className="section-label">See it in action</span>
            <h2 className="section-h2" id="video-heading" style={{ marginBottom: 32 }}>
              Watch how <span className="hl">StreamQuest</span> works
            </h2>
          </div>
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/RVqwzxQ32qA"
              title="StreamQuest: how paid Twitch quests work for streamers and studios"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="stats-section" aria-label="StreamQuest platform statistics">
        <div className="stats-bg" aria-hidden="true">
          {statBgImages.map((src) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={src}
              className="stats-bg-img"
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
        <div className="stats-overlay" aria-hidden="true" />
        <div className="shell">
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="how-section" id="how-it-works" aria-labelledby="how-heading">
        <div className="shell">
          <div style={{ marginBottom: 44 }}>
            <span className="section-label">Process</span>
            <h2 className="section-h2" id="how-heading">
              How <span className="hl">StreamQuest</span> works
            </h2>
            <p className="section-sub">
              Two audiences, one platform. Pick your path.
            </p>
          </div>

          <div className="how-panels">
            <div className="how-panel-block">
              <h3 className="how-panel-block-title">For Streamers</h3>
              <ol className="how-steps">
                {streamerSteps.map((s) => (
                  <li key={s.num} className="how-step">
                    <div className="step-num">{s.num}</div>
                    <div className="step-body">
                      <h4>{s.title}</h4>
                      <p>{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a href="https://app.streamquest.io" className="btn btn-lime">
                Open Creator Dashboard
              </a>
            </div>

            <div className="how-panel-block">
              <h3 className="how-panel-block-title">For Studios</h3>
              <ol className="how-steps">
                {studioSteps.map((s) => (
                  <li key={s.num} className="how-step">
                    <div className="step-num">{s.num}</div>
                    <div className="step-body">
                      <h4>{s.title}</h4>
                      <p>{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link href="/brands" className="btn btn-lime">
                Launch a Campaign
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PAST CAMPAIGNS ============ */}
      <section className="campaigns-section" id="campaigns" aria-labelledby="campaigns-heading">
        <div className="shell">
          <div className="campaigns-header">
            <span className="section-label">Campaign Portfolio</span>
            <h2 className="section-h2" id="campaigns-heading">
              Past campaigns &amp; <span className="hl">studio partnerships</span>
            </h2>
            <p className="section-sub" style={{ maxWidth: 520 }}>
              Real indie and AA games that ran through StreamQuest. Every entry
              is a verified campaign across dozens of authentic streamers.
            </p>
          </div>

          <div className="campaigns-viewport" aria-label="Past campaigns">
            <div className="campaigns-track">
              {[...pastCampaigns, ...pastCampaigns].map((c, i) => (
                <article key={`${c.title}-${i}`} className="camp-card">
                  <div className="camp-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.img} alt={`${c.title} gameplay screenshot`} loading="lazy" />
                  </div>
                  <div className="camp-body">
                    <div className="camp-tags">
                      {c.tags.map((t) => (
                        <span key={t} className="camp-tag">{t}</span>
                      ))}
                    </div>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                    <div className="camp-footer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="camp-studio-logo"
                        src={c.studioLogo}
                        alt={c.studioAlt}
                        loading="lazy"
                      />
                      <Link
                        href={c.href}
                        className="camp-cta"
                        aria-label={`See ${c.title} mission brief`}
                      >
                        See mission brief →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ DISCORD ============ */}
      <section className="discord-section" aria-labelledby="discord-heading">
        <div className="shell">
          <div className="discord-grid">
            <div className="discord-left">
              <span className="section-label">Community</span>
              <h2 className="section-h2" id="discord-heading">
                Join us on <span className="hl">Discord</span>
              </h2>
              <p className="discord-lead">
                Discord is where StreamQuest actually lives day to day. It is
                the fastest way to see new quests, ask questions, get
                onboarding help, and stay close to the creator community.
              </p>

              <div className="discord-points">
                <div className="discord-point">See new quest announcements first.</div>
                <div className="discord-point">Get real support from the team, not bots.</div>
                <div className="discord-point">Meet other creators and find open opportunities.</div>
                <div className="discord-point">Track updates, brief changes, and launch pushes in one place.</div>
              </div>

              <div className="discord-buttons">
                <a href="https://discord.gg/NhqfucYDXD" className="btn btn-lime">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/firebase-public/Questy New Folder/Questy Small Size (1).webp"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                  Join Us on Discord
                </a>
                <a href="https://app.streamquest.io" className="btn btn-outline">
                  Open Creator Dashboard
                </a>
              </div>
            </div>

            <div className="discord-widget-card">
              <div className="discord-widget-kicker">Community hub</div>
              <h3>Jump straight into the server</h3>
              <p>
                See the live server card, check the vibe, then join the same
                place where creators hear about fresh campaigns and get
                hands-on help.
              </p>

              <div className="discord-card-actions">
                <a href="https://discord.gg/NhqfucYDXD" className="btn btn-lime">
                  Join Discord
                </a>
                <Link href="/streamers" className="btn btn-ghost">
                  For Streamers
                </Link>
              </div>

              <div className="discord-widget-wrap">
                <iframe
                  src="https://discord.com/widget?id=1365282965487226960&theme=dark"
                  title="StreamQuest Discord community widget"
                  loading="lazy"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="faq-section" id="faq" aria-labelledby="faq-heading">
        <div className="shell">
          <div className="faq-header">
            <span className="section-label">FAQ</span>
            <h2 className="section-h2" id="faq-heading">
              Frequently asked <span className="hl">questions</span>
            </h2>
            <p
              className="section-sub"
              style={{ maxWidth: 460, margin: "0 auto" }}
            >
              The most important questions for streamers and studios, answered
              directly.
            </p>
          </div>

          <div className="faq-two-col">
            <div>
              <div className="faq-col-title">
                <span>🎮</span> For Streamers
              </div>
              {streamerFaqs.map((f) => (
                <details key={f.q} className="faq-item">
                  <summary>
                    <h3>{f.q}</h3>
                  </summary>
                  <div className="faq-a">{f.a}</div>
                </details>
              ))}
            </div>

            <div>
              <div className="faq-col-title">
                <span>🏭</span> For Studios &amp; Publishers
              </div>
              {studioFaqs.map((f) => (
                <details key={f.q} className="faq-item">
                  <summary>
                    <h3>{f.q}</h3>
                  </summary>
                  <div className="faq-a">{f.a}</div>
                </details>
              ))}
            </div>
          </div>

          <div className="faq-cta">
            <a href="https://discord.gg/NhqfucYDXD" className="btn btn-lime">
              Join Discord
            </a>
            <Link href="/brands" className="btn btn-outline">
              For Studios
            </Link>
            <Link href="/streamers" className="btn btn-ghost">
              For Streamers
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="cta-section" aria-labelledby="cta-heading">
        <div className="shell">
          <div className="cta-box">
            <div className="cta-box-grid">
              <div className="cta-text">
                <span className="section-label">Get started</span>
                <h2 id="cta-heading">
                  Join the community.
                  <br />
                  Start your <span className="hl">first Quest</span>.
                </h2>
                <p>
                  Whether you&apos;re a creator looking for your first paid
                  streaming gig or a studio ready to activate 50+ authentic
                  streamers, the door is open.
                </p>
                <div className="cta-btns">
                  <a href="https://discord.gg/NhqfucYDXD" className="btn btn-lime">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/firebase-public/Questy New Folder/Questy Small Size (1).webp"
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                    />
                    Join Discord
                  </a>
                  <a href="https://app.streamquest.io" className="btn btn-outline">
                    Creator Dashboard
                  </a>
                  <Link href="/brands" className="btn btn-ghost">
                    For Studios
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
