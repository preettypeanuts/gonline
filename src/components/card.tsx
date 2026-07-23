import Image from "next/image"
import Link from "next/link"

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
    const isPreviewHost = link.includes("vercel.app")

    return (
        <div className={`relative group shrink-0 overflow-hidden ${className}`}>
            <div className="absolute inset-0 flex items-center justify-center z-20 group-hover:translate-y-0 group-hover:opacity-100 opacity-0 transition-all duration-300 -translate-y-5 scale-95 group-hover:scale-100">
                <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium text-3xl text-center p-10 w-fit h-fit rounded-main bg-darkColor dark:bg-lightColor dark:text-black hover:bg-darkColor/90 hover:dark:bg-lightColor/90 transition-colors duration-200"
                >
                    Lihat
                </Link>
            </div>
            <div className="absolute inset-0 w-full h-full rounded-main bg-lightColor/70 dark:bg-darkColor/70 z-10 opacity-0 group-hover:opacity-100 duration-200" />

            <div className="h-full bg-white dark:bg-black rounded-main transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative">
                    <Image
                        width={500}
                        height={300}
                        src={image}
                        alt={brandName}
                        className="rounded-t-main w-full h-auto object-cover bg-neutral-300 dark:bg-neutral-700"
                    />
                    {isPreviewHost && (
                        <span className="absolute top-3 left-3 rounded-full bg-black/80 text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1">
                            Preview
                        </span>
                    )}
                </div>
                <div className="p-5 sm:p-8 space-y-2">
                    <h3 className="font-bold text-lg sm:text-xl">{brandName}</h3>
                    <p className="text-thirdColor uppercase font-semibold text-xs">
                        {category} · {companyName}
                    </p>
                    <div className="flex flex-wrap gap-1">
                        {features.map((feature, idx) => (
                            <span
                                key={idx}
                                className="px-2 py-1 bg-darkColor w-fit rounded-full text-white dark:bg-lightColor dark:text-black text-xs font-medium"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
