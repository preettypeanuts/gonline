export function ServiceSchema({ name, description, url }: {
  name: string
  description: string
  url: string
}) {

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url,
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