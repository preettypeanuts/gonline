"use client"

import { useEffect, useRef, useState } from "react"

export type SubNavItem = {
    label: string
    id: string
    icon: React.ReactNode
}

type SubNavProps = {
    items: SubNavItem[]
}

export const SubNav = ({ items }: SubNavProps) => {
    const [activeId, setActiveId] = useState<string>("")

    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (!el) return
        const offset = 80
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: "smooth" })
    }

    useEffect(() => {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id)
                })
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        )
        items.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) sectionObserver.observe(el)
        })

        return () => sectionObserver.disconnect()
    }, [items])

    return (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 ">
            <div className="rounded-out-r-2xl bg-black"></div>
            <div className="absolute bg-white/20 w-15 h-full blur-md -z-10"></div>

            <div className="flex flex-col gap-2 px-2 py-2.5 bg-black rounded-l-main">
                {items.map(({ label, id, icon }) => {
                    const isActive = activeId === id
                    return (
                        <button
                            key={id}
                            onClick={() => scrollTo(id)}
                            className="group relative flex items-center justify-end cursor-pointer"
                        >
                            {/* Label — slides in from right on hover */}
                            <span className="
                            absolute right-full mr-2
                            px-3 py-1 rounded-full
                            bg-black dark:bg-white
                            text-white dark:text-black
                            text-xs font-semibold whitespace-nowrap
                            opacity-0 translate-x-2
                            group-hover:opacity-100 group-hover:translate-x-0
                            transition-all duration-300 ease-in-out
                            pointer-events-none
                        ">
                                {label}
                            </span>

                            {/* Icon pill */}
                            <div className={`
                            size-9 rounded-full flex items-center justify-center
                            border transition-all duration-50
                            ${isActive
                                    ? "bg-mainColor text-white border-neutral-500/5 scale-110"
                                    : "text-white border-black/10 dark:border-white/10 hover:bg-white/30 hover:dark:bg-white hover:text-white hover:dark:text-black hover:border-black dark:hover:border-white hover:scale-110"
                                }
                        `}>
                                <span className="text-sm">{icon}</span>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>

    )
}