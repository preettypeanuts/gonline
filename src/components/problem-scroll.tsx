"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { useRef, useState, useEffect } from "react"

interface ProblemScrollWrapperProps {
    title: React.ReactNode
    children: React.ReactNode
    scrollAmount?: number
    dynamicScroll?: boolean
    className?: string
}

export const ProblemScrollWrapper = ({
    title,
    children,
    className,
    scrollAmount = 380,
    dynamicScroll = false,
}: ProblemScrollWrapperProps) => {
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
        const amount = dynamicScroll
            ? (scrollRef.current.querySelector<HTMLElement>("div.shrink-0")?.clientWidth ?? scrollAmount) + 20
            : scrollAmount
        scrollRef.current.scrollBy({
            left: direction === "right" ? amount : -amount,
            behavior: "smooth",
        })
    }

    return (
        <>
            <div className="flex items-center justify-between">
                {title}
                <div className={`${className} mr-4 md:mr-10 space-x-2`}>
                    <Button
                        size={"icon-lg"}
                        variant={"invert"}
                        aria-label="Scroll left"
                        onClick={() => scroll("left")}
                        disabled={isAtStart}
                        className={`transition-all duration-300 ${isAtStart ? "opacity-30 scale-90 cursor-not-allowed" : "opacity-100 scale-100"}`}
                    >
                        <ChevronLeft className="size-6" />
                    </Button>
                    <Button
                        size={"icon-lg"}
                        variant={"invert"}
                        aria-label="Scroll right"
                        onClick={() => scroll("right")}
                        disabled={isAtEnd}
                        className={`transition-all duration-300 ${isAtEnd ? "opacity-30 scale-90 cursor-not-allowed" : "opacity-100 scale-100"}`}
                    >
                        <ChevronRight className="size-6" />
                    </Button>
                </div>
            </div>

            <div ref={scrollRef} className="flex gap-5 overflow-x-scroll no-scrollbar py-10">
                {children}
            </div>
        </>
    )
}