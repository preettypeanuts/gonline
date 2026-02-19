export const HowWeWork = () => {
    const howWeWork = [
        {
            number: "01",
            title: "Discovery",
            shortDesc: "Understanding your business before building anything.",
            detail: "We analyze your brand, target market, and goals to create a strong foundation."
        },
        {
            number: "02",
            title: "Strategy Planning",
            shortDesc: "Creating a clear digital structure.",
            detail: "We define the right approach for your website and social media so everything works together."
        },
        {
            number: "03",
            title: "Execution",
            shortDesc: "Design and development with purpose.",
            detail: "We build clean, functional, and professional digital assets based on strategy."
        },
        {
            number: "04",
            title: "Optimization",
            shortDesc: "Improving for long-term growth.",
            detail: "We evaluate, refine, and optimize to ensure your digital presence keeps evolving."
        }
    ]

    return (
        <>
            <section className="margin spacing">
                <h1 className="text-4xl font-medium px-6 py-4 bg-white dark:bg-black w-fit rounded-t-3xl relative">
                    How We <span className="text-thirdColor">Work</span>
                    <div className="rounded-out-br-3xl bg-white dark:bg-black"></div>
                </h1>
                <div className="flex md:flex-row flex-col ">
                    {howWeWork.map((el, idx) => (
                        <div
                            className={`group  relative p-5 bg-white dark:bg-black min-h-70 overflow-hidden flex-1
                                ${idx === 0 ? 'md:rounded-bl-3xl md:rounded-tr-none rounded-tr-3xl' : idx === howWeWork.length - 1 ? 'md:rounded-r-3xl md:rounded-bl-none rounded-b-3xl' : ''} 
                            `}
                            key={idx}
                        >
                            <div className="group-hover:scale-90 duration-300 absolute left-0 bottom-0 text-9xl font-light text-mainColor mb-2">
                                {el.number}
                            </div>
                            <div className="flex flex-col self-end justify-end">
                                <h3 className="text-xl font-semibold mb-2">{el.title}</h3>
                                <p className="opacity-80 mb-2">{el.shortDesc}</p>
                            </div>
                            {/* <p className="opacity-60">{el.detail}</p> */}
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
