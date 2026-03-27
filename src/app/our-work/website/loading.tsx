export default function WebWorkLoading() {
    const skeletonCategories = [1, 2]
    const skeletonCards = [1, 2, 3]

    return (
        <section className="spacing py-10 space-y-16">
            {skeletonCategories.map((cat) => (
                <div key={cat}>
                    {/* Category header */}
                    <div className="flex flex-row items-center justify-between mb-8">
                        <div className="pl-10 py-3 pr-3 rounded-r-3xl bg-neutral-200 dark:bg-neutral-800 relative w-fit animate-pulse">
                            <div className="h-8 w-48 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                        </div>
                        <div className="pr-10 py-3 pl-3 rounded-l-3xl bg-neutral-200 dark:bg-neutral-800 relative w-fit ml-auto animate-pulse">
                            <div className="h-10 w-10 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                        </div>
                    </div>

                    {/* Cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-10">
                        {skeletonCards.map((card) => (
                            <div
                                key={card}
                                className="bg-white dark:bg-black rounded-main overflow-hidden animate-pulse"
                            >
                                <div className="w-full h-48 bg-neutral-200 dark:bg-neutral-800 rounded-t-3xl" />
                                <div className="p-5 sm:p-6 space-y-3">
                                    <div className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                                    <div className="h-3 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                                    <div className="flex flex-wrap gap-1 pt-1">
                                        {[1, 2, 3].map((f) => (
                                            <div
                                                key={f}
                                                className="h-6 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}