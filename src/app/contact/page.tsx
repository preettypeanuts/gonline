import { ContactForm } from "@/components/contact-form";
import { ContactItems } from "@/components/contact-item";
import { ReusableBanner } from "@/components/reusable-banner";

export default function Contact() {
    return (
        <>
            <ReusableBanner
                title="Let's Work"
                highlight="Together"
                imageUrl="https://images.unsplash.com/photo-1761839259946-2d80f8e72e18?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <ContactItems />
            <ContactForm />
        </>
    )
}