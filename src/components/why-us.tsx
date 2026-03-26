import { BarChart2, Target, TrendingUp, Zap } from "lucide-react"

export const WhyChooseUs = () => {
    const items = [
        {
            title: "Strategic, Not Random",
            desc: "Every move is structured. We don't post just to stay active — we build systems that drive measurable growth.",
            icon: <Target />,
        },
        {
            title: "Performance-Oriented",
            desc: "Vanity metrics don't pay bills. We focus on traffic, leads, and revenue impact.",
            icon: <TrendingUp />,
        },
        {
            title: "Data-Driven Execution",
            desc: "Decisions backed by numbers, not assumptions.",
            icon: <BarChart2 />,
        },
        {
            title: "Fast & Adaptive",
            desc: "We move quickly without sacrificing direction.",
            icon: <Zap />,
        },
    ]

    return (
        <section className="spacing">
            <div className="flex md:flex-row flex-col gap-5 md:gap-3 md:pr-10">

                {/* Left: heading panel */}
                <div className="left-padding rounded-r-3xl bg-darkColor text-white dark:bg-lightColor dark:text-black py-10 pr-10 mr-4 md:mr-0 w-fit md:w-auto flex flex-col justify-between relative">
                    <h2 className="text-4xl font-medium mb-4">
                        Why Choose <span className="text-thirdColor">Us</span>
                    </h2>

                    <div className="rounded-out-lt-3xl bg-darkColor dark:bg-lightColor"></div>
                    <div className="rounded-out-lb-3xl bg-darkColor dark:bg-lightColor"></div>

                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        We don't just build digital presence.
                        We engineer structured growth systems.
                    </p>
                </div>

                {/* Right: scrollable carousel (mobile) / hover-expand row (desktop) */}
                <div className="flex flex-row gap-3 right-padding overflow-x-auto md:overflow-x-visible no-scrollbar">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`
                                ${index === 0 ? "ml-4 md:ml-0" : ""}
                                ${index === items.length - 1 ? "mr-4 md:mr-0" : ""}
                                w-[75vw] sm:w-[60vw] shrink-0 grow
                                md:w-auto md:shrink md:min-w-50! md:hover:min-w-120
                                relative overflow-hidden min-h-100
                                ease-in-out bg-white dark:bg-neutral-900 rounded-main p-8
                                border border-neutral-200 dark:border-neutral-800
                                hover:shadow-xl transition-all duration-500
                                flex flex-col justify-between
                                `}

                        >
                            <div className="text-3xl mb-6 text-white dark:text-black p-2.5 bg-black dark:bg-white rounded-full w-fit z-10">
                                {item.icon}
                            </div>
                            <div className="absolute -left-15 -top-10 text-[250px] text-thirdColor/10 z-0">
                                {item.icon}
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}