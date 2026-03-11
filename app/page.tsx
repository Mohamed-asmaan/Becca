import dynamic from "next/dynamic";
import { MainLayout } from "@/layouts";
import { About, Services, FeaturedProject, FeaturedWork } from "@/components/sections";
import { getHomeContent } from "@/lib/data";

const Hero = dynamic(() => import("@/components/sections/Hero").then((m) => m.default), {
  loading: () => (
    <div className="min-h-[100dvh] bg-bg flex items-center justify-center" aria-hidden>
      <div className="w-32 h-8 bg-foreground/10 rounded animate-pulse" />
    </div>
  ),
  ssr: true,
});

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
