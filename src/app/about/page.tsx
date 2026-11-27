import type { Metadata } from "next";
import type { ReactNode } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { BandDots } from "@/components/home/BandDots";
import { AboutWhatWeDo } from "@/components/about/AboutWhatWeDo";
import { ScrollLine } from "@/components/about/ScrollLine";
import { assetPath, u } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AJC is a creative consultancy shaped by stories, spaces, cultures, and the subtle art of observation.",
};

// String srcs are not basePath-prefixed by next/image, so prefix them here
// (required on GitHub Pages, which serves the site under a subpath).
const IMG = assetPath("/images/about");

/*
  Layout: pixel-faithful absolutely-positioned canvas (Figma frame
  "ABOUT US 22nd July 2026", width 1920). `--u` = 1 Figma px = 100cqw / 1920,
  so every Figma px is written `calc(<px>*var(--u))` and the whole layout
  scales proportionally with the viewport.
  Colors (Figma): cream #f8f7f2, body #8b7f73, wordmark #887a6c,
  services/clients #7d7062, divider/dots #978c7f.

  STICKY-TRACK PIN (Option 2 — why the page is split into three flow siblings):
  -------------------------------------------------------------------------
  The requested interaction PINS the river band in the viewport while the 7
  dots converge into a horizontal row, then releases to normal scrolling.
  `position: sticky` does nothing on an absolutely-positioned element (there is
  no in-flow box to stick within), so the band cannot stay an absolute child of
  one monolithic canvas and also be pinned. Instead the former single canvas is
  split into THREE flow siblings inside the `.page` container:

    1. TOP canvas  — Figma y 0..2397 (hero, intro lead, portrait, body copy).
       Height = calc(2397*var(--u)). Tops UNCHANGED from the original canvas.
    2. BAND TRACK  — a normal-flow <section data-band-track> taller than the
       viewport. Inside it a <div data-band-pin> is `position: sticky; top: 0`
       and holds a 1920x1080 "stage" with the band image, the headline and
       <BandDots/>. Scrolling through the track's extra height keeps the stage
       pinned while BandDots reads the track rect to drive dot progress 0->1.
    3. BOTTOM canvas — everything from Figma y 3477 downward (statement, wordmark,
       What We Do, Our Work, divider + dots, all 7 regions), with EVERY `top`
       rebased by -3477. Because every element below the band is rebased by the
       SAME constant, their mutual spacing, left offsets, widths and ordering
       are byte-for-byte identical to the original canvas — only their absolute
       document offset shifts (which is invisible: it was always `canvasTop +
       figmaY*u`, and the band track simply supplies that leading offset now via
       real flow instead of a fixed canvas height). All Playwright assertions
       (ordering, image-right-of-text, 3-column Ladakh, fonts/colors, headline)
       are relative/ordering checks and stay green.

  The band stage reuses the band's exact old box (1920x1080 at --u). The
  headline and dots keep their same visual placement over the band because they
  are re-expressed relative to the stage (old Figma top - 2397).
*/

// The band spans Figma y 2397..3477; everything below is rebased by this.
const BAND_BOTTOM_FY = 3477;

// Dot markers on the Our Work divider line (Figma y), rebased to the bottom
// canvas (−BAND_BOTTOM_FY).
const DOT_TOPS = [5883, 6966, 8049, 9132, 10215, 11298, 12255, 13356].map(
  (t) => t - BAND_BOTTOM_FY,
);

/**
 * About Us — pixel-faithful reproduction of the Figma frame
 * "ABOUT US 22nd July 2026". Styled with Tailwind applied directly to each
 * element; only the varying per-region offsets are set inline via u().
 *
 * Repeated type/box styles (body copy, region heading/body/image, clients,
 * the centred Cormorant-47 display) are written out on every element rather
 * than shared, so each tag is self-describing.
 */
export default function AboutPage() {
  return (
    <>
      <AboutMobile />
      <div className="hidden md:block">
        <AboutDesktop />
      </div>
    </>
  );
}
function AboutDesktop() {
  return (
    <div className="@container relative mx-auto w-full max-w-[1920px] bg-[#f8f7f2] [--u:calc(100cqw/1920)]">
      {/* ---- Top slice: Figma y 0..2397 (tops unchanged) ---- */}
      <div className="relative h-[calc(2397*var(--u))] w-full">
        {/* Hero image */}
        <div className="absolute top-0 left-0 h-[calc(1080*var(--u))] w-[calc(1920*var(--u))] overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
          <OptimizedImage
            src={`${IMG}/1.png`}
            alt="Himalayan pine forest in soft mist"
            width={1920}
            height={1080}
            priority
            sizes="100vw"
          />
        </div>
        {/* Intro lead — Cormorant 47 / 48 / -1%, centred */}
        <div className="font-cormorant absolute top-[calc(1225*var(--u))] left-1/2 w-[calc(610*var(--u))] -translate-x-1/2 text-center text-[length:calc(47*var(--u))] leading-[calc(48*var(--u))] font-normal tracking-[-0.01em] text-[#8b7f73]">
          <p>AJC is a creative consultancy</p>
          <p>shaped by stories, spaces, cultures, and the subtle art of observation.</p>
        </div>
        {/* Portrait (310x322 square, centred) */}
        <div className="absolute top-[calc(1490*var(--u))] left-1/2 h-[calc(322*var(--u))] w-[calc(310*var(--u))] -translate-x-1/2 overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
          <OptimizedImage
            src={`${IMG}/2.png`}
            alt="Mountain ridge framed by evergreens"
            width={310}
            height={322}
          />
        </div>
        {/* Left body — Helvetica 22 / 24 / +2%, 79%; Figma line breaks pinned with <br/> */}
        <p className="font-helvetica-regular absolute top-[calc(1985*var(--u))] left-[calc(239*var(--u))] w-[calc(430*var(--u))] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] text-[#8b7f73] opacity-[0.79]">
          It is where the past and the present
          <br />
          cross over in a modern-day India-Asia,
          <br />
          where our lens turns toward the
          <br />
          overlooked.. the quiet details,
          <br />
          the folklore of regions, the threads
          <br />
          where history and heritage meet.
        </p>
        {/* Right quote — Figma line breaks pinned with <br/> */}
        <p className="font-helvetica-regular absolute top-[calc(1990*var(--u))] left-[calc(768*var(--u))] w-[calc(420*var(--u))] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] text-[#8b7f73] opacity-[0.79]">
          &ldquo;In each project, we linger on the
          <br />
          silhouettes that define a brand, the
          <br />
          stories etched in its people,and the
          <br />
          alchemy that happens when creativity
          <br />
          meets cultural depth.&rdquo;
        </p>
        {/* Right closing — Figma line breaks pinned with <br/> */}
        <p className="font-helvetica-regular absolute top-[calc(2165*var(--u))] left-[calc(768*var(--u))] w-[calc(400*var(--u))] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] text-[#8b7f73] opacity-[0.79]">
          The result is more than design…
          <br />
          it is an invitation into a world where
          <br />
          strategy is steeped in story, and
          <br />
          every identity is shaped by our eye.
        </p>
      </div>

      {/* ---- Band track: sticky-pinned stage, extra scroll height drives
          BandDots. The pin wrapper holds the band's exact old 1920x1080 box
          (the "stage"); the track is taller than the viewport so scrolling
          through it keeps the stage pinned while the dots converge. ---- */}
      {/* 100svh pins the stage; +120vh of extra track height lets the dots
          converge while it stays pinned (larger = slower, more deliberate). */}
      <section
        data-band-track
        className="relative w-full"
        style={{ height: "calc(100svh + 120vh)" }}
      >
        <div
          data-band-pin
          className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden"
        >
          <div className="relative h-[calc(1080*var(--u))] w-full">
            {/* The band stage interior — base intro image, 8-tile cross-fade
                carousel, headline and the 8 marker dots / carousel indicators
                — is owned by BandDots so progress, active slide and the
                autoplay timer stay a single source of truth. The band image
                box keeps its exact classes via `bandClass`; the headline keeps
                its cream/semibold classes via `headlineClass`. */}
            <BandDots
              imgBase={IMG}
              bandClass="overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover left-0 top-0 w-[calc(1920*var(--u))] h-[calc(1080*var(--u))]"
              headlineClass="left-1/2 -translate-x-1/2 top-[calc(500*var(--u))] w-[calc(632*var(--u))] text-center font-cormorant font-semibold text-[#f8f7f2] text-[length:calc(55*var(--u))] tracking-[calc(1.1*var(--u))]"
            />
          </div>
        </div>
      </section>

      {/* ---- Bottom slice: Figma y 3477..14619 (every top rebased by -3477).
          Height trims the empty frame remainder; 160u keeps the last region
          off the bottom edge. ---- */}
      <div className="relative h-[calc((13372+160-3477)*var(--u))] w-full">
        {/* Statement — Cormorant 47, centred (3918 − 3477 = 441) */}
        <div className="font-cormorant absolute top-[calc((3918-3477)*var(--u))] left-1/2 w-[calc(946*var(--u))] -translate-x-1/2 text-center text-[length:calc(47*var(--u))] leading-[calc(48*var(--u))] font-normal tracking-[-0.01em] text-[#8b7f73]">
          <p>Our work is the crossover of the past</p>
          <p>into the present. When done right, it</p>
          <p>belongs back to the place where we started.</p>
        </div>
        {/* "ajc" wordmark — Helvetica 20 uppercase, centred, #887a6c */}
        <p className="font-helvetica-regular absolute top-[calc((4091-3477)*var(--u))] left-1/2 -translate-x-1/2 text-center text-[length:calc(20*var(--u))] tracking-[calc(0.4*var(--u))] text-[#887a6c] uppercase">
          ajc
        </p>
        {/* What We Do — section title (Cormorant 104 / 152 / -6%) */}
        <p className="font-cormorant absolute top-[calc((4511-3477)*var(--u))] left-[calc(209*var(--u))] w-[calc(610*var(--u))] text-[length:calc(104*var(--u))] leading-[calc(152*var(--u))] font-normal tracking-[-0.06em] text-[#8b7f73]">
          What We Do
        </p>
        <div className="absolute top-[calc((4688-3477)*var(--u))] left-1/2 h-[calc(322*var(--u))] w-[calc(310*var(--u))] -translate-x-1/2 overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
          <OptimizedImage
            src={`${IMG}/4.png`}
            alt="Boat crossing still water at dusk"
            width={310}
            height={322}
          />
        </div>
        {/* Services list (Figma y4766) as tabs; the selected one's note and link
            show at y4804 on the right. */}
        <AboutWhatWeDo />
        {/* Our Work — section title */}
        <p className="font-cormorant absolute top-[calc((5620-3477)*var(--u))] left-[calc(209*var(--u))] w-[calc(610*var(--u))] text-[length:calc(104*var(--u))] leading-[calc(152*var(--u))] font-normal tracking-[-0.06em] text-[#8b7f73]">
          Our Work
        </p>
        {/* Our Work divider + dots (#978c7f); 5892 − 3477 = 2415. The line fills in
            as you scroll down it. */}
        <ScrollLine className="top-[calc((5892-3477)*var(--u))] left-[calc(50%_-_74.5*var(--u))] h-[calc(7464*var(--u))] w-[calc(1*var(--u))]" />
        {DOT_TOPS.map((top) => (
          <div
            key={top}
            data-rail-dot
            className="absolute left-[calc(50%_-_82.5*var(--u))] h-[calc(16*var(--u))] w-[calc(16*var(--u))] rounded-full bg-[#978c7f] transition-colors duration-300 data-[reached]:bg-[#7d7062]"
            style={{ top: u(top) }}
          />
        ))}
        {/* Region: In Bhutan */}
        <div
          className={`absolute left-[calc(957*var(--u))] h-[calc(975*var(--u))] w-[calc(900*var(--u))] overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover`}
          style={{ top: u(5883 - 3477) }}
        >
          <OptimizedImage
            src={`${IMG}/5.png`}
            alt="Bhutan — prayer flags over the valley"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p
          className={`font-cormorant absolute left-[calc(147*var(--u))] w-[calc(610*var(--u))] text-[length:calc(85*var(--u))] leading-[calc(111*var(--u))] font-normal tracking-[calc(-3.4*var(--u))] text-[#8b7f73]`}
          style={{ top: u(6381 - 3477) }}
        >
          In Bhutan
        </p>
        <div
          className={`font-helvetica-regular absolute left-[calc(147*var(--u))] w-[calc(576*var(--u))] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] text-[#8b7f73] opacity-[0.79]`}
          style={{ top: u(6539 - 3477) }}
        >
          <p>
            There are journeys that transform human perspective; As you descend into the land of the
            Thunder Dragon, whose belly has the slow-moving towns of Bhutan, you enter the world’s
            last Shangri-La—protected by Himalayan mountains and dense forests. Here, the 21st
            century comes to a hold and Buddhist prophecies still live in the air. Here, a life of
            balance is their spirituality.
          </p>
        </div>
        <div
          className={`font-helvetica-regular absolute text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap text-[#7d7062] uppercase opacity-[0.99]`}
          style={{ left: u(147), top: u(6806 - 3477) }}
        >
          <p>raé by zhiwaling</p>
          <p>Ascent by ZHIWALING</p>
        </div>
        {/* Region: In Ladakh */}
        <div
          className={`absolute left-[calc(957*var(--u))] h-[calc(975*var(--u))] w-[calc(900*var(--u))] overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover`}
          style={{ top: u(6966 - 3477) }}
        >
          <OptimizedImage
            src={`${IMG}/6.png`}
            alt="Ladakh — K2 under cloud"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p
          className={`font-cormorant absolute left-[calc(147*var(--u))] w-[calc(610*var(--u))] text-[length:calc(85*var(--u))] leading-[calc(111*var(--u))] font-normal tracking-[calc(-3.4*var(--u))] text-[#8b7f73]`}
          style={{ top: u(7406 - 3477) }}
        >
          In Ladakh
        </p>
        <div
          className={`font-helvetica-regular absolute left-[calc(147*var(--u))] w-[calc(576*var(--u))] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] text-[#8b7f73] opacity-[0.79]`}
          style={{ top: u(7564 - 3477) }}
        >
          <p>
            Our home for all of two years, Ladakh is an ancient land in the shadows of the Himalayas
            and the Karakoram. It is where one feels small in front of the mountains, and giant in
            the realm of possibilities. Some say, it is the last wilderness left wild, each relic
            still breathing, from the generations that traversed these mountains long before us. As
            keepers of history, and tellers of story, we entered Ladakh to never leave.
          </p>
        </div>
        <div
          className={`font-helvetica-regular absolute text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap text-[#7d7062] uppercase opacity-[0.99]`}
          style={{ left: u(147), top: u(7856 - 3477) }}
        >
          <p>VIRSA BALTISTAN</p>
          <p>farmers’ house</p>
        </div>
        <div
          className={`font-helvetica-regular absolute text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap text-[#7d7062] uppercase opacity-[0.99]`}
          style={{ left: u(394.96), top: u(7856 - 3477) }}
        >
          <p>HILL TRIBE</p>
          <p>silk route</p>
        </div>
        <div
          className={`font-helvetica-regular absolute text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap text-[#7d7062] uppercase opacity-[0.99]`}
          style={{ left: u(577.63), top: u(7856 - 3477) }}
        >
          <p>balti kitchen</p>
          <p>ALCHI KITCHEN</p>
        </div>
        {/* Region: In Punjab */}
        <div
          className={`absolute left-[calc(957*var(--u))] h-[calc(975*var(--u))] w-[calc(900*var(--u))] overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover`}
          style={{ top: u(8049 - 3477) }}
        >
          <OptimizedImage
            src={`${IMG}/7.png`}
            alt="Punjab — the Golden Temple"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p
          className={`font-cormorant absolute left-[calc(147*var(--u))] w-[calc(610*var(--u))] text-[length:calc(85*var(--u))] leading-[calc(111*var(--u))] font-normal tracking-[calc(-3.4*var(--u))] text-[#8b7f73]`}
          style={{ top: u(8550 - 3477) }}
        >
          In Punjab
        </p>
        <div
          className={`font-helvetica-regular absolute left-[calc(147*var(--u))] w-[calc(576*var(--u))] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] text-[#8b7f73] opacity-[0.79]`}
          style={{ top: u(8708 - 3477) }}
        >
          <p>
            Punjab is soul—it is Khatirdari, a spirit that loosely translates to absolute
            hospitality and warmth for guests. As you walk through, you find what we call
            &apos;alive archives&apos;— in local people, some old stories, folk music, and purani
            Havelis where history is as present as shared laughter and a lot of food. That feeling
            of coming home is native to here, and it is one place where we truly felt ‘taken care
            of’.
          </p>
        </div>
        <div
          className={`font-helvetica-regular absolute text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap text-[#7d7062] uppercase opacity-[0.99]`}
          style={{ left: u(147), top: u(8998 - 3477) }}
        >
          <p>ranjit’s svaasa</p>
        </div>
        {/* Region: In Assam */}
        <div
          className={`absolute left-[calc(957*var(--u))] h-[calc(975*var(--u))] w-[calc(900*var(--u))] overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover`}
          style={{ top: u(9132 - 3477) }}
        >
          <OptimizedImage
            src={`${IMG}/8.png`}
            alt="Assam — river temple on the Brahmaputra"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p
          className={`font-cormorant absolute left-[calc(147*var(--u))] w-[calc(610*var(--u))] text-[length:calc(85*var(--u))] leading-[calc(111*var(--u))] font-normal tracking-[calc(-3.4*var(--u))] text-[#8b7f73]`}
          style={{ top: u(9630 - 3477) }}
        >
          In Assam
        </p>
        <div
          className={`font-helvetica-regular absolute left-[calc(147*var(--u))] w-[calc(576*var(--u))] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] text-[#8b7f73] opacity-[0.79]`}
          style={{ top: u(9788 - 3477) }}
        >
          <p>
            Assam is the wild heart of eastern India, that can be entered through land, through
            water, through loom and through the wild. Under its dense green canopy and along the
            Brahmaputra&apos;s sweeping banks, time softens. Tea is sipped slowly, always out of a
            kettle. Life is lived patiently, often in coexistence, where birds and a gentle breeze
            carry the forests across the land.
          </p>
        </div>
        <div
          className={`font-helvetica-regular absolute text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap text-[#7d7062] uppercase opacity-[0.99]`}
          style={{ left: u(147), top: u(10055 - 3477) }}
        >
          <p>laheké cafe</p>
          <p>lahé life</p>
        </div>
        {/* Region: In Bengal */}
        <div
          className={`absolute left-[calc(957*var(--u))] h-[calc(975*var(--u))] w-[calc(900*var(--u))] overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover`}
          style={{ top: u(10215 - 3477) }}
        >
          <OptimizedImage
            src={`${IMG}/9.png`}
            alt="Bengal — the Howrah Bridge"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p
          className={`font-cormorant absolute left-[calc(147*var(--u))] w-[calc(610*var(--u))] text-[length:calc(85*var(--u))] leading-[calc(111*var(--u))] font-normal tracking-[calc(-3.4*var(--u))] text-[#8b7f73]`}
          style={{ top: u(10739 - 3477) }}
        >
          In Bengal
        </p>
        <div
          className={`font-helvetica-regular absolute left-[calc(147*var(--u))] w-[calc(576*var(--u))] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] text-[#8b7f73] opacity-[0.79]`}
          style={{ top: u(10897 - 3477) }}
        >
          <p>
            Most people look at Bengal and see soil; we looked at the Hooghly and saw a living,
            breathing artery. On those river banks, life unfolds without a stage—raw, rooted, and
            completely indifferent to modern speed. We had never seen how differently waterways move
            before, carrying daily rituals, old trade routes, and silent dignity, that now reflects
            in our visuals of them.
          </p>
        </div>
        <div
          className={`font-helvetica-regular absolute text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap text-[#7d7062] uppercase opacity-[0.99]`}
          style={{ left: u(147), top: u(11164 - 3477) }}
        >
          <p>assam bengal navigation</p>
        </div>
        {/* Region: In Delhi */}
        <div
          className={`absolute left-[calc(957*var(--u))] h-[calc(975*var(--u))] w-[calc(900*var(--u))] overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover`}
          style={{ top: u(11298 - 3477) }}
        >
          <OptimizedImage
            src={`${IMG}/10.png`}
            alt="Delhi — the Red Fort"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p
          className={`font-cormorant absolute left-[calc(147*var(--u))] w-[calc(610*var(--u))] text-[length:calc(85*var(--u))] leading-[calc(111*var(--u))] font-normal tracking-[calc(-3.4*var(--u))] text-[#8b7f73]`}
          style={{ top: u(11799 - 3477) }}
        >
          In Delhi
        </p>
        <div
          className={`font-helvetica-regular absolute left-[calc(147*var(--u))] w-[calc(576*var(--u))] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] text-[#8b7f73] opacity-[0.79]`}
          style={{ top: u(11957 - 3477) }}
        >
          <p>
            Delhi is our cultural chaos, our curiosity. Home to many communities and India’s
            greatest historic events, it is a city that reciprocates love in its own kind ways.
            Walking the soul of Purani Dilli’s labyrinthine lanes, the said chaos led us to
            Dharampura, where Mughal history resides in a 200-year-old Haveli. Century-old locals
            still tell its story, opening a world of living history within their own.
          </p>
        </div>
        <div
          className={`font-helvetica-regular absolute text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap text-[#7d7062] uppercase opacity-[0.99]`}
          style={{ left: u(147), top: u(12247 - 3477) }}
        >
          <p>haveli dharampura</p>
        </div>
        {/* Region: In Rajasthan */}
        <div
          className={`absolute left-[calc(957*var(--u))] h-[calc(975*var(--u))] w-[calc(900*var(--u))] overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover`}
          style={{ top: u(12381 - 3477) }}
        >
          <OptimizedImage
            src={`${IMG}/11.png`}
            alt="Rajasthan — the Lake Palace"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p
          className={`font-cormorant absolute left-[calc(147*var(--u))] w-[calc(610*var(--u))] text-[length:calc(85*var(--u))] leading-[calc(111*var(--u))] font-normal tracking-[calc(-3.4*var(--u))] text-[#8b7f73]`}
          style={{ top: u(12899 - 3477) }}
        >
          In Rajasthan
        </p>
        <div
          className={`font-helvetica-regular absolute left-[calc(147*var(--u))] w-[calc(576*var(--u))] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] text-[#8b7f73] opacity-[0.79]`}
          style={{ top: u(13057 - 3477) }}
        >
          <p>
            In Rajasthan, royalty was once a rule of India, written into fort walls, golden sands,
            and generations of lineage. Standing within architecture that has witnessed centuries
            turn, we felt the monumental weight of living history that refuses to become a memory.
            Here, heritage survives, as does the hospitality, now shaped regally, for the modern
            traveler.
          </p>
        </div>
        <div
          className={`font-helvetica-regular absolute text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap text-[#7d7062] uppercase opacity-[0.99]`}
          style={{ left: u(147), top: u(13324 - 3477) }}
        >
          <p>NEEMRANA HOTELs</p>
        </div>
      </div>
    </div>
  );
}

/*
  Figma: ABOUT US mobile frame, 390 x 8487 (footer starts at y7808). Every
  element is placed at its measured frame y with u(px) (1 design px = var(--u)).
  The frame opens with a 60px paper strip above its header bar; the site drops it,
  so the frame is pulled up by FRAME_TOP_STRIP and its hero (y119) sits directly
  under the global header, a white bar on mobile (see SiteHeader). The river band
  pins and animates like desktop; the frame only defines its first state.
*/
const FRAME_TOP_STRIP = 60;

function AboutMobile() {
  return (
    <div
      className="@container relative w-full bg-[#f8f7f2] [--u:calc(100cqw/390)] md:hidden"
      style={{ marginTop: u(-FRAME_TOP_STRIP) }}
    >
      {/* Top slice: frame y 0..1290 (tops unchanged) */}
      <div className="relative w-full" style={{ height: u(1290) }}>
        <div
          className="absolute inset-x-0 top-0 bg-[linear-gradient(to_bottom,#a8a49f,#ddd9d6)]"
          style={{ top: u(119), height: u(593) }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <OptimizedImage
              src={`${IMG}/1.png`}
              alt="Himalayan pine forest in soft mist"
              width={1920}
              height={1080}
              priority
              sizes="100vw"
              className="h-full w-full object-cover object-[37%_50%]"
            />
          </div>
        </div>
        <p
          className="font-cormorant absolute inset-x-0 text-center tracking-[-0.01em] text-[#8b7f73]"
          style={{ top: u(784), fontSize: u(16), lineHeight: u(20) }}
        >
          AJC is a creative consultancy
          <br />
          shaped by stories, spaces, cultures,
          <br />
          and the subtle art of observation.
        </p>
        <div
          className="absolute overflow-hidden"
          style={{ left: u(66), top: u(918), width: u(116), height: u(117) }}
        >
          <OptimizedImage
            src={`${IMG}/2.png`}
            alt="Mountain ridge framed by evergreens"
            width={310}
            height={322}
            className="h-full w-full object-cover"
          />
        </div>
        <p
          className="font-helvetica-regular absolute tracking-[0.02em] text-[#8b7f73] opacity-[0.79]"
          style={{
            left: u(200),
            top: u(917),
            width: u(140),
            fontSize: u(10.5),
            lineHeight: u(13),
            letterSpacing: "0.005em",
          }}
        >
          It is where the past and
          <br />
          the present cross over in
          <br />
          a modern-day India-Asia,
          <br />
          where our lens turns
          <br />
          toward the overlooked..
          <br />
          the quiet details, the
          <br />
          folklore of regions, the
          <br />
          threads where history
          <br />
          and heritage meet.
        </p>
        <p
          className="font-helvetica-regular absolute tracking-[0.02em] text-[#8b7f73] opacity-[0.79]"
          style={{
            left: u(66),
            top: u(1072),
            width: u(262),
            fontSize: u(10.5),
            lineHeight: u(13),
            letterSpacing: "0.005em",
          }}
        >
          &ldquo;In each project, we linger on the silhouettes that
          <br />
          define a brand, the stories etched in its people,
          <br />
          and the alchemy that happens when creativity
          <br />
          meets cultural depth.&rdquo;
        </p>
        <p
          className="font-helvetica-regular absolute tracking-[0.02em] text-[#8b7f73] opacity-[0.79]"
          style={{
            left: u(66),
            top: u(1146),
            width: u(262),
            fontSize: u(10.5),
            lineHeight: u(13),
            letterSpacing: "0.005em",
          }}
        >
          The result is more than design…it is an invitation
          <br />
          into a world where strategy is steeped in story, and
          <br />
          every identity is shaped by our eye.
        </p>
      </div>
      {/* Band track: the stage pins while scrolling drives the dots into a row, then
          the carousel autoplays (BandDots). Same model as desktop; the frame only
          defines the first state. */}
      <section
        data-band-track
        className="relative w-full"
        style={{ height: "calc(100svh + 120vh)" }}
      >
        <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
          <div className="relative w-full" style={{ height: u(650) }}>
            <BandDots
              variant="mobile"
              imgBase={IMG}
              bandClass="overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_img]:object-[34.7%_50%] left-0 top-0 w-full h-full"
              headlineClass="inset-x-0 top-[calc(293*var(--u))] text-center font-cormorant font-semibold text-[#f8f7f2] text-[length:calc(20*var(--u))] leading-[calc(24*var(--u))] tracking-[calc(0.4*var(--u))]"
            />
          </div>
        </div>
      </section>
      {/* Bottom slice: frame y 1940..7808. Tops stay the frame's; the inner box is
          pulled up by 1940 and clipped so only this slice shows (and blocks nothing). */}
      <div className="relative w-full" style={{ height: u(7808 - 1940) }}>
        <div
          className="absolute inset-x-0"
          style={{
            top: u(-1940),
            height: u(7808),
            clipPath: `inset(${u(1940)} 0 0 0)`,
          }}
        >
          <p
            className="font-cormorant absolute inset-x-0 text-center tracking-[-0.01em] text-[#8b7f73]"
            style={{ top: u(1995), fontSize: u(14), lineHeight: u(16) }}
          >
            Our work is the crossover of the past
            <br />
            into the present. When done right, it
            <br />
            belongs back to the place where we started.
          </p>
          <p
            className="font-helvetica-regular absolute inset-x-0 text-center text-[#887a6c] uppercase"
            style={{ top: u(2050), fontSize: u(8), lineHeight: u(10), letterSpacing: u(0.16) }}
          >
            ajc
          </p>
          <p
            className="font-cormorant absolute tracking-[-0.06em] text-[#8b7f73]"
            style={{ left: u(49), top: u(2137), fontSize: u(40), lineHeight: u(48) }}
          >
            What We Do
          </p>
          <AboutWhatWeDo mobile />
          <div
            className="absolute overflow-hidden"
            style={{ left: u(115), top: u(2361), width: u(161), height: u(167) }}
          >
            <OptimizedImage
              src={`${IMG}/4.png`}
              alt="Boat crossing still water at dusk"
              width={310}
              height={322}
              className="h-full w-full object-cover"
            />
          </div>
          <p
            className="font-cormorant absolute tracking-[-0.06em] text-[#8b7f73]"
            style={{ left: u(50), top: u(2798), fontSize: u(40), lineHeight: u(48) }}
          >
            Our Work
          </p>
          {/* Region rail: one line down the left with a dot at each region's photo.
              The line fills in as you scroll down it. */}
          <ScrollLine style={{ left: u(50), top: u(2904), width: u(1), height: u(4829) }} />
          <AboutRegion
            top={2903}
            dotTop={2899}
            image="5"
            alt="Bhutan — prayer flags over the valley"
            title="In Bhutan"
            linkTop={3494}
            links={
              <>
                <p>raé by zhiwaling</p>
                <p>Ascent by ZHIWALING</p>
              </>
            }
          >
            There are journeys that transform human
            <br />
            perspective; As you descend into the land
            <br />
            of the Thunder Dragon, whose belly has the
            <br />
            slow-moving towns of Bhutan, you enter
            <br />
            the world’s last Shangri-La—protected by
            <br />
            Himalayan mountains and dense forests.
            <br />
            Here, the 21st century comes to a hold and
            <br />
            Buddhist prophecies still live in the air.
            <br />
            Here, a life of balance is their spirituality.
          </AboutRegion>
          <AboutRegion
            top={3598}
            image="6"
            alt="Ladakh — K2 under cloud"
            title="In Ladakh"
            linkTop={4201}
            links={
              <div className="flex" style={{ gap: u(37) }}>
                <div>
                  <p>VIRSA BALTISTAN</p>
                  <p>farmers’ house</p>
                  <p>HILL TRIBE</p>
                </div>
                <div>
                  <p>silk route</p>
                  <p>balti kitchen</p>
                  <p>ALCHI KITCHEN</p>
                </div>
              </div>
            }
          >
            Our home for all of two years, Ladakh is
            <br />
            an ancient land in the shadows of the
            <br />
            Himalayas and the Karakoram. It is where
            <br />
            one feels small in front of the mountains,
            <br />
            and giant in the realm of possibilities.
            <br />
            Some say, it is the last wilderness left
            <br />
            wild, each relic still breathing, from the
            <br />
            generations that traversed these
            <br />
            mountains long before us. As keepers of
            <br />
            history, and tellers of story, we entered
            <br />
            Ladakh to never leave.
          </AboutRegion>
          <AboutRegion
            top={4321}
            image="7"
            alt="Punjab — the Golden Temple"
            title="In Punjab"
            linkTop={4920}
            links={<p>ranjit’s svaasa</p>}
          >
            Punjab is soul—it is Khatirdari, a spirit
            <br />
            that loosely translates to absolute
            <br />
            hospitality and warmth for guests. As you
            <br />
            walk through, you find what we call &apos;alive
            <br />
            archives&apos;— in local people, some old
            <br />
            stories, folk music, and purani Havelis
            <br />
            where history is as present as shared
            <br />
            laughter and a lot of food. That feeling of
            <br />
            coming home is native to here, and it is
            <br />
            one place where we truly felt ‘taken care
            <br />
            of’.
          </AboutRegion>
          <AboutRegion
            top={5017}
            image="8"
            alt="Assam — river temple on the Brahmaputra"
            title="In Assam"
            linkTop={5621}
            links={
              <>
                <p>laheké cafe</p>
                <p>lahé life</p>
              </>
            }
          >
            Assam is the wild heart of eastern India,
            <br />
            that can be entered through land, through
            <br />
            water, through loom and through the wild.
            <br />
            Under its dense green canopy and along
            <br />
            the Brahmaputra&apos;s sweeping banks, time
            <br />
            softens. Tea is sipped slowly, always out
            <br />
            of a kettle. Life is lived patiently, often in
            <br />
            coexistence, where birds and a gentle
            <br />
            breeze carry the forests across the land.
          </AboutRegion>
          <AboutRegion
            top={5728}
            image="9"
            alt="Bengal — the Howrah Bridge"
            title="In Bengal"
            linkTop={6317}
            links={<p>assam bengal navigation</p>}
          >
            Most people look at Bengal and see soil;
            <br />
            we looked at the Hooghly and saw a living,
            <br />
            breathing artery. On those river banks, life
            <br />
            unfolds without a stage—raw, rooted, and
            <br />
            completely indifferent to modern speed.
            <br />
            We had never seen how differently
            <br />
            waterways move before, carrying daily
            <br />
            rituals, old trade routes, and silent dignity,
            <br />
            that now reflects in our visuals of them.
          </AboutRegion>
          <AboutRegion
            top={6415}
            image="10"
            alt="Delhi — the Red Fort"
            title="In Delhi"
            linkTop={7031}
            links={<p>haveli dharampura</p>}
          >
            Delhi is our cultural chaos, our curiosity.
            <br />
            Home to many communities and India’s
            <br />
            greatest historic events, it is a city that
            <br />
            reciprocates love in its own kind ways.
            <br />
            Walking the soul of Purani Dilli’s
            <br />
            labyrinthine lanes, the said chaos led us
            <br />
            to Dharampura, where Mughal history
            <br />
            resides in a 200-year-old Haveli.
            <br />
            Century-old locals still tell its story,
            <br />
            opening a world of living history within
            <br />
            their own.
          </AboutRegion>
          <AboutRegion
            top={7123}
            dotTop={7124}
            image="11"
            alt="Rajasthan — the Lake Palace"
            title="In Rajasthan"
            linkTop={7713}
            links={<p>NEEMRANA HOTELs</p>}
          >
            In Rajasthan, royalty was once a rule of
            <br />
            India, written into fort walls, golden sands,
            <br />
            and generations of lineage. Standing
            <br />
            within architecture that has witnessed
            <br />
            centuries turn, we felt the monumental
            <br />
            weight of living history that refuses to
            <br />
            become a memory. Here, heritage
            <br />
            survives, as does the hospitality, now
            <br />
            shaped regally, for the modern traveler.
          </AboutRegion>
          <span
            data-rail-dot
            className="absolute rounded-full bg-[#978c7f] transition-colors duration-300 data-[reached]:bg-[#7d7062]"
            style={{ left: u(45), top: u(7728), width: u(10), height: u(10) }}
          />
        </div>
      </div>
    </div>
  );
}
/**
 * One region of "Our Work" on the mobile frame: dot on the rail, photo bleeding
 * off the right edge, title, copy and project links. `top` is the photo's frame
 * y; `linkTop` is where the project links start (it varies with the copy).
 */
function AboutRegion({
  top,
  dotTop = top,
  image,
  alt,
  title,
  linkTop,
  links,
  children,
}: {
  top: number;
  dotTop?: number;
  image: string;
  alt: string;
  title: string;
  linkTop: number;
  links: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <span
        data-rail-dot
        className="absolute rounded-full bg-[#978c7f] transition-colors duration-300 data-[reached]:bg-[#7d7062]"
        style={{ left: u(45), top: u(dotTop), width: u(10), height: u(10) }}
      />
      <div
        className="absolute overflow-hidden"
        style={{ left: u(96), top: u(top), width: u(294), height: u(319) }}
      >
        <OptimizedImage
          src={`${IMG}/${image}.png`}
          alt={alt}
          width={900}
          height={975}
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      </div>
      <h2
        className="font-cormorant absolute tracking-[-0.04em] text-[#8b7f73]"
        style={{ left: u(97), top: u(top + 369), fontSize: u(45), lineHeight: u(52) }}
      >
        {title}
      </h2>
      <p
        className="font-helvetica-regular absolute tracking-[0.02em] text-[#8b7f73] opacity-[0.79]"
        style={{
          left: u(103),
          top: u(top + 429),
          width: u(246),
          fontSize: u(12),
          lineHeight: u(14),
        }}
      >
        {children}
      </p>
      <div
        className="font-helvetica-regular absolute tracking-[0.02em] text-[#7d7062] uppercase"
        style={{ left: u(103), top: u(linkTop), fontSize: u(11.5), lineHeight: u(14) }}
      >
        {links}
      </div>
    </>
  );
}
