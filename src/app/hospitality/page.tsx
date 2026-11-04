import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AjcLogo, ApekshaJainWordmark, ScriptCycle } from "@/components/brand";
import { EnquiryForm } from "@/components/hospitality/EnquiryForm";
import { HospitalityHeader } from "@/components/hospitality/HospitalityHeader";
import { HospitalityLockup } from "@/components/hospitality/HospitalityLockup";
import { ProcessStage } from "@/components/hospitality/ProcessStage";
import { WhatWeDo } from "@/components/hospitality/WhatWeDo";
import {
  AT,
  AT_W,
  BODY,
  HELV,
  PINNED_LINE,
  SUB,
  TITLE,
  at,
  u,
} from "@/components/hospitality/design";
import { assetPath, cn } from "@/lib/utils";

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
  px = 100cqw / 1920, and elements sit at their Figma coordinates (`AT` +
  `at(x, y)` in components/hospitality/design.ts). Container units resolve
  against an *ancestor* container, so everything using `--u` lives inside the
  canvas div, a child of the `@container` <main>.

  Below xl: the same elements in normal flow, stacked (the design has no mobile
  frame). Wrappers that only exist for that flow layout switch to plain blocks
  at xl, so the canvas stays the containing block for every positioned element.
*/

/** Photo boxes: the direct-child <img> covers the box. */
const IMG_FIT = "overflow-hidden [&>img]:h-full [&>img]:w-full [&>img]:object-cover";
/** Flow-layout section padding (none on the canvas). */
const SECTION = "px-6 py-16 md:px-12 md:py-24 xl:p-0";
/** Light text on the hero and band photos. */
const ON_PHOTO = `relative ${HELV} uppercase text-[#f8f7f2] text-center`;
/** Gap above every paragraph after the first in a text column. */
const PARA = "mt-4 xl:mt-[calc(25*var(--u))]";
/** Our Work tile: the photo fills it and zooms in slightly on hover. */
const TILE = cn(
  "@container relative block",
  IMG_FIT,
  "[&>img]:transition-transform [&>img]:duration-700 [&>img]:ease-[cubic-bezier(0.22,1,0.36,1)] hover:[&>img]:scale-[1.02]",
);
/** Project name over a tile photo (position and size are set per tile). */
const TILE_LABEL =
  "font-cormorant absolute text-center font-normal tracking-[-0.06em] text-[#f8f7f2]";

/** One line, broken where the design breaks it: a block at xl, flowing text below. */
function Line({ children }: { children: ReactNode }) {
  return <span className={PINNED_LINE}>{children} </span>;
}

/**
 * AJC Hospitality (ticket AJC-10). The site footer comes from the root layout.
 */
export default function HospitalityPage() {
  return (
    <main className="@container mx-auto w-full max-w-[1920px] bg-[#f8f7f2] [--u:calc(100cqw/1920)]">
      <div className="relative w-full xl:h-[calc(9134*var(--u))]">
        {/* ---- Hero: 1920 x 1005 ---- */}
        <section
          className={cn(
            "relative flex min-h-[85svh] flex-col items-center justify-end overflow-hidden bg-[#1c1c1c] px-6 pt-32 pb-14",
            "xl:absolute xl:top-0 xl:left-0 xl:block xl:h-[calc(1005*var(--u))] xl:min-h-0 xl:w-full xl:p-0",
          )}
        >
          {/* Canvas only. The supplied export is 905px tall but Figma's hero is
              1005px, with the photo continuing 45px above and 55px below it.
              Until a full-height export exists, those strips mirror the photo's
              own edge rows, and the photo sits at its Figma position. */}
          <div
            aria-hidden
            className="absolute top-0 left-0 hidden w-full overflow-hidden xl:block"
            style={{ height: u(45) }}
          >
            <Image
              src={`${IMG}/1.png`}
              alt=""
              width={1920}
              height={905}
              sizes="100vw"
              className="absolute top-0 left-0 w-full -scale-y-100"
              style={{ height: u(905), transformOrigin: `0 ${u(45)}` }}
            />
          </div>
          <div
            aria-hidden
            className="absolute left-0 hidden w-full overflow-hidden xl:block"
            style={{ top: u(950), height: u(55) }}
          >
            <Image
              src={`${IMG}/1.png`}
              alt=""
              width={1920}
              height={905}
              sizes="100vw"
              className="absolute left-0 w-full -scale-y-100"
              style={{ top: u(-905), height: u(905), transformOrigin: `0 ${u(905)}` }}
            />
          </div>
          <div
            className={cn(
              "absolute inset-0",
              IMG_FIT,
              "xl:inset-auto xl:top-[calc(45*var(--u))] xl:left-0 xl:h-[calc(905*var(--u))] xl:w-full",
            )}
          >
            <Image
              src={`${IMG}/1.png`}
              alt="Hands holding a curved stick beside a brass bowl, next to a carved wooden post"
              width={1920}
              height={905}
              preload
              sizes="100vw"
            />
          </div>

          <HospitalityLockup className={cn("w-56 md:w-72", AT_W)} style={at(798, 683, 327)} />
          <p
            className={cn(
              ON_PHOTO,
              "mt-6 text-[0.8125rem] leading-[1.6] tracking-[0.04em] xl:text-[length:calc(21.5*var(--u))] xl:leading-[calc(31*var(--u))]",
              AT_W,
            )}
            style={at(720, 750, 485)}
          >
            A consultancy &amp; advisory
            <br />
            for small luxury hotels
          </p>
          {/* Regions: the bars are "I" glyphs, as in the design. */}
          <p
            className={cn(
              ON_PHOTO,
              "mt-6 flex items-center justify-center gap-3 text-[0.8125rem] leading-[1.6] tracking-[0.04em] xl:gap-[calc(20*var(--u))] xl:text-[length:calc(21.5*var(--u))] xl:leading-[calc(31*var(--u))]",
              AT_W,
            )}
            style={at(720, 874, 485)}
          >
            <span>India</span>
            <span aria-hidden>I</span>
            <span>Asia</span>
            <span aria-hidden>I</span>
            <span>Europe</span>
          </p>
        </section>

        <HospitalityHeader />

        {/* ---- Who We Are: three columns at x 209 / 753 / 1266, y 1338 ---- */}
        <section className={SECTION}>
          <h2 className={cn(TITLE, AT_W)} style={at(198, 1163, 1088)}>
            Who We Are
          </h2>
          {/* Stacked below lg: cap the line length (~75 characters). */}
          <div className="mt-10 grid max-w-xl gap-8 lg:max-w-none lg:grid-cols-3 xl:mt-0 xl:block">
            <div className={cn(BODY, AT)} style={at(209, 1338)}>
              <p>
                <Line>AJC has been our way of telling stories.</Line>
              </p>
              <p className={PARA}>
                <Line>We began in the hospitality industry in</Line>
                <Line>2024 with a foundation in corporate</Line>
                <Line>business and strategy. For our first hotel</Line>
                <Line>launch, we set out for a year-long</Line>
                <Line>residency in India’s Himalayan region of</Line>
                <Line>Ladakh, marking a decisive pivot and the</Line>
                <Line>launch of AJC Hospitality, grounded in a</Line>
                <Line>single realisation:</Line>
              </p>
              <p className={PARA}>
                <Line>“What guests feel when they think of a</Line>
                <Line>hotel is just as vital as the hotel itself.”</Line>
              </p>
              <p className={PARA}>
                <Line>
                  It is the human touch, <strong className="font-bold">the human story</strong>,
                </Line>
                <Line>that people truly travel for.</Line>
              </p>
            </div>

            <div className={cn(BODY, AT)} style={at(753, 1338)}>
              <p>
                <Line>We believe small luxury hotels around</Line>
                <Line>the world deserve that crucial level of</Line>
                <Line>intentionality.</Line>
              </p>
              <p className={PARA}>
                <Line>When you invest deeply in your</Line>
                <Line>narrative rather than selling generic</Line>
                <Line>room nights, guests feel invited into a</Line>
                <Line>rare cultural fabric from their very first</Line>
                <Line>interaction.</Line>
              </p>
              <p className={PARA}>
                <Line>If your hotel feels like anywhere in the</Line>
                <Line>world, and nowhere special, your</Line>
                <Line>guests may never return.</Line>
              </p>
              <p className={PARA}>
                <Line>For this, we enter your journey.</Line>
              </p>
            </div>

            <div className={cn(BODY, AT)} style={at(1266, 1338)}>
              <p>
                <Line>We are not traditional hospitality</Line>
                <Line>consultants; we are industry</Line>
                <Line>tastemakers.</Line>
              </p>
              <p className={PARA}>
                <Line>Informed by our global travels and</Line>
                <Line>deep engagement with cultural</Line>
                <Line>communities, we create worlds within</Line>
                <Line>yours.</Line>
              </p>
              <p className={PARA}>
                <Line>From the foundational vision that</Line>
                <Line>inspired your hotel to its ever-evolving</Line>
                <Line>brand perception, we are present at</Line>
                <Line>every step.</Line>
              </p>
              <p className={PARA}>
                <Line>We launch new hotels and re-brand</Line>
                <Line>legacy ones.</Line>
              </p>
            </div>
          </div>
        </section>

        {/* ---- What We Do + statement ---- */}
        <section className={SECTION}>
          <h2 className={cn(TITLE, AT_W)} style={at(209, 2052, 1088)}>
            What We Do
          </h2>
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:block">
            <WhatWeDo />
          </div>
          <p className={cn(SUB, "mt-16 text-center xl:mt-0", AT_W)} style={at(391, 2832, 1050)}>
            <Line>Strategic Brand &amp; Storytelling is not just a creative layer; it is</Line>
            <Line>the commercial engine that defines your Average Daily Rate</Line>
            <Line>(ADR) and long-term asset valuation.</Line>
          </p>
        </section>

        {/* ---- How We Do It band: 1920 x 905 at y 3232 ---- */}
        <section
          className={cn(
            "relative flex min-h-[60svh] flex-col items-center justify-center overflow-hidden px-6 py-24",
            "xl:absolute xl:top-(--y) xl:left-0 xl:block xl:h-[calc(905*var(--u))] xl:min-h-0 xl:w-full xl:p-0",
          )}
          style={at(0, 3232)}
        >
          <div className={cn("absolute inset-0", IMG_FIT)}>
            <Image
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
            className={cn(
              "font-cormorant relative text-center text-[3.25rem] leading-none font-normal tracking-[-0.08em] text-[#f8f7f2] xl:text-[length:calc(118*var(--u))] xl:leading-[calc(81*var(--u))]",
              AT_W,
            )}
            style={at(591, 419, 726)}
          >
            How We Do It
          </h2>
          <p
            className={cn(
              ON_PHOTO,
              "mt-5 text-[0.75rem] leading-[1.5] xl:text-[length:calc(21*var(--u))] xl:leading-[calc(23*var(--u))]",
              AT_W,
            )}
            style={at(653, 534, 615)}
          >
            New Launches <span className="px-2 xl:px-[calc(8*var(--u))]">|</span> Hotel Re-brands
          </p>
        </section>

        {/* ---- Our Process ---- */}
        <section className={SECTION}>
          <h2 className={cn(TITLE, AT_W)} style={at(209, 4321, 1088)}>
            Our Process
          </h2>
          <p
            className={cn(
              "font-cormorant mt-4 text-[1.375rem] leading-[1.3] font-normal tracking-[-0.06em] text-[#7d7062] xl:text-[length:calc(40*var(--u))] xl:leading-[calc(66*var(--u))] xl:whitespace-nowrap",
              AT,
            )}
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
        <section className={SECTION}>
          <h2 className={cn(TITLE, AT_W)} style={at(209, 5495, 1088)}>
            Our Work
          </h2>
          <p className={cn(SUB, "mt-4 xl:whitespace-nowrap", AT)} style={at(220, 5602)}>
            These are all living archives of our life, in our brands.
          </p>
          {/* Each tile opens its project page (Figma comments). The outer tiles
              overhang the frame in Figma; the exports are the visible parts. */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-[494fr_843fr_493fr] sm:items-center sm:gap-4 xl:mt-0 xl:block">
            <Link
              href="/work/haveli-dharampura"
              aria-label="Haveli Dharampura"
              className={cn(TILE, "aspect-[494/741]", AT_W)}
              style={at(0, 6009, 494)}
            >
              <Image
                src={`${IMG}/3.png`}
                alt="Multi-storey courtyard with carved wooden arches and stained-glass doors"
                width={494}
                height={741}
                sizes="(min-width: 640px) 44vw, 100vw"
              />
              {/* Figma (110, 6504) w219 on the tile; 50px type on a 494px tile = 10.12cqw. */}
              <span
                aria-hidden
                className={cn(
                  TILE_LABEL,
                  "top-[66.8%] left-[22.27%] w-[44.33%] text-[10.12cqw] leading-[8.3cqw]",
                )}
              >
                <span className="block">Haveli</span>
                <span className="block">Dharampura</span>
              </span>
            </Link>

            {/* Virsa's label is baked into its export. */}
            <Link
              href="/work/virsa-baltistan"
              aria-label="Virsa Baltistan"
              className={cn(TILE, "aspect-[843/1061]", AT_W)}
              style={at(539, 5832, 843)}
            >
              <Image
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
              className={cn(TILE, "aspect-[493/741]", AT_W)}
              style={at(1427, 6009, 493)}
            >
              <Image
                src={`${IMG}/5.png`}
                alt="A cargo ship on grey water, seen through a dark window frame"
                width={493}
                height={741}
                sizes="(min-width: 640px) 44vw, 100vw"
              />
              <span
                aria-hidden
                className={cn(
                  TILE_LABEL,
                  "top-[64.64%] left-[46.25%] w-[17.04%] text-[10.14cqw] leading-[8.32cqw]",
                )}
              >
                <span className="block">Lahé</span>
                <span className="block">Life</span>
              </span>
            </Link>
          </div>
          <p
            className={cn(BODY, "mx-auto mt-16 max-w-2xl text-center xl:mt-0 xl:max-w-none", AT_W)}
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
        <section className={SECTION}>
          <h2
            className={cn(
              "font-cormorant text-center text-[2.75rem] leading-[1.05] font-normal tracking-[-0.06em] text-[#7d7062] md:text-[3.5rem] xl:text-[length:calc(90.7*var(--u))] xl:leading-[calc(95*var(--u))]",
              AT_W,
            )}
            style={at(413, 7360, 1088)}
          >
            Write to Us
          </h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center xl:mt-0 xl:block">
            <EnquiryForm />
            {/* Photo (Figma x 961, overhanging the frame; the export is the visible
                959px) with the cycling script and the brand marks laid over it. */}
            <div
              className={cn("relative aspect-[959/1378] w-full", IMG_FIT, AT_W)}
              style={at(961, 7615, 959)}
            >
              <Image
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
