/**
 * Inline SVG icons for the hero video control bar, drawn to match the glyphs
 * in Chrome's native video controls (light grey on a dark translucent bar).
 */

type IconProps = { className?: string };

export function PlayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M7 4.5v15l12-7.5z" />
    </svg>
  );
}

export function PauseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <rect x="6" y="4.5" width="4" height="15" rx="0.3" />
      <rect x="14" y="4.5" width="4" height="15" rx="0.3" />
    </svg>
  );
}

/** Speaker with two sound arcs (unmuted) — Chrome style. */
export function VolumeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M3 9v6h4l5 4V5L7 9H3z" />
      <path
        d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Speaker with an "x" where the arcs would be (muted) — Chrome style. */
export function MuteIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M3 9v6h4l5 4V5L7 9H3z" />
      <path
        d="M16 9.5l5 5M21 9.5l-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Picture-in-picture — Chrome style: a rounded outer rectangle with a solid
 * smaller rectangle inset at the bottom-right.
 */
export function PipIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect x="11.5" y="11" width="7.5" height="6" rx="1" fill="currentColor" />
    </svg>
  );
}

/** Fullscreen — Chrome style: four corner arrows pointing outward. */
export function FullscreenIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M4 9V4h5v2H6v3H4zM15 6V4h5v5h-2V6h-3zM6 15v3h3v2H4v-5h2zM18 15h2v5h-5v-2h3v-3z" />
    </svg>
  );
}
