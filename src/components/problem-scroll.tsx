"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { useRef } from "react"

interface ProblemScrollWrapperProps {
    title?: React.ReactNode       // slot untuk <Title> dari server
    children: React.ReactNode    // slot untuk cards dari server
    scrollAmount?: number
}

export const ProblemScrollWrapper = ({
    title,
    children,
    scrollAmount = 380,
}: ProblemScrollWrapperProps) => {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "prev" | "next") => {
        if (!scrollRef.current) return
        scrollRef.current.scrollBy({
            left: direction === "next" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        })
    }

    return (
        <>
            {/* Preserves original layout: title kiri, buttons kanan */}
            <div className="flex items-center justify-between">
                {title}
                <div className="mr-4 md:mr-10 space-x-2">
                    <Button size={"icon-lg"} variant={"invert"} aria-label="Scroll left" className="transition-all duration-300" onClick={() => scroll("prev")}>
                        <ChevronLeft className="size-6" />
                    </Button>
                    <Button size={"icon-lg"} variant={"invert"} aria-label="Scroll right" className="transition-all duration-300" onClick={() => scroll("next")}>
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