export type ArticleStatus = "draft" | "scheduled" | "published" | "archived";

export type ArticleCategory = {
  id: string;
  label: string;
  source: "built-in" | "custom";
};

export type ArticleSort =
  | "publishedAt-desc"
  | "publishedAt-asc"
  | "title-asc"
  | "title-desc"
  | "updatedAt-desc";

/** Frontend article model (mapped from CMS public API). */
export type Article = {
  id: string;
  brandId: string;
  title: string;
  slug: string;
  excerpt: string;
  /** HTML body — empty string on list/summary payloads. */
  content: string;
  status: ArticleStatus;
  authorName: string;
  /** Category id from CMS (e.g. `web-development`). */
  category: string;
  /** Human label when categories were resolved. */
  categoryLabel: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  highlighted: boolean;
  gallery: string[];
  thumbnail: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  /** Alias of `highlighted` for existing UI. */
  highlight: boolean;
  /** Alias of `thumbnail` for existing UI. */
  coverImage: string;
};

export type ArticlesPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ArticlesListResult = {
  data: Article[];
  pagination: ArticlesPagination;
};

export function articlePath(
  article: Pick<Article, "category" | "slug">,
): string {
  return `/insight/${article.category}/${article.slug}`;
}

export function articleDate(article: Pick<Article, "publishedAt" | "updatedAt" | "createdAt">): string {
  return article.publishedAt || article.updatedAt || article.createdAt;
}
