import Link from "next/link";
import { Container } from "@/components/ui";
import { getSocialLinks, getFooterLinks } from "@/lib/data";

export default function Footer() {
  const socialLinks = getSocialLinks();
  const footerLinks = getFooterLinks();
  return (
    <footer className="relative bg-bg overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 z-0 opacity-50" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://www.hellobecca.com/wp-content/uploads/Becca-Footer-Video-V2_1.webm"
            type="video/webm"
          />
        </video>
        <div className="absolute inset-0 bg-bg/50" />
      </div>
      <Container className="relative z-10 pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-20 md:pb-24">
        <p className="text-label text-foreground mb-6 sm:mb-8 text-center sm:text-left">
          We&apos;re everywhere you are
        </p>
        <nav
          className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0 mb-10 sm:mb-60"
          aria-label="Social links"
        >
          {socialLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${label}`}
              className="font-display text-xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground hover:text-accent transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </nav>
        <nav
          className="flex flex-col sm:flex-row sm:gap-10 gap-4 sm:justify-center mb-6"
          aria-label="Footer links"
        >
          {footerLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-label text-foreground hover:text-accent transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-foreground-muted text-center">
          © 2026, Becca. All rights reserved.
        </p>
        <div className="mt-16 flex justify-center">
          <Link
            href="/"
            className="font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-accent"
          >
            Becca
          </Link>
        </div>
      </Container>
    </footer>
  );
}
