"use client";

import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { Ref } from "react";
import { cn, formatTime } from "@/lib/utils";
import { FullscreenIcon, MuteIcon, PauseIcon, PlayIcon, PipIcon, VolumeIcon } from "./player-icons";

/**
 * Hero video player for the AJC brand film with a CUSTOM control bar styled to
 * match the design reference exactly (dark translucent gradient bar over the
 * video; light icons; scrubber with a rounded timecode tooltip riding the
 * playhead; play/pause left; mute + picture-in-picture + fullscreen right).
 *
 * Playback is started by the landing gate, not on mount: the gate calls
 * `start(withAudio)` from its button click handler. Because that runs inside a
 * user gesture, browsers allow the film to play with sound.
 */

const noopSubscribe = () => () => {};

export type VideoPlayerHandle = {
  /** Start the film from the beginning, with or without sound. */
  start: (withAudio: boolean) => void;
};

type PipVideo = HTMLVideoElement & {
  requestPictureInPicture?: () => Promise<PictureInPictureWindow>;
};
type PipDocument = Document & {
  pictureInPictureEnabled?: boolean;
  exitPictureInPicture?: () => Promise<void>;
  pictureInPictureElement?: Element | null;
};

export function VideoPlayer({
  src,
  poster,
  className,
  ref,
}: {
  src: string;
  poster?: string;
  className?: string;
  ref?: Ref<VideoPlayerHandle>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  // PiP support is a static browser capability. Read it hydration-safely:
  // false during prerender, the real value on the client.
  const pipSupported = useSyncExternalStore(
    noopSubscribe,
    () => Boolean((document as PipDocument).pictureInPictureEnabled),
    () => false,
  );
  // Controls are hidden by default; shown on cursor movement, then auto-hidden.
  const [controlsVisible, setControlsVisible] = useState(false);

  // Called by the landing gate from inside its click handler (a user gesture),
  // so audible playback is permitted.
  useImperativeHandle(
    ref,
    () => ({
      start(withAudio: boolean) {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = 0;
        video.volume = 1;
        video.muted = !withAudio;
        setMuted(!withAudio);
        video.play().catch(() => {
          // Very rare: the browser still refused audible playback. Fall back to
          // muted so the film plays; the mute button can turn sound on.
          video.muted = true;
          setMuted(true);
          void video.play().catch(() => {});
        });
      },
    }),
    [],
  );

  // Reveal controls, then schedule auto-hide after a period of inactivity.
  const revealControls = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsVisible(false), 2500);
  }, []);

  const hideControls = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setControlsVisible(false);
  }, []);

  // Clear the pending hide timer on unmount.
  useEffect(
    () => () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    },
    [],
  );

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    if (!next && video.volume === 0) video.volume = 1;
    setMuted(next);
  }, []);

  const onSeek = useCallback((value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value;
    setCurrent(value);
  }, []);

  const togglePip = useCallback(async () => {
    const video = videoRef.current as PipVideo | null;
    const doc = document as PipDocument;
    if (!video) return;
    try {
      if (doc.pictureInPictureElement) await doc.exitPictureInPicture?.();
      else await video.requestPictureInPicture?.();
    } catch {
      /* ignore */
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen().catch(() => {});
  }, []);

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={revealControls}
      onMouseLeave={hideControls}
      onTouchStart={revealControls}
      className={cn(
        "group relative h-full w-full overflow-hidden bg-white",
        controlsVisible ? "cursor-default" : "cursor-none",
        className,
      )}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster={poster}
        loop
        playsInline
        preload="auto"
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Custom control bar:
          - a small square pill holding play/pause
          - one long rounded bar holding the scrubber + right-side icons
          Hidden by default; revealed on cursor movement, auto-hides when idle. */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 px-3 py-3 text-[#e0e0e0] transition-opacity duration-300 md:px-4",
          controlsVisible ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {/* Play / pause — square pill */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-md bg-black/45 transition-colors hover:text-white"
        >
          {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
        </button>

        {/* Long bar: scrubber (fills) + mute / PiP / fullscreen (right end) */}
        <div className="flex h-8 flex-1 items-center gap-4 rounded-md bg-black/45 px-3">
          {/* Scrubber; tooltip shows on hover only */}
          <div className="group/scrub relative flex-1">
            <div
              className="text-ink/80 pointer-events-none absolute -top-3 -translate-x-1/2 -translate-y-full rounded-[4px] bg-white px-1.5 py-0.5 text-[10px] font-medium tabular-nums opacity-0 shadow-sm transition-opacity group-hover/scrub:opacity-100"
              style={{ left: `${progress}%` }}
            >
              {formatTime(current)}
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
            </div>

            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={current}
              onChange={(e) => onSeek(Number(e.target.value))}
              aria-label="Seek"
              className="player-range block h-1 w-full"
              style={{ ["--pct" as string]: `${progress}%` }}
            />
          </div>

          {/* Right-side icons, inside the same bar */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="cursor-pointer transition-colors hover:text-white"
            >
              {muted ? <MuteIcon className="h-5 w-5" /> : <VolumeIcon className="h-5 w-5" />}
            </button>

            {pipSupported ? (
              <button
                type="button"
                onClick={togglePip}
                aria-label="Picture in picture"
                className="cursor-pointer transition-colors hover:text-white"
              >
                <PipIcon className="h-5 w-5" />
              </button>
            ) : null}

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Fullscreen"
              className="cursor-pointer transition-colors hover:text-white"
            >
              <FullscreenIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
