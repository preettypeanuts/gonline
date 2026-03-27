import Image from "next/image"
import Link from "next/link"
import SmartImage from "./smart-image"

interface CardProps {
    link: string
    category: string
    image: string
    companyName: string
    brandName: string
    features: string[]
    kind: string
    className?: string
}

export const Card = ({
    link,
    category,
    image,
    companyName,
    brandName,
    features,
    className,
}: CardProps) => {
    return (
        <div className={`relative group shrink-0 overflow-hidden ${className}`}>
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20 group-hover:translate-y-0 group-hover:opacity-100 opacity-0 transition-all duration-300 -translate-y-5 scale-95 group-hover:scale-100">
                <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium text-3xl text-center p-10 w-fit h-fit rounded-main bg-darkColor dark:bg-lightColor dark:text-black hover:bg-darkColor/90 hover:dark:bg-lightColor/90 transition-colors duration-200"
                >
                    View
                </Link>
            </div>
            <div className="absolute inset-0 w-full h-full rounded-main bg-lightColor/70 dark:bg-darkColor/70 z-10 opacity-0 group-hover:opacity-100 duration-200" />

            {/* Card */}
            <div className="h-full bg-white dark:bg-black rounded-main transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Image
                    width={500}
                    height={300}
                    src={image}
                    alt={brandName}
                    className="rounded-t-main w-full h-auto object-cover bg-neutral-300 dark:bg-neutral-700"
                />
                <div className="p-5 sm:p-8 space-y-2">
                    <h2 className="font-bold text-lg sm:text-xl">{brandName}</h2>
                    <h3 className="text-thirdColor uppercase font-semibold text-xs">{category} · {companyName}</h3>
                    <div className="flex flex-wrap gap-1">
                        {features.map((feature, idx) => (
                            <h4
                                key={idx}
                                className="px-2 py-1 bg-darkColor w-fit rounded-full text-white dark:bg-lightColor dark:text-black text-xs font-medium"
                            >
                                {feature}
                            </h4>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}