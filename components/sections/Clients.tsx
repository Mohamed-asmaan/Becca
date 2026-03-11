import { memo } from "react";
import { Container } from "@/components/ui";

interface ClientsProps {
  items: string[];
}

function Clients({ items }: ClientsProps) {
  if (!items?.length) return null;
  return (
    <section
      className="relative bg-bg py-16 sm:py-24 md:py-32 lg:py-36"
      aria-labelledby="clients-heading"
    >
      <Container>
        <h2
          id="clients-heading"
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-foreground text-center mb-8 sm:mb-16 md:mb-24 lg:mb-28"
        >
          Select clients
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 sm:gap-x-10 gap-y-4 sm:gap-y-6">
          {items.map((client) => (
            <li
              key={client}
              className="text-xs sm:text-sm md:text-base font-medium text-foreground py-2 sm:py-4 border-b border-foreground/20"
            >
              {client}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default memo(Clients);
