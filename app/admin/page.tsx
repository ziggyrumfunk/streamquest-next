import { redirect } from "next/navigation";
import Link from "next/link";

import { isAdmin } from "@/lib/auth";
import { getQuestsWithLiveStatus } from "@/lib/questStatus";
import { getPosts } from "@/lib/news";
import { signOutAction, toggleQuestStatusAction } from "./actions";
import { deletePostAction } from "./news/actions";
import "./admin.css";

export const dynamic = "force-dynamic";

type Props = { searchParams: { ok?: string; err?: string } };

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

const OK_MESSAGES: Record<string, string> = {
  "1": "Quest status updated.",
  created: "News post created.",
  updated: "News post updated.",
  deleted: "News post deleted.",
};

const ERR_MESSAGES: Record<string, string> = {
  invalid: "Invalid request.",
  missing: "Unknown quest slug.",
  kv: "Could not save (KV unreachable). Check Vercel KV is linked to this project.",
  blob: "Image upload failed. Make sure a Vercel Blob store is connected to this project.",
};

export default async function AdminDashboard({ searchParams }: Props) {
  if (!isAdmin()) redirect("/admin/login");

  const [quests, posts] = await Promise.all([
    getQuestsWithLiveStatus(),
    getPosts(),
  ]);
  const active = quests.filter((q) => q.status === "active");
  const completed = quests.filter((q) => q.status === "completed");

  return (
    <main className="admin-page">
      <header className="admin-topbar">
        <div>
          <h1 className="admin-title">StreamQuest admin</h1>
          <p className="admin-topbar-sub">
            Flip quest statuses and manage news posts. All changes go live within seconds.
          </p>
        </div>
        <div className="admin-topbar-actions">
          <Link href="/" className="admin-link">View site</Link>
          <Link href="/news" className="admin-link">News</Link>
          <form action={signOutAction}>
            <button type="submit" className="admin-btn admin-btn-ghost">Sign out</button>
          </form>
        </div>
      </header>

      {searchParams.ok && (
        <div className="admin-toast admin-toast-ok">
          {OK_MESSAGES[searchParams.ok] ?? "Saved."}
        </div>
      )}
      {searchParams.err && (
        <div className="admin-toast admin-toast-err">
          {ERR_MESSAGES[searchParams.err] ?? "Something went wrong."}
        </div>
      )}

      <section className="admin-section">
        <h2 className="admin-section-title">
          Active quests <span className="admin-count">{active.length}</span>
        </h2>
        <QuestList quests={active} />
      </section>

      <section className="admin-section">
        <h2 className="admin-section-title">
          Past quests <span className="admin-count">{completed.length}</span>
        </h2>
        <QuestList quests={completed} />
      </section>

      <section className="admin-section">
        <h2 className="admin-section-title admin-section-title-row">
          <span>
            News posts <span className="admin-count">{posts.length}</span>
          </span>
          <Link href="/admin/news/new" className="admin-btn admin-btn-toggle">New post</Link>
        </h2>

        {posts.length === 0 ? (
          <p className="admin-empty">No posts yet. Hit <strong>New post</strong> to publish the first one.</p>
        ) : (
          <ul className="admin-quests">
            {posts.map((p) => (
              <li key={p.slug} className="admin-quest">
                <div className="admin-quest-thumb">
                  {p.cover ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={p.cover} alt={p.title} loading="lazy" />
                  ) : (
                    <div className="admin-no-thumb" />
                  )}
                </div>
                <div className="admin-quest-meta">
                  <Link href={`/news/${p.slug}`} className="admin-quest-title">{p.title}</Link>
                  <p className="admin-quest-studio">{formatDate(p.date)} - {p.format.toUpperCase()}</p>
                </div>
                <div className="admin-status admin-status-active">Published</div>
                <div className="admin-toggle admin-news-actions">
                  <Link href={`/admin/news/${p.slug}/edit`} className="admin-btn admin-btn-toggle">Edit</Link>
                  <form action={deletePostAction} className="admin-news-delete">
                    <input type="hidden" name="slug" value={p.slug} />
                    <button type="submit" className="admin-btn admin-btn-ghost admin-btn-toggle">Delete</button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function QuestList({
  quests,
}: {
  quests: Awaited<ReturnType<typeof getQuestsWithLiveStatus>>;
}) {
  if (quests.length === 0) {
    return <p className="admin-empty">Nothing here.</p>;
  }
  return (
    <ul className="admin-quests">
      {quests.map((q) => {
        const isActive = q.status === "active";
        const next = isActive ? "completed" : "active";
        const label = isActive ? "Move to Past" : "Move to Active";
        return (
          <li key={q.slug} className="admin-quest">
            <div className="admin-quest-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={q.portrait || q.cover} alt={q.title} loading="lazy" />
            </div>
            <div className="admin-quest-meta">
              <Link href={`/quests/${q.slug}`} className="admin-quest-title">{q.title}</Link>
              <p className="admin-quest-studio">{q.studio}</p>
              {q.category && <p className="admin-quest-cat">{q.category}</p>}
            </div>
            <div className={`admin-status admin-status-${q.status}`}>
              {isActive ? "Active" : "Past"}
            </div>
            <form action={toggleQuestStatusAction} className="admin-toggle">
              <input type="hidden" name="slug" value={q.slug} />
              <input type="hidden" name="next" value={next} />
              <button type="submit" className="admin-btn admin-btn-toggle">{label}</button>
            </form>
          </li>
        );
      })}
    </ul>
  );
}
