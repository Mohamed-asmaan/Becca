import { Button, Container } from "@/components/ui";
import NewsCard from "./NewsCard";
import type { NewsArticle } from "@/lib/data";

interface NewsProps {
  items: NewsArticle[];
}

export default function News({ items }: NewsProps) {
  if (!items?.length) return null;
  const [featured, ...rest] = items;
  return (
    <section
      className="relative bg-surface py-16 sm:py-24 md:py-32 lg:py-36 text-foreground-inverse"
      aria-labelledby="news-heading"
    >
      <Container>
        <h2 id="news-heading" className="text-label text-foreground-inverse/70 mb-8 sm:mb-14 md:mb-20">
          News
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 md:gap-14 lg:gap-[3.75rem]">
          <NewsCard {...featured} publication={featured.featuredIn} featured />
            <div className="grid grid-cols-1 sm:grid-rows-2 gap-8 sm:gap-10 md:gap-14 lg:gap-[3.75rem]">
            {rest.slice(0, 2).map((item) => (
              <NewsCard key={item.href} {...item} publication={item.featuredIn} />
            ))}
          </div>
        </div>
        <div className="mt-10 sm:mt-16 md:mt-24 flex justify-center">
          <Button href="/news" variant="outline-inverse">
            View all news
          </Button>
        </div>
      </Container>
    </section>
  );
}
