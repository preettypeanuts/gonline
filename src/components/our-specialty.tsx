export const OurSpecialty = () => {
    const specialties = [
        {
            title: "Digital Infrastructure Development",
            desc: "Websites built as business assets — optimized for performance, scalability, and conversion.",
        },
        {
            title: "Structured Social Media Systems",
            desc: "Content and strategy aligned with clear funnels, acquisition goals, and measurable KPIs.",
        },
        {
            title: "Performance-Driven Execution",
            desc: "Every decision is backed by data, clarity, and long-term business objectives.",
        },
        {
            title: "Integrated Growth Approach",
            desc: "Website and social media working together — not operating in silos.",
        },
    ]

    return (
        <section className="spacing">
            <div className="relative">
                <div className="rounded-out-lt-3xl bg-white dark:bg-black"></div>
                <div className="rounded-out-rt-3xl bg-white dark:bg-black"></div>
                <div className="rounded-out-lb-3xl bg-white dark:bg-black"></div>
                <div className="rounded-out-rb-3xl bg-white dark:bg-black"></div>

                <div className="bg-white dark:bg-black p-4 md:p-10 relative grid grid-cols-1 md:grid-cols-6 gap-10">

                    {/* Title */}
                    <div className="max-w-3xl flex flex-col justify-between gap-4 col-span-2">
                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
                            Our <span className="text-thirdColor">Specialty</span>
                        </h2>

                        <p className="text-base md:text-lg opacity-80 leading-relaxed">
                            We build structured digital ecosystems for startups and corporate brands —
                            combining high-performing websites with strategic social media systems
                            designed for measurable growth.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 gap-3 md:gap-6 col-span-4">
                        {specialties.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-black/40 rounded-3xl backdrop-blur-sm border border-black/5 dark:border-white/10 hover:-translate-y-1 transition duration-300"
                            >
                                <div className="m-">
                                    <div className="p-1.5 bg-lightColor dark:bg-darkColor rounded-2xl">
                                        <h3 className="font-semibold text-lg px-3 py-2 bg-mainColor text-white rounded-xl">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-sm opacity-70 leading-relaxed p-4">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
