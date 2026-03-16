"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "./ui/input"
import { dataArticles } from "@/app/data"
import { Button } from "./ui/button"

export const InsightFilter = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const categories = ["All", ...Array.from(new Set(dataArticles.map(el => el.category)))]

    useEffect(() => {
        if (isOpen) inputRef.current?.focus()
    }, [isOpen])

    return (
        <div className="my-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            {/* Category Pills */}
            <div className="bg-black dark:bg-white left-padding mr-4 md:mr-0 py-3 pr-3 rounded-r-3xl relative w-fit">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar rounded-full">
                    {categories.slice(0, 5).map((cat) => {
                        const isActive = activeCategory === cat || (cat === "All" && activeCategory === null)
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat === "All" ? null : cat)}
                                className={`
                                    h-11 px-5 rounded-full text-xs uppercase font-bold shrink-0
                                    transition-all duration-300
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
                </div>

                <div className="rounded-out-lt-3xl bg-black dark:bg-white"></div>
                <div className="rounded-out-lb-3xl bg-black dark:bg-white"></div>
            </div>

            {/* Search — kanan di desktop, kanan di mobile */}
            <div className="flex justify-end order-first md:order-last">
                <div className="bg-black dark:bg-white right-padding py-3 pl-3 rounded-l-3xl relative">
                    <div className="flex items-center gap-2">
                        <div
                            className={`
                                flex items-center overflow-hidden
                                bg-white dark:bg-black rounded-full
                                border border-transparent
                                transition-all duration-400 ease-in-out
                                ${isOpen
                                    ? "w-85 sm:w-84 md:w-95 px-4 border-neutral-200 dark:border-neutral-800 shadow-sm -mr-15"
                                    : "w-0 px-0 border-transparent opacity-0"
                                }
                            `}
                        >
                            <Input
                                ref={inputRef}
                                type="search"
                                name="search"
                                placeholder="Cari artikel..."
                                className={`
                                    h-11 w-full bg-transparent border-none shadow-none
                                    placeholder:text-neutral-400 placeholder:font-medium
                                    focus-visible:ring-0 focus-visible:ring-offset-0
                                    text-sm transition-opacity duration-300
                                    ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
                                `}
                            />
                            {isOpen && (
                                <Button
                                    variant={"invert"}
                                    className="mr-1 ml-1 text-xs uppercase font-bold shrink-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors duration-200 hidden sm:flex"
                                >
                                    Search
                                </Button>
                            )}

                            <Button
                                size={"icon-lg"}
                                onClick={() => setIsOpen(false)}
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
                                    : "bg-white dark:bg-black text-black dark:text-white hover:scale-105 -translate-x-3"
                                }
                            `}
                            aria-label="Toggle search"
                        >
                            <Search size={16} />
                        </button>
                    </div>
                    <div className="rounded-out-rt-3xl bg-black dark:bg-white"></div>
                    <div className="rounded-out-rb-3xl bg-black dark:bg-white"></div>
                </div>
            </div>

        </div>
    )
}