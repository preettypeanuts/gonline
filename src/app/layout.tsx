import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/footer";
import { ComingSoonPage } from "@/components/coming-soon-page";
import { NavbarWrapper } from "@/components/navbar-wrapper";

const pjs = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gonline.id"),

  title: {
    default: "GONLINE — Website & Social Media Agency",
    template: "%s | GONLINE",
  },

  description:
    "GONLINE helps businesses build credibility and grow online through professional website development and strategic social media management.",

  keywords: [
    "website development",
    "jasa pembuatan website",
    "social media management",
    "digital agency indonesia",
    "website bisnis",
    "agency digital",
    "go digital"
  ],

  authors: [{ name: "GONLINE", url: "https://gonline.id" }],

  alternates: {
    canonical: "/",
  },

  robots:
    process.env.NEXT_PUBLIC_SITE_MODE === "coming"
      ? {
        index: false,
        follow: false,
      }
      : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-video-preview": -1,
          "max-snippet": -1,
        },
      },

  openGraph: {
    title: "GONLINE — Website & Social Media Agency",
    description:
      "Professional website development and social media management services to help businesses grow online.",
    url: "https://gonline.id",
    siteName: "GONLINE",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GONLINE Digital Agency",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "GONLINE — Website & Social Media Agency",
    description:
      "Professional website development and social media management services.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const isComingSoon =
  process.env.NEXT_PUBLIC_SITE_MODE === "coming";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className="scroll-smooth">
      <body className={`${pjs.className} antialiased`}>
        <ThemeProvider enableSystem attribute="class">
          {isComingSoon ? (
            <ComingSoonPage />
          ) : (
            <>
              <NavbarWrapper />
              {children}
              <Footer />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
