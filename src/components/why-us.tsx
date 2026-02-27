import {
    FiTrendingUp,
    FiTarget,
    FiBarChart2,
    FiLayers,
    FiZap
} from "react-icons/fi"

export const WhyChooseUs = () => {
    const items = [
        {
            title: "Strategic, Not Random",
            desc: "Every move is structured. We don’t post just to stay active — we build systems that drive measurable growth.",
            icon: <FiTarget />,
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-2",
        },
        {
            title: "Performance-Oriented",
            desc: "Vanity metrics don’t pay bills. We focus on traffic, leads, and revenue impact.",
            icon: <FiTrendingUp />,
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-2",
        },
        {
            title: "Data-Driven Execution",
            desc: "Decisions backed by numbers, not assumptions.",
            icon: <FiBarChart2 />,
            colSpan: "md:col-span-2",
            rowSpan: "md:row-span-2",
        },
        {
            title: "Fast & Adaptive",
            desc: "We move quickly without sacrificing direction.",
            icon: <FiZap />,
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-2",
        },
    ]

    return (
        <section className="spacing">

            <div className="flex md:flex-row flex-col gap-3 md:pr-10 pr-4">
                <div className="pl-10 rounded-r-3xl bg-darkColor text-white dark:bg-lightColor dark:text-black py-10 pr-10 flex flex-col justify-between relative">
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
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`ml-4 md:ml-0 relative overflow-hidden min-h-100 hover:min-w-120 md:min-w-0 ease-in-out bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all duration-500 flex flex-col justify-between`}
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
        </section>
    )
}