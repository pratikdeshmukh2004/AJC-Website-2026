"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { cn, fig } from "@/lib/utils";

export type Stage = { image: StaticImageData; content: ReactNode };

/**
 * One pinned panel that steps through stages as you scroll (Figma comment on
 * PHILOSOPHY: "As you scroll, the box opens and the text changes here with the
 * dots getting filled as we move ahead in stages. This will be one panel.").
 *
 * A tall track scrolls past a sticky, full-height panel; scroll progress
 * through the track picks the stage. The animated panel is decorative
 * (aria-hidden): screen readers get every stage's copy, in order, from a
 * visually hidden copy instead.
 *
 * Image widths: the exports are 2x, so they show at half their pixel width.
 */
export function StagedPanel({ stages }: { stages: Stage[] }) {
  const trackRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  const n = stages.length;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const distance = r.height - window.innerHeight;
      const p = distance > 0 ? Math.min(1, Math.max(0, -r.top / distance)) : 0;
      setStage(Math.min(n - 1, Math.floor(p * n)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [n]);

  return (
    <section
      ref={trackRef}
      data-staged-panel
      className="relative"
      // One viewport for the pinned panel, plus ~70svh of scroll per extra stage.
      style={{ height: `calc(100svh + ${n - 1} * 70svh)` }}
    >
      {/* Screen readers: every stage, in reading order. */}
      <div className="sr-only">
        {stages.map((s, i) => (
          <div key={i}>{s.content}</div>
        ))}
      </div>

      <div
        aria-hidden
        data-stage={stage + 1}
        className="sticky top-0 flex h-svh flex-col items-center justify-center gap-10 px-6 md:grid md:grid-cols-[1090fr_830fr] md:items-center md:gap-0 md:px-0"
      >
        {/* Box: centred at x458 of the 1920 frame */}
        <div
          className="grid w-full place-items-center md:h-full"
          style={{ paddingRight: fig(174, "0px") }}
        >
          {stages.map((s, i) => (
            <Image
              key={s.image.src}
              src={s.image}
              alt=""
              priority={i === 0}
              className={cn(
                "ease-editorial col-start-1 row-start-1 h-auto max-w-[70vw] transition-opacity duration-700",
                i === stage ? "opacity-100" : "opacity-0",
              )}
              style={{ width: fig(s.image.width / 2, "11rem") }}
            />
          ))}
        </div>

        {/* Copy + progress dots */}
        <div className="w-full max-w-md md:max-w-none">
          <div
            className="grid"
            style={{ maxWidth: `min(100%, ${fig(540, "20rem")})`, minHeight: fig(250, "12rem") }}
          >
            {stages.map((s, i) => (
              <div
                key={i}
                className={cn(
                  "ease-editorial col-start-1 row-start-1 transition-[opacity,translate] duration-700",
                  i === stage ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
              >
                {s.content}
              </div>
            ))}
          </div>
          <div
            className="flex"
            style={{
              marginTop: fig(80, "1.5rem"),
              paddingLeft: fig(27, "0px"),
              gap: fig(48, "1.5rem"),
            }}
          >
            {stages.map((_, i) => (
              <span
                key={i}
                data-dot={i < stage + 1 ? "filled" : "empty"}
                className={cn(
                  "rounded-full border-[1.5px] border-[#7d7062] transition-colors duration-500",
                  i < stage + 1 ? "bg-[#7d7062]" : "bg-transparent",
                )}
                style={{ width: fig(20, "0.75rem"), height: fig(20, "0.75rem") }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
