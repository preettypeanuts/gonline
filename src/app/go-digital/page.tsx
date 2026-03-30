import dynamic from "next/dynamic"
import type { Metadata } from "next"

import { ReusableBanner } from "@/components/reusable-banner"
import { goDigitalFaq, goDigitalPackages, goDigitalProblem, introBadgesGoDigital, socmedFaq, socmedPackages, whyUsGoDigital, } from "@/app/data"
import { Problem } from "@/components/problem"
import { WhyUsSection } from "@/components/why-us-service"
import { SubNav } from "@/components/sub-nav"
import { SectionAnchor } from "@/components/section-anchor"
import { HelpCircle, Star, Briefcase, DollarSign, MessageCircle } from "lucide-react"
import { ctaConfigs } from "@/components/cta-service"
import { IntroBadges } from "@/components/intro-badges"
import { ServiceSchema } from "@/components/seo/schema-service"

const Showcase = dynamic(
    () => import("@/components/showcase").then((mod) => mod.Showcase),
    { loading: () => <div className="h-100 animate-pulse bg-muted rounded-xl" /> }
)

const RunningClientsLogo = dynamic(
    () =>
        import("@/components/running-clients-logo").then(
            (mod) => mod.RunningClientsLogo
        ),
    { loading: () => <div className="h-50 animate-pulse bg-muted rounded-xl" /> }
)

const PricingCard = dynamic(
    () =>
        import("@/components/pricing-card").then(
            (mod) => mod.PricingCard
        ),
    { loading: () => <div className="h-125 animate-pulse bg-muted rounded-xl" /> }
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
]

export const metadata: Metadata = {
    title: "Social Media Management Services | Jasa Kelola Sosial Media | GONLINE",

    description:
        "GONLINE menyediakan jasa social media management untuk membantu bisnis membangun brand, meningkatkan engagement, dan menghasilkan leads melalui strategi konten yang profesional.",

    keywords: [
        "social media management",
        "social media agency",
        "socmed agency",
        "social media marketing",
        "instagram management",
        "content creation services",
        "digital marketing services",

        "jasa social media management",
        "jasa kelola sosial media",
        "jasa kelola instagram bisnis",
        "jasa admin instagram",
        "jasa konten instagram",
        "jasa social media marketing",
        "jasa digital marketing",
    ],

    alternates: {
        canonical: "https://gonline.id/social-media-management",
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: "Social Media Management Services | GONLINE",
        description:
            "Jasa social media management profesional untuk membantu bisnis berkembang melalui strategi konten yang efektif.",
        url: "https://gonline.id/social-media-management",
        siteName: "GONLINE",
        locale: "id_ID",
        type: "website",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Social Media Management by GONLINE",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Social Media Management Services | GONLINE",
        description:
            "Kelola sosial media bisnis secara profesional dengan strategi konten yang efektif.",
        images: ["/og-image.jpg"],
    },
}

export default function GoDIgitalaPge() {
    return (
        <>
            <ServiceSchema
                name="GO Digital"
                description="Integrated website and social media services to build a strong digital presence."
                url="https://gonline.id/go-digital"
            />

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

            <RunningClientsLogo />

            <SectionAnchor id="pricing">
                <PricingCard
                    packages={goDigitalPackages}
                    title="GO Digital Packages"
                    showStartingFrom
                />
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

            <RunningClientsLogo/>

            <CtaService config={ctaConfigs.godigital} />

        </>
    )
}