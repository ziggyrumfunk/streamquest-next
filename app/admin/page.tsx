import { redirect } from "next/navigation";
import Link from "next/link";

import { isAdmin } from "@/lib/auth";
import { getQuestsWithLiveStatus } from "@/lib/questStatus";
import { signOutAction, toggleQuestStatusAction } from "./actions";
import "./admin.css";

export const dynamic = "force-dynamic";

type Props = { searchParams: { ok?: string; err?: string } };

export default async function AdminPage({ searchParams }: Props) {
  if (!isAdmin()) redirect("/admin/login");

  const quests = await getQuestsWithLiveStatus();
  const active = quests.filter((q) => q.status === "active");
  const completed = quests.filter((q) => q.status === "completed");

  return (
    <main className="admin-page">
      <header className="admin-topbar">
        <div>
          <h1 className="admin-title">Quest admin</h1>
          <p className="admin-topbar-sub">
            Flip a quest between Active and Past. Changes go live within seconds.
          </p>
        </div>
        <div className="admin-topbar-actions">
          <Link href="/" className="admin-link">View site</Link>
          <form action={signOutAction}>
            <button type="submit" className="admin-btn admin-btn-ghost">Sign out</button>
          </form>
        </div>
      </header>

      {searchParams.ok && (
        <div className="admin-toast admin-toast-ok">Status updated.</div>
      )}
      {searchParams.err && (
        <div className="admin-toast admin-toast-err">
          {searchParams.err === "kv"
            ? "Could not save (KV unreachable). Check Vercel KV is linked to this project."
            : searchParams.err === "missing"
            ? "Unknown quest slug."
            : "Something went wrong."}
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
    </main>
  );
}

function QuestList({ quests }: { quests: Awaited<ReturnType<typeof getQuestsWithLiveStatus>> }) {
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
              <img src={q.portrait || q.cover} alt="" loading="lazy" />
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
