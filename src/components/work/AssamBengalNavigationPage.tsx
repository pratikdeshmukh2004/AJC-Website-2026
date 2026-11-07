"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroHeader } from "@/components/home/HeroHeader";
import { ReadMoreCopy } from "@/components/work/ReadMoreCopy";
import { assetPath, cn } from "@/lib/utils";

/*
  Assam Bengal Navigation — reproduction of the Figma project-page frame
  "Assam Bengal Navigation" (node 3232:191, 1920 x 29323) for AJC-24.

  Same technique as the About / Haveli / Neemrana pages: an absolutely
  positioned canvas where `--u` = 1 Figma px = 100cqw / 1920, so every Figma
  coordinate is written `calc(<px>*var(--u))` and the layout scales
  proportionally with the viewport (exact at 1920px, smaller below).

  Colours use the design tokens: cream #fdfbf4 (page), taupe #7d7062
  (headings), sage #9b9484 (body). Figma percentage offsets were converted to
  px against the 1920 x 29323 frame; image crops are the Figma fill offsets.
*/

// String srcs are not basePath-prefixed by next/image / <video>, so prefix
// them here (required on GitHub Pages, which serves the site under a subpath).
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

/**
 * Absolutely-positioned image box. `className` positions/sizes the box in
 * canvas units; `imgClassName` is the Figma crop (defaults to a plain
 * object-cover fill). With `href` the image becomes an external press link.
 */
function Pic({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  href,
}: {
  src: string;
  alt: string;
  className: string;
  imgClassName?: string;
  priority?: boolean;
  href?: string;
}) {
  const image = (
    <Image
      src={`${IMG}/${src}`}
      alt={alt}
      width={1920}
      height={1080}
      priority={priority}
      sizes="(min-width: 1920px) 1920px, 100vw"
      className={cn("absolute max-w-none", imgClassName ?? "inset-0 h-full w-full object-cover")}
    />
  );

  return (
    <div className={cn("absolute overflow-hidden", className)}>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={alt}
          className="block h-full w-full transition-opacity duration-300 hover:opacity-70"
        >
          {image}
        </a>
      ) : (
        image
      )}
    </div>
  );
}

/**
 * A film that plays inline, inside its own Figma box — no popup. Shows the
 * poster + centred play triangle; on click the same box swaps to a <video>
 * with native controls that plays right there.
 */
function InlineFilm({ film, className, label }: { film: Film; className: string; label: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={cn("absolute overflow-hidden", className)}>
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
          {/* Raw <img>: the poster is a runtime video frame, not a build-time asset. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={film.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
          {/* White play triangle (Figma Polygon), rotated to point right. */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 flex h-[calc(31*var(--u))] w-[calc(30*var(--u))] -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-transform duration-300 group-hover:scale-125"
          >
            <svg viewBox="0 0 56.2917 48.75" className="h-full w-full rotate-90" fill="white">
              <path d="M28.1458 0L56.2917 48.75H0L28.1458 0Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

export function AssamBengalNavigationPage() {
  const [introExpanded, setIntroExpanded] = useState(false);
  const [sailExpanded, setSailExpanded] = useState(false);
  // Which film the second portrait's carousel is pointing at.
  const [filmIndex, setFilmIndex] = useState(0);

  // The portrait film sits right under the intro (Figma y1937). When the intro
  // expands, measure its bottom and push the portrait down by the overflow so
  // nothing collides.
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
    <div className="bg-cream @container relative mx-auto w-full max-w-[1920px] overflow-hidden [--u:calc(100cqw/1920)]">
      {/* Overlay chrome (menu toggle), same as About/home */}
      <HeroHeader menuOnly />

      {/* Canvas ends at the "Alchi Kitchen" label (y28011) plus breathing room. */}
      <div className="relative h-[calc(28250*var(--u))] w-full">
        {/* ============ HERO (two stacked fills) ============ */}
        <Pic
          src="img461Ff345C41Bffd3Be4D10F9926B9Eff1.png"
          alt="The ABN Rajmahal on the Hooghly River"
          className="top-[calc(-22*var(--u))] left-[calc(-21*var(--u))] h-[calc(1086*var(--u))] w-[calc(1941*var(--u))]"
          imgClassName="top-[-16.29%] left-[-0.01%] h-[143%] w-[100.01%]"
          priority
        />
        <Pic
          src="img461Ff345C41Bffd3Be4D10F9926B9Eff2.png"
          alt=""
          className="top-[calc(-22*var(--u))] left-[calc(-21*var(--u))] h-[calc(1086*var(--u))] w-[calc(1941*var(--u))]"
          imgClassName="top-[-14.83%] left-0 h-[119.02%] w-full"
          priority
        />

        <p className="font-helvetica absolute top-[calc(526*var(--u))] left-[calc(75*var(--u))] w-[calc(348*var(--u))] text-[length:calc(28*var(--u))] font-bold tracking-[calc(0.56*var(--u))] text-white uppercase opacity-80">
          2026 / ২০২৬
        </p>
        <p className="font-helvetica absolute top-[calc(526*var(--u))] left-[calc(1441*var(--u))] w-[calc(348*var(--u))] text-right text-[length:calc(28*var(--u))] font-bold tracking-[calc(0.56*var(--u))] text-white uppercase opacity-80">
          AJC in Bengal / বাংলা
        </p>

        {/* ============ TITLE + CREDITS + INTRO ============ */}
        <h1 className="font-cormorant text-taupe absolute top-[calc(1232*var(--u))] left-[calc(108*var(--u))] w-[calc(1088*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]">
          Assam Bengal Navigation
        </h1>
        <div className="font-helvetica-regular text-taupe absolute top-[calc(1438*var(--u))] left-[calc(108*var(--u))] w-[calc(523*var(--u))] text-[length:calc(28*var(--u))] leading-[0.9976] tracking-[calc(0.56*var(--u))] uppercase opacity-80">
          <p>Creative Direction</p>
          <p>Photography</p>
          <p>Videography</p>
          <p>Sound Design</p>
        </div>
        <ReadMoreCopy
          ref={introRef}
          className="top-[calc(1438*var(--u))] left-[calc(971*var(--u))] w-[calc(652*var(--u))]"
          lead={INTRO_LEAD}
          expandedTail={INTRO_MORE}
          expanded={introExpanded}
          onToggle={() => setIntroExpanded((prev) => !prev)}
        />

        {/* Portrait film — plays inline. Shifts down with an expanded intro. */}
        <div
          className="pointer-events-none absolute inset-0 transition-transform duration-500 ease-out"
          style={{ transform: `translateY(calc(${portraitShift} * var(--u)))` }}
        >
          <InlineFilm
            film={FILMS[0]}
            className="pointer-events-auto top-[calc(1937*var(--u))] left-[calc(719*var(--u))] h-[calc(859*var(--u))] w-[calc(481*var(--u))]"
            label="Play the Assam Bengal Navigation film"
          />
        </div>

        {/* ============ SETTING SAIL ON THE HOOGHLY ============ */}
        <ReadMoreCopy
          className="top-[calc(5072*var(--u))] left-[calc(134*var(--u))] w-[calc(652*var(--u))]"
          lead={SAIL_LEAD}
          collapsedTail={SAIL_COLLAPSED}
          expandedTail={SAIL_MORE}
          expanded={sailExpanded}
          onToggle={() => setSailExpanded((prev) => !prev)}
        />
        <h2 className="font-cormorant text-taupe absolute top-[calc(5639*var(--u))] left-[calc(302*var(--u))] w-[calc(827*var(--u))] text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]">
          Setting Sail on the Hooghly
        </h2>

        {/* ============ SECTION HEADINGS ============ */}
        <h2 className="font-cormorant text-taupe absolute top-[calc(9243*var(--u))] left-[calc(306*var(--u))] w-[calc(827*var(--u))] text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]">
          ABN Rajmahal
        </h2>
        <h2 className="font-cormorant text-taupe absolute top-[calc(12875*var(--u))] left-[calc(291*var(--u))] w-[calc(827*var(--u))] text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]">
          The Saloon
          <br />
          At Sunrise
        </h2>
        <h2 className="font-cormorant text-taupe absolute top-[calc(16892*var(--u))] left-[calc(274*var(--u))] w-[calc(827*var(--u))] text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]">
          The River Cruise
          <br />
          Spaces
        </h2>
        <h2 className="font-cormorant text-taupe absolute top-[calc(22836*var(--u))] left-[calc(274*var(--u))] w-[calc(827*var(--u))] text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]">
          The Bengal
          <br />
          Experience
        </h2>

        {/* ============ FULL-BLEED BANDS ============ */}
        <Pic
          src="imgA7R063822.png"
          alt="Guests on the deck of the ABN Rajmahal"
          className="top-[calc(3105*var(--u))] left-[calc(-65*var(--u))] h-[calc(1236*var(--u))] w-[calc(2048*var(--u))]"
          imgClassName="top-[-5.21%] left-0 h-[110.44%] w-full"
        />
        <Pic
          src="imgA7R087911.png"
          alt="The ABN Rajmahal sailing on the Hooghly"
          className="top-[calc(7719*var(--u))] left-[calc(-67*var(--u))] h-[calc(1236*var(--u))] w-[calc(2048*var(--u))]"
          imgClassName="top-0 left-[-0.02%] h-[110.52%] w-[100.04%]"
        />
        <Pic
          src="imgA7R080701.png"
          alt="River life along the Hooghly"
          className="top-[calc(15318*var(--u))] left-[calc(-6*var(--u))] h-[calc(1238*var(--u))] w-[calc(1925*var(--u))]"
          imgClassName="top-[-0.01%] left-0 h-[103.66%] w-full"
        />
        <Pic
          src="imgA7R084482.png"
          alt="Sunrise over the river"
          className="top-[calc(21350*var(--u))] left-[calc(-1*var(--u))] h-[calc(1238*var(--u))] w-[calc(1925*var(--u))]"
          imgClassName="top-[-30.55%] left-[-0.02%] h-[216.88%] w-[114.84%]"
        />

        {/* ============ SETTING SAIL ON THE HOOGHLY — GALLERY ============ */}
        <Pic
          src="imgDsc0847445.png"
          alt="Ghat on the Hooghly"
          className="top-[calc(4570*var(--u))] left-[calc(1125*var(--u))] h-[calc(769*var(--u))] w-[calc(513*var(--u))]"
        />
        <Pic
          src="imgDsc0071517.png"
          alt="Setting sail from Calcutta"
          className="top-[calc(5784*var(--u))] left-[calc(302*var(--u))] h-[calc(686*var(--u))] w-[calc(858*var(--u))]"
          imgClassName="top-[0.04%] left-[-10.02%] h-[100.01%] w-[119.93%]"
        />
        <Pic
          src="img0D3A80823.png"
          alt="Detail aboard the ship"
          className="top-[calc(5782*var(--u))] left-[calc(1180*var(--u))] h-[calc(706*var(--u))] w-[calc(458*var(--u))]"
          imgClassName="top-[-15.7%] left-[-111.52%] h-[118.53%] w-[273.75%]"
        />
        <Pic
          src="imgDsc0847443.png"
          alt="Craft along the river"
          className="top-[calc(6488*var(--u))] left-[calc(302*var(--u))] h-[calc(931*var(--u))] w-[calc(661*var(--u))]"
          imgClassName="top-[-4.91%] left-[-0.13%] h-[106.46%] w-[100.02%]"
        />
        <Pic
          src="imgDsc0847444.png"
          alt="Riverside village"
          className="top-[calc(6488*var(--u))] left-[calc(981*var(--u))] h-[calc(931*var(--u))] w-[calc(661*var(--u))]"
          imgClassName="top-[-4.91%] left-[-0.13%] h-[106.46%] w-[100.02%]"
        />

        {/* ============ ABN RAJMAHAL — GALLERY ============ */}
        <Pic
          src="imgScreenshot20261008At120033Am1.png"
          alt="The ABN Rajmahal"
          className="top-[calc(9290*var(--u))] left-[calc(1184*var(--u))] h-[calc(656*var(--u))] w-[calc(480*var(--u))]"
          imgClassName="top-[-0.04%] left-[-58.62%] h-[197.75%] w-[179.55%]"
        />
        <Pic
          src="imgA7R081591.png"
          alt="Ship interior"
          className="top-[calc(9983*var(--u))] left-[calc(306*var(--u))] h-[calc(678*var(--u))] w-[calc(854*var(--u))]"
          imgClassName="top-[-0.01%] left-[-9.52%] h-[100.01%] w-[119.09%]"
        />
        <Pic
          src="imgA7R078832.png"
          alt="Ship detail"
          className="top-[calc(9983*var(--u))] left-[calc(1184*var(--u))] h-[calc(678*var(--u))] w-[calc(482*var(--u))]"
          imgClassName="top-0 left-[-0.02%] h-[111.21%] w-[104.2%]"
        />
        <Pic
          src="imgScreenshot20261007At13835Pm3.png"
          alt="Cruise moment"
          className="top-[calc(10697*var(--u))] left-[calc(302*var(--u))] h-[calc(614*var(--u))] w-[calc(419*var(--u))]"
          imgClassName="top-[-7.03%] left-[-1.39%] h-[112.22%] w-[109.44%]"
        />
        <Pic
          src="imgA7R070671.png"
          alt="Cruise moment"
          className="top-[calc(10697*var(--u))] left-[calc(748*var(--u))] h-[calc(614*var(--u))] w-[calc(409*var(--u))]"
        />
        <Pic
          src="imgScreenshot20261007At114333Pm1.png"
          alt="Cruise moment"
          className="top-[calc(10697*var(--u))] left-[calc(1184*var(--u))] h-[calc(614*var(--u))] w-[calc(480*var(--u))]"
          imgClassName="top-0 left-0 h-full w-[190.83%]"
        />

        {/* ============ THE SALOON AT SUNRISE — GALLERY ============ */}
        <Pic
          src="imgA7R064191.png"
          alt="The saloon at sunrise"
          className="top-[calc(12877*var(--u))] left-[calc(1178*var(--u))] h-[calc(682*var(--u))] w-[calc(455*var(--u))]"
        />
        <Pic
          src="imgDsc0847458.png"
          alt="Saloon detail"
          className="top-[calc(13598*var(--u))] left-[calc(291*var(--u))] h-[calc(686*var(--u))] w-[calc(458*var(--u))]"
          imgClassName="top-[-2.68%] left-[-5.65%] h-[112.35%] w-[112.16%]"
        />
        <Pic
          src="imgDsc0071522.png"
          alt="Saloon detail"
          className="top-[calc(13598*var(--u))] left-[calc(771*var(--u))] h-[calc(686*var(--u))] w-[calc(858*var(--u))]"
          imgClassName="top-[0.04%] left-[-10.02%] h-[100.01%] w-[119.93%]"
        />
        <Pic
          src="imgA7R080412.png"
          alt="Morning in the saloon"
          className="top-[calc(14323*var(--u))] left-[calc(258*var(--u))] h-[calc(686*var(--u))] w-[calc(887*var(--u))]"
          imgClassName="top-[0.04%] left-[-3.16%] h-[100.01%] w-[116.01%]"
        />
        <Pic
          src="imgDsc0847465.png"
          alt="Saloon detail"
          className="top-[calc(14323*var(--u))] left-[calc(1166*var(--u))] h-[calc(686*var(--u))] w-[calc(463*var(--u))]"
          imgClassName="top-[-0.9%] left-[1.14%] h-[100.4%] w-[98.86%]"
        />

        {/* ============ THE RIVER CRUISE SPACES — GALLERY ============ */}
        <Pic
          src="imgA7R058472.png"
          alt="Cruise space"
          className="top-[calc(16894*var(--u))] left-[calc(1166*var(--u))] h-[calc(686*var(--u))] w-[calc(480*var(--u))]"
          imgClassName="top-[-13.18%] left-[-11.36%] h-[120%] w-[114.31%]"
        />
        <Pic
          src="imgDsc0071526.png"
          alt="Cruise space"
          className="top-[calc(17598*var(--u))] left-[calc(284*var(--u))] h-[calc(686*var(--u))] w-[calc(858*var(--u))]"
          imgClassName="top-[0.04%] left-[-10.02%] h-[100.01%] w-[119.93%]"
        />
        <Pic
          src="imgA7R071523.png"
          alt="Cruise space"
          className="top-[calc(17600*var(--u))] left-[calc(1166*var(--u))] h-[calc(687*var(--u))] w-[calc(480*var(--u))]"
          imgClassName="top-[-17.96%] left-[0.04%] h-[121%] w-[115.43%]"
        />
        <Pic
          src="imgA7R056532.png"
          alt="Cruise space"
          className="top-[calc(18320*var(--u))] left-[calc(274*var(--u))] h-[calc(686*var(--u))] w-[calc(479*var(--u))]"
          imgClassName="top-[-46.28%] left-[-0.01%] h-[151.08%] w-[144.17%]"
        />
        <Pic
          src="imgDsc0071527.png"
          alt="Cruise space"
          className="top-[calc(18320*var(--u))] left-[calc(788*var(--u))] h-[calc(686*var(--u))] w-[calc(858*var(--u))]"
          imgClassName="top-[0.04%] left-[-19.96%] h-[100.01%] w-[119.93%]"
        />
        <Pic
          src="imgA7R085101.png"
          alt="Cruise space"
          className="top-[calc(19044*var(--u))] left-[calc(269*var(--u))] h-[calc(917*var(--u))] w-[calc(1376*var(--u))]"
        />
        <Pic
          src="imgA7R084861.png"
          alt="Cruise space"
          className="top-[calc(20236*var(--u))] left-[calc(711*var(--u))] h-[calc(841*var(--u))] w-[calc(494*var(--u))]"
          imgClassName="top-0 left-[-0.01%] h-[108.01%] w-[122.69%]"
        />

        {/* ============ THE BENGAL EXPERIENCE — GALLERY ============ */}
        <Pic
          src="imgA7R077811.png"
          alt="Bengal experience"
          className="top-[calc(22878*var(--u))] left-[calc(1156*var(--u))] h-[calc(692*var(--u))] w-[calc(457*var(--u))]"
          imgClassName="top-0 left-[-0.04%] h-full w-[100.08%]"
        />
        <Pic
          src="imgA7R077612.png"
          alt="Bengal experience"
          className="top-[calc(23596*var(--u))] left-[calc(1156*var(--u))] h-[calc(592*var(--u))] w-[calc(457*var(--u))]"
          imgClassName="top-[-0.01%] left-[-41.77%] h-[100.01%] w-[194.42%]"
        />
        <Pic
          src="imgScreenshot20261007At112251Pm1.png"
          alt="Bengal experience"
          className="top-[calc(23602*var(--u))] left-[calc(274*var(--u))] h-[calc(594*var(--u))] w-[calc(859*var(--u))]"
          imgClassName="top-[-3.37%] left-[-6.64%] h-[103.37%] w-[106.64%]"
        />
        <Pic
          src="imgDsc0847451.png"
          alt="Bengal experience"
          className="top-[calc(24213*var(--u))] left-[calc(274*var(--u))] h-[calc(686*var(--u))] w-[calc(1340*var(--u))]"
          imgClassName="top-[-60.47%] left-[-0.63%] h-[300%] w-[101.24%]"
        />
        <Pic
          src="imgScreenshot20261008At125446Am1.png"
          alt="Bengal experience"
          className="top-[calc(24916*var(--u))] left-[calc(274*var(--u))] h-[calc(600*var(--u))] w-[calc(457*var(--u))]"
          imgClassName="top-[-1.02%] left-[-1.09%] h-[115.5%] w-[101.09%]"
        />
        <Pic
          src="imgScreenshot20261008At125814Am2.png"
          alt="Bengal experience"
          className="top-[calc(24916*var(--u))] left-[calc(755*var(--u))] h-[calc(600*var(--u))] w-[calc(859*var(--u))]"
          imgClassName="top-[-55.33%] left-[-0.02%] h-[215%] w-[100.03%]"
        />
        <Pic
          src="imgScreenshot20261008At125119Am1.png"
          alt="Bengal experience"
          className="top-[calc(24920*var(--u))] left-[calc(755*var(--u))] h-[calc(592*var(--u))] w-[calc(858*var(--u))]"
          imgClassName="top-[-0.01%] left-[-7.46%] h-[104.15%] w-[107.46%]"
        />

        {/* Closing full-bleed band (sits above the gallery, under the quote) */}
        <Pic
          src="imgScreenshot20261008At125814Am2.png"
          alt="The river at dusk"
          className="top-[calc(25678*var(--u))] left-[calc(-1*var(--u))] h-[calc(1233*var(--u))] w-[calc(1920*var(--u))]"
          imgClassName="top-[-14.75%] left-[-0.06%] h-[233.83%] w-[100.03%]"
        />

        {/* ============ FILM CAROUSEL ============
            The ‹ › arrows step through the project films (the poster visibly
            changes); the play triangle plays the current film inline. `key`
            re-mounts the player per film so it resets to the new poster. */}
        <InlineFilm
          key={filmIndex}
          film={FILMS[filmIndex]}
          className="top-[calc(11666*var(--u))] left-[calc(719*var(--u))] h-[calc(859*var(--u))] w-[calc(481*var(--u))]"
          label={`Play film ${filmIndex + 1} of ${FILMS.length}`}
        />
        <button
          type="button"
          aria-label="Previous film"
          onClick={() => setFilmIndex((i) => (i - 1 + FILMS.length) % FILMS.length)}
          className="font-helvetica text-sage absolute top-[calc(12033*var(--u))] left-[calc(254*var(--u))] w-[calc(73*var(--u))] cursor-pointer text-center text-[length:calc(46*var(--u))] leading-none font-bold tracking-[calc(0.92*var(--u))] transition-opacity hover:opacity-60"
        >
          &lt;
        </button>
        <button
          type="button"
          aria-label="Next film"
          onClick={() => setFilmIndex((i) => (i + 1) % FILMS.length)}
          className="font-helvetica text-sage absolute top-[calc(12033*var(--u))] left-[calc(1591*var(--u))] w-[calc(73*var(--u))] cursor-pointer text-center text-[length:calc(46*var(--u))] leading-none font-bold tracking-[calc(0.92*var(--u))] transition-opacity hover:opacity-60"
        >
          &gt;
        </button>

        {/* Pull quote over the full-bleed band */}
        <p className="font-cormorant absolute top-[calc(26329*var(--u))] left-[calc(328*var(--u))] w-[calc(1262*var(--u))] text-center text-[length:calc(40*var(--u))] leading-[calc(76*var(--u))] font-medium tracking-[calc(-2.4*var(--u))] text-[#f8f7f2]">
          “You realise, India is this, and here, in the East, as profoundly as it is anywhere else.”
        </p>

        {/* ============ FEATURES ============ */}
        <h2 className="font-cormorant text-taupe absolute top-[calc(27075*var(--u))] left-[calc(169*var(--u))] w-[calc(868*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]">
          Features
        </h2>
        <Pic
          src="imgImage62.png"
          alt="Read the Assam Bengal Navigation feature in The New York Times"
          href="https://www.nytimes.com/2008/12/21/travel/21personal.html?pagewanted=all&_r=1&"
          className="top-[calc(27225*var(--u))] left-[calc(169*var(--u))] h-[calc(99*var(--u))] w-[calc(457*var(--u))]"
          imgClassName="top-[-79.83%] left-0 h-[259.66%] w-full"
        />
        <Pic
          src="imgImage4.png"
          alt="Read the Assam Bengal Navigation feature in Condé Nast Traveler"
          href="https://www.cntraveler.com/story/brahmaputra-river-cruise-in-india-with-andbeyond"
          className="top-[calc(27225*var(--u))] left-[calc(711*var(--u))] h-[calc(76*var(--u))] w-[calc(214*var(--u))]"
        />
        <Pic
          src="imgImage63.png"
          alt="Read the Assam Bengal Navigation feature on CNN Travel"
          href="https://edition.cnn.com/travel/article/adventure-cruises"
          className="top-[calc(27225*var(--u))] left-[calc(1009*var(--u))] h-[calc(84*var(--u))] w-[calc(152*var(--u))]"
          imgClassName="top-[7.09%] left-0 h-[85.82%] w-full"
        />
        <Pic
          src="imgImage66.png"
          alt="Read the Assam Bengal Navigation feature in The Guardian"
          href="https://www.theguardian.com/travel/2016/feb/27/worlds-40-best-cruise-holidays"
          className="top-[calc(27221*var(--u))] left-[calc(1287*var(--u))] h-[calc(83*var(--u))] w-[calc(242*var(--u))]"
          imgClassName="top-[-31.17%] left-[-0.17%] h-[164.94%] w-[100.35%]"
        />
        <Pic
          src="imgImage65.png"
          alt="Read the Assam Bengal Navigation feature in Smithsonian Magazine"
          href="https://www.smithsonianmag.com/travel/flower-markets-colonial-forts-shrines-battlefields-take-journey-into-india-180987171/"
          className="top-[calc(27197*var(--u))] left-[calc(1650*var(--u))] h-[calc(127*var(--u))] w-[calc(110*var(--u))]"
        />

        {/* ============ TEAM ============ */}
        <h2 className="font-cormorant text-taupe absolute top-[calc(27444*var(--u))] left-[calc(161*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))] whitespace-nowrap">
          Team
        </h2>
        <p className="font-helvetica text-sage absolute top-[calc(27459*var(--u))] left-[calc(444*var(--u))] w-[calc(184*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] uppercase">
          Photography
        </p>
        <p className="font-helvetica-regular text-sage absolute top-[calc(27459*var(--u))] left-[calc(780*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
          Ansen Antony
        </p>
        <p className="font-helvetica text-sage absolute top-[calc(27493*var(--u))] left-[calc(444*var(--u))] w-[calc(248*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] uppercase">
          Film &amp; Sound Design
        </p>
        <p className="font-helvetica-regular text-sage absolute top-[calc(27493*var(--u))] left-[calc(780*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
          Saksham Khanna
        </p>

        {/* ============ NEXT PROJECT ============ */}
        <p
          aria-hidden
          className="font-cormorant text-taupe absolute top-[calc(27825*var(--u))] left-[calc(905*var(--u))] w-[calc(110*var(--u))] text-center text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] font-bold tracking-[calc(-4.8*var(--u))]"
        >
          &gt;
        </p>
        <Link
          href="/work/alchi-kitchen"
          className="font-cormorant text-taupe absolute top-[calc(27912*var(--u))] left-[calc(654*var(--u))] block w-[calc(612*var(--u))] text-center text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]"
        >
          Next Project
        </Link>
        <p className="font-helvetica-regular text-sage absolute top-[calc(28011*var(--u))] left-[calc(810*var(--u))] w-[calc(300*var(--u))] text-center text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
          Alchi Kitchen
        </p>
      </div>
    </div>
  );
}
