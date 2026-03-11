import { memo } from "react";
import Image from "next/image";
import Link from "next/link";

export interface NewsCardProps {
  title: string;
  publication: string;
  date: string;
  image?: string;
  href: string;
  featured?: boolean;
}

function NewsCard({
  title,
  publication,
  date,
  image,
  href,
  featured,
}: NewsCardProps) {
  return (
    <article>
      <Link href={href} className="group block transition-opacity duration-300 hover:opacity-95">
      <div
        className={`overflow-hidden mb-5 relative ${
          featured ? "aspect-[345/439] sm:aspect-[877/1026]" : "aspect-[345/150] sm:aspect-[840/390]"
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-[var(--image-zoom)] transition-transform duration-500"
            sizes={featured ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 100vw, 25vw"}
          />
        ) : (
          <div className="w-full h-full bg-foreground-inverse/10" />
        )}
      </div>
      <div className="flex gap-4 mb-5">
        <span className="text-label text-foreground-inverse/70">{date}</span>
        <span className="text-label border border-foreground-inverse/30 rounded px-2 py-0.5">
          In The News
        </span>
      </div>
      <h3 className="font-display text-xl sm:text-2xl font-semibold uppercase tracking-tight text-foreground-inverse line-clamp-2 group-hover:opacity-80 transition-opacity">
        {title}
      </h3>
      <p className="text-label text-foreground-inverse/70 mt-4">Featured In</p>
      <p className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-foreground-inverse">
        {publication}
      </p>
    </Link>
    </article>
  );
}

export default memo(NewsCard);
