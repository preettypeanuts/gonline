type TitleProps = {
    children: React.ReactNode
    side?: "left" | "right"
    className?: string
}

export const Title = ({ children, side = "left", className }: TitleProps) => {
    const isLeft = side === "left"

    return (
        <div
            className={`bg-white text-black dark:bg-black dark:text-white py-3 relative w-fit
        ${isLeft ? "rounded-r-3xl pr-6 left-padding" : "rounded-l-3xl pl-6 right-padding"}
      `}
        >
            {isLeft ? (
                <>
                    <div className="rounded-out-lt-3xl dark:bg-black bg-white" />
                    <div className="rounded-out-lb-3xl dark:bg-black bg-white" />
                </>
            ) : (
                <>
                    <div className="rounded-out-rt-3xl dark:bg-black bg-white" />
                    <div className="rounded-out-rb-3xl dark:bg-black bg-white" />
                </>
            )}
            <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>
        </div>
    )
}