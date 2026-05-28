import Link from "next/link";
import type { Metadata } from "next";

import Reveal from "@/app/components/Reveal";
import FloatingApply from "@/app/components/FloatingApply";
import TestimonialsToggle from "./TestimonialsToggle";
import { quests } from "@/data/quests";
import "@/app/redesign.css";
import "./testimonials.css";

/* Pool of gameplay screenshots from across the campaigns we've run.
   Rotated across three hero rows so each row shows a different segment. */
const gameplayPool: string[] = [
  // Standard 1920x1080 gameplay screenshots
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
  // REPLACED screenshots
  "/firebase-public/Replaced/sq-replaced-screenshot-01.webp",
  "/firebase-public/Replaced/sq-replaced-screenshot-02.webp",
  "/firebase-public/Replaced/sq-replaced-screenshot-03.webp",
  // Temtem Swarm gameplay
  "/firebase-public/TemTem/TEMTEM GAMEPLAYSCREENSHOT (1).jpg",
  "/firebase-public/TemTem/TEMTEM GAMEPLAYSCREENSHOT (2).jpg",
  "/firebase-public/TemTem/TEMTEM GAMEPLAYSCREENSHOT (3).jpg",
  "/firebase-public/TemTem/TEMTEM GAMEPLAYSCREENSHOT (4).jpg",
  "/firebase-public/TemTem/TEMTEM GAMEPLAYSCREENSHOT (5).jpg",
  "/firebase-public/TemTem/TEMTEM GAMEPLAYSCREENSHOT (6).jpg",
];

const rotate = (arr: string[], n: number): string[] =>
  [...arr.slice(n), ...arr.slice(0, n)];

const heroRowA: string[] = [...gameplayPool, ...gameplayPool];
const heroRowB: string[] = [...rotate(gameplayPool, 8), ...rotate(gameplayPool, 8)];
const heroRowC: string[] = [...rotate(gameplayPool, 16), ...rotate(gameplayPool, 16)];

export const metadata: Metadata = {
  title: "Testimonials — real quotes from creators and studios",
  description:
    "Real quotes from StreamQuest streamers and partner studios. Reliable payments, hands-on support, authentic creator communities.",
  alternates: { canonical: "https://streamquest.io/testimonials" },
};

/* ============ DATA ============ */

/** Featured pulled quotes rotated in the hero. */
const featured = [
  {
    text: (
      <>
        I have never seen a project so <span className="grad">friendly to smaller creators</span>.
      </>
    ),
    name: "Findseloy",
    handle: "twitch.tv/findseloy",
    twitch: "https://www.twitch.tv/findseloy",
    avatar: "/firebase-public/Streamer Icons/Findseloy.webp",
  },
  {
    text: (
      <>
        Completed <span className="grad">10+ quests</span> across several games — every payment arrived on time.
      </>
    ),
    name: "Paildry",
    handle: "twitch.tv/paildry",
    twitch: "https://twitch.tv/Paildry",
    avatar: "/firebase-public/Streamer Icons/Paildry.webp",
  },
  {
    text: (
      <>
        The small team behind StreamQuest go <span className="grad">above and beyond</span>, day or night. 10/10.
      </>
    ),
    name: "DrowsBicycle",
    handle: "twitch.tv/drowsybicycle",
    twitch: "https://www.twitch.tv/drowsybicycle",
    avatar: "/firebase-public/Streamer Icons/Drowsbicycle.webp",
  },
];

/** All creator testimonials. Local avatars where available, fallback to source CDN. */
const creators = [
  {
    name: "CaedesEnder",
    country: "United Kingdom",
    avatar: "/firebase-public/Streamer Icons/CaedesEnder.webp",
    twitch: "https://www.twitch.tv/caedesender",
    handle: "twitch.tv/caedesender",
    quote: "I stumbled upon StreamQuest just before the launch of their first campaign and I love that the impersonal 'apply and hear nothing back' problem just does not exist with this system. You know in advance if you are eligible for a quest with clearly defined tiers, know what is expected of your stream, and there is communication both with the founder and other streamers to help you out if needed.",
  },
  {
    name: "UndoubtedlyLink",
    country: "Germany",
    avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/25f03322-178c-4015-aadc-3f8426bb103f-profile_image-70x70.png",
    twitch: "https://www.twitch.tv/UndoubtedlyLink",
    handle: "twitch.tv/undoubtedlylink",
    quote: "Being a small time streamer it is very easy to get overlooked by brands that go with a large audience size instead. StreamQuest shines a light on small creators while focusing on indie titles. You know upfront what you are getting paid and a communicative environment is fostered. Instead of just getting keys for games, earn what you are worth.",
  },
  {
    name: "ItsTsubaki",
    country: "Brazil",
    avatar: "/firebase-public/Streamer Icons/ItsTsubaki.webp",
    twitch: "https://linktr.ee/itstsubaki",
    handle: "linktr.ee/itstsubaki",
    quote: "Working with this platform has been a great experience. Being able to play games, go live, and share content while having fun made the experience genuinely enjoyable. The fair compensation is motivating. And thank you for accepting creators from other countries, since many paid platforms are usually limited to US-only or NA/EU.",
  },
  {
    name: "Scorpinhoo",
    country: "Brazil",
    avatar: "/firebase-public/Streamer Icons/Scorphinhoo.webp",
    twitch: "https://twitch.tv/scorpinhoo",
    handle: "twitch.tv/scorpinhoo",
    quote: "Minha experiência com o StreamQuest tem sido excelente. Já completei 7 quests, todas com suporte impecável e pagamentos rigorosamente em dia. É uma plataforma que realmente valoriza o criador e cumpre o que promete.",
  },
  {
    name: "Paildry",
    country: "Germany",
    avatar: "/firebase-public/Streamer Icons/Paildry.webp",
    twitch: "https://twitch.tv/Paildry",
    handle: "twitch.tv/paildry",
    quote: "Since joining I have completed 10+ quests across several great games, and every payment arrived on time as promised. StreamQuest has been reliable and transparent in what it offers. I would definitely recommend it to others who meet the requirements.",
  },
  {
    name: "John_Shinoda",
    country: "Brazil",
    avatar: "/firebase-public/Streamer Icons/John_Shinoda.webp",
    twitch: "https://www.twitch.tv/john_shinoda",
    handle: "twitch.tv/john_shinoda",
    quote: "Minha jornada como criador de conteúdo com o StreamQuest está sendo EXCELENTE! Já completei 07 quests em distintas modalidades de jogos, todas com suporte impecável e pagamentos sempre pontuais. O StreamQuest realmente valoriza o criador e tem transparência nas propostas apresentadas.",
  },
  {
    name: "Paschoalin",
    country: "Brazil",
    avatar: "/firebase-public/Streamer Icons/Paschaolin.webp",
    twitch: "https://www.twitch.tv/paschoalin",
    handle: "twitch.tv/paschoalin",
    quote: "O StreamQuest tem um ponto diferencial com relação às outras plataformas: o suporte imediato e contato direto, com briefings bem detalhados. O sistema de qualificação e upgrade de tier por XP é motivante para nós criadores. Tenho várias missões completas e fico sempre muito animado para cobrir novas campanhas!",
  },
  {
    name: "DrowsBicycle",
    country: "Australia",
    avatar: "/firebase-public/Streamer Icons/Drowsbicycle.webp",
    twitch: "https://www.twitch.tv/drowsybicycle",
    handle: "twitch.tv/drowsybicycle",
    quote: "Stream Quest has made a fun and simple way to connect streamers and small developers to promote both game and stream. The small team behind Stream Quest go above and beyond to help with any issues, concerns or questions, day or night. 10/10.",
  },
  {
    name: "Findseloy",
    country: "Brazil",
    avatar: "/firebase-public/Streamer Icons/Findseloy.webp",
    twitch: "https://www.twitch.tv/findseloy",
    handle: "twitch.tv/findseloy",
    quote: "I have been here practically since the beginning and I have never seen a project so friendly to smaller creators. Everything has been and continues to be incredible. Very interesting games and the support is amazing.",
  },
  {
    name: "ShrillGoblin",
    country: "United States",
    avatar: "/firebase-public/Streamer Icons/ShrillGoblin.webp",
    twitch: "https://www.twitch.tv/shrillgoblin",
    handle: "twitch.tv/shrillgoblin",
    quote: "StreamQuest has been an excellent experience and I have been more than happy to recommend the program to several of my content creator friends. Administration is thorough and responsive, with quick turn arounds for quest completions. There is a wide variety of games to cover and I am proud and excited to be a Quester as it navigates the road ahead.",
  },
  {
    name: "LunariValkyrie",
    country: "United States",
    avatar: "/firebase-public/Streamer Icons/lunarivalkyrie.webp",
    twitch: "https://www.twitch.tv/lunarivalkyrie",
    handle: "twitch.tv/lunarivalkyrie",
    quote: "My experience has been nothing but wonderful. After being treated so poorly on another platform, despite being a top performer, I was scared to try another. But I couldn't be happier here. Murat is so personable, and you can tell how much love, care, and work goes into each campaign. Easy to apply, simple to submit, and easy to get paid.",
  },
  {
    name: "Fradda",
    country: "Australia",
    avatar: "/firebase-public/Streamer Icons/Fradda.webp",
    twitch: "https://www.twitch.tv/fradda",
    handle: "twitch.tv/fradda",
    quote: "Easy to use platform with a highly engaged owner that cares about its content creators as much as the games and brands it works with.",
  },
  {
    name: "Falamarkao",
    country: "Brazil",
    avatar: "/firebase-public/Streamer Icons/FalaMarkao.webp",
    twitch: "https://www.twitch.tv/falamarkao",
    handle: "twitch.tv/falamarkao",
    quote: "My experience with the StreamQuest portal and team has been wonderful. They are always willing to help. Even though my channel is small and the audience is also small, the doors have always been open for me to stream the games and interact with the producers. The producers of Wildcard's Arena came to the live stream, gave tips and interacted with me.",
  },
  {
    name: "Igorbay0",
    country: "Brazil",
    avatar: "/firebase-public/Streamer Icons/igorbay0.webp",
    twitch: "https://twitch.tv/igorbay0",
    handle: "twitch.tv/igorbay0",
    quote: "My experience with StreamQuest has been amazing. I have completed so many quests that I have honestly lost count. What really sets StreamQuest apart is that the project has soul. The support for creators is excellent, they always reply as quickly as possible, and payments are consistently on time and very transparent. Highly recommended.",
  },
];

/** Partner/studio testimonials. */
const partners = [
  {
    studio: "Wildcard Alliance",
    role: "Luke Jech · Marketing Lead",
    country: "United States",
    quote: "Working with StreamQuest was a great experience for our game and incredibly efficient. Murat and his team managed the entire campaign for us. They achieved better results and rates than the agencies we have worked with in the past. Would highly recommend them to help get streamer coverage for your indie game.",
    logo: "/firebase-public/Logos Partner/Acclaim.webp",
    website: "https://www.wildcardgame.com/",
  },
  {
    studio: "1 Minus 1",
    role: "Sarah Newton · Operations Manager",
    country: "United Kingdom",
    quote: "The streamers genuinely enjoyed themselves, and that came through in the content — natural, engaging, and fun to watch. The quality was higher than what we have seen on other small platforms, and the boutique way StreamQuest managed the campaign made a real difference. Clear, hands-on, and easy for us, even during a busy launch.",
    logo: "/firebase-public/Logos Partner/1Minus1.webp",
    website: "https://1minus1.com/",
  },
  {
    studio: "Endix",
    role: "Industry expo event partner",
    country: "Greece",
    quote: "Murat offered a great client service and an amazing pool of creators who genuinely engaged with our digital event. StreamQuest was a fantastic partner for Endix.",
    logo: "/firebase-public/Logos Partner/Endix.webp",
    website: "https://endix-expo.com/",
  },
  {
    studio: "Critical Hit PR",
    role: "Games marketing agency",
    country: "Greece",
    quote: "StreamQuest has been a great tool for our influencer marketing. Our clients loved working with Murat and his team.",
    logo: "/firebase-public/Logos Partner/Critical Hit PR.webp",
    website: "https://www.criticalhitpr.com/",
  },
];

/* ============ PAGE ============ */

export default function TestimonialsPage() {
  return (
    <div className="rd">
      <FloatingApply />

      {/* ============ HERO — rotating pulled quote on game-art marquee ============ */}
      <section className="tt-hero">
        <div className="tt-hero-bg" aria-hidden="true">
          <div className="tt-hero-row a">
            {heroRowA.map((src, i) => (
              <div key={`a-${i}`} className="tt-hero-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading={i < 3 ? "eager" : "lazy"} decoding="async" />
              </div>
            ))}
          </div>
          <div className="tt-hero-row b">
            {heroRowB.map((src, i) => (
              <div key={`b-${i}`} className="tt-hero-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
          <div className="tt-hero-row c">
            {heroRowC.map((src, i) => (
              <div key={`c-${i}`} className="tt-hero-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>

        <div className="tt-hero-inner" style={{ position: "relative", zIndex: 4 }}>
          <h1 className="sr-only">StreamQuest testimonials from creators and studios</h1>
          <Reveal>
            <div className="tt-hero-eyebrow">
              <span className="eyebrow">
                <span className="pulse" />
                Real quotes · real people
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="tt-hero-stage">
              {featured.map((f, i) => (
                <figure key={i} className="tt-slide">
                  <blockquote>{f.text}</blockquote>
                  <figcaption className="tt-slide-attrib">
                    <div className="tt-slide-avatar">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={f.avatar} alt={`${f.name} avatar`} loading={i === 0 ? "eager" : "lazy"} />
                    </div>
                    <div className="tt-slide-meta">
                      <span className="tt-slide-name">{f.name}</span>
                      <a className="tt-slide-handle" href={f.twitch} rel="noopener">{f.handle}</a>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="tt-hero-dots">
              <span className="d" /><span className="d" /><span className="d" />
              <span>Real quotes · pulled from the testimonials archive</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ QUOTES — toggle between Creators / Studios ============ */}
      <section className="tt-section" style={{ position: "relative" }}>
        {/* Side decorative game-art tiles that peek in from the margins */}
        <div className="tt-side-decor" aria-hidden="true">
          {[
            { cls: "l1", src: quests[0].cover },
            { cls: "l2", src: quests[2].cover },
            { cls: "l3", src: quests[5].cover },
            { cls: "l4", src: quests[8].cover },
            { cls: "r1", src: quests[1].cover },
            { cls: "r2", src: quests[4].cover },
            { cls: "r3", src: quests[7].cover },
            { cls: "r4", src: quests[10].cover },
          ].map((t, i) => (
            <div key={i} className={`tt-side-tile ${t.cls}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.src} alt="" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>

        <div className="rd-shell" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <div className="tt-section-head">
              <span className="tt-section-tag">All testimonials</span>
              <h2>What they say.</h2>
              <p>Real voices from streamers and studios that ran StreamQuest campaigns. Switch between audiences below.</p>
            </div>
          </Reveal>

          <TestimonialsToggle
            creatorsContent={
              <div className="tt-creators">
                {creators.map((c) => (
                  <figure key={c.name} className="tt-quote">
                    <span className="tt-quote-mark" aria-hidden="true">“</span>
                    <blockquote className="tt-quote-body">{c.quote}</blockquote>
                    <figcaption className="tt-quote-author">
                      <div className="tt-quote-avatar">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.avatar} alt={`${c.name} avatar`} loading="lazy" />
                      </div>
                      <div className="tt-quote-meta">
                        <span className="tt-quote-name">{c.name}</span>
                        <span className="tt-quote-country">{c.country}</span>
                        <a className="tt-quote-link" href={c.twitch} rel="noopener">{c.handle}</a>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            }
            studiosContent={
              <div className="tt-partners">
                {partners.map((p) => (
                  <figure key={p.studio} className="tt-partner-quote">
                    <span className="tt-partner-mark" aria-hidden="true">“</span>
                    <blockquote className="tt-partner-body">{p.quote}</blockquote>
                    <figcaption className="tt-partner-author">
                      <a href={p.website} rel="noopener" aria-label={`${p.studio} website`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="tt-partner-logo" src={p.logo} alt={p.studio} loading="lazy" />
                      </a>
                      <div className="tt-partner-attr">
                        <span className="tt-partner-name">{p.studio}</span>
                        <span className="tt-partner-role">{p.role}</span>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            }
          />
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="tt-final">
        <div className="tt-final-inner">
          <Reveal>
            <span className="eyebrow">
              <span className="pulse" />
              Want your quote here?
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>
              Run a quest. <span className="grad">Tell us how it went.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              Every creator and studio above ran a real StreamQuest campaign. Join Discord, pick a quest, and your quote could be next.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="tt-final-actions">
              <a href="https://discord.gg/NhqfucYDXD" className="btn btn-primary btn-xl">
                Apply on Discord →
              </a>
              <Link href="/brands" className="btn btn-twitch btn-xl">
                For studios
              </Link>
              <Link href="/quests-guide" className="btn btn-secondary btn-xl">
                Read the quests guide
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}