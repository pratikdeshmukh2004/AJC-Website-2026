import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <section className="pt-32 pb-section md:pt-40">
      <Container>
        <p className="eyebrow mb-6">Creative Studio</p>
        <h1 className="max-w-4xl text-display text-ink">{siteConfig.name}</h1>
        <p className="mt-8 max-w-xl text-lg text-ink-soft">{siteConfig.description}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href={`mailto:${siteConfig.contactEmail}`}>Get in touch</Button>
        </div>
      </Container>
    </section>
  );
}
