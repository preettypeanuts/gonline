import { Problem } from "@/components/problem"
import { ReusableBanner } from "@/components/reusable-banner"
import { WebSpecialty } from "@/components/web-specialty"
import { WhyUsSection } from "@/components/why-us-service"
import { websiteFaq, websitePackages, whyUsWeb } from "../data"
import { WebWork } from "@/components/web-work"
import { RunningClientsLogo } from "@/components/running-clients-logo"
import { PricingCard } from "@/components/pricing-card"
import { FaqSection } from "@/components/faq"
import { CtaWebsite } from "@/components/cta-website"
import { SubNav } from "@/components/sub-nav"
import { SectionAnchor } from "@/components/section-anchor"
import { HelpCircle, Star, Briefcase, DollarSign } from "lucide-react"
import { BiQuestionMark } from "react-icons/bi"

const WEB_SUBNAV = [
    { label: "Problem", id: "problem", icon: <HelpCircle size={15} /> },
    { label: "Why Us", id: "why-us", icon: <Star size={15} /> },
    { label: "Our Work", id: "our-work", icon: <Briefcase size={15} /> },
    { label: "Pricing", id: "pricing", icon: <DollarSign size={15} /> },
    { label: "FAQ", id: "faq", icon: <BiQuestionMark size={15} /> },
]

export const metadata = {
  title: "Website Development Services | GONLINE",
  description: "Professional business website development.",
  alternates: {
    canonical: "https://gonline.id/website-development",
  },
  openGraph: {
    title: "Website Development Services | GONLINE",
    description: "Professional business website development.",
    url: "https://gonline.id/website-development",
    images: ["/og-image.jpg"],
  },
}

export default function WebsiteDevelopment() {
    return (
        <>
            <ReusableBanner
                title="Website"
                highlight="Development"
                imageUrl="https://images.unsplash.com/photo-1573867607864-585b88d78729?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            <SubNav items={WEB_SUBNAV} />

            <WebSpecialty />

            <SectionAnchor id="problem"><Problem /></SectionAnchor>

            <SectionAnchor id="why-us">
                <WhyUsSection
                    items={whyUsWeb}
                    title="Why Us?"
                    imageUrl="https://images.unsplash.com/photo-1658998765621-2cf0f12e059f?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
            </SectionAnchor>
            <SectionAnchor id="our-work"><WebWork /></SectionAnchor>
            <RunningClientsLogo />
            <SectionAnchor id="pricing">
                <PricingCard
                    packages={websitePackages}
                    title="Website Packages"
                    showStartingFrom
                />
            </SectionAnchor>
            <SectionAnchor id="faq"><FaqSection faqs={websiteFaq} /></SectionAnchor>
            <CtaWebsite />
        </>
    )
}