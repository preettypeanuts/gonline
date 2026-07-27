import { CMS_API_URL, CMS_BRAND_ID } from "@/config/cms";

/** Fire-and-forget CMS click — never throws. */
async function hitClick(path: string): Promise<void> {
  try {
    await fetch(`${CMS_API_URL}${path}`, {
      method: "GET",
      cache: "no-store",
    });
  } catch (error) {
    console.error("[cms] click failed", path, error);
  }
}

/** Articles — only increments when article is published (CMS-side rule). */
export async function recordArticleClick(slug: string): Promise<void> {
  const qs = new URLSearchParams({ brandId: CMS_BRAND_ID });
  await hitClick(
    `/api/public/articles/${encodeURIComponent(slug)}/click?${qs}`,
  );
}

export async function recordPortfolioClick(id: string): Promise<void> {
  const qs = new URLSearchParams({ brandId: CMS_BRAND_ID });
  await hitClick(
    `/api/public/portfolio/${encodeURIComponent(id)}/click?${qs}`,
  );
}

export async function recordActivityClick(id: string): Promise<void> {
  const qs = new URLSearchParams({ brandId: CMS_BRAND_ID });
  await hitClick(
    `/api/public/activities/${encodeURIComponent(id)}/click?${qs}`,
  );
}
