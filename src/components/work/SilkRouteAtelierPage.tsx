import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { VirsaExpandableIntro } from "@/components/work/VirsaExpandableIntro";
import { assetPath, at } from "@/lib/utils";

/*
  The Silk Route Atelier — project page at /work/silk-route-atelier (AJC-18).
  Desktop: Figma frame "The Silk Route Atelier" (node 3318:585, 1920 x 13171).
  Phone: Figma frame node 4064:28 (390 x 6878).

  Below xl the page is a normal stacked flow in phone px. From xl up it is the
  pixel-faithful canvas: `--u` = 1 Figma px = 100cqw / 1920, and each element
  is placed with at(x, y, w), relative to its section's top.

  The two "Read more" blocks expand in normal flow and push what follows down,
  so the canvas is split at them into stacked sections (Figma y of each top):
    A  Hero + intro            0      B  Identity … colour strip   2018
    C  Colour palette copy     7120   D  Typography … packaging    7440
    E  Packaging copy          10935  F  Price tag, team, next      11190
*/

const IMG = assetPath("/images/projects/the-silk-route-atelier");

export function SilkRouteAtelierPage() {
  return (
    <div className="bg-cream @container relative mx-auto w-full max-w-[40rem] overflow-hidden [--u:calc(100cqw/1920)] xl:max-w-[1920px]">
      {/* ============ A. HERO + INTRO ============ */}
      <section className="relative xl:h-[calc(2018*var(--u))]">
        <OptimizedImage
          src={`${IMG}/1.png`}
          alt="Swirling painted clouds from a Tibetan Thangka in warm pinks and creams"
          width={1941}
          height={1086}
          sizes="100vw"
          priority
          className="h-[700px] w-full object-cover xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-auto xl:w-(--w)"
          style={at(0, 0, 1920)}
        />
        <h1
          className="font-cormorant text-taupe mt-[87px] ml-[49px] w-[290px] text-[45px] leading-[1.05] tracking-[-0.06em] max-md:text-[44.5px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:text-[length:calc(97*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-5.82*var(--u))]"
          style={at(109, 1215, 868)}
        >
          The Silk Route Atelier
        </h1>
        <ul
          className="font-helvetica-regular text-taupe mt-[18px] ml-[55px] text-[12px] leading-[14px] tracking-[0.24px] uppercase opacity-80 max-md:tracking-[0.5px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:text-[length:calc(28*var(--u))] xl:leading-[calc(32*var(--u))] xl:tracking-[calc(0.56*var(--u))]"
          style={at(109, 1520, 560)}
        >
          <li>Cultural Research</li>
          <li>Heritage Brand Concept</li>
          <li>Brand Identity</li>
          <li>Packaging Design</li>
        </ul>
        <div
          className="font-helvetica-regular text-sage mt-[65px] mb-[93px] ml-[81px] flex w-[262px] flex-col gap-[11px] text-[11px] leading-[1.2] tracking-[0.11px] max-md:w-[261px] max-md:tracking-[0.15px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:mb-0 xl:w-(--w) xl:gap-[calc(20*var(--u))] xl:text-[length:calc(20*var(--u))] xl:tracking-[calc(0.4*var(--u))]"
          style={at(981, 1520, 677)}
        >
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
        </div>
      </section>

      {/* ============ B. IDENTITY … COLOUR STRIP ============ */}
      <section className="relative xl:h-[calc(5102*var(--u))]">
        <OptimizedImage
          src={`${IMG}/2.png`}
          alt="The Silk Route Atelier wordmark in cream on a deep red painted silk ground"
          width={1957}
          height={1080}
          sizes="100vw"
          className="h-[217px] w-full object-cover xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-auto xl:w-(--w)"
          style={at(0, 0, 1920)}
        />
        <h2
          className="font-cormorant text-taupe mt-[93px] ml-[50px] text-[44px] leading-none tracking-[-0.06em] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:text-[length:calc(97*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-5.82*var(--u))]"
          style={at(109, 1207, 1088)}
        >
          Identity
        </h2>
        <OptimizedImage
          src={`${IMG}/3.png`}
          alt="The Silk Route Atelier logo, a tiger above the wordmark, on a construction grid"
          width={492}
          height={311}
          sizes="(min-width: 1920px) 530px, 200px"
          className="mx-auto mt-[70px] h-auto w-[200px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-auto xl:w-(--w)"
          style={at(236, 1452, 530)}
        />
        <OptimizedImage
          src={`${IMG}/3-1.png`}
          alt="A painted tiger emblem on handmade cream paper"
          width={913}
          height={1011}
          sizes="(min-width: 1920px) 950px, 329px"
          className="mt-[54px] ml-[33px] h-auto w-[329px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-auto xl:w-(--w)"
          style={at(970, 1113, 950)}
        />
        <p
          className="font-helvetica-regular text-sage hidden text-[13px] leading-[1.2] tracking-[0.26px] whitespace-nowrap uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:block xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))]"
          style={at(126, 2222)}
        >
          The Myth of the Four Dignities
        </p>
        <div
          className="font-helvetica-regular text-sage mt-[68px] ml-[81px] flex w-[262px] flex-col gap-[11px] text-[11px] leading-[1.2] tracking-[0.11px] max-md:w-[261px] max-md:tracking-[0.15px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:gap-[calc(20*var(--u))] xl:text-[length:calc(20*var(--u))] xl:tracking-[calc(0.4*var(--u))]"
          style={at(971, 2222, 677)}
        >
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
        </div>
        <div className="mt-[93px] grid grid-cols-2 gap-[4px] xl:contents">
          <OptimizedImage
            src={`${IMG}/5-1.png`}
            alt="Detail of a painted tiger’s head against a red wall"
            width={913}
            height={1061}
            sizes="(min-width: 1920px) 960px, 50vw"
            className="h-[225px] w-full object-cover xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-auto xl:w-(--w) xl:object-fill"
            style={at(0, 2507, 960)}
          />
          <OptimizedImage
            src={`${IMG}/5-2.png`}
            alt="A striped tiger in swirling water, from an aged Himalayan painting"
            width={913}
            height={1061}
            sizes="(min-width: 1920px) 960px, 50vw"
            className="h-[225px] w-full object-cover xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-auto xl:w-(--w) xl:object-fill"
            style={at(960, 2507, 960)}
          />
        </div>
        <h2
          className="font-cormorant text-taupe mt-[103px] ml-[50px] text-[44px] leading-none tracking-[-0.06em] max-md:ml-[45px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:text-[length:calc(97*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-5.82*var(--u))]"
          style={at(109, 3702, 1088)}
        >
          Colour Palette
        </h2>
        <div className="relative mt-[58px] xl:contents">
          <OptimizedImage
            src={`${IMG}/6.png`}
            alt="A Thangka detail of a raised hand and swirling mineral-pigment clouds"
            width={1905}
            height={1079}
            sizes="100vw"
            className="h-[281px] w-full object-cover xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-auto xl:w-(--w) xl:object-fill"
            style={at(0, 3889, 1920)}
          />
          <div
            className="absolute top-[147px] left-[59px] flex h-[34px] w-[288px] xl:top-(--y) xl:left-(--x) xl:h-[calc(70*var(--u))] xl:w-(--w)"
            style={at(263, 4398, 1316)}
          >
            <div className="hidden flex-1 bg-[#a84f40] xl:block" />
            <div className="hidden flex-1 bg-[#b66b12] xl:block" />
            <div className="hidden flex-1 bg-[#f7f5ee] xl:block" />
            <div className="hidden flex-1 bg-[#9c3d37] xl:block" />
            <div className="flex-1 bg-[#8c6e51]" />
            <div className="flex-1 bg-[#695f4c]" />
            <div className="flex-1 bg-[#744a2f]" />
            <div className="flex-1 bg-[#e5dfc9]" />
          </div>
        </div>
      </section>

      {/* ============ C. COLOUR PALETTE COPY (Read more) ============ */}
      <section className="relative">
        <p
          className="font-helvetica-regular text-sage hidden text-[13px] leading-[1.2] tracking-[0.26px] whitespace-nowrap uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:block xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))]"
          style={at(126, 0)}
        >
          Hues as old as the Himalayas
        </p>
        <div className="mt-[74px] pr-[120px] pl-[59px] xl:contents">
          <VirsaExpandableIntro
            responsive
            compact
            clamp="max-h-[9.5em] max-md:max-h-[11.2em]"
            x={971}
            y={0}
            width={677}
            full={
              <>
                <p>
                  Centuries ago, Ladakh served as a sanctuary for travelers, monks, and merchants
                  moving along trade routes. Among the treasures exchanged were the pigments of the
                  earth – colors extracted directly from the rugged landscape and preserved
                  eternally in Buddhist Thangka paintings.
                </p>
                <p>
                  AJC mapped out a proprietary color strategy based entirely on this ancient
                  alchemy: Rather than using modern, synthetic luxury tones, the palette is a
                  revival of historical natural dyes crafted by artisans through immense patience.
                  These specific, mineral-driven hues embody the soul of the high-altitude desert:
                  bold, resilient, and deeply spiritual. It ensures that every touchpoint of the
                  brand tells a story of the mountains before a single garment is ever touched.
                </p>
              </>
            }
            toggle={{ x: 0, y: 210 }}
            gapBelow={107}
          />
        </div>
      </section>

      {/* ============ D. TYPOGRAPHY … PACKAGING ============ */}
      <section className="relative xl:h-[calc(3495*var(--u))]">
        <h2
          className="font-cormorant text-taupe mt-[108px] ml-[50px] text-[44px] leading-none tracking-[-0.06em] max-md:mt-[114px] max-md:ml-[45px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:text-[length:calc(97*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-5.82*var(--u))]"
          style={at(109, 0, 1088)}
        >
          Typography
        </h2>
        <OptimizedImage
          src={`${IMG}/7-1.png`}
          alt="Hand-lettered Tibetan script in the Kyuk style, in red ink"
          width={498}
          height={153}
          sizes="(min-width: 1920px) 498px, 230px"
          className="mx-auto mt-[70px] h-auto w-[230px] max-md:mt-[71px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-auto xl:w-(--w)"
          style={at(247, 227, 498)}
        />
        <div className="mx-[49px] mt-[55px] flex items-start justify-between xl:contents">
          <p
            className="font-helvetica text-sage text-[11px] leading-[1.2] font-bold tracking-[0.22px] whitespace-nowrap uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))]"
            style={at(126, 508)}
          >
            Script Kyuk
          </p>
          <p
            className="font-helvetica-regular text-sage max-w-[135px] text-right text-[11px] leading-[1.2] tracking-[0.22px] whitespace-normal uppercase max-xl:whitespace-normal xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:max-w-none xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))] xl:whitespace-nowrap"
            style={at(637, 508, 220)}
          >
            Cursive &amp; Informal
          </p>
        </div>
        <OptimizedImage
          src={`${IMG}/7-2.png`}
          alt="Hand-lettered Tibetan script in the Umey style, in red ink"
          width={489}
          height={192}
          sizes="(min-width: 1920px) 489px, 230px"
          className="mx-auto mt-[75px] h-auto w-[230px] max-md:mt-[70px] max-md:w-[221px] max-md:-translate-x-[5px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-auto xl:w-(--w)"
          style={at(1118, 200, 489)}
        />
        <div className="mx-[49px] mt-[39px] flex items-start justify-between xl:contents">
          <p
            className="font-helvetica text-sage text-[11px] leading-[1.2] font-bold tracking-[0.22px] whitespace-nowrap uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))]"
            style={at(990, 508)}
          >
            Script Umey
          </p>
          <p
            className="font-helvetica-regular text-sage max-w-[135px] text-right text-[11px] leading-[1.2] tracking-[0.22px] whitespace-normal uppercase max-xl:whitespace-normal max-md:max-w-[115px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:max-w-none xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))] xl:whitespace-nowrap"
            style={at(1248, 508, 500)}
          >
            Variation of Uchen, Cursive &amp; Headless
          </p>
        </div>
        <p
          className="font-helvetica-regular text-sage hidden text-[13px] leading-[1.2] tracking-[0.26px] whitespace-nowrap uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:block xl:text-[length:calc(20*var(--u))] xl:text-[length:calc(28*var(--u))] xl:leading-[calc(23*var(--u))] xl:leading-[calc(32*var(--u))] xl:tracking-[calc(0.4*var(--u))] xl:tracking-[calc(0.56*var(--u))]"
          style={at(126, 664)}
        >
          Script as sacred geometry
        </p>
        <div
          className="font-helvetica-regular text-sage mt-[63px] ml-[81px] flex w-[262px] flex-col gap-[11px] text-[11px] leading-[1.2] tracking-[0.11px] max-md:mt-[68px] max-md:w-[259px] max-md:gap-[13px] max-md:tracking-[0.2px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:gap-[calc(20*var(--u))] xl:gap-[calc(22*var(--u))] xl:text-[length:calc(18*var(--u))] xl:text-[length:calc(20*var(--u))] xl:tracking-[calc(0.4*var(--u))] xl:tracking-[calc(0.36*var(--u))]"
          style={at(954, 665, 677)}
        >
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
        </div>
        <h2
          className="font-cormorant text-taupe mt-[84px] ml-[50px] text-[44px] leading-none tracking-[-0.06em] max-md:mt-[75px] max-md:ml-[45px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:text-[length:calc(97*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-5.82*var(--u))]"
          style={at(109, 1075, 1088)}
        >
          Brand Assets
        </h2>
        <p
          className="font-helvetica-regular text-sage mt-[38px] ml-[81px] text-[12px] leading-[1.2] tracking-[0.24px] whitespace-nowrap uppercase max-md:mt-[41px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))]"
          style={at(971, 1120)}
        >
          Packaging
        </p>
        <OptimizedImage
          src={`${IMG}/8-1.png`}
          alt="A deep red Silk Route Atelier shopping bag with dark ribbon handles in hard sunlight"
          width={1947}
          height={1080}
          sizes="100vw"
          className="mt-[46px] h-[221px] w-full object-cover xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-auto xl:w-(--w) xl:object-fill"
          style={at(0, 1290, 1920)}
        />
        <div className="mt-[9px] grid grid-cols-2 gap-[5px] px-[7px] xl:contents">
          <OptimizedImage
            src={`${IMG}/8-2.png`}
            alt="A hand holding a parcel wrapped in Silk Route Atelier tiger-pattern paper and tied with string"
            width={913}
            height={1029}
            sizes="(min-width: 1920px) 913px, 48vw"
            className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-auto xl:w-(--w)"
            style={at(32, 2395, 913)}
          />
          <OptimizedImage
            src={`${IMG}/10.png`}
            alt="Two stacks of terracotta Silk Route Atelier business cards with a cream tiger emblem on textured stone"
            width={913}
            height={1029}
            sizes="(min-width: 1920px) 913px, 48vw"
            className="h-auto w-full xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-auto xl:w-(--w)"
            style={at(960, 2395, 913)}
          />
        </div>
      </section>

      {/* ============ E. PACKAGING COPY (Read more) ============ */}
      <section className="relative">
        <div className="mt-[49px] pr-[49px] pl-[81px] max-md:mt-[51px] xl:contents">
          <VirsaExpandableIntro
            responsive
            compact
            clamp="max-h-[13.5em] max-md:max-h-[16.5em]"
            x={960}
            y={0}
            width={677}
            full={
              <>
                <p>
                  The packaging design is inspired by a 17th-century Buddhist Thangka painting
                  housed at The Metropolitan Museum of Art, New York. This historic artwork, adorned
                  with a phoenix soaring above swirling clouds, radiant sun motifs, cresting waves,
                  and delicate floral patterns, became a visual and symbolic reference for the
                  design. These elements – representing rebirth, continuity, and harmony with nature
                  – mirror the brand’s own philosophy rooted in revival, heritage, and elegance. We
                  translated this centuries-old visual language into a packaging system that feels
                  bold, intricate, and timeless, just like the garments it houses.
                </p>
                <p>
                  A deep, resonant red, drawn directly from the painting’s palette, anchors the
                  design – a color long associated with power, protection, and auspicious beginnings
                  across both Chinese and Himalayan cultures. It adds a visceral richness that makes
                  the packaging feel both sacred and striking.
                </p>
                <p>
                  By placing a piece of that legacy on something as humble as a price tag, we ensure
                  that each garment carries with it not just value, but lineage – a tactile reminder
                  that what you’re holding is a continuation of a story centuries in the making.
                </p>
              </>
            }
            toggle={{ x: 0, y: 245 }}
            gapBelow={100}
          />
        </div>
      </section>

      {/* ============ F. PRICE TAG, TEAM, NEXT PROJECT ============ */}
      <section className="relative pb-[60px] xl:h-[calc(1981*var(--u))] xl:pb-0">
        <OptimizedImage
          src={`${IMG}/9.png`}
          alt="Silk Route Atelier price tag layout in deep red with fabric, style, size and care details"
          width={1039}
          height={928}
          sizes="(min-width: 1920px) 1040px, 331px"
          className="mt-[45px] ml-[29px] h-auto w-[331px] max-md:mt-[64px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-auto xl:w-(--w)"
          style={at(450, 0, 1040)}
        />
        <h2
          className="font-cormorant text-taupe mt-[64px] ml-[50px] ml-[52px] text-[44px] leading-none tracking-[-0.06em] max-md:mt-[62px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:text-[length:calc(97*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-5.82*var(--u))]"
          style={at(109, 1300, 1088)}
        >
          Team
        </h2>
        <div className="mt-[29px] ml-[64px] grid grid-cols-[139px_1fr] gap-y-[18px] pr-[40px] max-md:mt-[35px] max-md:gap-y-[22px] xl:contents">
          <p
            className="font-helvetica text-sage text-[12px] leading-[1.2] font-bold tracking-[0.24px] whitespace-nowrap uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))]"
            style={at(954, 1330)}
          >
            Brand Design
          </p>
          <p
            className="font-helvetica-regular text-sage text-[12px] leading-[1.2] tracking-[0.24px] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))] xl:whitespace-nowrap"
            style={at(1338, 1330)}
          >
            Praneet Selva
          </p>
          <p
            className="font-helvetica text-sage text-[12px] leading-[1.2] font-bold tracking-[0.24px] whitespace-nowrap uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))]"
            style={at(954, 1365)}
          >
            Tibetan Script
          </p>
          <p
            className="font-helvetica-regular text-sage text-[12px] leading-[1.2] tracking-[0.24px] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))] xl:whitespace-nowrap"
            style={at(1338, 1365)}
          >
            Lobsang Tsultrim (Lahaul)
          </p>
        </div>
        <p
          aria-hidden
          className="font-cormorant text-taupe mt-[40px] text-center text-[32px] leading-none font-bold max-md:mt-[45px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:text-[length:calc(80*var(--u))] xl:leading-[calc(76*var(--u))]"
          style={at(905, 1557, 110)}
        >
          &gt;
        </p>
        <Link
          href="/work/farmers-house-cafe"
          className="font-cormorant text-taupe mt-[28px] block text-center text-[40px] leading-none tracking-[-0.06em] max-md:mt-[27px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:text-[length:calc(80*var(--u))] xl:leading-[calc(76*var(--u))] xl:tracking-[calc(-4.8*var(--u))]"
          style={at(654, 1645, 612)}
        >
          Next Project
        </Link>
        <p
          className="font-helvetica-regular text-sage mt-[26px] text-center text-[11.5px] leading-[1.2] tracking-[0.26px] whitespace-nowrap uppercase max-md:mt-[24px] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:text-[length:calc(20*var(--u))] xl:leading-[calc(23*var(--u))] xl:tracking-[calc(0.4*var(--u))]"
          style={at(830, 1751, 260)}
        >
          Farmers’ House Cafe
        </p>
      </section>
    </div>
  );
}
