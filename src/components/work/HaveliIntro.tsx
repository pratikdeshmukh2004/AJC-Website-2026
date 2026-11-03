"use client";

import { forwardRef } from "react";

/*
  Expandable hero intro body for the Haveli Dharampura project page.

  Collapsed: the two short Figma paragraphs (node 2823:1964) + a "Read more"
  pill, pixel-matching the design.
  Expanded: the full narrative; the pill flips to "Read less".

  The `expanded` state lives in the parent page so it can also reflow the
  elements *below* the intro (the portrait + play triangle) out of the way.
  This block is forwardRef'd so the parent can measure its rendered height and
  shift those lower elements by exactly the overflow.
*/

const v = (px: number) => `calc(${px} * var(--u))`;

const body =
  "font-helvetica-regular text-[#9b9484] text-[length:calc(20*var(--u))] leading-[1.25] tracking-[calc(0.4*var(--u))]";
const bodyBold =
  "font-helvetica font-bold text-[#9b9484] text-[length:calc(20*var(--u))] leading-[normal] tracking-[calc(0.4*var(--u))]";
const pill = "bg-[rgba(253,251,244,0.66)]";

type Props = {
  expanded: boolean;
  onToggle: () => void;
};

export const HaveliIntro = forwardRef<HTMLDivElement, Props>(function HaveliIntro(
  { expanded, onToggle },
  ref,
) {
  return (
    // Absolutely-positioned flow block anchored at the Figma intro origin
    // (x972, y1438, width 677). Children stack in normal flow so the toggle
    // always sits directly beneath the last paragraph.
    <div ref={ref} className={`absolute ${body}`} style={{ left: v(972), top: v(1438), width: v(677) }}>
      <p>
        The Haveli Archive is a visual reverie born in the tangled lanes of Purani Dilli, where our
        lens turned toward a beautifully restored, 200-year-old Mughal Haveli where time pauses as
        the city moves in motion. Upon discovery and year long curation, we sought to distill the
        romance and soul of the old Delhi experience into a living archive that invites travelers
        into a rare landmark.
      </p>

      {expanded ? (
        <>
          <p className="mt-[1em]">
            We began with a comprehensive photography and videography overhaul, archiving the daily
            movement of the space through a deeply immersive lens. From the exact emotion a guest
            experiences upon entering into the courtyard, to the thoughtfully curated heritage
            rituals, every visual asset was built to showcase the paradox of past and present
            sharing the same room.
          </p>
          <p className="mt-[1em]">
            Through our deep dive into the property&rsquo;s identity, we reshaped the visual
            narrative around Haveli&rsquo;s culinary offerings. The cuisine draws inspiration from
            two distinct sides of Purani Dilli: the rich, regal Mughlai flavors of Jama Masjid and
            the vibrant, nostalgic street chaats of Chandni Chowk. We refocused the brand&rsquo;s
            imagery to spotlight this duality &ndash; positioning the food, curated cocktails, and
            the royal tables as an essential cultural destination. The result doesn&rsquo;t just
            document, but invites you into an experience, effortlessly poised between ancestral
            grandeur and the warmth of a modern welcome.
          </p>
        </>
      ) : (
        <p className="mt-[1em]">
          We began with a comprehensive photography and videography overhaul, archiving the daily
          movement of the space through a deeply immersive lens. From the exact emotion a guest
          experiences upon entering into the
        </p>
      )}

      {/* Read more / Read less pill + label — flows after the text. */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className={`${pill} ${bodyBold} relative mt-[calc(16*var(--u))] block cursor-pointer text-left`}
        style={{
          width: v(747),
          marginLeft: v(-35),
          paddingTop: v(28),
          paddingBottom: v(28),
          paddingLeft: v(35),
        }}
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
});
