export function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "GONLINE",
        url: "https://gonline.id",
        logo: "https://gonline.id/icon.png",
        sameAs: [
            "https://www.instagram.com/gonline_id",
            "https://www.linkedin.com/company/gonline-creative/",
            "https://www.facebook.com/share/1CHyvzr49e/",
        ],
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+62-851-7388-8880",
            contactType: "customer service",
            areaServed: "ID",
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}