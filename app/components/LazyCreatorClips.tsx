"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const CreatorClips = dynamic(() => import("./CreatorClips"), { ssr: false });

type Props = React.ComponentProps<typeof CreatorClips>;

/**
 * Mounts <CreatorClips> only when its placeholder scrolls into view.
 * Saves ~300-600ms of TBT from video metadata fetches on initial paint.
 */
export default function LazyCreatorClips(props: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <div ref={ref}>
      {visible ? <CreatorClips {...props} /> : <div style={{ minHeight: 400 }} aria-hidden />}
    </div>
  );
}
