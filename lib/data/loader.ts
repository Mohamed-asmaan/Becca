/**
 * Unified data loader — single source for all application content.
 * Data flows: content/content.csv → (seed) → content/*.json → this loader → components
 *
 * Edit content/content.csv to add/change items. Run npm run content:seed before build.
 */

import siteData from "@/content/site.json";
import newsData from "@/content/news.json";
import workData from "@/content/work.json";
import servicesData from "@/content/services.json";

// Types
export interface NavLink {
  label: string;
  href: string;
}

export interface NewsArticle {
  title: string;
  date: string;
  category?: string;
  featuredIn: string;
  image: string;
  href: string;
  featured?: boolean;
  industry?: string;
}

export interface WorkProject {
  title: string;
  image: string;
  href: string;
  service?: string;
  industry?: string;
}

export interface FeaturedWorkItem {
  title: string;
  client: string;
  image: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  image: string;
  href?: string;
}

export interface TeamMember {
  name: string;
  title: string;
  image: string;
  href: string;
}

export interface AboutImage {
  src: string;
  alt: string;
  grayscale: boolean;
}

// Site (nav, footer, social, featured work, clients, team, about images, config)
const site = siteData as {
  navLinks: NavLink[];
  footerLinks: NavLink[];
  socialLinks: NavLink[];
  featuredWork: FeaturedWorkItem[];
  services: ServiceItem[];
  clients: string[];
  teamMembers: TeamMember[];
  aboutImages: AboutImage[];
  config: Record<string, string>;
  parrishWork: { title: string; image: string; href: string }[];
};

export function getNavLinks(): NavLink[] {
  return site.navLinks;
}

export function getFooterLinks(): NavLink[] {
  return site.footerLinks;
}

export function getSocialLinks(): NavLink[] {
  return site.socialLinks;
}

export function getFeaturedWork(): FeaturedWorkItem[] {
  return site.featuredWork;
}

export function getHomeServices(): ServiceItem[] {
  return site.services;
}

export function getClients(): string[] {
  return site.clients;
}

export function getTeamMembers(): TeamMember[] {
  return site.teamMembers;
}

export function getAboutImages(): AboutImage[] {
  return site.aboutImages;
}

export function getConfig(key: string): string {
  return site.config?.[key] ?? "";
}

export function getParrishWork(): { title: string; image: string; href: string }[] {
  return site.parrishWork;
}

// News
const news = newsData as {
  hero: { title: string };
  articles: NewsArticle[];
  filterCategories: { value: string; label: string }[];
  filterIndustries: { value: string; label: string }[];
  newsletter: { heading: string; subheading: string; placeholder: string };
};

export function getNewsContent() {
  const featured = news.articles.filter((a) => a.featured);
  return {
    ...news,
    featured: featured.length > 0 ? featured : news.articles.slice(0, 6),
    listing: news.articles,
  };
}

export function categoryToFilterValue(cat: string): string {
  const m: Record<string, string> = {
    "In The News": "in-the-news",
    Insights: "insights",
    "Press releases": "press-releases",
  };
  return m[cat] ?? cat.toLowerCase().replace(/\s+/g, "-");
}

export function filterNewsArticles(
  articles: NewsArticle[],
  category: string,
  industry: string
): NewsArticle[] {
  return articles.filter((a) => {
    const matchCat = !category || categoryToFilterValue(a.category ?? "") === category;
    const matchInd = !industry || a.industry === industry;
    return matchCat && matchInd;
  });
}

// Work
const work = workData as {
  hero: { title: string };
  projects: WorkProject[];
  filterServices: { value: string; label: string }[];
  filterIndustries: { value: string; label: string }[];
  cta: { heading: string; buttonLabel: string; buttonHref: string };
};

export function getWorkContent() {
  return work;
}

// Services
const services = servicesData as {
  hero: { title: string };
  whatWeDo: Array<{ title: string; image: string; description: string; bullets?: string[]; href: string }>;
  parrish: { title: string; image: string; description: string; href: string };
  work: { heading: string; intro: string; images: string[]; ctaHref: string; ctaLabel: string };
  marketing: { heading: string; intro: string; thumbnail: string; videoDesktop: string; videoMobile: string };
  store: { heading: string; intro: string; ctaLabel: string; ctaHref: string; products: Array<{ title: string; image: string; href: string; external: boolean }> };
};

export function getServicesContent() {
  return services;
}

// Home content — aggregates from site + news + config
export function getHomeContent() {
  const c = site.config || {};
  const newsItems = news.articles.slice(0, 5).map((a) => ({
    title: a.title,
    date: a.date,
    category: "In The News",
    featuredIn: a.featuredIn,
    image: a.image,
    href: a.href,
    featured: a.featured ?? false,
  }));
  return {
    news: newsItems,
    services: site.services,
    featuredWork: site.featuredWork.map((w) => ({ title: w.title, image: w.image, href: w.href })),
    clients: site.clients,
    hero: {
      headline1: c.hero_headline_1 || "Hospitality",
      headline2: c.hero_headline_2 || "Reimagined",
      tagline: c.hero_tagline || "We set the table for cultural connection and build legacies that last.",
    },
    cta: {
      heading: c.cta_heading || "How can we serve you?",
      buttonLabel: c.cta_button || "Let's talk",
      buttonHref: c.cta_href || "/connect",
    },
    newsletter: {
      heading: c.newsletter_heading || "Get our newsletter",
      subline: c.newsletter_subline || "Subscribe to Short Order.",
      placeholder: c.newsletter_placeholder || "Enter your email",
    },
  };
}

// About — config overrides where available; fallback for structure not yet in CSV
const ABOUT_FALLBACK = {
  hero: { title: "Our Story", image: "https://www.hellobecca.com/wp-content/uploads/About-1-scaled.jpg", imageAlt: "Becca team and partners at a social gathering" },
  howItStarted: { title: "How it started", text: "Becca was founded in 2004 as a one-woman shop by \"chef whisperer\" Becca Parrish. Over the past two decades, the agency has grown into a trusted partner for culinary, fashion and entertainment brands, delivering strategy and the art of hospitality to enrich culture and build business.", imageLeft: "https://www.hellobecca.com/wp-content/uploads/Home_SectionC_Image3.jpg", imageRight: "https://www.hellobecca.com/wp-content/uploads/Home_SectionC_Image8.jpg" },
  newPartners: { title: "New partners,\nnew horizons", text: "In 2024, Becca partnered with Prosek, an industry-leading, women-owned financial marketing agency. By joining forces, the two game-changing firms are defining what's next for a broader range of clients, connecting culture and capital.", image: "https://www.hellobecca.com/wp-content/uploads/About_SectionC_1-scaled.jpg", imageAlt: "Becca leadership team" },
  discoverItems: [
    { title: "Discover", description: "We are foundational partners, advising our clients on all aspects of their business, from competitive analysis to cultural resonance." },
    { title: "Connect", description: "We introduce your leadership team to the people they need to know and the circles to travel in. Our relationships reflect our understanding of the evolving channels of influence, coast to coast and across the Atlantic." },
    { title: "Build", description: "We'll help you identify, engage, and grow your audience. Our content team works with you to create the assets you need across all platforms." },
    { title: "Ignite", description: "Few things are as powerful as getting the right people together in the right room. We curate experiences that bring your brand to life, tapping our network to create meaningful connections for years to come." },
    { title: "Amplify", description: "A great brand is a growing brand. We seek out what's next, identifying the opportunities to extend your footprint and capitalize on your success." },
  ],
  teamIntro: { eyebrow: "our leadership", text: "We're the friend who always knows what's going on. Approachable yet savvy, we're trend arbiters with a passion for the good stuff. If it's happening now, we were there last week." },
};

export function getAboutContent() {
  const c = site.config || {};
  return {
    hero: { title: c.about_hero_title || ABOUT_FALLBACK.hero.title, image: c.about_hero_image || ABOUT_FALLBACK.hero.image, imageAlt: ABOUT_FALLBACK.hero.imageAlt },
    howItStarted: ABOUT_FALLBACK.howItStarted,
    newPartners: ABOUT_FALLBACK.newPartners,
    discoverItems: ABOUT_FALLBACK.discoverItems,
    teamIntro: ABOUT_FALLBACK.teamIntro,
    teamMembers: site.teamMembers,
    aboutImages: site.aboutImages.length ? site.aboutImages : [{ src: "https://www.hellobecca.com/wp-content/uploads/97A9545.jpg", alt: "Becca team", grayscale: false }],
  };
}

// Parrish Co — config overrides where available
const PARRISH_FALLBACK = {
  hero: { eyebrow: "presenting", title: "parrish", titleSup: "co", tagline: "We connect culture to capital.", description: "Parrish Co is a strategic 360-advisory, introducing the power of hospitality to the 21st century's most influential businesses. We link institutions and organizations to their future, delivering world class hospitality where you'd least expect it." },
  heroImages: ["https://www.hellobecca.com/wp-content/uploads/Mustique_Emilio-Madrid_6316_1_edited_2.jpg", "https://www.hellobecca.com/wp-content/uploads/image-1.png", "https://www.hellobecca.com/wp-content/uploads/EmpireStores-courtyard2-ImagenSubliminal.jpg"],
  foundational: { eyebrow: "What We Do", heading: "Foundational Growth", description: "At Parrish Co, we partner with institutions, brands and developers on the ground floor, collaborating on every detail from concept to launch. We offer our clients critical guidance gleaned from 20 years of cultivating relationships with the best in the business. Our partnership with Prosek, one of the world's leading financial agencies, allows us to build a bridge between hospitality and finance, unlocking a world of possibilities.", servicesEyebrow: "services", services: ["Concept development + realization", "Partner recruitment", "Capital investment", "Brand vision + positioning", "Creative direction", "Content development", "Creative collaborations", "Event programming", "Executive visibility", "Business development"] },
  cta: { heading: "Let's Create\nSomething Great", buttonLabel: "Let's Talk", buttonHref: "mailto:hello@parrish.co" },
};

export function getParrishContent() {
  return {
    hero: PARRISH_FALLBACK.hero,
    heroImages: PARRISH_FALLBACK.heroImages,
    foundational: PARRISH_FALLBACK.foundational,
    work: {
      eyebrow: "our work",
      viewAllHref: "/work?_service=parrish-co",
      viewAllLabel: "view all work",
      projects: site.parrishWork.length
        ? site.parrishWork
        : [
            { title: "Fontainebleau Las Vegas", image: "https://www.hellobecca.com/wp-content/uploads/Home_SectionF_11-scaled.jpg", href: "/work/fontainebleau-las-vegas" },
            { title: "Mustique", image: "https://www.hellobecca.com/wp-content/uploads/Home_SectionF_10.jpg", href: "/work/mustique" },
            { title: "Ralph Lauren Hospitality", image: "https://www.hellobecca.com/wp-content/uploads/TPBThe-Polo-Bar-Dining-Room-2_1.jpg", href: "/work/ralph-lauren-hospitality" },
            { title: "Tishman Speyer, Rockefeller Center", image: "https://www.hellobecca.com/wp-content/uploads/Home_SectionF_9.jpg", href: "/work/tishman-speyer-rockefeller-center" },
          ],
    },
    cta: PARRISH_FALLBACK.cta,
  };
}

