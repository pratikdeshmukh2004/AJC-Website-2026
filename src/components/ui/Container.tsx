import { cn } from "@/lib/utils";

/** Centered max-width wrapper with responsive horizontal padding. */
export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag className={cn("container-px mx-auto w-full max-w-container", className)}>{children}</Tag>
  );
}
