import { getArticles } from "@/lib/googleSheets"
import { slugToCategory } from "@/lib/slugify"
import { FeaturedInsight } from "@/components/featured-insight"
import { NewsCard } from "@/components/news-card"
import { InsightFilter } from "@/components/insight-fliter"

const ITEMS_PER_PAGE = 9

interface Props {
    searchParams: Promise<{
        category?: string
        search?: string
        highlight?: string
        page?: string
    }>
}

export default async function Insight({ searchParams }: Props) {
    const { category, search, highlight, page } = await searchParams

    const allArticles = await getArticles()
    const categories = ["All", ...Array.from(new Set(allArticles.map((a) => a.category)))]

    const activeCategoryLabel = category
        ? slugToCategory(category, categories)
        : null

    // Filter
    let filtered = [...allArticles]

    if (highlight === "true") {
        filtered = filtered.filter((a) => a.highlight)
    }

    if (activeCategoryLabel && activeCategoryLabel !== "All") {
        filtered = filtered.filter((a) => a.category === activeCategoryLabel)
    }

    if (search) {
        const q = search.toLowerCase()
        filtered = filtered.filter(
            (a) =>
                a.title.toLowerCase().includes(q) ||
                a.excerpt.toLowerCase().includes(q) ||
                a.tags.some((t) => t.toLowerCase().includes(q))
        )
    }

    // Pagination
    const currentPage = Math.max(1, Number(page ?? 1))
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
    const paginated = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    const highlightedArticles = allArticles.filter((a) => a.highlight)

    return (
        <>
            <FeaturedInsight articles={highlightedArticles} />
            <InsightFilter
                categories={categories}
                activeCategory={category ?? null}
                activeSearch={search ?? ""}
                activeHighlight={highlight === "true"}
            />
            <NewsCard
                articles={paginated}
                currentPage={currentPage}
                totalPages={totalPages}
                searchParams={{ category, search, highlight, page }}
            />
        </>
    )
}