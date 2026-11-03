"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * The email address as a button that copies it to the clipboard (Figma
 * comment on PHILOSOPHY: "Copy email option."). A small "Copied" note shows
 * for a moment and is announced to screen readers. Where the clipboard isn't
 * available, it opens the mail app instead.
 */
export function CopyEmail({
  email,
  className,
  style,
}: {
  email: string;
  className?: string;
  style?: CSSProperties;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={copy}
        title="Copy email address"
        aria-label={`Copy email address ${email}`}
        className={cn("cursor-copy underline-offset-4 hover:underline", className)}
        style={style}
      >
        {email}
      </button>
      <span
        role="status"
        className={cn(
          "text-taupe pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full bg-[#f8f7f2] px-3 py-1 text-xs tracking-[0.04em] whitespace-nowrap uppercase transition-opacity",
          copied ? "opacity-100" : "opacity-0",
        )}
        // Sits in the gap below the address, clear of the text above.
        style={{ top: "calc(100% + 0.35rem)" }}
      >
        {copied ? "Email copied" : ""}
      </span>
    </span>
  );
}
