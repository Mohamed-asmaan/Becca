import { Button, Container } from "@/components/ui";
import WorkCard from "./WorkCard";
import type { WorkProject } from "@/lib/data";

const VIEW_ALL_BTN_CLASS =
  "w-fit sm:ml-auto !border-foreground-inverse !text-foreground-inverse hover:!bg-foreground-inverse hover:!text-accent";

interface FeaturedWorkProps {
  projects: WorkProject[];
}

export default function FeaturedWork({ projects }: FeaturedWorkProps) {
  if (!projects?.length) return null;
  return (
    <section
      className="relative bg-accent py-16 sm:py-24 md:py-32 lg:py-36 text-foreground-inverse"
      aria-labelledby="featured-work-heading"
    >
      <Container>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-5 sm:gap-8 pb-10 sm:pb-14 md:pb-16">
          <h2 id="featured-work-heading" className="text-label text-accent-dark">
            Featured work
          </h2>
          <Button href="/work" variant="outline-inverse" className={VIEW_ALL_BTN_CLASS}>
            View all work
          </Button>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {projects.map((item) => (
            <li key={item.title}>
              <WorkCard {...item} />
            </li>
          ))}
        </ul>
        <div className="mt-12 sm:hidden flex justify-center">
          <Button href="/work" variant="outline-inverse" className={VIEW_ALL_BTN_CLASS}>
            View all work
          </Button>
        </div>
      </Container>
    </section>
  );
}
