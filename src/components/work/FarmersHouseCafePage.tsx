"use client";

import { useState } from "react";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { CanvasCopy, CanvasCredit, CanvasHeading } from "@/components/work/CanvasText";
import { farmersHousePlaylist } from "@/config/projects";
import { assetPath, at, cn } from "@/lib/utils";

/*
  Farmers' House Cafe — reproduction of the Figma project-page frame
  (node 2823:1543, 1920 x 17061) for AJC-25.

  Same technique as Balti Kitchen / Lahé Life: from xl up the frame is a scaled
  canvas where `--u` = 1 Figma px = 100cqw / 1920 and each element sits at its
  Figma coordinates (`at(x, y, w)` + `xl:left-(--x) xl:top-(--y)`). Below xl the
  same elements stack in normal flow (the design has no mobile frame).

  Coordinates were measured from a 1:1 export of the full frame, because the
  Figma API was rate limited. The identity lockup, the video poster and the two
  press logos are interim crops of that export; swap in the real exports when
  they are available (same file names).

  Ticket comments: the player's next / previous arrows and a tap on a track
  change the track, the album cover follows the track, and the disc spins
  while playing. No audio files were supplied, so play / pause / stop drive the
  disc only and the Spotify link is the way to listen.
*/

// String srcs are not basePath-prefixed by next/image, so prefix them here
// (required on GitHub Pages, which serves the site under a subpath).
const IMG = assetPath("/images/projects/farmers-house-cafe");

export function FarmersHouseCafePage() {
  const [identityExpanded, setIdentityExpanded] = useState(false);
  const [track, setTrack] = useState(0);
  const [playing, setPlaying] = useState(false);

  const current = farmersHousePlaylist[track];
  const count = farmersHousePlaylist.length;
  const step = (by: number) => setTrack((i) => (i + by + count) % count);

  return (
    <div className="bg-cream @container relative mx-auto w-full max-w-[1920px] overflow-hidden [--u:calc(100cqw/1920)]">

      {/* Figma frame height: 17061 */}
      <div className="relative flex flex-col gap-6 pb-20 xl:block xl:h-[calc(17061*var(--u))] xl:pb-0">
        {/* ============ HERO (1920 x 1076) ============ */}
        <section className="relative h-svh w-full xl:absolute xl:top-0 xl:left-0 xl:h-[calc(1076*var(--u))]">
          <OptimizedImage
            src={`${IMG}/latte-coaster.png`}
            alt="A latte in a speckled cup beside a cork coaster printed with the Farmers’ House mark"
            width={1920}
            height={1076}
            priority
            sizes="(min-width: 1920px) 1920px, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <p className="font-helvetica absolute bottom-6 left-6 text-sm font-bold tracking-[0.04em] text-white uppercase opacity-80 xl:top-[calc(536*var(--u))] xl:bottom-auto xl:left-[calc(109*var(--u))] xl:w-[calc(348*var(--u))] xl:text-[length:calc(28*var(--u))] xl:tracking-[calc(0.56*var(--u))]">
            2025 / ٢٠٢٥
          </p>
          <p className="font-helvetica absolute right-6 bottom-14 text-right text-sm font-bold tracking-[0.04em] text-white uppercase opacity-80 sm:bottom-6 xl:top-[calc(536*var(--u))] xl:right-auto xl:bottom-auto xl:left-[calc(1474*var(--u))] xl:w-[calc(348*var(--u))] xl:text-[length:calc(28*var(--u))] xl:tracking-[calc(0.56*var(--u))]">
            AJC in Ladakh / لداخ
          </p>
        </section>

        {/* ============ TITLE + SERVICES + INTRO ============ */}
        <CanvasHeading as="h1" x={109} y={1203}>
          Farmers’ House
        </CanvasHeading>
        <p
          className="font-helvetica-regular px-6 text-lg tracking-[0.02em] text-[#9b8866] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:p-0 xl:text-[length:calc(28*var(--u))] xl:leading-[calc(32*var(--u))] xl:tracking-[calc(0.56*var(--u))]"
          style={at(109, 1403, 600)}
        >
          Brand Identity
          <br />
          Narrative
          <br />
          Menu Curation &amp; Design
          <br />
          Brand Asset Design
          <br />
          Music Curation
          <br />
          Social Media
          <br />
          Creative Direction
        </p>
        <CanvasCopy x={959} y={1384} w={690}>
          <p>
            There is always one café from our travels
            <br className="hidden xl:inline" /> that lingers in the mind long after we leave.
          </p>
          <p>
            Farmers’ House is a heartfelt tribute to the generational farmers of Turtuk. It honors
            the custodians of the land who breathed life into Turtuk’s barren soil through
            centuries-old agricultural practices, transforming the rugged region into a
            self-sustaining land of rich vegetation and life.
          </p>
          <p>
            As you step inside the café, entering a world of fine coffee and finer cuisine, you will
            spot a few charming oddities: a rustic ledge where the espresso bar now sits, and legacy
            farming tools on display – all belonging to the very family that cultivated this corner
            in Ladakh’s last village.
          </p>
        </CanvasCopy>

        {/* ============ STOREFRONT (1920 x 1077) ============ */}
        <OptimizedImage
          src={`${IMG}/storefront.png`}
          alt="The timber and mud-plaster front of Farmers’ House, with its sign and a boulder at the door"
          width={1920}
          height={1077}
          sizes="(min-width: 1920px) 1920px, 100vw"
          className="mt-10 h-auto w-full xl:absolute xl:top-(--y) xl:left-0 xl:mt-0 xl:w-(--w)"
          style={at(0, 1903, 1920)}
        />

        {/* ============ IDENTITY ============ */}
        <CanvasHeading x={109} y={3085}>
          Identity
        </CanvasHeading>
        <OptimizedImage
          src={`${IMG}/identity-logo.png`}
          alt="The Farmers’ House logo: a sprig of flower buds inside a village-house outline, shown on its construction grid"
          width={619}
          height={523}
          sizes="(min-width: 1920px) 619px, 70vw"
          className="mx-auto h-auto w-72 xl:absolute xl:top-(--y) xl:left-(--x) xl:mx-0 xl:w-(--w)"
          style={at(653, 3257, 619)}
        />
        <CanvasCopy x={958} y={4081} w={600} warm>
          <div className="relative">
            <p>
              The farmers themselves form the identity and the core of the branding brief. The
              silhouette of the logo draws inspiration
              <br className="hidden xl:inline" /> from the rugged village homes of Turtuk, honoring
              their raw, <span className="whitespace-nowrap">non-linear</span> outlines.
              Complementing this form are delicate flower buds that symbolize life and prosperity –
              a visual metaphor for resilience and renewal. The entire palette embodies this living
              heritage, utilizing warm beige and deep brown tones to pay tribute to the old
              stone-and-mud houses of Turtuk; shelters that nurtured the roots of this café and the
              generations behind it.
            </p>
            {/* Figma veil: cream fade over the last three lines while collapsed */}
            {!identityExpanded && (
              <div
                aria-hidden
                className="bg-cream/66 pointer-events-none absolute inset-x-0 bottom-0 h-[3.45em]"
              />
            )}
          </div>
          <button
            type="button"
            onClick={() => setIdentityExpanded((prev) => !prev)}
            aria-expanded={identityExpanded}
            className="font-helvetica text-sage mt-3 block cursor-pointer text-left font-bold xl:mt-[calc(28*var(--u))]"
          >
            {identityExpanded ? "Read less" : "Read more"}
          </button>
        </CanvasCopy>

        {/* ============ COLOUR PALETTE ============ */}
        <CanvasHeading x={109} y={4444}>
          Colour Palette
        </CanvasHeading>
        <div className="relative xl:contents">
          <OptimizedImage
            src={`${IMG}/interior-wide.png`}
            alt="Sheer curtains, a cushioned bench and a mud-plastered wall in the dining room"
            width={1920}
            height={900}
            sizes="(min-width: 1920px) 1920px, 100vw"
            className="h-auto w-full xl:absolute xl:top-(--y) xl:left-0 xl:w-(--w)"
            style={at(0, 4564, 1920)}
          />
          {/* Figma palette strip over the dining-room photo */}
          <div
            className="absolute inset-x-6 bottom-6 flex h-10 xl:top-(--y) xl:right-auto xl:bottom-auto xl:left-(--x) xl:h-[calc(78*var(--u))] xl:w-(--w)"
            style={at(280, 4996, 1356)}
          >
            <div className="flex-1 bg-[#363434]" />
            <div className="flex-1 bg-[#4f4644]" />
            <div className="flex-1 bg-[#743f23]" />
            <div className="flex-1 bg-[#95796e]" />
            <div className="flex-1 bg-[#e4d8c4]" />
            <div className="flex-1 bg-[#fbfbf9]" />
          </div>
        </div>

        {/* ============ MENU DESIGN ============ */}
        <CanvasHeading x={108} y={5627}>
          Menu Design
        </CanvasHeading>
        <CanvasCopy x={959} y={5695} w={540} warm>
          <p>
            Cultivated from the past to serve travelers of the present, the menu adopts a minimalist
            design structured entirely around the ingredients of the land and speciality coffee.
          </p>
        </CanvasCopy>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:contents">
          <OptimizedImage
            src={`${IMG}/manual-brew-menu.png`}
            alt="The manual brew menu standing among stacked speckled cups"
            width={893}
            height={1016}
            sizes="(min-width: 1920px) 893px, 100vw"
            className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(31, 5906, 893)}
          />
          <OptimizedImage
            src={`${IMG}/menus-window.png`}
            alt="Four menu cards standing on a wooden ledge against autumn leaves"
            width={936}
            height={1016}
            sizes="(min-width: 1920px) 936px, 100vw"
            className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(954, 5906, 936)}
          />
        </div>
        {/* Two menu pages overlapping: manual brews behind, welcome note in front */}
        <div className="mx-6 my-10 grid grid-cols-2 gap-4 xl:contents">
          <OptimizedImage
            src={`${IMG}/menu-manual-brew.png`}
            alt="Menu page introducing the manual brews: pour over, French press, syphon and iced pour over"
            width={512}
            height={710}
            sizes="(min-width: 1920px) 512px, 50vw"
            className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(770, 7212, 512)}
          />
          <OptimizedImage
            src={`${IMG}/menu-welcome.png`}
            alt="Menu welcome note: a sanctuary for mindful travelers, signed by the host, Rashidullah Khan"
            width={512}
            height={710}
            sizes="(min-width: 1920px) 512px, 50vw"
            className="-order-1 h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(647, 7081, 512)}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:contents">
          <OptimizedImage
            src={`${IMG}/table-cards.png`}
            alt="Wi-fi and QR menu cards standing on a live-edge wooden table"
            width={887}
            height={1040}
            sizes="(min-width: 1920px) 887px, 100vw"
            className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(41, 8061, 887)}
          />
          <OptimizedImage
            src={`${IMG}/menus-flat.png`}
            alt="Printed menu cards laid flat on linen in shifting shadow"
            width={916}
            height={1046}
            sizes="(min-width: 1920px) 916px, 100vw"
            className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(963, 8061, 916)}
          />
        </div>
        <CanvasCopy x={959} y={9183} w={575} warm>
          <p>
            Where earthen plates rest and endless coffee pours, the café fills with the gentle notes
            of jazz and blues – a soundscape echoing into the vastness, offering the comforting
            homeliness of returning to familiar habits in a distant land. Communicated to the world
            through words, photographs, visuals, and music.
          </p>
        </CanvasCopy>

        {/* ============ THE FINE ART OF COFFEE & CUISINE ============ */}
        <CanvasHeading x={112} y={9421}>
          The Fine Art of
          <br />
          Coffee &amp; Cuisine
        </CanvasHeading>
        <OptimizedImage
          src={`${IMG}/syphon-icon.png`}
          alt=""
          width={128}
          height={255}
          sizes="128px"
          className="mx-auto h-auto w-20 xl:absolute xl:top-(--y) xl:left-(--x) xl:mx-0 xl:w-(--w)"
          style={at(414, 9787, 128)}
        />
        <OptimizedImage
          src={`${IMG}/syphon-water.png`}
          alt="Hot water poured from a gooseneck kettle into the glass bulb of a syphon coffee maker"
          width={936}
          height={993}
          sizes="(min-width: 1920px) 936px, 100vw"
          className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
          style={at(958, 9419, 936)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 xl:contents">
          <OptimizedImage
            src={`${IMG}/syphon-pour.png`}
            alt="A barista pours syphon coffee into a small glass"
            width={639}
            height={962}
            sizes="(min-width: 1920px) 639px, 100vw"
            className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(4, 10455, 639)}
          />
          <OptimizedImage
            src={`${IMG}/beans-kettle.png`}
            alt="A wooden bowl of coffee beans beside a gooseneck kettle and a grinder on the counter"
            width={639}
            height={962}
            sizes="(min-width: 1920px) 635px, 100vw"
            className="aspect-[639/962] h-auto w-full object-cover xl:absolute xl:top-(--y) xl:left-(--x) xl:aspect-auto xl:h-[calc(962*var(--u))] xl:w-(--w)"
            style={at(643, 10455, 635)}
          />
          <OptimizedImage
            src={`${IMG}/latte-pour.png`}
            alt="Steamed milk poured into a latte, making a leaf pattern"
            width={642}
            height={962}
            sizes="(min-width: 1920px) 642px, 100vw"
            className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(1278, 10455, 642)}
          />
        </div>

        {/* ============ VIDEOGRAPHY ============ */}
        {/* The carousel arrows are drawn as in Figma; only one film still was supplied. */}
        <div className="mt-10 flex items-center justify-center gap-6 xl:contents">
          <span
            aria-hidden
            className="font-cormorant text-sage text-4xl leading-none font-bold xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-center xl:text-[length:calc(80*var(--u))] xl:leading-[calc(76*var(--u))]"
            style={at(234, 11949, 110)}
          >
            &lt;
          </span>
          <OptimizedImage
            src={`${IMG}/video-poster.png`}
            alt="Film still: speckled cups lined up in front of the Farmers’ House menus"
            width={583}
            height={899}
            sizes="(min-width: 1920px) 583px, 70vw"
            className="h-auto w-2/3 xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(667, 11551, 583)}
          />
          <span
            aria-hidden
            className="font-cormorant text-sage text-4xl leading-none font-bold xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-center xl:text-[length:calc(80*var(--u))] xl:leading-[calc(76*var(--u))]"
            style={at(1571, 11949, 110)}
          >
            &gt;
          </span>
        </div>
        <p
          className="font-helvetica text-sage text-center text-sm font-bold tracking-[0.02em] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(20*var(--u))] xl:leading-[normal] xl:tracking-[calc(0.4*var(--u))]"
          style={at(808, 12498, 300)}
        >
          Videography
        </p>

        {/* ============ SOCIAL MEDIA ============ */}
        <CanvasHeading x={115} y={12662}>
          Social Media
        </CanvasHeading>
        <div className="flex items-center justify-center gap-6 xl:contents">
          <span
            aria-hidden
            className="font-cormorant text-sage text-4xl leading-none font-bold xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-center xl:text-[length:calc(80*var(--u))] xl:leading-[calc(76*var(--u))]"
            style={at(233, 13257, 110)}
          >
            &lt;
          </span>
          <OptimizedImage
            src={`${IMG}/instagram.png`}
            alt="The farmershouseturtuk Instagram grid: brews, breakfasts, the storefront and the dining room"
            width={513}
            height={1023}
            sizes="(min-width: 1920px) 513px, 60vw"
            className="h-auto w-3/5 xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(704, 12767, 513)}
          />
          <span
            aria-hidden
            className="font-cormorant text-sage text-4xl leading-none font-bold xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-center xl:text-[length:calc(80*var(--u))] xl:leading-[calc(76*var(--u))]"
            style={at(1570, 13257, 110)}
          >
            &gt;
          </span>
        </div>

        {/* ============ MUSIC CURATION (1916 x 1077; children use section-local coords) ============ */}
        <section
          aria-label="Music curation"
          className="relative mt-10 overflow-hidden pt-4 pb-14 text-white xl:absolute xl:top-(--y) xl:left-(--x) xl:mt-0 xl:h-[calc(1077*var(--u))] xl:w-(--w) xl:p-0"
          style={at(4, 13995, 1916)}
        >
          <OptimizedImage
            src={`${IMG}/music-bg.png`}
            alt=""
            fill
            sizes="(min-width: 1920px) 1916px, 100vw"
            className="object-cover"
          />
          {/* Legibility veil for the stacked layout only; Figma has none at 1920 */}
          <div aria-hidden className="absolute inset-0 bg-black/40 xl:hidden" />

          {/* Record: the disc spins behind the album cover while playing */}
          <div
            className="relative mx-auto mt-10 aspect-[625/502] w-4/5 max-w-md xl:absolute xl:top-(--y) xl:left-(--x) xl:mx-0 xl:mt-0 xl:w-(--w) xl:max-w-none"
            style={at(291, 245, 625)}
          >
            <div
              aria-hidden
              className={cn(
                "absolute top-[10%] left-[32.2%] aspect-square w-[64%] animate-[spin_4s_linear_infinite] rounded-full bg-[repeating-radial-gradient(circle,#0b0b0b_0,#0b0b0b_2%,#262626_2.6%,#0b0b0b_3.2%)] motion-reduce:animate-none",
                !playing && "[animation-play-state:paused]",
              )}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute top-[10%] left-[32.2%] aspect-square w-[64%] rounded-full bg-[linear-gradient(200deg,transparent_45%,rgba(255,255,255,0.35)_62%,transparent_78%)]"
            />
            {current.cover ? (
              <OptimizedImage
                key={current.cover}
                src={assetPath(current.cover)}
                alt={`Album cover: ${current.title} by ${current.artist}`}
                width={501}
                height={502}
                sizes="(min-width: 1920px) 501px, 60vw"
                className="absolute top-0 left-0 h-full w-[80.2%] object-cover"
              />
            ) : (
              // No cover art supplied for this track yet: a typeset sleeve.
              <div
                role="img"
                aria-label={`Album cover: ${current.title} by ${current.artist}`}
                className="font-helvetica absolute top-0 left-0 flex h-full w-[80.2%] flex-col justify-between bg-white p-[8%] font-bold tracking-[0.2em] uppercase"
              >
                <span className="text-xs text-black xl:text-[length:calc(22*var(--u))]">
                  {current.title}
                </span>
                <span className="text-xs text-[#c8961e] xl:text-[length:calc(24*var(--u))]">
                  {current.artist}
                </span>
              </div>
            )}
          </div>

          <div className="relative mt-8 flex items-center justify-center gap-6 xl:contents">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous track"
              className="font-cormorant cursor-pointer text-4xl leading-none font-bold transition-opacity hover:opacity-70 xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-center xl:text-[length:calc(80*var(--u))] xl:leading-[calc(76*var(--u))]"
              style={at(183, 448, 110)}
            >
              &lt;
            </button>
            <button
              type="button"
              onClick={() => setPlaying(false)}
              aria-label="Pause"
              className="cursor-pointer transition-opacity hover:opacity-70 xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
              style={at(420, 817, 34)}
            >
              <svg
                aria-hidden
                viewBox="0 0 34 38"
                fill="currentColor"
                className="h-auto w-6 xl:w-full"
              >
                <rect width="12" height="38" />
                <rect x="22" width="12" height="38" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play"
              aria-pressed={playing}
              className="cursor-pointer transition-opacity hover:opacity-70 xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
              style={at(531, 817, 34)}
            >
              <svg
                aria-hidden
                viewBox="0 0 34 38"
                fill="currentColor"
                className="h-auto w-6 xl:w-full"
              >
                <path d="M0 0L34 19L0 38Z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                setTrack(0);
              }}
              aria-label="Stop"
              className="cursor-pointer transition-opacity hover:opacity-70 xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
              style={at(636, 817, 38)}
            >
              <svg
                aria-hidden
                viewBox="0 0 38 38"
                fill="currentColor"
                className="h-auto w-6 xl:w-full"
              >
                <rect width="38" height="38" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next track"
              className="font-cormorant cursor-pointer text-4xl leading-none font-bold transition-opacity hover:opacity-70 xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-center xl:text-[length:calc(80*var(--u))] xl:leading-[calc(76*var(--u))]"
              style={at(879, 448, 110)}
            >
              &gt;
            </button>
          </div>
          <p
            aria-live="polite"
            className="font-helvetica relative mt-6 text-center text-sm font-bold tracking-[0.02em] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:mt-0 xl:w-(--w) xl:text-[length:calc(20*var(--u))] xl:leading-[calc(31*var(--u))] xl:tracking-[calc(0.4*var(--u))]"
            style={at(393, 911, 300)}
          >
            {current.title}
            <br />
            {current.artist}
          </p>

          <div className="relative xl:contents">
            <CanvasHeading x={1077} y={271} light>
              Music Curation
            </CanvasHeading>
          </div>
          <ol
            aria-label="Playlist"
            className="font-helvetica relative mx-6 mt-6 text-sm font-bold tracking-[0.02em] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:text-[length:calc(20*var(--u))] xl:leading-[calc(30*var(--u))] xl:tracking-[calc(0.4*var(--u))]"
            style={at(1078, 392, 508)}
          >
            {farmersHousePlaylist.map((item, i) => (
              <li key={item.title}>
                <button
                  type="button"
                  onClick={() => {
                    setTrack(i);
                    setPlaying(true);
                  }}
                  aria-current={i === track ? "true" : undefined}
                  className="block w-full cursor-pointer py-2 text-left uppercase transition-opacity hover:opacity-70 xl:h-[calc(77*var(--u))] xl:py-0"
                >
                  <span className="block">{item.title}</span>
                  <span className="flex justify-between text-white/75">
                    <span>{item.artist}</span>
                    <span>{item.duration}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <a
            href="https://open.spotify.com/playlist/41rdexJ91isMLneg1KbX3F?si=e33a6fba19624932"
            target="_blank"
            rel="noopener noreferrer"
            className="font-helvetica relative mx-6 mt-8 flex items-center gap-4 text-sm font-bold tracking-[0.02em] uppercase transition-opacity hover:opacity-70 xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:items-start xl:gap-[calc(24*var(--u))] xl:text-[length:calc(20*var(--u))] xl:leading-[calc(31*var(--u))] xl:tracking-[calc(0.4*var(--u))]"
            style={at(1079, 904, 420)}
          >
            <svg aria-hidden viewBox="0 0 95 95" className="w-12 shrink-0 xl:w-[calc(95*var(--u))]">
              <circle cx="47.5" cy="47.5" r="47.5" fill="white" />
              <path
                d="M24 36C39 31 57 32 72 40M27 48C40 44 55 45 67 52M30 59C41 56 52 57 62 62"
                fill="none"
                stroke="#5a5550"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
            <span className="xl:pt-[calc(24*var(--u))]">
              Farmers’ House Cafe,
              <br />
              Turtuk
            </span>
          </a>
        </section>

        {/* ============ THE SPACE ============ */}
        <CanvasHeading x={112} y={15190}>
          The Space
        </CanvasHeading>
        <div className="grid grid-cols-2 gap-3 px-6 xl:contents">
          <OptimizedImage
            src={`${IMG}/interior-corner.png`}
            alt="A wicker pendant lamp over a wooden table and cushioned bench by the window"
            width={452}
            height={633}
            sizes="(min-width: 1920px) 452px, 50vw"
            className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(45, 15344, 452)}
          />
          <OptimizedImage
            src={`${IMG}/entrance-tools.png`}
            alt="Farming tools hung on a mud wall above a stone ledge, beside the sunlit door"
            width={452}
            height={634}
            sizes="(min-width: 1920px) 452px, 50vw"
            className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(507, 15344, 452)}
          />
          <OptimizedImage
            src={`${IMG}/facade.png`}
            alt="The two-storey mud-plaster facade of Farmers’ House against a blue Ladakh sky"
            width={458}
            height={634}
            sizes="(min-width: 1920px) 458px, 50vw"
            className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(971, 15344, 458)}
          />
          <OptimizedImage
            src={`${IMG}/sign.png`}
            alt="The Farmers’ House sign in a wooden frame beside an arched, curtained window"
            width={434}
            height={634}
            sizes="(min-width: 1920px) 434px, 50vw"
            className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(1442, 15344, 434)}
          />
        </div>

        {/* ============ FEATURES ============ */}
        <CanvasHeading x={104} y={16096}>
          Features
        </CanvasHeading>
        <div className="flex items-center gap-6 px-6 xl:contents">
          <a
            href="https://www.cntraveller.in/story/in-ladakhs-turtuk-this-new-cafe-offers-hand-rolled-pasta-and-katsu-burgers/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-1/4 transition-opacity hover:opacity-70 xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(110, 16298, 195)}
          >
            <OptimizedImage
              src={`${IMG}/press-cnt.png`}
              alt="Condé Nast Traveller"
              width={195}
              height={80}
              sizes="(min-width: 1920px) 195px, 25vw"
              className="h-auto w-full"
            />
          </a>
          <a
            href="https://time.com/collections/worlds-greatest-places-2023/6261801/ladakh-india/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-3/5 transition-opacity hover:opacity-70 xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w)"
            style={at(352, 16298, 511)}
          >
            <OptimizedImage
              src={`${IMG}/press-time.png`}
              alt="TIME World’s Greatest Places 2023"
              width={511}
              height={90}
              sizes="(min-width: 1920px) 511px, 60vw"
              className="h-auto w-full"
            />
          </a>
        </div>

        {/* ============ TEAM ============ */}
        <CanvasHeading x={105} y={16530}>
          Team
        </CanvasHeading>
        <div className="flex flex-col gap-2 px-6 xl:contents">
          <CanvasCredit role="Photography" name="Alex Buzolic" x={355} y={16551} w={204} />
          <CanvasCredit role="Photography" name="Marie-Ève Aubertin" x={355} y={16587} w={204} />
          <CanvasCredit role="Photography" name="Harsh Surti" x={846} y={16551} w={205} />
          <CanvasCredit role="Visual Design" name="Praneet Selva" x={846} y={16587} w={205} />
          <CanvasCredit role="Menu Design" name="Beth" x={1337} y={16551} w={205} />
          <CanvasCredit
            role={
              <>
                Founder,
                <br className="hidden xl:inline" /> Concept Owner
              </>
            }
            name="Rashidullah Khan"
            x={1337}
            y={16587}
            w={205}
          />
        </div>

        {/* ============ NEXT PROJECT ============ */}
        <div className="mt-10 flex flex-col items-center text-center xl:contents">
          <p
            aria-hidden
            className="font-cormorant text-taupe text-5xl leading-none font-bold xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(80*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-4.8*var(--u))]"
            style={at(905, 16719, 110)}
          >
            &gt;
          </p>
          <Link
            href="/work/laheke-cafe"
            className="font-cormorant text-taupe block text-5xl leading-none tracking-[-0.06em] xl:absolute xl:top-(--y) xl:left-(--x) xl:w-(--w) xl:text-[length:calc(80*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-4.8*var(--u))]"
            style={at(654, 16805, 612)}
          >
            Next Project
          </Link>
          <p
            className="font-helvetica-regular text-sage mt-3 text-sm tracking-[0.02em] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:mt-0 xl:w-(--w) xl:text-[length:calc(20*var(--u))] xl:leading-[normal] xl:tracking-[calc(0.4*var(--u))] xl:whitespace-nowrap"
            style={at(810, 16905, 300)}
          >
            Laheké Cafe
          </p>
        </div>
      </div>
    </div>
  );
}
