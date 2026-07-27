/**
 * CMS public API config (server-side).
 * Brand must have the `articles` feature enabled on the CMS.
 */
export const CMS_API_URL = (
  process.env.CMS_API_URL ?? "https://cms.gonline.id"
).replace(/\/$/, "");

export const CMS_BRAND_ID = process.env.CMS_BRAND_ID ?? "gonline";

/** Server-only preview secret — never import into client components. */
export const CMS_PREVIEW_SECRET = process.env.CMS_PREVIEW_SECRET ?? "";

export const CMS_ARTICLES_REVALIDATE = Number(
  process.env.CMS_ARTICLES_REVALIDATE ?? 60,
);
