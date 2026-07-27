import { unstable_cache } from "next/cache";
import {
  CMS_API_URL,
  CMS_ARTICLES_REVALIDATE,
  CMS_BRAND_ID,
} from "@/config/cms";
import type { BannerSlide, CmsBanner } from "@/types/banner";

type ApiData<T> = { data: T };

/**
 * Fetch a public banner by placement key.
 * Returns null when 404 / inactive / banners feature disabled.
 */
export async function fetchBannerByKey(
  key: string,
  brandId: string = CMS_BRAND_ID,
): Promise<CmsBanner | null> {
  try {
    const qs = new URLSearchParams({ brandId });
    const res = await fetch(
      `${CMS_API_URL}/api/public/banners/by-key/${encodeURIComponent(key)}?${qs}`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: CMS_ARTICLES_REVALIDATE },
      },
    );

    if (!res.ok) return null;

    const json = (await res.json()) as ApiData<CmsBanner>;
    const banner = json.data;
    if (!banner || banner.isActive === false) return null;
    if (!Array.isArray(banner.images) || banner.images.length === 0) {
      return null;
    }

    return banner;
  } catch (error) {
    console.error(`[cms] banner "${key}" failed`, error);
    return null;
  }
}

/** Map CMS banner → slides (hide when no images). */
export function bannerToSlides(banner: CmsBanner | null): BannerSlide[] {
  if (!banner) return [];

  const href = (banner.redirectUrl ?? "").trim();

  return banner.images
    .map((image) => image?.trim())
    .filter((image): image is string => Boolean(image))
    .map((image) => ({ image, href }));
}

/**
 * Mega menu banner slides (`key=mega-menu`).
 * Cache key includes brandId + placement key.
 */
export const getMegaMenuBannerSlides = unstable_cache(
  async (): Promise<BannerSlide[]> => {
    const banner = await fetchBannerByKey("mega-menu", CMS_BRAND_ID);
    return bannerToSlides(banner);
  },
  ["cms-banner", CMS_BRAND_ID, "mega-menu"],
  { revalidate: CMS_ARTICLES_REVALIDATE },
);
