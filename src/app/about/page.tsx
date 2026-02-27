import { ClientLogo } from "@/components/client-logo";
import { OurSpecialty } from "@/components/our-specialty";
import { ReusableBanner } from "@/components/reusable-banner";
import { VissionMission } from "@/components/vision-mission";
import { WhoAreWe } from "@/components/who-are-we";
import { WhyChooseUs } from "@/components/why-us";

export default function About() {
    return (
        <>
            <ReusableBanner
                title="Get To Know"
                highlight="Us"
                imageUrl="https://images.unsplash.com/photo-1628702110466-aa2107a82d8e?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <WhoAreWe />
            <VissionMission />
            <OurSpecialty />
            <WhyChooseUs />
            <ClientLogo />
        </>
    )
}