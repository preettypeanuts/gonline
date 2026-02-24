export const VissionMission = () => {
    return (
        <main className="spacing">

            {/* VISION */}
            <section className="mb-20">
                <div className="flex flex-row gap-4 md:me-10">

                    <div className="flex items-center pl-6 md:pl-10 pr-5 py-5 bg-darkColor text-white dark:bg-lightColor dark:text-black rounded-r-3xl font-bold text-2xl md:text-4xl relative shrink-0">
                        Vision
                        <div className="rounded-out-lt-3xl bg-darkColor dark:bg-lightColor"></div>
                        <div className="rounded-out-lb-3xl bg-darkColor dark:bg-lightColor"></div>
                    </div>

                    <h2 className="font-medium text-base md:text-3xl px-4 md:px-5 py-3 bg-white dark:bg-black rounded-3xl mr-4">
                        To redefine how businesses build and manage their digital infrastructure in the modern era.
                    </h2>

                </div>
            </section>

            {/* MISSION */}
            <section>
                <div className="flex flex-row w-full gap-3">

                    {/* LEFT SIDE - Mission Points */}
                    <div className="flex flex-wrap justify-end gap-3 ml-4">
                        <p className="font-medium text-sm md:text-xl px-4 md:px-5 py-3 bg-white dark:bg-black rounded-3xl">
                            Build conversion-focused digital platforms.
                        </p>
                        <p className="font-medium text-sm md:text-xl px-4 md:px-5 py-3 bg-white dark:bg-black rounded-3xl">
                            Transform social media into structured growth systems.
                        </p>
                        <p className="font-medium text-sm md:text-xl px-4 md:px-5 py-3 bg-white dark:bg-black rounded-3xl">
                            Replace vanity metrics with measurable performance.
                        </p>
                        <p className="font-medium text-sm md:text-xl px-4 md:px-5 py-3 bg-white dark:bg-black rounded-3xl">
                            Operate with clarity, precision, and long-term strategy.
                        </p>
                    </div>

                    {/* RIGHT SIDE - Mission Label */}
                    <div className="flex items-center pr-6 md:pr-10 pl-5 py-5 bg-darkColor text-white dark:bg-lightColor dark:text-black rounded-l-3xl font-bold text-2xl md:text-4xl relative shrink-0">
                        Mission
                        <div className="rounded-out-rt-3xl bg-darkColor dark:bg-lightColor"></div>
                        <div className="rounded-out-rb-3xl bg-darkColor dark:bg-lightColor"></div>
                    </div>

                </div>
            </section>
        </main>
    )
}