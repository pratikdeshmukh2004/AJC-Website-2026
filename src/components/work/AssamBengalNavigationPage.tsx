"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroHeader } from "@/components/home/HeroHeader";
import { ReadMoreCopy } from "@/components/work/ReadMoreCopy";
import { assetPath } from "@/lib/utils";

/*
  Assam Bengal Navigation — reproduction of the Figma project-page frame
  "Assam Bengal Navigation" (node 3232:191, 1920 x 29323) for AJC-24.

  Same technique as the Haveli / Neemrana pages: an absolutely-positioned
  canvas where `--u` = 1 Figma px = 100cqw / 1920, so the layout scales
  proportionally with the viewport (exact at 1920px, smaller below).

  Palette: background #fdfbf4, headings #7d7062 (taupe), body #9b9484 (sage).
  Figma percentage offsets were converted to px against the 1920 x 29323 frame.
*/

const IMG = assetPath("/images/projects/assam-bengal-navigation");
const VID = assetPath("/videos/assam-bengal-navigation");

// Project films (from the AJC asset drop). Each has a poster frame so the
// carousel visibly changes as you step through with the arrows.
type Film = { src: string; poster: string };
const FILMS: Film[] = [
  { src: `${VID}/8-1.mp4`, poster: `${VID}/poster-8-1.jpg` },
  { src: `${VID}/8-2.mp4`, poster: `${VID}/poster-8-2.jpg` },
  { src: `${VID}/8-4.mp4`, poster: `${VID}/poster-8-4.jpg` },
];

// Figma px → canvas units.
const v = (px: number) => `calc(${px} * var(--u))`;

const tw = {
  page: "@container relative mx-auto w-full max-w-[1920px] overflow-hidden bg-[#fdfbf4] [--u:calc(100cqw/1920)]",
  // Content ends at the "Alchi Kitchen" label (y28011) plus breathing room.
  canvas: "relative w-full h-[calc(28250*var(--u))]",
  abs: "absolute",

  bigTitle:
    "font-cormorant text-[#7d7062] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]",
  sectionTitle:
    "font-cormorant text-[#7d7062] text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]",

  body: "font-helvetica-regular text-[#9b9484] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))]",
  bodyBold:
    "font-helvetica font-bold text-[#9b9484] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))]",
  credits:
    "font-helvetica-regular uppercase text-[#7d7062] opacity-80 text-[length:calc(28*var(--u))] leading-[0.9976] tracking-[calc(0.56*var(--u))]",
  eyebrow:
    "font-helvetica font-bold uppercase text-white opacity-80 text-[length:calc(28*var(--u))] tracking-[calc(0.56*var(--u))]",
  arrow:
    "font-helvetica font-bold text-[#9b9484] text-[length:calc(46*var(--u))] leading-none tracking-[calc(0.92*var(--u))] text-center",
};

/** Image-fill crop (percent of the frame), copied from the Figma fills. */
type Crop = { w: number; h: number; left: number; top: number };

type PicSpec = {
  src: string;
  alt: string;
  left: number;
  top: number;
  width: number;
  height: number;
  /** Omit for a plain object-cover fill. */
  crop?: Crop;
  priority?: boolean;
};

function Pic({ src, alt, left, top, width, height, crop, priority = false }: PicSpec) {
  return (
    <div
      className={`${tw.abs} overflow-hidden`}
      style={{ left: v(left), top: v(top), width: v(width), height: v(height) }}
    >
      <Image
        src={`${IMG}/${src}`}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(min-width: 1920px) 1920px, 100vw"
        className={crop ? "absolute max-w-none" : "absolute inset-0 h-full w-full object-cover"}
        style={
          crop
            ? { width: `${crop.w}%`, height: `${crop.h}%`, left: `${crop.left}%`, top: `${crop.top}%` }
            : undefined
        }
      />
    </div>
  );
}

/** White play triangle (Figma Polygon), rotated to point right. */
function PlayGlyph() {
  return (
    <span className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-transform duration-300 group-hover:scale-125" style={{ width: v(30), height: v(31) }}>
      <svg viewBox="0 0 56.2917 48.75" className="h-full w-full rotate-90" fill="white" aria-hidden>
        <path d="M28.1458 0L56.2917 48.75H0L28.1458 0Z" />
      </svg>
    </span>
  );
}

/**
 * A film that plays inline, inside its own Figma box — no popup. Shows the
 * poster + centred play triangle; on click the same box swaps to a <video>
 * with native controls that plays right there.
 */
function InlineFilm({
  film,
  left,
  top,
  width,
  height,
  label,
}: {
  film: Film;
  left: number;
  top: number;
  width: number;
  height: number;
  label: string;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <div
      className={`${tw.abs} overflow-hidden`}
      style={{ left: v(left), top: v(top), width: v(width), height: v(height) }}
    >
      {playing ? (
        <video
          key={film.src}
          src={film.src}
          poster={film.poster}
          controls
          autoPlay
          playsInline
          className="absolute inset-0 h-full w-full bg-black object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={label}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={film.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <PlayGlyph />
        </button>
      )}
    </div>
  );
}

/** Press logo that links out to the article. */
function PressLogo({
  src,
  alt,
  href,
  left,
  top,
  width,
  height,
  crop,
}: PicSpec & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={alt}
      className={`${tw.abs} block transition-opacity duration-300 hover:opacity-70`}
      style={{ left: v(left), top: v(top), width: v(width), height: v(height) }}
    >
      <Pic src={src} alt={alt} left={0} top={0} width={width} height={height} crop={crop} />
    </a>
  );
}

/* ---------- Copy (Figma frame + Jira AJC-24 page copy) ---------- */

const INTRO_LEAD = [
  "When you live on a river, it is as though you are discovering a world that exists in perfect tandem with life on land. There is a rare, striking symphony in witnessing riverine villages and rural life unfold right outside the windows of a luxury cruise. To experience this in India’s Bengal is a story we will be telling for a very long time.",
  "Rivers move to a rhythm of their own; you cannot understand them quickly. They teach you patience, and they remind you that no two turns will ever offer you the exact same weather.",
];
const INTRO_MORE = [
  "In February of 2026, we found ourselves filming for Assam Bengal Navigation – a pioneer of river cruising in Eastern India. We were aboard their ship, the ABN Rajmahal, as it set sail from Calcutta for a three-day journey.",
  "As the anchors came up, our creative brief was clear: to capture a lived-in cruise experience through a guest-lens. Slow, unhurried, and entirely steeped in the moment. And so began one of the most challenging shoots of our practice.",
  "What the uninitiated might not know about a river is that it constantly changes course. For the unwary of direction, much as ourselves, we were chasing the shifting sunlight as though it were our very source of oxygen. In retrospect, it was an amusing fate.",
  "And so, we did what we do best. We formed photographs and short films from everything our eyes could see. 800 photographs and an intimate sail into rural Bengal across three days, we closed a remarkable journey with ABN.",
];

const SAIL_LEAD = [
  "Days on a moving ship bring you face-to-face with a side of life and culture that few ever see. From witnessing fine Muslin being handwoven over sixty days to make a single saree, to watching silk threads separated by a mechanical churner, the rhythmic clickity-clack of ancient machinery running on pure human hands shaped our entire narrative.",
];
const SAIL_COLLAPSED =
  "Near the ghats, you witness the Hooghly, or the lower Ganges – being prayed to in the quiet of the early morning. During the sail, you watch the captain mindfully navigate the shifting waters, while the evenings";
const SAIL_MORE = [
  "Near the ghats, you witness the Hooghly, or the lower Ganges – being prayed to in the quiet of the early morning. During the sail, you watch the captain mindfully navigate the shifting waters, while the evenings fill the ship’s salon with the vibrant dances and cultures of neighboring states.",
];

/* ---------- Images (positions/crops from the Figma frame) ---------- */

const bands: PicSpec[] = [
  // Full-bleed bands.
  { src: "imgA7R063822.png", alt: "Guests on the deck of the ABN Rajmahal", left: -65, top: 3105, width: 2048, height: 1236, crop: { w: 100, h: 110.44, left: 0, top: -5.21 } },
  { src: "imgA7R087911.png", alt: "The ABN Rajmahal sailing on the Hooghly", left: -67, top: 7719, width: 2048, height: 1236, crop: { w: 100.04, h: 110.52, left: -0.02, top: 0 } },
  { src: "imgA7R080701.png", alt: "River life along the Hooghly", left: -6, top: 15318, width: 1925, height: 1238, crop: { w: 100, h: 103.66, left: 0, top: -0.01 } },
  { src: "imgA7R084482.png", alt: "Sunrise over the river", left: -1, top: 21350, width: 1925, height: 1238, crop: { w: 114.84, h: 216.88, left: -0.02, top: -30.55 } },
  { src: "imgScreenshot20261008At125814Am2.png", alt: "The river at dusk", left: -1, top: 25678, width: 1920, height: 1233, crop: { w: 100.03, h: 233.83, left: -0.06, top: -14.75 } },
];

const gallery: PicSpec[] = [
  // Setting Sail on the Hooghly
  { src: "imgDsc0847445.png", alt: "Ghat on the Hooghly", left: 1125, top: 4570, width: 513, height: 769 },
  { src: "imgDsc0071517.png", alt: "Setting sail from Calcutta", left: 302, top: 5784, width: 858, height: 686, crop: { w: 119.93, h: 100.01, left: -10.02, top: 0.04 } },
  { src: "img0D3A80823.png", alt: "Detail aboard the ship", left: 1180, top: 5782, width: 458, height: 706, crop: { w: 273.75, h: 118.53, left: -111.52, top: -15.7 } },
  { src: "imgDsc0847443.png", alt: "Craft along the river", left: 302, top: 6488, width: 661, height: 931, crop: { w: 100.02, h: 106.46, left: -0.13, top: -4.91 } },
  { src: "imgDsc0847444.png", alt: "Riverside village", left: 981, top: 6488, width: 661, height: 931, crop: { w: 100.02, h: 106.46, left: -0.13, top: -4.91 } },
  // ABN Rajmahal
  { src: "imgScreenshot20261008At120033Am1.png", alt: "The ABN Rajmahal", left: 1184, top: 9290, width: 480, height: 656, crop: { w: 179.55, h: 197.75, left: -58.62, top: -0.04 } },
  { src: "imgA7R081591.png", alt: "Ship interior", left: 306, top: 9983, width: 854, height: 678, crop: { w: 119.09, h: 100.01, left: -9.52, top: -0.01 } },
  { src: "imgA7R078832.png", alt: "Ship detail", left: 1184, top: 9983, width: 482, height: 678, crop: { w: 104.2, h: 111.21, left: -0.02, top: 0 } },
  { src: "imgScreenshot20261007At13835Pm3.png", alt: "Cruise moment", left: 302, top: 10697, width: 419, height: 614, crop: { w: 109.44, h: 112.22, left: -1.39, top: -7.03 } },
  { src: "imgA7R070671.png", alt: "Cruise moment", left: 748, top: 10697, width: 409, height: 614 },
  { src: "imgScreenshot20261007At114333Pm1.png", alt: "Cruise moment", left: 1184, top: 10697, width: 480, height: 614, crop: { w: 190.83, h: 100, left: 0, top: 0 } },
  // The Saloon At Sunrise
  { src: "imgA7R064191.png", alt: "The saloon at sunrise", left: 1178, top: 12877, width: 455, height: 682 },
  { src: "imgDsc0847458.png", alt: "Saloon detail", left: 291, top: 13598, width: 458, height: 686, crop: { w: 112.16, h: 112.35, left: -5.65, top: -2.68 } },
  { src: "imgDsc0071522.png", alt: "Saloon detail", left: 771, top: 13598, width: 858, height: 686, crop: { w: 119.93, h: 100.01, left: -10.02, top: 0.04 } },
  { src: "imgA7R080412.png", alt: "Morning in the saloon", left: 258, top: 14323, width: 887, height: 686, crop: { w: 116.01, h: 100.01, left: -3.16, top: 0.04 } },
  { src: "imgDsc0847465.png", alt: "Saloon detail", left: 1166, top: 14323, width: 463, height: 686, crop: { w: 98.86, h: 100.4, left: 1.14, top: -0.9 } },
  // The River Cruise Spaces
  { src: "imgA7R058472.png", alt: "Cruise space", left: 1166, top: 16894, width: 480, height: 686, crop: { w: 114.31, h: 120, left: -11.36, top: -13.18 } },
  { src: "imgDsc0071526.png", alt: "Cruise space", left: 284, top: 17598, width: 858, height: 686, crop: { w: 119.93, h: 100.01, left: -10.02, top: 0.04 } },
  { src: "imgA7R071523.png", alt: "Cruise space", left: 1166, top: 17600, width: 480, height: 687, crop: { w: 115.43, h: 121, left: 0.04, top: -17.96 } },
  { src: "imgA7R056532.png", alt: "Cruise space", left: 274, top: 18320, width: 479, height: 686, crop: { w: 144.17, h: 151.08, left: -0.01, top: -46.28 } },
  { src: "imgDsc0071527.png", alt: "Cruise space", left: 788, top: 18320, width: 858, height: 686, crop: { w: 119.93, h: 100.01, left: -19.96, top: 0.04 } },
  { src: "imgA7R085101.png", alt: "Cruise space", left: 269, top: 19044, width: 1376, height: 917 },
  { src: "imgA7R084861.png", alt: "Cruise space", left: 711, top: 20236, width: 494, height: 841, crop: { w: 122.69, h: 108.01, left: -0.01, top: 0 } },
  // The Bengal Experience
  { src: "imgA7R077811.png", alt: "Bengal experience", left: 1156, top: 22878, width: 457, height: 692, crop: { w: 100.08, h: 100, left: -0.04, top: 0 } },
  { src: "imgA7R077612.png", alt: "Bengal experience", left: 1156, top: 23596, width: 457, height: 592, crop: { w: 194.42, h: 100.01, left: -41.77, top: -0.01 } },
  { src: "imgScreenshot20261007At112251Pm1.png", alt: "Bengal experience", left: 274, top: 23602, width: 859, height: 594, crop: { w: 106.64, h: 103.37, left: -6.64, top: -3.37 } },
  { src: "imgDsc0847451.png", alt: "Bengal experience", left: 274, top: 24213, width: 1340, height: 686, crop: { w: 101.24, h: 300, left: -0.63, top: -60.47 } },
  { src: "imgScreenshot20261008At125446Am1.png", alt: "Bengal experience", left: 274, top: 24916, width: 457, height: 600, crop: { w: 101.09, h: 115.5, left: -1.09, top: -1.02 } },
  { src: "imgScreenshot20261008At125814Am2.png", alt: "Bengal experience", left: 755, top: 24916, width: 859, height: 600, crop: { w: 100.03, h: 215, left: -0.02, top: -55.33 } },
  { src: "imgScreenshot20261008At125119Am1.png", alt: "Bengal experience", left: 755, top: 24920, width: 858, height: 592, crop: { w: 107.46, h: 104.15, left: -7.46, top: -0.01 } },
];

const portraitCrop: Crop = { w: 130.98, h: 110.25, left: 0, top: -5.06 };

export function AssamBengalNavigationPage() {
  const [introExpanded, setIntroExpanded] = useState(false);
  const [sailExpanded, setSailExpanded] = useState(false);
  // Which film the second portrait's carousel is pointing at.
  const [filmIndex, setFilmIndex] = useState(0);

  // The portrait + play triangle sit right under the intro (Figma y1937).
  // When the intro expands, measure its bottom and push them down by the
  // overflow so nothing collides.
  const introRef = useRef<HTMLDivElement>(null);
  const [portraitShift, setPortraitShift] = useState(0);

  useLayoutEffect(() => {
    const el = introRef.current;
    if (!el) return;

    const measure = () => {
      const canvas = el.offsetParent as HTMLElement | null;
      if (!canvas) return;
      const unit = canvas.clientWidth / 1920;
      const bottomFigma = (el.offsetTop + el.offsetHeight) / unit;
      const overflow = bottomFigma + 64 - 1937;
      setPortraitShift(introExpanded && overflow > 0 ? overflow : 0);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const parent = el.offsetParent as HTMLElement | null;
    if (parent) ro.observe(parent);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [introExpanded]);

  return (
    <div className={tw.page}>
      <HeroHeader menuOnly />

      <div className={tw.canvas}>
        {/* ============ HERO (two stacked fills) ============ */}
        <Pic
          src="img461Ff345C41Bffd3Be4D10F9926B9Eff1.png"
          alt="The ABN Rajmahal on the Hooghly River"
          left={-21}
          top={-22}
          width={1941}
          height={1086}
          crop={{ w: 100.01, h: 143, left: -0.01, top: -16.29 }}
          priority
        />
        <Pic
          src="img461Ff345C41Bffd3Be4D10F9926B9Eff2.png"
          alt=""
          left={-21}
          top={-22}
          width={1941}
          height={1086}
          crop={{ w: 100, h: 119.02, left: 0, top: -14.83 }}
          priority
        />

        <p className={`${tw.abs} ${tw.eyebrow}`} style={{ left: v(75), top: v(526), width: v(348) }}>
          2026 / ২০২৬
        </p>
        <p
          className={`${tw.abs} ${tw.eyebrow} text-right`}
          style={{ left: v(1441), top: v(526), width: v(348) }}
        >
          AJC in Bengal / বাংলা
        </p>

        {/* ============ TITLE + CREDITS + INTRO ============ */}
        <h1 className={`${tw.abs} ${tw.bigTitle}`} style={{ left: v(108), top: v(1232), width: v(1088) }}>
          Assam Bengal Navigation
        </h1>
        <div className={`${tw.abs} ${tw.credits}`} style={{ left: v(108), top: v(1438), width: v(523) }}>
          <p>Creative Direction</p>
          <p>Photography</p>
          <p>Videography</p>
          <p>Sound Design</p>
        </div>
        <ReadMoreCopy
          ref={introRef}
          left={971}
          top={1438}
          width={652}
          lead={INTRO_LEAD}
          expandedTail={INTRO_MORE}
          expanded={introExpanded}
          onToggle={() => setIntroExpanded((p) => !p)}
        />

        {/* Portrait film — plays inline. Shifts down with an expanded intro. */}
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={{ transform: `translateY(${v(portraitShift)})` }}
        >
          <InlineFilm
            film={FILMS[0]}
            left={719}
            top={1937}
            width={481}
            height={859}
            label="Play the Assam Bengal Navigation film"
          />
        </div>

        {/* ============ SETTING SAIL ON THE HOOGHLY ============ */}
        <ReadMoreCopy
          left={134}
          top={5072}
          width={652}
          lead={SAIL_LEAD}
          collapsedTail={SAIL_COLLAPSED}
          expandedTail={SAIL_MORE}
          expanded={sailExpanded}
          onToggle={() => setSailExpanded((p) => !p)}
        />
        <h2 className={`${tw.abs} ${tw.sectionTitle}`} style={{ left: v(302), top: v(5639), width: v(827) }}>
          Setting Sail on the Hooghly
        </h2>

        {/* ============ HEADINGS ============ */}
        <h2 className={`${tw.abs} ${tw.sectionTitle}`} style={{ left: v(306), top: v(9243), width: v(827) }}>
          ABN Rajmahal
        </h2>
        <h2 className={`${tw.abs} ${tw.sectionTitle}`} style={{ left: v(291), top: v(12875), width: v(827) }}>
          The Saloon
          <br />
          At Sunrise
        </h2>
        <h2 className={`${tw.abs} ${tw.sectionTitle}`} style={{ left: v(274), top: v(16892), width: v(827) }}>
          The River Cruise
          <br />
          Spaces
        </h2>
        <h2 className={`${tw.abs} ${tw.sectionTitle}`} style={{ left: v(274), top: v(22836), width: v(827) }}>
          The Bengal
          <br />
          Experience
        </h2>

        {/* ============ IMAGES ============ */}
        {bands.slice(0, 4).map((p) => (
          <Pic key={`${p.src}-${p.top}`} {...p} />
        ))}
        {gallery.map((p) => (
          <Pic key={`${p.src}-${p.left}-${p.top}`} {...p} />
        ))}
        <Pic {...bands[4]} />

        {/* Second portrait — a film carousel. The ‹ › arrows step through the
            project films (the poster visibly changes); the play triangle plays
            the current film inline. `key` re-mounts the player per film so it
            resets to the new poster. */}
        <InlineFilm
          key={filmIndex}
          film={FILMS[filmIndex]}
          left={719}
          top={11666}
          width={481}
          height={859}
          label={`Play film ${filmIndex + 1} of ${FILMS.length}`}
        />
        <button
          type="button"
          aria-label="Previous film"
          onClick={() => setFilmIndex((i) => (i - 1 + FILMS.length) % FILMS.length)}
          className={`${tw.abs} ${tw.arrow} cursor-pointer transition-opacity hover:opacity-60`}
          style={{ left: v(254), top: v(12033), width: v(73) }}
        >
          &lt;
        </button>
        <button
          type="button"
          aria-label="Next film"
          onClick={() => setFilmIndex((i) => (i + 1) % FILMS.length)}
          className={`${tw.abs} ${tw.arrow} cursor-pointer transition-opacity hover:opacity-60`}
          style={{ left: v(1591), top: v(12033), width: v(73) }}
        >
          &gt;
        </button>

        {/* Pull quote over the full-bleed band */}
        <p
          className="absolute text-center font-cormorant font-medium text-[#f8f7f2] text-[length:calc(40*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-2.4*var(--u))]"
          style={{ left: v(328), top: v(26329), width: v(1262) }}
        >
          “You realise, India is this, and here, in the East, as profoundly as it is anywhere else.”
        </p>

        {/* ============ FEATURES ============ */}
        <h2 className={`${tw.abs} ${tw.bigTitle}`} style={{ left: v(169), top: v(27075), width: v(868) }}>
          Features
        </h2>
        <PressLogo
          src="imgImage62.png"
          alt="Read the Assam Bengal Navigation feature in The New York Times"
          href="https://www.nytimes.com/2008/12/21/travel/21personal.html?pagewanted=all&_r=1&"
          left={169}
          top={27225}
          width={457}
          height={99}
          crop={{ w: 100, h: 259.66, left: 0, top: -79.83 }}
        />
        <PressLogo
          src="imgImage4.png"
          alt="Read the Assam Bengal Navigation feature in Condé Nast Traveler"
          href="https://www.cntraveler.com/story/brahmaputra-river-cruise-in-india-with-andbeyond"
          left={711}
          top={27225}
          width={214}
          height={76}
        />
        <PressLogo
          src="imgImage63.png"
          alt="Read the Assam Bengal Navigation feature on CNN Travel"
          href="https://edition.cnn.com/travel/article/adventure-cruises"
          left={1009}
          top={27225}
          width={152}
          height={84}
          crop={{ w: 100, h: 85.82, left: 0, top: 7.09 }}
        />
        <PressLogo
          src="imgImage66.png"
          alt="Read the Assam Bengal Navigation feature in The Guardian"
          href="https://www.theguardian.com/travel/2016/feb/27/worlds-40-best-cruise-holidays"
          left={1287}
          top={27221}
          width={242}
          height={83}
          crop={{ w: 100.35, h: 164.94, left: -0.17, top: -31.17 }}
        />
        <PressLogo
          src="imgImage65.png"
          alt="Read the Assam Bengal Navigation feature in Smithsonian Magazine"
          href="https://www.smithsonianmag.com/travel/flower-markets-colonial-forts-shrines-battlefields-take-journey-into-india-180987171/"
          left={1650}
          top={27197}
          width={110}
          height={127}
        />

        {/* ============ TEAM ============ */}
        <h2 className={`${tw.abs} ${tw.bigTitle} whitespace-nowrap`} style={{ left: v(161), top: v(27444) }}>
          Team
        </h2>
        <p className={`${tw.abs} ${tw.bodyBold} uppercase`} style={{ left: v(444), top: v(27459), width: v(184) }}>
          PHOTOGRAPHY
        </p>
        <p className={`${tw.abs} ${tw.body} whitespace-nowrap uppercase`} style={{ left: v(780), top: v(27459) }}>
          ansen antony
        </p>
        <p className={`${tw.abs} ${tw.bodyBold} uppercase`} style={{ left: v(444), top: v(27493), width: v(248) }}>
          Film &amp; Sound Design
        </p>
        <p className={`${tw.abs} ${tw.body} whitespace-nowrap uppercase`} style={{ left: v(780), top: v(27493) }}>
          Saksham khanna
        </p>

        {/* ============ NEXT PROJECT ============ */}
        <p
          className={`${tw.abs} font-cormorant font-bold text-[#7d7062] text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))] text-center`}
          style={{ left: v(905), top: v(27825), width: v(110) }}
          aria-hidden
        >
          &gt;
        </p>
        <Link
          href="/work/alchi-kitchen"
          className={`${tw.abs} ${tw.sectionTitle} block text-center`}
          style={{ left: v(654), top: v(27912), width: v(612) }}
        >
          Next Project
        </Link>
        <p
          className={`${tw.abs} ${tw.body} uppercase text-center whitespace-nowrap`}
          style={{ left: v(810), top: v(28011), width: v(300) }}
        >
          Alchi Kitchen
        </p>
      </div>
    </div>
  );
}
