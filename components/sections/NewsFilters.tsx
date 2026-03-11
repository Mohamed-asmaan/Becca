"use client";

import { FilterSelect } from "@/components/ui";
import type { FilterOption } from "@/components/ui";

interface NewsFiltersProps {
  category: string;
  industry: string;
  onCategoryChange: (value: string) => void;
  onIndustryChange: (value: string) => void;
  categories: readonly FilterOption[];
  industries: readonly FilterOption[];
}

export default function NewsFilters({
  category,
  industry,
  onCategoryChange,
  onIndustryChange,
  categories,
  industries,
}: NewsFiltersProps) {
  return (
    <div className="filter relative z-10 flex max-sm:flex-col gap-4 sm:gap-6 md:gap-[1.88rem] mb-12 sm:mb-16 md:mb-[7.13rem] min-h-[2.2rem] sm:min-h-[2.55rem]">
      <div className="category max-sm:flex-1">
        <FilterSelect
          value={category}
          onChange={onCategoryChange}
          options={categories}
          ariaLabel="Filter by category"
          variant="responsive"
        />
      </div>
      <div className="industry max-sm:flex-1">
        <FilterSelect
          value={industry}
          onChange={onIndustryChange}
          options={industries}
          ariaLabel="Filter by industry"
          variant="responsive"
        />
      </div>
    </div>
  );
}
