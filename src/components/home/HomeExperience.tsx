"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
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
