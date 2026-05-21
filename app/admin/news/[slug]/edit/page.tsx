import { redirect, notFound } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getPost } from "@/lib/news";
import NewsForm from "../../NewsForm";
import { updatePostAction } from "../../actions";
import "../../../admin.css";

export const dynamic = "force-dynamic";

type Props = { params: { slug: string }; searchParams: { err?: string } };

const ERR_MESSAGES: Record<string, string> = {
  blob: "Image upload failed. Make sure a Vercel Blob store is connected to this project.",
};

export default async function AdminNewsEditPage({ params, searchParams }: Props) {
  if (!isAdmin()) redirect("/admin/login");

  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <main className="admin-page">
      <header className="admin-topbar">
        <div>
          <h1 className="admin-title">Edit post</h1>
          <p className="admin-topbar-sub">Slug: <code>{post.slug}</code></p>
        </div>
      </header>

      <NewsForm
        mode="edit"
        action={updatePostAction}
        initial={{
          slug: post.slug,
          title: post.title,
          date: post.date,
          cover: post.cover,
          format: post.format,
          body: post.body,
        }}
        error={searchParams.err ? ERR_MESSAGES[searchParams.err] ?? "Something went wrong." : undefined}
      />
    </main>
  );
}
