import dynamic from "next/dynamic"
import type { Metadata } from "next"

import { ReusableBanner } from "@/components/reusable-banner"

const WebWork = dynamic(
    () => import("@/components/web-work").then((mod) => mod.WebWork),
    {
        loading: () => <div className="h-100 animate-pulse bg-muted rounded-xl" />,
    }
)

const SocmedWork = dynamic(
    () => import("@/components/socmed-work").then((mod) => mod.SocmedWork),
    {
        loading: () => <div className="h-100 animate-pulse bg-muted rounded-xl" />,
    }
)

export const metadata: Metadata = {
    title: "Our Work | GONLINE Digital Portfolio",

    description:
        "Lihat portfolio proyek GONLINE mulai dari website development hingga social media management yang membantu bisnis berkembang secara digital.",

    keywords: [
        "portfolio digital agency",
        "portfolio website development",
        "portfolio social media management",
        "our work digital agency",
        "portfolio gonline",
        "contoh website bisnis",
        "hasil social media management",
    ],

    alternates: {
        canonical: "https://gonline.id/our-work",
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: "Our Work | GONLINE Portfolio",
        description:
            "Portfolio proyek GONLINE dalam website development dan social media management.",
        url: "https://gonline.id/our-work",
        siteName: "GONLINE",
        locale: "id_ID",
        type: "website",
        images: [
            {
                url: "https://gonline.id/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "GONLINE Portfolio",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Our Work | GONLINE",
        description:
            "Lihat berbagai proyek digital yang telah dikerjakan oleh tim GONLINE.",
        images: ["https://gonline.id/og-image.jpg"],
    },
}

export default function OurWork() {
    return (
        <>
            <ReusableBanner
                title="Our"
                highlight="Work"
                imageUrl="https://images.unsplash.com/photo-1518791024316-d0e1bb1ee03a?q=80&w=2163&auto=format&fit=crop"
            />

            <WebWork />

            <SocmedWork />
        </>
    )
}