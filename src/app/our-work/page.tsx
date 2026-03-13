import { ReusableBanner } from "@/components/reusable-banner";
import { SocmedWork } from "@/components/socmed-work";
import { WebWork } from "@/components/web-work";
import { WebWorkByCategory } from "@/components/web-work-category";

export default function OurWork() {
    return (
        <>
            <ReusableBanner
                title="Our"
                highlight="Work"
                imageUrl="https://images.unsplash.com/photo-1518791024316-d0e1bb1ee03a?q=80&w=2163&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <WebWork />
            <SocmedWork/>
        </>
    )
}
