"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getFooterLinks } from "@/lib/data";

const NAV_LINKS = getFooterLinks().filter((l) => l.href !== "/connect");

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isNews = pathname === "/news" || pathname.startsWith("/news/");
  const isAbout = pathname === "/about";
  const isServices = pathname === "/services";
  const isParrish = pathname === "/parrish-co" || pathname.startsWith("/parrish-co/");
  const isWork = pathname === "/work";
  const isConnect = pathname === "/connect";
  const isStore = pathname === "/services/store" || pathname.startsWith("/services/store/");
  const isTeam = pathname.startsWith("/about/team");
  // Light text on dark header: About, Services, Parrish, Work, Connect, Store, Team
  // Dark text on light header: News only (explicit bg-surface)
  const lightNavOnDark = isAbout || isServices || isParrish || isWork || isConnect || isStore || isTeam;

  return (
    <div className={`site-header ${isNews ? "bg-surface" : "bg-bg"}`}>
      <header
        data-hero-header
        className={`flex items-center justify-between w-full max-w-[var(--content-max-width)] mx-auto px-[var(--container-padding-x)] ${
          isHome
            ? "fixed top-0 left-0 right-0 z-[1060] py-4 sm:py-12 [&_a]:text-accent [&_span]:bg-foreground"
            : `relative py-2 sm:py-4 ${lightNavOnDark ? "[&_a]:text-foreground [&_span]:bg-foreground" : "[&_a]:text-foreground-inverse [&_span]:bg-foreground-inverse"}`
        }`}
        role="banner"
      >
        <Link
          href="/"
          className={`font-display font-bold uppercase tracking-tight transition-opacity duration-200 hover:opacity-80 ${
            isHome ? "text-3xl sm:text-4xl md:text-5xl lg:text-[5rem]" : "text-lg sm:text-xl md:text-2xl"
          }`}
        >
          Becca
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`flex flex-col gap-1.5 w-6 h-5 sm:gap-2 sm:w-8 sm:h-6 cursor-pointer touch-manipulation hover:opacity-70 transition-opacity duration-200 ${isHome ? "md:gap-3 md:w-12 md:h-6 lg:gap-4 lg:w-[4.75rem]" : ""}`}
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <span className="block h-0.5 w-full bg-foreground rounded-full transition-transform duration-300" />
          <span className="block h-0.5 w-full bg-foreground rounded-full transition-transform duration-300" />
        </button>
      </header>

      {/* Nav Modal — slide-in overlay from right */}
      <div
        className={`fixed inset-0 z-[1070] transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ transitionDuration: isOpen ? "var(--nav-modal-enter)" : "var(--nav-modal-leave)" }}
        aria-hidden={!isOpen}
      >
        <div
          className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          className={`absolute top-0 right-0 h-full w-full sm:min-w-[22rem] md:min-w-[40rem] lg:min-w-[69rem] md:w-auto bg-bg text-foreground transform transition-transform ease-out overflow-y-auto ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ transitionDuration: isOpen ? "var(--nav-modal-enter)" : "var(--nav-modal-leave)" }}
        >
          <div className="flex flex-col min-h-[100dvh] pt-[4.5rem] md:pt-[5rem] pb-12 md:pb-24 px-6 md:px-14">
            <div className="flex-1" />
            <nav className="flex flex-col gap-4 sm:gap-2 md:gap-2" aria-label="Primary">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-foreground hover:text-accent block py-2 md:py-4 transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-12 md:pt-16">
                <Link
                  href="/connect"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium uppercase tracking-nav border border-foreground text-foreground hover:border-accent hover:text-accent transition-colors duration-300"
                >
                  Let&apos;s Talk
                </Link>
              </div>
            </nav>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 md:top-12 md:right-14 z-[1080] w-10 h-10 flex items-center justify-center text-foreground hover:text-accent transition-colors"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
