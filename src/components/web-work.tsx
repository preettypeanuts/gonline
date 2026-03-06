"use client"

import { webWorks } from "@/app/data"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"

export const WebWork = () => {
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
        const cardWidth = scrollRef.current.querySelector("a")?.offsetWidth ?? 320
        const gap = 12
        const scrollAmount = cardWidth + gap

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
                        Our Web <span className="text-thirdColor dark:text-mainColor">Work</span>
                    </h1>
                </div>

                {/* Right nav buttons */}
                <div className="hidden self-end md:self-auto pr-10 py-3 rounded-l-3xl bg-black dark:bg-white relative w-fit md:flex items-center gap-2">
                    <div className="rounded-out-rt-3xl bg-black dark:bg-white"></div>
                    <div className="rounded-out-rb-3xl bg-black dark:bg-white"></div>
                    <Button
                        size={"icon-lg"}
                        onClick={() => scroll("left")}
                        aria-label="Scroll left"
                        disabled={isAtStart}
                        className={`transition-all duration-300 ${isAtStart ? "opacity-30 scale-90 cursor-not-allowed" : "opacity-100 scale-100"}`}
                    >
                        <ChevronLeft className="size-6" />
                    </Button>
                    <Button
                        size={"icon-lg"}
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
                className="overflow-x-scroll w-full py-10 no-scrollbar flex gap-3 scroll-smooth"
            >
                {webWorks.map((el, idx) => (
                    <div
                        key={idx}
                        className={`relative group shrink-0 overflow-hidden ${idx === 0 ? "ml-4 md:ml-10" : ""} ${idx === webWorks.length - 1 ? "mr-4 md:mr-10" : ""}`}
                    >
                        <div className="absolute inset-0 flex items-center justify-center z-20 group-hover:translate-y-0 group-hover:opacity-100 opacity-0 transition-all duration-300 -translate-y-5 scale-95 group-hover:scale-100">
                            <Link href={el.link} className="text-white font-medium text-3xl text-center p-10 w-fit h-fit rounded-main bg-darkColor dark:bg-lightColor dark:text-black hover:bg-darkColor/90 hover:dark:bg-lightColor/90 transition-colors duration-200">
                                View
                            </Link>
                        </div>
                        <div className="absolute inset-0 w-full h-full rounded-main bg-lightColor/40 dark:bg-darkColor/40 z-10 backdrop-blur-min opacity-0 group-hover:opacity-100 duration-200"></div>
                        <div className="min-w-90 max-w-90 md:max-w-120 h-full md:min-w-120 bg-white dark:bg-black rounded-main transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <Image
                                width={500}
                                height={300}
                                src={el.imagePreview}
                                alt={el.brandName}
                                className="rounded-t-3xl w-full h-auto object-cover"
                            />
                            <div className="p-5 sm:p-8 space-y-2">
                                <h1 className="font-bold text-lg sm:text-xl">
                                    {el.brandName}
                                </h1>
                                <p className="text-thirdColor uppercase font-semibold text-xs">
                                    {el.category}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {el.features.map((feature, featureIdx) => (
                                        <p
                                            key={featureIdx}
                                            className="px-2 py-1 bg-darkColor w-fit rounded-full text-white dark:bg-lightColor dark:text-black text-xs font-medium"
                                        >
                                            {feature}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <a href="/our-work/website" className="block text-center">
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