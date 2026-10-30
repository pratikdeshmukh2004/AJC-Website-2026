/**
 * Slide-up page transition between routes, built on the View Transitions API.
 *
 * The browser snapshots the current page, we navigate, and once the new route
 * has rendered (signalled by <RouteTransitionListener/>) the old snapshot slides
 * up and out while the new page slides up from the bottom. Animations live in
 * globals.css under `html[data-page-transition="slide-up"]`.
 *
 * Falls back to a plain navigation when View Transitions are unsupported or the
 * visitor prefers reduced motion.
 */

type Router = { push: (href: string) => void };

/**
 * After the animation we only keep swallowing the *momentum tail* of the
 * gesture that triggered the transition, so it can't scroll the new page.
 * Momentum is a stream of shrinking wheel deltas with tiny gaps; anything else
 * (a pause, a bigger delta, a new touch) is a fresh scroll and unlocks at once.
 */
/** No wheel input for this long means the gesture is over. */
const GESTURE_GAP_MS = 120;
/**
 * Safety cap on swallowing a (long, slowly decaying) momentum tail. A fresh
 * scroll always unlocks immediately, so this never delays deliberate input.
 */
const MAX_BLOCK_AFTER_MS = 2000;

let resolvePending: (() => void) | null = null;

/** Jump to the top without the global `scroll-behavior: smooth`. */
function scrollToTopInstant(): void {
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  html.style.scrollBehavior = prev;
}

export function slideToRoute(router: Router, href: string): void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("startViewTransition" in document) || reduceMotion) {
    router.push(href);
    return;
  }

  const root = document.documentElement;
  root.dataset.pageTransition = "slide-up";

  // Lock the viewport so the rest of the triggering gesture (incl. trackpad
  // momentum) can't scroll the new page while it lands. preventDefault alone
  // isn't enough: Chrome makes every wheel event after the first one in a
  // gesture non-cancelable, and that first one went to Home's passive listener.
  // An overflow lock works regardless; programmatic scrollTo still works.
  const prevOverflow = root.style.overflow;
  root.style.overflow = "hidden";

  let animating = true;
  let released = false;
  let lastAt = performance.now();
  let lastAbs = Infinity;
  let quietTimer: ReturnType<typeof setTimeout> | undefined;
  let capTimer: ReturnType<typeof setTimeout> | undefined;

  const release = () => {
    if (released) return;
    released = true;
    clearTimeout(quietTimer);
    clearTimeout(capTimer);
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchstart", onTouchStart);
    scrollToTopInstant();
    root.style.overflow = prevOverflow;
  };

  // Release once input has gone quiet (only after the animation is done).
  const armQuietRelease = () => {
    clearTimeout(quietTimer);
    quietTimer = setTimeout(() => !animating && release(), GESTURE_GAP_MS);
  };

  const onWheel = (e: WheelEvent) => {
    const now = performance.now();
    const abs = Math.abs(e.deltaY);
    const gap = now - lastAt;
    // Momentum: deltas keep shrinking (small values may repeat) with no pause.
    const isMomentum = gap < GESTURE_GAP_MS && (abs < lastAbs || (abs === lastAbs && abs <= 10));
    lastAt = now;
    lastAbs = abs;

    if (!animating && !isMomentum) {
      // A fresh, deliberate scroll on the new page — let it through.
      release();
      return;
    }
    if (e.cancelable) e.preventDefault();
    armQuietRelease();
  };
  const onTouchMove = (e: TouchEvent) => {
    if (e.cancelable) e.preventDefault();
  };
  // A new touch after the animation is a new gesture.
  const onTouchStart = () => {
    if (!animating) release();
  };
  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("touchstart", onTouchStart, { passive: true });

  const transition = document.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        resolvePending = resolve;
        router.push(href);
        // Safety net: never leave the page frozen if the route doesn't report in.
        setTimeout(() => {
          if (resolvePending === resolve) {
            resolvePending = null;
            resolve();
          }
        }, 3000);
      }),
  );

  void transition.finished.finally(() => {
    delete root.dataset.pageTransition;
    scrollToTopInstant();
    animating = false;

    // Nothing in flight → unlock now. Otherwise wait out the momentum tail.
    if (performance.now() - lastAt >= GESTURE_GAP_MS) {
      release();
      return;
    }
    armQuietRelease();
    capTimer = setTimeout(release, MAX_BLOCK_AFTER_MS);
  });
}

/** Called once the new route has committed to the DOM. */
export function notifyRouteCommitted(): void {
  if (!resolvePending) return;
  // Make sure the new page is snapshotted (and shown) from the top.
  scrollToTopInstant();
  resolvePending();
  resolvePending = null;
}
