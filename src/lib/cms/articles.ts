import { unstable_cache } from "next/cache";
import {
  CMS_API_URL,
  CMS_ARTICLES_REVALIDATE,
  CMS_BRAND_ID,
  CMS_PREVIEW_SECRET,
} from "@/config/cms";
import type {
  Article,
  ArticleCategory,
  ArticleSort,
  ArticleStatus,
  ArticlesListResult,
  ArticlesPagination,
} from "@/types/article";

type CmsArticleSummary = {
  id: string;
  brandId: string;
  title: string;
  slug: string;
  excerpt: string;
  status: ArticleStatus;
  authorName: string;
  authorImage?: string | null;
  category: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  highlighted: boolean;
  gallery: string[];
  thumbnail: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  content?: string;
};

type ApiPaginatedList<T> = {
  data: T[];
  meta: {
    pagination: ArticlesPagination;
  };
};

type ApiData<T> = { data: T };

export type ListArticlesParams = {
  page?: number;
  limit?: number;
  highlighted?: boolean;
  category?: string;
  tag?: string;
  q?: string;
  excludeSlug?: string;
  sort?: ArticleSort;
};

function mapArticle(
  raw: CmsArticleSummary,
  categoryLabel?: string,
): Article {
  const label = categoryLabel || raw.category;
  return {
    id: raw.id,
    brandId: raw.brandId,
    title: raw.title,
    slug: raw.slug,
    excerpt: raw.excerpt ?? "",
    content: raw.content ?? "",
    status: raw.status,
    authorName: raw.authorName ?? "",
    category: raw.category,
    categoryLabel: label,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    metaTitle: raw.metaTitle ?? "",
    metaDescription: raw.metaDescription ?? "",
    highlighted: Boolean(raw.highlighted),
    gallery: Array.isArray(raw.gallery) ? raw.gallery : [],
    thumbnail: raw.thumbnail ?? "",
    publishedAt: raw.publishedAt,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    highlight: Boolean(raw.highlighted),
    coverImage: raw.thumbnail ?? "",
  };
}

async function cmsFetch<T>(
  path: string,
  init?: RequestInit & { revalidate?: number | false },
): Promise<T | null> {
  const revalidate = init?.revalidate ?? CMS_ARTICLES_REVALIDATE;
  const { revalidate: _, ...rest } = init ?? {};

  try {
    const res = await fetch(`${CMS_API_URL}${path}`, {
      ...rest,
      headers: {
        Accept: "application/json",
        ...(rest.headers ?? {}),
      },
      next: revalidate === false ? { revalidate: 0 } : { revalidate },
    });

    if (!res.ok) {
      if (res.status !== 404) {
        console.error(`[cms] ${path} → ${res.status}`);
      }
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`[cms] ${path} failed`, error);
    return null;
  }
}

function buildQuery(
  params: Record<string, string | number | boolean | undefined | null>,
): string {
  const qs = new URLSearchParams();
  qs.set("brandId", CMS_BRAND_ID);
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    qs.set(key, String(value));
  }
  return qs.toString();
}

export async function listArticles(
  params: ListArticlesParams = {},
): Promise<ArticlesListResult> {
  const query = buildQuery({
    page: params.page ?? 1,
    limit: Math.min(params.limit ?? 20, 100),
    highlighted:
      params.highlighted === undefined ? undefined : params.highlighted,
    category: params.category,
    tag: params.tag,
    q: params.q,
    excludeSlug: params.excludeSlug,
    sort: params.sort ?? "publishedAt-desc",
  });

  const json = await cmsFetch<ApiPaginatedList<CmsArticleSummary>>(
    `/api/public/articles?${query}`,
  );

  if (!json?.data) {
    return {
      data: [],
      pagination: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        total: 0,
        totalPages: 0,
      },
    };
  }

  const categories = await getArticleCategories();
  const labelById = new Map(categories.map((c) => [c.id, c.label]));

  return {
    data: json.data.map((item) =>
      mapArticle(item, labelById.get(item.category)),
    ),
    pagination: json.meta.pagination,
  };
}

export async function getArticleBySlug(
  slug: string,
  options?: { preview?: boolean },
): Promise<Article | null> {
  const usePreview = Boolean(options?.preview && CMS_PREVIEW_SECRET);
  const query = buildQuery({
    preview: usePreview ? CMS_PREVIEW_SECRET : undefined,
  });

  const json = await cmsFetch<ApiData<CmsArticleSummary>>(
    `/api/public/articles/${encodeURIComponent(slug)}?${query}`,
    usePreview
      ? {
          revalidate: false,
          headers: {
            Authorization: `Bearer ${CMS_PREVIEW_SECRET}`,
          },
          cache: "no-store",
        }
      : undefined,
  );

  if (!json?.data) return null;

  const categories = await getArticleCategories();
  const label = categories.find((c) => c.id === json.data.category)?.label;
  return mapArticle(json.data, label);
}

export async function getRelatedArticles(
  slug: string,
  limit = 3,
): Promise<Article[]> {
  const query = buildQuery({
    limit: Math.min(Math.max(limit, 1), 100),
  });

  const json = await cmsFetch<ApiData<CmsArticleSummary[]>>(
    `/api/public/articles/${encodeURIComponent(slug)}/related?${query}`,
  );

  if (!json?.data?.length) return [];

  const categories = await getArticleCategories();
  const labelById = new Map(categories.map((c) => [c.id, c.label]));

  return json.data.map((item) => mapArticle(item, labelById.get(item.category)));
}

export const getArticleCategories = unstable_cache(
  async (): Promise<ArticleCategory[]> => {
    const json = await cmsFetch<ApiData<ArticleCategory[]>>(
      `/api/public/article-categories?${buildQuery({})}`,
    );
    return json?.data ?? [];
  },
  ["cms-article-categories", CMS_BRAND_ID],
  { revalidate: CMS_ARTICLES_REVALIDATE },
);

/** Convenience: all published summaries (paginated under the hood, max 100). */
export async function getArticles(options?: {
  highlighted?: boolean;
  category?: string;
  limit?: number;
}): Promise<Article[]> {
  const { data } = await listArticles({
    page: 1,
    limit: options?.limit ?? 100,
    highlighted: options?.highlighted,
    category: options?.category,
  });
  return data;
}

export async function getHighlightedArticles(limit = 6): Promise<Article[]> {
  const { data } = await listArticles({
    page: 1,
    limit,
    highlighted: true,
  });
  return data;
}
