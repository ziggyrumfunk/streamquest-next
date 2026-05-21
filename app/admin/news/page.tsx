import { redirect } from "next/navigation";
import Link from "next/link";

import { isAdmin } from "@/lib/auth";
import { getPosts } from "@/lib/news";
import { deletePostAction } from "./actions";
import "../admin.css";

export const dynamic = "force-dynamic";

type Props = { searchParams: { ok?: string; err?: string } };

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

export default async function AdminNewsPage({ searchParams }: Props) {
  if (!isAdmin()) redirect("/admin/login");

  const posts = await getPosts();

  return (
    <main className="admin-page">
      <header className="admin-topbar">
        <div>
          <h1 className="admin-title">News admin</h1>
          <p className="admin-topbar-sub">Publish, edit, and remove news posts. Changes go live immediately.</p>
        </div>
        <div className="admin-topbar-actions">
          <Link href="/admin" className="admin-link">Quests</Link>
          <Link href="/news" className="admin-link">View news</Link>
          <Link href="/admin/news/new" className="admin-btn">New post</Link>
        </div>
      </header>

      {searchParams.ok === "created" && <div className="admin-toast admin-toast-ok">Post created.</div>}
      {searchParams.ok === "updated" && <div className="admin-toast admin-toast-ok">Post updated.</div>}
      {searchParams.ok === "deleted" && <div className="admin-toast admin-toast-ok">Post deleted.</div>}
      {searchParams.err && <div className="admin-toast admin-toast-err">Something went wrong: {searchParams.err}</div>}

      <section className="admin-section">
        <h2 className="admin-section-title">
          Posts <span className="admin-count">{posts.length}</span>
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
                    <img src={p.cover} alt="" loading="lazy" />
                  ) : (
                    <div className="admin-no-thumb" />
                  )}
                </div>
                <div className="admin-quest-meta">
                  <Link href={`/news/${p.slug}`} className="admin-quest-title">{p.title}</Link>
                  <p className="admin-quest-studio">{formatDate(p.date)} · {p.format.toUpperCase()}</p>
                </div>
                <div className="admin-status admin-status-active">Published</div>
                <div className="admin-toggle admin-news-actions">
                  <Link href={`/admin/news/${p.slug}/edit`} className="admin-btn admin-btn-toggle">Edit</Link>
                  <form action={deletePostAction} className="admin-news-delete">
                    <input type="hidden" name="slug" value={p.slug} />
                    <button
                      type="submit"
                      className="admin-btn admin-btn-ghost admin-btn-toggle"
                    >
                      Delete
                    </button>
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
