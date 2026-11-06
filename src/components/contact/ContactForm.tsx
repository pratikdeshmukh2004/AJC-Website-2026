"use client";

import { useEffect, useState, useSyncExternalStore, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import { cn, fig } from "@/lib/utils";

/**
 * "Say Hello!" enquiry form (Figma: CONTACT US, node 2823:3089).
 *
 * The site is a static export, so there is no server of our own. Submissions
 * are POSTed to `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` (a Google Apps Script web
 * app that appends a row to a Google Sheet and emails apeksha@apekshajain.in;
 * see README → Contact form). It's sent as a text/plain "no-cors" request:
 * Apps Script can't answer a CORS preflight, and its redirect response has no
 * CORS headers, so the reply can't be read (see onSubmit).
 *
 * If the endpoint isn't configured, the form falls back to opening the
 * visitor's mail app with the message pre-filled.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? "";

type Status = "idle" | "sending" | "sent" | "error";

const FIELDS = [
  { name: "name", label: "Please add your name here", autoComplete: "name" },
  { name: "message", label: "Your message", autoComplete: "off" },
  { name: "contact", label: "Your contact details", autoComplete: "email" },
] as const;

type FieldName = (typeof FIELDS)[number]["name"];

/** How long the "sent" confirmation stays up. */
const SENT_MESSAGE_MS = 6000;

const noopSubscribe = () => () => {};

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  // False in the server HTML, true once React has hydrated. Until then Send is
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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    // Honeypot: real visitors never see or fill this field.
    if (data.get("company")) return;

    const values = Object.fromEntries(
      FIELDS.map((f) => [f.name, String(data.get(f.name) ?? "").trim()]),
    ) as Record<FieldName, string>;

    if (!ENDPOINT) {
      const subject = `Hello from ${values.name}`;
      const body = `${values.message}\n\nContact: ${values.contact}`;
      window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      // Apps Script answers a POST with a 302 to script.googleusercontent.com,
      // and that redirect carries no CORS headers, so a normal fetch is
      // blocked even though the script ran. "no-cors" sends the same request
      // (text/plain keeps it a simple request) and skips reading the reply.
      // The response is opaque, so only a network failure lands in catch.
      await fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ ...values, page: window.location.href }),
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "font-helvetica-regular block w-full resize-none border-0 border-b-[length:var(--rule)] border-[#c2b7a2] bg-transparent text-center text-taupe uppercase placeholder:text-[#9b9484] focus-visible:border-[#836b43] focus-visible:outline-none";

  return (
    <form
      onSubmit={onSubmit}
      // Typing again clears an old confirmation or error.
      onInput={() => status !== "idle" && status !== "sending" && setStatus("idle")}
      noValidate={false}
      aria-label="Say hello"
      className="flex w-full flex-col items-center"
      style={{
        // Underline thickness: 4px at the 1920px design width.
        ["--rule" as string]: fig(4, "2px"),
        maxWidth: fig(647, "20rem"),
        marginTop: fig(105, "2.5rem"),
      }}
    >
      {FIELDS.map((f) => {
        const shared = {
          id: `contact-${f.name}`,
          name: f.name,
          required: true,
          placeholder: f.label,
          autoComplete: f.autoComplete,
          className: fieldClass,
          style: {
            fontSize: fig(23, "0.95rem"),
            letterSpacing: "0.02em",
            lineHeight: fig(26, "1.25rem"),
            // 45 + 26 line + 11 + 4 rule = the 86px field pitch in Figma.
            paddingTop: fig(45, "1.25rem"),
            paddingBottom: fig(11, "0.5rem"),
          },
        };
        return (
          <div key={f.name} className="w-full">
            <label htmlFor={shared.id} className="sr-only">
              {f.label}
            </label>
            {f.name === "message" ? (
              // Grows with its content (field-sizing), so it reads like the
              // single-line design until the visitor writes more.
              <textarea
                {...shared}
                rows={1}
                className={cn(shared.className, "[field-sizing:content]")}
              />
            ) : (
              <input {...shared} type="text" />
            )}
          </div>
        );
      })}

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
        className="font-helvetica-regular hover:bg-taupe-dark cursor-pointer rounded-full bg-[#836b43] text-[#fdfbf4] uppercase transition-colors disabled:cursor-wait disabled:opacity-70"
        style={{
          marginTop: fig(65, "2rem"),
          width: fig(249, "9rem"),
          height: fig(55, "2.75rem"),
          fontSize: fig(23, "0.95rem"),
          letterSpacing: "0.02em",
        }}
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className="font-helvetica-regular text-taupe text-center empty:hidden"
        style={{ marginTop: fig(20, "1rem"), fontSize: fig(20, "0.9rem") }}
      >
        {status === "sent"
          ? "Thank you, your message has been sent. We'll be in touch soon."
          : null}
        {status === "error" ? (
          <>
            Something went wrong. Please write to us at{" "}
            <a className="underline" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
            .
          </>
        ) : null}
      </p>
    </form>
  );
}
