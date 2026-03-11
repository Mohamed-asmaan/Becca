import { memo } from "react";
import Image from "next/image";
import Link from "next/link";

export interface ServiceCardProps {
  title: string;
  image?: string;
  href?: string;
  showLine?: boolean;
}

function ServiceCard({ title, image, href, showLine = true }: ServiceCardProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-12 lg:gap-16 pb-8 sm:pb-16 md:pb-20">
        <div className="w-full sm:w-[48%] aspect-[345/215] sm:aspect-[1099/688] overflow-hidden shrink-0 relative">
          {image ? (
            <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 48vw" />
          ) : (
            <div className="w-full h-full bg-foreground-inverse/10" />
          )}
        </div>
        <div className="flex-1 flex items-center sm:pt-8">
          <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-foreground-inverse flex items-center gap-2">
            {title}
            {href && (
              <Link href={href} className="text-2xl opacity-60 hover:opacity-100 transition-opacity">
                →
              </Link>
            )}
          </h3>
        </div>
      </div>
      {showLine && <div className="w-full h-px bg-foreground-inverse/20 mb-8 sm:mb-20" />}
    </>
  );
}

export default memo(ServiceCard);
