import { Article } from "@/types/article"
import { formatDate } from "@/lib/formatDateTime"
import { slugify } from "@/lib/slugify"
import Image from "next/image"
import Link from "next/link"
import { ProblemScrollWrapper } from "./problem-scroll"
import { Title } from "./title"

interface Props {
    articles: Article[]
    currentArticleSlug: string
}

export const ArticleRecommendations = ({ articles, currentArticleSlug }: Props) => {
    const recommendations = articles
        .filter((a) => a.slug !== currentArticleSlug)
        .slice(0, 5)

    if (recommendations.length === 0) return null

    return (
        <section className="spacing">
            <ProblemScrollWrapper
            className="pr-60"
                scrollAmount={280}
                dynamicScroll
                title={<Title className="pl-73">Artikel Terkait</Title>}


            >
                <div className="flex gap-3 ">
                    {recommendations.map((el, idx) => (
                        <Link
                            key={idx}
                            href={`/insight/${slugify(el.category)}/${el.slug}`}
                            className={`shrink-0 w-56 min-w-85 ${idx === 0 ? "ml-4 md:ml-73" : ""} ${idx === recommendations.length - 1 ? "mr-4 md:mr-73" : ""}`}
                        >
                            <div className="relative bg-white dark:bg-black rounded-2xl h-full flex flex-col hover:scale-99 duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-950">
                                <Image
                                    width={300}
                                    height={300}
                                    src={el.coverImage}
                                    alt={el.title}
                                    className="rounded-t-2xl object-cover w-full aspect-square"
                                />
                                {el.highlight && (
                                    <div className="absolute top-2 left-2 bg-white dark:bg-black uppercase text-[10px] font-bold px-2 py-0.5 rounded-full">
                                        Featured
                                    </div>
                                )}
                                <div className="p-7 space-y-2 flex flex-col justify-between grow">
                                    <h3 className="font-bold leading-snug text-lg line-clamp-3">{el.title}</h3>
                                    <div className="flex flex-row justify-between gap-1 mt-5">
                                        <p className="text-thirdColor uppercase font-semibold text-xs">{el.category}</p>
                                        <p className="font-semibold text-xs uppercase text-neutral-400">{formatDate(el.updatedAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </ProblemScrollWrapper>
        </section>
    )
}