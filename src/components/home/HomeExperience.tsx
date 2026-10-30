"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { slideToRoute } from "@/lib/page-transition";
import { Hero } from "./Hero";
import { LandingGate } from "./LandingGate";
import { getEntryChoice, setEntryChoice } from "./entry-session";
import type { VideoPlayerHandle } from "./VideoPlayer";

type Stage = "gate" | "leaving" | "entered";

/**
 * Home page flow: landing gate → fade → home hero.
 *
 * The hero is mounted (and its film preloading) underneath the gate from the
 * start. When the visitor picks an option we start the film right inside the
 * click handler (so sound is allowed), fade the gate out, and fade the hero in.
 *
 * If they already chose during this session (returning to Home via client-side
 * navigation), the gate is skipped and the film starts with their choice.
 */
export function HomeExperience() {
  const playerRef = useRef<VideoPlayerHandle>(null);
  // On the first (prerendered/hydrated) load the choice is always null, so the
  // server and client agree and the gate renders.
  const [stage, setStage] = useState<Stage>(() =>
    getEntryChoice() === null ? "gate" : "entered",
  );

  // Returning visitor in the same session: start the film with their choice.
  // The page already has user activation from the earlier click, so audio is allowed.
  useEffect(() => {
    const choice = getEntryChoice();
    if (stage === "entered" && choice !== null) playerRef.current?.start(choice);
    // Only on mount — later transitions to "entered" come from the gate,
    // which has already started the film.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enter = useCallback((withAudio: boolean) => {
    setEntryChoice(withAudio);
    // Must run synchronously in the click handler to keep the user gesture.
    playerRef.current?.start(withAudio);
    setStage("leaving");
  }, []);

  const onExited = useCallback(() => setStage("entered"), []);

  // Scrolling down on Home (wheel, swipe up, ↓ / PageDown / Space) slides to
  // About. Only active once the visitor is past the gate.
  const router = useRouter();
  const navigatingRef = useRef(false);
  useEffect(() => {
    if (stage !== "entered") return;
    router.prefetch("/about");

    const go = () => {
      if (navigatingRef.current) return;
      // Don't hijack scroll while the menu is open (it locks body scroll) or
      // the film is fullscreen.
      if (document.body.style.overflow === "hidden" || document.fullscreenElement) return;
      navigatingRef.current = true;
      slideToRoute(router, "/about");
    };

    // Only a deliberate scroll should navigate. Delta is accumulated across one
    // continuous gesture and must pass WHEEL_INTENT_PX (roughly 4 mouse-wheel
    // notches, or a firm trackpad swipe). A pause of WHEEL_GESTURE_GAP_MS ends
    // the gesture and resets the count, so light/single scrolls do nothing.
    const WHEEL_INTENT_PX = 400;
    const WHEEL_GESTURE_GAP_MS = 250;
    let wheelSum = 0;
    let wheelReset: ReturnType<typeof setTimeout> | undefined;
    const onWheel = (e: WheelEvent) => {
      clearTimeout(wheelReset);
      wheelReset = setTimeout(() => (wheelSum = 0), WHEEL_GESTURE_GAP_MS);
      if (e.deltaY <= 0) {
        wheelSum = 0; // scrolling up cancels the intent
        return;
      }
      // Normalise line/page delta modes (Firefox) to pixels.
      const px =
        e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * innerHeight : e.deltaY;
      wheelSum += px;
      if (wheelSum > WHEEL_INTENT_PX) go();
    };

    let touchStartY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      const onControl = (e.target as HTMLElement | null)?.closest("input");
      touchStartY = onControl ? null : (e.touches[0]?.clientY ?? null);
    };
    const onTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0]?.clientY;
      // A clear swipe up (~15% of the screen), not a small drag.
      const minSwipe = Math.max(120, innerHeight * 0.15);
      if (touchStartY !== null && endY !== undefined && touchStartY - endY > minSwipe) go();
      touchStartY = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowDown" && e.key !== "PageDown" && e.key !== " ") return;
      // Leave keys alone when a control has focus (Space activates buttons).
      const target = e.target as HTMLElement | null;
      if (target?.closest("button, a, input, textarea, select, [contenteditable]")) return;
      e.preventDefault();
      go();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(wheelReset);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [stage, router]);

  return (
    <>
      <div
        className={cn(
          "transition-opacity duration-[1200ms] ease-editorial",
          stage === "gate" ? "opacity-0" : "opacity-100",
        )}
        aria-hidden={stage === "gate"}
        inert={stage === "gate"}
      >
        <Hero playerRef={playerRef} />
      </div>

      {stage !== "entered" ? (
        <LandingGate leaving={stage === "leaving"} onEnter={enter} onExited={onExited} />
      ) : null}
    </>
  );
}
