import { absoluteUrl, SITE_URL } from "@/config/seo";
import { ORGANIZATION_ID, organizationNode } from "./organization-schema";
import { JsonLd } from "./json-ld";

export function ServiceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const serviceUrl = absoluteUrl(
    url.replace(/^https?:\/\/(www\.)?gonline\.id/, "") || "/",
  );

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          organizationNode(),
          {
            "@type": "Service",
            name,
            serviceType: name,
            description,
            url: serviceUrl,
            provider: { "@id": ORGANIZATION_ID },
            areaServed: {
              "@type": "Country",
              name: "Indonesia",
            },
            brand: {
              "@type": "Brand",
              name: "GONLINE",
              url: SITE_URL,
            },
          },
        ],
      }}
    />
  );
}
