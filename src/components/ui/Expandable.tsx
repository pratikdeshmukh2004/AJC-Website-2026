"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Bottom edge of every rendered line in `root`, in px from its top, including the
 * half-leading below the glyphs, so the box can stop exactly between two lines.
 */
function lineBottoms(root: HTMLElement) {
  const top = root.getBoundingClientRect().top;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  const bottoms: number[] = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!node.textContent?.trim() || !node.parentElement) continue;
    const leading = parseFloat(getComputedStyle(node.parentElement).lineHeight);
    range.selectNodeContents(node);
    for (const rect of range.getClientRects()) {
      if (rect.height === 0) continue;
      const lineHeight = Number.isNaN(leading) ? rect.height * 1.2 : leading;
      bottoms.push(rect.bottom - top + (lineHeight - rect.height) / 2);
    }
  }
  return bottoms;
}

/**
 * The shared "Read more" body. Collapsed, it shows the first lines of the copy,
 * always stopping on a whole line, with the last line and a half fading out into
 * the page so it reads as "there is more". Expanded, the box slides open to the
 * full copy and the fade runs off the bottom with it; collapsing reverses both.
 *
 * The fade is a mask on the text itself (no overlay), so it works on any
 * background and never smears or doubles the letters.
 *
 * The full copy is always in the page (screen readers read all of it). The
 * collapsed height is the most whole lines that fit in a limit, which is either
 *  - the height of `collapsed`, a preview that wraps like the start of `children`,
 *  - the length in `collapsedHeight` (any CSS length), or
 *  - the height of `children(true)` when `children` is a function.
 * With none of these the whole copy shows and only its fade changes.
 * Until it has measured, the preview is drawn in the flow, so the server HTML and
 * the first paint already look collapsed.
 *
 * Put the typography (font, size, leading, colour) on `className` or a parent.
 * The caller owns `expanded` and the toggle button, and passes `id` for the
 * button's `aria-controls`.
 */
export function Expandable({
  expanded,
  collapsed,
  collapsedHeight,
  children,
  id,
  className,
  style,
  innerClassName,
  fade = true,
}: {
  expanded: boolean;
  /** A preview that wraps like the start of `children`; its height is the limit. */
  collapsed?: ReactNode;
  /** The collapsed limit as a CSS length, instead of a preview. */
  collapsedHeight?: string;
  /**
   * The full copy. A function is called with `true` for the preview and `false`
   * for the full copy, so one piece of text can serve both (clamp it when `true`).
   */
  children: ReactNode | ((preview: boolean) => ReactNode);
  id?: string;
  className?: string;
  style?: CSSProperties;
  /** Classes for the wrapper around `children` (for example bottom padding). */
  innerClassName?: string;
  /** Fade the last lines while collapsed. Off for designs that fade the copy themselves. */
  fade?: boolean;
}) {
  const limitRef = useRef<HTMLDivElement>(null);
  const fullRef = useRef<HTMLDivElement>(null);
  const [limitPx, setLimitPx] = useState<number | null>(null);
  const [fullPx, setFullPx] = useState<number | null>(null);
  const [bottoms, setBottoms] = useState<number[]>([]);

  const render = typeof children === "function";
  const full = render ? children(false) : children;
  const preview = collapsed ?? (render ? children(true) : undefined);
  // No limit at all: the whole copy shows, and only the fade marks that it opens.
  const noLimit = preview === undefined && collapsedHeight === undefined;
  const ready = noLimit || limitPx !== null;
  // With a fixed limit (or none) the full copy can be drawn from the first paint.
  const showFull = ready || collapsedHeight !== undefined;

  useLayoutEffect(() => {
    const watch = (el: HTMLElement | null, read: (el: HTMLElement) => void) => {
      if (!el) return undefined;
      const observer = new ResizeObserver(() => read(el));
      observer.observe(el);
      read(el);
      return () => observer.disconnect();
    };
    const stopLimit = watch(noLimit ? null : limitRef.current, (el) =>
      setLimitPx(el.getBoundingClientRect().height),
    );
    const stopFull = watch(showFull ? fullRef.current : null, (el) => {
      setFullPx(el.getBoundingClientRect().height);
      setBottoms(lineBottoms(el));
    });
    return () => {
      stopLimit?.();
      stopFull?.();
    };
  }, [showFull, noLimit]);

  // The most whole lines that fit in the limit (1.5px of slack for rounding).
  const limit = noLimit ? fullPx : limitPx;
  const fitting = limit === null ? [] : bottoms.filter((b) => b <= limit + 1.5);
  const collapsedPx = fitting.length ? Math.max(...fitting) : limit;
  // Nothing is hidden (the copy already fits): no fade.
  const fits = !noLimit && fullPx !== null && collapsedPx !== null && fullPx <= collapsedPx + 1;
  const height = expanded ? fullPx : collapsedPx;
  // Collapsed, the space the snapping took off stays below the text, so what
  // follows (the toggle) sits where the design puts it.
  const rest = !expanded && limit !== null && collapsedPx !== null ? limit - collapsedPx : 0;

  return (
    <div
      className={cn(
        "relative transition-[padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        className,
      )}
      style={{ ...style, paddingBottom: rest > 0 ? `${rest}px` : style?.paddingBottom }}
    >
      <div
        id={id}
        className={cn(
          // --fade is registered in globals.css, so it animates with the height.
          "relative overflow-hidden [mask-image:linear-gradient(to_bottom,#000_calc(100%-var(--fade)),rgb(0_0_0/0.08))] transition-[height,--fade] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          fade && !expanded && !fits ? "[--fade:1.6lh]" : "[--fade:0px]",
        )}
        style={{ height: height === null ? collapsedHeight : `${height}px` }}
      >
        {showFull ? (
          <div ref={fullRef} className={cn("flow-root", innerClassName)}>
            {full}
          </div>
        ) : null}
        {/* The limit: the preview (drawn in the flow until measured), or a box of collapsedHeight. */}
        {noLimit ? null : (
          <div
            ref={limitRef}
            aria-hidden={ready ? true : undefined}
            className={cn(
              "flow-root",
              ready && "pointer-events-none invisible absolute inset-x-0 top-0",
            )}
            style={collapsedHeight === undefined ? undefined : { height: collapsedHeight }}
          >
            {collapsedHeight === undefined ? preview : null}
          </div>
        )}
      </div>
    </div>
  );
}
