import type { Metadata } from "next";
import "./globals.css";
import DocumentHead from "@/components/layout/DocumentHead";
import AccessibilityWidgetLoader from "@/components/providers/AccessibilityWidgetLoader";

export const metadata: Metadata = {
  title: "Becca PR - Hospitality advisory + Communications agency",
  description:
    "We understand hospitality at its core. We'll shape your story, hone your vision, and grow your audience. We create the places people talk about.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hellobecca.com"
  ),
  openGraph: {
    title: "Becca PR - Hospitality advisory + Communications agency",
    description:
      "We understand hospitality at its core. We'll shape your story, hone your vision, and grow your audience. We create the places people talk about.",
    url: "/",
    siteName: "Becca - hospitality advisory + communications agency",
    images: [
      {
        url: "https://www.hellobecca.com/wp-content/uploads/1-2.jpg",
        width: 400,
        height: 400,
        alt: "Becca PR",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof window!=='undefined'&&window.location.pathname==='/'){document.documentElement.classList.add('hero-entrance-lock');}})();`,
          }}
        />
        <DocumentHead />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        {children}
        <AccessibilityWidgetLoader />
      </body>
    </html>
  );
}
