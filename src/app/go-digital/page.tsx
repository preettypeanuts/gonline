import dynamic from "next/dynamic"
import type { Metadata } from "next"

import { ReusableBanner } from "@/components/reusable-banner"
import { goDigitalFaq, goDigitalProblem, introBadgesGoDigital, whyUsGoDigital, } from "@/app/data"
import { Problem } from "@/components/problem"
import { WhyUsSection } from "@/components/why-us-service"
import { SubNav } from "@/components/sub-nav"
import { SectionAnchor } from "@/components/section-anchor"
import { HelpCircle, Star, Briefcase, DollarSign, MessageCircle, Book } from "lucide-react"
import { ctaConfigs } from "@/components/cta-service"
import { IntroBadges } from "@/components/intro-badges"
import { ServiceSchema } from "@/components/seo/schema-service"
import { FaqSchema } from "@/components/seo/faq-schema"
import { InsightRecommendations } from "@/components/insight-reccomendations"
import { Suspense } from "react"
import { RunningClientsLogo } from "@/components/running-clients-logo"
import { ServicePricing } from "@/components/service-pricing"
import { PRICE_SERVICE_SLUG } from "@/types/price"

const Showcase = dynamic(
    () => import("@/components/showcase").then((mod) => mod.Showcase),
    { loading: () => <div className="h-100 animate-pulse bg-muted rounded-xl" /> }
)

const FaqSection = dynamic(
    () =>
        import("@/components/faq").then(
            (mod) => mod.FaqSection
        ),
    { loading: () => <div className="h-100 animate-pulse bg-muted rounded-xl" /> }
)

const CtaService = dynamic(
    () =>
        import("@/components/cta-service").then(
            (mod) => mod.CtaService
        ),
    { loading: () => <div className="h-50 animate-pulse bg-muted rounded-xl" /> }
)

const GODIG_SUBNAV = [
    { label: "Problem", id: "problem", icon: <HelpCircle size={15} /> },
    { label: "Why Us", id: "why-us", icon: <Star size={15} /> },
    { label: "Our Work", id: "our-work", icon: <Briefcase size={15} /> },
    { label: "Pricing", id: "pricing", icon: <DollarSign size={15} /> },
    { label: "FAQ", id: "faq", icon: <MessageCircle size={15} /> },
    { label: "Insight", id: "insight", icon: <Book size={15} /> },

]

export const metadata: Metadata = {
    title: "GO Digital | Paket Website + Social Media Terintegrasi",

    description:
        "GO Digital dari GONLINE menggabungkan website development dan social media management dalam satu sistem pertumbuhan digital untuk bisnis Anda.",

    keywords: [
        "go digital",
        "paket digital agency",
        "website dan social media",
        "digital transformation umkm",
        "jasa go digital",
        "paket website social media",
        "digital agency indonesia",
        "GONLINE",
    ],

    alternates: {
        canonical: "https://www.gonline.id/go-digital",
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: "GO Digital | Website + Social Media | GONLINE",
        description:
            "Paket digital terintegrasi: website profesional dan pengelolaan social media untuk pertumbuhan bisnis.",
        url: "https://www.gonline.id/go-digital",
        siteName: "GONLINE",
        locale: "id_ID",
        type: "website",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "GO Digital by GONLINE",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "GO Digital | GONLINE",
        description:
            "Website dan social media dalam satu sistem pertumbuhan digital untuk bisnis Anda.",
        images: ["/og-image.jpg"],
    },
}

export default function GoDIgitalaPge() {
    return (
        <>
            <ServiceSchema
                name="GO Digital"
                description="Paket terintegrasi website development dan social media management untuk pertumbuhan bisnis."
                url="https://www.gonline.id/go-digital"
            />
            <FaqSchema items={goDigitalFaq} />

            <ReusableBanner
                title="GO"
                highlight="Digital"
                imageUrl="https://images.unsplash.com/photo-1771226281089-771a31ff54d2?q=80&w=2914&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            <SubNav items={GODIG_SUBNAV} />

            <IntroBadges {...introBadgesGoDigital} />

            <SectionAnchor id="problem">
                <Problem title="Problem We Fix" items={goDigitalProblem} />
            </SectionAnchor>

            <SectionAnchor id="why-us">
                <WhyUsSection
                    items={whyUsGoDigital}
                    title="Why Us?"
                    imageUrl="https://images.unsplash.com/photo-1772752021241-2d922cadbab1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
            </SectionAnchor>

            <SectionAnchor id="our-work">
                <Showcase />
            </SectionAnchor>

            <Suspense fallback={<div className="h-50 animate-pulse bg-muted rounded-xl" />}>
            <RunningClientsLogo />
            </Suspense>

            <SectionAnchor id="pricing">
                <Suspense
                    fallback={
                        <div className="h-125 animate-pulse bg-muted rounded-xl" />
                    }
                >
                    <ServicePricing
                        serviceSlug={PRICE_SERVICE_SLUG.goDigital}
                        title="GO Digital Packages"
                        showStartingFrom
                    />
                </Suspense>
            </SectionAnchor>

            <SectionAnchor id="faq">
                <FaqSection
                    faqs={goDigitalFaq}
                    title={
                        <>
                            Got Question?{" "}
                            <span className="text-thirdColor">We Answer</span>
                        </>
                    }
                />
            </SectionAnchor>

            <Suspense fallback={<div className="h-50 animate-pulse bg-muted rounded-xl" />}>
            <RunningClientsLogo />
            </Suspense>

            <CtaService config={ctaConfigs.godigital} />

            <SectionAnchor id="insight">
                <InsightRecommendations
                    topics={["web-development", "social-media", "digital-marketing"]}
                    heading="Insight Seputar Website"
                    limit={6}
                />
            </SectionAnchor>

        </>
    )
}