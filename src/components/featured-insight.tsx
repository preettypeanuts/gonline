import { Article } from "@/types/article"
import { formatDate } from "@/lib/formatDateTime"
import { slugify } from "@/lib/slugify"
import SmartImage from "./smart-image"

interface Props {
    articles: Article[]
}

export const FeaturedInsight = ({ articles }: Props) => {
    const first = articles[0]
    if (!first) return null

    return (
        <section className="margin mt-4 md:mt-23">
            <div className="grid grid-cols-1 md:grid-cols-10 gap-3">

                <a
                    href={`/insight/${slugify(first.category)}/${first.slug}`}
                    className="col-span-1 md:col-span-6">
                    <div className="bg-white dark:bg-black rounded-main w-full h-full hover:scale-[0.99] duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-950 relative">
                        <SmartImage
                            width={800}
                            height={450}
                            src={first.coverImage}
                            alt={first.title}
                            className="w-full object-cover rounded-t-3xl aspect-video"
                        />
                        {first.highlight && (
                            <div className="absolute top-3 left-3 bg-white dark:bg-black uppercase text-xs font-bold px-2 py-1 rounded-full">
                                Featured
                            </div>
                        )}
                        <div className="p-6 md:p-8 space-y-4 flex flex-col justify-between">
                            <h1 className="font-bold text-lg sm:text-xl md:text-2xl line-clamp-3">
                                {first.title}
                            </h1>
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                <p className="text-thirdColor uppercase font-semibold text-xs">{first.category}</p>
                                <p className="font-semibold text-xs uppercase text-neutral-500">{formatDate(first.updatedAt)}</p>
                            </div>
                        </div>
                    </div>
                </a>

                <div className="col-span-1 md:col-span-4 flex flex-col gap-3">
                    {articles.slice(1, 4).map((el, idx) => (
                        <a
                            href={`/insight/${slugify(el.category)}/${el.slug}`}
                            key={idx}
                            className="flex-1"
                        >
                            <div className="bg-white dark:bg-black rounded-main h-full flex flex-row hover:scale-[0.99] duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-950 overflow-hidden">
                                <div className="relative h-40 md:h-auto w-40 md:w-44 shrink-0">
                                    <SmartImage
                                        width={300}
                                        height={200}
                                        src={el.coverImage}
                                        alt={el.title}
                                        className="absolute inset-0 w-full h-full object-cover rounded-l-3xl"
                                    />
                                    {el.highlight && (
                                        <div className="absolute top-3 left-3 bg-white dark:bg-black uppercase text-xs font-bold px-2 py-1 rounded-full">
                                            Featured
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 md:p-6 space-y-3 flex flex-col justify-between grow min-w-0">
                                    <h2 className="font-bold text-sm sm:text-base md:text-sm lg:text-base line-clamp-3 leading-snug">
                                        {el.title}
                                    </h2>
                                    <div className="flex items-center justify-between gap-1 flex-wrap">
                                        <p className="text-thirdColor uppercase font-semibold text-[10px] sm:text-xs">{el.category}</p>
                                        <p className="font-semibold text-[10px] sm:text-xs uppercase text-neutral-500">{formatDate(el.updatedAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    )
}