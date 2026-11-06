import { Header } from "@/components/layout/Header";

/**
 * Layout for standard inner pages (work, studio, contact, …).
 * Adds the sticky Header; the site Footer comes from the root layout. The home
 * route lives outside this group so its full-bleed hero can render its own
 * overlay chrome.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
