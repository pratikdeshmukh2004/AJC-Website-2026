import { assetPath, cn } from "@/lib/utils";

/*
  Music toggle beside each Archival post on Ranjit's Svaasa (AJC-20). Figma
  note: low opacity while the music is muted, highlighted while it plays.
  The page owns which track is playing (`track`); `id` is this post's track.
  Sizes use the page canvas unit `--u`; position it with `className`.
*/
export function AudioToggle({
  id,
  track,
  onChange,
  label,
  className,
}: {
  id: string;
  track: string | null;
  onChange: (next: string | null) => void;
  label: string;
  className: string;
}) {
  const playing = track === id;

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={playing}
      onClick={() => onChange(playing ? null : id)}
      className={cn(
        "absolute h-[calc(29*var(--u))] w-[calc(31*var(--u))] cursor-pointer transition-opacity duration-300",
        playing ? "opacity-100" : "opacity-58 hover:opacity-80",
        className,
      )}
    >
      {/* Raw <img>: a tiny SVG outside the raster pipeline. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assetPath("/images/projects/ranjits-svaasa/ornament.svg")}
        alt=""
        className="block h-full w-full"
      />
    </button>
  );
}
