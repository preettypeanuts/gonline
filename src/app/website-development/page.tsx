import dynamic from "next/dynamic"
import type { Metadata } from "next"

import { ReusableBanner } from "@/components/reusable-banner"
import { socialMediaProblem, socmedFaq, socmedPackages, whyUsSocialMedia } from "@/app/data"
import { Problem } from "@/components/problem"
import { WhyUsSection } from "@/components/why-us-service"
import { SubNav } from "@/components/sub-nav"
import { SectionAnchor } from "@/components/section-anchor"
import { HelpCircle, Star, Briefcase, DollarSign, MessageCircle } from "lucide-react"

const SocmedWork = dynamic(
    () => import("@/components/socmed-work").then((mod) => mod.SocmedWork),
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

const CtaSocmed = dynamic(
    () =>
        import("@/components/cta-socmed").then(
            (mod) => mod.CtaSocmed
        ),
    { loading: () => <div className="h-50 animate-pulse bg-muted rounded-xl" /> }
)

const SOCMED_SUBNAV = [
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
                url: "https://gonline.id/og-image.jpg",
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
        images: ["https://gonline.id/og-image.jpg"],
    },
}

export default function SocialMedia() {
    return (
        <>
            <ReusableBanner
                title="Website"
                highlight="Development"
                imageUrl="https://images.unsplash.com/photo-1573867607864-585b88d78729?q=80&w=2070&auto=format&fit=crop"
            />

            <SubNav items={SOCMED_SUBNAV} />

            <SectionAnchor id="problem">
                <Problem title="We Fix Your Social Media" items={socialMediaProblem} />
            </SectionAnchor>

            <SectionAnchor id="why-us">
                <WhyUsSection
                    items={whyUsSocialMedia}
                    title="Why Us?"
                    imageUrl="https://images.unsplash.com/photo-1762227145259-99ddbe0122b9?q=80&w=2920&auto=format&fit=crop"
                />
            </SectionAnchor>

            <SectionAnchor id="our-work">
                <SocmedWork />
            </SectionAnchor>

            <RunningClientsLogo />

            <SectionAnchor id="pricing">
                <PricingCard
                    packages={socmedPackages}
                    title="Social Media Packages"
                    showStartingFrom
                />
            </SectionAnchor>

            <SectionAnchor id="faq">
                <FaqSection
                    faqs={socmedFaq}
                    title={
                        <>
                            Pertanyaan Seputar{" "}
                            <span className="text-thirdColor">Social Media</span>
                        </>
                    }
                />
            </SectionAnchor>

            <CtaSocmed />
        </>
    )
}