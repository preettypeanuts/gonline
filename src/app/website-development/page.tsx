import { Problem } from "@/components/problem";
import { ReusableBanner } from "@/components/reusable-banner";
import { WebSpecialty } from "@/components/web-specialty";

export default function WebsiteDevelopment() {
    return (
        <>
            <ReusableBanner
                title="Website"
                highlight="Development"
                imageUrl="https://images.unsplash.com/photo-1573867607864-585b88d78729?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            <WebSpecialty />
            <Problem />
        </>
    )
}