import { ReusableBanner } from "@/components/reusable-banner";
import { socialMediaProblem, socmedFaq, socmedPackages, whyUsSocialMedia } from "@/app/data"
import { Problem } from "@/components/problem";
import { WhyUsSection } from "@/components/why-us-service";
import { SocmedWork } from "@/components/socmed-work";
import { RunningClientsLogo } from "@/components/running-clients-logo";
import { PricingCard } from "@/components/pricing-card";
import { FaqSection } from "@/components/faq";
import { CtaSocmed } from "@/components/cta-socmed";
import { SubNav } from "@/components/sub-nav";
import { SectionAnchor } from "@/components/section-anchor";
import { HelpCircle, Star, Briefcase, DollarSign, MessageCircle, LayoutGrid } from "lucide-react";

const SOCMED_SUBNAV = [
    { label: "Problem",  id: "problem",  icon: <HelpCircle size={15} /> },
    { label: "Why Us",   id: "why-us",   icon: <Star size={15} /> },
    { label: "Our Work", id: "our-work", icon: <Briefcase size={15} /> },
    { label: "Pricing",  id: "pricing",  icon: <DollarSign size={15} /> },
    { label: "FAQ",      id: "faq",      icon: <MessageCircle size={15} /> },
]

export default function SocialMedia() {
    return (
        <>
            <ReusableBanner
                title="Social Media"
                highlight="Management"
                imageUrl="https://images.unsplash.com/photo-1504465039710-0f49c0a47eb7?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            <SubNav items={SOCMED_SUBNAV} />

            <SectionAnchor id="problem">
                <Problem title="We Fix Your Social Media" items={socialMediaProblem} />
            </SectionAnchor>
            <SectionAnchor id="why-us">
                <WhyUsSection
                    items={whyUsSocialMedia}
                    title="Why Us?"
                    imageUrl="https://images.unsplash.com/photo-1762227145259-99ddbe0122b9?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                    title={<>Pertanyaan Seputar <span className="text-thirdColor">Social Media</span></>}
                />
            </SectionAnchor>
            <CtaSocmed />
        </>
    )
}