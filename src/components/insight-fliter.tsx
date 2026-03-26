"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Search, X, ChevronRight, ChevronLeft } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { slugify } from "@/lib/slugify"

interface Props {
    categories: string[]
    activeCategory: string | null
    activeSearch: string
    activeHighlight: boolean
}

export const InsightFilter = ({ categories, activeCategory, activeSearch, activeHighlight }: Props) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState(activeSearch)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isOpen) inputRef.current?.focus()
    }, [isOpen])

    const checkScroll = () => {
        const el = scrollRef.current
        if (!el) return
        setCanScrollLeft(el.scrollLeft > 2)
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2)
    }

    useEffect(() => {
        // Sedikit delay biar DOM sudah render
        const timeout = setTimeout(checkScroll, 50)
        const el = scrollRef.current
        el?.addEventListener("scroll", checkScroll)
        window.addEventListener("resize", checkScroll)
        return () => {
            clearTimeout(timeout)
            el?.removeEventListener("scroll", checkScroll)
            window.removeEventListener("resize", checkScroll)
        }
    }, [categories])

    const scroll = (dir: "left" | "right") => {
        const el = scrollRef.current
        if (!el) return
        el.scrollBy({ left: dir === "right" ? 160 : -160, behavior: "smooth" })
    }

    const updateParams = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete("page")
        Object.entries(updates).forEach(([k, v]) => {
            if (v === null || v === "") {
                params.delete(k)
            } else {
                params.set(k, v)
            }
        })
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    const handleSearch = () => {
        updateParams({ search: search.trim() || null })
    }

    const handleClearSearch = () => {
        setIsOpen(false)
        setSearch("")
        updateParams({ search: null })
    }

    return (
        <div className="my-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            {/* Category Pills */}
            <div className="bg-white dark:bg-black left-padding mr-4 md:mr-0 py-3 pr-3 rounded-r-3xl relative w-fit max-w-fit">
                <div className="relative flex items-center">

                    {/* Scroll kiri */}
                    <div className={`
                        absolute left-0 top-0 h-full z-10 flex items-center
                        transition-opacity duration-200
                        ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}
                    `}>
                        <div className="w-12 h-full bg-linear-to-r from-white dark:from-black to-transparent" />
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-0 w-7 h-7 rounded-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:border-black dark:hover:border-white transition-colors"
                        >
                            <ChevronLeft size={12} className="text-neutral-400" />
                        </button>
                    </div>

                    {/* Pills */}
                    <div
                        ref={scrollRef}
                        className={`
                            flex items-center gap-2 overflow-x-auto no-scrollbar
                            ${categories.length > 3 ? "max-w-83.5 md:max-w-200" : ""}
                        `}
                    >
                        {categories.map((cat) => {
                            const catSlug = cat === "All" ? null : slugify(cat)
                            const isActive = activeCategory === catSlug || (cat === "All" && activeCategory === null)
                            return (
                                <button
                                    key={cat}
                                    onClick={() => updateParams({ category: catSlug })}
                                    className={`
                                        h-11 px-5 rounded-full text-xs uppercase font-bold shrink-0
                                        transition-all duration-300 cursor-pointer
                                        ${isActive
                                            ? "bg-black dark:bg-white text-white dark:text-black border dark:border-black"
                                            : "bg-white dark:bg-black text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-neutral-200 dark:border-neutral-800"
                                        }
                                    `}
                                >
                                    {cat}
                                </button>
                            )
                        })}

                        {/* Highlight toggle */}
                        <button
                            onClick={() => updateParams({ highlight: activeHighlight ? null : "true" })}
                            className={`
                                h-11 px-5 rounded-full text-xs uppercase font-bold shrink-0
                                transition-all duration-300 cursor-pointer
                                ${activeHighlight
                                    ? "bg-black dark:bg-white text-white dark:text-black border dark:border-black"
                                    : "bg-white dark:bg-black text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-neutral-200 dark:border-neutral-800"
                                }
                            `}
                        >
                            Featured
                        </button>
                    </div>

                    {/* Scroll kanan */}
                    <div className={`
                        absolute right-0 top-0 h-full z-10 flex items-center justify-end
                        transition-opacity duration-200
                        ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}
                    `}>
                        <div className="w-12 h-full bg-linear-to-l from-white dark:from-black to-transparent" />
                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-0 w-7 h-7 rounded-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:border-black dark:hover:border-white transition-colors"
                        >
                            <ChevronRight size={12} className="text-neutral-400" />
                        </button>
                    </div>

                </div>

                <div className="rounded-out-lt-3xl bg-white dark:bg-black"></div>
                <div className="rounded-out-lb-3xl bg-white dark:bg-black"></div>
            </div>

            {/* Search */}
            <div className="flex justify-end order-first md:order-last">
                <div className="bg-white dark:bg-black right-padding py-3 pl-3 rounded-l-3xl relative">
                    <div className="flex items-center gap-2">
                        <div className={`
                            flex items-center overflow-hidden bg-white dark:bg-black rounded-full
                            border border-transparent transition-all duration-400 ease-in-out
                            ${isOpen
                                ? "w-85 sm:w-84 md:w-95 px-4 border-neutral-200 dark:border-neutral-800 shadow-sm -mr-15"
                                : "w-0 px-0 border-transparent opacity-0"
                            }
                        `}>
                            <Input
                                ref={inputRef}
                                type="search"
                                name="search"
                                placeholder="Cari artikel..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                className="h-11 w-full bg-transparent border-none shadow-none placeholder:text-neutral-400 placeholder:font-medium focus-visible:ring-0 focus-visible:ring-offset-0 text-sm transition-opacity duration-300"
                            />
                            {isOpen && (
                                <Button
                                    variant={"invert"}
                                    onClick={handleSearch}
                                    className="mr-1 ml-1 text-xs uppercase font-bold shrink-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors duration-200 hidden sm:flex"
                                >
                                    Search
                                </Button>
                            )}
                            <Button
                                size={"icon-lg"}
                                onClick={handleClearSearch}
                                className="bg-lightColor -mr-3.5 shrink-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors duration-200"
                            >
                                <X size={15} />
                            </Button>
                        </div>

                        <button
                            onClick={() => setIsOpen(prev => !prev)}
                            className={`
                                shrink-0 w-11 h-11 rounded-full flex items-center justify-center
                                transition-all duration-300
                                ${isOpen
                                    ? "scale-0 -translate-x-full"
                                    : "bg-black dark:bg-white text-white dark:text-black hover:scale-105 -translate-x-3"
                                }
                            `}
                            aria-label="Toggle search"
                        >
                            <Search size={16} />
                        </button>
                    </div>
                    <div className="rounded-out-rt-3xl bg-white dark:bg-black"></div>
                    <div className="rounded-out-rb-3xl bg-white dark:bg-black"></div>
                </div>
            </div>

        </div>
    )
}