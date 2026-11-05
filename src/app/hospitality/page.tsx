import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { AjcLogo, ApekshaJainWordmark, ScriptCycle } from "@/components/brand";
import { HeroHeader } from "@/components/home/HeroHeader";
import { EnquiryForm } from "@/components/hospitality/EnquiryForm";
import { ProcessStage } from "@/components/hospitality/ProcessStage";
import { WhatWeDo } from "@/components/hospitality/WhatWeDo";
import { assetPath, at, cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Hospitality",
  description:
    "AJC Hospitality is a consultancy and advisory for small luxury hotels across India, Asia and Europe, shaping the narrative, identity and guest experience of new launches and re-brands.",
};

// String srcs are not basePath-prefixed by next/image, so prefix them here
// (required on GitHub Pages, which serves the site under a subpath).
const IMG = assetPath("/images/hospitality");

/*
  Figma: "AJC Web Page" → frame "AJC Hospitality" (node 2998:204), 1920 x 9134.
  Ticket: AJC-10.

  xl and up: the frame as a scaled canvas, like the About page. `--u` = 1 Figma
  px = 100cqw / 1920, and elements sit at their Figma coordinates via inline
  Tailwind (`xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y)`, plus `xl:w-(--w)`)
  reading the CSS variables set by `at(x, y, w)` from @/lib/utils. Container units resolve
  against an *ancestor* container, so everything using `--u` lives inside the
  canvas div, a child of the `@container` <main>.

  Below xl: the same elements in normal flow, stacked (the design has no mobile
  frame). Wrappers that only exist for that flow layout switch to plain blocks
  at xl, so the canvas stays the containing block for every positioned element.
*/

/** One line, broken where the design breaks it: a block at xl, flowing text below. */
function Line({ children }: { children: ReactNode }) {
  return <span className="xl:block xl:whitespace-nowrap">{children} </span>;
}

/**
 * "AJC HOSPITALITY" hero lockup, rendered as the page's <h1>.
 *
 * A 327 x 34 box (the design's ink spans x 798 to 1125, y 683 to 717 at
 * 1920px); size it with a width and its contents scale with it. "AJC" is the
 * real logo. "HOSPITALITY" is a STAND-IN: in the design it is a custom monoline
 * vector in the Apeksha Jain wordmark's letterforms (the S is drawn as a slash),
 * and that vector is not in the repo yet. It is set as live text, with
 * `textLength` pinning it to the design's span whichever fallback font renders.
 *
 * To use the real mark: export Figma node 3468:244 ("Group 190") as SVG, add it
 * beside AjcLogo as a BrandSvg component, and render it in place of the <svg>
 * below. Keep the `sr-only` text so the heading still reads "AJC Hospitality".
 */
function HospitalityLockup({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <h1 className={cn("relative m-0 aspect-[327/34] text-[#f8f7f2]", className)} style={style}>
      <span className="sr-only">AJC Hospitality</span>
      <AjcLogo aria-hidden className="absolute top-[5.9%] left-0 h-[86.2%]" />
      <svg
        aria-hidden
        focusable="false"
        viewBox="0 0 240 34"
        className="absolute top-0 left-[26.6%] h-full w-[73.4%] overflow-visible"
      >
        <text
          x="0"
          y="29"
          textLength="239"
          lengthAdjust="spacing"
          fill="currentColor"
          fontSize="41"
          fontWeight="400"
          fontFamily="'Josefin Sans', 'Avenir Next', 'Century Gothic', Futura, 'Trebuchet MS', sans-serif"
        >
          HO/PITALITY
        </text>
      </svg>
    </h1>
  );
}

/**
 * AJC Hospitality (ticket AJC-10). The site footer comes from the root layout.
 */
export default function HospitalityPage() {
  return (
    <main className="@container mx-auto w-full max-w-[1920px] bg-[#f8f7f2] [--u:calc(100cqw/1920)]">
      <div className="relative w-full xl:h-[calc(9134*var(--u))]">
        {/* ---- Hero: 1920 x 1005 ---- */}
        <section className="relative flex min-h-[85svh] flex-col items-center justify-end overflow-hidden bg-[#1c1c1c] px-6 pt-32 pb-14 xl:absolute xl:top-0 xl:left-0 xl:block xl:h-[calc(1005*var(--u))] xl:min-h-0 xl:w-full xl:p-0">
          {/* Single photo filling the hero box. The export is 1920x905 while
              Figma's hero is 1005 tall, so object-cover crops it a touch rather
              than faking extra height (which showed a mirrored seam). */}
          <div className="absolute inset-0 overflow-hidden [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
            <OptimizedImage
              src={`${IMG}/1.png`}
              alt="Hands holding a curved stick beside a brass bowl, next to a carved wooden post"
              width={1920}
              height={905}
              priority
              sizes="100vw"
            />
          </div>

          <HospitalityLockup
            className="w-56 md:w-72 xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:w-(--w)"
            style={at(798, 683, 327)}
          />
          <p
            className="relative text-center font-helvetica-ui uppercase text-[#f8f7f2] mt-6 text-[0.8125rem] leading-[1.6] tracking-[0.04em] xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:w-(--w) xl:text-[length:calc(21.5*var(--u))] xl:leading-[calc(31*var(--u))]"
            style={at(720, 750, 485)}
          >
            A consultancy &amp; advisory
            <br />
            for small luxury hotels
          </p>
          {/* Regions: the bars are "I" glyphs, as in the design. */}
          <p
            className="relative text-center font-helvetica-ui uppercase text-[#f8f7f2] mt-6 flex items-center justify-center gap-3 text-[0.8125rem] leading-[1.6] tracking-[0.04em] xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:w-(--w) xl:gap-[calc(20*var(--u))] xl:text-[length:calc(21.5*var(--u))] xl:leading-[calc(31*var(--u))]"
            style={at(720, 874, 485)}
          >
            <span>India</span>
            <span aria-hidden>I</span>
            <span>Asia</span>
            <span aria-hidden>I</span>
            <span>Europe</span>
          </p>
        </section>

        {/* Shared overlay chrome (Apeksha Jain · AJC · menu), same as Philosophy. */}
        <HeroHeader />

        {/* ---- Who We Are: three columns at x 209 / 753 / 1266, y 1338 ---- */}
        <section className="px-6 py-16 md:px-12 md:py-24 xl:p-0">
          <h2
            className="font-cormorant text-taupe text-[2.75rem] leading-[1.05] font-normal tracking-[-0.06em] md:text-[3.5rem] xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:w-(--w) xl:text-[length:calc(104*var(--u))] xl:leading-[calc(96*var(--u))]"
            style={at(198, 1163, 1088)}
          >
            Who We Are
          </h2>
          {/* Stacked below lg: cap the line length (~75 characters). */}
          <div className="mt-10 grid max-w-xl gap-8 lg:max-w-none lg:grid-cols-3 xl:mt-0 xl:block">
            <div
              className="font-helvetica-ui text-sage text-[0.9375rem] leading-[1.6] tracking-[0.02em] opacity-[0.79] xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:text-[length:calc(22*var(--u))] xl:leading-[calc(25*var(--u))]"
              style={at(209, 1338)}
            >
              <p>
                <Line>AJC has been our way of telling stories.</Line>
              </p>
              <p className="mt-4 xl:mt-[calc(25*var(--u))]">
                <Line>We began in the hospitality industry in</Line>
                <Line>2024 with a foundation in corporate</Line>
                <Line>business and strategy. For our first hotel</Line>
                <Line>launch, we set out for a year-long</Line>
                <Line>residency in India’s Himalayan region of</Line>
                <Line>Ladakh, marking a decisive pivot and the</Line>
                <Line>launch of AJC Hospitality, grounded in a</Line>
                <Line>single realisation:</Line>
              </p>
              <p className="mt-4 xl:mt-[calc(25*var(--u))]">
                <Line>“What guests feel when they think of a</Line>
                <Line>hotel is just as vital as the hotel itself.”</Line>
              </p>
              <p className="mt-4 xl:mt-[calc(25*var(--u))]">
                <Line>
                  It is the human touch, <strong className="font-bold">the human story</strong>,
                </Line>
                <Line>that people truly travel for.</Line>
              </p>
            </div>

            <div
              className="font-helvetica-ui text-sage text-[0.9375rem] leading-[1.6] tracking-[0.02em] opacity-[0.79] xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:text-[length:calc(22*var(--u))] xl:leading-[calc(25*var(--u))]"
              style={at(753, 1338)}
            >
              <p>
                <Line>We believe small luxury hotels around</Line>
                <Line>the world deserve that crucial level of</Line>
                <Line>intentionality.</Line>
              </p>
              <p className="mt-4 xl:mt-[calc(25*var(--u))]">
                <Line>When you invest deeply in your</Line>
                <Line>narrative rather than selling generic</Line>
                <Line>room nights, guests feel invited into a</Line>
                <Line>rare cultural fabric from their very first</Line>
                <Line>interaction.</Line>
              </p>
              <p className="mt-4 xl:mt-[calc(25*var(--u))]">
                <Line>If your hotel feels like anywhere in the</Line>
                <Line>world, and nowhere special, your</Line>
                <Line>guests may never return.</Line>
              </p>
              <p className="mt-4 xl:mt-[calc(25*var(--u))]">
                <Line>For this, we enter your journey.</Line>
              </p>
            </div>

            <div
              className="font-helvetica-ui text-sage text-[0.9375rem] leading-[1.6] tracking-[0.02em] opacity-[0.79] xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:text-[length:calc(22*var(--u))] xl:leading-[calc(25*var(--u))]"
              style={at(1266, 1338)}
            >
              <p>
                <Line>We are not traditional hospitality</Line>
                <Line>consultants; we are industry</Line>
                <Line>tastemakers.</Line>
              </p>
              <p className="mt-4 xl:mt-[calc(25*var(--u))]">
                <Line>Informed by our global travels and</Line>
                <Line>deep engagement with cultural</Line>
                <Line>communities, we create worlds within</Line>
                <Line>yours.</Line>
              </p>
              <p className="mt-4 xl:mt-[calc(25*var(--u))]">
                <Line>From the foundational vision that</Line>
                <Line>inspired your hotel to its ever-evolving</Line>
                <Line>brand perception, we are present at</Line>
                <Line>every step.</Line>
              </p>
              <p className="mt-4 xl:mt-[calc(25*var(--u))]">
                <Line>We launch new hotels and re-brand</Line>
                <Line>legacy ones.</Line>
              </p>
            </div>
          </div>
        </section>

        {/* ---- What We Do + statement ---- */}
        <section className="px-6 py-16 md:px-12 md:py-24 xl:p-0">
          <h2
            className="font-cormorant text-taupe text-[2.75rem] leading-[1.05] font-normal tracking-[-0.06em] md:text-[3.5rem] xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:w-(--w) xl:text-[length:calc(104*var(--u))] xl:leading-[calc(96*var(--u))]"
            style={at(209, 2052, 1088)}
          >
            What We Do
          </h2>
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:block">
            <WhatWeDo />
          </div>
          <p
            className="font-cormorant text-taupe text-[1.625rem] leading-[1.2] font-normal tracking-[-0.06em] md:text-[2rem] mt-16 text-center xl:mt-0 xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:w-(--w) xl:text-[length:calc(50*var(--u))] xl:leading-[calc(66*var(--u))]"
            style={at(391, 2832, 1050)}
          >
            <Line>Strategic Brand &amp; Storytelling is not just a creative layer; it is</Line>
            <Line>the commercial engine that defines your Average Daily Rate</Line>
            <Line>(ADR) and long-term asset valuation.</Line>
          </p>
        </section>

        {/* ---- How We Do It band: 1920 x 905 at y 3232 ---- */}
        <section
          className="relative flex min-h-[60svh] flex-col items-center justify-center overflow-hidden px-6 py-24 xl:absolute xl:top-(--y) xl:left-0 xl:block xl:h-[calc(905*var(--u))] xl:min-h-0 xl:w-full xl:p-0"
          style={at(0, 3232)}
        >
          <div className="absolute inset-0 overflow-hidden [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
            <OptimizedImage
              src={`${IMG}/2.png`}
              alt="A woman in profile reaching for cones of yarn on a shelf"
              width={1920}
              height={905}
              sizes="100vw"
            />
          </div>
          {/* Flow layout only: the photo is cropped tighter there, so lift the contrast. */}
          <div aria-hidden className="absolute inset-0 bg-black/25 xl:hidden" />
          <h2
            className="font-cormorant relative text-center text-[3.25rem] leading-none font-normal tracking-[-0.08em] text-[#f8f7f2] xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:w-(--w) xl:text-[length:calc(118*var(--u))] xl:leading-[calc(81*var(--u))]"
            style={at(591, 419, 726)}
          >
            How We Do It
          </h2>
          <p
            className="relative text-center font-helvetica-ui uppercase text-[#f8f7f2] mt-5 text-[0.75rem] leading-[1.5] xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:w-(--w) xl:text-[length:calc(21*var(--u))] xl:leading-[calc(23*var(--u))]"
            style={at(653, 534, 615)}
          >
            New Launches <span className="px-2 xl:px-[calc(8*var(--u))]">|</span> Hotel Re-brands
          </p>
        </section>

        {/* ---- Our Process ---- */}
        <section className="px-6 py-16 md:px-12 md:py-24 xl:p-0">
          <h2
            className="font-cormorant text-taupe text-[2.75rem] leading-[1.05] font-normal tracking-[-0.06em] md:text-[3.5rem] xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:w-(--w) xl:text-[length:calc(104*var(--u))] xl:leading-[calc(96*var(--u))]"
            style={at(209, 4321, 1088)}
          >
            Our Process
          </h2>
          <p
            className="font-cormorant mt-4 text-[1.375rem] leading-[1.3] font-normal tracking-[-0.06em] text-[#7d7062] xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:text-[length:calc(40*var(--u))] xl:leading-[calc(66*var(--u))] xl:whitespace-nowrap"
            style={at(214, 4429)}
          >
            We step into the critical window between construction and operations - and sometimes
            years later.
          </p>
          {/* Full copy from the ticket. Each body width makes the copy wrap where
              the design breaks its (truncated) lines; offsets are from the Figma frame. */}
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-x-12 md:gap-y-14 xl:mt-0 xl:block">
            <ProcessStage
              title="De-briefing with Core Stories"
              lines={3}
              geometry={{
                x: 209,
                y: 4627,
                body: { dx: 5, gap: 15, width: 531 },
                more: { dx: 7, gap: 19 },
                wash: { dx: -5, dy: 20 },
              }}
            >
              Before any visual or experiential work begins, we unlock the foundational narrative of
              the property. Through our 4-stage <em>Steel Box</em> debriefing process, we excavate
              the principal’s original vision, the architectural intent, and the deeper cultural
              roots of the region to isolate the property’s singular, defensible story.
            </ProcessStage>

            <ProcessStage
              title="Living Residency & Audit"
              lines={2}
              geometry={{
                x: 1202,
                y: 4631,
                body: { dx: 0, gap: 11, width: 484 },
                more: { dx: 7, gap: 44 },
                wash: { dx: 0, dy: 20 },
              }}
            >
              We do not believe in designing luxury from a distance; to build something meaningful
              in a place, we live on shared land alongside your team and community. We audit the
              world through a sensory and narrative lens, evaluating every micro-interaction.
            </ProcessStage>

            <ProcessStage
              title="Identity & Experience Design"
              lines={2}
              geometry={{
                x: 214,
                y: 4942,
                body: { dx: 0, gap: 15, width: 518 },
                more: { dx: 2, gap: 49 },
                wash: { dx: -5, dy: 25 },
              }}
            >
              With the residency insights established, we craft the core brand identity, narrative,
              visual language, culinary framework, and guest journey rituals. We bring together the
              creative teams of photographers, filmmakers, locals and more, to birth a brand
              directly from its land.
            </ProcessStage>

            <ProcessStage
              title="Digital Development"
              lines={3}
              geometry={{
                x: 1202,
                y: 4940,
                body: { dx: 0, gap: 16, width: 465 },
                more: { dx: 7, gap: 25 },
                wash: { dx: 0, dy: 26 },
              }}
            >
              We translate the physical atmosphere of the hotel into its flagship digital platform
              and communication assets. Finally, we establish the PR guidelines, social media setup,
              and launch strategy required to unveil a hotel to the curated global audience of
              tastemakers and guests.
            </ProcessStage>
          </div>
        </section>

        {/* ---- Our Work ---- */}
        <section className="px-6 py-16 md:px-12 md:py-24 xl:p-0">
          <h2
            className="font-cormorant text-taupe text-[2.75rem] leading-[1.05] font-normal tracking-[-0.06em] md:text-[3.5rem] xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:w-(--w) xl:text-[length:calc(104*var(--u))] xl:leading-[calc(96*var(--u))]"
            style={at(209, 5495, 1088)}
          >
            Our Work
          </h2>
          <p
            className="font-cormorant text-taupe text-[1.625rem] leading-[1.2] font-normal tracking-[-0.06em] md:text-[2rem] mt-4 xl:whitespace-nowrap xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:text-[length:calc(50*var(--u))] xl:leading-[calc(66*var(--u))]"
            style={at(220, 5602)}
          >
            These are all living archives of our life, in our brands.
          </p>
          {/* Each tile opens its project page (Figma comments). The outer tiles
              overhang the frame in Figma; the exports are the visible parts. */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-[494fr_843fr_493fr] sm:items-center sm:gap-4 xl:mt-0 xl:block">
            <Link
              href="/work/haveli-dharampura"
              aria-label="Haveli Dharampura"
              className="@container relative block overflow-hidden [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:transition-transform [&>img]:duration-700 [&>img]:ease-[cubic-bezier(0.22,1,0.36,1)] hover:[&>img]:scale-[1.02] aspect-[494/741] xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:w-(--w)"
              style={at(0, 6009, 494)}
            >
              <OptimizedImage
                src={`${IMG}/3.png`}
                alt="Multi-storey courtyard with carved wooden arches and stained-glass doors"
                width={494}
                height={741}
                sizes="(min-width: 640px) 44vw, 100vw"
              />
              {/* Figma (110, 6504) w219 on the tile; 50px type on a 494px tile = 10.12cqw. */}
              <span
                aria-hidden
                className="font-cormorant absolute text-center font-normal tracking-[-0.06em] text-[#f8f7f2] top-[66.8%] left-[22.27%] w-[44.33%] text-[10.12cqw] leading-[8.3cqw]"
              >
                <span className="block">Haveli</span>
                <span className="block">Dharampura</span>
              </span>
            </Link>

            {/* Virsa's label is baked into its export. */}
            <Link
              href="/work/virsa-baltistan"
              aria-label="Virsa Baltistan"
              className="@container relative block overflow-hidden [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:transition-transform [&>img]:duration-700 [&>img]:ease-[cubic-bezier(0.22,1,0.36,1)] hover:[&>img]:scale-[1.02] aspect-[843/1061] xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:w-(--w)"
              style={at(539, 5832, 843)}
            >
              <OptimizedImage
                src={`${IMG}/4.png`}
                alt="A stone-paved veranda between two open wooden doors, with mountains beyond"
                width={843}
                height={1061}
                sizes="(min-width: 640px) 44vw, 100vw"
              />
            </Link>

            <Link
              href="/work/lahe-life"
              aria-label="Lahé Life"
              className="@container relative block overflow-hidden [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:transition-transform [&>img]:duration-700 [&>img]:ease-[cubic-bezier(0.22,1,0.36,1)] hover:[&>img]:scale-[1.02] aspect-[493/741] xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:w-(--w)"
              style={at(1427, 6009, 493)}
            >
              <OptimizedImage
                src={`${IMG}/5.png`}
                alt="A cargo ship on grey water, seen through a dark window frame"
                width={493}
                height={741}
                sizes="(min-width: 640px) 44vw, 100vw"
              />
              <span
                aria-hidden
                className="font-cormorant absolute text-center font-normal tracking-[-0.06em] text-[#f8f7f2] top-[64.64%] left-[46.25%] w-[17.04%] text-[10.14cqw] leading-[8.32cqw]"
              >
                <span className="block">Lahé</span>
                <span className="block">Life</span>
              </span>
            </Link>
          </div>
          <p
            className="font-helvetica-ui text-sage text-[0.9375rem] leading-[1.6] tracking-[0.02em] opacity-[0.79] mx-auto mt-16 max-w-2xl text-center xl:mt-0 xl:max-w-none xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:w-(--w) xl:text-[length:calc(22*var(--u))] xl:leading-[calc(25*var(--u))]"
            style={at(479, 7125, 963)}
          >
            <Line>
              A key insight that drives our approach at AJC is the profound impact of human
              experience
            </Line>
            <Line>
              on brand interactions. We do not look to alter the soul of your hotel; we look to
              unearth it, to
            </Line>
            <Line>
              protect it from the frantic global noise, and to present it to the world as a living
              masterpiece.
            </Line>
          </p>
        </section>

        {/* ---- Write to Us ---- */}
        <section className="px-6 py-16 md:px-12 md:py-24 xl:p-0">
          <h2
            className="font-cormorant text-center text-[2.75rem] leading-[1.05] font-normal tracking-[-0.06em] text-[#7d7062] md:text-[3.5rem] xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:w-(--w) xl:text-[length:calc(90.7*var(--u))] xl:leading-[calc(95*var(--u))]"
            style={at(413, 7360, 1088)}
          >
            Write to Us
          </h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center xl:mt-0 xl:block">
            <EnquiryForm />
            {/* Photo (Figma x 961, overhanging the frame; the export is the visible
                959px) with the cycling script and the brand marks laid over it. */}
            <div
              className="relative aspect-[959/1378] w-full overflow-hidden [&>img]:h-full [&>img]:w-full [&>img]:object-cover xl:absolute xl:m-0 xl:left-(--x) xl:top-(--y) xl:w-(--w)"
              style={at(961, 7615, 959)}
            >
              <OptimizedImage
                src={`${IMG}/6.png`}
                alt="A cup of coffee on a saucer beside an open book"
                width={959}
                height={1378}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              {/* Script centred at Figma (1449, 8303); its 305px ink on the 228px
                  script canvas (224px ink) gives a 310px-wide canvas = 32.4%.
                  Positioned by a wrapper: ScriptCycle's root is `relative`, and
                  cn() joins classes without merging, so an `absolute` passed to
                  it can lose. */}
              <div className="absolute top-[49.93%] left-[50.83%] w-[32.37%] -translate-x-1/2 -translate-y-1/2">
                <ScriptCycle />
              </div>
              <div aria-hidden className="absolute inset-x-0 top-[80.12%] h-[1.27%] text-[#f8f7f2]">
                <ApekshaJainWordmark className="absolute left-[34.83%] h-full" />
                <AjcLogo className="absolute left-[61.73%] h-full" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
