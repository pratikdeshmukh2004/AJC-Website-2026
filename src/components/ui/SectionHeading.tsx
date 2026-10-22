import { Container } from "./Container";

/** Editorial section header with an uppercase eyebrow and serif title. */
export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <Container className="max-w-3xl">
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2 className="text-headline text-ink">{title}</h2>
      {description ? <p className="mt-4 text-lg text-ink-soft">{description}</p> : null}
    </Container>
  );
}
