"use client";

import { useEffect } from "react";
import { assetPath, cn } from "@/lib/utils";
import { ApekshaJainWordmark } from "@/components/brand";

/**
 * Entry screen shown before the home page.
 * A short landing clip loops silently in the background while the visitor
 * chooses to continue with or without audio. The choice click is the user
 * gesture that lets the brand film start with sound.
 *
 * The parent controls the fade: when `leaving` is true this screen fades out,
 * then `onExited` fires so the parent can unmount it.
 */
const FADE_MS = 900;

export function LandingGate({
  leaving,
  onEnter,
  onExited,
}: {
  leaving: boolean;
  onEnter: (withAudio: boolean) => void;
  onExited: () => void;
}) {
  // Unmount after the fade-out. A timer (rather than transitionend) keeps this
  // reliable when reduced-motion disables the transition.
  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(onExited, FADE_MS);
    return () => clearTimeout(t);
  }, [leaving, onExited]);

  const buttonClass =
    "h-9 w-full cursor-pointer bg-cream text-xs tracking-[0.02em] text-taupe uppercase transition-colors duration-300 hover:bg-taupe hover:text-white focus-visible:outline-white md:h-auto md:bg-white md:px-6 md:py-5 md:text-lg md:tracking-[0.04em]";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Enter the AJC website"
      className={cn(
        "ease-editorial fixed inset-0 z-50 overflow-hidden bg-white transition-opacity",
        leaving ? "pointer-events-none opacity-0" : "opacity-100",
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      {/* Background clip — decorative, always muted */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={assetPath("/videos/landing-home.mp4")}
        poster={assetPath("/images/home/landing-poster.jpg")}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />

      <div className="relative flex h-full flex-col items-center justify-between px-6 pt-[74px] pb-[70px] md:pt-[14vh] md:pb-[14vh]">
        {/* Takes the text colour — change `text-white` to recolour. */}
        <ApekshaJainWordmark
          title="Apeksha Jain"
          className="w-[151px] text-white md:w-[min(60vw,445px)]"
        />

        <div className="font-helvetica flex w-full max-w-[206px] flex-col gap-4 md:max-w-[38rem] md:gap-7">
          <button
            type="button"
            onClick={() => onEnter(true)}
            disabled={leaving}
            className={buttonClass}
          >
            Continue with audio
          </button>
          <button
            type="button"
            onClick={() => onEnter(false)}
            disabled={leaving}
            className={buttonClass}
          >
            Continue without audio
          </button>
        </div>
      </div>
    </div>
  );
}
