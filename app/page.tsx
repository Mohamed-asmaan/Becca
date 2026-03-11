import dynamic from "next/dynamic";
import { MainLayout } from "@/layouts";
import { Hero } from "@/components/sections";
import { getHomeContent } from "@/lib/data";

const About = dynamic(() => import("@/components/sections/About").then((m) => m.default));
const Services = dynamic(() => import("@/components/sections/Services").then((m) => m.default));
const FeaturedProject = dynamic(() => import("@/components/sections/FeaturedProject").then((m) => m.default));
const FeaturedWork = dynamic(() => import("@/components/sections/FeaturedWork").then((m) => m.default));
const Clients = dynamic(() => import("@/components/sections/Clients").then((m) => m.default));
const News = dynamic(() => import("@/components/sections/News").then((m) => m.default));
const CTA = dynamic(() => import("@/components/sections/CTA").then((m) => m.default));
const Newsletter = dynamic(() => import("@/components/sections/Newsletter").then((m) => m.default));

export default function Home() {
  const content = getHomeContent();
  return (
    <MainLayout>
      <Hero headline1={content.hero.headline1} headline2={content.hero.headline2} tagline={content.hero.tagline} />
      <About />
      <Services items={content.services} />
      <FeaturedProject />
      <FeaturedWork projects={content.featuredWork} />
      <Clients items={content.clients} />
      <News items={content.news} />
      <CTA heading={content.cta.heading} buttonLabel={content.cta.buttonLabel} buttonHref={content.cta.buttonHref} />
      <Newsletter heading={content.newsletter.heading} subline={content.newsletter.subline} placeholder={content.newsletter.placeholder} />
    </MainLayout>
  );
}
