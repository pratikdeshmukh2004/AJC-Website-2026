"use client";

import { useEffect, useId, useState, useSyncExternalStore, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import { ENQUIRY_ENDPOINT, at, submitEnquiry } from "@/lib/utils";

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
 * The site is a static export with no backend, so submissions are POSTed to
 * the same Google Apps Script endpoint as the Contact form (see submitEnquiry in
 * lib/utils). The script files them in a "Hospitality" tab and emails the
 * studio. If the endpoint isn't configured, submitting opens the visitor's mail
 * app with the enquiry pre-filled, addressed to `siteConfig.contactEmail`.
 *
 * Below xl the fields stack in normal flow. At xl every element sits at its
 * Figma coordinates on the page canvas (render inside it).
 */
type Status = "idle" | "sending" | "sent" | "error";

/** How long the "sent" confirmation stays up. */
const SENT_MESSAGE_MS = 6000;

const noopSubscribe = () => () => {};

export function EnquiryForm() {
  const [phase, setPhase] = useState<string>(PHASES[0].value);
  const phaseLabelId = useId();
  const email = siteConfig.contactEmail;
  const [status, setStatus] = useState<Status>("idle");
  // False in the server HTML, true once React has hydrated. Until then Submit is
  // disabled: a click before hydration would trigger the browser's native
  // submit and reload the page.
  const ready = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  // Hide the confirmation after a few seconds.
  useEffect(() => {
    if (status !== "sent") return;
    const t = setTimeout(() => setStatus("idle"), SENT_MESSAGE_MS);
    return () => clearTimeout(t);
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    // Honeypot: real visitors never see or fill this field.
    if (data.get("company")) return;

    const field = (name: string) => String(data.get(name) ?? "").trim();
    const values = {
      form: "hospitality",
      name: field("name"),
      email: field("email"),
      hotel: field("hotel"),
      phase,
      message: field("message"),
    };

    if (!ENQUIRY_ENDPOINT) {
      const body = [
        `Full name: ${values.name}`,
        `Email: ${values.email}`,
        `Hotel name & location: ${values.hotel}`,
        `Current phase: ${values.phase}`,
        "",
        values.message,
      ].join("\n");
      const subject = "AJC Hospitality enquiry";
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      // The reply is opaque, so only a network failure lands in catch.
      await submitEnquiry(values);
      setStatus("sent");
      form.reset();
      setPhase(PHASES[0].value);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      // Typing again clears an old confirmation or error.
      onInput={() => status !== "idle" && status !== "sending" && setStatus("idle")}
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
        className="font-helvetica-ui box-border block w-full border-0 border-b-2 border-solid border-[#c2b7a2] bg-transparent py-2 text-center text-[0.875rem] leading-[1.5] tracking-[0.04em] text-[#8b7f73] uppercase outline-none placeholder:text-[#9b9484]/80 focus:border-[#8b7f73] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-[calc(41*var(--u))] xl:w-(--w) xl:border-b-[length:calc(4*var(--u))] xl:pt-0 xl:pb-[calc(10*var(--u))] xl:text-[length:calc(22*var(--u))] xl:leading-[calc(27*var(--u))]"
        style={at(146, 7956, 647)}
      />
      <input
        name="email"
        type="email"
        required
        autoComplete="email"
        aria-label="Email address"
        placeholder="Email address"
        className="font-helvetica-ui box-border block w-full border-0 border-b-2 border-solid border-[#c2b7a2] bg-transparent py-2 text-center text-[0.875rem] leading-[1.5] tracking-[0.04em] text-[#8b7f73] uppercase outline-none placeholder:text-[#9b9484]/80 focus:border-[#8b7f73] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-[calc(41*var(--u))] xl:w-(--w) xl:border-b-[length:calc(4*var(--u))] xl:pt-0 xl:pb-[calc(10*var(--u))] xl:text-[length:calc(22*var(--u))] xl:leading-[calc(27*var(--u))]"
        style={at(146, 8042, 647)}
      />
      <input
        name="hotel"
        type="text"
        autoComplete="organization"
        aria-label="Hotel name and location"
        placeholder="Hotel name & location"
        className="font-helvetica-ui box-border block w-full border-0 border-b-2 border-solid border-[#c2b7a2] bg-transparent py-2 text-center text-[0.875rem] leading-[1.5] tracking-[0.04em] text-[#8b7f73] uppercase outline-none placeholder:text-[#9b9484]/80 focus:border-[#8b7f73] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-[calc(41*var(--u))] xl:w-(--w) xl:border-b-[length:calc(4*var(--u))] xl:pt-0 xl:pb-[calc(10*var(--u))] xl:text-[length:calc(22*var(--u))] xl:leading-[calc(27*var(--u))]"
        style={at(146, 8131, 647)}
      />

      <div role="radiogroup" aria-labelledby={phaseLabelId} className="pt-2 xl:pt-0">
        <p
          id={phaseLabelId}
          className="font-helvetica-ui text-center text-[0.875rem] leading-[1.5] tracking-[0.04em] whitespace-nowrap text-[#9b9484]/80 uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:text-[length:calc(22*var(--u))] xl:leading-[calc(37*var(--u))]"
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
                className="flex cursor-pointer items-center gap-2 whitespace-nowrap xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-[calc(23*var(--u))] xl:gap-[calc(14*var(--u))]"
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
                <span className="font-helvetica-ui text-[0.875rem] tracking-[0.04em] text-[#9b9484]/80 uppercase xl:text-[length:calc(22*var(--u))]">
                  {p.value}
                </span>
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
        className="font-helvetica-ui box-border block [field-sizing:content] w-full resize-none overflow-hidden border-0 border-b-2 border-solid border-[#c2b7a2] bg-transparent py-2 text-center text-[0.875rem] leading-[1.5] tracking-[0.04em] text-[#8b7f73] uppercase outline-none placeholder:text-[#9b9484]/80 focus:border-[#8b7f73] xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:min-h-[calc(41*var(--u))] xl:w-(--w) xl:border-b-[length:calc(4*var(--u))] xl:pt-0 xl:pb-[calc(10*var(--u))] xl:text-[length:calc(22*var(--u))] xl:leading-[calc(27*var(--u))]"
        style={at(146, 8407, 647)}
      />

      {/* Honeypot, hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={!ready || status === "sending"}
        className="font-helvetica-ui mt-4 cursor-pointer self-center rounded-full border-0 bg-[#836b43] px-12 py-3 text-center text-[0.875rem] tracking-[0.02em] text-[#fdfbf4] uppercase transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-70 xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:h-[calc(55*var(--u))] xl:w-(--w) xl:p-0 xl:text-[length:calc(22*var(--u))]"
        style={at(345, 8695, 249)}
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>

      {/* Between the button (ends y8750) and "or write to us at" (y8843). */}
      <p
        role="status"
        aria-live="polite"
        className="font-helvetica-ui mt-4 text-center text-[0.875rem] leading-[1.5] text-[#7d7062] empty:hidden xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:text-[length:calc(20*var(--u))] xl:leading-[calc(28*var(--u))]"
        style={at(84, 8772, 789)}
      >
        {status === "sent"
          ? "Thank you, your enquiry has been sent. We'll be in touch soon."
          : null}
        {status === "error" ? (
          <>
            Something went wrong. Please write to us at{" "}
            <a className="underline" href={`mailto:${email}`}>
              {email}
            </a>
            .
          </>
        ) : null}
      </p>

      <p
        className="font-helvetica-ui mt-4 text-center text-[0.875rem] leading-[1.7] tracking-[0.04em] uppercase xl:absolute xl:top-(--y) xl:left-(--x) xl:m-0 xl:w-(--w) xl:text-[length:calc(22*var(--u))] xl:leading-[calc(29*var(--u))] xl:whitespace-nowrap"
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
