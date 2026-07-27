import { unstable_cache } from "next/cache";
import {
  CMS_API_URL,
  CMS_ARTICLES_REVALIDATE,
  CMS_BRAND_ID,
} from "@/config/cms";
import type {
  LocaleCode,
  LocalizedText,
  Price,
  PriceCategory,
  PriceServiceSlug,
  PriceSummary,
} from "@/types/price";
import type { PricingPackage } from "@/types/pricing-package";

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

type ApiData<T> = { data: T };

type BrandPublic = {
  id: string;
  features?: string[];
};

const DEFAULT_LOCALE: LocaleCode = "id";

function pickLocale(
  text: LocalizedText | null | undefined,
  locale: LocaleCode = DEFAULT_LOCALE,
): string {
  if (!text || typeof text !== "object") return "";
  return (
    text[locale]?.trim() ||
    text.id?.trim() ||
    text.en?.trim() ||
    text.zh?.trim() ||
    ""
  );
}

async function brandHasPrices(): Promise<boolean> {
  try {
    const res = await fetch(
      `${CMS_API_URL}/api/public/brands/${encodeURIComponent(CMS_BRAND_ID)}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: CMS_ARTICLES_REVALIDATE },
      },
    );
    if (!res.ok) return false;
    const json = (await res.json()) as ApiData<BrandPublic>;
    const features = json.data?.features;
    return Array.isArray(features) && features.includes("prices");
  } catch (error) {
    console.error("[cms] brand features failed", error);
    return false;
  }
}

async function fetchPriceSummaries(
  serviceSlug: PriceServiceSlug,
): Promise<PriceSummary[]> {
  const qs = new URLSearchParams({
    brandId: CMS_BRAND_ID,
    serviceSlug,
    page: "1",
    limit: "100",
    sort: "price-asc",
  });

  try {
    const res = await fetch(
      `${CMS_API_URL}/api/public/prices?${qs.toString()}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: CMS_ARTICLES_REVALIDATE },
      },
    );
    if (res.status === 404) return [];
    if (!res.ok) {
      console.error(`[cms] prices list → ${res.status}`);
      return [];
    }
    const json = (await res.json()) as ApiPaginatedList<PriceSummary>;
    return Array.isArray(json.data)
      ? json.data.filter((p) => p.isActive !== false)
      : [];
  } catch (error) {
    console.error("[cms] prices list failed", error);
    return [];
  }
}

async function fetchPriceBySlug(slug: string): Promise<Price | null> {
  const qs = new URLSearchParams({ brandId: CMS_BRAND_ID });
  try {
    const res = await fetch(
      `${CMS_API_URL}/api/public/prices/${encodeURIComponent(slug)}?${qs}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: CMS_ARTICLES_REVALIDATE },
      },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as ApiData<Price>;
    const price = json.data;
    if (!price || price.isActive === false) return null;
    return price;
  } catch (error) {
    console.error(`[cms] price "${slug}" failed`, error);
    return null;
  }
}

export function mapPriceToPackage(price: Price): PricingPackage {
  return {
    name: pickLocale(price.packageName),
    favorite: Boolean(price.highlighted),
    pricing: {
      fixed: Number(price.price) || 0,
      gimmick: Number(price.strikethroughPrice) || 0,
    },
    deliverables: (price.features ?? [])
      .map((f) => pickLocale(f.name))
      .filter(Boolean),
    whatsappPhone: price.whatsappPhone?.trim() || undefined,
    whatsappMessage: pickLocale(price.whatsappMessage) || undefined,
  };
}

/**
 * Full pricing packages for a service page (detail fetch for features + WA copy).
 * Returns [] when brand lacks `prices` or API is empty/404 — hide pricing UI.
 */
export function getPricingPackages(serviceSlug: PriceServiceSlug) {
  return unstable_cache(
    async (): Promise<PricingPackage[]> => {
      const enabled = await brandHasPrices();
      if (!enabled) return [];

      const summaries = await fetchPriceSummaries(serviceSlug);
      if (summaries.length === 0) return [];

      const details = await Promise.all(
        summaries.map((item) => fetchPriceBySlug(item.slug)),
      );

      const packages = details
        .filter((item): item is Price => item !== null)
        .map(mapPriceToPackage);

      return packages;
    },
    ["cms-prices", CMS_BRAND_ID, serviceSlug],
    { revalidate: CMS_ARTICLES_REVALIDATE },
  )();
}

export function getPriceCategories() {
  return unstable_cache(
    async (): Promise<PriceCategory[]> => {
      const enabled = await brandHasPrices();
      if (!enabled) return [];

      const qs = new URLSearchParams({
        brandId: CMS_BRAND_ID,
        sort: "label-asc",
      });

      try {
        const res = await fetch(
          `${CMS_API_URL}/api/public/price-categories?${qs}`,
          {
            headers: { Accept: "application/json" },
            next: { revalidate: CMS_ARTICLES_REVALIDATE },
          },
        );
        if (!res.ok) return [];
        const json = (await res.json()) as ApiData<PriceCategory[]> | ApiPaginatedList<PriceCategory>;
        const data = Array.isArray(json.data) ? json.data : [];
        return data;
      } catch (error) {
        console.error("[cms] price-categories failed", error);
        return [];
      }
    },
    ["cms-price-categories", CMS_BRAND_ID],
    { revalidate: CMS_ARTICLES_REVALIDATE },
  )();
}
