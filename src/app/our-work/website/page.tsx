import dynamic from "next/dynamic"
import type { Metadata } from "next"

const WebWorkByCategory = dynamic(
  () => import("@/components/web-work-category").then((mod) => mod.WebWorkByCategory),
  {
    loading: () => <div className="h-125 animate-pulse bg-muted rounded-xl" />,
  }
)

export const metadata: Metadata = {
  title: "Website Portfolio | GONLINE",

  description:
    "Lihat berbagai portfolio website yang telah dikembangkan oleh GONLINE untuk berbagai jenis bisnis, mulai dari company profile hingga website bisnis profesional.",

  keywords: [
    "website portfolio",
    "portfolio website development",
    "contoh website bisnis",
    "portfolio web developer",
    "portfolio website company profile",
    "jasa pembuatan website",
    "web development portfolio",
  ],

  alternates: {
    canonical: "https://gonline.id/our-work/website",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Website Portfolio | GONLINE",
    description:
      "Portfolio website yang telah dikembangkan oleh tim GONLINE untuk berbagai bisnis.",
    url: "https://gonline.id/our-work/website",
    siteName: "GONLINE",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Website Portfolio GONLINE",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Website Portfolio | GONLINE",
    description:
      "Lihat berbagai proyek website yang telah dikembangkan oleh GONLINE.",
    images: ["/og-image.jpg"],
  },
}

export default function WebWorkPage() {
  return <WebWorkByCategory />
}