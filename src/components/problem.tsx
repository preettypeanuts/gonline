"use client"

import { webProblem } from "@/app/data"
import Image from "next/image"
import { Title } from "./title"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { useRef } from "react"

export const Problem = () => {
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
            <div className="flex items-center justify-between">
                <Title>
                    We Fix Your Problems
                </Title>
                <div className="mr-4 md:mr-10 space-x-2">
                    <Button
                        size={"icon-lg"}
                        variant={"invert"}
                        aria-label="Scroll left"
                        className="transition-all duration-300"
                        onClick={() => scroll("prev")}
                    >
                        <ChevronLeft className="size-6" />
                    </Button>
                    <Button
                        size={"icon-lg"}
                        variant={"invert"}
                        aria-label="Scroll right"
                        className="transition-all duration-300"
                        onClick={() => scroll("next")}
                    >
                        <ChevronRight className="size-6" />
                    </Button>
                </div>
            </div>

            <div ref={scrollRef} className="flex gap-5 overflow-x-scroll no-scrollbar py-3">
                {webProblem.map((el, idx) => (
                    <div key={idx}
                        className={`min-w-90 min-h-150 relative overflow-hidden rounded-main hover:scale-102 duration-300 ease-in-out group
                            ${idx === 0 ? "ml-4 md:ml-10" : ""} ${idx === webProblem.length - 1 ? "mr-4 md:mr-10" : ""}
                            `}
                    >
                        <Image
                            width={500}
                            height={500}
                            src={el.image}
                            alt={el.title}
                            className="w-full h-150 object-cover rounded-main"
                        />
                        <div className={`${el.overlay === "dark" ? "from-darkColor/30 to-transparent" : "from-lightColor/30 to-transparent"} absolute top-0 bg-linear-to-b w-full h-70`}></div>

                        <div className="absolute inset-0 p-8 space-y-2.5">
                            <h1 className={`font-semibold ${el.overlay === "dark" ? "text-white" : "text-black"}`}>
                                {el.title}
                            </h1>
                            <h2 className={`font-bold text-2xl ${el.overlay === "dark" ? "text-white" : "text-black"}`}>
                                {el.subtext}
                            </h2>
                        </div>
                        <div className="absolute bottom-0 translate-y-full duration-300 ease-in-out group-hover:translate-y-0 scale-50 group-hover:scale-100">
                            <p className={`${el.overlay === "dark" ? "text-white" : "text-black"} ${el.overlay === "dark" ? "bg-black" : "bg-white"} p-8 rounded-t-main text-lg font-medium`}>
                                {el.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}