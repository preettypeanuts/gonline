import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/footer";
import { ComingSoonPage } from "@/components/coming-soon-page";
import { NavbarWrapper } from "@/components/navbar-wrapper";
import { BottomNav } from "@/components/bottom-nav";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import {
  DEFAULT_DESCRIPTION,
  INDEXABLE_ROBOTS,
  OG_IMAGE,
  SITE_LANG,
  SITE_NAME,
  SITE_URL,
  defaultOpenGraph,
  defaultTwitter,
} from "@/config/seo";

const pjs = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const isComingSoon = process.env.NEXT_PUBLIC_SITE_MODE === "coming";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} — Digital Agency | Website & Social Media Indonesia`,
    template: `%s | ${SITE_NAME}`,
  },

  description: DEFAULT_DESCRIPTION,

  keywords: [
    "GONLINE",
    "gonline",
    "digital agency indonesia",
    "jasa pembuatan website",
    "website development",
    "social media management",
    "jasa social media management",
    "agency digital",
    "go digital",
    "website bisnis",
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "business",
  applicationName: SITE_NAME,

  alternates: {
    canonical: "/",
  },

  robots: isComingSoon
    ? { index: false, follow: false }
    : INDEXABLE_ROBOTS,

  openGraph: defaultOpenGraph({
    title: `${SITE_NAME} — Digital Agency | Website & Social Media Indonesia`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  }),

  twitter: defaultTwitter({
    title: `${SITE_NAME} — Digital Agency | Website & Social Media`,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  }),

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  other: {
    "geo.region": "ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang={SITE_LANG} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PMC1F40BX7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'G-PMC1F40BX7');
      `}
        </Script>
      </head>

      <body className={`${pjs.className} antialiased`}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1365206612320219&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <ThemeProvider defaultTheme="light" attribute="class">
          {isComingSoon ? (
            <ComingSoonPage />
          ) : (
            <>
              <NavbarWrapper />
              <BottomNav />
              {children}
              <Footer />
              <Toaster position="top-right" richColors />
            </>
          )}
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
