"use client"

import { dataClientSocmed } from "@/app/data"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"

export const SocmedWork = () => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isAtStart, setIsAtStart] = useState(true)
    const [isAtEnd, setIsAtEnd] = useState(false)

    const checkScrollPosition = () => {
        if (!scrollRef.current) return
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        setIsAtStart(scrollLeft <= 0)
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1)
    }

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        checkScrollPosition()
        el.addEventListener("scroll", checkScrollPosition)
        window.addEventListener("resize", checkScrollPosition)
        return () => {
            el.removeEventListener("scroll", checkScrollPosition)
            window.removeEventListener("resize", checkScrollPosition)
        }
    }, [])

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return
        const cardWidth = scrollRef.current.querySelector("div.shrink-0")?.clientWidth ?? 320
        const gap = 12
        const scrollAmount = cardWidth + gap * 70

        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        })
    }

    return (
        <section className="spacing">
            <div className="flex justify-between flex-col md:flex-row gap-3 md:gap-0">
                {/* Left heading */}
                <div className="pl-10 py-3 pr-3 rounded-r-3xl bg-black dark:bg-white dark:text-black text-white relative w-fit">
                    <div className="rounded-out-lt-3xl bg-darkColor dark:bg-lightColor"></div>
                    <div className="rounded-out-lb-3xl bg-darkColor dark:bg-lightColor"></div>
                    <h1 className="text-2xl sm:text-3xl font-bold">
                        Our Socmed <span className="text-thirdColor dark:text-mainColor">Work</span>
                    </h1>
                </div>

                {/* Right nav buttons */}
                <div className="hidden self-end md:self-auto pr-10 py-3 rounded-l-3xl relative w-fit md:flex items-center gap-2">
                    <div className="rounded-out-rt-3xl"></div>
                    <div className="rounded-out-rb-3xl"></div>
                    <Button
                        size={"icon-lg"}
                        variant={"invert"}
                        onClick={() => scroll("left")}
                        aria-label="Scroll left"
                        disabled={isAtStart}
                        className={`transition-all duration-300 ${isAtStart ? "opacity-30 scale-90 cursor-not-allowed" : "opacity-100 scale-100"}`}
                    >
                        <ChevronLeft className="size-6" />
                    </Button>
                    <Button
                        size={"icon-lg"}
                        variant={"invert"}
                        onClick={() => scroll("right")}
                        aria-label="Scroll right"
                        disabled={isAtEnd}
                        className={`transition-all duration-300 ${isAtEnd ? "opacity-30 scale-90 cursor-not-allowed" : "opacity-100 scale-100"}`}
                    >
                        <ChevronRight className="size-6" />
                    </Button>
                </div>
            </div>

            {/* Scrollable cards */}
            <div
                ref={scrollRef}
                className="overflow-x-scroll w-full py-10 no-scrollbar flex gap-5 scroll-smooth"
            >
                {dataClientSocmed.map((el, idx) => (
                    <div
                        key={idx}
                        className={`relative group shrink-0 overflow-hidden ${idx === 0 ? "ml-4 md:ml-10" : ""} ${idx === dataClientSocmed.length - 1 ? "mr-4 md:mr-10" : ""}`}
                    >
                        {/* Hover overlay */}
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
                        <div className="absolute inset-0 w-full h-full rounded-main bg-lightColor/70 dark:bg-darkColor/70 z-10 opacity-0 group-hover:opacity-100 duration-200"></div>

                        {/* Card — width follows 4:5 aspect ratio at fixed height */}
                        <div className="bg-white dark:bg-black rounded-main transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden">
                            <div className="w-64 md:w-80">
                                <div className="relative w-full aspect-4/5">
                                    <Image
                                        fill
                                        src={el.preview}
                                        alt={`${el.brandName} preview`}
                                        className="object-cover"
                                        sizes="(max-width: 768px) 256px, 320px"
                                    />
                                </div>
                                <div className="p-4 sm:p-5 space-y-1">
                                    <h1 className="font-bold text-base sm:text-lg">
                                        {el.brandName}
                                    </h1>
                                    <p className="text-thirdColor font-semibold text-xs">
                                        {el.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <a href="/our-work/socmed" className="block text-center">
                <Button
                    variant="invert"
                    className="mx-auto mt-4"
                >
                    View All
                </Button>
            </a>
        </section>
    )
}