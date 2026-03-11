"use client";

import { Container, FilterSelect } from "@/components/ui";
import type { FilterOption } from "@/components/ui";

interface WorkFiltersProps {
  service: string;
  industry: string;
  onServiceChange: (value: string) => void;
  onIndustryChange: (value: string) => void;
  services: readonly FilterOption[];
  industries: readonly FilterOption[];
}

export default function WorkFilters({
  service,
  industry,
  onServiceChange,
  onIndustryChange,
  services,
  industries,
}: WorkFiltersProps) {
  return (
    <Container className="pb-12 sm:pb-16 md:pb-[10rem]">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-[1.88rem] min-h-[2.2rem] sm:min-h-[2.55rem]">
        <FilterSelect
          value={service}
          onChange={onServiceChange}
          options={services}
          ariaLabel="Filter by service"
          variant="light"
          className="flex-1 sm:flex-initial"
        />
        <FilterSelect
          value={industry}
          onChange={onIndustryChange}
          options={industries}
          ariaLabel="Filter by industry"
          variant="light"
          className="flex-1 sm:flex-initial"
        />
      </div>
    </Container>
  );
}
