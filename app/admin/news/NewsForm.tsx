import Link from "next/link";
import BodyImageUploader from "./BodyImageUploader";

type Props = {
  mode: "new" | "edit";
  action: (formData: FormData) => void;
  initial?: {
    slug?: string;
    title?: string;
    date?: string;
    cover?: string;
    format?: "markdown" | "html";
    body?: string;
  };
  error?: string;
};

export default function NewsForm({ mode, action, initial = {}, error }: Props) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={action} className="admin-news-form">
      {initial.slug && <input type="hidden" name="slug" value={initial.slug} />}

      <div className="admin-news-row">
        <label className="admin-label" htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={initial.title ?? ""}
          className="admin-input"
          placeholder="Quest launched: REPLACED partners with StreamQuest"
        />
      </div>

      <div className="admin-news-row admin-news-row-2col">
        <div>
          <label className="admin-label" htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            required
            defaultValue={initial.date ?? today}
            className="admin-input"
          />
        </div>
        <div>
          <label className="admin-label" htmlFor="format">Format</label>
          <select
            id="format"
            name="format"
            defaultValue={initial.format ?? "markdown"}
            className="admin-input"
          >
            <option value="markdown">Markdown</option>
            <option value="html">Raw HTML</option>
          </select>
        </div>
      </div>

      <div className="admin-news-row">
        <label className="admin-label">Cover image (optional)</label>
        {initial.cover && (
          <div className="admin-news-cover-preview">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={initial.cover} alt="current cover" />
            <label className="admin-news-cover-remove">
              <input type="checkbox" name="removeCover" value="1" />
              Remove current cover
            </label>
          </div>
        )}
        <div className="admin-news-cover-inputs">
          <input
            type="text"
            name="coverUrl"
            placeholder="Paste an image URL"
            defaultValue=""
            className="admin-input"
          />
          <span className="admin-news-or">or</span>
          <input
            type="file"
            name="coverFile"
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            className="admin-input admin-input-file"
          />
        </div>
        <p className="admin-uploader-hint">
          Recommended landscape, at least 1600px wide. Used on the news list and as the social share image.
        </p>
      </div>

      <div className="admin-news-row">
        <BodyImageUploader />
      </div>

      <div className="admin-news-row">
        <label className="admin-label" htmlFor="body">Body</label>
        <textarea
          id="body"
          name="body"
          rows={20}
          required
          defaultValue={initial.body ?? ""}
          className="admin-input admin-textarea"
          placeholder="Markdown or raw HTML, depending on the Format selector above."
        />
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-news-actions-row">
        <button type="submit" className="admin-btn">
          {mode === "new" ? "Publish post" : "Update post"}
        </button>
        <Link href="/admin" className="admin-btn admin-btn-ghost">Cancel</Link>
      </div>
    </form>
  );
}
