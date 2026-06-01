import type { Metadata } from "next";
import Link from "next/link";
import "@/app/redesign.css";
import "./case-studies.css";

export const metadata: Metadata = {
  title: "Case Studies | StreamQuest",
  description:
    "How indie and AA game studios run StreamQuest creator campaigns. Read full breakdowns of past activations: scope, results, KPIs and creator output.",
  alternates: { canonical: "https://streamquest.io/case-studies" },
};

const PL2 = "/firebase-public/PlanetOfLana2";

const RP_DIR = "/firebase-public/Replaced";
const studies = [
  {
    href: "/case-studies/replaced",
    studio: "Thunderful x Sad Cat Studios",
    title: "REPLACED",
    blurb:
      "How a structured micro-creator campaign generated 279h of stream time, 6,782 viewer-hours, and creator demand strong enough to add 15 extra slots mid-flight.",
    cover: `${RP_DIR}/sq-replaced-keyart-landscape-1920.webp`,
    gameLogo: `${RP_DIR}/sq-replaced-logo-white.webp`,
    stats: [
      { num: "62", lbl: "Creators" },
      { num: "279h", lbl: "Stream time" },
      { num: "+15", lbl: "Extra slots" },
    ],
  },
  {
    href: "/case-studies/planet-of-lana-2",
    studio: "Thunderful x Wishfully",
    title: "Planet of Lana II",
    blurb:
      "Dividing one influencer beat into 49 creator communities. A managed micro-creator campaign across 6 languages during the launch window.",
    cover: `${PL2}/PoL II Wemari Tree.jpg`,
    gameLogo: `${PL2}/02_PoL_II_Logo_White_without_tagline.png`,
    stats: [
      { num: "49", lbl: "Creators" },
      { num: "159h", lbl: "Stream time" },
      { num: "+85%", lbl: "Overdelivery" },
    ],
  },
];

export default function CaseStudiesIndex() {
  return (
    <main className="cs-wrap">
      <section className="cs-index-hero">
        <div className="cs-shell">
          <span className="cs-eyebrow">Case studies</span>
          <h1>
            Real campaigns. <span className="grad">Real numbers.</span>
          </h1>
          <p>
            Every StreamQuest activation ends with a verified KPI report. Here's what
            those campaigns actually looked like, who they reached, and what the data
            says about how micro-creator campaigns perform when they're run properly.
          </p>
        </div>
      </section>

      <section className="cs-section" style={{ paddingTop: 10 }}>
        <div className="cs-shell">
          <div className="cs-grid">
            {studies.map((s) => (
              <Link key={s.href} href={s.href} className="cs-card">
                <div className="cs-card-cover">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.cover} alt={s.title} loading="lazy" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="cs-card-game-logo" src={s.gameLogo} alt={s.title} loading="lazy" />
                </div>
                <div className="cs-card-body">
                  <div className="cs-card-tag">{s.studio}</div>
                  <h2>{s.title}</h2>
                  <p>{s.blurb}</p>
                  <div className="cs-card-stats">
                    {s.stats.map((st) => (
                      <div key={st.lbl}>
                        <div className="cs-card-stat-num">{st.num}</div>
                        <div className="cs-card-stat-lbl">{st.lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}

            <div className="cs-card-placeholder">
              <span className="cs-card-tag">More case studies</span>
              <p>
                We're publishing additional Taxi Chaos, Good Heavens!, REPLACED and
                other activation breakdowns soon.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
