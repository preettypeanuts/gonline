import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Form Requirements Website | GONLINE",
    description:
        "Isi form requirements website untuk memulai proses pembuatan website bersama GONLINE. Lengkapi informasi bisnis, konten, dan asset yang dibutuhkan untuk pengembangan website Anda.",
    keywords: [
        "form pembuatan website",
        "website requirements form",
        "brief pembuatan website",
        "form kebutuhan website",
        "jasa pembuatan website",
        "web development brief",
        "konsultasi website bisnis",
    ],
    alternates: {
        canonical: "https://www.gonline.id/website-requirements",
    },
    robots: { index: false, follow: true },
    openGraph: {
        title: "Form Requirements Website | GONLINE",
        description:
            "Lengkapi form requirements untuk memulai pembuatan website bersama GONLINE.",
        url: "https://www.gonline.id/website-requirements",
        siteName: "GONLINE",
        locale: "id_ID",
        type: "website",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Form Requirements Website GONLINE",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Form Requirements Website | GONLINE",
        description:
            "Isi form untuk memulai proses pembuatan website bersama GONLINE.",
        images: ["/og-image.jpg"],
    },
};

export default function WebsiteRequirementsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}