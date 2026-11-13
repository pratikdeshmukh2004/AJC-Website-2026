"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { HeroHeader } from "@/components/home/HeroHeader";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { AudioToggle } from "@/components/work/AudioToggle";
import { ReadMoreCopy } from "@/components/work/ReadMoreCopy";
import { assetPath, cn, u } from "@/lib/utils";

/*
  Ranjit's Svaasa — reproduction of the Figma project-page frame
  "Ranjit Svaasa" (node 2823:2259, 1920 wide) for AJC-20.

  Same technique as the other case studies: an absolutely positioned canvas
  where `--u` = 1 Figma px = 100cqw / 1920, so every Figma coordinate is written
  `calc(<px>*var(--u))`. Figma percentage offsets were converted to px against
  the 1920 x 26040 frame. Colours: cream #fdfbf4 (page), taupe #7d7062
  (headings), sage #9b9484 (body).

  Interactions (Figma comments): the POST list scrolls to that post; each
  post's flourish is a music toggle (dim = muted, bright = playing).
*/

const IMG = assetPath("/images/projects/ranjits-svaasa");

// Layout anchors used to push content down when a "Read more" block expands.
const FILM_TOP = 1960;
const POSTS_TOP = 3940;
const GAP = 64;
const CANVAS_HEIGHT = 21500;

export function RanjitsSvaasaPage() {
  const [introExpanded, setIntroExpanded] = useState(false);
  const [strategyExpanded, setStrategyExpanded] = useState(false);
  // Which post's music is playing (null = muted).
  const [track, setTrack] = useState<string | null>(null);
  const [filmPlaying, setFilmPlaying] = useState(false);
  const [slide, setSlide] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [storyPlaying, setStoryPlaying] = useState(false);

  // Expanding a Read more block pushes everything below it down by the overflow.
  const introRef = useRef<HTMLDivElement>(null);
  const strategyRef = useRef<HTMLDivElement>(null);
  const [shiftA, setShiftA] = useState(0);
  const [shiftB, setShiftB] = useState(0);

  useLayoutEffect(() => {
    const intro = introRef.current;
    const strategy = strategyRef.current;
    if (!intro || !strategy) return;

    const measure = () => {
      const unit = (intro.offsetParent as HTMLElement).clientWidth / 1920;
      const bottom = (el: HTMLElement) => (el.offsetTop + el.offsetHeight) / unit;
      setShiftA(introExpanded ? Math.max(0, bottom(intro) + GAP - FILM_TOP) : 0);
      setShiftB(strategyExpanded ? Math.max(0, bottom(strategy) + GAP - POSTS_TOP) : 0);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(intro);
    ro.observe(strategy);
    ro.observe(intro.offsetParent as HTMLElement);
    return () => ro.disconnect();
  }, [introExpanded, strategyExpanded]);

  return (
    <div className="bg-cream @container relative mx-auto w-full max-w-[1920px] overflow-hidden [--u:calc(100cqw/1920)]">
      <HeroHeader menuOnly />

      {track && (
        <audio
          key={track}
          src={assetPath(`/audio/ranjits-svaasa/${track}.mp3`)}
          autoPlay
          onEnded={() => setTrack(null)}
        />
      )}

      <div className="relative w-full" style={{ height: u(CANVAS_HEIGHT + shiftA + shiftB) }}>
        {/* ============ HERO ============ */}
        <OptimizedImage
          src={`${IMG}/1.png`}
          alt="Sunlit red-brick facade of Ranjit’s Svaasa with white columns"
          width={1920}
          height={1080}
          priority
          sizes="(min-width: 1920px) 1920px, 100vw"
          className="absolute top-0 left-0 h-[calc(1086*var(--u))] w-full object-cover"
        />
        <p className="font-helvetica absolute top-[calc(526*var(--u))] left-[calc(103*var(--u))] w-[calc(348*var(--u))] text-[length:calc(28*var(--u))] font-bold tracking-[calc(0.56*var(--u))] text-white uppercase opacity-80">
          2025 / २०२५
        </p>
        <p className="font-helvetica absolute top-[calc(526*var(--u))] right-[calc(103*var(--u))] w-[calc(348*var(--u))] text-right text-[length:calc(28*var(--u))] font-bold tracking-[calc(0.56*var(--u))] text-white uppercase opacity-80">
          AJC in Punjab / ਪੰਜਾਬ
        </p>

        {/* ============ EVERYTHING BELOW THE INTRO (pushed down when it expands) ============ */}
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={{ transform: `translateY(${u(shiftA)})` }}
        >
          {/* Film frame */}
          <OptimizedImage
            src={`${IMG}/2.png`}
            alt="Sunlit courtyard of Ranjit’s Svaasa"
            width={1920}
            height={1080}
            sizes="(min-width: 1920px) 1920px, 100vw"
            className="absolute top-[calc(1960*var(--u))] left-0 h-[calc(1080*var(--u))] w-full object-cover"
          />

          {/* ============ THE ARCHIVAL — posts ============ */}
          <div
            className="absolute inset-0 transition-transform duration-500 ease-out"
            style={{ transform: `translateY(${u(shiftB)})` }}
          >
            <h2 className="font-cormorant text-taupe absolute top-[calc(3804*var(--u))] left-[calc(102*var(--u))] w-[calc(612*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]">
              The Archival
            </h2>

            {/* Post index — click to scroll to that post */}
            <nav
              aria-label="Archival posts"
              className="font-helvetica text-sage absolute top-[calc(3971*var(--u))] left-[calc(109*var(--u))] flex flex-col text-[length:calc(25*var(--u))] leading-[calc(54*var(--u))] font-bold tracking-[calc(0.5*var(--u))] opacity-63"
            >
              <a href="#post-01" className="hover:text-taupe transition-colors">
                POST 01
              </a>
              <a href="#post-02" className="hover:text-taupe transition-colors">
                POST 02
              </a>
              <a href="#post-03" className="hover:text-taupe transition-colors">
                POST 03
              </a>
              <a href="#post-04" className="hover:text-taupe transition-colors">
                POST 04
              </a>
              <a href="#post-05" className="hover:text-taupe transition-colors">
                POST 05
              </a>
              <a href="#post-06" className="hover:text-taupe transition-colors">
                POST 06
              </a>
              <a href="#post-07" className="hover:text-taupe transition-colors">
                POST 07
              </a>
              <a href="#post-08" className="hover:text-taupe transition-colors">
                POST 08
              </a>
              <a href="#post-09" className="hover:text-taupe transition-colors">
                POST 09
              </a>
              <a href="#post-10" className="hover:text-taupe transition-colors">
                POST 10
              </a>
              <a href="#post-11" className="hover:text-taupe transition-colors">
                POST 11
              </a>
            </nav>

            {/* ---- Post 01 ---- */}
            <OptimizedImage
              id="post-01"
              src={`${IMG}/posts/3-1.png`}
              alt="Archival post: history carried from generation to generation"
              width={545}
              height={686}
              sizes="(min-width: 1920px) 545px, 30vw"
              className="absolute top-[calc(3940*var(--u))] left-[calc(1067*var(--u))] h-[calc(686*var(--u))] w-[calc(545*var(--u))] object-cover"
            />
            <AudioToggle
              id="3-1"
              track={track}
              onChange={setTrack}
              label="Play music for post 01"
              className="top-[calc(4273*var(--u))] left-[calc(396*var(--u))]"
            />
            <div className="font-helvetica-regular text-sage absolute top-[calc(4330*var(--u))] left-[calc(396*var(--u))] w-[calc(501*var(--u))] space-y-[calc(23*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))]">
              <p>
                History is not merely written in books; it is carried forward from generation to
                generation.. witnessed, lived, and lovingly passed down.
              </p>
              <p>
                In the once-quiet lanes of Amritsar’s walled city settled a family of traders who
                journeyed along the Silk Route, carrying spices and tea from Afghanistan and beyond
                to the lush gardens of Assam and Bengal.
              </p>
              <p>
                Life was celebrated, remembered, and savored within the embrace of the Old City. Of
                the few families who stepped beyond its walls, the Mehra family was among the four,
                finding their new home on Mall Road.
              </p>
            </div>

            {/* ---- Post 02 ---- */}
            <OptimizedImage
              id="post-02"
              src={`${IMG}/posts/3-2.png`}
              alt="Archival post: Ranjit Rattan Mehra and Rama Kapoor"
              width={545}
              height={686}
              sizes="(min-width: 1920px) 545px, 30vw"
              className="absolute top-[calc(4899*var(--u))] left-[calc(285*var(--u))] h-[calc(686*var(--u))] w-[calc(545*var(--u))] object-cover"
            />
            <h3 className="font-cormorant text-taupe absolute top-[calc(4979*var(--u))] left-[calc(1067*var(--u))] w-[calc(612*var(--u))] text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]">
              Rama Kapoor
            </h3>
            <AudioToggle
              id="3-2"
              track={track}
              onChange={setTrack}
              label="Play music for post 02"
              className="top-[calc(5161*var(--u))] left-[calc(1067*var(--u))]"
            />
            <div className="font-helvetica-regular text-sage absolute top-[calc(5217*var(--u))] left-[calc(1067*var(--u))] w-[calc(501*var(--u))] space-y-[calc(23*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))]">
              <p>
                In this portrait from the Mehra family archives is Rama Kapoor on her wedding day in
                1977.
              </p>
              <p>
                Born into an aristocratic family in Dhanbad, Rama married Ranjit Rattan Mehra of
                Amritsar in a grand ceremony at The Ashok, New Delhi.. a woman of quiet strength and
                grace.
              </p>
              <p>
                Where life changed too soon, determined to honour his memory, Rama Ranjit Mehra
                undertook the heartfelt endeavour of restoring her husband’s ancestral haveli, where
                they had lived their early married life. She transformed the haveli into Ranjit’s
                Svaasa, a home that offered solace, succour, service.
              </p>
              <p>And today, it does exactly what she hoped for.</p>
            </div>

            {/* ---- Post 03 ---- */}
            <OptimizedImage
              id="post-03"
              src={`${IMG}/posts/3-3.jpg`}
              alt="Archival post: Ranjit Rattan Mehra"
              width={3375}
              height={4219}
              sizes="(min-width: 1920px) 545px, 30vw"
              className="absolute top-[calc(5747*var(--u))] left-[calc(1067*var(--u))] h-[calc(686*var(--u))] w-[calc(545*var(--u))] object-cover"
            />
            <h3 className="font-cormorant text-taupe absolute top-[calc(5755*var(--u))] left-[calc(395*var(--u))] w-[calc(612*var(--u))] text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]">
              Ranjit
              <br />
              Rattan Mehra
            </h3>
            <AudioToggle
              id="3-3"
              track={track}
              onChange={setTrack}
              label="Play music for post 03"
              className="top-[calc(6000*var(--u))] left-[calc(396*var(--u))]"
            />
            <div className="font-helvetica-regular text-sage absolute top-[calc(6065*var(--u))] left-[calc(395*var(--u))] w-[calc(501*var(--u))] space-y-[calc(23*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))]">
              <p>
                One half of the wedding archival photograph holds the image of Ranjit Rattan Mehra,
                tall and dashing at 6 feet 3 inches, charismatic in an effortless way, and deeply
                loved by all who knew him.
              </p>
              <p>
                Born into the lineage of Rai Bahadur Lala Ratan Chand Mehra, Ranjit grew up in a
                home where dignity was lived, not spoken.
              </p>
              <p>
                His marriage to Rama Kapoor in 1977 brought together two families of heritage and
                warmth. Their early years were spent in his ancestral haveli on Mall Road.. the very
                space that would later become Ranjit’s SVAASA.
              </p>
              <p>‘Svaasa’, from ‘sv-aas’, literally a breath of life.</p>
            </div>

            {/* ---- Post 04 ---- */}
            <OptimizedImage
              id="post-04"
              src={`${IMG}/posts/3-4.png`}
              alt="Archival post: Sri Harmandir Sahib, 1875"
              width={545}
              height={690}
              sizes="(min-width: 1920px) 545px, 30vw"
              className="absolute top-[calc(6706*var(--u))] left-[calc(285*var(--u))] h-[calc(690*var(--u))] w-[calc(545*var(--u))] object-cover"
            />
            <h3 className="font-cormorant text-taupe absolute top-[calc(6718*var(--u))] left-[calc(1067*var(--u))] w-[calc(612*var(--u))] text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]">
              Harmandir Sahib
            </h3>
            <AudioToggle
              id="3-4"
              track={track}
              onChange={setTrack}
              label="Play music for post 04"
              className="top-[calc(6989*var(--u))] left-[calc(1067*var(--u))]"
            />
            <div className="font-helvetica-regular text-sage absolute top-[calc(7046*var(--u))] left-[calc(1069*var(--u))] w-[calc(476*var(--u))] space-y-[calc(23*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))]">
              <p>
                In a city that breathes faith • <span lang="pa">ਅੰਮ੍ਰਿਤਸਰ</span>
              </p>
              <p>
                Where still can be heard the echo of footsteps of emperors, pilgrims, poets, and
                seekers. The four gates open not just to the world, but reinstate the Sikh belief -
                ‘sarbat da bhala’.. goodwill for all.
              </p>
              <p>
                <span lang="pa">ਸਚਹੁ ਓਰੈ ਸਭੁ ਕੋ ਉਪਰਿ ਸਚੁ ਆਚਾਰੁ ॥੫॥</span>
                <br />
                Truth is high, but higher still is truthful living.
                <br />• Guru Granth Sahib •
              </p>
              <p>
                This rare 1875 photograph of Sri Harmandir Sahib captures a moment before the marble
                inlay, prior to the gold guilding, when the sanctum still reflected the quiet
                resilience of the early Sikh empire.
              </p>
              <p>Within these walls, lies our story, too.</p>
            </div>

            {/* ---- Post 05 ---- */}
            <OptimizedImage
              id="post-05"
              src={`${IMG}/posts/3-5.jpg`}
              alt="Archival post: the walled city of Amritsar"
              width={960}
              height={1200}
              sizes="(min-width: 1920px) 545px, 30vw"
              className="absolute top-[calc(7589*var(--u))] left-[calc(1067*var(--u))] h-[calc(686*var(--u))] w-[calc(545*var(--u))] object-cover"
            />
            <h3 className="font-cormorant text-taupe absolute top-[calc(7627*var(--u))] left-[calc(396*var(--u))] w-[calc(612*var(--u))] text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]">
              Walled City
            </h3>
            <AudioToggle
              id="3-5"
              track={track}
              onChange={setTrack}
              label="Play music for post 05"
              className="top-[calc(7867*var(--u))] left-[calc(396*var(--u))]"
            />
            <div className="font-helvetica-regular text-sage absolute top-[calc(7924*var(--u))] left-[calc(396*var(--u))] w-[calc(523*var(--u))] space-y-[calc(23*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))]">
              <p>
                Across the old walled city of Amritsar, twelve historic gates once guarded a world
                shaped by traders, travellers, saints, & kings… each entrance a threshold that
                defined how the city breathed, moved, and grew.
              </p>
              <p>
                From Hathi Gate, where elephants once passed, to Lohgarh Gate, once the armoury
                entrance and now a thriving market street, the old routes now hum with shops and
                everyday life.
              </p>
              <p>
                Here, on this greater map of memory and movement, Ranjit’s Svaasa was once a modest
                chapter, before being reimagined, restored, and returned to the world as a haveli
                that carries forward the heritage of the city it belongs to.
              </p>
            </div>

            {/* ---- Post 06 ---- */}
            <OptimizedImage
              id="post-06"
              src={`${IMG}/posts/3-6.png`}
              alt="Archival post: old Amritsar, photographed by Felice Beato"
              width={545}
              height={686}
              sizes="(min-width: 1920px) 545px, 30vw"
              className="absolute top-[calc(8506*var(--u))] left-[calc(285*var(--u))] h-[calc(686*var(--u))] w-[calc(545*var(--u))] object-cover"
            />
            <h3 className="font-cormorant text-taupe absolute top-[calc(8518*var(--u))] left-[calc(1067*var(--u))] w-[calc(612*var(--u))] text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]">
              Old Amritsar
            </h3>
            <AudioToggle
              id="3-6"
              track={track}
              onChange={setTrack}
              label="Play music for post 06"
              className="top-[calc(8890*var(--u))] left-[calc(1067*var(--u))]"
            />
            <div className="font-helvetica-regular text-sage absolute top-[calc(8944*var(--u))] left-[calc(1067*var(--u))] w-[calc(494*var(--u))] space-y-[calc(23*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))]">
              <p>
                Captured by Felice Beato in the late 1850s, this photograph reveals the texture of
                old Amritsar.. its balconies, its bustle, its interplay of shadow & sun.
              </p>
              <p>
                Generations moved through these very lanes, carrying tales of craft, commerce, and
                kinship. The Mehra family lived among them, shaped quietly by the everyday rhythms
                of this city.
              </p>
              <p>The family till date is known as the ‘Chai wale Mehras’.</p>
            </div>

            {/* ---- Post 07 ---- */}
            <OptimizedImage
              id="post-07"
              src={`${IMG}/posts/3-7.jpg`}
              alt="Archival post: the haveli"
              width={3375}
              height={4219}
              sizes="(min-width: 1920px) 545px, 30vw"
              className="absolute top-[calc(9389*var(--u))] left-[calc(1067*var(--u))] h-[calc(686*var(--u))] w-[calc(545*var(--u))] object-cover"
            />
            <h3 className="font-cormorant text-taupe absolute top-[calc(9429*var(--u))] left-[calc(396*var(--u))] w-[calc(612*var(--u))] text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]">
              The Haveli
            </h3>
            <AudioToggle
              id="3-7"
              track={track}
              onChange={setTrack}
              label="Play music for post 07"
              className="top-[calc(9718*var(--u))] left-[calc(396*var(--u))]"
            />
            {/* Figma anchors this block by its bottom edge (y10064). */}
            <div className="font-helvetica-regular text-sage absolute top-[calc(10064*var(--u))] left-[calc(396*var(--u))] w-[calc(501*var(--u))] -translate-y-full space-y-[calc(23*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))]">
              <p>
                Built roughly 200 years ago, in the mid-19th century, after the era of Maharaja
                Ranjit Singh, this haveli began as a residence for the Mehra family, centred around
                its angan, the open courtyard that anchored everyday life. Structurally, the haveli
                reflects the layered architectural evolution of Punjab.
              </p>
              <p>
                Its angan, baked-earth Nanakshahi bricks, the coloured tile baked-flooring, and the
                lime-plastered walls represent early Punjabi building traditions.
              </p>
              <p>
                It is a home that has carried many eras… yet still breathes with the quiet symmetry
                it was born with.
              </p>
            </div>

            {/* ---- Post 08 — the film ---- */}
            <div
              id="post-08"
              className="absolute top-[calc(10357*var(--u))] left-[calc(197*var(--u))] h-[calc(856*var(--u))] w-[calc(1529*var(--u))] overflow-hidden"
            >
              {filmPlaying ? (
                <video
                  src={assetPath("/videos/ranjits-svaasa/film.mp4")}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 h-full w-full bg-black object-cover"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setFilmPlaying(true)}
                  aria-label="Play The Svaasa Film"
                  className="group absolute inset-0 h-full w-full cursor-pointer"
                >
                  <OptimizedImage
                    src={`${IMG}/film-poster.png`}
                    alt=""
                    fill
                    sizes="(min-width: 1920px) 1529px, 80vw"
                    className="object-cover"
                  />
                  <svg
                    aria-hidden
                    viewBox="0 0 48.75 56.2917"
                    fill="white"
                    className="absolute top-1/2 left-1/2 h-[calc(65*var(--u))] w-[calc(56*var(--u))] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:scale-125"
                  >
                    <path d="M0 0L48.75 28.1458L0 56.2917Z" />
                  </svg>
                </button>
              )}
            </div>
            <p className="font-helvetica-regular text-sage absolute top-[calc(11248*var(--u))] left-[calc(285*var(--u))] -translate-x-1/2 text-center text-[length:calc(20*var(--u))] leading-[calc(26*var(--u))] tracking-[calc(0.4*var(--u))] whitespace-nowrap">
              <b>The SVAASA Film</b>
            </p>
            <p className="font-helvetica-regular text-sage absolute top-[calc(11248*var(--u))] left-[calc(980*var(--u))] -translate-x-1/2 text-center text-[length:calc(20*var(--u))] leading-[calc(26*var(--u))] tracking-[calc(0.4*var(--u))] whitespace-nowrap">
              “Jo tera hai tere kol khud aayega, har roz onnu paan di khwaish na kar.”
            </p>
            <p className="font-helvetica text-sage absolute top-[calc(11248*var(--u))] left-[calc(1646*var(--u))] -translate-x-1/2 text-center text-[length:calc(20*var(--u))] leading-[calc(26*var(--u))] font-bold tracking-[calc(0.4*var(--u))] whitespace-nowrap">
              Directed by AJC
            </p>

            {/* ---- Post 09 ---- */}
            <OptimizedImage
              id="post-09"
              src={`${IMG}/posts/5-1.jpg`}
              alt="Archival post: the old lock of the haveli"
              width={3375}
              height={4219}
              sizes="(min-width: 1920px) 545px, 30vw"
              className="absolute top-[calc(11461*var(--u))] left-[calc(285*var(--u))] h-[calc(686*var(--u))] w-[calc(545*var(--u))] object-cover"
            />
            <AudioToggle
              id="5-1"
              track={track}
              onChange={setTrack}
              label="Play music for post 09"
              className="top-[calc(11718*var(--u))] left-[calc(1067*var(--u))]"
            />
            <div className="font-helvetica-regular text-sage absolute top-[calc(11778*var(--u))] left-[calc(1069*var(--u))] w-[calc(493*var(--u))] space-y-[calc(23*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))]">
              <p>
                The old lock opens… and with it, a world two centuries deep.
                <br />
                <br />
                Once fitted to the original doors of the Haveli,
              </p>
              <p>
                this Aligarh-crafted Royal lock carries the quiet memories of life within these
                walls... moments that shaped generations of the Mehra family. The home, once fondly
                known as ‘Ritz Walo Ki Kothi’, still holds echoes of its storied past.
              </p>
              <p>
                Within this very courtyard, marriages were celebrated, children were born, and the
                women of the house saw milestone chapters unfold. Thus a home where a simple relic
                was preserved… holding echoes of a home where stories were lived long before they
                were ever told.
              </p>
            </div>

            {/* ---- Post 10 ---- */}
            <OptimizedImage
              id="post-10"
              src={`${IMG}/posts/5-2.jpg`}
              alt="Archival post: Rai Bahadur Lala Ratan Chand"
              width={3375}
              height={4219}
              sizes="(min-width: 1920px) 545px, 30vw"
              className="absolute top-[calc(12344*var(--u))] left-[calc(1067*var(--u))] h-[calc(686*var(--u))] w-[calc(545*var(--u))] object-cover"
            />
            <AudioToggle
              id="5-2"
              track={track}
              onChange={setTrack}
              label="Play music for post 10"
              className="top-[calc(12658*var(--u))] left-[calc(396*var(--u))]"
            />
            <div className="font-helvetica-regular text-sage absolute top-[calc(12736*var(--u))] left-[calc(396*var(--u))] w-[calc(501*var(--u))] space-y-[calc(23*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))]">
              <p>
                “I bow not to them, but to my lineage. I salute my ancestry, whose strength allows
                me to hold this position... and to use it in service of my people.”
                <br />
                <br />
                For Rai Bahadur Lala Ratan Chand, these were not merely words, but a way of life.
              </p>
              <p>
                A builder of Amritsar’s civic foundations, a champion of welfare, and the force
                behind hospitals, schools, and public institutions that still echo his generosity.
                His life was devoted to the people he served.
              </p>
              <p>A just man. A noble legacy. Our forefather.</p>
            </div>

            {/* ---- Post 11 ---- */}
            <OptimizedImage
              id="post-11"
              src={`${IMG}/posts/5-3.png`}
              alt="Archival post: four generations of the Mehra family"
              width={1644}
              height={669}
              sizes="(min-width: 1920px) 1644px, 90vw"
              className="absolute top-[calc(13294*var(--u))] left-[calc(138*var(--u))] h-[calc(669*var(--u))] w-[calc(1644*var(--u))] object-cover"
            />
            <AudioToggle
              id="5-3"
              track={track}
              onChange={setTrack}
              label="Play music for post 11"
              className="top-[calc(14009*var(--u))] left-[calc(138*var(--u))]"
            />
            <div className="font-helvetica-regular text-sage absolute top-[calc(14011*var(--u))] left-[calc(1069*var(--u))] w-[calc(510*var(--u))] space-y-[calc(23*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))]">
              <p>
                Four generations of strength, standing together.
                <br />
                <br />
                O.B.E. Rai Bahadur Lala Ratan Chand Mehra with his sons: Rai Bahadur Prakash Chand
                Mehra, Rai Bahadur Labh Chand Mehra, Lala Khushal Chand Mehra and Lala Lal Chand
                Mehra.
              </p>
              <p>
                A family that shaped the civic, cultural, and philanthropic spirit of Amritsar.
                Their work built institutions, uplifted communities, and laid the foundations of the
                city we know today.
              </p>
              <p>
                At Ranjit’s SVAASA, their legacy lives, just as across the city of Amritsar... that
                was their home, their people.
              </p>
            </div>

            {/* ============ SOCIAL MEDIA ============ */}
            <h2 className="font-cormorant text-taupe absolute top-[calc(14483*var(--u))] left-[calc(102*var(--u))] w-[calc(612*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]">
              Social Media
            </h2>
            {["6-1", "6-2", "6-3", "6-4"].map((name, i) => (
              <OptimizedImage
                key={name}
                src={`${IMG}/${name}.png`}
                alt="Ranjit’s Svaasa Instagram feed"
                width={889}
                height={1756}
                sizes="(min-width: 1920px) 889px, 50vw"
                className={cn(
                  "absolute top-[calc(14692*var(--u))] left-[calc(515*var(--u))] h-[calc(1756*var(--u))] w-[calc(889*var(--u))] object-cover transition-opacity duration-500",
                  i === slide ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              />
            ))}
            <button
              type="button"
              aria-label="Previous screen"
              onClick={() => setSlide((i) => (i + 3) % 4)}
              className="font-helvetica text-sage absolute top-[calc(15503*var(--u))] left-[calc(254*var(--u))] w-[calc(73*var(--u))] cursor-pointer text-center text-[length:calc(46*var(--u))] leading-none font-bold tracking-[calc(0.92*var(--u))] transition-opacity hover:opacity-60"
            >
              &lt;
            </button>
            <button
              type="button"
              aria-label="Next screen"
              onClick={() => setSlide((i) => (i + 1) % 4)}
              className="font-helvetica text-sage absolute top-[calc(15503*var(--u))] left-[calc(1591*var(--u))] w-[calc(73*var(--u))] cursor-pointer text-center text-[length:calc(46*var(--u))] leading-none font-bold tracking-[calc(0.92*var(--u))] transition-opacity hover:opacity-60"
            >
              &gt;
            </button>

            <p className="font-helvetica text-sage absolute top-[calc(16511*var(--u))] left-[calc(621*var(--u))] w-[calc(677*var(--u))] text-center text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))]">
              SVAASA GRID
            </p>
            {/* The 12 grid tiles as one composite; multiply drops its white backdrop onto the cream page. */}
            <OptimizedImage
              src={`${IMG}/7.png`}
              alt="The Ranjit’s Svaasa Instagram grid"
              width={1920}
              height={1080}
              sizes="(min-width: 1920px) 1920px, 100vw"
              className="absolute top-[calc(16583*var(--u))] left-0 h-[calc(1080*var(--u))] w-full mix-blend-multiply"
            />

            <p className="font-helvetica text-sage absolute top-[calc(17625*var(--u))] left-[calc(621*var(--u))] w-[calc(677*var(--u))] text-center text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))]">
              SVAASA STORIES
            </p>
            <div className="absolute top-[calc(17833*var(--u))] left-[calc(707*var(--u))] h-[calc(900*var(--u))] w-[calc(506*var(--u))] overflow-hidden">
              {storyPlaying ? (
                <video
                  key={storyIndex}
                  src={assetPath(`/videos/ranjits-svaasa/8-${storyIndex + 1}.mp4`)}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 h-full w-full bg-black object-cover"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setStoryPlaying(true)}
                  aria-label={`Play story ${storyIndex + 1} of 2`}
                  className="group absolute inset-0 h-full w-full cursor-pointer"
                >
                  <OptimizedImage
                    src={`${IMG}/stories-poster.png`}
                    alt=""
                    fill
                    sizes="(min-width: 1920px) 506px, 40vw"
                    className="object-cover"
                  />
                  <svg
                    aria-hidden
                    viewBox="0 0 48.75 56.2917"
                    fill="white"
                    className="absolute top-1/2 left-1/2 h-[calc(35*var(--u))] w-[calc(30*var(--u))] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:scale-125"
                  >
                    <path d="M0 0L48.75 28.1458L0 56.2917Z" />
                  </svg>
                </button>
              )}
            </div>
            <button
              type="button"
              aria-label="Previous story"
              onClick={() => {
                setStoryIndex((i) => (i + 1) % 2);
                setStoryPlaying(false);
              }}
              className="font-helvetica text-sage absolute top-[calc(18233*var(--u))] left-[calc(255*var(--u))] w-[calc(73*var(--u))] cursor-pointer text-center text-[length:calc(46*var(--u))] leading-none font-bold tracking-[calc(0.92*var(--u))] transition-opacity hover:opacity-60"
            >
              &lt;
            </button>
            <button
              type="button"
              aria-label="Next story"
              onClick={() => {
                setStoryIndex((i) => (i + 1) % 2);
                setStoryPlaying(false);
              }}
              className="font-helvetica text-sage absolute top-[calc(18233*var(--u))] left-[calc(1592*var(--u))] w-[calc(73*var(--u))] cursor-pointer text-center text-[length:calc(46*var(--u))] leading-none font-bold tracking-[calc(0.92*var(--u))] transition-opacity hover:opacity-60"
            >
              &gt;
            </button>

            <p className="font-helvetica-regular text-sage absolute top-[calc(18870*var(--u))] left-[calc(530*var(--u))] w-[calc(860*var(--u))] text-center text-[length:calc(20*var(--u))] leading-[calc(28*var(--u))] tracking-[calc(0.4*var(--u))]">
              “To mirror the philosophy of svaasa, the social media roll-out was structured not by
              chronological date, but by narrative density.. gradually moving the audience from the
              macro-history of Amritsar into the intimate, generational lineage of the Haveli.”
            </p>
            {/* AJC mark (Figma Group 109) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${IMG}/ajc-mark.svg`}
              alt=""
              className="absolute top-[calc(18986*var(--u))] left-[calc(926*var(--u))] h-[calc(30*var(--u))] w-[calc(69*var(--u))]"
            />

            {/* ============ FEATURES ============ */}
            <h2 className="font-cormorant text-taupe absolute top-[calc(19088*var(--u))] left-[calc(102*var(--u))] w-[calc(612*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]">
              Features
            </h2>
            <a
              href="https://www.cntraveller.in/story/ranjits-svaasa-amritsar-homestay/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the Ranjit’s Svaasa story in Condé Nast Traveller"
              className="absolute top-[calc(19236*var(--u))] left-[calc(51*var(--u))] h-[calc(1090*var(--u))] w-[calc(905*var(--u))] overflow-hidden transition-opacity duration-300 hover:opacity-85"
            >
              <OptimizedImage
                src={`${IMG}/9-1.png`}
                alt=""
                fill
                sizes="(min-width: 1920px) 905px, 50vw"
                className="object-cover"
              />
              <span className="font-cormorant text-cream absolute top-[calc(691.71*var(--u))] left-0 w-full text-center text-[length:calc(55*var(--u))] leading-[0.89] font-semibold tracking-[calc(1.1*var(--u))] [font-variant-caps:small-caps]">
                In Amritsar,
                <br />a 200-year-old haveli
                <br />
                is a homestay with
                <br />a living history
              </span>
              <span className="font-helvetica-regular text-cream absolute top-[calc(919.31*var(--u))] left-0 w-full text-center text-[length:calc(24*var(--u))] leading-[1.33] tracking-[calc(0.48*var(--u))]">
                Seven generations of family stories, Amritsari flavours,
                <br />
                and rooms that breathe history at Ranjit&apos;s SVAASA
              </span>
            </a>
            <a
              href="https://www.architecturaldigest.in/story/inside-this-200-year-old-haveli-in-amritsar-that-iconic-actor-rekha-once-visited/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the Ranjit’s Svaasa story in Architectural Digest"
              className="absolute top-[calc(19236*var(--u))] left-[calc(969*var(--u))] h-[calc(1090*var(--u))] w-[calc(906*var(--u))] overflow-hidden transition-opacity duration-300 hover:opacity-85"
            >
              <OptimizedImage
                src={`${IMG}/9-2.png`}
                alt=""
                fill
                sizes="(min-width: 1920px) 906px, 50vw"
                className="object-cover"
              />
              <span className="font-cormorant text-cream absolute top-[calc(691.71*var(--u))] left-0 w-full text-center text-[length:calc(55*var(--u))] leading-[0.89] font-semibold tracking-[calc(1.1*var(--u))] [font-variant-caps:small-caps]">
                Inside this 200-year-old
                <br />
                haveli in Amritsar that
                <br />
                iconic actor Rekha
                <br />
                once visited
              </span>
              <span className="font-helvetica-regular text-cream absolute top-[calc(919.31*var(--u))] left-0 w-full text-center text-[length:calc(24*var(--u))] leading-[1.33] tracking-[calc(0.48*var(--u))]">
                Surrounded by blooming amaltas, mango, and jamun trees,
                <br />
                this private haveli in Amritsar seamlessly blends heritage
                <br />
                with contemporary living.
              </span>
            </a>

            {/* Press links */}
            <a
              href="https://www.cntraveller.in/story/ranjits-svaasa-amritsar-homestay/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Condé Nast Traveller"
              className="absolute top-[calc(20654*var(--u))] left-[calc(110*var(--u))] h-[calc(69*var(--u))] w-[calc(193*var(--u))] transition-opacity hover:opacity-60"
            >
              <OptimizedImage
                src={`${IMG}/press-cnt.png`}
                alt=""
                fill
                sizes="193px"
                className="object-cover"
              />
            </a>
            <a
              href="https://www.forbes.com/sites/eshachhabra/2014/11/30/how-travel-can-do-good-hospitality-and-heritage-collide/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Forbes"
              className="absolute top-[calc(20645*var(--u))] left-[calc(384*var(--u))] h-[calc(88*var(--u))] w-[calc(260*var(--u))] overflow-hidden transition-opacity hover:opacity-60"
            >
              <OptimizedImage
                src={`${IMG}/press-forbes.png`}
                alt=""
                width={980}
                height={980}
                sizes="351px"
                className="absolute top-[-149.12%] left-[-17.56%] h-[398.25%] w-[135.12%] max-w-none"
              />
            </a>
            <a
              href="https://www.architecturaldigest.in/story/inside-this-200-year-old-haveli-in-amritsar-that-iconic-actor-rekha-once-visited/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Architectural Digest"
              className="absolute top-[calc(20624*var(--u))] left-[calc(725*var(--u))] h-[calc(94*var(--u))] w-[calc(145*var(--u))] transition-opacity hover:opacity-60"
            >
              <OptimizedImage
                src={`${IMG}/press-ad.png`}
                alt=""
                fill
                sizes="145px"
                className="object-cover"
              />
            </a>
            <a
              href="https://www.robbreportindia.com/home-and-design/art/inside-vishal-chand-and-abhimanyu-rattan-mehra-twin-seduction-art-installations"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Robb Report India"
              className="absolute top-[calc(20654*var(--u))] left-[calc(951*var(--u))] h-[calc(95*var(--u))] w-[calc(460*var(--u))] overflow-hidden transition-opacity hover:opacity-60"
            >
              <OptimizedImage
                src={`${IMG}/press-robb.png`}
                alt=""
                width={685}
                height={425}
                sizes="494px"
                className="absolute top-[-126.17%] left-[-3.7%] h-[322.43%] w-[107.4%] max-w-none"
              />
            </a>

            {/* ============ TEAM ============ */}
            <h2 className="font-cormorant text-taupe absolute top-[calc(20822*var(--u))] left-[calc(102*var(--u))] w-[calc(612*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]">
              Team
            </h2>
            <p className="font-helvetica text-sage absolute top-[calc(20842*var(--u))] left-[calc(357*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
              Social Media
            </p>
            <p className="font-helvetica-regular text-sage absolute top-[calc(20842*var(--u))] left-[calc(556*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
              Loma Garodia
            </p>
            <p className="font-helvetica text-sage absolute top-[calc(20878*var(--u))] left-[calc(357*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
              Social Media
            </p>
            <p className="font-helvetica-regular text-sage absolute top-[calc(20878*var(--u))] left-[calc(556*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
              Vedanti Anvahne
            </p>
            <p className="font-helvetica text-sage absolute top-[calc(20842*var(--u))] left-[calc(821*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
              Videography
            </p>
            <p className="font-helvetica-regular text-sage absolute top-[calc(20842*var(--u))] left-[calc(1013*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
              Pulkit Khandelwal
            </p>
            <p className="font-helvetica text-sage absolute top-[calc(20878*var(--u))] left-[calc(821*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
              Photographs
            </p>
            <p className="font-helvetica-regular text-sage absolute top-[calc(20878*var(--u))] left-[calc(1013*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
              Ranjit’s Svaasa
            </p>
            <p className="font-helvetica text-sage absolute top-[calc(20842*var(--u))] left-[calc(1300*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
              Concept &amp; Ideation
            </p>
            <p className="font-helvetica-regular text-sage absolute top-[calc(20842*var(--u))] left-[calc(1551*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
              Vishal Chand Mehra
            </p>
            <p className="font-helvetica text-sage absolute top-[calc(20878*var(--u))] left-[calc(1300*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
              Archival Curation
            </p>
            <p className="font-helvetica-regular text-sage absolute top-[calc(20878*var(--u))] left-[calc(1561*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
              Abhimanyu Mehra
            </p>

            {/* ============ NEXT PROJECT ============ */}
            <p
              aria-hidden
              className="font-cormorant text-taupe absolute top-[calc(21075*var(--u))] left-[calc(905*var(--u))] w-[calc(110*var(--u))] text-center text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] font-bold tracking-[calc(-4.8*var(--u))]"
            >
              &gt;
            </p>
            <Link
              href="/work/lahe-life"
              className="font-cormorant text-taupe absolute top-[calc(21163*var(--u))] left-[calc(654*var(--u))] block w-[calc(612*var(--u))] text-center text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]"
            >
              Next Project
            </Link>
            <p className="font-helvetica-regular text-sage absolute top-[calc(21262*var(--u))] left-[calc(810*var(--u))] w-[calc(300*var(--u))] text-center text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
              Lahé Life
            </p>
          </div>

          {/* ============ STRATEGY (sits above the posts, pushes them down) ============ */}
          <ReadMoreCopy
            ref={strategyRef}
            className="top-[calc(3405*var(--u))] left-[calc(1069*var(--u))] w-[calc(677*var(--u))]"
            lead={[
              "The strategy was to build a digital archive where a person could travel through centuries of time before returning to live in the present, which is precisely how Svaasa feels when you stay there.",
              "Every creative choice was an intentional act of preservation. The reliance on sepia and black-and-white tones strips away modern noise, while the acoustic soundscape, sourcing the rare, nostalgic Punjabi folk tunes of Surinder Kaur and the classical depth of Bhai Bidi Chand.. restores the rhythm of the province. You may find yourself humming these tunes when you’re at Svaasa.",
            ]}
            expandedTail={[
              "Defying the fleeting, fast-paced rules of the Instagram algorithm, the written stories are deliberately expansive. This is not content; it is a permanent archival for Svaasa – a breath of life, a home, a history.",
            ]}
            expanded={strategyExpanded}
            onToggle={() => setStrategyExpanded((prev) => !prev)}
          />
        </div>

        {/* ============ TITLE + CREDITS + INTRO ============ */}
        <h1 className="font-cormorant text-taupe absolute top-[calc(1294*var(--u))] left-[calc(103*var(--u))] w-[calc(900*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]">
          Ranjit’s Svaasa
        </h1>
        <div className="font-helvetica-regular text-taupe absolute top-[calc(1438*var(--u))] left-[calc(109*var(--u))] w-[calc(523*var(--u))] text-[length:calc(28*var(--u))] leading-[0.9976] tracking-[calc(0.56*var(--u))] uppercase opacity-80">
          <p>Brand Film</p>
          <p>Creative Direction</p>
          <p>Social Media</p>
          <p>Narrative</p>
        </div>
        <ReadMoreCopy
          ref={introRef}
          className="top-[calc(1440*var(--u))] left-[calc(981*var(--u))] w-[calc(677*var(--u))]"
          lead={[
            "Ranjit’s Svaasa is a 200-year-old palatial haveli, now a family-hosted boutique homestay in the heart of Amritsar city.",
            "The Mehra family, who still opens these ancestral doors to the world, has roots embedded seven generations deep into this soil. When we approached the creative direction for their social media and brand film, we knew the narrative could not merely start from the present. It had to honor all those who lived before us – the lineage of the family, the civic fabric of Amritsar as shaped by them, and the timeless sanctum of the Golden Temple as respected and taken care of by them.",
          ]}
          expandedTail={[
            "The brand then came alive as a weave of archival frames, as a family’s story, stitched into the walls of a haveli and carefully captured through our lens. Every frame holds a revived fragment.. a tale, an old wall, or the quiet gestures that make a house a home.",
            "“For SVAASA, we lingered on the history living inside corridors, the sun-shadows dancing along carved balconies, and the chaotic moments of Punjab slipping gently between frames.” The result is more than documentation, it is an intimate portrait where heritage, family, and the passage of time converge into a visual reverie, inviting you to step inside and linger.",
          ]}
          expanded={introExpanded}
          onToggle={() => setIntroExpanded((prev) => !prev)}
        />
      </div>
    </div>
  );
}
