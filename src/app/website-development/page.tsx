import dynamic from "next/dynamic"

import { Problem } from "@/components/problem"
import { ReusableBanner } from "@/components/reusable-banner"
import { WhyUsSection } from "@/components/why-us-service"
import { introBadgesWebsite, webProblem, websiteFaq, websitePackages, whyUsWeb } from "../data"
import { SubNav } from "@/components/sub-nav"
import { SectionAnchor } from "@/components/section-anchor"
import { HelpCircle, Star, Briefcase, DollarSign, CircleQuestionMark } from "lucide-react"
import { ServiceSchema } from "@/components/seo/schema-service"
import { IntroBadges } from "@/components/intro-badges"
import { WebSpecialty } from "@/components/web-specialty"
import { ctaConfigs, CtaService } from "@/components/cta-service"
import { Suspense } from "react"
import { WebWorkSkeleton } from "@/components/skeleton/web-work-skeleton"

const WebWork = dynamic(
    () => import("@/components/web-work").then((mod) => mod.WebWork),
    {
        loading: () => <div className="h-100 animate-pulse bg-muted rounded-xl" />,
    }
)
const RunningClientsLogo = dynamic(
    () =>
        import("@/components/running-clients-logo").then(
            (mod) => mod.RunningClientsLogo
        ),
    {
        loading: () => <div className="h-50 animate-pulse bg-muted rounded-xl" />,
    }
)

const PricingCard = dynamic(
    () =>
        import("@/components/pricing-card").then(
            (mod) => mod.PricingCard
        ),
    {
        loading: () => <div className="h-125 animate-pulse bg-muted rounded-xl" />,
    }
)

const FaqSection = dynamic(
    () =>
        import("@/components/faq").then(
            (mod) => mod.FaqSection
        ),
    {
        loading: () => <div className="h-100 animate-pulse bg-muted rounded-xl" />,
    }
)

const CtaWebsite = dynamic(
    () =>
        import("@/components/cta-service").then(
            (mod) => mod.CtaService
        ),
    {
        loading: () => <div className="h-50 animate-pulse bg-muted rounded-xl" />,
    }
)

const WEB_SUBNAV = [
    { label: "Problem", id: "problem", icon: <HelpCircle size={15} /> },
    { label: "Why Us", id: "why-us", icon: <Star size={15} /> },
    { label: "Our Work", id: "our-work", icon: <Briefcase size={15} /> },
    { label: "Pricing", id: "pricing", icon: <DollarSign size={15} /> },
    { label: "FAQ", id: "faq", icon: <CircleQuestionMark size={15} /> },
]

export const metadata = {
    title: "Website Development Services | Jasa Pembuatan Website Profesional | GONLINE",
    description:
        "GONLINE menyediakan jasa pembuatan website profesional untuk bisnis, company profile, dan landing page. Website modern, SEO friendly, cepat, dan dirancang untuk meningkatkan kredibilitas serta menghasilkan leads.",

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

        // social media
        "social media management",
        "social media agency",
        "socmed agency",
        "social media marketing",
        "content creation services",

        // indonesian search intent
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
    ],

    alternates: {
        canonical: "https://gonline.id/website-development",
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    openGraph: {
        title: "Website Development Services | GONLINE",
        description:
            "Jasa pembuatan website profesional untuk bisnis. Website cepat, modern, SEO friendly, dan dirancang untuk menghasilkan leads.",
        url: "https://gonline.id/website-development",
        siteName: "GONLINE",
        locale: "id_ID",
        type: "website",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Website Development Services by GONLINE",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Website Development Services | GONLINE",
        description:
            "Jasa pembuatan website profesional untuk bisnis dan company profile.",
        images: ["/og-image.jpg"],
    },

    category: "technology",
}

export default function WebsiteDevelopment() {
    return (
        <>
            <ServiceSchema
                name="Website Development"
                description="Professional website development services for businesses."
                url="https://gonline.id/website"
            />

            <ReusableBanner
                title="GO"
                highlight="Website"
                imageUrl="https://images.unsplash.com/photo-1730449819838-a5018d63e79e?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            <WebSpecialty />

            <SubNav items={WEB_SUBNAV} />

            <IntroBadges {...introBadgesWebsite} />

            <SectionAnchor id="problem">
                <Problem items={webProblem} />
            </SectionAnchor>

            <SectionAnchor id="why-us">
                <WhyUsSection
                    items={whyUsWeb}
                    title="Why Us?"
                    imageUrl="https://images.unsplash.com/photo-1658998765621-2cf0f12e059f?q=80&w=3027&auto=format&fit=crop"
                />
            </SectionAnchor>

            <SectionAnchor id="our-work">
                <Suspense fallback={<WebWorkSkeleton />}>
                    <WebWork />
                </Suspense>
            </SectionAnchor>

            <RunningClientsLogo />

            <SectionAnchor id="pricing">
                <PricingCard
                    packages={websitePackages}
                    title="Website Packages"
                    showStartingFrom
                />
            </SectionAnchor>

            <SectionAnchor id="faq">
                <FaqSection faqs={websiteFaq} />
            </SectionAnchor>

            <CtaService config={ctaConfigs.website} />
        </>
    )
}