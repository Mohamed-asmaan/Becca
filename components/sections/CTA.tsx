import { Button, Container } from "@/components/ui";

interface CTAProps {
  heading?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function CTA({ heading = "How can we serve you?", buttonLabel = "Let's talk", buttonHref = "/connect" }: CTAProps) {
  return (
    <section
      className="relative bg-cta-bg py-16 sm:py-24 md:py-28 lg:py-32"
      aria-labelledby="cta-heading"
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2 id="cta-heading" className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-accent max-w-[23rem] sm:max-w-[83rem] px-4 sm:px-0">
            {heading}
          </h2>
          <div className="mt-8 sm:mt-14 md:mt-20">
            <Button href={buttonHref}>{buttonLabel}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
