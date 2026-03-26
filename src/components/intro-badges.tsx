import { LucideIcon } from "lucide-react"
import Image from "next/image"

export interface IntroBadgeFeature {
    icon: LucideIcon
    title: string
    description: string
}

export interface IntroBadgesProps {
    overlay : string
    image: string
    imageAlt: string
    heading: string
    subtext: string
    services: string[]
    features: IntroBadgeFeature[]
}

export const IntroBadges = ({
    overlay,
    image,
    imageAlt,
    heading,
    subtext,
    services,
    features,
}: IntroBadgesProps) => {
    return (
        <section className="margin spacing">
            <div className="grid grid-cols-10 gap-5">

                {/* LEFT */}
                <div className="col-span-10 md:col-span-5 md:aspect-square relative overflow-hidden rounded-main md:h-auto h-150">
                    <Image
                        src={image}
                        alt={imageAlt}
                        fill
                        className="object-cover"
                    />
                    <div className={`absolute top-0 bg-linear-to-b to-transparent h-80 w-full ${overlay === "dark" ? "from-darkColor/30 " : "from-lightColor/30 "}`} />

                    <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-between">
                        <div className="space-y-3">
                            <h2 className={`text-2xl md:text-3xl font-bold leading-snug ${overlay === "dark" ? "text-neutral-100 " : "text-neutral-700"}`}>
                                {heading}
                            </h2>
                            <p className={`text-sm leading-relaxed opacity-70 ${overlay === "dark" ? "text-neutral-100 " : "text-neutral-700"}`}>
                                {subtext}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-8">
                            {services.map((service, idx) => (
                                <span
                                    key={idx}
                                    className="md:px-3 md:py-1.5 px-2 py-1 rounded-full text-[9px] md:text-xs font-semibold bg-white dark:bg-black dark:text-white border border-white/20 hover:border-mainColor hover:text-mainColor transition-colors duration-200"
                                >
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="col-span-10 md:col-span-5 grid md:grid-cols-2  gap-5">
                    {features.map((feature, idx) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={idx}
                                className="relative md:aspect-square bg-white dark:bg-black rounded-main p-6 flex flex-col justify-end hover:-translate-y-0.5 transition-transform duration-300"
                            >
                                <div className="absolute top-0 left-0 pt-1 pl-1 pb-3 pr-3 bg-lightColor dark:bg-darkColor rounded-br-2xl">
                                    <div className="rounded-out-tr-2xl bg-lightColor dark:bg-darkColor" />
                                    <div className="rounded-out-lb-2xl bg-lightColor dark:bg-darkColor" />
                                    <div className="size-12 rounded-xl bg-mainColor dark:bg-thirdColor flex items-center justify-center">
                                        <Icon className="size-6 text-white" />
                                    </div>
                                </div>
                                <div className="space-y-1.5 md:mt-0 mt-20">
                                    <h3 className="font-semibold text-lg md:text-2xl">{feature.title}</h3>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}