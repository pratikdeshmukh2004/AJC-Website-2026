"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import { cn, tabKeyTarget, u } from "@/lib/utils";

/** The design shows Hospitality Consulting selected (its copy was the frame's note). */
const DEFAULT_SERVICE = 4;
const SERVICE_COUNT = 5;

/*
  About "What We Do": each service title is a tab; the selected one's copy and
  link show in the note column. Placed on the page canvas (needs `--u`):
  desktop coordinates are the bottom canvas's (Figma y − 3477), mobile ones the
  390 frame's. The link follows the copy (18px / 20px below it, as in the
  frame) because the copies differ in length.
*/
export function AboutWhatWeDo({ mobile = false }: { mobile?: boolean }) {
  const [active, setActive] = useState(DEFAULT_SERVICE);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const tabId = (i: number) => `${id}-tab-${i}`;
  const panelId = `${id}-panel`;

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const next = tabKeyTarget(e.key, i, SERVICE_COUNT);
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  const tab = (i: number, label: string) => (
    <button
      ref={(el) => {
        tabs.current[i] = el;
      }}
      type="button"
      role="tab"
      id={tabId(i)}
      aria-selected={i === active}
      aria-controls={panelId}
      tabIndex={i === active ? 0 : -1}
      onClick={() => setActive(i)}
      onKeyDown={(e) => onKeyDown(e, i)}
      className={cn(
        "font-helvetica-regular block cursor-pointer text-left tracking-[0.02em] text-[#7d7062] uppercase transition-opacity",
        mobile
          ? "text-[length:calc(12.3*var(--u))] leading-[calc(19*var(--u))]"
          : "text-[length:calc(28*var(--u))] leading-[1.56]",
        i === active ? "opacity-100" : "opacity-[0.59] hover:opacity-90",
      )}
    >
      {label}
    </button>
  );

  const more = (href: string) => (
    <Link
      href={href}
      className={cn(
        "font-helvetica-regular inline-block border-b-[length:calc(2*var(--u))] border-[#7d7062] tracking-[0.02em] text-[#7d7062] uppercase transition-opacity hover:opacity-70",
        mobile
          ? "mt-[calc(20*var(--u))] text-[length:calc(13.4*var(--u))] leading-[calc(22*var(--u))]"
          : "mt-[calc(18*var(--u))] text-[length:calc(18*var(--u))] leading-[calc(26*var(--u))]",
      )}
    >
      Discover More
    </Link>
  );

  const copy = (children: ReactNode) => (
    <p
      className={cn(
        "font-helvetica-regular tracking-[0.02em] text-[#8b7f73] opacity-[0.79]",
        mobile
          ? "text-[length:calc(12*var(--u))] leading-[calc(14*var(--u))]"
          : "text-[length:calc(22*var(--u))] leading-[calc(24*var(--u))]",
      )}
    >
      {children}
    </p>
  );

  return (
    <>
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="What we do"
        className="absolute"
        style={
          mobile ? { left: u(56), top: u(2222) } : { left: u(209), top: u(1289), width: u(523) }
        }
      >
        {tab(0, "Brand Strategy & Narrative")}
        {tab(1, "Identity & Design")}
        {tab(2, "Creative Direction")}
        {tab(3, "Experience Design")}
        {tab(4, "Hospitality Consulting")}
      </div>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId(active)}
        className="absolute"
        style={
          mobile
            ? { left: u(49), top: u(2596), width: u(245) }
            : { left: u(1195), top: u(1327), width: u(523) }
        }
      >
        {active === 0 && (
          <>
            {copy(
              "The fabric of a brand is built to outlive itself. Furbished only once in the journey, this is where we imagine, or reimagine, the narrative or story you hold, the vision that you believe in, and the smallest fiber that brings your world to the world. We then create an identity and narrative that is visual, sensory, and elemental – kind of like birthing life to a winter tree.",
            )}
            {more("/philosophy")}
          </>
        )}
        {active === 1 && (
          <>
            {copy(
              "The bridge between stories and visuals is design, which we weave reciprocally; websites, menus, communication assets, printables, packaging, and all that you require to put a tangible face to the brand.",
            )}
            {more("/our-work")}
          </>
        )}
        {active === 2 && (
          <>
            {copy(
              "It is interconnected – the space, the stories, and the sights. With great focus, we photograph and create films that translate into visual journeys. Campaigns, Architecture, Food, Concepts, Textile – all fibers of a vast universe, that are captured as much to be seen, as to be felt, through photos and videos.",
            )}
            {more("/our-work")}
          </>
        )}
        {active === 3 && (
          <>
            {copy(
              "When you enter a brand, you enter a world. Formed by our lived-in residencies, we create a brand’s experience; the guest journeys, the rituals, the experience programs, and the fabric that changes a transaction to an immersion.",
            )}
            {more("/our-work")}
          </>
        )}
        {active === 4 && (
          <>
            {copy(
              "For small luxury hotels, we step in for the re-brand or into the critical launch window, after physical construction ends and before operational launch begins. AJC defines the brand narrative, digital identity, visual design direction, global perception, and guest journey to ensure a luxury hospitality standard while maximizing long-term asset valuation.",
            )}
            {more("/hospitality")}
          </>
        )}
      </div>
    </>
  );
}
