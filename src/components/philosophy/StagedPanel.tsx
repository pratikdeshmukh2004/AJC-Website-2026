"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { cn, fig, u } from "@/lib/utils";

/** `mobile` is the box image's left edge and width in the 390px frame (design px). */
export type Stage = {
  image: StaticImageData;
  content: ReactNode;
  mobile: { x: number; w: number };
};

/**
 * Scroll progress through a tall track picks the stage: the track's extra
 * height past one viewport is split evenly between the stages. Shared by the
 * desktop and phone panels so both step at the same points.
 */
function useScrollStage(n: number) {
  const trackRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      // The other breakpoint's panel is display:none; leave it idle.
      if (r.height === 0) return;
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

  return { trackRef, stage };
}

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
  const n = stages.length;
  const { trackRef, stage } = useScrollStage(n);

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

/**
 * Phone version of the same pinned panel (Figma PHILOSOPHY mobile frame): the
 * box, copy and progress dots stacked in one column, stepping through the
 * stages as you scroll exactly like desktop. Needs `--u` from the page. The
 * copy is the same content as the desktop panel; the overrides below restyle
 * it to the mobile sizes.
 */
export function StagedPanelMobile({ stages }: { stages: Stage[] }) {
  const n = stages.length;
  const { trackRef, stage } = useScrollStage(n);

  return (
    <section
      ref={trackRef}
      data-staged-panel
      className="relative"
      style={{ height: `calc(100svh + ${n - 1} * 70svh)` }}
    >
      <div className="sr-only">
        {stages.map((s, i) => (
          <div key={i}>{s.content}</div>
        ))}
      </div>

      <div
        aria-hidden
        data-stage={stage + 1}
        className="sticky top-0 flex h-svh flex-col justify-center pl-[calc(61*var(--u))]"
      >
        {/* Boxes share a baseline so the lid opens upward between stages. */}
        <div className="grid items-end">
          {stages.map((s, i) => (
            <Image
              key={s.image.src}
              src={s.image}
              alt=""
              priority={i === 0}
              className={cn(
                "ease-editorial col-start-1 row-start-1 h-auto max-w-none transition-opacity duration-700",
                i === stage ? "opacity-100" : "opacity-0",
              )}
              style={{ width: u(s.mobile.w), marginLeft: u(s.mobile.x - 61) }}
            />
          ))}
        </div>
        <div
          className="grid [&_h2]:text-[length:calc(35.3*var(--u))]! [&_h2]:leading-[calc(37*var(--u))]! [&_h2]:whitespace-nowrap [&_h2+p]:mt-[calc(18*var(--u))]! [&_h2+p]:text-[length:calc(13.4*var(--u))]! [&_h2+p]:leading-[calc(17*var(--u))]! [&_p+p]:mt-[calc(14*var(--u))]! [&>div>div]:text-[length:calc(12*var(--u))]! [&>div>div]:leading-[calc(14*var(--u))]! [&>div>div]:tracking-[0.02em]!"
          style={{ marginTop: u(40), width: u(270) }}
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
        <div className="flex" style={{ marginTop: u(30), gap: u(24) }}>
          {stages.map((_, d) => (
            <span
              key={d}
              data-dot={d <= stage ? "filled" : "empty"}
              className={cn(
                "rounded-full border border-[#7d7062] transition-colors duration-500",
                d <= stage ? "bg-[#7d7062]" : "bg-transparent",
              )}
              style={{ width: u(12), height: u(12) }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
