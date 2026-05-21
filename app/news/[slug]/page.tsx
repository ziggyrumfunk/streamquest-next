import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import DOMPurify from "isomorphic-dompurify";

import Reveal from "@/app/components/Reveal";
import { getPost } from "@/lib/news";
import "@/app/redesign.css";
import "../news.css";

type Params = { params: { slug: string } };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post" };
  return {
    title: post.title,
    description: post.title,
    openGraph: post.cover
      ? { title: post.title, images: [post.cover] }
      : { title: post.title },
  };
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default async function NewsPostPage({ params }: Params) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <div className="rd news-post">
      <article>
        <header className="news-post-header">
          <div className="rd-shell">
            <Reveal>
              <Link href="/news" className="news-post-back">← All posts</Link>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="news-post-date">{formatDate(post.date)}</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="news-post-title">{post.title}</h1>
            </Reveal>
          </div>
        </header>

        {post.cover && (
          <Reveal>
            <div className="news-post-cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.cover} alt="" loading="eager" />
            </div>
          </Reveal>
        )}

        <div className="rd-shell news-post-shell">
          <Reveal>
            <div className="news-post-body">
              {post.format === "markdown" ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.body}
                </ReactMarkdown>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.body, {
                      USE_PROFILES: { html: true },
                    }),
                  }}
                />
              )}
            </div>
          </Reveal>
        </div>
      </article>

      <div className="rd-shell news-post-foot">
        <Link href="/news" className="btn btn-secondary">Back to all news</Link>
      </div>
    </div>
  );
}
