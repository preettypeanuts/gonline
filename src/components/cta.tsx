import Image from "next/image"

export const CTA = () => {
    return (
        <>
            <section className=" spacing">
                <div className="relative">
                    <Image
                        width={700}
                        height={700}
                        className="w-full h-[70lvh] object-cover"
                        src="https://images.unsplash.com/photo-1459664018906-085c36f472af?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                    />
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-lightColor dark:bg-darkColor rounded-t-3xl px-3 pt-3 w-full max-w-4xl text-center">
                        <div className="rounded-out-bl-3xl bg-lightColor dark:bg-darkColor"></div>
                        <div className="rounded-out-br-3xl bg-lightColor dark:bg-darkColor"></div>

                        <div className="bg-white dark:bg-black rounded-2xl px-8 py-10 text-center">

                            {/* Small Label */}
                            <p className="text-sm uppercase tracking-widest text-thirdColor font-medium mb-3">
                                Ready to Start?
                            </p>

                            {/* Main Headline */}
                            <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">
                                Let's Build Something <br />
                                <span className="text-mainColor">Meaningful Together.</span>
                            </h2>

                            {/* Supporting Text */}
                            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-8">
                                We help brands grow through structured digital strategy,
                                clean design, and purposeful execution.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button className="px-8 py-3 rounded-full bg-mainColor text-white font-medium hover:opacity-90 transition">
                                    Start a Project
                                </button>

                                <button className="px-8 py-3 rounded-full border border-neutral-300 dark:border-neutral-600 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                                    Schedule a Call
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}