import { MoveRight } from "lucide-react"
import Image from "next/image"
import SmartImage from "./smart-image"

type WhyUsItem = {
    icon: React.ElementType
    title: string
    description: string
}

type WhyUsSectionProps = {
    items: WhyUsItem[]
    title?: string
    imageUrl?: string
    imageAlt?: string
}

export const WhyUsSection = ({
    items,
    title = "Why Us?",
    imageUrl,
    imageAlt = "",
}: WhyUsSectionProps) => {
    return (
        <section className="relative bg-black dark:bg-white p-4 md:px-30 md:py-10 my-10 md:my-0">
            <div className="rounded-out-lt-main bg-black dark:bg-white" />
            <div className="rounded-out-rt-main bg-black dark:bg-white" />
            <div className="rounded-out-lb-main bg-black dark:bg-white" />
            <div className="rounded-out-rb-main bg-black dark:bg-white" />

            <div className="flex flex-col md:grid md:grid-cols-10 gap-5">

                {/* Label / Image */}
                <div className="md:col-span-2 relative rounded-main overflow-hidden aspect-square md:aspect-auto min-h-40">
                    {imageUrl && (
                        <SmartImage
                            width={500}
                            height={500}
                            className="w-full h-full object-cover rounded-main"
                            src={imageUrl}
                            alt={imageAlt}
                        />
                    )}
                    <div className="text-black dark:text-white absolute inset-0 flex items-center justify-center bg-white/10 dark:bg-black/10">
                        <h2 className="text-3xl md:text-4xl font-semibold text-center px-4">
                            {title}
                        </h2>
                    </div>
                </div>

                {/* Cards + Slider Indicator */}
                <div className="md:col-span-8 flex flex-col gap-3 relative">
                    <div
                        id="why-us-scroll"
                        className="flex gap-3 md:gap-5 overflow-x-auto no-scrollbar rounded-main scroll-smooth"
                        style={{ scrollSnapType: "x mandatory" }}
                    >
                        {items.map((el, idx) => (
                            <div
                                key={idx}
                                className="p-8 bg-lightColor dark:bg-darkColor rounded-main min-w-80 min-h-100 md:min-h-120 flex flex-col justify-between"
                                style={{ scrollSnapAlign: "start" }}
                            >
                                <el.icon className="size-10 mb-6 md:mb-10"/>
                                    <div className="space-y-2 md:space-y-3">
                                        <h2 className="text-xl md:text-2xl font-bold">
                                            {el.title}
                                        </h2>
                                        <h3 className="text-sm font-medium opacity-80">
                                            {el.description}
                                        </h3>
                                    </div>
                            </div>
                        ))}
                    </div>

                    {/* SSR-safe scroll indicator using scroll-driven animation */}
                    <div className="md:flex justify-end text-white dark:text-black absolute hidden md:-bottom-7 right-0 opacity-60">
                        <MoveRight />
                    </div>
                </div>

            </div>
        </section>
    )
}