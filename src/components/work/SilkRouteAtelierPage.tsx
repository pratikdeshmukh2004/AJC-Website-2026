import Link from "next/link";
import { HeroHeader } from "@/components/home/HeroHeader";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { VirsaExpandableIntro } from "@/components/work/VirsaExpandableIntro";
import { WorkBody, WorkHeading, WorkLabel } from "@/components/work/WorkCopy";
import { assetPath } from "@/lib/utils";

/*
  The Silk Route Atelier — project page at /work/silk-route-atelier (AJC-18),
  from the Figma frame "The Silk Route Atelier" (node 3318:585, 1920 x 13171).

  Same technique as the other case-study pages: `--u` = 1 Figma px =
  100cqw / 1920, so each Figma coordinate is written `calc(<px>*var(--u))`.
  Copy comes from the "0 _ Text - TSRA.docx" in the asset drop.

  The two "Read more" blocks expand in normal flow and push what follows down,
  so the page is split at them into stacked sections. Each section's comment
  gives the Figma y it starts at; children are positioned relative to it:
    A  Hero + intro            y 0–2018      (flow)
    B  Identity … colour strip y 2018–7120   (absolute)
    C  Colour palette copy     y 7120–7440   (flow, Read more)
    D  Typography … packaging  y 7440–10935  (absolute)
    E  Packaging copy          y 10935 (flow, Read more)
    F  Price tag, team, next   y 11190–13171 (absolute)

  */

const IMG = assetPath("/images/projects/the-silk-route-atelier");

export function SilkRouteAtelierPage() {
  return (
    <div className="bg-cream @container relative mx-auto w-full max-w-[1920px] overflow-hidden [--u:calc(100cqw/1920)]">
      <HeroHeader menuOnly />

      {/* ============ A. HERO + INTRO (Figma y 0–2018) ============ */}
      <section className="relative h-[calc(2018*var(--u))]">
        <OptimizedImage
          src={`${IMG}/1.png`}
          alt="Swirling painted clouds from a Tibetan Thangka in warm pinks and creams"
          width={1941}
          height={1086}
          priority
          sizes="100vw"
          className="absolute top-0 left-0 h-auto w-[calc(1920*var(--u))]"
        />
        <WorkHeading
          as="h1"
          className="top-[calc(1215*var(--u))] left-[calc(109*var(--u))] w-[calc(868*var(--u))]"
        >
          The Silk Route Atelier
        </WorkHeading>
        <ul className="font-helvetica-regular text-taupe absolute top-[calc(1520*var(--u))] left-[calc(109*var(--u))] w-[calc(560*var(--u))] text-[length:calc(28*var(--u))] leading-[calc(32*var(--u))] tracking-[calc(0.56*var(--u))] uppercase opacity-80">
          <li>Cultural Research</li>
          <li>Heritage Brand Concept</li>
          <li>Brand Identity</li>
          <li>Packaging Design</li>
        </ul>
        <WorkBody className="top-[calc(1520*var(--u))] left-[calc(981*var(--u))]">
          <p>
            How do you take the ancient, sacred vocabulary of the high Himalayas and translate it
            into a modern, global luxury language? This proprietary case study by AJC explores the
            narrative architecture developed for a hypothetical, ultra-luxury Himalayan couture
            house, referred to here as The Silk Route Atelier.
          </p>
          <p>
            The strategic goal was to build a brand identity that acts as a modern bridge between
            endangered regional heritage and contemporary global design, drawing heavily from the
            historical syncretism of the Silk Route.
          </p>
        </WorkBody>
      </section>

      {/* ============ B. IDENTITY … COLOUR STRIP (Figma y 2018–7120) ============ */}
      <section className="relative h-[calc(5102*var(--u))]">
        <OptimizedImage
          src={`${IMG}/2.png`}
          alt="The Silk Route Atelier wordmark in cream on a deep red painted silk ground"
          width={1957}
          height={1080}
          sizes="100vw"
          className="absolute top-0 left-0 h-auto w-[calc(1920*var(--u))]"
        />

        <WorkHeading className="top-[calc(1207*var(--u))] left-[calc(109*var(--u))] w-[calc(1088*var(--u))]">
          Identity
        </WorkHeading>
        <OptimizedImage
          src={`${IMG}/3.png`}
          alt="The Silk Route Atelier logo, a tiger above the wordmark, on a construction grid"
          width={492}
          height={311}
          sizes="(min-width: 1920px) 530px, 28vw"
          className="absolute top-[calc(1452*var(--u))] left-[calc(236*var(--u))] h-auto w-[calc(530*var(--u))]"
        />
        <OptimizedImage
          src={`${IMG}/3-1.png`}
          alt="A painted tiger emblem on handmade cream paper"
          width={913}
          height={1011}
          sizes="(min-width: 1920px) 950px, 50vw"
          className="absolute top-[calc(1113*var(--u))] left-[calc(970*var(--u))] h-auto w-[calc(950*var(--u))]"
        />
        <WorkLabel className="top-[calc(2222*var(--u))] left-[calc(126*var(--u))]">
          The Myth of the Four Dignities
        </WorkLabel>
        <WorkBody className="top-[calc(2222*var(--u))] left-[calc(971*var(--u))]">
          <p>
            In Tibetan Buddhist mythology, the tiger represents one of the Four Dignities –
            embodying strength, confidence, and absolute humility. Historically, it was a guardian
            of sacred spaces, painted by monks onto Thangkas (sacred scrolls) or woven into
            tapestries to ward off negativity.
          </p>
          <p>
            We harnessed the tiger as the central metaphor for the Atelier’s brand ethos. It
            symbolizes the ferocity required to protect dying Ladakhi craftsmanship, and the
            creative resilience needed to make ancient traditions roar on a contemporary global
            stage.
          </p>
        </WorkBody>

        <OptimizedImage
          src={`${IMG}/5-1.png`}
          alt="Detail of a painted tiger’s head against a red wall"
          width={913}
          height={1061}
          sizes="(min-width: 1920px) 960px, 50vw"
          className="absolute top-[calc(2507*var(--u))] left-0 h-auto w-[calc(960*var(--u))]"
        />
        <OptimizedImage
          src={`${IMG}/5-2.png`}
          alt="A striped tiger in swirling water, from an aged Himalayan painting"
          width={913}
          height={1061}
          sizes="(min-width: 1920px) 960px, 50vw"
          className="absolute top-[calc(2507*var(--u))] left-[calc(960*var(--u))] h-auto w-[calc(960*var(--u))]"
        />

        <WorkHeading className="top-[calc(3702*var(--u))] left-[calc(109*var(--u))] w-[calc(1088*var(--u))]">
          Colour Palette
        </WorkHeading>
        <OptimizedImage
          src={`${IMG}/6.png`}
          alt="A Thangka detail of a raised hand and swirling mineral-pigment clouds"
          width={1905}
          height={1079}
          sizes="100vw"
          className="absolute top-[calc(3889*var(--u))] left-0 h-auto w-[calc(1920*var(--u))]"
        />
        <div className="absolute top-[calc(4398*var(--u))] left-[calc(263*var(--u))] flex h-[calc(70*var(--u))] w-[calc(1316*var(--u))]">
          <div className="flex-1 bg-[#a84f40]" />
          <div className="flex-1 bg-[#b66b12]" />
          <div className="flex-1 bg-[#f7f5ee]" />
          <div className="flex-1 bg-[#9c3d37]" />
          <div className="flex-1 bg-[#8c6e51]" />
          <div className="flex-1 bg-[#744a2f]" />
          <div className="flex-1 bg-[#e5dfc9]" />
        </div>
      </section>

      {/* ============ C. COLOUR PALETTE COPY (Figma y 7120, Read more) ============ */}
      <section className="relative">
        <WorkLabel className="top-0 left-[calc(126*var(--u))]">
          Hues as old as the Himalayas
        </WorkLabel>
        <VirsaExpandableIntro
          x={971}
          y={0}
          width={677}
          preview={
            <div className="flex flex-col gap-[calc(20*var(--u))]">
              <p>
                Centuries ago, Ladakh served as a sanctuary for travelers, monks, and merchants
                moving along trade routes. Among the treasures exchanged were the pigments of the
                earth – colors extracted directly from the rugged landscape and preserved eternally
                in Buddhist Thangka paintings.
              </p>
              <p>
                AJC mapped out a proprietary color strategy based entirely on this ancient alchemy:
                Rather than using modern, synthetic luxury tones, the
              </p>
            </div>
          }
          full={
            <div className="flex flex-col gap-[calc(20*var(--u))]">
              <p>
                Centuries ago, Ladakh served as a sanctuary for travelers, monks, and merchants
                moving along trade routes. Among the treasures exchanged were the pigments of the
                earth – colors extracted directly from the rugged landscape and preserved eternally
                in Buddhist Thangka paintings.
              </p>
              <p>
                AJC mapped out a proprietary color strategy based entirely on this ancient alchemy:
                Rather than using modern, synthetic luxury tones, the palette is a revival of
                historical natural dyes crafted by artisans through immense patience. These
                specific, mineral-driven hues embody the soul of the high-altitude desert: bold,
                resilient, and deeply spiritual. It ensures that every touchpoint of the brand tells
                a story of the mountains before a single garment is ever touched.
              </p>
            </div>
          }
          fade={{ x: -35, y: 140, width: 747, height: 60 }}
          toggle={{ x: 0, y: 210 }}
          gapBelow={107}
        />
      </section>

      {/* ============ D. TYPOGRAPHY … PACKAGING (Figma y 7440–10935) ============ */}
      <section className="relative h-[calc(3495*var(--u))]">
        <WorkHeading className="top-0 left-[calc(109*var(--u))] w-[calc(1088*var(--u))]">
          Typography
        </WorkHeading>
        <OptimizedImage
          src={`${IMG}/7-1.png`}
          alt="Hand-lettered Tibetan script in the Kyuk style, in red ink"
          width={498}
          height={153}
          sizes="(min-width: 1920px) 498px, 26vw"
          className="absolute top-[calc(227*var(--u))] left-[calc(247*var(--u))] h-auto w-[calc(498*var(--u))]"
        />
        <OptimizedImage
          src={`${IMG}/7-2.png`}
          alt="Hand-lettered Tibetan script in the Umey style, in red ink"
          width={489}
          height={192}
          sizes="(min-width: 1920px) 489px, 26vw"
          className="absolute top-[calc(200*var(--u))] left-[calc(1118*var(--u))] h-auto w-[calc(489*var(--u))]"
        />
        <p className="font-helvetica text-sage absolute top-[calc(508*var(--u))] left-[calc(126*var(--u))] text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] font-bold tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
          Script Kyuk
        </p>
        <WorkLabel className="top-[calc(508*var(--u))] left-[calc(637*var(--u))] w-[calc(220*var(--u))] text-right">
          Cursive &amp; Informal
        </WorkLabel>
        <p className="font-helvetica text-sage absolute top-[calc(508*var(--u))] left-[calc(990*var(--u))] text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] font-bold tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
          Script Umey
        </p>
        <WorkLabel className="top-[calc(508*var(--u))] left-[calc(1248*var(--u))] w-[calc(500*var(--u))] text-right">
          Variation of Uchen, Cursive &amp; Headless
        </WorkLabel>
        <p className="font-helvetica-regular text-sage absolute top-[calc(664*var(--u))] left-[calc(126*var(--u))] text-[length:calc(28*var(--u))] leading-[calc(32*var(--u))] tracking-[calc(0.56*var(--u))] whitespace-nowrap uppercase">
          Script as sacred geometry
        </p>
        <WorkBody className="top-[calc(665*var(--u))] left-[calc(954*var(--u))] gap-[calc(22*var(--u))] text-[length:calc(18*var(--u))] tracking-[calc(0.36*var(--u))]">
          <p>
            To anchor the visual identity in authentic regional richness, the proposed visual
            framework integrates traditional script written in Umey and Kyuk variations,
            historically utilized for sacred texts and artistic expression.
          </p>
          <p>
            By creating variations hand-rendered by a regional monk, the identity celebrates the
            fluid precision of the greater Himalayan and Central Asian corridors. It emphasizes the
            brand’s role not as a mere fashion label, but as a living archive of the Silk Route’s
            cultural cross-pollination.
          </p>
        </WorkBody>

        <WorkHeading className="top-[calc(1075*var(--u))] left-[calc(109*var(--u))] w-[calc(1088*var(--u))]">
          Brand Assets
        </WorkHeading>
        <WorkLabel className="top-[calc(1120*var(--u))] left-[calc(971*var(--u))]">
          Packaging
        </WorkLabel>
        <OptimizedImage
          src={`${IMG}/8-1.png`}
          alt="A deep red Silk Route Atelier shopping bag with dark ribbon handles in hard sunlight"
          width={1947}
          height={1080}
          sizes="100vw"
          className="absolute top-[calc(1290*var(--u))] left-0 h-auto w-[calc(1920*var(--u))]"
        />
        <OptimizedImage
          src={`${IMG}/8-2.png`}
          alt="A hand holding a parcel wrapped in Silk Route Atelier tiger-pattern paper and tied with string"
          width={913}
          height={1029}
          sizes="(min-width: 1920px) 913px, 48vw"
          className="absolute top-[calc(2395*var(--u))] left-[calc(32*var(--u))] h-auto w-[calc(913*var(--u))]"
        />
        <OptimizedImage
          src={`${IMG}/10.png`}
          alt="Two stacks of terracotta Silk Route Atelier business cards with a cream tiger emblem on textured stone"
          width={913}
          height={1029}
          sizes="(min-width: 1920px) 913px, 48vw"
          className="absolute top-[calc(2395*var(--u))] left-[calc(960*var(--u))] h-auto w-[calc(913*var(--u))]"
        />
      </section>

      {/* ============ E. PACKAGING COPY (Figma y 10935, Read more) ============ */}
      <section className="relative">
        <VirsaExpandableIntro
          x={960}
          y={0}
          width={677}
          preview={
            <div className="flex flex-col gap-[calc(20*var(--u))]">
              <p>
                The packaging design is inspired by a 17th-century Buddhist Thangka painting housed
                at The Metropolitan Museum of Art, New York. This historic artwork, adorned with a
                phoenix soaring above swirling clouds, radiant sun motifs, cresting waves, and
                delicate floral patterns, became a visual and symbolic reference for the design.
                These elements – representing rebirth, continuity, and harmony with nature – mirror
                the brand’s own philosophy rooted in revival, heritage, and elegance. We translated
                this centuries-old visual language into a packaging system that feels bold,
                intricate, and timeless, just like the garments it houses.
              </p>
            </div>
          }
          full={
            <div className="flex flex-col gap-[calc(20*var(--u))]">
              <p>
                The packaging design is inspired by a 17th-century Buddhist Thangka painting housed
                at The Metropolitan Museum of Art, New York. This historic artwork, adorned with a
                phoenix soaring above swirling clouds, radiant sun motifs, cresting waves, and
                delicate floral patterns, became a visual and symbolic reference for the design.
                These elements – representing rebirth, continuity, and harmony with nature – mirror
                the brand’s own philosophy rooted in revival, heritage, and elegance. We translated
                this centuries-old visual language into a packaging system that feels bold,
                intricate, and timeless, just like the garments it houses.
              </p>
              <p>
                A deep, resonant red, drawn directly from the painting’s palette, anchors the design
                – a color long associated with power, protection, and auspicious beginnings across
                both Chinese and Himalayan cultures. It adds a visceral richness that makes the
                packaging feel both sacred and striking.
              </p>
              <p>
                By placing a piece of that legacy on something as humble as a price tag, we ensure
                that each garment carries with it not just value, but lineage – a tactile reminder
                that what you’re holding is a continuation of a story centuries in the making.
              </p>
            </div>
          }
          fade={{ x: -35, y: 165, width: 747, height: 82 }}
          toggle={{ x: 0, y: 245 }}
          gapBelow={100}
        />
      </section>

      {/* ============ F. PRICE TAG, TEAM, NEXT PROJECT (Figma y 11190–13171) ============ */}
      <section className="relative h-[calc(1981*var(--u))]">
        <OptimizedImage
          src={`${IMG}/9.png`}
          alt="Silk Route Atelier price tag layout in deep red with fabric, style, size and care details"
          width={1039}
          height={928}
          sizes="(min-width: 1920px) 1040px, 54vw"
          className="absolute top-0 left-[calc(450*var(--u))] h-auto w-[calc(1040*var(--u))]"
        />

        <WorkHeading className="top-[calc(1300*var(--u))] left-[calc(109*var(--u))] w-[calc(1088*var(--u))]">
          Team
        </WorkHeading>
        <p className="font-helvetica text-sage absolute top-[calc(1330*var(--u))] left-[calc(954*var(--u))] text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] font-bold tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
          Visual Design
        </p>
        <WorkLabel className="top-[calc(1330*var(--u))] left-[calc(1338*var(--u))]">
          Praneet Selva
        </WorkLabel>
        <p className="font-helvetica text-sage absolute top-[calc(1365*var(--u))] left-[calc(954*var(--u))] text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] font-bold tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
          Tibetan Script
        </p>
        <WorkLabel className="top-[calc(1365*var(--u))] left-[calc(1338*var(--u))]">
          Lobsang Tsultrim (Lahaul)
        </WorkLabel>

        <p
          aria-hidden
          className="font-cormorant text-taupe absolute top-[calc(1557*var(--u))] left-[calc(905*var(--u))] w-[calc(110*var(--u))] text-center text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] font-bold"
        >
          &gt;
        </p>
        <Link
          href="/work/farmers-house-cafe"
          className="font-cormorant text-taupe absolute top-[calc(1645*var(--u))] left-[calc(654*var(--u))] block w-[calc(612*var(--u))] text-center text-[length:calc(80*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-4.8*var(--u))]"
        >
          Next Project
        </Link>
        <p className="font-helvetica-regular text-sage absolute top-[calc(1751*var(--u))] left-[calc(830*var(--u))] w-[calc(260*var(--u))] text-center text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase">
          Farmers’ House Cafe
        </p>
      </section>
    </div>
  );
}
