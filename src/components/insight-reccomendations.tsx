import {
  getArticleCategories,
  getArticles,
  getHighlightedArticles,
  listArticles,
} from "@/lib/cms/articles"
import Link from "next/link"
import SmartImage from "@/components/smart-image"
import type { Article } from "@/types/article"
import { articlePath } from "@/types/article"
import { formatDate } from "@/lib/formatDateTime"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { Title } from "./title"
import { TrackedArticleLink } from "./tracked-article-link"

interface InsightRecommendationsProps {
  /**
   * Category ids to prioritize (e.g. ["web-development", "social-media"]).
   * Also accepts labels (case-insensitive) which are resolved against CMS categories.
   */
  topics?: string[]
  limit?: number
  excludeSlugs?: string[]
  heading?: string
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <TrackedArticleLink
      slug={article.slug}
      href={articlePath(article)}
      className="group relative rounded-main overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center z-20 group-hover:translate-y-0 group-hover:opacity-100 opacity-0 transition-all duration-300 -translate-y-5 scale-95 group-hover:scale-100">
        <span className="cursor-pointer text-white font-medium text-3xl text-center p-10 w-fit h-fit rounded-main bg-darkColor dark:bg-lightColor dark:text-black hover:bg-darkColor/90 hover:dark:bg-lightColor/90 transition-colors duration-200">
          Lihat
        </span>
      </div>
      <div className="absolute inset-0 w-full h-full rounded-main bg-lightColor/70 dark:bg-darkColor/70 z-10 opacity-0 group-hover:opacity-100 duration-200" />

      <div className="relative bg-white dark:bg-black rounded-main h-full flex flex-col hover:scale-99 duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-950">
        <SmartImage
          width={500}
          height={300}
          src={article.coverImage}
          alt={article.title}
          className="rounded-t-3xl object-cover w-full aspect-square"
        />

        {article.highlight && (
          <div className="absolute top-3 left-3 bg-white dark:bg-black uppercase text-xs font-bold px-2 py-1 rounded-full">
            Featured
          </div>
        )}
        <div className="m-8 space-y-5 flex flex-col justify-between grow">
          <h3 className="font-bold text-xl">{article.title}</h3>
          <div className="flex items-center justify-between">
            <p className="text-thirdColor uppercase font-semibold text-xs">
              {article.categoryLabel || article.category}
            </p>
            <p className="font-semibold text-xs uppercase text-neutral-500">
              {formatDate(article.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </TrackedArticleLink>
  )
}

export async function InsightRecommendations({
  topics = [],
  limit = 6,
  excludeSlugs = [],
  heading = "Insight Terbaru",
}: InsightRecommendationsProps) {
  const categories = await getArticleCategories()
  const normalizedTopics = topics.map((t) => t.toLowerCase().trim())

  const topicCategoryIds = categories
    .filter(
      (c) =>
        normalizedTopics.includes(c.id.toLowerCase()) ||
        normalizedTopics.includes(c.label.toLowerCase()),
    )
    .map((c) => c.id)

  let articles: Article[] = []

  if (topicCategoryIds.length > 0) {
    const topicResults = await Promise.all(
      topicCategoryIds.map((categoryId) =>
        listArticles({ page: 1, limit, category: categoryId }),
      ),
    )
    const merged = topicResults.flatMap((r) => r.data)
    const seen = new Set<string>()
    const topicMatches: Article[] = []
    for (const article of merged) {
      if (excludeSlugs.includes(article.slug) || seen.has(article.slug)) continue
      seen.add(article.slug)
      topicMatches.push(article)
      if (topicMatches.length >= limit) break
    }

    if (topicMatches.length < limit) {
      const featured = await getHighlightedArticles(limit)
      for (const article of featured) {
        if (excludeSlugs.includes(article.slug) || seen.has(article.slug)) continue
        topicMatches.push(article)
        seen.add(article.slug)
        if (topicMatches.length >= limit) break
      }
    }

    articles = topicMatches
  } else {
    const featured = await getHighlightedArticles(limit + excludeSlugs.length)
    articles = featured
      .filter((a) => !excludeSlugs.includes(a.slug))
      .slice(0, limit)

    if (articles.length === 0) {
      const fallback = await getArticles({ limit })
      articles = fallback
        .filter((a) => !excludeSlugs.includes(a.slug))
        .slice(0, limit)
    }
  }

  if (articles.length === 0) return null

  const href =
    topicCategoryIds.length === 1
      ? `/insight?category=${topicCategoryIds[0]}`
      : "/insight"

  return (
    <section className="spacing">
      <div className="flex items-end justify-between mb-8 gap-4">
        <div className="flex flex-col gap-1">
          <Title className="font-bold text-2xl md:text-3xl text-neutral-900 dark:text-neutral-100">
            {heading}
          </Title>
        </div>

        <Link
          href={href}
          className="shrink-0 text-xs font-semibold text-thirdColor hover:underline underline-offset-4 transition-all"
        >
          <Button variant={"invert"} className="right-margin">
            Lihat semua <ArrowRight />
          </Button>
        </Link>
      </div>

      <div className="margin grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
