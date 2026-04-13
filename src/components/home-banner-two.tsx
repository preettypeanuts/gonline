"use client"

import { webWorks } from "@/app/data"
import { Button } from "./ui/button"
import Image from "next/image"
import { useEffect, useRef } from "react"

export const HomeBannerTwo = () => {
    const trackRef = useRef<HTMLDivElement>(null)
    const outerRef = useRef<HTMLDivElement>(null)
    const currentTranslateRef = useRef(0)

    const SLIDE_W = 500
    const GAP = 8
    const COPIES = 6

    const repeated = Array.from({ length: COPIES }, () => webWorks).flat()

    useEffect(() => {
        let rafId: number
        const speed = 0.4

        const loopWidth = (SLIDE_W + GAP) * webWorks.length

        const animate = () => {
            const track = trackRef.current
            const outer = outerRef.current
            if (!track || !outer) return

            currentTranslateRef.current += speed

            if (currentTranslateRef.current >= loopWidth) {
                currentTranslateRef.current -= loopWidth
            }

            track.style.transform = `translateX(${-currentTranslateRef.current}px)`
            track.style.transition = "none"

            // 🔥 SCALE LOGIC (dynamic center detection)
            const slides = Array.from(
                track.querySelectorAll<HTMLElement>(".slide-wrap")
            )

            const centerX = outer.offsetWidth / 2

            slides.forEach((slide) => {
                const rect = slide.getBoundingClientRect()
                const slideCenter = rect.left + rect.width / 2

                const dist = Math.abs(centerX - slideCenter)

                let scale = 0.78
                let opacity = 0.75

                if (dist < 100) {
                    scale = 1
                    opacity = 1
                } else if (dist < 300) {
                    scale = 0.88
                    opacity = 0.9
                }

                const inner = slide.querySelector<HTMLElement>(".slide-inner")
                if (inner) {
                    inner.style.transform = `scale(${scale})`
                    inner.style.opacity = `${opacity}`
                }
            })

            rafId = requestAnimationFrame(animate)
        }

        rafId = requestAnimationFrame(animate)

        return () => cancelAnimationFrame(rafId)
    }, [])

    return (
        <section className="w-full h-[75lvh] md:h-screen relative pt-30">
            <h1 className="text-center text-6xl font-bold text-black">
                Built for
                <span className="text-mainColor">
                    {" "}Growth{" "}<br />
                </span>
                Not just
                <span className="text-thirdColor">
                    {" "}Presence.{" "}
                </span>
            </h1>

            <div className="flex items-center justify-center gap-2 mt-10">
                <Button size="lg" variant="invert">
                    Schedule a Meeting
                </Button>
                <Button size="lg" variant="outline">
                    
                </Button>
            </div>

            <div className="mt-10">
                <div
                    ref={outerRef}
                    className="overflow-hidden w-full"
                    style={{ paddingBlock: "40px" }}
                >
                    <div
                        ref={trackRef}
                        className="flex items-center will-change-transform"
                        style={{
                            gap: `${GAP}px`,
                            width: "max-content",
                        }}
                    >
                        {repeated.map((el, id) => (
                            <div
                                key={id}
                                className="slide-wrap flex-none"
                                style={{ width: `${SLIDE_W}px` }}
                            >
                                <div
                                    className="slide-inner overflow-hidden p-3 bg-white rounded-main shadow-mainShadow"
                                    style={{
                                        transformOrigin: "center center",
                                        transition:
                                            "transform 0.3s ease, opacity 0.3s ease",
                                    }}
                                >
                                    <Image
                                        width={500}
                                        height={500}
                                        className="w-full h-auto object-cover rounded-secondary"
                                        src={el.imagePreview}
                                        alt={el.brandName}
                                        draggable={false}
                                    />
                                </div>;kasmf;asafa;sfas;f
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}