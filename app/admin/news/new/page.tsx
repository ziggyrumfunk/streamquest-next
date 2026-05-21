import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import NewsForm from "../NewsForm";
import { createPostAction } from "../actions";
import "../../admin.css";

export const dynamic = "force-dynamic";

const ERR_MESSAGES: Record<string, string> = {
  title: "Title is required.",
  body: "Body is required.",
  blob: "Image upload failed. Make sure a Vercel Blob store is connected to this project.",
};

export default function AdminNewsNewPage({ searchParams }: { searchParams: { err?: string } }) {
  if (!isAdmin()) redirect("/admin/login");

  return (
    <main className="admin-page">
      <header className="admin-topbar">
        <div>
          <h1 className="admin-title">New post</h1>
          <p className="admin-topbar-sub">Write in Markdown or paste raw HTML. Cover image is optional.</p>
        </div>
      </header>

      <NewsForm
        mode="new"
        action={createPostAction}
        error={searchParams.err ? ERR_MESSAGES[searchParams.err] ?? "Something went wrong." : undefined}
      />
    </main>
  );
}
