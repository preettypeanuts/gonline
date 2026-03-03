import { dataArticles } from "@/app/data"
import { formatDate } from "@/lib/formatDateTime"
import Image from "next/image"

export const NewsCard = () => {


    return (
        <section className="margin">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {dataArticles.map((el, idx) => (
                    <a
                        key={idx}
                        href=""
                        className=""
                    >
                        <div className="relative bg-white dark:bg-black rounded-3xl h-full flex flex-col hover:scale-99 duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-950">
                            <Image
                                width={500}
                                height={300}
                                src={el.thumbnail}
                                alt={el.title}
                                className="rounded-t-3xl object-cover w-full aspect-square"
                            />
                            {el.highlight && (
                                <div className="absolute top-3 left-3 bg-white dark:bg-black uppercase text-xs font-bold px-2 py-1 rounded-full">
                                    Featured
                                </div>
                            )}
                            <div className="m-8 space-y-5 flex flex-col justify-between grow">
                                <h1 className="font-bold text-xl">
                                    {el.title}
                                </h1>

                                <div className="flex items-center justify-between">
                                    <p className="text-thirdColor uppercase font-semibold text-xs">
                                        {el.category}
                                    </p>
                                    <p className="font-semibold text-xs uppercase text-neutral-500">
                                        {formatDate(el.updatedAt)}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </a>
                ))}
            </div>

        </section>
    )
}