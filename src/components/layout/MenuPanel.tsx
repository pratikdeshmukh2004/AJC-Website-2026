"use client";

import { useEffect, useState } from "react";
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
 * the right over the page. It holds a quote at the top and the nav links
 * below. "Our Work" is the only item with a submenu (the project filters). It
 * opens when "Our Work" is clicked (not on hover) and closes on a second click.
 *
 * Two layouts in one DOM:
 *   - md and up: a fixed 31rem panel with a close (×) row on top; the submenu
 *     is a column beside the links.
 *   - below md: Figma mobile menu (node 4091:371, 390 wide). A solid panel 60% of
 *     the screen wide; the submenu opens inline under "Our Work" and pushes the
 *     rest of the links down. Sizes scale with the screen width via --u (1
 *     design px). The × is tucked top-right, in the gap beside the quote (the
 *     frame doesn't draw one, but a dialog needs a visible way to close).
 */
export function MenuPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [workOpen, setWorkOpen] = useState(false);
  // The filter currently open on /our-work, read from the URL hash each time the submenu opens.
  const [category, setCategory] = useState<WorkCategory>("All Projects");

  const toggleWork = () => {
    if (!workOpen) setCategory(categoryFromHash(window.location.hash));
    setWorkOpen((v) => !v);
  };

  // The submenu only shows while the menu itself is open.
  const showWork = open && workOpen;

  // Close on Escape and lock body scroll while open. Closing the menu, however
  // it happens, also folds the submenu so it reopens collapsed.
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
      setWorkOpen(false);
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
      {/* Click-away backdrop (transparent — the page stays visible) */}
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
          "ease-editorial md:from-cream md:to-cream-dark absolute inset-y-0 right-0 flex w-[60%] flex-col overflow-y-auto bg-[#f8f7f2] transition-transform duration-500 [--u:clamp(1px,calc(100vw/390),1.5px)] md:w-[31rem] md:overflow-visible md:bg-gradient-to-b",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Close button */}
        <div className="absolute top-[calc(36*var(--u))] right-[calc(6*var(--u))] md:static md:flex md:justify-end md:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="text-brown-dark block cursor-pointer p-[calc(8*var(--u))] transition-opacity hover:opacity-60 md:p-0"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-[calc(16*var(--u))] md:size-6"
              fill="none"
              stroke="currentColor"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Quote */}
        <div className="pt-[calc(42*var(--u))] pr-[calc(32*var(--u))] pl-[calc(43*var(--u))] md:px-12 md:pt-0">
          <blockquote className="font-cormorant text-sage md:text-brown-dark text-[length:calc(15*var(--u))] leading-[calc(20*var(--u))] tracking-[-0.03em] md:max-w-md md:text-2xl md:leading-snug md:tracking-normal">
            &ldquo;{siteConfig.menuQuote.text}&rdquo;
          </blockquote>
          <p className="text-ink-muted mt-[calc(15*var(--u))] text-[length:calc(7*var(--u))] leading-[calc(8*var(--u))] tracking-[0.02em] uppercase md:mt-4 md:text-[11px] md:leading-normal md:tracking-[0.18em]">
            {siteConfig.menuQuote.author}
          </p>
        </div>

        {/* Nav — below the quote on mobile, anchored toward the lower portion on desktop */}
        <nav
          aria-label="Primary"
          className="mt-[calc(49*var(--u))] pr-[calc(32*var(--u))] pb-[calc(48*var(--u))] pl-[calc(43*var(--u))] md:mt-auto md:px-12 md:pb-16"
        >
          <ul className="space-y-[calc(17*var(--u))] md:relative md:w-fit md:space-y-1.5">
            {siteConfig.nav.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const hasSubmenu = "hasSubmenu" in item && item.hasSubmenu;
              // Figma 3318:635: the current page, or "Our Work" while its submenu is
              // open, is the darker taupe. Only the ">" is bold.
              const emphasised = isActive || (hasSubmenu && showWork);
              const itemClass = cn(
                "font-cormorant flex w-fit items-center gap-2 text-[length:calc(20*var(--u))] leading-[calc(17*var(--u))] tracking-[-0.03em] transition-colors md:inline-flex md:text-[1.75rem] md:leading-8 md:tracking-normal",
                emphasised
                  ? "text-taupe md:text-brown-dark"
                  : "text-sage hover:text-taupe md:text-brown md:hover:text-brown-dark",
              );

              return (
                <li key={item.href}>
                  {hasSubmenu ? (
                    <button
                      type="button"
                      onClick={toggleWork}
                      aria-expanded={showWork}
                      aria-controls="menu-work-submenu"
                      className={cn(itemClass, "cursor-pointer")}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className="font-cormorant hidden text-[1.75rem] font-bold md:inline"
                      >
                        &gt;
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={itemClass}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Submenu: the project filters. Below md it folds open inline under
                      "Our Work"; from md up it is a column beside the links. */}
                  {hasSubmenu ? (
                    <div
                      id="menu-work-submenu"
                      inert={!showWork}
                      className={cn(
                        "ease-editorial grid transition-[grid-template-rows,opacity] duration-300 md:absolute md:top-1/2 md:left-full md:ml-10 md:block md:-translate-y-1/2 md:transition-[opacity,translate]",
                        showWork
                          ? "grid-rows-[1fr] opacity-100 md:translate-x-0"
                          : "grid-rows-[0fr] opacity-0 md:-translate-x-3",
                      )}
                    >
                      <div className="min-h-0 overflow-hidden md:overflow-visible">
                        <ul
                          aria-label="Our Work"
                          className="pt-[calc(18*var(--u))] pb-[calc(5*var(--u))] pl-[calc(13*var(--u))] md:space-y-1.5 md:p-0"
                        >
                          {workCategories.map((c) => {
                            const isCurrent = pathname.startsWith("/our-work") && c === category;
                            return (
                              <li key={c}>
                                <Link
                                  href={`/our-work#${categoryHash(c)}`}
                                  aria-current={isCurrent ? "page" : undefined}
                                  onClick={() => {
                                    // Already on /our-work the gallery stays mounted: tell it directly.
                                    window.dispatchEvent(
                                      new CustomEvent(WORK_CATEGORY_EVENT, { detail: c }),
                                    );
                                    onClose();
                                  }}
                                  className={cn(
                                    "font-cormorant block text-[length:calc(15*var(--u))] leading-[calc(26*var(--u))] tracking-[-0.03em] whitespace-nowrap transition-colors md:text-2xl md:leading-8 md:tracking-normal",
                                    isCurrent
                                      ? "text-taupe md:text-brown-dark"
                                      : "text-sage hover:text-taupe md:text-brown md:hover:text-brown-dark",
                                  )}
                                >
                                  {c}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
