import Link from "next/link";
import { MainLayout } from "@/layouts";
import { Button, Container } from "@/components/ui";
import { getAboutContent } from "@/lib/data";
import AboutDiscoverSection from "./AboutDiscoverSection";

export default function AboutPage() {
  const about = getAboutContent();
  return (
    <MainLayout>
      {/* Section A: Our Story Hero — normal flow, no overlap with header */}
      <section
        id="about-page-section-a"
        className="group/about-page-section-a bg-surface text-foreground-inverse"
        aria-labelledby="our-story-heading"
      >
        <div className="pt-16 sm:pt-20 md:pt-24">
          <Container className="flex flex-col items-center">
            <h1
              id="our-story-heading"
              className="mt-6 sm:mt-12 md:mt-16 max-w-[18rem] sm:max-w-[78.8125rem] text-center font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight text-foreground-inverse"
            >
              {about.hero.title}
            </h1>
          </Container>
          <div className="mx-auto mt-6 sm:mt-10 md:mt-12 pb-6 sm:pb-10 md:pb-12 px-[var(--container-padding-x)] max-w-[80rem]">
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-sm">
              <img
                src={about.hero.image}
                alt={about.hero.imageAlt}
                className="block w-full h-full object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 1280px"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section B: How it started */}
      <section
        id="about-page-section-b"
        className="group/about-page-section-b bg-surface text-foreground-inverse overflow-hidden"
        aria-labelledby="how-it-started-heading"
      >
        <div className="pb-4 sm:pb-12 md:pb-20 pt-6 sm:pt-12 md:pt-20 px-0 sm:pl-6 md:pl-12">
          <Container variant="wide" className="px-0">
            <div className="flex max-sm:flex-wrap max-sm:justify-between sm:items-end sm:gap-8 md:gap-12 lg:gap-[5.62rem]">
              {/* Col 1: Left image */}
              <div className="col-1 sm:w-[24.0625rem] sm:h-[31.75rem] max-sm:w-[42.3%] max-sm:pb-10 max-sm:order-2 overflow-hidden">
                <div className="relative w-full h-full max-sm:aspect-[10.125/13.75]">
                  <img
                    src={about.howItStarted.imageLeft}
                    alt="Becca founder and team at work"
                    className="w-full h-full object-cover object-center"
                    sizes="(max-width: 385px) 42vw, 385px"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Col 2: Text */}
              <div className="col-2 sm:h-[31.75rem] sm:flex-1 max-sm:order-1 max-sm:w-full max-sm:pt-0 max-sm:pb-20 max-sm:px-[var(--container-padding-x)] overflow-hidden">
                <h2
                  id="how-it-started-heading"
                  className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight"
                >
                  {about.howItStarted.title}
                </h2>
                <p className="max-w-[20.375rem] sm:max-w-[37.5rem] mt-5 text-base sm:text-lg leading-relaxed font-normal">
                  {about.howItStarted.text}
                </p>
              </div>

              {/* Col 3: Right image */}
              <div className="col-3 sm:w-[40.1875rem] sm:h-[42.6875rem] max-sm:w-[52.53%] max-sm:pt-10 max-sm:order-3 overflow-hidden">
                <div className="relative w-full h-full max-sm:aspect-[12.3125/13.75]">
                  <img
                    src={about.howItStarted.imageRight}
                    alt="Becca office and brand environment"
                    className="w-full h-full object-cover object-center"
                    sizes="(max-width: 643px) 52vw, 643px"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Section C: New partners, new horizons */}
      <section
        id="about-page-section-c"
        className="group/about-page-section-c bg-surface text-foreground-inverse overflow-hidden"
        aria-labelledby="new-partners-heading"
      >
        <Container className="py-0">
          {/* Desktop: image left, text right */}
          <div className="hidden sm:flex pt-12 md:pt-20 pb-24 md:pb-40 gap-6 md:gap-10 lg:gap-[3.12rem] items-end">
            <div className="w-full max-w-[70.0625rem] min-w-0 shrink-0 overflow-hidden sm:w-[55%] md:w-[60%] lg:w-[70.0625rem]">
              <div className="relative w-full aspect-[16/9] sm:aspect-[1121/600] lg:h-[37.5rem]">
                <img
                  src={about.newPartners.image}
                  alt={about.newPartners.imageAlt}
                  className="w-full h-full object-cover object-center"
                  sizes="(max-width: 1024px) 60vw, 949px"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2
                id="new-partners-heading"
                className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight max-w-[26.5625rem]"
              >
                {about.newPartners.title.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < 1 && <br />}
                  </span>
                ))}
              </h2>
              <p className="max-w-[35.1875rem] mt-5 text-base sm:text-lg leading-relaxed font-normal">
                {about.newPartners.text}
              </p>
            </div>
          </div>

          {/* Mobile: text first, then image */}
          <div className="sm:hidden pt-6 pb-20 pl-[var(--container-padding-x)] pr-[var(--container-padding-x)]">
            <h2
              id="new-partners-heading-mobile"
              className="font-display text-xl font-bold uppercase tracking-tight max-w-[21.4375rem]"
            >
              {about.newPartners.title.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < 1 && <br />}
                </span>
              ))}
            </h2>
            <p className="max-w-[21.4375rem] mt-5 text-base leading-relaxed font-normal">
              {about.newPartners.text}
            </p>
          </div>
          <div className="sm:hidden pb-20 px-[var(--container-padding-x)]">
            <div className="relative w-full aspect-[157/106] overflow-hidden">
              <img
                src={about.newPartners.image}
                alt={about.newPartners.imageAlt}
                className="w-full h-full object-cover object-center"
                sizes="100vw"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Section E: Discover (our approach) */}
      <AboutDiscoverSection items={about.discoverItems} />

      {/* Section F: Team — our leadership */}
      <section
        id="team"
        className="group/team bg-surface text-foreground-inverse overflow-hidden"
        aria-labelledby="team-heading"
      >
        <Container className="max-sm:pb-20">
          <div className="flex max-sm:flex-col justify-between pb-10 sm:pb-20 gap-5">
            <div>
              <p className="eyebrow-text text-foreground-inverse/80">
                {about.teamIntro.eyebrow}
              </p>
            </div>
            <div className="text max-w-[35.75rem] flex flex-col sm:items-end gap-8">
              <p className="text-base sm:text-lg leading-relaxed">
                {about.teamIntro.text}
              </p>
            </div>
          </div>

          {/* Row 1: 4 members */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 sm:gap-x-[1.37rem] gap-y-[1.875rem] sm:gap-y-20">
            {about.teamMembers.slice(0, 4).map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
          {/* Row 2: 3 members, centered on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 sm:gap-x-[1.37rem] gap-y-[1.875rem] sm:gap-y-20 mt-[1.19rem] sm:mt-20">
            {about.teamMembers.slice(4, 7).map((member, i) => (
              <div
                key={member.name}
                className={i === 0 ? "sm:col-start-2" : undefined}
              >
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section G: CTA — Ready to begin? */}
      <section
        id="about-page-cta"
        className="group/about-page-cta relative bg-cta-bg overflow-hidden py-16 sm:py-24 md:py-32"
        aria-labelledby="about-cta-heading"
      >
        <Container>
          <div className="flex flex-col items-center">
            <h2
              id="about-cta-heading"
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-accent text-center max-w-[23rem] sm:max-w-[83rem]"
            >
              Ready to begin?
            </h2>
            <div className="mt-10 sm:mt-20">
              <Button href="/connect" variant="primary" className="normal-case">
                let&apos;s talk
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}

function TeamCard({
  member,
}: {
  member: { name: string; title: string; image: string; href: string };
}) {
  return (
    <Link
      href={member.href}
      className="group/card block transition-opacity duration-300 hover:opacity-95 [&:hover_*]:duration-500 [&_*]:duration-300"
    >
      <div className="image w-full aspect-[168.68/191.24] sm:aspect-[427/500] overflow-hidden group-hover/card:[&_img]:scale-[1.05]">
        <img
          src={member.image}
          alt={member.name}
          width={427}
          height={500}
          className="w-full h-full object-cover object-center transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, 25vw"
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 className="text-balance mt-2 sm:mt-5 pr-2.5 font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground-inverse group-hover/card:text-accent transition-colors">
        {member.name}
      </h3>
      <p className="eyebrow-text text-balance mt-1 sm:mt-2.5 pr-2.5 text-foreground-inverse/80">
        {member.title}
      </p>
    </Link>
  );
}
