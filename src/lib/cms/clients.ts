import { unstable_cache } from "next/cache";
import {
  CMS_API_URL,
  CMS_ARTICLES_REVALIDATE,
  CMS_BRAND_ID,
} from "@/config/cms";

export type CmsClient = {
  id: string;
  brandId: string;
  name: string;
  /** Company logo only — never portfolio cover/preview. Empty string when unset. */
  logo: string | null;
  /** Redirect target from CMS (e.g. WhatsApp chat URL). Used as-is. */
  website: string | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ClientLogo = {
  id: string;
  companyName: string;
  companyLogo: string;
  /** CMS `website` URL as-is (expected: WA chat link). */
  href?: string;
  featured: boolean;
};

type ApiPaginatedList<T> = {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};

/**
 * Logo wall uses `client.logo` only.
 * Do not fall back to portfolio `coverImage` — that is a different API field.
 *
 * Matches CMS upload path: Cloudinary `…/company_logos/…`
 */
export function isCompanyLogoIcon(url: string | null | undefined): boolean {
  if (!url || typeof url !== "string") return false;
  const logo = url.trim();
  if (!logo) return false;

  let pathname = logo;
  try {
    pathname = new URL(logo).pathname;
  } catch {
    // relative / raw path
  }

  const path = pathname.toLowerCase();
  return (
    path.includes("/company_logos/") || path.includes("/company-logos/")
  );
}

function mapClientLogo(client: CmsClient): ClientLogo | null {
  const logo = (client.logo ?? "").trim();
  // Empty logo → skip. Never substitute portfolio coverImage.
  if (!logo || !isCompanyLogoIcon(logo)) return null;

  return {
    id: client.id,
    companyName: client.name,
    companyLogo: logo,
    href: client.website?.trim() || undefined,
    featured: Boolean(client.featured),
  };
}

async function fetchCmsClients(limit = 100): Promise<CmsClient[]> {
  const qs = new URLSearchParams({
    brandId: CMS_BRAND_ID,
    page: "1",
    limit: String(Math.min(Math.max(limit, 1), 100)),
  });

  try {
    const res = await fetch(
      `${CMS_API_URL}/api/public/clients?${qs.toString()}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: CMS_ARTICLES_REVALIDATE },
      },
    );
    if (!res.ok) {
      console.error(`[cms] clients → ${res.status}`);
      return [];
    }
    const json = (await res.json()) as ApiPaginatedList<CmsClient>;
    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error("[cms] clients failed", error);
    return [];
  }
}

/**
 * Marquee logos from `/api/public/clients` — `logo` field only.
 * Portfolio covers live on `/api/public/portfolio` (`coverImage`) and are unused here.
 */
export const getClientLogos = unstable_cache(
  async (): Promise<ClientLogo[]> => {
    const clients = await fetchCmsClients(100);
    const logos = clients
      .map(mapClientLogo)
      .filter((item): item is ClientLogo => item !== null);

    return logos.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.companyName.localeCompare(b.companyName);
    });
  },
  // bump key after API logo cleanup so stale porto URLs are not served
  ["cms-client-logos-v3", CMS_BRAND_ID],
  { revalidate: CMS_ARTICLES_REVALIDATE },
);
