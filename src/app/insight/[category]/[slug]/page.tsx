import { getArticles } from "@/lib/googleSheets"
import { slugify } from "@/lib/slugify"
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/formatDateTime"
import { Metadata } from "next"
import { ArticleRecommendations } from "@/components/article-reccomendations"
import SmartImage from "@/components/smart-image"

interface Props {
    params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category, slug } = await params
    const baseUrl = "https://gonline.id"
    const articles = await getArticles()
    const article = articles.find(
        (a) => slugify(a.category) === category && a.slug === slug
    )

    if (!article) return { title: "Artikel tidak ditemukan" }

    return {
        title: `${article.title} — GONLINE`,
        description: article.excerpt,
        alternates: {
            canonical: `${baseUrl}/insight/${category}/${slug}`,
        },
        openGraph: {
            title: article.title,
            description: article.excerpt,
            url: `${baseUrl}/insight/${category}/${slug}`,
            type: "article",
            publishedTime: article.createdAt,
            modifiedTime: article.updatedAt,
            tags: article.tags,
            images: [{ url: article.coverImage, width: 1200, height: 630, alt: article.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.excerpt,
            images: [article.coverImage],
        },
        robots: { index: true, follow: true },
    }
}

export default async function ArticleDetailPage({ params }: Props) {
    const { category, slug } = await params
    const articles = await getArticles()
    const article = articles.find(
        (a) => slugify(a.category) === category && a.slug === slug
    )

    // Guard dulu sebelum pakai article
    if (!article) notFound()

    const related = articles
        .filter((a) => a.category === article.category && a.slug !== article.slug)
        .slice(0, 5)

    const recommendations = related.length >= 5
        ? related
        : [
            ...related,
            ...articles
                .filter((a) => a.slug !== article.slug && !related.find((r) => r.slug === a.slug))
                .filter((a) => a.highlight)
                .slice(0, 5 - related.length),
        ]

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: article.title,
                        description: article.excerpt,
                        image: article.coverImage,
                        datePublished: article.createdAt,
                        dateModified: article.updatedAt,
                        author: {
                            "@type": "Organization",
                            name: "GONLINE",
                            url: "https://gonline.id",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "GONLINE",
                            url: "https://gonline.id",
                            logo: {
                                "@type": "ImageObject",
                                url: "https://gonline.id/icon.png",
                            },
                        },
                        mainEntityOfPage: {
                            "@type": "WebPage",
                            "@id": `https://gonline.id/insight/${slugify(article.category)}/${article.slug}`,
                        },
                        keywords: article.tags.join(", "),
                    }),
                }}
            />

            <main className="margin mt-4 md:mt-30 pb-10 max-w-4xl mx-4  md:mx-auto bg-white dark:bg-black rounded-main md:p-10 p-5">
                <div className="space-y-4 mb-8">
                    <p className="text-thirdColor uppercase font-semibold text-xs">{article.category}</p>
                    <h1 className="font-bold text-3xl md:text-4xl leading-tight">{article.title}</h1>
                    <p className="text-neutral-500 text-sm">{article.excerpt}</p>
                    <p className="font-semibold text-xs uppercase text-neutral-400">{formatDate(article.updatedAt)}</p>
                </div>

                <SmartImage
                    width={800}
                    height={450}
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full rounded-3xl object-cover aspect-video mb-8"
                />

                <div
                    className="prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-10">
                        {article.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-full text-xs font-semibold border border-neutral-200 dark:border-neutral-800 text-neutral-500"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

            </main>
            <ArticleRecommendations
                articles={recommendations}
                currentArticleSlug={article.slug}
            />
        </section>
    )
}