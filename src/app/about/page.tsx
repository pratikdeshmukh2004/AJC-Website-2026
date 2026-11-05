import type { Metadata } from "next";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { HeroHeader } from "@/components/home/HeroHeader";
import { BandDots } from "@/components/home/BandDots";
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
    <div className="@container relative mx-auto w-full max-w-[1920px] bg-[#f8f7f2] [--u:calc(100cqw/1920)]">
      {/* Overlay chrome (APEKSHA JAIN · AJC · menu), same as the home hero */}
      <HeroHeader menuOnly />

      {/* ---- Top slice: Figma y 0..2397 (tops unchanged) ---- */}
      <div className="relative w-full h-[calc(2397*var(--u))]">
        {/* Hero image */}
        <div className="absolute overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover left-0 top-0 w-[calc(1920*var(--u))] h-[calc(1080*var(--u))]">
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
        <div className="absolute left-1/2 -translate-x-1/2 top-[calc(1225*var(--u))] w-[calc(610*var(--u))] text-center font-cormorant font-normal text-[#8b7f73] text-[length:calc(47*var(--u))] leading-[calc(48*var(--u))] tracking-[-0.01em]">
          <p>AJC is a creative consultancy</p>
          <p>shaped by stories, spaces, cultures, and the subtle art of observation.</p>
        </div>
        {/* Portrait (310x322 square, centred) */}
        <div className="absolute overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover left-1/2 -translate-x-1/2 w-[calc(310*var(--u))] h-[calc(322*var(--u))] top-[calc(1490*var(--u))]">
          <OptimizedImage
            src={`${IMG}/2.png`}
            alt="Mountain ridge framed by evergreens"
            width={310}
            height={322}
          />
        </div>
        {/* Left body — Helvetica 22 / 24 / +2%, 79%; Figma line breaks pinned with <br/> */}
        <p className="absolute font-helvetica text-[#8b7f73] opacity-[0.79] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] left-[calc(239*var(--u))] top-[calc(1985*var(--u))] w-[calc(430*var(--u))]">
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
        <p className="absolute font-helvetica text-[#8b7f73] opacity-[0.79] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] left-[calc(768*var(--u))] top-[calc(1990*var(--u))] w-[calc(420*var(--u))]">
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
        <p className="absolute font-helvetica text-[#8b7f73] opacity-[0.79] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] left-[calc(768*var(--u))] top-[calc(2165*var(--u))] w-[calc(400*var(--u))]">
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
      <section data-band-track className="relative w-full" style={{ height: "calc(100svh + 120vh)" }}>
        <div
          data-band-pin
          className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden"
        >
          <div className="relative w-full h-[calc(1080*var(--u))]">
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
      <div className="relative w-full h-[calc((13372+160-3477)*var(--u))]">
        {/* Statement — Cormorant 47, centred (3918 − 3477 = 441) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[calc((3918-3477)*var(--u))] w-[calc(946*var(--u))] text-center font-cormorant font-normal text-[#8b7f73] text-[length:calc(47*var(--u))] leading-[calc(48*var(--u))] tracking-[-0.01em]">
          <p>Our work is the crossover of the past</p>
          <p>into the present. When done right, it</p>
          <p>belongs back to the place where we started.</p>
        </div>
        {/* "ajc" wordmark — Helvetica 20 uppercase, centred, #887a6c */}
        <p className="absolute left-1/2 -translate-x-1/2 top-[calc((4091-3477)*var(--u))] text-center uppercase font-helvetica text-[#887a6c] text-[length:calc(20*var(--u))] tracking-[calc(0.4*var(--u))]">
          ajc
        </p>
        {/* What We Do — section title (Cormorant 104 / 152 / -6%) */}
        <p className="absolute w-[calc(610*var(--u))] font-cormorant font-normal text-[#8b7f73] text-[length:calc(104*var(--u))] leading-[calc(152*var(--u))] tracking-[-0.06em] left-[calc(209*var(--u))] top-[calc((4511-3477)*var(--u))]">
          What We Do
        </p>
        <div className="absolute overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover left-1/2 -translate-x-1/2 w-[calc(310*var(--u))] h-[calc(322*var(--u))] top-[calc((4688-3477)*var(--u))]">
          <OptimizedImage
            src={`${IMG}/4.png`}
            alt="Boat crossing still water at dusk"
            width={310}
            height={322}
          />
        </div>
        {/* Services list — Helvetica 28 uppercase / 156% / +2%, #7d7062 at 59% */}
        <div className="absolute left-[calc(209*var(--u))] top-[calc((4766-3477)*var(--u))] w-[calc(523*var(--u))] uppercase font-helvetica text-[#7d7062] opacity-[0.59] text-[length:calc(28*var(--u))] leading-[1.56] tracking-[0.02em]">
          <p>Brand Strategy &amp; Narrative</p>
          <p>Identity &amp; Design</p>
          <p>Creative Direction</p>
          <p>Experience Design</p>
          <p>Hospitality Consulting</p>
        </div>
        {/* Note — body copy (Helvetica 22 / 24 / +2%, 79%) */}
        <div className="absolute font-helvetica text-[#8b7f73] opacity-[0.79] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] left-[calc(1195*var(--u))] top-[calc((4804-3477)*var(--u))] w-[calc(523*var(--u))]">
          <p>
            We step into the critical window after physical construction ends and before operational
            launch begins – defining the core narrative, digital and design identity, global
            perception, and guest experience journey to ensure memorable guest delight while
            maximizing long-term asset valuation.
          </p>
        </div>
        {/* Discover More — Helvetica 18 uppercase / 156% / +2%, #7d7062 */}
        <Link
          href="/work"
          className="absolute left-[calc(1195*var(--u))] top-[calc((4990-3477)*var(--u))] uppercase font-helvetica text-[#7d7062] text-[length:calc(18*var(--u))] leading-[1.56] tracking-[0.02em]"
        >
          Discover More
        </Link>
        <div className="absolute left-[calc(1195*var(--u))] top-[calc((5016-3477)*var(--u))] w-[calc(163*var(--u))] h-[calc(2*var(--u))] bg-[#7d7062]" />
        {/* Our Work — section title */}
        <p className="absolute w-[calc(610*var(--u))] font-cormorant font-normal text-[#8b7f73] text-[length:calc(104*var(--u))] leading-[calc(152*var(--u))] tracking-[-0.06em] left-[calc(209*var(--u))] top-[calc((5620-3477)*var(--u))]">
          Our Work
        </p>
        {/* Our Work divider + dots (#978c7f); 5892 − 3477 = 2415 */}
        <div className="absolute left-[calc(50%_-_74.5*var(--u))] top-[calc((5892-3477)*var(--u))] w-[calc(1*var(--u))] h-[calc(7464*var(--u))] bg-[#978c7f] opacity-[0.52]" />
        {DOT_TOPS.map((top) => (
          <div
            key={top}
            className="absolute left-[calc(50%_-_82.5*var(--u))] w-[calc(16*var(--u))] h-[calc(16*var(--u))] rounded-full bg-[#978c7f]"
            style={{ top: u(top) }}
          />
        ))}
        {/* Region: In Bhutan */}
        <div className={`absolute overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover left-[calc(957*var(--u))] w-[calc(900*var(--u))] h-[calc(975*var(--u))]`} style={{ top: u(5883 - 3477) }}>
          <OptimizedImage
            src={`${IMG}/5.png`}
            alt="Bhutan — prayer flags over the valley"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p className={`absolute left-[calc(147*var(--u))] w-[calc(610*var(--u))] font-cormorant font-normal text-[#8b7f73] text-[length:calc(85*var(--u))] leading-[calc(111*var(--u))] tracking-[calc(-3.4*var(--u))]`} style={{ top: u(6381 - 3477) }}>
          In Bhutan
        </p>
        <div className={`absolute font-helvetica text-[#8b7f73] opacity-[0.79] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] left-[calc(147*var(--u))] w-[calc(576*var(--u))]`} style={{ top: u(6539 - 3477) }}>
          <p>
            There are journeys that transform human perspective; As you descend into the land of the
            Thunder Dragon, whose belly has the slow-moving towns of Bhutan, you enter the world’s
            last Shangri-La—protected by Himalayan mountains and dense forests. Here, the 21st
            century comes to a hold and Buddhist prophecies still live in the air. Here, a life of
            balance is their spirituality.
          </p>
        </div>
        <div className={`absolute uppercase font-helvetica text-[#7d7062] opacity-[0.99] text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap`} style={{ left: u(147), top: u(6806 - 3477) }}>
          <p>raé by zhiwaling</p>
          <p>Ascent by ZHIWALING</p>
        </div>
        {/* Region: In Ladakh */}
        <div className={`absolute overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover left-[calc(957*var(--u))] w-[calc(900*var(--u))] h-[calc(975*var(--u))]`} style={{ top: u(6966 - 3477) }}>
          <OptimizedImage
            src={`${IMG}/6.png`}
            alt="Ladakh — K2 under cloud"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p className={`absolute left-[calc(147*var(--u))] w-[calc(610*var(--u))] font-cormorant font-normal text-[#8b7f73] text-[length:calc(85*var(--u))] leading-[calc(111*var(--u))] tracking-[calc(-3.4*var(--u))]`} style={{ top: u(7406 - 3477) }}>
          In Ladakh
        </p>
        <div className={`absolute font-helvetica text-[#8b7f73] opacity-[0.79] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] left-[calc(147*var(--u))] w-[calc(576*var(--u))]`} style={{ top: u(7564 - 3477) }}>
          <p>
            Our home for all of two years, Ladakh is an ancient land in the shadows of the Himalayas
            and the Karakoram. It is where one feels small in front of the mountains, and giant in
            the realm of possibilities. Some say, it is the last wilderness left wild, each relic
            still breathing, from the generations that traversed these mountains long before us. As
            keepers of history, and tellers of story, we entered Ladakh to never leave.
          </p>
        </div>
        <div className={`absolute uppercase font-helvetica text-[#7d7062] opacity-[0.99] text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap`} style={{ left: u(147), top: u(7856 - 3477) }}>
          <p>VIRSA BALTISTAN</p>
          <p>farmers’ house</p>
        </div>
        <div className={`absolute uppercase font-helvetica text-[#7d7062] opacity-[0.99] text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap`} style={{ left: u(394.96), top: u(7856 - 3477) }}>
          <p>HILL TRIBE</p>
          <p>silk route</p>
        </div>
        <div className={`absolute uppercase font-helvetica text-[#7d7062] opacity-[0.99] text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap`} style={{ left: u(577.63), top: u(7856 - 3477) }}>
          <p>balti kitchen</p>
          <p>ALCHI KITCHEN</p>
        </div>
        {/* Region: In Punjab */}
        <div className={`absolute overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover left-[calc(957*var(--u))] w-[calc(900*var(--u))] h-[calc(975*var(--u))]`} style={{ top: u(8049 - 3477) }}>
          <OptimizedImage
            src={`${IMG}/7.png`}
            alt="Punjab — the Golden Temple"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p className={`absolute left-[calc(147*var(--u))] w-[calc(610*var(--u))] font-cormorant font-normal text-[#8b7f73] text-[length:calc(85*var(--u))] leading-[calc(111*var(--u))] tracking-[calc(-3.4*var(--u))]`} style={{ top: u(8550 - 3477) }}>
          In Punjab
        </p>
        <div className={`absolute font-helvetica text-[#8b7f73] opacity-[0.79] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] left-[calc(147*var(--u))] w-[calc(576*var(--u))]`} style={{ top: u(8708 - 3477) }}>
          <p>
            Punjab is soul—it is Khatirdari, a spirit that loosely translates to absolute
            hospitality and warmth for guests. As you walk through, you find what we call
            &apos;alive archives&apos;— in local people, some old stories, folk music, and purani
            Havelis where history is as present as shared laughter and a lot of food. That feeling
            of coming home is native to here, and it is one place where we truly felt ‘taken care
            of’.
          </p>
        </div>
        <div className={`absolute uppercase font-helvetica text-[#7d7062] opacity-[0.99] text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap`} style={{ left: u(147), top: u(8998 - 3477) }}>
          <p>ranjit’s svaasa</p>
        </div>
        {/* Region: In Assam */}
        <div className={`absolute overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover left-[calc(957*var(--u))] w-[calc(900*var(--u))] h-[calc(975*var(--u))]`} style={{ top: u(9132 - 3477) }}>
          <OptimizedImage
            src={`${IMG}/8.png`}
            alt="Assam — river temple on the Brahmaputra"
            width={900}
            height={975}
            sizes="(min-width:768px) 50vw, 100vw"
          />
        </div>
        <p className={`absolute left-[calc(147*var(--u))] w-[calc(610*var(--u))] font-cormorant font-normal text-[#8b7f73] text-[length:calc(85*var(--u))] leading-[calc(111*var(--u))] tracking-[calc(-3.4*var(--u))]`} style={{ top: u(9630 - 3477) }}>
          In Assam
        </p>
        <div className={`absolute font-helvetica text-[#8b7f73] opacity-[0.79] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] left-[calc(147*var(--u))] w-[calc(576*var(--u))]`} style={{ top: u(9788 - 3477) }}>
          <p>
            Assam is the wild heart of eastern India, that can be entered through land, through
            water, through loom and through the wild. Under its dense green canopy and along the
            Brahmaputra&apos;s sweeping banks, time softens. Tea is sipped slowly, always out of a
            kettle. Life is lived patiently, often in coexistence, where birds and a gentle breeze
            carry the forests across the land.
          </p>
        </div>
        <div className={`absolute uppercase font-helvetica text-[#7d7062] opacity-[0.99] text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap`} style={{ left: u(147), top: u(10055 - 3477) }}>
          <p>laheké cafe</p>
          <p>lahé life</p>
        </div>
        {/* Region: In Bengal */}
        <div
          className={`absolute overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover left-[calc(957*var(--u))] w-[calc(900*var(--u))] h-[calc(975*var(--u))]`}
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
        <p className={`absolute left-[calc(147*var(--u))] w-[calc(610*var(--u))] font-cormorant font-normal text-[#8b7f73] text-[length:calc(85*var(--u))] leading-[calc(111*var(--u))] tracking-[calc(-3.4*var(--u))]`} style={{ top: u(10739 - 3477) }}>
          In Bengal
        </p>
        <div className={`absolute font-helvetica text-[#8b7f73] opacity-[0.79] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] left-[calc(147*var(--u))] w-[calc(576*var(--u))]`} style={{ top: u(10897 - 3477) }}>
          <p>
            Most people look at Bengal and see soil; we looked at the Hooghly and saw a living,
            breathing artery. On those river banks, life unfolds without a stage—raw, rooted, and
            completely indifferent to modern speed. We had never seen how differently waterways move
            before, carrying daily rituals, old trade routes, and silent dignity, that now reflects
            in our visuals of them.
          </p>
        </div>
        <div className={`absolute uppercase font-helvetica text-[#7d7062] opacity-[0.99] text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap`} style={{ left: u(147), top: u(11164 - 3477) }}>
          <p>assam bengal navigation</p>
        </div>
        {/* Region: In Delhi */}
        <div
          className={`absolute overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover left-[calc(957*var(--u))] w-[calc(900*var(--u))] h-[calc(975*var(--u))]`}
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
        <p className={`absolute left-[calc(147*var(--u))] w-[calc(610*var(--u))] font-cormorant font-normal text-[#8b7f73] text-[length:calc(85*var(--u))] leading-[calc(111*var(--u))] tracking-[calc(-3.4*var(--u))]`} style={{ top: u(11799 - 3477) }}>
          In Delhi
        </p>
        <div className={`absolute font-helvetica text-[#8b7f73] opacity-[0.79] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] left-[calc(147*var(--u))] w-[calc(576*var(--u))]`} style={{ top: u(11957 - 3477) }}>
          <p>
            Delhi is our cultural chaos, our curiosity. Home to many communities and India’s
            greatest historic events, it is a city that reciprocates love in its own kind ways.
            Walking the soul of Purani Dilli’s labyrinthine lanes, the said chaos led us to
            Dharampura, where Mughal history resides in a 200-year-old Haveli. Century-old locals
            still tell its story, opening a world of living history within their own.
          </p>
        </div>
        <div className={`absolute uppercase font-helvetica text-[#7d7062] opacity-[0.99] text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap`} style={{ left: u(147), top: u(12247 - 3477) }}>
          <p>haveli dharampura</p>
        </div>
        {/* Region: In Rajasthan */}
        <div
          className={`absolute overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover left-[calc(957*var(--u))] w-[calc(900*var(--u))] h-[calc(975*var(--u))]`}
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
        <p className={`absolute left-[calc(147*var(--u))] w-[calc(610*var(--u))] font-cormorant font-normal text-[#8b7f73] text-[length:calc(85*var(--u))] leading-[calc(111*var(--u))] tracking-[calc(-3.4*var(--u))]`} style={{ top: u(12899 - 3477) }}>
          In Rajasthan
        </p>
        <div className={`absolute font-helvetica text-[#8b7f73] opacity-[0.79] text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))] tracking-[0.02em] left-[calc(147*var(--u))] w-[calc(576*var(--u))]`} style={{ top: u(13057 - 3477) }}>
          <p>
            In Rajasthan, royalty was once a rule of India, written into fort walls, golden sands,
            and generations of lineage. Standing within architecture that has witnessed centuries
            turn, we felt the monumental weight of living history that refuses to become a memory.
            Here, heritage survives, as does the hospitality, now shaped regally, for the modern
            traveler.
          </p>
        </div>
        <div className={`absolute uppercase font-helvetica text-[#7d7062] opacity-[0.99] text-[length:calc(22.85*var(--u))] leading-[1.15] tracking-[calc(0.457*var(--u))] whitespace-nowrap`} style={{ left: u(147), top: u(13324 - 3477) }}>
          <p>NEEMRANA HOTELs</p>
        </div>
      </div>
    </div>
  );
}
