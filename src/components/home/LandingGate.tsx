"use client";

import { useEffect } from "react";
import Image from "next/image";
import { assetPath, cn } from "@/lib/utils";
// Static import: Next fingerprints the file and applies the basePath itself.
import apekshaJainLogo from "../../../public/images/apeksha-jain.png";

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
    "w-full cursor-pointer bg-cream px-6 py-4 text-sm tracking-[0.04em] text-taupe uppercase transition-colors duration-300 hover:bg-taupe hover:text-cream focus-visible:outline-cream md:py-5 md:text-lg";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Enter the AJC website"
      className={cn(
        "fixed inset-0 z-50 overflow-hidden bg-cream transition-opacity ease-editorial",
        leaving ? "pointer-events-none opacity-0" : "opacity-100",
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      {/* Background clip — decorative, always muted */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={assetPath("/videos/landing-home.mp4")}
        poster={assetPath("/images/landing-poster.jpg")}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />

      <div className="relative flex h-full flex-col items-center justify-between px-6 pt-[14vh] pb-[14vh]">
        <Image
          src={apekshaJainLogo}
          alt="Apeksha Jain"
          loading="eager"
          className="h-auto w-[min(60vw,445px)]"
        />

        <div className="flex w-full font-helvetica max-w-[38rem] flex-col gap-5 md:gap-7">
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
