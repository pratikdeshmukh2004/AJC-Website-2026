"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { AT_W, BODY, LIST, LIST_TYPE, PINNED_LINE, at } from "./design";

type Stage = {
  label: string;
  /** Pinned lines (as broken in the design) or free text that wraps. */
  description?: string | string[];
  services: string[];
};

/*
  Stage content from the Figma comments on the "What We Do" list (ticket AJC-10).
  The design shows "Launch Identity System" selected, so it is the default.
*/
const STAGES: Stage[] = [
  {
    label: "Overview",
    // PLACEHOLDER: the ticket has no Overview copy yet, so this indexes the stages.
    services: [
      "Launch Identity System",
      "Guest Journey Foundation",
      "Visual Direction",
      "Digital & Physical Assets",
      "Global Launch Strategy",
    ],
  },
  {
    label: "Launch Identity System",
    description: [
      "Establishing the foundational narrative",
      "and strategic positioning of the property.",
    ],
    services: ["Naming", "Hotel Visual Identity", "Storytelling & Narrative"],
  },
  {
    label: "Guest Journey Foundation",
    description: "AJC builds within the local community, with in-house culinary and GEM teams.",
    services: [
      "Guest Arrival to Departure Rituals & Journey",
      "Flagship Experience Program Design",
      "F&B Curation",
    ],
  },
  {
    label: "Visual Direction",
    description: "AJC matches the right talent within the required style and approach of a hotel.",
    services: ["Creative Direction & Visual Language", "Photography", "Film & Video Production"],
  },
  {
    label: "Digital & Physical assets",
    services: ["Flagship Website", "Communication Assets", "Print Support"],
  },
  {
    label: "Global Launch Strategy",
    services: ["Social Media Strategy and Setup", "PR Guidelines & Direction", "Launch Experience"],
  },
];
const DEFAULT_STAGE = 1;

const TAB = cn(
  LIST,
  "block w-full cursor-pointer border-0 bg-transparent p-0 text-left transition-opacity",
);

/**
 * "What We Do": the stage list on the left; the selected stage's description
 * and services show on the right (Figma comment: "Each point content is on the
 * right side"). ARIA tabs with arrow-key, Home and End navigation.
 *
 * Canvas coordinates (xl and up): list at (209, 2254), description at
 * (1159, 2254), services 120px below the description's top.
 */
export function WhatWeDo() {
  const [active, setActive] = useState(DEFAULT_STAGE);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const tabId = (i: number) => `${id}-tab-${i}`;
  const panelId = `${id}-panel`;
  const stage = STAGES[active];

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = STAGES.length - 1;
    const next =
      e.key === "ArrowDown"
        ? (i + 1) % STAGES.length
        : e.key === "ArrowUp"
          ? (i - 1 + STAGES.length) % STAGES.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <>
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="What we do"
        className={cn("mt-8", AT_W)}
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
              className={cn(TAB, selected ? "opacity-100" : "opacity-[0.59] hover:opacity-90")}
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
        className={cn("mt-8 min-h-48 xl:min-h-0", AT_W)}
        style={at(1159, 2254, 564)}
      >
        {typeof stage.description === "string" ? (
          <p className={BODY}>{stage.description}</p>
        ) : stage.description ? (
          <p className={BODY}>
            {stage.description.map((line) => (
              <span key={line} className={PINNED_LINE}>
                {line}{" "}
              </span>
            ))}
          </p>
        ) : null}
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
              className={cn(
                LIST_TYPE,
                "py-1 leading-[1.4] opacity-[0.59] xl:py-[calc(7*var(--u))] xl:leading-[calc(30*var(--u))]",
              )}
            >
              {service}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
