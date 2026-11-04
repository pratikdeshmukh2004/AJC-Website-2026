"use client";

import { useId, useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { AT, AT_W, HELV, at } from "./design";

// Form text: Helvetica Regular 22px, uppercase. Fields, labels and radios are
// tracked +4%, the button +2%. (Kept apart because cn() joins classes without
// merging, so a second tracking class would not reliably override the first.)
const TYPE_BASE = `${HELV} uppercase text-[0.875rem] xl:text-[length:calc(22*var(--u))]`;
const TYPE = `${TYPE_BASE} tracking-[0.04em]`;

// Underlined field: centred text above a rule (4px at 1920, "Rectangle 118…" in
// Figma). At xl a 27px line box + 10px bottom padding seats the text 13px below
// the field's top, as drawn in the design.
const FIELD = cn(
  TYPE,
  "box-border block w-full border-0 border-b-2 border-solid border-[#c2b7a2] bg-transparent py-2 text-center leading-[1.5] text-[#8b7f73] outline-none placeholder:text-[#9b9484]/80 focus:border-[#8b7f73]",
  "xl:border-b-[length:calc(4*var(--u))] xl:pt-0 xl:pb-[calc(10*var(--u))] xl:leading-[calc(27*var(--u))]",
);
const FIELD_H = "xl:h-[calc(41*var(--u))]";

// The four "Current phase" choices, in Figma order. (x, y) is the ring's position.
const PHASES = [
  { value: "Under Construction", x: 145, y: 8284 },
  { value: "New Launch", x: 575, y: 8282 },
  { value: "Hotel Re-brand", x: 145, y: 8333 },
  { value: "Other (if any)", x: 575, y: 8333 },
] as const;

/**
 * "Write to Us" enquiry form for hotels.
 *
 * The site is a static export with no backend, so submitting opens the
 * visitor's mail app with the enquiry pre-filled, addressed to
 * `siteConfig.contactEmail`.
 *
 * Below xl the fields stack in normal flow. At xl every element sits at its
 * Figma coordinates on the page canvas (render inside it).
 */
export function EnquiryForm() {
  const [phase, setPhase] = useState<string>(PHASES[0].value);
  const phaseLabelId = useId();
  const email = siteConfig.contactEmail;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Full name: ${data.get("name") ?? ""}`,
      `Email: ${data.get("email") ?? ""}`,
      `Hotel name & location: ${data.get("hotel") ?? ""}`,
      `Current phase: ${phase}`,
      "",
      `${data.get("message") ?? ""}`,
    ].join("\n");
    const subject = "AJC Hospitality enquiry";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Write to us"
      className="mx-auto flex w-full max-w-md flex-col gap-6 xl:block xl:max-w-none"
    >
      <input
        name="name"
        type="text"
        required
        autoComplete="name"
        aria-label="Full name"
        placeholder="Full name"
        className={cn(FIELD, FIELD_H, AT_W)}
        style={at(146, 7956, 647)}
      />
      <input
        name="email"
        type="email"
        required
        autoComplete="email"
        aria-label="Email address"
        placeholder="Email address"
        className={cn(FIELD, FIELD_H, AT_W)}
        style={at(146, 8042, 647)}
      />
      <input
        name="hotel"
        type="text"
        autoComplete="organization"
        aria-label="Hotel name and location"
        placeholder="Hotel name & location"
        className={cn(FIELD, FIELD_H, AT_W)}
        style={at(146, 8131, 647)}
      />

      <div role="radiogroup" aria-labelledby={phaseLabelId} className="pt-2 xl:pt-0">
        <p
          id={phaseLabelId}
          className={cn(
            TYPE,
            "text-center leading-[1.5] whitespace-nowrap text-[#9b9484]/80 xl:leading-[calc(37*var(--u))]",
            AT_W,
          )}
          style={at(95, 8212, 749)}
        >
          Current phase
        </p>
        {/* One column on phones: "Under Construction" + "Other (if any)" side by
            side need about 380px. */}
        <div className="mx-auto mt-4 grid w-fit grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 xl:mt-0 xl:block">
          {PHASES.map((p) => {
            const checked = phase === p.value;
            return (
              <label
                key={p.value}
                className={cn(
                  "flex cursor-pointer items-center gap-2 whitespace-nowrap xl:h-[calc(23*var(--u))] xl:gap-[calc(14*var(--u))]",
                  AT,
                )}
                style={at(p.x, p.y)}
              >
                <input
                  type="radio"
                  name="phase"
                  value={p.value}
                  checked={checked}
                  onChange={() => setPhase(p.value)}
                  className="peer sr-only"
                />
                {/* Figma: a 23px disc when selected, else a 23 x 22 ring with a
                    1.6px stroke. Drawn in SVG because Chrome floors a 1.6px CSS
                    border to 1px. */}
                <span
                  aria-hidden
                  className="h-3.5 w-3.5 shrink-0 rounded-full text-[#7d7062] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#7d7062] xl:h-[calc(23*var(--u))] xl:w-[calc(23*var(--u))]"
                >
                  <svg viewBox="0 0 23 23" className="block h-full w-full" focusable="false">
                    {checked ? (
                      <circle cx="11.5" cy="11.5" r="11.5" fill="currentColor" />
                    ) : (
                      <ellipse
                        cx="11.5"
                        cy="11.5"
                        rx="10.7"
                        ry="10.2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                    )}
                  </svg>
                </span>
                {/* The design gives every option the same colour; the disc marks the choice. */}
                <span className={cn(TYPE, "text-[#9b9484]/80")}>{p.value}</span>
              </label>
            );
          })}
        </div>
      </div>

      <textarea
        name="message"
        rows={1}
        aria-label="Your message"
        placeholder="Please write a message"
        className={cn(
          FIELD,
          "[field-sizing:content] resize-none overflow-hidden xl:min-h-[calc(41*var(--u))]",
          AT_W,
        )}
        style={at(146, 8407, 647)}
      />

      <button
        type="submit"
        className={cn(
          TYPE_BASE,
          "mt-4 cursor-pointer self-center rounded-full border-0 bg-[#836b43] px-12 py-3 text-center tracking-[0.02em] text-[#fdfbf4] transition-opacity hover:opacity-90",
          "xl:h-[calc(55*var(--u))] xl:p-0",
          AT_W,
        )}
        style={at(345, 8695, 249)}
      >
        Submit
      </button>

      <p
        className={cn(
          TYPE,
          "mt-4 text-center leading-[1.7] xl:leading-[calc(29*var(--u))] xl:whitespace-nowrap",
          AT_W,
        )}
        style={at(84, 8843, 789)}
      >
        <span className="block text-[#9b9484]">or write to us at</span>
        <a href={`mailto:${email}`} className="block text-[#836b43] normal-case hover:underline">
          {email}
        </a>
      </p>
    </form>
  );
}
