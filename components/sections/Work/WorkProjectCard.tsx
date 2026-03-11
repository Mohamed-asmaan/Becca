"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { WorkProject } from "@/lib/data";

interface WorkProjectCardProps {
  project: WorkProject;
  index: number;
  /** Layout from getProjectLayout */
  layout: {
    wrapper: string;
    aspect: string;
    sizes: string;
  };
}

/** hellobecca.com Work page masonry — 7-item cycle */
export function getProjectLayout(index: number) {
  const cycleIndex = index % 7;
  const is75Right = cycleIndex === 3;
  const is75Left = cycleIndex === 6;
  const translateX = is75Right ? "sm:translate-x-[4.5%]" : is75Left ? "sm:-translate-x-[4.5%]" : "";
  const layouts = [
    {
      wrapper: "w-full sm:w-[calc(100%+2*var(--container-padding-x))] sm:-ml-[var(--container-padding-x)]",
      aspect: "aspect-[375/280] sm:aspect-[1920/1080]",
      sizes: "(max-width: 640px) 100vw, 1920px",
    },
    {
      wrapper: "w-full sm:w-[40.93%]",
      aspect: "aspect-[375/280] sm:aspect-[727/829]",
      sizes: "(max-width: 640px) 100vw, 727px",
    },
    {
      wrapper: "w-full sm:w-[49.38%]",
      aspect: "aspect-[375/280] sm:aspect-[877/583]",
      sizes: "(max-width: 640px) 100vw, 877px",
    },
    {
      wrapper: `w-full sm:w-[74.77%] sm:mx-auto ${translateX}`,
      aspect: "aspect-[375/280] sm:aspect-[1328/898]",
      sizes: "(max-width: 640px) 100vw, 1328px",
    },
    {
      wrapper: "w-full sm:w-[49.38%]",
      aspect: "aspect-[375/280] sm:aspect-[877/800]",
      sizes: "(max-width: 640px) 100vw, 877px",
    },
    {
      wrapper: "w-full sm:w-[40.93%] sm:mt-[10rem]",
      aspect: "aspect-[375/280] sm:aspect-[727/800]",
      sizes: "(max-width: 640px) 100vw, 727px",
    },
    {
      wrapper: `w-full sm:w-[74.77%] sm:mx-auto ${translateX}`,
      aspect: "aspect-[375/280] sm:aspect-[1328/898]",
      sizes: "(max-width: 640px) 100vw, 1328px",
    },
  ];
  return layouts[cycleIndex];
}

function WorkProjectCard({ project, index, layout }: WorkProjectCardProps) {
  return (
    <Link
      href={project.href}
      className={`group block overflow-hidden transition-opacity duration-300 hover:opacity-95 ${layout.wrapper}`}
      prefetch={index < 4}
    >
      <div className={`relative flex items-center justify-center overflow-hidden ${layout.aspect}`}>
        <Image
          src={project.image}
          alt=""
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[var(--image-zoom)]"
          sizes={layout.sizes}
          priority={index < 2}
          loading={index < 2 ? "eager" : "lazy"}
          quality={70}
        />
        <div className="absolute inset-0 bg-bg/20" aria-hidden />
        <h3 className="absolute text-center text-white font-display text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight px-6 sm:px-10 max-w-[20rem] sm:max-w-[70rem] line-clamp-4">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}

export default memo(WorkProjectCard);
