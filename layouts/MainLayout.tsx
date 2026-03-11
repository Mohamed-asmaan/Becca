import dynamic from "next/dynamic";
import { Header } from "@/components/sections";

const Footer = dynamic(() =>
  import("@/components/sections/Footer").then((m) => m.default)
);

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main id="main" className="min-h-screen bg-bg text-foreground overflow-x-hidden" role="main">
        {children}
      </main>
      <Footer />
    </>
  );
}
