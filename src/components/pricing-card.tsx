"use client"

import { WebsitePackages } from "@/app/data"
import { formatToRupiah } from "@/lib/formatRupiah"
import { usePathname } from "next/navigation"
import { useRef } from "react"
import { ChevronLeft, ChevronRight, Star, Check } from "lucide-react"
import { Button } from "./ui/button"
import { Title } from "./title"

function calculateDiscount(gimmick: number, fixed: number) {
    if (!gimmick || !fixed) return 0
    return Math.round(((gimmick - fixed) / gimmick) * 100)
}

export const PricingCard = () => {
    const path = usePathname()
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "prev" | "next") => {
        if (!scrollRef.current) return
        const amount = 380
        scrollRef.current.scrollBy({
            left: direction === "next" ? amount : -amount,
            behavior: "smooth",
        })
    }

    return (
        <section className="spacing space-y-8">

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <Title>Website Packages</Title>
                <div className="mr-4 md:mr-10 space-x-2">
                    <Button
                        size={"icon-lg"}
                        variant={"invert"}
                        aria-label="Scroll left"
                        onClick={() => scroll("prev")}
                    >
                        <ChevronLeft className="size-6" />
                    </Button>
                    <Button
                        size={"icon-lg"}
                        variant={"invert"}
                        aria-label="Scroll right"
                        onClick={() => scroll("next")}
                    >
                        <ChevronRight className="size-6" />
                    </Button>
                </div>
            </div>

            {/* SCROLL AREA */}
            <div
                ref={scrollRef}
                className="flex gap-5 overflow-x-scroll no-scrollbar py-16"
            >
                {WebsitePackages.map((el, idx) => {
                    const discount = calculateDiscount(
                        el.pricing.gimmick,
                        el.pricing.fixed
                    )
                    const isFavorite = el.favorite === true

                    return (
                        <div
                            key={idx}
                            className={`
                                min-w-85 relative 
                                flex flex-col
                                transition-all duration-300 ease-out
                                group

                                ${idx === 0 ? "ml-4 md:ml-10" : ""}
                                ${idx === WebsitePackages.length - 1 ? "mr-4 md:mr-10" : ""}

                            `}
                        >
                            {/* FAVORITE BADGE */}
                            {isFavorite && (
                                <div className="absolute -top-8.5">
                                    <div className="flex items-center gap-1.5 bg-white dark:bg-black dark:text-thirdColor text-mainColor text-xs font-bold px-4 pb-2 pt-2.5 rounded-t-secondary relative">
                                        <div className="rounded-out-br-lg bg-white dark:bg-black"></div>
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            {/* INNER CARD */}
                            <div className={`
                                flex flex-col h-full  p-8
                                ${isFavorite
                                    ? "bg-white rounded-b-main rounded-tr-main dark:bg-black"
                                    : "bg-white dark:bg-black rounded-main"
                                }
                            `}>

                                {/* PACKAGE NAME */}
                                <div className="flex items-center justify-between">
                                    <h1 className={`text-xl font-bold ${isFavorite ? "dark:text-thirdColor text-mainColor" : " "}`}>
                                        {el.name}
                                    </h1>
                                    {isFavorite && (
                                        <div className="size-8 rounded-full bg-mainColor/10 border border-mainColor/30 flex items-center justify-center">
                                            <Star className="size-4 dark:text-thirdColor dark:fill-thirdColor text-mainColor fill-mainColor" />
                                        </div>
                                    )}
                                </div>

                                {/* SEPARATOR */}
                                <div className={`mt-4 h-px w-full ${isFavorite ? "bg-mainColor/20 dark:bg-thirdColor/30" : " bg-neutral-200 dark:bg-neutral-800"}`} />

                                {/* GIMMICK + DISCOUNT */}
                                {/* <div className="flex items-center gap-3 mt-4">
                                    <h3 className="text-sm line-through text-neutral-500 min-h-5">
                                        {el.pricing.gimmick === 0
                                            ? null
                                            : formatToRupiah(el.pricing.gimmick)}
                                    </h3>
                                    {discount > 0 && (
                                        <p className={`
                                            font-semibold px-2.5 py-0.5 rounded-full text-xs bg-red-500/20 text-red-400 border border-red-500/30
                                         
                                        `}>
                                            -{discount}%
                                        </p>
                                    )}
                                </div> */}

                                {/* PRICE */}
                                <div className="mt-4 min-h-15 flex flex-col justify-center">
                                    {path === "/website-development" && el.pricing.fixed !== 0 && (
                                        <span className={`text-[10px] uppercase tracking-widest font-medium ${isFavorite ? "dark:text-thirdColor text-mainColor/70" : "text-neutral-500"}`}>
                                            Starting from
                                        </span>
                                    )}
                                    <h2 className={`font-extrabold text-3xl leading-tight ${isFavorite ? "text-darkColor dark:text-lightColor" : ""}`}>
                                        {el.pricing.fixed === 0
                                            ? "Talk With Us!"
                                            : formatToRupiah(el.pricing.fixed)}
                                    </h2>
                                </div>

                                {/* CTA */}


                                {/* FEATURES AREA */}
                                <div className={`p-6 rounded-secondary -m-6 flex flex-col justify-between bg-lightColor dark:bg-darkColor
                                    ${isFavorite ? "" : ""}
                                    mt-7 space-y-2.5 flex-1 
                                    `}>
                                    {el.deliverables?.map((feature: string, i: number) => (
                                        <div key={i} className="flex items-start gap-2.5">
                                            <div className={`
                                                mt-0.5 size-4 rounded-full shrink-0 flex items-center justify-center
                                                ${isFavorite
                                                    ? "bg-mainColor/20 dark:text-thirdColor text-mainColor"
                                                    : "bg-neutral-300 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400"
                                                }
                                            `}>
                                                <Check className="size-2.5" strokeWidth={3} />
                                            </div>
                                            <p className={`text-sm leading-snug ${isFavorite ? "text-neutral-700 dark:text-neutral-400" : "text-neutral-500"}`}>
                                                {feature}
                                            </p>
                                        </div>
                                    ))}
                                    <div className="mt-5">
                                        <button className={`
                                        w-full py-3 rounded-full font-semibold text-sm
                                        transition-all duration-200
                                        ${isFavorite
                                                ? `
                                                bg-darkColor text-white dark:bg-lightColor dark:text-black hover:invert
                                                active:scale-[0.98]
                                            `
                                                : `
                                                bg-black/5 dark:bg-white/10 text-black dark:text-white border border-black/10 dark:border-white/10
                                                hover:bg-white hover:text-black
                                                active:scale-[0.98]
                                            `
                                            }
                                    `}>
                                            {isFavorite ? "Get Started Now" : "Get Started"}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>

        </section>
    )
}