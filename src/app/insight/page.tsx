import {
  getArticleCategories,
  getHighlightedArticles,
  listArticles,
} from "@/lib/cms/articles"
import { FeaturedInsight } from "@/components/featured-insight"
import { NewsCard } from "@/components/news-card"
import { InsightFilter } from "@/components/insight-fliter"
import type { Metadata } from "next"
import { BlogSchema } from "@/components/seo/blog-schema"
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema"
import { absoluteUrl, defaultOpenGraph, INDEXABLE_ROBOTS } from "@/config/seo"

const ITEMS_PER_PAGE = 9

interface Props {
  searchParams: Promise<{
    category?: string
    search?: string
    highlight?: string
    page?: string
    tag?: string
  }>
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { category, search, page, highlight } = await searchParams
  const categories = await getArticleCategories()
  const active = categories.find((c) => c.id === category)

  const title = active
    ? `Insight: ${active.label}`
    : "Insight & Artikel Digital Marketing"

  const description =
    "Temukan tips, strategi, dan insight terbaru seputar digital marketing, social media, dan pengembangan bisnis online dari tim GONLINE."

  const currentPage = Math.max(1, Number(page ?? 1))
  const hasNoIndexParams = Boolean(
    search || highlight === "true" || currentPage > 1,
  )

  const canonicalPath = category
    ? `/insight?category=${encodeURIComponent(category)}`
    : "/insight"

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
    },
    openGraph: defaultOpenGraph({
      title: `${title} | GONLINE`,
      description,
      url: absoluteUrl(canonicalPath),
    }),
    robots: hasNoIndexParams
      ? { index: false, follow: true }
      : INDEXABLE_ROBOTS,
  }
}

export default async function Insight({ searchParams }: Props) {
  const { category, search, highlight, page, tag } = await searchParams

  const currentPage = Math.max(1, Number(page ?? 1))
  const categories = await getArticleCategories()
  const activeCategory = categories.find((c) => c.id === category) ?? null

  const [{ data: paginated, pagination }, highlightedArticles] =
    await Promise.all([
      listArticles({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        category: category || undefined,
        q: search || undefined,
        tag: tag || undefined,
        highlighted: highlight === "true" ? true : undefined,
      }),
      getHighlightedArticles(8),
    ])

  return (
    <>
      <BlogSchema articles={paginated} />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Insight", path: "/insight" },
          ...(activeCategory
            ? [
                {
                  name: activeCategory.label,
                  path: `/insight?category=${activeCategory.id}`,
                },
              ]
            : []),
        ]}
      />
      <FeaturedInsight articles={highlightedArticles} />
      <InsightFilter
        categories={categories}
        activeCategory={category ?? null}
        activeSearch={search ?? ""}
        activeHighlight={highlight === "true"}
      />
      <NewsCard
        articles={paginated}
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        searchParams={{ category, search, highlight, page, tag }}
      />
    </>
  )
}
