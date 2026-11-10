import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
  Text blocks shared by the canvas-style project pages (1 Figma px =
  100cqw / 1920 via `--u`). Position each with `className`
  (e.g. `top-[calc(3225*var(--u))] left-[calc(109*var(--u))]`).
*/

/** Section heading: Cormorant 97px (Figma "Identity", "Colour Palette", ...). */
export function WorkHeading({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "font-cormorant text-taupe absolute text-[length:calc(97*var(--u))] leading-[calc(76*var(--u))] tracking-[calc(-5.82*var(--u))]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Body copy: Helvetica 20px in sage. Children are the paragraphs. */
export function WorkBody({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "font-helvetica-regular text-sage absolute flex w-[calc(677*var(--u))] flex-col gap-[calc(20*var(--u))] text-[length:calc(20*var(--u))] leading-[1.25] tracking-[calc(0.4*var(--u))]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Small uppercase caption beside a block of copy. */
export function WorkLabel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn(
        "font-helvetica-regular text-sage absolute text-[length:calc(20*var(--u))] leading-[calc(23*var(--u))] tracking-[calc(0.4*var(--u))] whitespace-nowrap uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
