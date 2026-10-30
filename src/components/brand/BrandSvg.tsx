import type { ReactNode, SVGProps } from "react";

/** Props shared by every brand SVG component (logo, wordmark, …). */
export type BrandSvgProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /**
   * Fill colour. Defaults to `currentColor`, so the mark follows the text
   * colour (`className="text-white"`, `hover:text-taupe`, …). Pass any CSS
   * colour here to set it directly instead.
   */
  color?: string;
  /** Accessible name. Omit for a decorative mark (e.g. inside a labelled link). */
  title?: string;
};

/**
 * Shared <svg> shell for brand marks: single-colour fill, accessible name or
 * aria-hidden, and intrinsic sizing from the viewBox (set a height *or* width
 * in CSS and the other side keeps the aspect ratio).
 */
export function BrandSvg({
  viewBox,
  color = "currentColor",
  title,
  style,
  children,
  ...props
}: BrandSvgProps & { viewBox: string; children: ReactNode }) {
  const [, , w, h] = viewBox.split(" ");
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill={color}
      // No width/height attributes: size with one CSS dimension (h-5 / w-40)
      // and the other follows this ratio.
      style={{ aspectRatio: `${w} / ${h}`, ...style }}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}
