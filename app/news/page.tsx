import Link from "next/link";
import type { Metadata } from "next";

import Reveal from "@/app/components/Reveal";
import { getPosts } from "@/lib/news";
import "@/app/redesign.css";
import "./news.css";

export const metadata: Metadata = {
  title: "News",
  description: "Latest updates, campaigns, and team notes from StreamQuest.",
};

// News list reads from KV; revalidates on tag bust from admin actions.
export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default async function NewsListPage() {
  const posts = await getPosts();

  return (
    <div className="rd news-page">
      <header className="news-header">
        <div className="rd-shell news-header-inner">
          <Reveal>
            <span className="eyebrow">
              <span className="pulse" />
              Updates
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1>News and notes from the StreamQuest team.</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p>Quest launches, partnership announcements, post-mortems, and the occasional behind-the-scenes.</p>
          </Reveal>
        </div>
      </header>

      <section className="news-section">
        <div className="rd-shell">
          {posts.length === 0 ? (
            <div className="news-empty">
              <p>Nothing posted yet. Check back soon.</p>
            </div>
          ) : (
            <ul className="news-grid">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/news/${p.slug}`} className="news-card">
                    {p.cover && (
                      <div className="news-card-cover">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.cover} alt="" loading="lazy" />
                      </div>
                    )}
                    <div className="news-card-body">
                      <div className="news-card-date">{formatDate(p.date)}</div>
                      <h2 className="news-card-title">{p.title}</h2>
                      <span className="news-card-go">Read post →</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
