"use client"

import Image from "next/image"
import Link from "next/link";
import { useEffect, useRef, useState } from "react"

type Ad = {
    image: string;
    href: string;
}


export const ImageSlider = ({ ads }: { ads: Ad[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const indexRef = useRef(0)
    const [activeIndex, setActiveIndex] = useState(0)

    const phone = "6285117388880";

    const formatWhatsAppLink = (text: string) => {
        return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(text)}`;
    };

    useEffect(() => {
        const duration = 4000

        const interval = setInterval(() => {
            const container = scrollRef.current
            if (!container) return

            const items = Array.from(container.children) as HTMLElement[]
            if (items.length === 0) return

            indexRef.current = (indexRef.current + 1) % items.length
            setActiveIndex(indexRef.current)

            const target = items[indexRef.current]

            const style = window.getComputedStyle(container)
            const paddingLeft = parseInt(style.paddingLeft || "0", 10)

            const offsetLeft = target.offsetLeft
            const scrollLeft = Math.max(offsetLeft - paddingLeft, 0)

            container.scrollTo({
                left: scrollLeft,
                behavior: "smooth",
            })
        }, duration)


        return () => clearInterval(interval)
    }, [])

    const scrollToIndex = (index: number) => {
        const container = scrollRef.current
        if (!container) return

        const items = Array.from(container.children) as HTMLElement[]
        if (!items[index]) return

        const target = items[index]

        const style = window.getComputedStyle(container)
        const paddingLeft = parseInt(style.paddingLeft || "0", 10)

        const offsetLeft = target.offsetLeft
        const scrollLeft = Math.max(offsetLeft - paddingLeft, 0)

        container.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
        })
    }

    return (
        <div className="w-full">
            {/* SLIDER */}
            <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto w-full no-scrollbar pt-4 pb-6 px-4"
            >
                {ads.map((ad, i) => (
                    <Link
                        href={formatWhatsAppLink(ad.href ?? "Halo min Gon!")}
                        key={i}
                        className="shrink-0"
                    >
                        <Image
                            src={ad.image}
                            alt={`Ad ${i + 1}`}
                            width={500}
                            height={500}
                            className="w-87 h-auto rounded-main shadow-mainShadow"
                        />
                    </Link>
                ))}
            </div>

            {/* 🍎 APPLE-STYLE INDICATOR */}
            <div className="flex justify-center items-center mt-3">
                <div className="flex gap-3 px-5 py-4 bg-darkColor/20 rounded-full w-fit">
                    {ads.map((_, i) => {
                        const isActive = i === activeIndex

                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    indexRef.current = i
                                    setActiveIndex(i)
                                    scrollToIndex(i)
                                }}
                                className={`
                                relative h-2.5 rounded-full overflow-hidden
                                transition-all duration-500 ease-in-out
                                ${isActive ? "w-10 bg-white/50" : "w-2.5 bg-white"}
                            `}
                            >
                                {/* progress bar */}
                                {isActive && (
                                    <div
                                        key={activeIndex}
                                        className="absolute left-0 top-0 h-full bg-white rounded-full animate-progress"
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}