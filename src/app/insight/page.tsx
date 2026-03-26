import { getArticles } from "@/lib/googleSheets"
import { slugToCategory } from "@/lib/slugify"
import { FeaturedInsight } from "@/components/featured-insight"
import { NewsCard } from "@/components/news-card"
import { InsightFilter } from "@/components/insight-fliter"
import type { Metadata } from "next"
import { BlogSchema } from "@/components/seo/blog-schema"


const ITEMS_PER_PAGE = 9

interface Props {
    searchParams: Promise<{
        category?: string
        search?: string
        highlight?: string
        page?: string
    }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { category, search, page } = await searchParams
    const baseUrl = "https://gonline.id"

    const title = category
        ? `Insight: ${category.replace(/-/g, " ")} — GONLINE`
        : "Insight & Artikel Digital Marketing — GONLINE"

    const description = "Temukan tips, strategi, dan insight terbaru seputar digital marketing, social media, dan pengembangan bisnis online dari tim GONLINE."

    const currentPage = Number(page ?? 1)

    return {
        title,
        description,
        alternates: {
            canonical: category
                ? `${baseUrl}/insight?category=${category}`
                : `${baseUrl}/insight`,
        },
        openGraph: {
            title,
            description,
            url: `${baseUrl}/insight`,
            type: "website",
        },
        // Halaman filter/search/pagination tidak perlu diindex
        robots: search || (currentPage > 1)
            ? { index: false, follow: true }
            : { index: true, follow: true },
    }
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

    const canonicalUrl =
        currentPage === 1
            ? "/insight"
            : `/insight?page=${currentPage}`

    const highlightedArticles = allArticles.filter((a) => a.highlight)

    return (
        <>
            <BlogSchema articles={paginated} />
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