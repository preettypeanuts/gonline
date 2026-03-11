import Image from "next/image"

type WhyUsItem = {
    icon: React.ElementType
    title: string
    description: string
}

type WhyUsSectionProps = {
    items: WhyUsItem[]
    title?: string
    imageUrl?: string
    imageAlt?: string
}

export const WhyUsSection = ({
    items,
    title = "Why Us?",
    imageUrl,
    imageAlt = "",
}: WhyUsSectionProps) => {
    return (
        <section className="relative bg-black dark:bg-white p-6 md:p-10">
            <div className="rounded-out-lt-main bg-black dark:bg-white" />
            <div className="rounded-out-rt-main bg-black dark:bg-white" />
            <div className="rounded-out-lb-main bg-black dark:bg-white" />
            <div className="rounded-out-rb-main bg-black dark:bg-white" />

            <div className="flex flex-col md:grid md:grid-cols-10 gap-5">

                {/* Label / Image */}
                <div className="md:col-span-2 relative rounded-main overflow-hidden aspect-square md:aspect-auto min-h-40">
                    {imageUrl && (
                        <Image
                            width={500}
                            height={500}
                            className="w-full h-full object-cover rounded-main dark:invert"
                            src={imageUrl}
                            alt={imageAlt}
                        />
                    )}
                    <div className="text-black dark:text-white absolute inset-0 flex items-center justify-center">
                        <p className="text-3xl md:text-4xl font-semibold text-center px-4">
                            {title}
                        </p>
                    </div>
                </div>

                {/* Cards */}
                <div className="md:col-span-8">
                    <div className="flex gap-5 overflow-x-auto no-scrollbar rounded-main">
                        {items.map((el, idx) => (
                        <div
                            key={idx}
                            className="p-8 bg-lightColor dark:bg-darkColor rounded-main min-w-80 min-h-120 flex flex-col justify-between"
                        >
                                <div className="text-3xl md:text-4xl mb-6 md:mb-10">
                                    <el.icon />
                                </div>
                                <div className="space-y-2 md:space-y-3">
                                    <h3 className="text-xl md:text-2xl font-bold">
                                        {el.title}
                                    </h3>
                                    <p className="text-sm font-medium opacity-80">
                                        {el.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}