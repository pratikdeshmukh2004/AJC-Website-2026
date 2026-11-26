import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Layout for long-form legal copy (Terms of Use, Privacy Policy).
 *
 * Built from the Figma frames "Terms & Conditions" (2918:986) and
 * "Privacy Policy" (2993:14), drawn at 1920px wide:
 *   - paper background #f8f7f2 (white under rgba(227,225,205,0.26))
 *   - title: Cormorant 62px, line-height 95px, tracking -3.72px, taupe #7d7062
 *   - body: Helvetica 29px, tracking 0.58px, #8b7f73 at 79% opacity
 *   - one 1088px column, centred
 * Below md the page uses the 390px mobile frames (1 design px = var(--u)).
 * Sizes scale with the viewport (Figma px / 1920 = vw) and are clamped so
 * they stay readable on phones and stop at the design size on wide screens.
 *
 * Spacing mirrors the empty lines in the Figma text: one blank line between
 * paragraphs and under a heading, three blank lines before each new section.
 */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  // The two mobile frames differ: Terms has a two-line 40px title and a wider,
  // lower column; Privacy has a 20px one-line title. Told apart by title length.
  const longTitle = title.length > 20;
  return (
    <div className="@container relative min-h-screen bg-[#f8f7f2] [--u:calc(100cqw/390)]">
      <main
        className={cn(
          "font-helvetica-regular mx-auto w-full max-w-[1088px] pb-[calc(100*var(--u))] md:w-[56.67vw] md:px-0 md:pt-[clamp(9rem,23vw,447px)] md:pb-[clamp(6rem,10vw,200px)]",
          longTitle
            ? "pt-[calc(175*var(--u))] pr-[calc(47*var(--u))] pl-[calc(63*var(--u))]"
            : "pt-[calc(133*var(--u))] pr-[calc(36*var(--u))] pl-[calc(66*var(--u))]",
        )}
      >
        <h1
          className={cn(
            "font-cormorant text-taupe text-center tracking-[-0.06em] md:mx-0 md:text-left md:text-[clamp(2.25rem,3.23vw,62px)] md:leading-[1.53]",
            longTitle
              ? "ml-[calc(2*var(--u))] w-[calc(260*var(--u))] text-[calc(35*var(--u))] leading-[calc(40*var(--u))] md:w-auto"
              : "-mr-[calc(36*var(--u))] -ml-[calc(66*var(--u))] text-[calc(20*var(--u))] leading-[1.15]",
          )}
        >
          {title}
        </h1>

        {/* 1em = body size, so the rhythm below scales with the text. */}
        <div
          className={cn(
            "[&_a:hover]:text-taupe [&_strong]:font-helvetica text-[calc(12*var(--u))] leading-[1.1667] tracking-[0.02em] text-[#8b7f73]/79 md:mt-[clamp(3.5rem,8.3vw,160px)] md:text-[clamp(1rem,1.51vw,29px)] md:leading-[1.15] [&_a]:underline [&_a]:underline-offset-[0.15em] [&_p+p]:mt-[1.15em] [&_strong]:font-bold",
            longTitle ? "mt-[calc(78*var(--u))]" : "mt-[calc(54*var(--u))]",
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

/** A titled block of legal copy. `level={3}` for a sub-section (same look). */
export function LegalSection({
  heading,
  level = 2,
  children,
}: {
  heading: string;
  level?: 2 | 3;
  children: ReactNode;
}) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <section className="mt-[3.45em]">
      {/* Base styles make h2/h3 Cormorant; the design uses bold body type here. */}
      <Heading className="font-helvetica text-[1em] leading-[inherit] font-bold">{heading}</Heading>
      <div className="mt-[1.15em] [&_p+p]:mt-[1.15em] [&_p+ul]:mt-[1.15em] [&_ul+p]:mt-[1.15em]">
        {children}
      </div>
    </section>
  );
}

/** Link to the studio site, written out as in the copy. */
export function SiteLink() {
  return (
    <a href="https://www.apekshajain.in" target="_blank" rel="noopener noreferrer">
      www.apekshajain.in
    </a>
  );
}
