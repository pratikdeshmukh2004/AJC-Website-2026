"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  WORK_CATEGORY_EVENT,
  categoryFromHash,
  categoryHash,
  workCategories,
  type WorkCategory,
} from "@/config/projects";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Slide-in menu panel (from the design): a cream side panel that enters from
 * the right over the hero. It holds a close (×) button top-right, a quote at
 * the top, and the nav links in the lower portion. "Our Work" is the only item
 * with a ">" and opens a submenu (the project filters) on hover or focus: a
 * column right beside the links (md and up). The panel is a fixed 31rem wide
 * on md and up: just enough for the links and the column.
 */
export function MenuPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [workOpen, setWorkOpen] = useState(false);
  // The filter currently open on /our-work, read from the URL hash each time the menu opens.
  const [category, setCategory] = useState<WorkCategory>("All Projects");
  const closeTimer = useRef<number | undefined>(undefined);

  // Short delay on leaving, so the pointer can cross from "Our Work" to the submenu.
  const openWork = () => {
    window.clearTimeout(closeTimer.current);
    setCategory(categoryFromHash(window.location.hash));
    setWorkOpen(true);
  };
  const closeWork = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setWorkOpen(false), 150);
  };

  // The submenu only shows while the menu itself is open.
  const showWork = open && workOpen;

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
      // Closed panel stays mounted (for the slide animation) but must not be
      // focusable or announced.
      inert={!open}
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
          "from-cream to-cream-dark ease-editorial absolute inset-y-0 right-0 flex w-full flex-col bg-gradient-to-b transition-transform duration-500 sm:w-[62%] md:w-[31rem]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Close button (top-right) */}
        <div className="flex justify-end p-6 md:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="text-brown-dark cursor-pointer transition-opacity hover:opacity-60"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Quote */}
        <div className="px-8 md:px-12">
          <blockquote className="font-cormorant text-brown-dark max-w-md text-xl leading-snug md:text-2xl">
            &ldquo;{siteConfig.menuQuote.text}&rdquo;
          </blockquote>
          <p className="text-ink-muted mt-4 text-[11px] tracking-[0.18em] uppercase">
            {siteConfig.menuQuote.author}
          </p>
        </div>

        {/* Nav — anchored toward the lower portion, as in the design */}
        <nav
          aria-label="Primary"
          className="mt-auto flex items-center gap-10 px-8 pb-12 md:px-12 md:pb-16"
        >
          <ul className="space-y-1.5">
            {siteConfig.nav.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const hasSubmenu = "hasSubmenu" in item && item.hasSubmenu;

              return (
                <li
                  key={item.href}
                  onMouseEnter={hasSubmenu ? openWork : undefined}
                  onMouseLeave={hasSubmenu ? closeWork : undefined}
                  onFocus={hasSubmenu ? openWork : undefined}
                  onBlur={hasSubmenu ? closeWork : undefined}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "font-cormorant inline-flex items-center gap-2 text-2xl transition-colors md:text-[1.75rem]",
                      isActive ? "text-brown-dark" : "text-brown hover:text-brown-dark",
                    )}
                  >
                    {item.label}
                    {hasSubmenu ? (
                      <span
                        className={cn(
                          "font-helvetica text-lg",
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

          {/* Submenu: the project filters, right beside the links (md and up), bottom-aligned. */}
          <div
            onMouseEnter={openWork}
            onMouseLeave={closeWork}
            onFocus={openWork}
            onBlur={closeWork}
            className={cn(
              "ease-editorial hidden transition-[opacity,translate] duration-300 md:block",
              showWork
                ? "pointer-events-auto translate-x-0 opacity-100"
                : "pointer-events-none -translate-x-3 opacity-0",
            )}
          >
            <ul aria-label="Our Work" className="space-y-1.5">
              {workCategories.map((c) => {
                const isCurrent = pathname.startsWith("/our-work") && c === category;
                return (
                  <li key={c}>
                    <Link
                      href={`/our-work#${categoryHash(c)}`}
                      tabIndex={showWork ? 0 : -1}
                      aria-current={isCurrent ? "page" : undefined}
                      onClick={() => {
                        // Already on /our-work the gallery stays mounted: tell it directly.
                        window.dispatchEvent(new CustomEvent(WORK_CATEGORY_EVENT, { detail: c }));
                        onClose();
                      }}
                      className={cn(
                        "font-cormorant block text-xl whitespace-nowrap transition-colors md:text-2xl",
                        isCurrent
                          ? "text-brown-dark [-webkit-text-stroke:0.5px_currentColor]"
                          : "text-brown hover:text-brown-dark",
                      )}
                    >
                      {c}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </aside>
    </div>
  );
}
