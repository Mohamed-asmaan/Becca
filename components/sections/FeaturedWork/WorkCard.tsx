import { memo } from "react";
import Image from "next/image";
import Link from "next/link";

export interface WorkCardProps {
  title: string;
  client?: string;
  image?: string;
  href?: string;
}

function WorkCard({ title, client, image, href }: WorkCardProps) {
  return (
    <article>
      <Link
        href={href ?? "#"}
        className="group block transition-opacity duration-300 hover:opacity-95"
      >
      <div className="aspect-[20/13] sm:aspect-[47/30] overflow-hidden mb-4 relative">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover group-hover:scale-[var(--image-zoom)] transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-foreground-inverse/20" />
        )}
      </div>
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-xl sm:text-2xl font-semibold uppercase tracking-tight text-accent-dark line-clamp-2 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <span className="shrink-0 text-accent-dark mt-1 group-hover:translate-x-1 transition-transform duration-300">
          <svg width="24" height="24" viewBox="0 0 54 54" fill="none" className="w-6 h-6 sm:w-9 sm:h-9">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.7194 0.5H53.5001V37.0877H50.5001V5.62132L3.06077 53.0607L0.939453 50.9393L48.3788 3.5H14.7194V0.5Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>
    </Link>
    </article>
  );
}

export default memo(WorkCard);
