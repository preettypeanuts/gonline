import { ReusableBanner } from "@/components/reusable-banner";
import { socialMediaProblem } from "@/app/data"
import { Problem } from "@/components/problem";

export default function SocialMedia() {
    return (
        <>
            <ReusableBanner
                title="Social Media"
                highlight="Management"
                imageUrl="https://images.unsplash.com/photo-1504465039710-0f49c0a47eb7?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            <Problem title="We Fix Your Social Media" items={socialMediaProblem} />

        </>
    )
}