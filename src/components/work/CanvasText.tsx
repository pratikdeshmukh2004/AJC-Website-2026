import type { ReactNode } from "react";
import { at, cn } from "@/lib/utils";

/*
  Text pieces shared by the responsive case-study canvases (Balti Kitchen and
  Lahé Life use the same markup locally). From xl up each sits at its Figma
  coordinate via `at(x, y, w)` + `xl:left-(--x) xl:top-(--y)`; below xl it
  stacks in normal flow. The page root must define `--u` (1 Figma px).
*/

/** Section title (Cormorant 97 / 76, tracking -6%) at a Figma coordinate. */
export function CanvasHeading({
  children,
  x,
  y,
  as: Tag = "h2",
  light = false,
}: {
  children: ReactNode;
  x: number;
  y: number;
  as?: "h1" | "h2";
  /** White text, for headings set over a photo. */
  light?: boolean;
}) {
  return (
    <Tag
      className={cn(
        "font-cormorant mt-10 px-6 text-5xl leading-none tracking-[-0.06em] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:p-0 xl:text-[length:calc(97*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-5.82*var(--u))] xl:whitespace-nowrap",
        light ? "text-white" : "text-taupe",
      )}
      style={at(x, y)}
    >
      {children}
    </Tag>
  );
}

/**
 * Body copy block (Helvetica 20 / 23) at a Figma coordinate. Figma uses two
 * body colours across these pages: sage (#9b9484) and a warmer #9b8866.
 */
export function CanvasCopy({
  children,
  x,
  y,
  w,
  warm = false,
}: {
  children: ReactNode;
  x: number;
  y: number;
  w: number;
  warm?: boolean;
}) {
  return (
    <div
      className={cn(
        "font-helvetica-regular px-6 text-base leading-[1.45] tracking-[0.02em] xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:px-0 xl:text-[length:calc(20*var(--u))] xl:leading-[1.15] xl:tracking-[calc(0.4*var(--u))] [&_p+p]:mt-[1.15em]",
        warm ? "text-[#9b8866]" : "text-sage",
      )}
      style={at(x, y, w)}
    >
      {children}
    </div>
  );
}

/** One "ROLE  Name" pair in a Team block. `w` is the role column width. */
export function CanvasCredit({
  role,
  name,
  x,
  y,
  w,
}: {
  role: ReactNode;
  name: string;
  x: number;
  y: number;
  w: number;
}) {
  return (
    <p
      className="text-sage text-sm tracking-[0.02em] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))] xl:whitespace-nowrap"
      style={at(x, y, w)}
    >
      <span className="font-helvetica mr-3 font-bold xl:mr-0 xl:inline-block xl:w-(--w) xl:align-top">
        {role}
      </span>
      <span className="font-helvetica-regular xl:align-top">{name}</span>
    </p>
  );
}
