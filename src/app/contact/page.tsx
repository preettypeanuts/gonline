import dynamic from "next/dynamic"
import type { Metadata } from "next"

import { ReusableBanner } from "@/components/reusable-banner"

const ContactItems = dynamic(
    () => import("@/components/contact-item").then((mod) => mod.ContactItems),
    {
        loading: () => <div className="h-50 animate-pulse bg-muted rounded-xl" />,
    }
)

const ContactForm = dynamic(
    () => import("@/components/contact-form").then((mod) => mod.ContactForm),
    {
        loading: () => <div className="h-100 animate-pulse bg-muted rounded-xl" />,
    }
)

export const metadata: Metadata = {
    title: "Contact Us | GONLINE Digital Agency",

    description:
        "Hubungi GONLINE untuk konsultasi website development, social media management, dan solusi digital lainnya untuk bisnis Anda.",

    keywords: [
        "contact gonline",
        "digital agency contact",
        "hubungi digital agency",
        "jasa pembuatan website",
        "konsultasi website",
        "contact web developer",
        "contact social media agency",
    ],

    alternates: {
        canonical: "https://gonline.id/contact",
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: "Contact GONLINE | Digital Agency",
        description:
            "Hubungi tim GONLINE untuk konsultasi website development dan social media management.",
        url: "https://gonline.id/contact",
        siteName: "GONLINE",
        locale: "id_ID",
        type: "website",
        images: [
            {
                url: "https://gonline.id/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Contact GONLINE",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Contact GONLINE",
        description:
            "Diskusikan kebutuhan digital bisnis Anda bersama tim GONLINE.",
        images: ["https://gonline.id/og-image.jpg"],
    },
}

export default function Contact() {
    return (
        <>
            <ReusableBanner
                title="Let's Work"
                highlight="Together"
                imageUrl="https://images.unsplash.com/photo-1761839259946-2d80f8e72e18?q=80&w=2070&auto=format&fit=crop"
            />

            <ContactItems />

            <ContactForm />
        </>
    )
}