/** Client-side CMS click tracking via same-origin API routes. */

function fire(path: string): void {
  void fetch(path, { method: "GET", keepalive: true }).catch(() => {});
}

export function trackArticleClick(slug: string): void {
  if (!slug.trim()) return;
  fire(`/api/cms/articles/${encodeURIComponent(slug)}/click`);
}

export function trackPortfolioClick(id: string): void {
  if (!id.trim()) return;
  fire(`/api/cms/portfolio/${encodeURIComponent(id)}/click`);
}

export function trackActivityClick(id: string): void {
  if (!id.trim()) return;
  fire(`/api/cms/activities/${encodeURIComponent(id)}/click`);
}

/** CMS entity ids (portfolio, activities) are UUIDs. */
export function isTrackableCmsId(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    id,
  );
}
