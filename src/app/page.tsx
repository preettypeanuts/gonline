import dynamic from "next/dynamic"
import { HomeBanner } from "@/components/home-banner"

const OpeningStatements = dynamic(
  () => import("@/components/opening-statements").then((mod) => mod.OpeningStatements),
  { loading: () => <div className="h-62.5 animate-pulse bg-muted rounded-xl" /> }
)

const ServicesVertical = dynamic(
  () => import("@/components/services-vertical").then((mod) => mod.ServicesVertical),
  { loading: () => <div className="h-100 animate-pulse bg-muted rounded-xl" /> }
)

const HowWeWork = dynamic(
  () => import("@/components/how-we-work").then((mod) => mod.HowWeWork),
  { loading: () => <div className="h-100 animate-pulse bg-muted rounded-xl" /> }
)

const Showcase = dynamic(
  () => import("@/components/showcase").then((mod) => mod.Showcase),
  { loading: () => <div className="h-100 animate-pulse bg-muted rounded-xl" /> }
)

const CTA = dynamic(
  () => import("@/components/cta").then((mod) => mod.CTA),
  { loading: () => <div className="h-50 animate-pulse bg-muted rounded-xl" /> }
)

export const metadata = {
  title: "GONLINE | Website Development & Digital Services",
  description:
    "GONLINE helps businesses build professional websites and strong digital presence with modern design, SEO optimization, and scalable technology.",
  keywords: [
    "website development",
    "web development agency",
    "web design agency",
    "website design services",
    "custom website development",
    "business website",
    "professional website",
    "company profile website",
    "landing page development",
    "SEO website",
    "SEO optimized website",
    "digital services",
    "digital agency",
    "digital marketing services",
    "social media management",
    "social media agency",
    "socmed agency",
    "social media marketing",
    "content creation services",
    "branding services",

    // Indonesian keywords
    "jasa bikin website",
    "jasa pembuatan website",
    "jasa website profesional",
    "jasa website company profile",
    "jasa pembuatan landing page",
    "jasa web developer",
    "jasa web design",
    "jasa digital agency",
    "jasa social media management",
    "jasa kelola instagram bisnis",
    "jasa konten sosial media",
    "jasa digital marketing"
  ],
  alternates: {
    canonical: "https://gonline.id",
  },
  openGraph: {
    title: "GONLINE | Website Development & Digital Services",
    description:
      "Build professional websites that increase credibility and generate leads for your business.",
    url: "https://gonline.id",
    siteName: "GONLINE",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GONLINE Website Development Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GONLINE | Website Development & Digital Services",
    description:
      "Build professional websites that increase credibility and generate leads for your business.",
    images: ["/og-image.jpg"],
  },
}

export default function Home() {
  return (
    <>
      <HomeBanner />
      <OpeningStatements />
      <ServicesVertical />
      <HowWeWork />
      <Showcase />
      <CTA />
    </>
  )
}