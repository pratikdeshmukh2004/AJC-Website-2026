import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-card px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 ease-editorial";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-cream hover:bg-brand-dark",
  outline: "border border-ink/20 text-ink hover:border-brand hover:text-brand",
  ghost: "text-ink hover:text-brand",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

/** Renders an internal Link when `href` is set, otherwise a <button>. */
export function Button({
  href,
  variant = "primary",
  className,
  children,
  ...props
}: CommonProps &
  ({ href: string } | React.ButtonHTMLAttributes<HTMLButtonElement>) & { href?: string }) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
