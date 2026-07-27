import { unstable_cache } from "next/cache";
import {
  CMS_API_URL,
  CMS_ARTICLES_REVALIDATE,
  CMS_BRAND_ID,
} from "@/config/cms";
import type { WebWork } from "@/types/web-work";

export type PortfolioWorkType = "website" | "social-media";

export type CmsPortfolioSummary = {
  id: string;
  brandId: string;
  title: string;
  clientId: string;
  workType: PortfolioWorkType | string;
  coverImage: string;
  url: string;
  featured: boolean;
  clickCount: number;
  createdAt: string;
  updatedAt: string;
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

function workTypeLabel(workType: string): string {
  if (workType === "social-media") return "Instagram";
  return "Website";
}

export function mapPortfolioToWebWork(item: CmsPortfolioSummary): WebWork {
  return {
    id: item.id,
    status: true,
    link: item.url?.trim() || "#",
    category: workTypeLabel(item.workType),
    imagePreview: item.coverImage,
    companyName: item.title,
    brandName: item.title,
    features: [],
    kind: workTypeLabel(item.workType),
  };
}

async function fetchPortfolioList(
  workType?: PortfolioWorkType,
): Promise<CmsPortfolioSummary[]> {
  const qs = new URLSearchParams({
    brandId: CMS_BRAND_ID,
    page: "1",
    limit: "100",
  });
  if (workType) qs.set("workType", workType);

  try {
    const res = await fetch(
      `${CMS_API_URL}/api/public/portfolio?${qs.toString()}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: CMS_ARTICLES_REVALIDATE },
      },
    );
    if (res.status === 404) return [];
    if (!res.ok) {
      console.error(`[cms] portfolio list → ${res.status}`);
      return [];
    }
    const json = (await res.json()) as ApiPaginatedList<CmsPortfolioSummary>;
    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error("[cms] portfolio list failed", error);
    return [];
  }
}

export async function getPortfolioWorksByType(
  workType?: PortfolioWorkType,
): Promise<WebWork[]> {
  const items = await fetchPortfolioList(workType);
  return items.map(mapPortfolioToWebWork);
}

export const getPortfolioWorks = unstable_cache(
  async (): Promise<WebWork[]> => getPortfolioWorksByType(),
  ["cms-portfolio-all", CMS_BRAND_ID],
  { revalidate: CMS_ARTICLES_REVALIDATE },
);
