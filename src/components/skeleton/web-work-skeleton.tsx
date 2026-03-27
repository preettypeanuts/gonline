import { ProblemScrollWrapper } from "../problem-scroll"
import { Title } from "../title"

export const WebWorkSkeleton = () => {
    return (
        <section className="spacing space-y-8">
            <ProblemScrollWrapper
                title={<Title>Our Web Work</Title>}
            >
                <>
                    {[1, 2, 3].map((_, idx) => (
                        <div
                            key={idx}
                            className={`shrink-0 animate-pulse
                                ${idx === 0 ? "left-margin" : ""}
                                ${idx === 2 ? "right-margin" : ""}
                            `}
                        >
                            <div className="min-w-90 max-w-90 md:max-w-120 md:min-w-120 bg-white dark:bg-black rounded-main overflow-hidden">
                                <div className="w-full h-60 bg-neutral-200 dark:bg-neutral-800 rounded-t-main" />
                                <div className="p-5 sm:p-8 space-y-3">
                                    <div className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                                    <div className="h-3 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                                    <div className="flex gap-1 flex-wrap">
                                        {[1, 2, 3].map((f) => (
                                            <div key={f} className="h-6 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            </ProblemScrollWrapper>

            <div className="flex justify-center mt-4">
                <div className="h-10 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse" />
            </div>
        </section>
    )
}