"use client";

import { useState } from "react";
import Link from "next/link";
import { HeroHeader } from "@/components/home/HeroHeader";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { ReadMoreCopy, useExpandReflow } from "@/components/work/ReadMoreCopy";
import { assetPath, cn, u } from "@/lib/utils";

/*
  Hill Tribe — reproduction of the Figma project-page frame "Hill Tribe"
  (node 2823:1322, 1920 x 12757) for AJC-27.

  Same technique as the Assam Bengal / Haveli / Neemrana pages: an absolutely
  positioned canvas where `--u` = 1 Figma px = 100cqw / 1920, so every Figma
  coordinate is written `calc(<px>*var(--u))` and the layout scales
  proportionally with the viewport (exact at 1920px, smaller below).

  Figma percentage offsets were converted to px against the 1920-wide frame;
  image crops are the Figma fill offsets. The two "Read more" blocks reflow the
  content below them when expanded (see the shift groups in the canvas).
*/

// String srcs are not basePath-prefixed by next/image, so prefix them here
// (required on GitHub Pages, which serves the site under a subpath).
const IMG = assetPath("/images/projects/hill-tribe");

/**
 * Absolutely-positioned image box. `className` positions/sizes the box in
 * canvas units; `imgClassName` is the Figma crop (defaults to a plain
 * object-cover fill).
 */
function Pic({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
}: {
  src: string;
  alt: string;
  className: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("absolute overflow-hidden", className)}>
      <OptimizedImage
        src={`${IMG}/${src}`}
        alt={alt}
        width={1920}
        height={1080}
        priority={priority}
        sizes="(min-width: 1920px) 1920px, 100vw"
        className={cn("absolute max-w-none", imgClassName ?? "inset-0 h-full w-full object-cover")}
      />
    </div>
  );
}

/**
 * One dashed hairline of the guide grid around the logo (Figma "Group 137":
 * 1.5px, #D2C8BE, ~2.5px dashes). Position and length come in via `className`.
 */
function GuideLine({ vertical = false, className }: { vertical?: boolean; className: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute",
        vertical
          ? "w-[calc(1.5*var(--u))] bg-[image:repeating-linear-gradient(to_bottom,#d2c8be_0_calc(2.48*var(--u)),transparent_calc(2.48*var(--u))_calc(4.96*var(--u)))]"
          : "h-[calc(1.5*var(--u))] bg-[image:repeating-linear-gradient(to_right,#d2c8be_0_calc(2.48*var(--u)),transparent_calc(2.48*var(--u))_calc(4.96*var(--u)))]",
        className,
      )}
    />
  );
}

export function HillTribePage() {
  const [introExpanded, setIntroExpanded] = useState(false);
  const [identityExpanded, setIdentityExpanded] = useState(false);

  // Each expanded block pushes everything below it down by the overflow, so
  // the longer copy never lands on the next image. 1903 / 4675 are the Figma
  // tops of the full-bleed images that follow each block.
  const [introRef, introShift] = useExpandReflow(introExpanded, 1903);
  const [identityRef, identityShift] = useExpandReflow(identityExpanded, 4675);
  const totalShift = introShift + identityShift;

  return (
    <div className="bg-cream @container relative mx-auto w-full max-w-[1920px] overflow-hidden [--u:calc(100cqw/1920)]">
      {/* Overlay chrome (menu toggle), same as About/home */}
      <HeroHeader menuOnly />

      <div className="relative w-full" style={{ height: u(12757 + totalShift) }}>
        {/* ============ HERO ============ */}
        <Pic
          src="hero.png"
          alt="Mountains above Turtuk in Ladakh"
          className="top-[calc(-251*var(--u))] left-[calc(-77*var(--u))] h-[calc(1331*var(--u))] w-[calc(1997*var(--u))]"
          imgClassName="top-[11.48%] left-[1.93%] h-full w-[99.96%]"
          priority
        />

        <p className="font-helvetica absolute top-[calc(528*var(--u))] left-[calc(112*var(--u))] w-[calc(348*var(--u))] text-[length:calc(28*var(--u))] font-bold tracking-[calc(0.56*var(--u))] text-white uppercase opacity-80">
          2025 / ۲۰۲۵
        </p>
        <p className="font-helvetica absolute top-[calc(528*var(--u))] left-[calc(1472*var(--u))] w-[calc(348*var(--u))] text-center text-[length:calc(28*var(--u))] font-bold tracking-[calc(0.56*var(--u))] text-white uppercase opacity-80">
          AJC in Ladakh / لداخ
        </p>

        {/* ============ TITLE + CREDITS + INTRO ============ */}
        <h1 className="font-cormorant text-taupe absolute top-[calc(1192*var(--u))] left-[calc(108*var(--u))] w-[calc(1088*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]">
          Hill Tribe
        </h1>
        <div className="font-helvetica-regular absolute top-[calc(1381*var(--u))] left-[calc(109*var(--u))] w-[calc(575*var(--u))] text-[length:calc(28*var(--u))] leading-[normal] tracking-[calc(0.56*var(--u))] text-[#836b43] uppercase opacity-80">
          <p>Brand Identity</p>
          <p>Narrative</p>
          <p>Packaging Design</p>
          <p>Product Photography</p>
          <p>Creative Direction</p>
        </div>
        <ReadMoreCopy
          ref={introRef}
          className="top-[calc(1388*var(--u))] left-[calc(954*var(--u))] w-[calc(585*var(--u))]"
          textClassName="text-[#a69576]"
          lead={[
            "“Bohot bhadiya.” – said he, with the gentle rhyme of Urdu-Farsi; a man who traversed the Karakoram mountains long before his store ever existed.",
            "Hill Tribe is an organic store in Turtuk, but more accurately, it is the living archive of Mr. Abdul Rashid Khan. A man of quiet resilience and the most charming stories, Mr. Khan’s life spans the memory of the Kargil war to simpler times spent climbing the vast mountains of Baltistan in search of Shilajit. Today, if you follow him up a mountain, you will still find us panting like the donkey who accompanied him back in the day.",
          ]}
          expandedTail={[
            "Where our city eye sees a rugged landscape, Mr. Khan sees a blooming garden. His store holds over 150 mountain secrets – rare herbs, sun-dried fruits, and wild botanicals that only a lifetime of walking these peaks could unearth. It was our privilege, to bring his life, into this small slice he calls his store.",
          ]}
          expanded={introExpanded}
          onToggle={() => setIntroExpanded((prev) => !prev)}
        />

        {/* Everything below the intro moves down when the intro is expanded. */}
        <div
          className="absolute top-0 left-0 h-0 w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateY(${u(introShift)})` }}
        >
          {/* Full-bleed band under the intro */}
          <Pic
            src="avani-rai.png"
            alt="Hill Tribe products set against the mountain"
            className="top-[calc(1903*var(--u))] left-[calc(-39*var(--u))] h-[calc(1085*var(--u))] w-[calc(1997*var(--u))]"
            imgClassName="top-[-99.7%] left-[-0.06%] h-[276.13%] w-[100.03%]"
          />

          {/* ============ IDENTITY ============ */}
          <h2 className="font-cormorant text-taupe absolute top-[calc(3868*var(--u))] left-[calc(108*var(--u))] w-[calc(1088*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]">
            Identity
          </h2>

          {/* Logo framed by the dashed guide grid (Figma "Group 137") */}
          <Pic
            src="palette-photo.png"
            alt="Hill Tribe logo: from the last village of India"
            className="top-[calc(3342*var(--u))] left-[calc(716*var(--u))] h-[calc(307*var(--u))] w-[calc(487*var(--u))]"
          />
          <GuideLine
            vertical
            className="top-[calc(3362*var(--u))] left-[calc(652*var(--u))] h-[calc(318*var(--u))]"
          />
          <GuideLine
            vertical
            className="top-[calc(3362*var(--u))] left-[calc(711*var(--u))] h-[calc(318*var(--u))]"
          />
          <GuideLine
            vertical
            className="top-[calc(3362*var(--u))] left-[calc(1202*var(--u))] h-[calc(318*var(--u))]"
          />
          <GuideLine
            vertical
            className="top-[calc(3362*var(--u))] left-[calc(1268*var(--u))] h-[calc(318*var(--u))]"
          />
          <GuideLine className="top-[calc(3362*var(--u))] left-[calc(652*var(--u))] w-[calc(616*var(--u))]" />
          <GuideLine className="top-[calc(3462*var(--u))] left-[calc(652*var(--u))] w-[calc(616*var(--u))]" />
          <GuideLine className="top-[calc(3493*var(--u))] left-[calc(652*var(--u))] w-[calc(616*var(--u))]" />
          <GuideLine className="top-[calc(3581*var(--u))] left-[calc(652*var(--u))] w-[calc(616*var(--u))]" />
          <GuideLine className="top-[calc(3612*var(--u))] left-[calc(652*var(--u))] w-[calc(616*var(--u))]" />
          <GuideLine className="top-[calc(3629*var(--u))] left-[calc(652*var(--u))] w-[calc(616*var(--u))]" />
          <GuideLine className="top-[calc(3680*var(--u))] left-[calc(652*var(--u))] w-[calc(616*var(--u))]" />

          <ReadMoreCopy
            ref={identityRef}
            className="top-[calc(4099*var(--u))] left-[calc(953*var(--u))] w-[calc(596*var(--u))]"
            textClassName="text-[#a69576]"
            lead={[
              "The branding brief for Hill Tribe, hence, was not manufactured; it was observed. It was formed from his personal narrative: a man, a mountain, and his donkey in search of Shilajit.",
              "When we first showed him the concept, he let out a small, amused chuckle – thinking us kids make anything these days. Yet, it was that exact humility we sought to capture. To honor the depth of his roots, we infused the typography with a subtle nod to the Urdu-Farsi script, anchoring the brand in his voice before the world ever saw it.",
            ]}
            expandedTail={[
              "Nearly a hundred meters from the store lies Mr. Khan’s farm, an endless expanse where the finest apples and grapes grow beneath the Himalayan sky. When we first stepped foot there, unable to differentiate coriander from dragon head, he chuckled at our city innocence. That farm, with its trees stretching to the edge of sight, became the literal blueprint for our visual identity. The illustrations were humble, and rooted, translating the untamed lines of his orchards into the packaging itself.",
            ]}
            expanded={identityExpanded}
            onToggle={() => setIdentityExpanded((prev) => !prev)}
          />

          {/* Everything below the Identity copy moves down when it is expanded. */}
          <div
            className="absolute top-0 left-0 h-0 w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateY(${u(identityShift)})` }}
          >
            {/* ============ COLOUR PALETTE ============ */}
            <h2 className="font-cormorant text-taupe absolute top-[calc(4537*var(--u))] left-[calc(108*var(--u))] w-[calc(1088*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]">
              Colour Palette
            </h2>
            <Pic
              src="colour-palette-band.png"
              alt="Mountain slope above Turtuk"
              className="top-[calc(4675*var(--u))] left-0 h-[calc(918*var(--u))] w-[calc(1920*var(--u))]"
            />
            {/* Five swatches in one row, ending at the Figma right edge (x1541). */}
            <div className="absolute top-[calc(5095*var(--u))] left-[calc(376*var(--u))] h-[calc(78*var(--u))] w-[calc(233*var(--u))] bg-[#2c2b25]" />
            <div className="absolute top-[calc(5095*var(--u))] left-[calc(609*var(--u))] h-[calc(78*var(--u))] w-[calc(233*var(--u))] bg-[#8d837f]" />
            <div className="absolute top-[calc(5095*var(--u))] left-[calc(842*var(--u))] h-[calc(78*var(--u))] w-[calc(233*var(--u))] bg-[#665442]" />
            <div className="absolute top-[calc(5095*var(--u))] left-[calc(1075*var(--u))] h-[calc(78*var(--u))] w-[calc(233*var(--u))] bg-[#575d3d]" />
            <div className="absolute top-[calc(5095*var(--u))] left-[calc(1308*var(--u))] box-border h-[calc(78*var(--u))] w-[calc(233*var(--u))] border border-[#836b43] bg-[#fbfbf9]" />

            <div className="font-helvetica-regular absolute top-[calc(5689*var(--u))] left-[calc(953*var(--u))] w-[calc(596*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] text-[#a69576]">
              <p>
                The palette was earthy, raw, and entirely local, sampled from the natural tones of
                Turtuk’s soil, flora, and dried harvests.
              </p>
              <p className="mt-[calc(69*var(--u))]">
                To bring the brand alive, we bypassed the artificiality of a studio. We took the
                finished products back to their very origin, photographing them in Turtuk’s
                unfiltered, shifting natural light. Set against the rocks and soil from which they
                came, the creative cycle completed itself: the fruits of the earth, returning to the
                earth, contextualised for the modern world.
              </p>
            </div>

            {/* ============ GALLERY ============ */}
            <Pic
              src="207.png"
              alt="Hill Tribe products in Turtuk"
              className="top-[calc(6101*var(--u))] left-[calc(56*var(--u))] h-[calc(1079*var(--u))] w-[calc(906*var(--u))]"
              imgClassName="top-0 left-0 h-[104.95%] w-full"
            />
            <Pic
              src="208.png"
              alt="Hill Tribe products in Turtuk"
              className="top-[calc(6105*var(--u))] left-[calc(962*var(--u))] h-[calc(1079*var(--u))] w-[calc(906*var(--u))]"
              imgClassName="top-[-0.01%] left-[-44.15%] h-[104.96%] w-[187.49%]"
            />
            <Pic
              src="217.png"
              alt="Hill Tribe products in Turtuk"
              className="top-[calc(7180*var(--u))] left-[calc(52*var(--u))] h-[calc(1100*var(--u))] w-[calc(910*var(--u))]"
              imgClassName="top-0 left-0 h-[103.39%] w-[99.99%]"
            />
            <Pic
              src="218.png"
              alt="Hill Tribe products in Turtuk"
              className="top-[calc(7184*var(--u))] left-[calc(962*var(--u))] h-[calc(1096*var(--u))] w-[calc(906*var(--u))]"
              imgClassName="top-0 left-0 h-[103.32%] w-full"
            />

            <h2 className="font-cormorant text-taupe absolute top-[calc(8393*var(--u))] left-[calc(108*var(--u))] w-[calc(1088*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(102*var(--u))] tracking-[calc(-5.82*var(--u))]">
              Photography &amp;
              <br />
              Creative Direction
            </h2>
            <Pic
              src="223.png"
              alt="Hill Tribe in the mountains"
              className="top-[calc(8648*var(--u))] left-[calc(30*var(--u))] h-[calc(1080*var(--u))] w-[calc(1860*var(--u))]"
              imgClassName="top-[-11.86%] left-0 h-[114.83%] w-full"
            />
            <Pic
              src="215-a.png"
              alt="Hill Tribe products in Turtuk"
              className="top-[calc(9761*var(--u))] left-[calc(30*var(--u))] h-[calc(663*var(--u))] w-[calc(931*var(--u))]"
              imgClassName="top-[0.06%] left-[0.04%] h-full w-[106.73%]"
            />
            <Pic
              src="209-a.png"
              alt="Hill Tribe products in Turtuk"
              className="top-[calc(9761*var(--u))] left-[calc(993*var(--u))] h-[calc(663*var(--u))] w-[calc(897*var(--u))]"
              imgClassName="top-[-68.65%] left-[-1.78%] h-[187%] w-[110.58%]"
            />
            <p className="font-cormorant absolute top-[calc(10533*var(--u))] left-[calc(460*var(--u))] w-[calc(1000*var(--u))] text-center text-[length:calc(47*var(--u))] leading-[calc(48*var(--u))] tracking-[calc(-0.47*var(--u))] text-[#8b7f73]">
              “Products of the Earth - our concept, dives into the
              <br />
              land of Turtuk, pulling roots straight from the sand.”
            </p>
            <Pic
              src="215-b.png"
              alt="Hill Tribe products in Turtuk"
              className="top-[calc(10736*var(--u))] left-[calc(30*var(--u))] h-[calc(997*var(--u))] w-[calc(931*var(--u))]"
              imgClassName="top-[-14.12%] left-0 h-[116.72%] w-full"
            />
            <Pic
              src="209-b.png"
              alt="Hill Tribe products in Turtuk"
              className="top-[calc(10736*var(--u))] left-[calc(993*var(--u))] h-[calc(997*var(--u))] w-[calc(897*var(--u))]"
              imgClassName="top-[-0.01%] left-[-17.15%] h-[100.01%] w-[117.15%]"
            />

            {/* ============ TEAM ============ */}
            <h2 className="font-cormorant text-taupe absolute top-[calc(11882*var(--u))] left-[calc(108*var(--u))] w-[calc(868*var(--u))] text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]">
              Team
            </h2>
            <p className="font-helvetica text-sage absolute top-[calc(11908*var(--u))] left-[calc(810*var(--u))] w-[calc(192*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))]">
              PHOTOGRAPHY
            </p>
            <p className="font-helvetica-regular text-sage absolute top-[calc(11908*var(--u))] left-[calc(1015*var(--u))] w-[calc(203*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] uppercase">
              Avani Rai
            </p>
            <p className="font-helvetica text-sage absolute top-[calc(11945*var(--u))] left-[calc(810*var(--u))] w-[calc(192*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))]">
              PHOTOGRAPHY
            </p>
            <p className="font-helvetica-regular text-sage absolute top-[calc(11945*var(--u))] left-[calc(1015*var(--u))] w-[calc(203*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] uppercase">
              Ansen Antony
            </p>
            <p className="font-helvetica text-sage absolute top-[calc(11908*var(--u))] left-[calc(1281*var(--u))] w-[calc(240*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))] uppercase">
              Visual Design
            </p>
            <p className="font-helvetica-regular text-sage absolute top-[calc(11908*var(--u))] left-[calc(1526*var(--u))] w-[calc(233*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] uppercase">
              Praneet Selva
            </p>
            <p className="font-helvetica text-sage absolute top-[calc(11945*var(--u))] left-[calc(1282*var(--u))] w-[calc(210*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] font-bold tracking-[calc(0.4*var(--u))]">
              CREATIVE PARTNER
            </p>
            <p className="font-helvetica-regular text-sage absolute top-[calc(11945*var(--u))] left-[calc(1527*var(--u))] w-[calc(265*var(--u))] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] uppercase">
              Rashidullah Khan
            </p>

            {/* ============ NEXT PROJECT ============ */}
            <p
              aria-hidden
              className="font-cormorant text-taupe absolute top-[calc(12068*var(--u))] left-[calc(905*var(--u))] w-[calc(110*var(--u))] text-center text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] font-bold tracking-[calc(-4.8*var(--u))]"
            >
              &gt;
            </p>
            <Link
              href="/work/balti-kitchen"
              className="font-cormorant text-taupe absolute top-[calc(12156*var(--u))] left-[calc(654*var(--u))] block w-[calc(612*var(--u))] text-center text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]"
            >
              Next Project
            </Link>
            <p className="font-helvetica-regular text-sage absolute top-[calc(12256*var(--u))] left-[calc(810*var(--u))] w-[calc(300*var(--u))] text-center text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
              Balti Kitchen
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
