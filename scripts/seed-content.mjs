#!/usr/bin/env node
/**
 * Reads content/content.csv and generates content/*.json.
 * CSV is the single source of truth. Add a row to add an item.
 *
 * Types: news, work, product, featured_work, service, client, nav_link, social_link,
 * team_member, about_image, config, parrish_work
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { parse } from "csv-parse/sync";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const contentDir = join(root, "content");

if (!existsSync(contentDir)) mkdirSync(contentDir, { recursive: true });

const csvPath = join(contentDir, "content.csv");

if (!existsSync(csvPath)) {
  console.log("content/content.csv not found — skipping seed (using existing JSON)");
  process.exit(0);
}

const raw = readFileSync(csvPath, "utf-8");
const rows = parse(raw, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  relax_column_count: true,
});

const byType = (t) => rows.filter((r) => r.type === t);
const news = byType("news");
const work = byType("work");
const products = byType("product");
const featuredWork = byType("featured_work");
const services = byType("service");
const clients = byType("client");
const navLinks = byType("nav_link");
const socialLinks = byType("social_link");
const teamMembers = byType("team_member");
const aboutImages = byType("about_image");
const configRows = byType("config");
const parrishWork = byType("parrish_work");

function bool(v) {
  if (!v) return false;
  const s = String(v).toLowerCase();
  return s === "true" || s === "1" || s === "yes";
}

const config = Object.fromEntries(
  configRows
    .filter((r) => (r.key || r.title) && r.value)
    .map((r) => [r.key || r.title, r.value])
);

// Nav/footer: nav_link has label in title, href in href or label (columns may shift)
const getHref = (r) => r.href || r.label || r.name || r.client;
const navLinksOut = navLinks
  .filter((r) => getHref(r) && r.title)
  .map((r) => ({ label: r.title, href: getHref(r) }));

const socialLinksOut = socialLinks
  .filter((r) => getHref(r) && r.title)
  .map((r) => ({ label: r.title, href: getHref(r) }));

const defaultNav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "News", href: "/news" },
  { label: "Parrish Co", href: "/parrish-co" },
  { label: "Let's Talk", href: "/connect" },
];

const siteContent = {
  navLinks: navLinksOut.length ? navLinksOut : defaultNav,
  footerLinks: navLinksOut.length ? navLinksOut : defaultNav,
  socialLinks: socialLinksOut.length ? socialLinksOut : [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/beccapr" },
    { label: "Instagram", href: "https://www.instagram.com/xbecca/" },
    { label: "TikTok", href: "https://www.tiktok.com/@teamxbecca" },
  ],
  featuredWork: featuredWork
    .filter((r) => (r.image || r.featured) && (r.href || r.industry))
    .map((r) => ({ title: r.title, client: r.client || r.title, image: r.image || r.featured, href: r.href || r.industry })),
  services: services
    .filter((r) => r.title && (r.image || r.href?.startsWith("http")))
    .map((r) => ({ title: r.title, image: r.image || (r.href?.startsWith("http") ? r.href : ""), href: r.href?.startsWith("/") ? r.href : "/services" })),
  clients: clients.filter((r) => r.title).map((r) => r.title.trim()),
  teamMembers: teamMembers
    .filter((r) => r.title)
    .map((r) => ({
      name: r.title,
      title: r.role || "",
      image: (r.image?.startsWith("http") ? r.image : r.href?.startsWith("http") ? r.href : r.image) || "",
      href: (r.href?.startsWith("/") ? r.href : r.image?.startsWith("/") ? r.image : r.href) || "",
    })),
  aboutImages: aboutImages
    .filter((r) => r.image || r.href?.startsWith("http"))
    .map((r) => ({
      src: r.image || (r.href?.startsWith("http") ? r.href : ""),
      alt: r.title || "",
      grayscale: bool(r.grayscale),
    })),
  config,
  parrishWork: parrishWork
    .filter((r) => (r.image || r.href?.startsWith("http")) && (r.href?.startsWith("/") || r.featured))
    .map((r) => ({ title: r.title, image: r.image || (r.href?.startsWith("http") ? r.href : ""), href: r.href?.startsWith("/") ? r.href : r.featured || r.href })),
};

const newsContent = {
  hero: { title: "News" },
  articles: news.map((r) => ({
    title: r.title,
    date: r.date,
    category: r.category,
    featuredIn: r.featuredIn,
    image: r.image,
    href: r.href,
    featured: bool(r.featured),
    industry: r.industry || "restaurant",
  })),
  filterCategories: [
    { value: "", label: "category" },
    { value: "press-releases", label: "Press releases" },
    { value: "in-the-news", label: "In The News" },
    { value: "insights", label: "Insights" },
  ],
  filterIndustries: [
    { value: "", label: "industry" },
    { value: "design", label: "Design" },
    { value: "hotels-resorts", label: "Hotels + Resorts" },
    { value: "products", label: "Products" },
    { value: "restaurant", label: "Restaurant" },
    { value: "travel", label: "Travel" },
  ],
  newsletter: {
    heading: config.newsletter_heading || "Stay Ahead of the Curve",
    subheading: "Subscribe to our newsletter to get the scoop.",
    placeholder: config.newsletter_placeholder || "Enter your email",
  },
};

const workContent = {
  hero: { title: "We Work Wonders" },
  projects: work.map((r) => {
    // Work rows have fewer CSV columns; image URL can land in href, page link in featured.
    let image = r.image;
    let href = r.href;
    const looksLikeImage = (url) =>
      url?.includes("picsum.photos") || url?.match(/\.(jpg|jpeg|png|gif|webp|avif)$/i);
    const looksLikePage = (url) => url?.startsWith("/") || url?.startsWith("http");
    if (!image && looksLikeImage(href) && looksLikePage(r.featured)) {
      image = href;
      href = r.featured;
    }
    return {
      title: r.title,
      image,
      href: href?.startsWith("/") ? href : r.featured?.startsWith("/") ? r.featured : href,
      service: r.service || r.client || "communications",
      industry: r.industry || r.label || "restaurant",
    };
  }),
  filterServices: [
    { value: "", label: "service" },
    { value: "communications", label: "Communications" },
    { value: "content", label: "Content" },
    { value: "experiences", label: "Experiences" },
    { value: "parrish-co", label: "Parrish Co" },
  ],
  filterIndustries: [
    { value: "", label: "industry" },
    { value: "conferences", label: "Conferences" },
    { value: "design", label: "Design" },
    { value: "entertainment", label: "Entertainment" },
    { value: "fashion", label: "Fashion" },
    { value: "hotels-resorts", label: "Hotels + Resorts" },
    { value: "products", label: "Products" },
    { value: "real-estate", label: "Real Estate" },
    { value: "restaurant", label: "Restaurant" },
    { value: "travel", label: "Travel" },
  ],
  cta: {
    heading: config.cta_heading || "Ready to begin?",
    buttonLabel: config.cta_button || "Let's talk",
    buttonHref: config.cta_href || "/connect",
  },
};

const servicesContent = {
  hero: { title: "Setting the Standard" },
  whatWeDo: [
    { title: "Communications", image: "https://www.hellobecca.com/wp-content/uploads/Home_SectionD_1-1.jpg", description: "Our relationships with trusted media and tastemakers reflect our understanding of the ever-evolving channels of influence.", bullets: ["Brand messaging + storytelling", "Network development", "Media + tastemaker engagement", "Reputation management", "Collaborations + partnerships"], href: "/work?_service=communications" },
    { title: "Experiences", image: "https://www.hellobecca.com/wp-content/uploads/Becca-Experiences.jpg", description: "We excel at bringing the right creative and brand partners together to create unforgettable moments and experiences.", bullets: ["Concept development", "Creative direction + design", "Programming + experience flow", "Event production + logistics", "Entertainment"], href: "/work?_service=experiences" },
    { title: "Content", image: "https://www.hellobecca.com/wp-content/uploads/Home_SectionD_3-1.jpg", description: "We help clients translate what they do into captivating online experiences.", bullets: ["Brand positioning + strategy", "Content planning + ideation", "Content creation", "Social media + community management", "Analytics + reporting"], href: "/work?_service=content" },
  ],
  parrish: { title: "parrish co", image: "https://www.hellobecca.com/wp-content/uploads/Becca_Work_Polo-Bar.jpg", description: "A strategic advisory empowering forward-thinking C-suite leaders to build and sustain the 21st century's most influential brands. We are early-stage partners, advising our clients on all aspects of their business, from competitive analysis to critical reception.", href: "/work?_service=parrish-co" },
  work: { heading: "our Work", intro: "Whether your brand is looking to scale, participate in the cultural conversation or plan the event of the season, we're ready for you. See how we helped these brands reach new heights.", images: ["https://www.hellobecca.com/wp-content/uploads/Becca-Services-Work-1.jpg", "https://www.hellobecca.com/wp-content/uploads/Becca-Services-Work-2.jpg", "https://www.hellobecca.com/wp-content/uploads/Becca-Services-Work-3.jpg", "https://www.hellobecca.com/wp-content/uploads/Becca-Services-Work-4.jpg", "https://www.hellobecca.com/wp-content/uploads/Becca-Services-Work-5.jpg", "https://www.hellobecca.com/wp-content/uploads/Becca-Services-Work-6.jpg"], ctaHref: "/work", ctaLabel: "view ALL work" },
  marketing: { heading: "marketing explained", intro: "We all use the term marketing. A lot. But what does it actually mean? How does it work? Press play and find out.", thumbnail: "https://www.hellobecca.com/wp-content/uploads/what-is-marking-thumbnail-scaled.jpg", videoDesktop: "https://www.hellobecca.com/wp-content/uploads/what-is-marketing-desktop.mp4", videoMobile: "https://www.hellobecca.com/wp-content/uploads/What-is-marketing-Mobile.mp4" },
  store: {
    heading: "our Store",
    intro: "We're proud to partner with the best of the best. Check out some of our clients' goods and treat yourself to some inspiring (and often tasty) products.",
    ctaLabel: "get the goods",
    ctaHref: "/services/store",
    products: products.map((r) => ({
      title: r.title,
      image: r.image,
      href: r.href,
      external: bool(r.external),
    })),
  },
};

writeFileSync(join(contentDir, "site.json"), JSON.stringify(siteContent, null, 2));
writeFileSync(join(contentDir, "news.json"), JSON.stringify(newsContent, null, 2));
writeFileSync(join(contentDir, "work.json"), JSON.stringify(workContent, null, 2));
writeFileSync(join(contentDir, "services.json"), JSON.stringify(servicesContent, null, 2));
console.log("✓ content/content.csv → site.json, news.json, work.json, services.json");
console.log(`  News: ${news.length} | Work: ${work.length} | Products: ${products.length} | Site: nav=${navLinksOut.length} clients=${siteContent.clients.length} team=${siteContent.teamMembers.length}`);
console.log("  Edit content/content.csv — add a row to add an item. Run npm run content:seed before build.");
