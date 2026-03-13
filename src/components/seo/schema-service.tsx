export function ServiceSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Website Development",
        description:
            "Professional website development services for businesses to build credibility and generate leads.",
        provider: {
            "@type": "Organization",
            name: "GONLINE",
            url: "https://gonline.id",
        },
        areaServed: {
            "@type": "Country",
            name: "Indonesia",
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}