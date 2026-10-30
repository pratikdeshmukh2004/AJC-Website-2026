import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

/** Site footer with contact and social links. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-section border-t border-ink/10 bg-cream-dark">
      <Container className="grid gap-10 py-16 md:grid-cols-3">
        <div>
          <p className="font-cormorant text-3xl text-ink">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-sm text-ink-soft">{siteConfig.description}</p>
        </div>

        <div>
          <p className="eyebrow mb-4">Contact</p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-sm text-ink-soft transition-colors hover:text-brand"
          >
            {siteConfig.contactEmail}
          </a>
        </div>

        <div>
          <p className="eyebrow mb-4">Follow</p>
          <ul className="space-y-2">
            {siteConfig.social.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-soft transition-colors hover:text-brand"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-ink/10 py-6 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
        <span>
          © {year} {siteConfig.name}. All rights reserved.
        </span>
        <span>Crafted with care.</span>
      </Container>
    </footer>
  );
}
