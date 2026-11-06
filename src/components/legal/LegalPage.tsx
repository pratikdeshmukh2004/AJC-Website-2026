import type { ReactNode } from "react";
import { HeroHeader } from "@/components/home/HeroHeader";

/**
 * Layout for long-form legal copy (Terms of Use, Privacy Policy).
 *
 * Built from the Figma frames "Terms & Conditions" (2918:986) and
 * "Privacy Policy" (2993:14), drawn at 1920px wide:
 *   - paper background #f8f7f2 (white under rgba(227,225,205,0.26))
 *   - title: Cormorant 62px, line-height 95px, tracking -3.72px, taupe #7d7062
 *   - body: Helvetica 29px, tracking 0.58px, #8b7f73 at 79% opacity
 *   - one 1088px column, centred
 * Sizes scale with the viewport (Figma px / 1920 = vw) and are clamped so
 * they stay readable on phones and stop at the design size on wide screens.
 *
 * Spacing mirrors the empty lines in the Figma text: one blank line between
 * paragraphs and under a heading, three blank lines before each new section.
 */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#f8f7f2]">
      <HeroHeader tone="dark" />

      <main className="font-helvetica-regular mx-auto w-full max-w-[1088px] px-6 pt-[clamp(9rem,23vw,447px)] pb-[clamp(6rem,10vw,200px)] md:w-[56.67vw] md:px-0">
        <h1 className="font-cormorant text-taupe text-[clamp(2.25rem,3.23vw,62px)] leading-[1.15] tracking-[-0.06em] md:leading-[1.53]">
          {title}
        </h1>

        {/* 1em = body size, so the rhythm below scales with the text. */}
        <div className="[&_a:hover]:text-taupe [&_strong]:font-helvetica mt-[clamp(3.5rem,8.3vw,160px)] text-[clamp(1rem,1.51vw,29px)] leading-[1.15] tracking-[0.02em] text-[#8b7f73]/79 [&_a]:underline [&_a]:underline-offset-[0.15em] [&_p+p]:mt-[1.15em] [&_strong]:font-bold">
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
