"use client";

import { useEffect, useRef, useState } from "react";

type YearRow = { year: number; count: number; cumulative: number };

/* Steam game releases per year, source: SteamDB / public ledger */
const DATA: YearRow[] = [
  { year: 2006, count:    70, cumulative:     70 },
  { year: 2007, count:   135, cumulative:    205 },
  { year: 2008, count:   242, cumulative:    447 },
  { year: 2009, count:   380, cumulative:    827 },
  { year: 2010, count:   275, cumulative:   1102 },
  { year: 2011, count:   281, cumulative:   1383 },
  { year: 2012, count:   303, cumulative:   1686 },
  { year: 2013, count:   436, cumulative:   2122 },
  { year: 2014, count:  1713, cumulative:   3835 },
  { year: 2015, count:  2821, cumulative:   6656 },
  { year: 2016, count:  4651, cumulative:  11307 },
  { year: 2017, count:  6929, cumulative:  18236 },
  { year: 2018, count:  8868, cumulative:  27104 },
  { year: 2019, count:  8068, cumulative:  35172 },
  { year: 2020, count:  9645, cumulative:  44817 },
  { year: 2021, count: 11227, cumulative:  56044 },
  { year: 2022, count: 12264, cumulative:  68308 },
  { year: 2023, count: 14049, cumulative:  82357 },
  { year: 2024, count: 18541, cumulative: 100898 },
  { year: 2025, count: 21489, cumulative: 122387 },
  { year: 2026, count:  8886, cumulative: 131273 },
];

type Props = {
  /** Total animation duration in ms. Default 3500. */
  duration?: number;
};

const MAX_COUNT = Math.max(...DATA.map((d) => d.count));

export default function SteamGrowthCounter({ duration = 3500 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0); // 0..1, drives the initial animation
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion: jump to the end immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let raf = 0;
    let started = false;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const tick = () => {
            const elapsed = performance.now() - start;
            const t = Math.min(elapsed / duration, 1);
            // Ease-out cubic so the animation slows toward the present.
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(eased);
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(node);
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, [duration]);

  // Animation index based on progress.
  const animIdx = Math.min(DATA.length - 1, Math.floor(progress * DATA.length));

  // If the user is hovering a bar, that takes precedence over the animation.
  const hoveredIdx =
    hoveredYear !== null ? DATA.findIndex((d) => d.year === hoveredYear) : -1;
  const activeIdx = hoveredIdx >= 0 ? hoveredIdx : animIdx;
  const displayed = DATA[activeIdx];

  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <div ref={ref} className="sg-counter">
      <div className="sg-row">
        <div className="sg-figure">
          <div className="sg-figure-label">Year</div>
          <div className="sg-figure-value sg-year">{displayed.year}</div>
        </div>
        <div className="sg-figure">
          <div className="sg-figure-label">Games released that year</div>
          <div className="sg-figure-value sg-count">{fmt(displayed.count)}</div>
        </div>
        <div className="sg-figure">
          <div className="sg-figure-label">Cumulative on Steam</div>
          <div className="sg-figure-value sg-cum">{fmt(displayed.cumulative)}</div>
        </div>
      </div>

      {/* Bar chart: hover any bar to surface that year's data above */}
      <div
        className={`sg-chart ${hoveredYear !== null ? "hovering" : ""}`}
        onMouseLeave={() => setHoveredYear(null)}
        role="group"
        aria-label="Steam game releases by year, 2006 to 2026"
      >
        {DATA.map((d, i) => {
          const heightPct = Math.max(2, Math.round((d.count / MAX_COUNT) * 100));
          const reached = i <= animIdx;
          const isActive = i === activeIdx;
          return (
            <button
              key={d.year}
              type="button"
              className={`sg-bar ${reached ? "reached" : ""} ${isActive ? "active" : ""}`}
              onMouseEnter={() => setHoveredYear(d.year)}
              onFocus={() => setHoveredYear(d.year)}
              onBlur={() => setHoveredYear(null)}
              aria-label={`${d.year}: ${fmt(d.count)} games released, ${fmt(d.cumulative)} cumulative`}
              style={{ height: `${heightPct}%` }}
            >
              <span className="sg-bar-tooltip" aria-hidden="true">
                <span className="sg-tt-year">{d.year}</span>
                <span className="sg-tt-count">{fmt(d.count)} games</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="sg-chart-axis" aria-hidden="true">
        <span>{DATA[0].year}</span>
        <span>{DATA[Math.floor(DATA.length / 2)].year}</span>
        <span>{DATA[DATA.length - 1].year}</span>
      </div>
      <div className="sg-chart-hint">Hover any bar to see that year</div>
    </div>
  );
}
