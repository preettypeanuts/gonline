import { Article } from "@/types/article"
import { formatDate } from "@/lib/formatDateTime"
import { slugify } from "@/lib/slugify"
import Image from "next/image"
import Link from "next/link"
import SmartImage from "./smart-image"

interface Props {
    articles: Article[]
    currentPage: number
    totalPages: number
    searchParams: Record<string, string | undefined>
}

export const NewsCard = ({ articles, currentPage, totalPages, searchParams }: Props) => {
    return (
        <section className="margin">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {articles.map((el, idx) => (
                    <Link
                        key={idx}
                        href={`/insight/${slugify(el.category)}/${el.slug}`}
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
                                src={el.coverImage}
                                alt={el.title}
                                className="rounded-t-3xl object-cover w-full aspect-square"
                            />
                            {el.highlight && (
                                <div className="absolute top-3 left-3 bg-white dark:bg-black uppercase text-xs font-bold px-2 py-1 rounded-full">
                                    Featured
                                </div>
                            )}
                            <div className="m-8 space-y-5 flex flex-col justify-between grow">
                                <h1 className="font-bold text-xl">{el.title}</h1>
                                <div className="flex items-center justify-between">
                                    <p className="text-thirdColor uppercase font-semibold text-xs">{el.category}</p>
                                    <p className="font-semibold text-xs uppercase text-neutral-500">{formatDate(el.updatedAt)}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {totalPages > 1 && (
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    searchParams={searchParams}
                />
            )}
        </section>
    )
}

function PaginationControls({
    currentPage,
    totalPages,
    searchParams,
}: {
    currentPage: number
    totalPages: number
    searchParams: Record<string, string | undefined>
}) {
    const buildHref = (page: number) => {
        const params = new URLSearchParams()
        // Preserve semua filter params yang ada
        Object.entries(searchParams).forEach(([k, v]) => {
            if (v && k !== "page") params.set(k, v)
        })
        params.set("page", String(page))
        return `/insight?${params.toString()}`
    }

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div className="flex items-center justify-center gap-2 mt-10">
            {currentPage > 1 && (
                <Link
                    href={buildHref(currentPage - 1)}
                    className="h-11 px-5 rounded-full text-xs uppercase font-bold bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-colors flex items-center"
                >
                    Prev
                </Link>
            )}

            {pages.map((page) => (
                <Link
                    key={page}
                    href={buildHref(page)}
                    className={`
            h-11 w-11 rounded-full text-xs font-bold flex items-center justify-center transition-colors
            ${page === currentPage
                            ? "bg-black dark:bg-white text-white dark:text-black"
                            : "bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white"
                        }
          `}
                >
                    {page}
                </Link>
            ))}

            {currentPage < totalPages && (
                <Link
                    href={buildHref(currentPage + 1)}
                    className="h-11 px-5 rounded-full text-xs uppercase font-bold bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-colors flex items-center"
                >
                    Next
                </Link>
            )}
        </div>
    )
}