import dynamic from "next/dynamic"
import type { Metadata } from "next"

import { ReusableBanner } from "@/components/reusable-banner"
import { WebPageSchema } from "@/components/seo/web-page-schema"
import { pageSchemas } from "../data"

const WhoAreWe = dynamic(
    () => import("@/components/who-are-we").then((mod) => mod.WhoAreWe),
    { loading: () => <div className="h-87.5 animate-pulse bg-muted rounded-xl" /> }
)

const VissionMission = dynamic(
    () => import("@/components/vision-mission").then((mod) => mod.VissionMission),
    { loading: () => <div className="h-87.5 animate-pulse bg-muted rounded-xl" /> }
)

const OurSpecialty = dynamic(
    () => import("@/components/our-specialty").then((mod) => mod.OurSpecialty),
    { loading: () => <div className="h-87.5 animate-pulse bg-muted rounded-xl" /> }
)

const WhyChooseUs = dynamic(
    () => import("@/components/why-us").then((mod) => mod.WhyChooseUs),
    { loading: () => <div className="h-87.5 animate-pulse bg-muted rounded-xl" /> }
)

const RunningClientsLogo = dynamic(
    () =>
        import("@/components/running-clients-logo").then(
            (mod) => mod.RunningClientsLogo
        ),
    { loading: () => <div className="h-50 animate-pulse bg-muted rounded-xl" /> }
)

const CTA = dynamic(
    () => import("@/components/cta").then((mod) => mod.CTA),
    { loading: () => <div className="h-50 animate-pulse bg-muted rounded-xl" /> }
)

export const metadata: Metadata = {
    title: "About Us | GONLINE Digital Agency",

    description:
        "Kenali lebih dekat GONLINE, digital agency yang membantu bisnis berkembang melalui website development, social media management, dan strategi digital yang efektif.",

    keywords: [
        "about gonline",
        "digital agency",
        "web development agency",
        "social media agency",
        "digital services",

        "tentang gonline",
        "tentang digital agency",
        "agency website development",
        "agency social media management",
        "jasa digital agency",
    ],

    alternates: {
        canonical: "https://gonline.id/about",
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: "About GONLINE | Digital Agency",
        description:
            "Pelajari visi, misi, dan spesialisasi GONLINE dalam membantu bisnis membangun kehadiran digital yang kuat.",
        url: "https://gonline.id/about",
        siteName: "GONLINE",
        locale: "id_ID",
        type: "website",
        images: [
            {
                url: "og-image.jpg",
                width: 1200,
                height: 630,
                alt: "About GONLINE Digital Agency",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "About GONLINE | Digital Agency",
        description:
            "Kenali lebih dekat GONLINE dan bagaimana kami membantu bisnis berkembang secara digital.",
        images: ["/og-image.jpg"],
    },
}

export default function About() {
    return (
        <>
            <WebPageSchema {...pageSchemas.about} />
            <ReusableBanner
                title="Get To Know" 
                highlight="Us"
                imageUrl="https://images.unsplash.com/photo-1628702110466-aa2107a82d8e?q=80&w=2920&auto=format&fit=crop"
            />

            <WhoAreWe />
            <VissionMission />
            <OurSpecialty />
            <WhyChooseUs />
            <RunningClientsLogo />
            <CTA />
        </>
    )
}