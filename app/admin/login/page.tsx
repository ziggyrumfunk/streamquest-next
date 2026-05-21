import { redirect } from "next/navigation";
import { signInAction } from "../actions";
import { isAdmin } from "@/lib/auth";
import "../admin.css";

export const dynamic = "force-dynamic";

type Props = { searchParams: { err?: string } };

export default function AdminLoginPage({ searchParams }: Props) {
  if (isAdmin()) redirect("/admin");

  return (
    <main className="admin-shell">
      <div className="admin-card">
        <h1>StreamQuest admin</h1>
        <p className="admin-sub">Sign in to manage active and past quests.</p>

        <form action={signInAction} className="admin-form">
          <label htmlFor="password" className="admin-label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            className="admin-input"
          />
          {searchParams.err && (
            <p className="admin-error">Wrong password, try again.</p>
          )}
          <button type="submit" className="admin-btn">Sign in</button>
        </form>
      </div>
    </main>
  );
}
