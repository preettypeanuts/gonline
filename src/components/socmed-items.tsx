import { dataClientSocmed } from "@/app/data"
import Image from "next/image"
import Link from "next/link"
import SmartImage from "./smart-image"

interface SocmedItem {
    preview: string
    brandName: string
    name: string
    link: string
    package: string
}

interface SocmedItemsProps {
    items: SocmedItem[]
}

export const SocmedItems = ({ items }: SocmedItemsProps) => {
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
                        <Link
                            href={el.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white font-medium text-3xl text-center p-10 w-fit h-fit rounded-main bg-darkColor dark:bg-lightColor dark:text-black hover:bg-darkColor/90 hover:dark:bg-lightColor/90 transition-colors duration-200"
                        >
                            View
                        </Link>
                    </div>
                    <div className="absolute inset-0 w-full h-full rounded-main bg-lightColor/70 dark:bg-darkColor/70 z-10 opacity-0 group-hover:opacity-100 duration-200" />

                    <div className="bg-white dark:bg-black rounded-main transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden">
                        <div className="w-64 md:w-80">
                            <div className="relative w-full aspect-4/5">
                                <SmartImage
                                    fill
                                    src={el.preview}
                                    alt={`${el.brandName} preview`}
                                    className="object-cover"
                                    sizes="(max-width: 768px) 256px, 320px"
                                />
                            </div>
                            <div className="p-4 sm:p-5 space-y-1">
                                <h1 className="font-bold text-base sm:text-lg">{el.brandName}</h1>
                                <p className="text-thirdColor font-semibold text-xs">{el.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}