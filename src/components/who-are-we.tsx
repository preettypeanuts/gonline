export const WhoAreWe = () => {
    return (
        <>
            <section className="margin spacing grid md:grid-cols-10">
                <h1 className="text-2xl font-medium mb-5 col-span-3">
                    Who Are We?
                </h1>

                <p className="col-span-7 tracking-wide text-2xl md:text-3xl font-medium leading-relaxed text-darkColor/50 dark:text-lightColor/70">
                    <span className="font-semibold text-mainColor">
                        GONLINE
                    </span>
                    {" "} is a digital agency {" "}
                    <span className="font-semibold text-black dark:text-white">
                        specializing in web development and strategic social media systems.
                    </span>

                    We help startups and corporate brands transform their digital presence into structured {" "}

                    <span className="font-semibold text-black dark:text-white">
                        growth engines,
                    </span>

                    combining performance-driven websites with measurable content strategies. {" "} <br />
                    Our focus is simple, {" "}
                    <span className="font-semibold text-black dark:text-white">
                        we build digital infrastructure that works.
                    </span>
                </p>
            </section>
        </>
    )
}