type TitleProps = {
    children: React.ReactNode
    side?: "left" | "right"
    className?: string
}

export const Title = ({ children, side = "left", className }: TitleProps) => {
    const isLeft = side === "left"

    return (
        <div
            className={`bg-black text-white dark:bg-white dark:text-black py-3 relative w-fit
        ${isLeft ? "rounded-r-3xl pr-6 md:pl-10 pl-4" : "rounded-l-3xl pl-6 md:pr-10 pr-4"}
      `}
        >
            {isLeft ? (
                <>
                    <div className="rounded-out-lt-3xl bg-black dark:bg-white" />
                    <div className="rounded-out-lb-3xl bg-black dark:bg-white" />
                </>
            ) : (
                <>
                    <div className="rounded-out-rt-3xl bg-black dark:bg-white" />
                    <div className="rounded-out-rb-3xl bg-black dark:bg-white" />
                </>
            )}
            <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>
        </div>
    )
}