import Link from "next/link";
import FloatingDiscord from "@/app/components/FloatingDiscord";
import type { Metadata } from "next";

import Reveal from "@/app/components/Reveal";
import FloatingApply from "@/app/components/FloatingApply";
import FaqTabs from "./FaqTabs";
import { streamerFaqs, studioFaqs, type FaqCategory, type FaqItem, type Segment } from "./data";
import "@/app/redesign.css";
import "./faq.css";

export const metadata: Metadata = {
  title: "FAQ — StreamQuest creator and studio questions",
  description:
    "Answers for streamers and studios: how quests work, requirements, payouts, verification, KPI reports, mission briefs, and more.",
};

/* ============ HERO MARQUEE DATA ============ */
const gameplayPool: string[] = [
  "/firebase-public/Game Screenshots/ASCENDANT.jpg",
  "/firebase-public/Game Screenshots/ASKA.jpg",
  "/firebase-public/Game Screenshots/ASTRO BURN.jpg",
  "/firebase-public/Game Screenshots/CYBERCLUTCH.jpg",
  "/firebase-public/Game Screenshots/DRILL AND DELVE.jpg",
  "/firebase-public/Game Screenshots/ENDIX.jpg",
  "/firebase-public/Game Screenshots/GODBREAKERS.jpg",
  "/firebase-public/Game Screenshots/GOOD HEAVENS.jpg",
  "/firebase-public/Game Screenshots/GRIDBEAT (1).jpg",
  "/firebase-public/Game Screenshots/MEXICAN NINJA.jpg",
  "/firebase-public/Game Screenshots/ORBYSS.jpg",
  "/firebase-public/Game Screenshots/PLANET OF LANA 2.jpg",
  "/firebase-public/Game Screenshots/SIGNAL.jpg",
  "/firebase-public/Game Screenshots/TAXI CHAOS 2.jpg",
  "/firebase-public/Game Screenshots/TEMTEM SWARM.jpg",
  "/firebase-public/Game Screenshots/WILDCARD.jpg",
  "/firebase-public/Replaced/sq-replaced-screenshot-01.webp",
  "/firebase-public/Replaced/sq-replaced-screenshot-02.webp",
  "/firebase-public/Replaced/sq-replaced-screenshot-03.webp",
  "/firebase-public/TemTem/TEMTEM GAMEPLAYSCREENSHOT (1).jpg",
  "/firebase-public/TemTem/TEMTEM GAMEPLAYSCREENSHOT (3).jpg",
  "/firebase-public/TemTem/TEMTEM GAMEPLAYSCREENSHOT (5).jpg",
];
const rotate = (a: string[], n: number) => [...a.slice(n), ...a.slice(0, n)];
const heroRowA = [...gameplayPool, ...gameplayPool];
const heroRowB = [...rotate(gameplayPool, 11), ...rotate(gameplayPool, 11)];

/* ============ JSON-LD ============ */
const flattenedFaqs: FaqItem[] = [
  ...streamerFaqs.flatMap((c) => c.items),
  ...studioFaqs.flatMap((c) => c.items),
];
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: flattenedFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a.flatMap((s) => {
        if (s.type === "p") return [s.text];
        if (s.type === "ul") return s.items;
        if (s.type === "note") return [s.text];
        return [];
      }).join(" "),
    },
  })),
};

/* ============ RENDER HELPERS ============ */

function renderSegments(segments: Segment[]) {
  return segments.map((s, i) => {
    if (s.type === "p") return <p key={i}>{s.text}</p>;
    if (s.type === "ul") {
      return (
        <ul key={i}>
          {s.items.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      );
    }
    if (s.type === "note") return <div key={i} className="fq-note">{s.text}</div>;
    return null;
  });
}

function FaqList({
  categories,
  audience,
}: {
  categories: FaqCategory[];
  audience: "streamers" | "studios";
}) {
  return (
    <div className="fq-list">
      {categories.map((cat, ci) => (
        <section key={cat.title} className={`fq-category ${audience}`}>
          <div className="fq-category-head">
            <span className="fq-category-num">{String(ci + 1).padStart(2, "0")}</span>
            <h2 className="fq-category-title">{cat.title}</h2>
            <span className="fq-category-count">{cat.items.length} {cat.items.length === 1 ? "question" : "questions"}</span>
          </div>
          {cat.items.map((it) => (
            <details key={it.q} className={`fq-item ${audience}`}>
              <summary>
                <h3>{it.q}</h3>
              </summary>
              <div className="fq-answer">{renderSegments(it.a)}</div>
            </details>
          ))}
        </section>
      ))}
    </div>
  );
}

/* ============ PAGE ============ */

export default function FaqPage() {
  return (
    <div className="rd">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <FloatingApply />

      {/* ============ HERO ============ */}
      <section className="fq-hero">
        <div className="fq-hero-bg" aria-hidden="true">
          <div className="fq-hero-row a">
            {heroRowA.map((src, i) => (
              <div key={`a-${i}`} className="fq-hero-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading={i < 4 ? "eager" : "lazy"} decoding="async" />
              </div>
            ))}
          </div>
          <div className="fq-hero-row b">
            {heroRowB.map((src, i) => (
              <div key={`b-${i}`} className="fq-hero-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>

        <div className="fq-hero-inner">
          <Reveal>
            <span className="eyebrow">
              <span className="pulse" />
              Frequently asked
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1>StreamQuest <span className="grad">FAQ</span>.</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="fq-hero-sub">
              Direct answers for streamers and studios. Switch between audiences below. Discord covers anything not on this page.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="fq-hero-sep" aria-hidden="true" />

      {/* ============ Q&A — toggle Streamers / Studios ============ */}
      <section className="fq-section">
        <div className="rd-shell">
          <FaqTabs
            streamersContent={<FaqList categories={streamerFaqs} audience="streamers" />}
            studiosContent={<FaqList categories={studioFaqs} audience="studios" />}
          />
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="fq-final">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="fq-final-questy left"
          src="/firebase-public/Questy New Folder/Questy Regular Size (3).png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="fq-final-questy right"
          src="/firebase-public/Questy New Folder/Questy Regular Size (1).png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />

        <div className="fq-final-inner">
          <Reveal>
            <span className="eyebrow">
              <span className="pulse" />
              Still have questions?
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>
              Hit us up on <span className="grad">Discord</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p>The fastest path to a real answer is our Discord server. A real human will be back to you, usually within hours.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="fq-final-actions">
              <a href="https://discord.gg/NhqfucYDXD" className="btn btn-primary btn-xl">
                Join Discord →
              </a>
              <a href="mailto:contact@streamquest.io" className="btn btn-secondary btn-xl">
                Email us
              </a>
              <Link href="/quests-guide" className="btn btn-ghost btn-xl">
                Read the quests guide
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
          <FloatingDiscord />
      </div>
  );
}
