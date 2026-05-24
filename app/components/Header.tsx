import Link from "next/link";
import { getQuestsWithLiveStatus } from "@/lib/questStatus";
import MobileNav from "./MobileNav";

const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/streamers", label: "Streamers" },
  { href: "/brands", label: "Brands" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/quests-guide", label: "Quests Guide" },
];

export default async function Header() {
  const all = await getQuestsWithLiveStatus();
  const activeQuests = all
    .filter((q) => q.status === "active")
    .map((q) => ({
      href: `/quests/${q.slug}`,
      title: q.title,
      studio: q.studio,
      category: q.category,
      cover: q.portrait || q.cover,
    }));
  const pastQuests = all
    .filter((q) => q.status === "completed")
    .map((q) => ({
      href: `/quests/${q.slug}`,
      title: q.title,
      studio: q.studio,
      cover: q.portrait || q.cover,
    }));

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[150] backdrop-blur-xl"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,.10) 42%, rgba(255,255,255,.05) 100%)",
        borderBottom: "1px solid rgba(255,255,255,.16)",
        boxShadow: "0 10px 24px rgba(0,0,0,.22)",
      }}
      aria-label="Site header"
    >
      <div className="shell flex items-center gap-5 min-h-[var(--header-h)] py-3">
        <Link href="/" aria-label="StreamQuest home" className="shrink-0 inline-flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/firebase-public/Logos Partner/streamquest logo.webp"
            alt="StreamQuest"
            style={{ height: 40, width: "auto", display: "block" }}
          />
        </Link>

        <nav className="desktop-nav flex-1 min-w-0" aria-label="Primary site navigation">
          <ul className="flex items-center gap-6 list-none whitespace-nowrap">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[14px] font-semibold text-white/95 hover:text-lime transition-colors py-2 inline-flex items-center"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {activeQuests.length > 0 && (
            <li className="relative group nav-dd">
              <button
                type="button"
                className="text-[14px] font-semibold text-white/95 hover:text-lime transition-colors py-2 inline-flex items-center gap-1.5"
                aria-haspopup="true"
              >
                <span className="nav-pulse" aria-hidden="true" />
                Active Quests
                <span aria-hidden className="text-[10px]">v</span>
              </button>

              <div className="nav-dd-bridge" aria-hidden="true" />

              <div className="nav-dd-panel nav-dd-panel--active">
                <div className="nav-dd-head">
                  <span className="nav-dd-eyebrow">Active quests</span>
                  <Link href="/" className="nav-dd-all">See all</Link>
                </div>

                <div className="nav-dd-grid">
                  {activeQuests.map((q) => (
                    <Link key={q.href} href={q.href} className="nav-dd-card">
                      <div className="nav-dd-thumb">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={q.cover} alt="" loading="lazy" />
                        <span className="nav-dd-tagstrip" />
                      </div>
                      <div className="nav-dd-meta">
                        <div className="nav-dd-title">{q.title}</div>
                        <div className="nav-dd-studio">{q.studio}</div>
                        {q.category && (
                          <div className="nav-dd-cat">{q.category}</div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            )}

            <li className="relative group nav-dd">
              <button
                type="button"
                className="text-[14px] font-semibold text-white/95 hover:text-lime transition-colors py-2 inline-flex items-center gap-1.5"
                aria-haspopup="true"
              >
                Past Quests
                <span aria-hidden className="text-[10px]">v</span>
              </button>

              <div className="nav-dd-bridge" aria-hidden="true" />

              <div className="nav-dd-panel nav-dd-panel--past">
                <div className="nav-dd-head">
                  <span className="nav-dd-eyebrow nav-dd-eyebrow--past">Past quests</span>
                </div>

                <div className="nav-dd-grid nav-dd-grid--past">
                  {pastQuests.map((q) => (
                    <Link key={q.href} href={q.href} className="nav-dd-card nav-dd-card--past">
                      <div className="nav-dd-thumb">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={q.cover} alt="" loading="lazy" />
                      </div>
                      <div className="nav-dd-meta">
                        <div className="nav-dd-title">{q.title}</div>
                        <div className="nav-dd-studio">{q.studio}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            <li>
              <Link
                href="/faq"
                className="text-[14px] font-semibold text-white/95 hover:text-lime transition-colors py-2"
              >
                FAQ
              </Link>
            </li>

            <li>
              <Link
                href="/news"
                className="text-[14px] font-semibold text-white/95 hover:text-lime transition-colors py-2"
              >
                News
              </Link>
            </li>
          </ul>
        </nav>

        <div className="desktop-cta shrink-0">
          <a
            href="https://app.streamquest.io"
            rel="noopener"
            className="btn btn-neon"
            aria-label="Open the StreamQuest creator dashboard"
          >
            Creator Dashboard
   