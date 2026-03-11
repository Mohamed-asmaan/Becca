import Image from "next/image";
import { Button, Container } from "@/components/ui";

export default function FeaturedProject() {
  return (
    <section
      className="relative bg-bg overflow-hidden py-16 sm:py-24 md:py-32 lg:py-36"
      aria-labelledby="featured-project-heading"
    >
      <Container>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[91rem] aspect-[21/13] sm:aspect-[91/51] overflow-hidden relative rounded-sm">
            <Image
              src="https://www.hellobecca.com/wp-content/uploads/GS1101713-3-scaled-e1729712933167.jpg"
              alt="Parrish Co"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 91rem"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center sm:justify-start sm:pl-8 md:pl-12">
              <h2 id="featured-project-heading" className="font-display uppercase text-3xl sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] 2xl:text-[14rem] font-bold">
                <span className="text-pink tracking-[0.012em]">parrish</span>
                <span className="text-foreground text-[0.59em] tracking-[0.025em] pl-1 -translate-y-2 inline-block">
                  co
                </span>
              </h2>
            </div>
          </div>
          <p className="text-foreground text-center mt-8 sm:mt-12 md:mt-16 max-w-[95ch] text-base sm:text-body-lg px-4 sm:px-0">
            A strategic advisory connecting the 21st century&apos;s most influential
            businesses to the power of hospitality.
          </p>
          <div className="mt-10 sm:mt-12">
            <Button href="/parrish-co">Reach your potential</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
