import { cn } from "@/lib/utils";

/**
 * Centered max-width wrapper with responsive horizontal padding.
 *
 * `wide` switches to the full-bleed editorial width used by the Figma "Our
 * Work" layout (content spans ~89% of a 1920px canvas, i.e. ~5.5% side
 * margins), instead of the default 1440px cap used elsewhere on the site.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  wide?: boolean;
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full",
        wide ? "max-w-[1920px] px-6 md:px-[5.5vw]" : "container-px max-w-container",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
