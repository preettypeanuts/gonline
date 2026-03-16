import { webWorks } from "@/app/data"
import Image from "next/image"
import Link from "next/link"

interface WebWorkCardsProps {
    items: typeof webWorks
}

export const WebWorkCards = ({ items }: WebWorkCardsProps) => {
    return (
        <>
            {items.map((el, idx) => (
                <div
                    key={idx}
                    className={`relative group shrink-0 overflow-hidden
                        ${idx === 0 ? "left-margin" : ""}
                        ${idx === items.length - 1 ? "right-margin" : ""}
                    `}
                >
                    <div className="absolute inset-0 flex items-center justify-center z-20 group-hover:translate-y-0 group-hover:opacity-100 opacity-0 transition-all duration-300 -translate-y-5 scale-95 group-hover:scale-100">
                        <Link href={el.link} className="text-white font-medium text-3xl text-center p-10 w-fit h-fit rounded-main bg-darkColor dark:bg-lightColor dark:text-black hover:bg-darkColor/90 hover:dark:bg-lightColor/90 transition-colors duration-200">
                            View
                        </Link>
                    </div>
                    <div className="absolute inset-0 w-full h-full rounded-main bg-lightColor/70 dark:bg-darkColor/70 z-10 opacity-0 group-hover:opacity-100 duration-200" />
                    <div className="min-w-90 max-w-90 md:max-w-120 h-full md:min-w-120 bg-white dark:bg-black rounded-main transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <Image width={500} height={300} src={el.imagePreview} alt={el.brandName} className="rounded-t-main w-full h-auto object-cover" />
                        <div className="p-5 sm:p-8 space-y-2">
                            <h2 className="font-bold text-lg sm:text-xl">{el.brandName}</h2>
                            <h3 className="text-thirdColor uppercase font-semibold text-xs">{el.category}</h3>
                            <div className="flex flex-wrap gap-1">
                                {el.features.map((feature, featureIdx) => (
                                    <h4 key={featureIdx} className="px-2 py-1 bg-darkColor w-fit rounded-full text-white dark:bg-lightColor dark:text-black text-xs font-medium">
                                        {feature}
                                    </h4>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}