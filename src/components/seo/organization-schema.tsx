import { ORGANIZATION, SITE_URL } from "@/config/seo";
import { JsonLd } from "./json-ld";

/** Shared @id so WebSite / Service / Article can reference the same org node. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    alternateName: [...ORGANIZATION.alternateName],
    url: ORGANIZATION.url,
    logo: {
      "@type": "ImageObject",
      url: ORGANIZATION.logo,
      width: 512,
      height: 512,
    },
    image: ORGANIZATION.logo,
    description: ORGANIZATION.description,
    slogan: ORGANIZATION.slogan,
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
    sameAs: [...ORGANIZATION.sameAs],
    brand: {
      "@type": "Brand",
      name: "GONLINE",
      url: SITE_URL,
      logo: ORGANIZATION.logo,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: ORGANIZATION.telephone,
      contactType: "customer service",
      areaServed: ORGANIZATION.areaServed,
      availableLanguage: ["Indonesian", "English"],
    },
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    knowsAbout: [
      "Website Development",
      "Social Media Management",
      "Digital Marketing",
      "Branding",
      "SEO",
    ],
  };
}

export function OrganizationSchema() {
  return <JsonLd data={{ "@context": "https://schema.org", ...organizationNode() }} />;
}
