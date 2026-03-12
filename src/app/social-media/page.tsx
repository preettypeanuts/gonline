import { ReusableBanner } from "@/components/reusable-banner";
import { socialMediaProblem, socmedFaq, socmedPackages, whyUsSocialMedia } from "@/app/data"
import { Problem } from "@/components/problem";
import { WhyUsSection } from "@/components/why-us-service";
import { SocmedWork } from "@/components/socmed-work";
import { RunningClientsLogo } from "@/components/running-clients-logo";
import { PricingCard } from "@/components/pricing-card";
import { FaqSection } from "@/components/faq";

export default function SocialMedia() {
    return (
        <>
            <ReusableBanner
                title="Social Media"
                highlight="Management"
                imageUrl="https://images.unsplash.com/photo-1504465039710-0f49c0a47eb7?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            <Problem title="We Fix Your Social Media" items={socialMediaProblem} />
            <WhyUsSection
                items={whyUsSocialMedia}
                title="Why Us?"
                imageUrl="https://images.unsplash.com/photo-1762227145259-99ddbe0122b9?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <SocmedWork />
            <RunningClientsLogo />
            <PricingCard
                packages={socmedPackages}
                title="Social Media Packages"
                showStartingFrom
            />
            <FaqSection
                faqs={socmedFaq}
                title={<>Pertanyaan Seputar <span className="text-thirdColor">Social Media</span></>}
            />
        </>
    )
}