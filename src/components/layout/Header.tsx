import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

/** Top navigation. Static, server-rendered. */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-cormorant text-2xl tracking-wide text-ink"
          aria-label={`${siteConfig.name} — home`}
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-8">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm tracking-wide text-ink-soft transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
