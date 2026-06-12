import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Reveal from "@/app/components/Reveal";
import QuestVideoTabs from "@/app/components/QuestVideoTabs";
import CopyLink from "@/app/components/CopyLink";
import {
  quests,
  getQuestBySlug,
  allQuestSlugs,
  type QuestSocialType,
} from "@/data/quests";
import "@/app/redesign.css";
import "./quest.css";

type Params = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return allQuestSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const q = getQuestBySlug(params.slug);
  if (!q) return { title: "Quest" };
  return {
    title: `${q.title} — Mission brief`,
    description: q.description || q.tagline,
    alternates: { canonical: `https://streamquest.io/quests/${q.slug}` },
    openGraph: {
      title: `${q.title} — StreamQuest mission brief`,
      description: q.description || q.tagline,
      images: [q.cover],
    },
  };
}

const ICON_MAP: Record<QuestSocialType, string> = {
  instagram: "/firebase-public/Social Icons PNG/instagram.png",
  tiktok: "/firebase-public/Social Icons PNG/tiktok.png",
  youtube: "/firebase-public/Social Icons PNG/youtube.png",
  discord: "/firebase-public/Social Icons PNG/discord.png",
  x: "/firebase-public/Social Icons PNG/x.png",
  twitter: "/firebase-public/Social Icons PNG/x.png",
  website: "/firebase-public/Social Icons PNG/website.png",
  bluesky: "/firebase-public/Social Icons PNG/bluesky.png",
  twitch: "/firebase-public/Social Icons PNG/twitch.png",
};

const STORE_ICON_MAP: Record<string, string> = {
  steam: "/firebase-public/Social Icons PNG/steam.png",
  xbox: "/firebase-public/Social Icons PNG/website.png",
  website: "/firebase-public/Social Icons PNG/website.png",
  epic: "/firebase-public/Social Icons PNG/website.png",
  gog: "/firebase-public/Social Icons PNG/website.png",
};

export default function QuestPage({ params }: Params) {
  const quest = getQuestBySlug(params.slug);
  if (!quest) notFound();

  const otherQuests = quests
    .filter((q) => q.slug !== quest.slug)
    .slice(0, 8);

  const isActive = quest.status === "active";

  return (
    <div className={`rd q-slug-${quest.slug}`}>
      {quest.slug === "goodheavens" && (
        <div className="gh-deco-layer" aria-hidden="true">
          {/* eslint-disable @next/next/no-img-element */}
          <img className="gh-deco gh-deco-tr is-anim"   style={{ width: 220, ["--rot" as any]: "-4deg" }} src="/firebase-public/GoodHeavensRPG/Rar.webp" alt="" loading="lazy" />
          <img className="gh-deco gh-deco-ml is-anim-2" style={{ width: 200, ["--rot" as any]: "6deg",  top: "16%", left: "-3%" }} src="/firebase-public/GoodHeavensRPG/Forest Guard.webp" alt="" loading="lazy" />
          <img className="gh-deco gh-deco-mr is-anim"   style={{ width: 170, ["--rot" as any]: "-8deg", top: "22%", right: "-2%" }} src="/firebase-public/GoodHeavensRPG/sheep pink.webp" alt="" loading="lazy" />
          <img className="gh-deco is-anim-2 is-faded"   style={{ width: 240, ["--rot" as any]: "3deg",  top: "32%", left: "4%" }} src="/firebase-public/GoodHeavensRPG/drunk orc.webp" alt="" loading="lazy" />
          <img className="gh-deco is-anim"              style={{ width: 150, ["--rot" as any]: "-12deg", top: "40%", right: "5%" }} src="/firebase-public/GoodHeavensRPG/Doe.webp" alt="" loading="lazy" />
          <img className="gh-deco is-anim-2"            style={{ width: 200, ["--rot" as any]: "5deg",   top: "52%", left: "-2%" }} src="/firebase-public/GoodHeavensRPG/troll.webp" alt="" loading="lazy" />
          <img className="gh-deco is-anim is-tiny"      style={{ width: 130, ["--rot" as any]: "8deg",   top: "58%", right: "3%" }} src="/firebase-public/GoodHeavensRPG/Fox sit.webp" alt="" loading="lazy" />
          <img className="gh-deco is-anim-2 is-faded"   style={{ width: 180, ["--rot" as any]: "-3deg",  top: "66%", left: "5%" }} src="/firebase-public/GoodHeavensRPG/scholar mayor.webp" alt="" loading="lazy" />
          <img className="gh-deco is-anim"              style={{ width: 220, ["--rot" as any]: "4deg",   top: "72%", right: "-2%" }} src="/firebase-public/GoodHeavensRPG/Dump Monster.webp" alt="" loading="lazy" />
          <img className="gh-deco is-anim-2"            style={{ width: 160, ["--rot" as any]: "-6deg",  top: "82%", left: "2%" }} src="/firebase-public/GoodHeavensRPG/hunter.webp" alt="" loading="lazy" />
          <img className="gh-deco is-anim is-tiny"      style={{ width: 140, ["--rot" as any]: "10deg",  top: "88%", right: "4%" }} src="/firebase-public/GoodHeavensRPG/flying rat.webp" alt="" loading="lazy" />
          {/* eslint-enable @next/next/no-img-element */}
        </div>
      )}

      {/* ============ HERO ============ */}
      <section className="q-hero">
        <div className="q-hero-bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={quest.cover} alt={quest.title} loading="eager" fetchPriority="high" />
        </div>

        <div className="q-hero-inner">
          <Reveal>
            <div className="badge-row">
              <span className={`q-status ${isActive ? "active" : "completed"}`}>
                {isActive && <span className="pulse" />}
                {isActive ? "Active quest" : "Completed"}
              </span>
              {quest.category && (
                <span className="q-category">{quest.category}</span>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="q-studio">{quest.studio}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <h1>{quest.title}</h1>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="q-tagline">{quest.description || quest.tagline}</p>
          </Reveal>

          {quest.heroMeta && quest.heroMeta.length > 0 && (
            <Reveal delay={0.3}>
              <div className="q-hero-meta">
                {quest.heroMeta.map((m, i) => (
                  <span key={m.label} className="q-hero-meta-item">
                    <span className="q-hero-meta-label">{m.label}</span>
                    <strong>{m.value}</strong>
                    {i < quest.heroMeta!.length - 1 && (
                      <span className="q-hero-meta-sep" aria-hidden="true">·</span>
                    )}
                  </span>
                ))}
              </div>
            </Reveal>
          )}

          {isActive && (
            <Reveal delay={0.35}>
              <div className="q-cta-row">
                <a href="https://app.streamquest.io" className="btn btn-primary btn-xl">
                  Start the quest
                </a>
                <Link href="/quests-guide" className="btn btn-secondary btn-xl">
                  Quests guide (start here)
                </Link>
                {quest.links?.steam && (
                  <a
                    href={quest.links.steam}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-steam btn-xl"
                  >
                    Wishlist on Steam
                  </a>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ============ VIDEO TABS ============ */}
      {(quest.videos?.trailer || quest.videos?.brief || quest.videos?.briefComingSoon) && (
        <section className="q-section q-section-tight">
          <div className="rd-shell">
            <Reveal>
              <QuestVideoTabs
                trailer={quest.videos.trailer}
                brief={quest.videos.brief}
                briefComingSoon={quest.videos.briefComingSoon}
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ FIRST TIMER CALLOUT ============ */}
      {isActive && (
        <section className="q-section q-section-tight">
          <div className="rd-shell">
            <Reveal>
              <div className="q-first-timer">
                <span className="q-tag">First time streamer?</span>
                <p>
                  Read the Quests Guide before you go live. It covers setup, proof,
                  and the exact dos and don&apos;ts so your run counts.
                </p>
                <div className="q-first-timer-actions">
                  <Link href="/quests-guide" className="btn btn-primary">
                    Open Quests Guide
                  </Link>
                  <a href="https://app.streamquest.io" className="btn btn-secondary">
                    Open Creator Dashboard
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ TL;DR ============ */}
      {quest.tldr && quest.tldr.length > 0 && (
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
                {quest.tldr.map((t) => (
                  <div key={t.label} className="q-tldr-card">
                    <div className="q-tldr-stat">{t.stat}</div>
                    <div className="q-tldr-label">{t.label}</div>
                    {t.sub && <div className="q-tldr-sub">{t.sub}</div>}
                  </div>
                ))}
              </div>
            </Reveal>
            {quest.tldrFootnotes && quest.tldrFootnotes.length > 0 && (
              <Reveal>
                <div className="q-tldr-foot">
                  {quest.tldrFootnotes.map((f) => (
                    <p key={f}>{f}</p>
                  ))}
                </div>
              </Reveal>
            )}
            {isActive && (
              <Reveal>
                <div className="q-cta-center">
                  <a href="https://app.streamquest.io" className="btn btn-primary">
                    Apply via Creator Dashboard
                  </a>
                  <a
                    href="https://discord.gg/NhqfucYDXD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Join Discord
                  </a>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ============ TIER LADDER ============ */}
      {quest.tiers && quest.tiers.length > 0 && (
        <section className="q-section" style={{ paddingTop: 0 }}>
          <div className="rd-shell">
            <Reveal>
              <div className="q-section-head">
                <span className="q-tag">Payouts</span>
                <h2>Stream. Verify. Get paid.</h2>
                <p>
                  Hit a tier&apos;s requirements, submit your VOD, a human reviews
                  it, payout lands within five business days.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="q-tiers">
                {quest.tiers.map((t) => (
                  <div key={t.name} className="q-tier">
                    <div className="q-tier-badge">{t.name.toUpperCase()}</div>
                    <div className="q-tier-payout">{t.payout}</div>
                    {t.rate && <div className="q-tier-rate">{t.rate}</div>}
                    {t.rateNote && <div className="q-tier-rate">{t.rateNote}</div>}
                    <p className="q-tier-req">{t.requirement}</p>
                    <div className="q-tier-flags">
                      {t.sideQuestsRequired && <span>At least 1 side quest required</span>}
                      {t.freeCopy && <span>Free game copy included</span>}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ SCREENSHOT STRIP ============ */}
      {quest.screenshots && quest.screenshots.length > 0 && (
        <section className="q-section q-section-strip">
          <div className="q-strip-wrap">
            <Reveal>
              <div className="q-strip">
                {quest.screenshots.map((src, i) => (
                  <div key={src + i} className="q-strip-item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`${quest.title} screenshot ${i + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ STORY ============ */}
      {(quest.storyParagraphs?.length || quest.about || quest.description) && (
        <section className="q-section">
          <div className="rd-shell">
            <Reveal>
              <div className="q-section-head">
                <span className="q-tag">The campaign</span>
                <h2>StreamQuest x {quest.studio}</h2>
                <p>Paid creator campaign for {quest.title}.</p>
              </div>
            </Reveal>

            <div className="q-story-split">
              <Reveal>
                <div className="q-story-body">
                  {quest.storyParagraphs && quest.storyParagraphs.length > 0
                    ? quest.storyParagraphs.map((p, i) => <p key={i}>{p}</p>)
                    : (
                      <>
                        {quest.description && <p>{quest.description}</p>}
                        {quest.about && <p>{quest.about}</p>}
                      </>
                    )}
                  {quest.storyPull && (
                    <div className="q-story-pull">{quest.storyPull}</div>
                  )}
                </div>
              </Reveal>

              {quest.storyAside && (
                <Reveal delay={0.15}>
                  <div className="q-story-aside">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={quest.storyAside} alt={quest.storyAsideCaption || ""} loading="lazy" />
                    {quest.storyAsideCaption && (
                      <span className="q-story-aside-cap">{quest.storyAsideCaption}</span>
                    )}
                  </div>
                </Reveal>
              )}
            </div>

            {quest.shortDescription && (
              <Reveal>
                <div className="q-short-desc">
                  <h3>Short description</h3>
                  <p>{quest.shortDescription}</p>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ============ KEY FEATURES ============ */}
      {quest.keyFeatures && quest.keyFeatures.length > 0 && (
        <section className="q-section q-features" style={{ paddingTop: 0 }}>
          <div className="rd-shell">
            <Reveal>
              <div className="q-features-head">
                <span className="q-tag">Why it streams</span>
                <h2>Key features</h2>
              </div>
            </Reveal>
            <Reveal>
              <div className="q-features-grid">
                {quest.keyFeatures.map((feat) => (
                  <div key={feat} className="q-feature">
                    <p>{feat}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ SIDE QUESTS ============ */}
      {quest.sideQuestDetails && quest.sideQuestDetails.length > 0 && (
        <section className="q-section q-sq" style={{ paddingTop: 0 }}>
          <div className="rd-shell">
            <Reveal>
              <div className="q-features-head">
                <span className="q-tag">Optional bonuses</span>
                <h2>Side quests</h2>
                {quest.sideQuestIntro ? (
                  <p>{quest.sideQuestIntro}</p>
                ) : (
                  <p>Stackable extras that bump Bronze to Silver and unlock the bigger payouts.</p>
                )}
              </div>
            </Reveal>
            <Reveal>
              <div className="q-sq-grid">
                {quest.sideQuestDetails.map((sq) => (
                  <div key={sq.name} className="q-sq-card">
                    <div className="q-sq-head">
                      <div className="q-sq-name">{sq.name}</div>
                      {typeof sq.xp === "number" && (
                        <span className="q-sq-xp">+{sq.xp} XP</span>
                      )}
                    </div>
                    <p className="q-sq-desc">{sq.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            {quest.sideQuestOutro && (
              <Reveal>
                <p className="q-sq-outro">{quest.sideQuestOutro}</p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ============ TRACKED WISHLIST ============ */}
      {quest.trackedWishlistUrl && (
        <section className="q-section" style={{ paddingTop: 0 }}>
          <div className="rd-shell">
            <Reveal>
              <div className="q-section-head q-section-head-center">
                <span className="q-tag">Your link</span>
                <h2>Tracked wishlist link</h2>
              </div>
            </Reveal>
            <Reveal>
              <CopyLink
                url={quest.trackedWishlistUrl}
                note={quest.trackedWishlistNote}
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ GALLERY ============ */}
      {quest.gallery && quest.gallery.thumbs.length > 0 && (
        <section className="q-section" style={{ paddingTop: 0 }}>
          <div className="rd-shell">
            <Reveal>
              <div className="q-section-head q-section-head-center">
                <span className="q-tag">In-campaign art</span>
                <h2>Screenshots and key art</h2>
                <p>Use these for thumbnails, overlays, social posts, and short-form content.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="q-gallery">
                {quest.gallery.wide && (
                  <div className="q-gallery-item q-gallery-wide">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={quest.gallery.wide} alt={`${quest.title} key art`} loading="lazy" />
                  </div>
                )}
                {quest.gallery.thumbs.map((src, i) => (
                  <div key={src + i} className="q-gallery-item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`${quest.title} screenshot ${i + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ OFFICIAL ACCOUNTS ============ */}
      {quest.officialAccounts && quest.officialAccounts.length > 0 && (
        <section className="q-section" style={{ paddingTop: 0 }}>
          <div className="rd-shell">
            <Reveal>
              <div className="q-section-head q-section-head-center">
                <span className="q-tag">Official accounts</span>
                <h2>Tag, follow, and share</h2>
                <p>Use these for Social Agent and Growing Together side quests.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="q-accounts">
                {quest.officialAccounts.map((acct) => (
                  <div key={acct.name} className="q-account">
                    <div className="q-account-name">{acct.name}</div>
                    <p className="q-account-hint">{acct.hint}</p>
                    <div className="q-account-icons">
                      {acct.links.map((l) => (
                        <a
                          key={l.type + l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${acct.name} ${l.type}`}
                          className="q-account-icon"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={ICON_MAP[l.type]} alt="" loading="lazy" width={20} height={20} />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ STORE LINKS ============ */}
      {quest.storeLinks && quest.storeLinks.length > 0 && (
        <section className="q-section" style={{ paddingTop: 0 }}>
          <div className="rd-shell">
            <Reveal>
              <div className="q-section-head q-section-head-center">
                <span className="q-tag">Links</span>
                <h2>Store and resources</h2>
                {quest.platforms && quest.platforms.length > 0 && (
                  <p>Platforms: {quest.platforms.join(", ")}.</p>
                )}
              </div>
            </Reveal>
            <Reveal>
              <div className="q-stores">
                {quest.storeLinks.map((s) => (
                  <a
                    key={s.href + s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="q-store"
                  >
                    <span className="q-store-ico">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={STORE_ICON_MAP[s.icon || "website"]} alt="" loading="lazy" />
                    </span>
                    <span className="q-store-txt">
                      <strong>{s.name}</strong>
                      <span>{s.sub}</span>
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ RULES / EXPECTATIONS ============ */}
      {(quest.rulesContent?.length || quest.rules?.length) && (
        <section className="q-section" style={{ paddingTop: 0 }}>
          <div className="rd-shell">
            <Reveal>
              <div className="q-section-head">
                <span className="q-tag">Expectations and selection</span>
                <h2>
                  {quest.slots ? `${quest.slots} slots, ` : ""}
                  right of refusal, keys on Discord
                </h2>
              </div>
            </Reveal>

            {quest.rulesContent && quest.rulesContent.length > 0 ? (
              <Reveal>
                <div className="q-rules">
                  {quest.rulesContent.map((r) => (
                    <div key={r.heading} className="q-rules-block">
                      <h3>{r.heading}</h3>
                      <p>{r.body}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : (
              quest.rules && (
                <Reveal>
                  <ul className="q-list rules">
                    {quest.rules.map((r) => <li key={r}>{r}</li>)}
                  </ul>
                </Reveal>
              )
            )}
          </div>
        </section>
      )}

      {/* ============ HOW TO JOIN ============ */}
      {isActive && quest.howToJoin && quest.howToJoin.length > 0 && (
        <section className="q-section" style={{ paddingTop: 0 }}>
          <div className="rd-shell">
            <Reveal>
              <div className="q-section-head q-section-head-center">
                <span className="q-tag">Steps</span>
                <h2>How to join</h2>
                <p>From application to payout in six steps. Discord is required for keys and coordination.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="q-steps">
                {quest.howToJoin.map((s) => (
                  <div key={s.title} className="q-step">
                    <div className="q-step-title">{s.title}</div>
                    <div className="q-step-sub">{s.sub}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <div className="q-discord-banner">
                <p>
                  <strong>Discord required.</strong> Keys and campaign support are
                  coordinated there. Join before you go live.
                </p>
                <a
                  href="https://discord.gg/NhqfucYDXD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-discord"
                >
                  Join Discord
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ============ OTHER QUESTS ============ */}
      <section className="q-section" style={{ paddingTop: 0 }}>
        <div className="rd-shell-wide">
          <Reveal>
            <div className="q-other-head">
              <span className="q-tag">Browse</span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>
                Other quests
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="q-other-grid">
              {otherQuests.map((q) => (
                <Link key={q.slug} href={`/quests/${q.slug}`} className="q-other-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={q.portrait || q.cover} alt={`${q.title} key art`} loading="lazy" />
                  <span className="q-other-name">{q.title}</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="q-final">
        <div className="rd-shell">
          <Reveal>
            <span className="q-tag">{isActive ? "Apply now" : "Stay close"}</span>
            <h2>
              {isActive
                ? <>Ready to <span className="grad">stream {quest.title}</span>?</>
                : <>More quests <span className="grad">drop weekly</span>.</>
              }
            </h2>
            <p>
              {isActive
                ? "Join Discord to apply, ask questions, and get briefed by a real human."
                : "Join Discord to catch the next paid quest before anyone else."
              }
            </p>
            <div className="q-final-actions">
              <a href="https://discord.gg/NhqfucYDXD" className="btn btn-primary btn-xl">
                Join Discord
              </a>
              <Link href="/" className="btn btn-secondary btn-xl">
                Back to all quests
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
