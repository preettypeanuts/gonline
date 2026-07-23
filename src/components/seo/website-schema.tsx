import { SITE_NAME, SITE_URL, absoluteUrl } from "@/config/seo";
import { ORGANIZATION_ID, organizationNode } from "./organization-schema";
import { JsonLd } from "./json-ld";

/** Home-only graph: Organization + WebSite with Insight search action. */
export function WebsiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: ["gonline", "gonline.id"],
        description:
          "GONLINE adalah digital agency Indonesia untuk website development, social media management, dan strategi digital.",
        inLanguage: "id-ID",
        publisher: { "@id": ORGANIZATION_ID },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: absoluteUrl("/insight?search={search_term_string}"),
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return <JsonLd data={data} />;
}
