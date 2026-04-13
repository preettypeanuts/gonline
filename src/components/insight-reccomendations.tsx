import { getArticles } from "@/lib/googleSheets"
import { slugify } from "@/lib/slugify"
import Link from "next/link"
import SmartImage from "@/components/smart-image"
import { Article } from "@/types/article"
import { formatDate } from "@/lib/formatDateTime"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { link } from "fs/promises"
import { Title } from "./title"

interface InsightRecommendationsProps {
    /**
     * Topic categories to prioritize (e.g. ["Website Development", "SEO"]).
     * Articles matching these topics appear first regardless of highlight status.
     * If omitted, only featured (highlight=true) articles are shown.
     */
    topics?: string[]

    /**
     * Max total articles to display. Defaults to 6.
     */
    limit?: number

    /**
     * Exclude article slugs (e.g. current article page slug).
     */
    excludeSlugs?: string[]

    /**
     * Section heading. Defaults to "Insight Terbaru".
     */
    heading?: string
}

function ArticleCard({ article }: { article: Article }) {
    const categorySlug = slugify(article.category)

    return (
        <Link
            href={`/insight/${slugify(article.category)}/${article.slug}`}
            className="group relative rounded-main overflow-hidden"
        >
            <div className="absolute inset-0 flex items-center justify-center z-20 group-hover:translate-y-0 group-hover:opacity-100 opacity-0 transition-all duration-300 -translate-y-5 scale-95 group-hover:scale-100">
                <button
                    rel="noopener noreferrer"
                    className="cursor-pointer text-white font-medium text-3xl text-center p-10 w-fit h-fit rounded-main bg-darkColor dark:bg-lightColor dark:text-black hover:bg-darkColor/90 hover:dark:bg-lightColor/90 transition-colors duration-200"
                >
                    View
                </button>
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
                    <h1 className="font-bold text-xl">{article.title}</h1>
                    <div className="flex items-center justify-between">
                        <p className="text-thirdColor uppercase font-semibold text-xs">{article.category}</p>
                        <p className="font-semibold text-xs uppercase text-neutral-500">{formatDate(article.updatedAt)}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export async function InsightRecommendations({
    topics = [],
    limit = 6,
    excludeSlugs = [],
    heading = "Insight Terbaru",
}: InsightRecommendationsProps) {
    const allArticles = await getArticles()

    // Pool: exclude current page slugs
    const pool = allArticles.filter((a) => !excludeSlugs.includes(a.slug))

    let articles: Article[] = []

    if (topics.length > 0) {
        // Normalize topics for comparison
        const normalizedTopics = topics.map((t) => t.toLowerCase().trim())

        // Topic-matched articles first (any status, sorted newest first)
        const topicMatches = pool
            .filter((a) => normalizedTopics.includes(a.category.toLowerCase().trim()))
            .slice(0, limit)

        // Fill remaining slots with featured articles not already in topicMatches
        const topicSlugs = new Set(topicMatches.map((a) => a.slug))
        const featuredFill = pool
            .filter((a) => a.highlight && !topicSlugs.has(a.slug))
            .slice(0, limit - topicMatches.length)

        articles = [...topicMatches, ...featuredFill].slice(0, limit)
    } else {
        // No topics — only featured articles
        articles = pool.filter((a) => a.highlight).slice(0, limit)
    }

    if (articles.length === 0) return null

    return (
        <section className="spacing">
            {/* Header */}
            <div className="flex items-end justify-between mb-8 gap-4">
                    <div className="flex flex-col gap-1">

                        <Title className="font-bold text-2xl md:text-3xl text-neutral-900 dark:text-neutral-100">
                            {heading}
                        </Title>
                    </div>

                <Link
                    href={
                        topics.length === 1
                            ? `/insight?category=${slugify(topics[0])}`
                            : "/insight"
                    }
                    className="shrink-0 text-xs font-semibold text-thirdColor hover:underline underline-offset-4 transition-all"
                >
                    <Button
                        variant={"invert"}
                        className="right-margin"
                    >
                        Lihat semua <ArrowRight />
                    </Button>
                </Link>
            </div>

            {/* Grid */}
            <div className="margin grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {articles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                ))}
            </div>
        </section>
    )
}