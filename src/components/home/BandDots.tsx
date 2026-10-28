"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * River-band stage interaction ("worlds within worlds") driven by scroll
 * progress through a STICKY-PINNED track (Option 2), now extended into an
 * 8-tile carousel. This one client component owns the whole stage interior:
 * the base band image, the 8 cross-fade tile layers, the headline, and the 8
 * marker dots that double as the carousel indicators. Keeping progress,
 * activation, the active slide index and the autoplay timer in a SINGLE
 * component is deliberate — the headline fade, the tile cross-fade and the dot
 * styling must all stay in lockstep with the one `progress` value, so there is
 * no second consumer to justify splitting them apart.
 *
 * STICKY-TRACK PIN MODEL (recorded per requirement):
 * The band image, this component and the headline live inside a 1920x1080
 * "stage" held by a `position: sticky; top: 0` wrapper inside a normal-flow
 * `<section data-band-track>` that is TALLER than the viewport (see page.tsx).
 * As the user scrolls through the track's extra height the stage stays PINNED
 * in the viewport while this effect reads the track's rect to derive progress
 * 0 → 1:
 *
 *   rect     = [data-band-track].getBoundingClientRect()
 *   pinnable = rect.height - window.innerHeight   // scroll travel while pinned
 *   scrolled = -rect.top                          // 0 when track top hits top
 *   progress = clamp01(scrolled / pinnable)
 *
 * progress 0  → dots scattered (track top at/below viewport top, band just
 *               reached the top); intro 3.png shown, headline visible.
 * progress 1  → dots fully lined into a horizontal row (track about to release
 *               the pin); normal scrolling then continues to the content below.
 * Scrolling back up reverses the interpolation (dots scatter, band re-pins).
 *
 * CAROUSEL ACTIVATION / DEACTIVATION (the state machine documented):
 * ----------------------------------------------------------------------------
 * `active` = progress has reached the lined-up end state (progress >= 0.999).
 *
 * ON ACTIVATE (progress reaches 1 → active flips true):
 *   - the "worlds within worlds" headline fades OUT (opacity → 0; never
 *     display:none, never a color/weight change, so the cream/semibold spec
 *     stays green when inactive at scroll top).
 *   - the base intro 3.png stays mounted as the cross-fade BASE layer; tile
 *     `index` (0-based → 3-1.png..3-8.png) fades IN over it (opacity 0 → 1).
 *   - that slide's caption (SLIDES[index]: title + description) fades IN on the
 *     left, level with the dot row, a beat after its tile, so two captions
 *     never overlap.
 *   - autoplay starts: every 3000ms index advances 0→1→…→7→0. Autoplay PAUSES
 *     while the band is hovered/focused and RESUMES on mouseleave/blur.
 *   - the dots become carousel indicators in their lined-up row (centered on
 *     the row): active dot FILLED solid white (slightly larger), the others
 *     hollow outline rings. Clicking / keyboard-activating a dot jumps to that
 *     slide and RESETS the 3s timer. cursor-pointer in this state.
 *
 * ON DEACTIVATE (scroll back up so progress < 1 → active false):
 *   - autoplay timer is cleared and `index` resets to 0.
 *   - every tile and caption fades to opacity 0 so the base intro 3.png shows
 *     through.
 *   - the headline fades back IN.
 *   - the dots return to their scroll-interpolated scatter (cursor-crosshair).
 *
 * `prefers-reduced-motion: reduce` → no scroll listeners, no autoplay timer;
 * the dots render statically LINED (progress = 1, active), the headline is
 * hidden, and tile 1 (3-1.png) and its caption are shown statically. Dots stay
 * clickable to swap the opaque tile and caption (the global reduced-motion CSS
 * neutralizes the transition so the swap is instant). This matches the "lined
 * up" end state.
 *
 * No scroll-jacking: no preventDefault, no wheel hijack, no overflow lock, no
 * scrollIntoView. The pin is pure CSS `sticky`; the scroll effect only READS
 * scroll position (rAF-throttled scroll + resize) and interpolates. The
 * autoplay uses a plain setInterval cleared on pause/hover/unmount/deactivate.
 * No new deps.
 *
 * Coordinates are Figma px expressed relative to the 1080-tall band STAGE
 * (original Figma top − band top 2397), converted with `--u` so they scale with
 * the viewport. The track is located via a `data-band-track` attribute.
 */

// Scattered positions: [left, top, diameter] in Figma px, STAGE-RELATIVE
// (original Figma top − 2397; lefts unchanged). 8th entry added for the 8th
// dot, placed in the empty upper-centre gap so it reads as "scattered".
const SCATTERED: [number, number, number][] = [
  [512.37, 96.0, 25.48], // 2493   - 2397
  [1029.0, 183.0, 27.13], // 2580   - 2397
  [1472.0, 169.0, 27.13], // 2566   - 2397
  [357.0, 495.54, 27.13], // 2892.54- 2397
  [1537.51, 533.36, 27.13], // 2930.36- 2397
  [565.81, 738.87, 26.31], // 3135.87- 2397
  [1246.49, 957.55, 26.31], // 3354.55- 2397
  [890.0, 360.0, 26.31], // 8th dot — upper-centre scatter gap
];

// Number of tiles / dots in the carousel.
const SLIDE_COUNT = SCATTERED.length; // 8

// Caption for each slide, index-aligned with the tile files (SLIDES[i] ↔
// 3-{i+1}.png): `title` is the place, `description` the country / continent
// shown under it. Keep exactly one entry per tile (SLIDE_COUNT).
const SLIDES: { title: string; description: string }[] = [
  { title: "", description: "" }, // 3-1.png (Taj Mahal)
  { title: "Bhutan", description: "Asia" }, // 3-2.png
  { title: "Ladakh", description: "India" }, // 3-3.png
  { title: "Punjab", description: "India" }, // 3-4.png
  { title: "Bengal", description: "India" }, // 3-5.png
  { title: "Delhi", description: "India" }, // 3-6.png
  { title: "Rajasthan", description: "India" }, // 3-7.png
  { title: "Assam", description: "India" }, // 3-8.png
];

// Lined-up row: evenly spaced across the band, centered vertically on the row
// and sitting just BELOW the "worlds within worlds" headline (headline
// stage-top ≈ 500, height ≈ 66), so the row clears the text instead of
// overlapping it.
const ROW_TOP = 575;
const ROW_GAP = 44; // centre-to-centre spacing, Figma px
const ROW_DIAMETER = 16;

// Fraction of the pinnable scroll distance over which the dots converge. The
// row reaches its finished state at this fraction and HOLDS for the remaining
// travel, so the completed line is readable for a beat before the pin releases.
const CONVERGE_FRACTION = 0.85;

// Autoplay cadence.
const AUTOPLAY_MS = 3000;

// Fade duration class for the tile cross-fade (~500ms) and headline fade.
const FADE = "transition-opacity duration-500";

// Caption (title + description) block: left-aligned near the stage's left edge
// (x ≈ 200, measured from the design reference) and vertically centered on the
// dot row, so it reads as a side label next to the indicators.
const CAPTION_LEFT = 200; // Figma px
const ROW_CENTER = ROW_TOP + ROW_DIAMETER / 2; // Figma px

// Caption fade. The outgoing caption leaves quickly; the incoming one waits for
// the tile cross-fade to be mostly done, so two place names never overlap. The
// global reduced-motion rule zeroes transition-duration but not the delay,
// hence motion-reduce:delay-0 (the swap stays instant).
const CAPTION_SHOWN = "opacity-100 duration-500 delay-300 motion-reduce:delay-0";
const CAPTION_HIDDEN = "opacity-0 duration-200";

// Figma px → canvas units.
const u = (px: number) => `calc(${px} * var(--u))`;

// Soft dark halo behind the cream caption text so it stays readable on the
// lighter paintings (a tight edge shadow plus a wide, faint glow).
const CAPTION_SHADOW = `0 ${u(1)} ${u(3)} rgba(0, 0, 0, 0.35), 0 0 ${u(22)} rgba(0, 0, 0, 0.5)`;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

type BandDotsProps = {
  /** Public base path for the about images, e.g. "/images/about". */
  imgBase: string;
  /** Tailwind classes for the band image box (base intro + tile layers). */
  bandClass: string;
  /** Tailwind classes for the headline paragraph. */
  headlineClass: string;
};

export function BandDots({ imgBase, bandClass, headlineClass }: BandDotsProps) {
  // Scroll progress 0 (scattered) → 1 (lined up in a row).
  const [progress, setProgress] = useState(0);
  // Active carousel slide (0-based). Single source of truth.
  const [index, setIndex] = useState(0);
  // Autoplay paused while the band is hovered/focused.
  const [paused, setPaused] = useState(false);
  // Bumped on manual select to reset the 3s autoplay window.
  const [resetKey, setResetKey] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const rafRef = useRef<number | null>(null);

  // Carousel is active once the dots have finished lining up.
  const active = progress >= 0.999;

  // --- Scroll progress wiring (unchanged pin model) -----------------------
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Reduced motion: render LINED (end state), attach no listeners. Set the
    // progress in a rAF (not synchronously in the effect body) so React doesn't
    // flag a cascading render; teardown cancels it if we unmount first.
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) {
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        setReduceMotion(true);
        setProgress(1);
      });
      return () => {
        if (rafRef.current != null) {
          window.cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      };
    }

    const track = document.querySelector<HTMLElement>("[data-band-track]");
    if (!track) return;

    const compute = () => {
      rafRef.current = null;
      const rect = track.getBoundingClientRect();
      const pinnable = rect.height - window.innerHeight;
      let p: number;
      if (pinnable <= 0) {
        // Track not taller than the viewport: snap to end once it tops out.
        p = rect.top <= 0 ? 1 : 0;
      } else {
        const scrolled = -rect.top;
        // Finish converging at CONVERGE_FRACTION of the travel; hold at 1 for
        // the remainder so the completed row rests before the pin releases.
        p = clamp01(scrolled / (pinnable * CONVERGE_FRACTION));
      }
      setProgress(p);
      // Deactivate teardown: whenever the carousel is not lined up, reset the
      // active slide to 0 so re-entry always starts from tile 1. Done here
      // inside the rAF callback (not a synchronous effect body) so it never
      // triggers a cascading render.
      if (p < 0.999) setIndex((i) => (i === 0 ? i : 0));
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(compute);
    };

    // Initial sync (rAF so the first layout is settled).
    rafRef.current = window.requestAnimationFrame(compute);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  // --- Autoplay timer. Runs only while active, not paused and motion is
  // allowed. Cleared on every dependency change (pause/hover/deactivate) and
  // on unmount. `resetKey` restarts the 3s window after a manual select. -----
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!active || paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDE_COUNT);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [active, paused, reduceMotion, resetKey]);

  // Manual dot select: jump to the slide and reset the autoplay window.
  const selectSlide = (i: number) => {
    setIndex(i);
    setResetKey((k) => k + 1);
  };

  // Centre the row horizontally: N dots, (N-1) gaps, stage is 1920 wide.
  const n = SLIDE_COUNT;
  const rowStart = (1920 - (n - 1) * ROW_GAP) / 2;

  return (
    // Single wrapper over the whole 1920x1080 stage. Carrying the hover/focus
    // handlers here (not on a separate overlay) means enter/leave fire for the
    // entire band region INCLUDING the dots, so moving the pointer onto a dot
    // never spuriously resumes autoplay. pointer-events toggles with `active`
    // so the dots/images below behave exactly as before while inactive.
    <div
      className="absolute inset-0"
      onMouseEnter={active ? () => setPaused(true) : undefined}
      onMouseLeave={active ? () => setPaused(false) : undefined}
      onFocusCapture={active ? () => setPaused(true) : undefined}
      onBlurCapture={active ? () => setPaused(false) : undefined}
    >
      {/* Base intro image — stays mounted as the cross-fade base layer. */}
      <div className={`absolute ${bandClass}`}>
        <Image
          src={`${imgBase}/3.png`}
          alt="River view of the Taj Mahal, aquatint"
          width={1920}
          height={1080}
          sizes="100vw"
        />
      </div>

      {/* Cross-fade tile stack (3-1.png..3-8.png). Only the active tile is
          opaque while the carousel is active; otherwise all fade out and the
          base intro shows through. pointer-events-none so dots stay clickable. */}
      {Array.from({ length: SLIDE_COUNT }, (_, i) => {
        const visible = active && index === i;
        return (
          <div
            key={i}
            aria-hidden={!visible}
            className={`absolute ${bandClass} ${FADE} pointer-events-none ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={`${imgBase}/3-${i + 1}.png`}
              alt={`Carousel tile ${i + 1}`}
              width={1920}
              height={1080}
              sizes="100vw"
            />
          </div>
        );
      })}

      {/* Slide captions (title + description), index-aligned with the tile
          stack above. A separate layer (not inside the tile) so the fade timing
          can differ from the tile's; same `visible` rule as the tile. Hidden
          captions are aria-hidden like their tiles. pointer-events-none so the
          dots stay clickable. */}
      {SLIDES.map(({ title, description }, i) => {
        const visible = active && index === i;
        return (
          <div
            key={i}
            aria-hidden={!visible}
            className={`pointer-events-none absolute -translate-y-1/2 text-left transition-opacity ${
              visible ? CAPTION_SHOWN : CAPTION_HIDDEN
            }`}
            style={{ left: u(CAPTION_LEFT), top: u(ROW_CENTER), textShadow: CAPTION_SHADOW }}
          >
            <p className="font-cormorant text-[length:calc(55*var(--u))] leading-[calc(60*var(--u))] font-semibold tracking-[calc(1.1*var(--u))] text-[#f8f7f2]">
              {title}
            </p>
            <p className="font-helvetica mt-[calc(6*var(--u))] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] text-[#f8f7f2]">
              {description}
            </p>
          </div>
        );
      })}

      {/* Band headline — fades out and hides once the carousel activates. The
          cream color / semibold weight are untouched (opacity-only fade). */}
      <p
        className={`absolute ${headlineClass} ${FADE} ${
          active ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={active}
      >
        worlds within worlds
      </p>

      {/* Marker dots / carousel indicators. The band stage below wraps the
          hover/focus pause handlers around the whole stage via the parent. */}
      {SCATTERED.map(([sx, sy, sSize], i) => {
        const rowLeft = rowStart + i * ROW_GAP - ROW_DIAMETER / 2;
        const left = lerp(sx, rowLeft, progress);
        const top = lerp(sy, ROW_TOP, progress);
        const size = lerp(sSize, ROW_DIAMETER, progress);
        const isActiveDot = active && index === i;

        if (active) {
          // Carousel indicator: filled solid white when active, hollow ring
          // otherwise. cursor-pointer since these are real controls now.
          return (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={isActiveDot ? "true" : undefined}
              onClick={() => selectSlide(i)}
              className={`absolute cursor-pointer rounded-full transition-[transform,background-color] duration-200 ${
                isActiveDot
                  ? "scale-[1.15] border border-white bg-white"
                  : "border border-white bg-transparent"
              }`}
              style={{ left: u(left), top: u(top), width: u(size), height: u(size) }}
            />
          );
        }

        // Scatter / scroll phase: original filled look, cursor-crosshair.
        return (
          <button
            key={i}
            type="button"
            aria-label={`Marker ${i + 1}`}
            className="absolute cursor-crosshair rounded-full bg-white"
            style={{ left: u(left), top: u(top), width: u(size), height: u(size) }}
          />
        );
      })}
    </div>
  );
}
