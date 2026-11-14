"use client";

import { useState } from "react";
import Link from "next/link";
import { HeroHeader } from "@/components/home/HeroHeader";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { ReadMoreCopy } from "@/components/work/ReadMoreCopy";
import { assetPath, cn } from "@/lib/utils";

/*
  Laheké Cafe — reproduction of the Figma project-page frame "Laheke"
  (node 2823:1686, 1920 x 14284) for AJC-26.

  Same technique as Hill Tribe: an absolutely positioned canvas where `--u` =
  1 Figma px = 100cqw / 1920, so every Figma coordinate is written
  `calc(<px>*var(--u))` and the layout scales with the viewport.

  Images are the Figma layer exports, already cropped to their Figma boxes.
  Not exported yet (so not drawn): the logo construction grid (Group 139), the
  hornbill mark over the coasters (Vector 2823:1711), the "vivek-kumar" photo
  of the closing band and the press logo (image 15). The four swatch colours
  are sampled from the brand artwork until the Figma fills are confirmed.
*/

// String srcs are not basePath-prefixed by next/image, so prefix them here
// (required on GitHub Pages, which serves the site under a subpath).
const IMG = assetPath("/images/projects/laheke-cafe");

/** Absolutely positioned image box; `className` sets its canvas box. */
function Pic({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("absolute overflow-hidden", className)}>
      <OptimizedImage
        src={`${IMG}/${src}`}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={`(min-width: 1920px) ${width}px, ${Math.round((width / 1920) * 100)}vw`}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

export function LahekeCafePage() {
  const [introExpanded, setIntroExpanded] = useState(false);

  return (
    <div className="bg-cream @container relative mx-auto w-full max-w-[1920px] overflow-hidden [--u:calc(100cqw/1920)]">
      {/* Overlay chrome (menu toggle), same as About/home */}
      <HeroHeader menuOnly />

      <div className="relative h-[calc(14284*var(--u))] w-full">
        {/* ============ HERO ============ */}
        <Pic
          src="hero.png"
          alt="A clay teapot resting in its bowl, in black and white"
          width={1920}
          height={1104}
          className="top-0 left-0 h-[calc(1104*var(--u))] w-[calc(1920*var(--u))]"
          priority
        />
        <p className="font-helvetica absolute top-[calc(510*var(--u))] left-[calc(103*var(--u))] w-[calc(348*var(--u))] text-[length:calc(28*var(--u))] font-bold tracking-[calc(0.56*var(--u))] text-white uppercase opacity-80">
          2026 / ২০২৬
        </p>
        <p className="font-helvetica absolute top-[calc(510*var(--u))] left-[calc(1469*var(--u))] w-[calc(348*var(--u))] text-right text-[length:calc(28*var(--u))] font-bold tracking-[calc(0.56*var(--u))] text-white uppercase opacity-80">
          AJC in Assam / অসম
        </p>

        {/* ============ TITLE + CREDITS + INTRO ============ */}
        <h1 className="font-cormorant text-taupe absolute top-[calc(1231*var(--u))] left-[calc(109*var(--u))] w-[calc(868*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]">
          Laheké Cafe
        </h1>
        <div className="font-helvetica-regular text-taupe absolute top-[calc(1434*var(--u))] left-[calc(109*var(--u))] w-[calc(523*var(--u))] text-[length:calc(28*var(--u))] leading-[calc(42*var(--u))] tracking-[calc(0.56*var(--u))] uppercase opacity-80">
          <p>Brand Identity Narrative</p>
          <p>Communication Design</p>
          <p>Packaging design</p>
        </div>
        <ReadMoreCopy
          className="top-[calc(1436*var(--u))] left-[calc(981*var(--u))] w-[calc(677*var(--u))]"
          lead={[
            "Defined by the ritual of the kettle and the patient rhythm of the land, Laheké is a specialty café born from a native way of life where time moves gently.. mirroring the Assamese philosophy of Lahe, or slowness. The space represents a deliberate crossover: where deep cultural heritage meets a refined, modern urban sensibility.",
          ]}
          expandedTail={[
            "With roots planted firmly in a tea-growing legacy spanning generations, Laheké pairs a deep-seated artisanal tea and coffee culture with a thoughtful menu of global comfort food that feels instantly familiar. Set against a largely untouched landscape, the café introduces a profound sense of place.",
          ]}
          expanded={introExpanded}
          onToggle={() => setIntroExpanded((prev) => !prev)}
        />

        {/* ============ IDENTITY ============ */}
        <h2 className="font-cormorant text-taupe absolute top-[calc(1991*var(--u))] left-[calc(109*var(--u))] w-[calc(868*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]">
          Identity
        </h2>
        <Pic
          src="mockup-3.png"
          alt="The Laheké hornbill mark embroidered on an olive uniform"
          width={913}
          height={1083}
          className="top-[calc(1922*var(--u))] left-[calc(972*var(--u))] h-[calc(1083*var(--u))] w-[calc(913*var(--u))]"
        />

        {/* ============ ICONOGRAPHY ============ */}
        <h2 className="font-cormorant text-taupe absolute top-[calc(3290*var(--u))] left-[calc(109*var(--u))] w-[calc(868*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]">
          Iconography
        </h2>
        <div className="font-helvetica-regular text-sage absolute top-[calc(3462*var(--u))] left-[calc(981*var(--u))] w-[calc(712*var(--u))] text-[length:calc(20*var(--u))] leading-[1.15] tracking-[calc(0.4*var(--u))]">
          <p>
            The Laheke identity is a direct tribute to the Great Hornbill, the legendary ‘farmer of
            the forest’ that frequents the region. In Assam, hornbills are as much a part of the
            everyday fabric of life as chai itself. The visual mark distills the bird’s exceptional
            silhouette into a bold, minimalist form.
          </p>
          <p className="mt-[1.15em]">
            The brand mark is a visual anchor for Laheke’s core philosophy. In the wild, the
            hornbill&apos;s giant beak allows it to consume larger fruits, like wild figs, which
            other birds cannot. As they fly across the fragile canopy, they disperse these seeds
            across vast patches of land, single-handedly sustaining the ecosystem&apos;s future. Our
            strategy was to map this ecological narrative directly onto the café&apos;s modern
            identity.
          </p>
        </div>

        {/* ============ PALETTE BAND: hornbill photo + four swatches ============ */}
        <Pic
          src="hornbill.png"
          alt="A great hornbill among bamboo leaves, in black and white"
          width={1920}
          height={1377}
          className="top-[calc(3912*var(--u))] left-0 h-[calc(1377*var(--u))] w-[calc(1920*var(--u))]"
        />
        <div className="absolute top-[calc(4562*var(--u))] left-[calc(351*var(--u))] h-[calc(78*var(--u))] w-[calc(297*var(--u))] bg-[#873427]" />
        <div className="absolute top-[calc(4562*var(--u))] left-[calc(648*var(--u))] h-[calc(78*var(--u))] w-[calc(298*var(--u))] bg-[#5e6a37]" />
        <div className="absolute top-[calc(4640*var(--u))] left-[calc(1243*var(--u))] h-[calc(78*var(--u))] w-[calc(297*var(--u))] bg-[#363a4f]" />
        <div className="absolute top-[calc(4640*var(--u))] left-[calc(1540*var(--u))] h-[calc(78*var(--u))] w-[calc(297*var(--u))] bg-[#ede2d6]" />
        <p className="font-helvetica-regular text-sage absolute top-[calc(5503*var(--u))] left-[calc(981*var(--u))] w-[calc(712*var(--u))] text-[length:calc(20*var(--u))] leading-[1.15] tracking-[calc(0.4*var(--u))]">
          Like the hornbill, Laheke acts as a custodian, cultivating the modern cultural landscape
          while remaining deeply rooted in the soil. Designed to feel as organic as the forest floor
          yet as precise as a global gallery, the identity adapts seamlessly across every physical
          and digital touchpoint – serving as a quiet reminder of continuity, resilience, and the
          beauty of things nurtured patiently over time.
        </p>

        {/* ============ BRAND ASSETS: SIGNAGE ============ */}
        <h2 className="font-cormorant text-taupe absolute top-[calc(5834*var(--u))] left-[calc(109*var(--u))] w-[calc(827*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]">
          Brand Assets
        </h2>
        <p className="font-helvetica-regular text-taupe absolute top-[calc(5877*var(--u))] left-[calc(698*var(--u))] w-[calc(523*var(--u))] text-center text-[length:calc(28*var(--u))] leading-[calc(42*var(--u))] tracking-[calc(0.56*var(--u))] uppercase opacity-80">
          signage DESIGN
        </p>
        <Pic
          src="shop-mockup-3.png"
          alt="A hanging wooden shop sign with the red Laheké hornbill"
          width={650}
          height={956}
          className="top-[calc(6006*var(--u))] left-[calc(-4*var(--u))] h-[calc(941*var(--u))] w-[calc(644*var(--u))]"
        />
        <Pic
          src="mockup-13-v4.png"
          alt="The Laheké Cafe shop window under a red awning"
          width={646}
          height={941}
          className="top-[calc(6006*var(--u))] left-[calc(637*var(--u))] h-[calc(941*var(--u))] w-[calc(646*var(--u))]"
        />
        <Pic
          src="mockup-13-v1.png"
          alt="A Laheké Cafe A-frame sign on the pavement"
          width={644}
          height={941}
          className="top-[calc(6006*var(--u))] left-[calc(1276*var(--u))] h-[calc(941*var(--u))] w-[calc(644*var(--u))]"
        />

        {/* ============ PACKAGING ============ */}
        <p className="font-helvetica-regular text-taupe absolute top-[calc(7043*var(--u))] left-[calc(698*var(--u))] w-[calc(523*var(--u))] text-center text-[length:calc(28*var(--u))] leading-[calc(42*var(--u))] tracking-[calc(0.56*var(--u))] uppercase opacity-80">
          packaging design
        </p>
        <Pic
          src="cup-sleeve.png"
          alt="Laheké Cafe takeaway cup sleeves and an Americano tasting card"
          width={889}
          height={992}
          className="top-[calc(7104*var(--u))] left-[calc(58*var(--u))] h-[calc(992*var(--u))] w-[calc(889*var(--u))]"
        />
        <Pic
          src="mockup-1.png"
          alt="Two stacked red Laheké Cafe paper cups held in both hands"
          width={892}
          height={992}
          className="top-[calc(7106*var(--u))] left-[calc(960*var(--u))] h-[calc(992*var(--u))] w-[calc(892*var(--u))]"
        />
        <Pic
          src="stickers.png"
          alt="Two round Laheké stickers: the hornbill on red and the wordmark over leaves on olive"
          width={778}
          height={839}
          className="top-[calc(8226*var(--u))] left-[calc(571*var(--u))] h-[calc(839*var(--u))] w-[calc(778*var(--u))]"
        />
        <Pic
          src="mockup-11-v2.png"
          alt="Kraft food boxes wrapped in an olive Laheké band: Gentle. Slow. Rooted."
          width={889}
          height={988}
          className="top-[calc(9163*var(--u))] left-[calc(58*var(--u))] h-[calc(988*var(--u))] w-[calc(889*var(--u))]"
        />
        <Pic
          src="mockup-9-v1.png"
          alt="Red and olive Laheké Cafe coasters"
          width={888}
          height={990}
          className="top-[calc(9163*var(--u))] left-[calc(964*var(--u))] h-[calc(990*var(--u))] w-[calc(888*var(--u))]"
        />

        {/* ============ UNIFORM ============ */}
        <p className="font-helvetica-regular text-taupe absolute top-[calc(10204*var(--u))] left-[calc(698*var(--u))] w-[calc(523*var(--u))] text-center text-[length:calc(28*var(--u))] leading-[calc(42*var(--u))] tracking-[calc(0.56*var(--u))] uppercase opacity-80">
          UNIFORM design
        </p>
        <Pic
          src="mockup-4-v2.png"
          alt="A linen apron printed with the Laheké Cafe wordmark"
          width={889}
          height={957}
          className="top-[calc(10267*var(--u))] left-[calc(58*var(--u))] h-[calc(957*var(--u))] w-[calc(889*var(--u))]"
        />
        <Pic
          src="mockup-6-v2.png"
          alt="A canvas work jacket with the Laheké Cafe logo on its pocket, over a wooden chair"
          width={889}
          height={957}
          className="top-[calc(10267*var(--u))] left-[calc(963*var(--u))] h-[calc(957*var(--u))] w-[calc(889*var(--u))]"
        />

        {/* ============ GENTLE . SLOW . ROOTED band ============ */}
        {/* Figma "lane-gore ... 2" (same photo, 1080 tall); the "vivek-kumar" photo
            layered over it is not exported yet. */}
        <Pic
          src="hornbill.png"
          alt=""
          width={1920}
          height={1377}
          className="top-[calc(11165*var(--u))] left-0 h-[calc(1080*var(--u))] w-[calc(1920*var(--u))]"
        />
        <p className="font-cormorant absolute top-[calc(11800*var(--u))] left-[calc(546*var(--u))] w-[calc(827*var(--u))] text-center text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))] text-white">
          Gentle . Slow . Rooted
        </p>

        {/* ============ FEATURES ============ */}
        <h2 className="font-cormorant text-taupe absolute top-[calc(12425*var(--u))] left-[calc(109*var(--u))] w-[calc(612*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]">
          Features
        </h2>
        {/* Press logo (Figma "image 15") not exported yet; linked as text meanwhile. */}
        <a
          href="https://hospitality.economictimes.indiatimes.com/news/hotels/a-taste-of-truly-luxurious-experience-curated-for-the-domestic-market/87928087"
          target="_blank"
          rel="noopener noreferrer"
          className="font-helvetica text-sage absolute top-[calc(12559*var(--u))] left-[calc(109*var(--u))] w-[calc(300*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] uppercase transition-opacity duration-300 hover:opacity-70"
        >
          ET HospitalityWorld
        </a>

        {/* ============ TEAM ============ */}
        <h2 className="font-cormorant text-taupe absolute top-[calc(12843*var(--u))] left-[calc(109*var(--u))] w-[calc(612*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]">
          Team
        </h2>
        <p className="font-helvetica text-sage absolute top-[calc(12852*var(--u))] left-[calc(640*var(--u))] w-[calc(221*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] uppercase">
          Design Lead
        </p>
        <p className="font-helvetica-regular text-sage absolute top-[calc(12852*var(--u))] left-[calc(861*var(--u))] w-[calc(203*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] uppercase">
          saksham khanna
        </p>
        <p className="font-helvetica text-sage absolute top-[calc(12889*var(--u))] left-[calc(640*var(--u))] w-[calc(221*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] uppercase">
          GRAPHIC DESIGN
        </p>
        <p className="font-helvetica-regular text-sage absolute top-[calc(12889*var(--u))] left-[calc(861*var(--u))] w-[calc(203*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] uppercase">
          Guna M
        </p>
        <p className="font-helvetica text-sage absolute top-[calc(12852*var(--u))] left-[calc(1131*var(--u))] w-[calc(240*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] uppercase">
          copy writing
        </p>
        <p className="font-helvetica-regular text-sage absolute top-[calc(12852*var(--u))] left-[calc(1352*var(--u))] w-[calc(233*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] uppercase">
          Loma Garodia
        </p>

        {/* ============ NEXT PROJECT ============ */}
        <p
          aria-hidden
          className="font-cormorant text-taupe absolute top-[calc(13067*var(--u))] left-[calc(905*var(--u))] w-[calc(110*var(--u))] text-center text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] font-bold tracking-[calc(-4.8*var(--u))]"
        >
          &gt;
        </p>
        <Link
          href="/work/hill-tribe"
          className="font-cormorant text-taupe absolute top-[calc(13155*var(--u))] left-[calc(654*var(--u))] block w-[calc(612*var(--u))] text-center text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]"
        >
          Next Project
        </Link>
        <p className="font-helvetica-regular text-sage absolute top-[calc(13260*var(--u))] left-[calc(810*var(--u))] w-[calc(300*var(--u))] text-center text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
          Hill Tribe
        </p>
      </div>
    </div>
  );
}
