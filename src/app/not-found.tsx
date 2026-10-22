import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-section">
      <Container className="text-center">
        <p className="eyebrow mb-4">404</p>
        <h1 className="text-display text-ink">Page not found.</h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-ink-soft">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-10 flex justify-center">
          <Button href="/">Back home</Button>
        </div>
      </Container>
    </section>
  );
}
