"use client";

import { useState } from "react";
import { uploadBodyImageAction } from "./actions";

/**
 * Drop a file in, get a URL back to paste into the body editor.
 * Doesn't auto-insert (avoids assumptions about cursor position in textarea).
 */
export default function BodyImageUploader() {
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function onFile(file: File) {
    setBusy(true); setError(null); setUrl(null); setCopied(false);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadBodyImageAction(fd);
      if (res.error) setError(res.error);
      else if (res.url) setUrl(res.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  function copy() {
    if (!url) return;
    try { navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch {}
  }

  return (
    <div className="admin-uploader">
      <div className="admin-uploader-head">
        <span className="admin-label">Inline image upload</span>
        <span className="admin-uploader-hint">Upload, copy the URL, paste it into the body where you want it.</span>
      </div>
      <div className="admin-uploader-row">
        <label className="admin-uploader-pick">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            onChange={(e) => { const f = e.currentTarget.files?.[0]; if (f) onFile(f); e.currentTarget.value = ""; }}
            disabled={busy}
          />
          <span>{busy ? "Uploading…" : "Choose image"}</span>
        </label>
        {url && (
          <>
            <input
              type="text"
              value={url}
              readOnly
              className="admin-input admin-uploader-url"
              onClick={(e) => (e.currentTarget as HTMLInputElement).select()}
            />
            <button type="button" className="admin-btn admin-btn-toggle" onClick={copy}>
              {copied ? "Copied" : "Copy URL"}
            </button>
          </>
        )}
      </div>
      {error && <p className="admin-error">{error}</p>}
      {url && (
        <p className="admin-uploader-tip">
          Markdown: <code>![alt](URL)</code> &nbsp;·&nbsp; HTML: <code>{'<img src="URL" alt="" />'}</code>
        </p>
      )}
    </div>
  );
}
