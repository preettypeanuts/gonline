import { getArticles } from "@/lib/googleSheets"
import { slugify } from "@/lib/slugify"
import { notFound } from "next/navigation"
import Image from "next/image"
import { formatDate } from "@/lib/formatDateTime"

interface Props {
    params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata({ params }: Props) {
    const { category, slug } = await params
    const articles = await getArticles()
    const article = articles.find(
        (a) => slugify(a.category) === category && a.slug === slug
    )
    if (!article) return {}
    return {
        title: article.title,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            images: [article.coverImage],
        },
    }
}

export default async function ArticleDetailPage({ params }: Props) {
    const { category, slug } = await params
    const articles = await getArticles()
    const article = articles.find(
        (a) => slugify(a.category) === category && a.slug === slug
    )

    if (!article) notFound()

    return (
        <section className="">
            <main className="margin mt-22 pb-10 max-w-4xl mx-auto bg-white dark:bg-black rounded-main p-10">
                <div className="space-y-4 mb-8">
                    <p className="text-thirdColor uppercase font-semibold text-xs">{article.category}</p>
                    <h1 className="font-bold text-3xl md:text-4xl leading-tight">{article.title}</h1>
                    <p className="text-neutral-500 text-sm">{article.excerpt}</p>
                    <p className="font-semibold text-xs uppercase text-neutral-400">{formatDate(article.updatedAt)}</p>
                </div>

                <Image
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
        </section>
    )
}