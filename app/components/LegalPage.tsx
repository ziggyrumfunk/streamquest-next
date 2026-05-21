import "@/app/redesign.css";
import "@/app/legal-page.css";

export type LegalBlock =
  | { tag: "h2"; text: string }
  | { tag: "h3"; text: string }
  | { tag: "p"; text: string }
  | { tag: "ul"; items: string[] }
  | { tag: "hr" };

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  blocks: LegalBlock[];
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function LegalPage({
  eyebrow,
  title,
  intro,
  lastUpdated,
  blocks,
}: Props) {
  // Build TOC from numbered top-level h2 sections (e.g. "1. Who We Are")
  const toc = blocks
    .filter((b): b is { tag: "h2"; text: string } => b.tag === "h2")
    .filter((b) => /^\d+\./.test(b.text.trim()));

  return (
    <div className="rd">
      {/* ============ HERO ============ */}
      <section className="lp-hero">
        <div className="lp-hero-inner">
          <span className="lp-hero-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="lp-hero-sub">{intro}</p>
          <div className="lp-hero-meta">
            Last updated: <strong>{lastUpdated}</strong>
          </div>
        </div>
      </section>

      <div className="lp-hero-sep" aria-hidden="true" />

      {/* ============ ARTICLE + TOC ============ */}
      <section className="lp-section">
        <div className="lp-layout">
          <aside className="lp-toc" aria-label="Contents">
            <div className="lp-toc-label">Contents</div>
            <ol>
              {toc.map((b) => (
                <li key={b.text}>
                  <a href={`#${slug(b.text)}`}>{b.text.replace(/^\d+\.\s*/, "")}</a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="lp-article">
            {blocks.map((b, i) => {
              if (b.tag === "hr") return <hr key={i} />;
              if (b.tag === "p") return <p key={i}>{b.text}</p>;
              if (b.tag === "ul") {
                return (
                  <ul key={i}>
                    {b.items.map((it, j) => <li key={j}>{it}</li>)}
                  </ul>
                );
              }
              if (b.tag === "h2") {
                // Skip "Contents" — we generate our own TOC
                if (/^contents$/i.test(b.text.trim())) return null;
                return (
                  <h2 key={i} id={slug(b.text)}>
                    {b.text}
                  </h2>
                );
              }
              if (b.tag === "h3") return <h3 key={i}>{b.text}</h3>;
              return null;
            })}

            <p className="lp-footer-note">
              Questions about this document? Email{" "}
              <a href="mailto:contact@streamquest.io">contact@streamquest.io</a>.
              Privacy-specific requests go to{" "}
              <a href="mailto:privacy@streamquest.io">privacy@streamquest.io</a>.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
