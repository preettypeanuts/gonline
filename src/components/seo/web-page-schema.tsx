import { absoluteUrl } from "@/config/seo";
import { ORGANIZATION_ID } from "./organization-schema";
import { JsonLd } from "./json-ld";

export function WebPageSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const pageUrl = absoluteUrl(
    url.replace(/^https?:\/\/(www\.)?gonline\.id/, "") || "/",
  );

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name,
        description,
        url: pageUrl,
        isPartOf: { "@id": `${absoluteUrl()}/#website` },
        publisher: { "@id": ORGANIZATION_ID },
        inLanguage: "id-ID",
      }}
    />
  );
}
