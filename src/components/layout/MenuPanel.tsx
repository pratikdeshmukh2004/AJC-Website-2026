"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Slide-in menu panel (from the design): a cream side panel that enters from
 * the right over the hero. It holds a close (×) button top-right, a quote at
 * the top, and the nav links in the lower portion. "Our Work" shows a ">"
 * submenu affordance.
 */
export function MenuPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <div
      className={cn("fixed inset-0 z-40", open ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!open}
    >
      {/* Click-away backdrop (transparent — video stays visible) */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={cn(
          "absolute inset-0 cursor-default transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full flex-col bg-gradient-to-b from-cream to-cream-dark transition-transform duration-500 ease-editorial sm:w-[62%] md:w-[42%] lg:w-[34%]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Close button (top-right) */}
        <div className="flex justify-end p-6 md:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="cursor-pointer text-brown-dark transition-opacity hover:opacity-60"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Quote */}
        <div className="px-8 md:px-12">
          <blockquote className="max-w-md font-display text-xl leading-snug text-brown-dark md:text-2xl">
            &ldquo;{siteConfig.menuQuote.text}&rdquo;
          </blockquote>
          <p className="mt-4 text-[11px] tracking-[0.18em] text-ink-muted uppercase">
            {siteConfig.menuQuote.author}
          </p>
        </div>

        {/* Nav — anchored toward the lower portion, as in the design */}
        <nav aria-label="Primary" className="mt-auto px-8 pb-12 md:px-12 md:pb-16">
          <ul className="space-y-1.5">
            {siteConfig.nav.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const hasSubmenu = "hasSubmenu" in item && item.hasSubmenu;
              // The arrow shows for the active item, and always for submenu items.
              const showArrow = isActive || hasSubmenu;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center gap-2 font-display text-2xl transition-colors md:text-[1.75rem]",
                      isActive
                        ? "text-brown-dark"
                        : "text-brown hover:text-brown-dark",
                    )}
                  >
                    {item.label}
                    {showArrow ? (
                      <span
                        className={cn(
                          "font-sans text-lg",
                          isActive ? "text-brown-dark" : "text-brown",
                        )}
                      >
                        &gt;
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
