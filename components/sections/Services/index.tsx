import { Button, Container } from "@/components/ui";
import ServiceCard from "./ServiceCard";
import type { ServiceItem } from "@/lib/data";

interface ServicesProps {
  items: ServiceItem[];
}

export default function Services({ items }: ServicesProps) {
  if (!items?.length) return null;
  return (
    <section
      className="relative bg-surface py-16 sm:py-24 md:py-32 lg:py-36 text-foreground-inverse"
      aria-labelledby="services-heading"
    >
      <Container>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-5 sm:gap-8 lg:gap-12 pb-10 sm:pb-16 md:pb-20">
          <h2 id="services-heading" className="text-label text-foreground-inverse/70">
            Our services
          </h2>
          <p className="max-w-[36rem] text-sm sm:text-body text-foreground-inverse">
            Through the power of our network, we drive relevance, revenue and
            reputation for brands worldwide, building legacies that last.
          </p>
        </div>
        <ul className="space-y-0">
          {items.map((service, i) => (
            <li key={service.title}>
              <ServiceCard
                {...service}
                showLine={i < items.length - 1}
              />
            </li>
          ))}
        </ul>
        <div className="mt-12 sm:mt-24 flex justify-center">
          <Button href="/services" variant="outline-inverse">
            View all services
          </Button>
        </div>
      </Container>
    </section>
  );
}
