"use client";

import { useState, type ReactNode } from "react";

type Props = {
  creatorsContent: ReactNode;
  studiosContent: ReactNode;
};

export default function TestimonialsToggle({
  creatorsContent,
  studiosContent,
}: Props) {
  const [active, setActive] = useState<"creators" | "studios">("creators");

  return (
    <>
      <div className="tt-toggle-row" role="tablist" aria-label="Testimonial audience">
        <div className="tt-toggle">
          <button
            role="tab"
            type="button"
            aria-selected={active === "creators"}
            className={`tt-toggle-btn ${active === "creators" ? "active" : ""}`}
            onClick={() => setActive("creators")}
          >
            Creators
          </button>
          <button
            role="tab"
            type="button"
            aria-selected={active === "studios"}
            className={`tt-toggle-btn studios ${active === "studios" ? "active" : ""}`}
            onClick={() => setActive("studios")}
          >
            Studios
          </button>
        </div>
      </div>

      <div className="tt-toggle-content" key={active}>
        {active === "creators" ? creatorsContent : studiosContent}
      </div>
    </>
  );
}
