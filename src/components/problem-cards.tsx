import Image from "next/image"

interface ProblemItem {
    image: string
    title: string
    subtext: string
    description: string
    overlay: string
}

interface ProblemCardsProps {
    items: ProblemItem[]
}

export const ProblemCards = ({ items }: ProblemCardsProps) => {
    return (
        <>
            {items.map((el, idx) => {
                const isDark = el.overlay === "dark"
                return (
                    <div key={idx}
                        className={`min-w-90 min-h-150 relative overflow-hidden rounded-main hover:scale-102 duration-300 ease-in-out group
                            ${idx === 0 ? "left-margin" : ""}
                            ${idx === items.length - 1 ? "right-margin" : ""}
                        `}
                    >
                        <Image
                            width={500}
                            height={500}
                            src={el.image}
                            alt={el.title}
                            className="w-full h-150 object-cover rounded-main"
                        />
                        <div className={`${isDark ? "from-darkColor/30" : "from-lightColor/30"} to-transparent absolute top-0 bg-linear-to-b w-full h-70`} />
                        <div className="absolute inset-0 p-8 space-y-2.5">
                            <h2 className={`font-semibold ${isDark ? "text-white" : "text-black"}`}>{el.title}</h2>
                            <h2 className={`font-bold text-2xl ${isDark ? "text-white" : "text-black"}`}>{el.subtext}</h2>
                        </div>
                        <div className="absolute bottom-0 translate-y-full duration-300 ease-in-out group-hover:translate-y-0 scale-50 group-hover:scale-100">
                            <h3 className={`${isDark ? "text-white bg-black" : "text-black bg-white"} p-8 text-lg font-medium rounded-t-[100px] group-hover:rounded-t-main duration-300`}>
                                {el.description}
                            </h3>
                        </div>
                    </div>
                )
            })}
        </>
    )
}