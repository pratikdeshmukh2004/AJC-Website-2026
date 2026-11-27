"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { at, cn, tabKeyTarget, u } from "@/lib/utils";

type Stage = {
  label: string;
  /** Pinned lines (as broken in the design) or free text that wraps. */
  description?: string | string[];
  /** Optional second paragraph under the description (Overview). */
  detail?: string;
  services: string[];
  /** Shorter list on the mobile frame, when it differs. */
  mobileServices?: string[];
};

/*
  Stage content from the Figma comments on the "What We Do" list (ticket AJC-10).
  The design shows "Launch Identity System" selected, so it is the default.
*/
const STAGES: Stage[] = [
  {
    label: "Overview",
    description:
      "We partner with founders, and creative directors of small luxury hotels to build the launch, or re-brand fabric across every phase of the property’s life cycle.",
    detail:
      "We step into the critical window after physical construction ends and before operational launch begins – defining the core narrative, digital and design identity, global perception, and guest experience journey to ensure memorable guest delight while maximising long-term asset valuation.",
    services: [],
  },
  {
    label: "Launch Identity System",
    description: [
      "Establishing the foundational narrative",
      "and strategic positioning of the property.",
    ],
    services: [
      "Positioning",
      "Name & Nomenclature",
      "Hotel Visual Identity",
      "Storytelling & Narrative",
    ],
    mobileServices: ["Naming", "Hotel Visual Identity", "Storytelling & Narrative"],
  },
  {
    label: "Guest Journey Foundation",
    description: "Designing the emotional, culinary, and sensory touch points across the stay.",
    services: ["Arrival to Departure Journey", "Flagship Experiences Design", "F&B Curation"],
  },
  {
    label: "Visual Direction",
    description: "Setting the creative standard across lens, visual storytelling, and media.",
    services: ["Creative Direction", "Photography", "Film Production"],
  },
  {
    label: "Digital & Physical assets",
    description: "Bringing the brand to life across digital platforms and physical touch points.",
    services: ["Flagship Website", "Communication Assets", "Print Support"],
  },
  {
    label: "Global Launch Strategy",
    description: "Positioning and unveiling the property to a curated international audience.",
    services: ["Social Media Strategy", "PR Guidelines & Direction", "Launch Experience"],
  },
];
const DEFAULT_STAGE = 1;

/**
 * "What We Do": the stage list on the left; the selected stage's description
 * and services show on the right (Figma comment: "Each point content is on the
 * right side"). ARIA tabs with arrow-key, Home and End navigation.
 *
 * Canvas coordinates (xl and up): list at (209, 2254), description at
 * (1159, 2254), services 120px below the description's top.
 */
export function WhatWeDo({ mobile = false }: { mobile?: boolean }) {
  const [active, setActive] = useState(DEFAULT_STAGE);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const tabId = (i: number) => `${id}-tab-${i}`;
  const panelId = `${id}-panel`;
  const stage = STAGES[active];

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const next = tabKeyTarget(e.key, i, STAGES.length);
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  if (mobile) {
    // Mobile frame (needs `--u` from the page): list, then the right-aligned
    // description and the services, all in flow so the page below follows
    // whichever stage is open.
    return (
      <div className="pr-[calc(48*var(--u))] pl-[calc(61*var(--u))]">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="What we do"
          style={{ marginTop: u(30) }}
        >
          {STAGES.map((s, i) => (
            <button
              key={s.label}
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
              className="font-helvetica-ui text-taupe block w-full cursor-pointer border-0 bg-transparent p-0 text-left tracking-[0.04em] uppercase opacity-[0.59]"
              style={{ fontSize: u(12), lineHeight: u(19) }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={panelId} aria-labelledby={tabId(active)} tabIndex={0}>
          <p
            className="font-helvetica-ui text-sage ml-auto text-right tracking-[0.02em] opacity-[0.79]"
            style={{ marginTop: u(44), width: u(170), fontSize: u(12), lineHeight: u(14) }}
          >
            {typeof stage.description === "string"
              ? stage.description
              : stage.description?.join(" ")}
          </p>
          {stage.detail && (
            <p
              className="font-helvetica-ui text-sage ml-auto text-right tracking-[0.02em] opacity-[0.79]"
              style={{ marginTop: u(14), width: u(170), fontSize: u(12), lineHeight: u(14) }}
            >
              {stage.detail}
            </p>
          )}
          <ul className="list-none p-0" style={{ marginTop: u(26) }}>
            {(stage.mobileServices ?? stage.services).map((service) => (
              <li
                key={service}
                className="font-helvetica-ui text-taupe tracking-[0.04em] uppercase opacity-[0.59]"
                style={{ fontSize: u(12), lineHeight: u(19) }}
              >
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return (
    <>
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="What we do"
        className="mt-8 xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w)"
        style={at(209, 2254, 523)}
      >
        {STAGES.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.label}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={tabId(i)}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                // Uppercase list type (Helvetica 27 / +4%, taupe) on the design's 44px row pitch.
                "font-helvetica-ui text-taupe text-[0.875rem] leading-[1.9] tracking-[0.04em] uppercase xl:text-[length:calc(27*var(--u))] xl:leading-[calc(44*var(--u))]",
                "block w-full cursor-pointer border-0 bg-transparent p-0 text-left transition-opacity",
                selected ? "opacity-100" : "opacity-[0.59] hover:opacity-90",
              )}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId(active)}
        tabIndex={0}
        className="mt-8 min-h-48 xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:min-h-0 xl:w-(--w)"
        style={at(1159, 2254, 564)}
      >
        {typeof stage.description === "string" ? (
          <p className="font-helvetica-ui text-sage text-[0.9375rem] leading-[1.6] tracking-[0.02em] opacity-[0.79] xl:text-[length:calc(22*var(--u))] xl:leading-[calc(25*var(--u))]">
            {stage.description}
          </p>
        ) : stage.description ? (
          <p className="font-helvetica-ui text-sage text-[0.9375rem] leading-[1.6] tracking-[0.02em] opacity-[0.79] xl:text-[length:calc(22*var(--u))] xl:leading-[calc(25*var(--u))]">
            {stage.description.map((line) => (
              <span key={line} className="xl:block xl:whitespace-nowrap">
                {line}{" "}
              </span>
            ))}
          </p>
        ) : null}
        {stage.detail && (
          <p className="font-helvetica-ui text-sage mt-4 text-[0.9375rem] leading-[1.6] tracking-[0.02em] opacity-[0.79] xl:mt-[calc(25*var(--u))] xl:text-[length:calc(22*var(--u))] xl:leading-[calc(25*var(--u))]">
            {stage.detail}
          </p>
        )}
        <ul
          className={cn(
            "list-none p-0",
            stage.description && "mt-4",
            "xl:absolute xl:top-[calc(120*var(--u))] xl:left-0 xl:mt-0 xl:w-full",
          )}
        >
          {stage.services.map((service) => (
            // 30px lines + 7px padding: the same 44px row as the design for one-line
            // items, while a long item that wraps stays visibly one item.
            <li
              key={service}
              className="font-helvetica-ui text-taupe py-1 text-[0.875rem] leading-[1.4] tracking-[0.04em] uppercase opacity-[0.59] xl:py-[calc(7*var(--u))] xl:text-[length:calc(27*var(--u))] xl:leading-[calc(30*var(--u))]"
            >
              {service}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
