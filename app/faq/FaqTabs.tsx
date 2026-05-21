"use client";

import { useState, type ReactNode } from "react";

type Props = {
  streamersContent: ReactNode;
  studiosContent: ReactNode;
};

export default function FaqTabs({ streamersContent, studiosContent }: Props) {
  const [active, setActive] = useState<"streamers" | "studios">("streamers");

  return (
    <>
      <div className="fq-toggle-row" role="tablist" aria-label="FAQ audience">
        <div className="fq-toggle">
          <button
            role="tab"
            type="button"
            aria-selected={active === "streamers"}
            className={`fq-toggle-btn ${active === "streamers" ? "active" : ""}`}
            onClick={() => setActive("streamers")}
          >
            Streamers
          </button>
          <button
            role="tab"
            type="button"
            aria-selected={active === "studios"}
            className={`fq-toggle-btn studios ${active === "studios" ? "active" : ""}`}
            onClick={() => setActive("studios")}
          >
            Studios
          </button>
        </div>
      </div>

      <div className="fq-toggle-content" key={active}>
        {active === "streamers" ? streamersContent : studiosContent}
      </div>
    </>
  );
}
