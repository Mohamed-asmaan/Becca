/**
 * Data layer — single export for all application content.
 * Source: content/content.csv → (seed) → content/*.json
 */

export {
  getNavLinks,
  getFooterLinks,
  getSocialLinks,
  getFeaturedWork,
  getHomeServices,
  getClients,
  getTeamMembers,
  getAboutImages,
  getConfig,
  getParrishWork,
  getNewsContent,
  categoryToFilterValue,
  filterNewsArticles,
  getWorkContent,
  getServicesContent,
  getHomeContent,
  getAboutContent,
  getParrishContent,
} from "./loader";

export type {
  NavLink,
  NewsArticle,
  WorkProject,
  FeaturedWorkItem,
  ServiceItem,
  TeamMember,
  AboutImage,
} from "./loader";
