"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MainLayout } from "@/layouts";
import { Button, Container } from "@/components/ui";
import { WorkFilters, WorkProjectCard, getProjectLayout } from "@/components/sections";
import { getWorkContent } from "@/lib/data";

function WorkPageContent() {
  const searchParams = useSearchParams();
  const content = getWorkContent();
  const [service, setService] = useState("");
  const [industry, setIndustry] = useState("");

  useEffect(() => {
    const s = searchParams.get("_service");
    const i = searchParams.get("_industry");
    if (s) setService(s);
    if (i) setIndustry(i);
  }, [searchParams]);

  const filteredProjects = useMemo(() => {
    return content.projects.filter((p) => {
      const matchService = !service || p.service === service;
      const matchIndustry = !industry || p.industry === industry;
      return matchService && matchIndustry;
    });
  }, [content.projects, service, industry]);

  return (
    <MainLayout>
      {/* Hero */}
      <section
        className="relative bg-surface pt-10 sm:pt-14 md:pt-16 overflow-clip"
        aria-labelledby="work-hero-heading"
      >
        <Container className="py-0">
          <h1
            id="work-hero-heading"
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-foreground-inverse text-center py-8 sm:pt-16 md:pt-[6.84rem] sm:pb-16 md:pb-[10rem]"
          >
            {content.hero.title}
          </h1>
        </Container>

        <WorkFilters
          service={service}
          industry={industry}
          onServiceChange={setService}
          onIndustryChange={setIndustry}
          services={content.filterServices}
          industries={content.filterIndustries}
        />
      </section>

      {/* Project grid — masonry layout matching hellobecca.com */}
      <section
        className="relative bg-surface pb-12 sm:pb-16 md:pb-[10rem] overflow-x-hidden"
        aria-labelledby="work-grid-heading"
      >
        <Container className="px-0 sm:px-[var(--container-padding-x)]">
          <h2 id="work-grid-heading" className="sr-only">
            Portfolio projects
          </h2>
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between gap-y-6 sm:gap-y-16 md:gap-y-[10.62rem] sm:gap-x-0">
            {filteredProjects.map((project, index) => (
              <WorkProjectCard
                key={`${project.title}-${project.href}`}
                project={project}
                index={index}
                layout={getProjectLayout(index)}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section
        className="relative bg-cta-bg py-16 sm:py-24 md:py-32 overflow-clip"
        aria-labelledby="work-cta-heading"
      >
        <Container>
          <div className="flex flex-col items-center text-center">
            <h2
              id="work-cta-heading"
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-accent max-w-[23rem] sm:max-w-[83rem]"
            >
              {content.cta.heading}
            </h2>
            <div className="mt-10 sm:mt-20">
              <Button
                href={content.cta.buttonHref}
                variant="primary"
                className="w-[185px]"
              >
                {content.cta.buttonLabel}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}

export default function WorkPage() {
  return (
    <Suspense fallback={
      <MainLayout>
        <section className="relative bg-surface min-h-[50vh] flex items-center justify-center">
          <Container>
            <div className="animate-pulse font-display text-foreground-inverse text-center">Loading…</div>
          </Container>
        </section>
      </MainLayout>
    }>
      <WorkPageContent />
    </Suspense>
  );
}
