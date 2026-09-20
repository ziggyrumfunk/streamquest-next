"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { platforms, fmtNum, fmtPct } from "@/data/shortform";
import PlatformIcon from "@/app/components/shortform/PlatformIcon";

/* Per-platform qualification gates, plus the analytics creators are asked
   to send at Day 7 and Day 30. One tab per platform, arrow keys move
   between them. */
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
    <div className="sfg-platforms">
      <div className="sfg-tabs" role="tablist" aria-label="Platform" onKeyDown={onKeyDown}>
        {platforms.map((x, i) => (
          <button
            key={x.key}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`sfg-tab-${x.key}`}
            aria-selected={x.key === active}
            aria-controls="sfg-tabpanel"
            tabIndex={x.key === active ? 0 : -1}
            className={`sfg-tab${x.key === active ? " is-active" : ""}`}
            onClick={() => setActive(x.key)}
          >
            <PlatformIcon name={x.key} size={18} />
            {x.label}
          </button>
        ))}
      </div>

      <div className="sfg-panel" key={p.key} role="tabpanel" id="sfg-tabpanel" aria-labelledby={`sfg-tab-${p.key}`}>
        <h3 className="sfg-panel-title">
          <PlatformIcon name={p.key} size={22} /> {p.label} creator tiers
        </h3>
        <div className="sfg-table-wrap">
          <table className="sfg-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>{p.audienceLabel}</th>
                <th>{p.viewsLabel}</th>
                <th>Median like rate</th>
                <th>Genuine commenters</th>
              </tr>
            </thead>
            <tbody>
              {p.gates.map((g) => (
                <tr key={g.tier}>
                  <td>
                    <span className={`sfg-tier is-${g.tier.toLowerCase()}`}>{g.tier}</span>
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
        <p className="sfg-panel-note">{p.note}</p>

        {p.example && (
          <div className="sfg-example">
            <span className="sfg-box-tag">Example</span>
            <p>{p.example.intro}</p>
            <ul>
              {p.example.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <p className="sfg-example-result">{p.example.result}</p>
            <p>{p.example.verdict}</p>
          </div>
        )}

        <div className={`sfg-panel-grid${p.extra ? "" : " is-single"}`}>
          <div className="sfg-panel-box">
            <span className="sfg-box-tag">Analytics to send</span>
            <p className="sfg-box-lead">Around Day 7 and Day 30</p>
            <p>{p.analytics}</p>
          </div>
          {p.extra && (
            <div className="sfg-panel-box">
              <span className="sfg-box-tag">Good to know</span>
              <p>{p.extra}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
