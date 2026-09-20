"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { platforms, fmtNum, fmtPct } from "./platformData";

/* Per-platform qualification gates, mission specifics and the analytics
   creators are asked to send at Day 7 and Day 30. One tab per platform,
   arrow keys move between them. */
export default function PlatformTabs() {
  const [active, setActive] = useState(platforms[0].key);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = platforms.find((x) => x.key === active) ?? platforms[0];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = platforms.findIndex((x) => x.key === active);
    const next = (i + (e.key === "ArrowRight" ? 1 : platforms.length - 1)) % platforms.length;
    setActive(platforms[next].key);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="lq-platforms">
      <div className="lq-tabs" role="tablist" aria-label="Platform" onKeyDown={onKeyDown}>
        {platforms.map((x, i) => (
          <button
            key={x.key}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`lq-tab-${x.key}`}
            aria-selected={x.key === active}
            aria-controls="lq-tabpanel"
            tabIndex={x.key === active ? 0 : -1}
            className={`lq-tab${x.key === active ? " is-active" : ""}`}
            onClick={() => setActive(x.key)}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="lq-panel" key={p.key} role="tabpanel" id="lq-tabpanel" aria-labelledby={`lq-tab-${p.key}`}>
        <h3 className="lq-panel-title">{p.label} creator tiers</h3>
        <div className="lq-table-wrap">
          <table className="lq-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>{p.audienceLabel}</th>
                <th>{p.viewsLabel}</th>
                <th>Median like rate</th>
                <th>Genuine comments</th>
              </tr>
            </thead>
            <tbody>
              {p.gates.map((g) => (
                <tr key={g.tier}>
                  <td>
                    <span className={`lq-tier is-${g.tier.toLowerCase()}`}>{g.tier}</span>
                  </td>
                  <td>{fmtNum(g.audience)}+</td>
                  <td className="is-num">{g.viewsLabel}</td>
                  <td>{fmtPct(g.likeRate)}</td>
                  <td>{g.comments}+</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="lq-panel-note">{p.note}</p>

        {p.example && (
          <div className="lq-example">
            <span className="lq-example-tag">Example</span>
            <p>If your recent TikToks normally receive:</p>
            <ul>
              {p.example.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <p className="lq-example-result">{p.example.result}</p>
            <p>{p.example.verdict}</p>
          </div>
        )}

        <div className="lq-panel-grid">
          <div className="lq-panel-box">
            <span className="lq-box-tag">{p.label} mission</span>
            <p className="lq-box-format">{p.format}</p>
            <p>{p.mission}</p>
            {p.extra && <p className="lq-box-extra">{p.extra}</p>}
          </div>
          <div className="lq-panel-box">
            <span className="lq-box-tag">Analytics to send</span>
            <p className="lq-box-format">Around Day 7 and Day 30</p>
            <p>{p.analytics}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
