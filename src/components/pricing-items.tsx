import { formatToRupiah } from "@/lib/formatRupiah"
import { Star, Check } from "lucide-react"
import type { PricingPackage } from "@/types/pricing-package"
import { PricingCtaButton } from "./pricing-cta-button"

interface PricingItemsProps {
    packages: PricingPackage[]
    useGrid: boolean
    ctaLabel: string
    favoriteCta: string
}

function PackagePrice({
    pkg,
    isFavorite,
}: {
    pkg: PricingPackage
    isFavorite: boolean
}) {
    const fixed = pkg.pricing.fixed
    const strike = pkg.pricing.gimmick
    const showFrom = pkg.showStartingFrom === true
    const labelClass = isFavorite
        ? "dark:text-thirdColor text-mainColor/70"
        : "text-neutral-500"
    const priceClass = `font-extrabold text-3xl leading-tight ${
        isFavorite ? "text-darkColor dark:text-lightColor" : ""
    }`

    if (fixed === 0) {
        return <h2 className={priceClass}>Talk With Us!</h2>
    }

    // Starting from — no strikethrough / discount
    if (showFrom) {
        return (
            <>
                <span
                    className={`text-[10px] uppercase tracking-widest font-medium ${labelClass}`}
                >
                    Starting from
                </span>
                <h2 className={priceClass}>{formatToRupiah(fixed)}</h2>
            </>
        )
    }

    // Gimmick: display price + strikethrough original
    if (strike > 0) {
        const discountPct = Math.round((1 - fixed / strike) * 100)
        return (
            <>
                <div className="flex flex-wrap items-baseline gap-2">
                    <h2 className={priceClass}>{formatToRupiah(fixed)}</h2>
                    {discountPct > 0 && (
                        <span className="rounded-full bg-mainColor/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-mainColor dark:bg-thirdColor/15 dark:text-thirdColor">
                            -{discountPct}%
                        </span>
                    )}
                </div>
                <p className={`text-sm line-through ${labelClass}`}>
                    {formatToRupiah(strike)}
                </p>
            </>
        )
    }

    // Plain price — no "Starting from", no strike
    return <h2 className={priceClass}>{formatToRupiah(fixed)}</h2>
}

export const PricingItems = ({
    packages,
    useGrid,
    ctaLabel,
    favoriteCta,
}: PricingItemsProps) => {
    return (
        <>
            {packages.map((el, idx) => {
                const isFavorite = el.favorite === true
                return (
                    <div
                        key={idx}
                        className={`
                            relative flex flex-col transition-all duration-300 ease-out hover:-translate-y-5 hover:shadow-mainShadow rounded-main ${!useGrid && "mt-10"}
                            ${!useGrid
                                ? `min-w-85 ${idx === 0 ? "left-margin" : ""} ${idx === packages.length - 1 ? "right-margin" : ""}`
                                : ""
                            }
                        `}
                    >
                        {isFavorite && (
                            <div className="absolute -top-8.5">
                                <div className="flex items-center gap-1.5 bg-white dark:bg-black dark:text-thirdColor text-mainColor text-xs font-bold px-4 pb-2 pt-2.5 rounded-t-secondary relative">
                                    <div className="rounded-out-br-lg bg-white dark:bg-black" />
                                    Most Popular
                                </div>
                            </div>
                        )}

                        <div className={`flex flex-col h-full p-8 ${isFavorite ? "bg-white rounded-b-main rounded-tr-main dark:bg-black" : "bg-white dark:bg-black rounded-main"}`}>
                            <div className="flex items-center justify-between">
                                <h3 className={`text-xl font-bold ${isFavorite ? "dark:text-thirdColor text-mainColor" : ""}`}>
                                    {el.name}
                                </h3>
                                {isFavorite && (
                                    <div className="size-8 rounded-full bg-mainColor/10 border border-mainColor/30 flex items-center justify-center">
                                        <Star className="size-4 dark:text-thirdColor dark:fill-thirdColor text-mainColor fill-mainColor" />
                                    </div>
                                )}
                            </div>

                            <div className={`mt-4 h-px w-full ${isFavorite ? "bg-mainColor/20 dark:bg-thirdColor/30" : "bg-neutral-200 dark:bg-neutral-800"}`} />

                            <div className="mt-4 min-h-15 flex flex-col justify-center">
                                <PackagePrice pkg={el} isFavorite={isFavorite} />
                            </div>

                            <div className="p-6 rounded-secondary -m-6 flex flex-col justify-between bg-lightColor dark:bg-darkColor mt-7 space-y-2.5 flex-1">
                                {el.deliverables?.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-2.5">
                                        <div className={`mt-0.5 size-4 rounded-full shrink-0 flex items-center justify-center ${isFavorite ? "bg-mainColor/20 dark:text-thirdColor text-mainColor" : "bg-neutral-300 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400"}`}>
                                            <Check className="size-2.5" strokeWidth={3} />
                                        </div>
                                        <p className={`text-sm leading-snug ${isFavorite ? "text-neutral-700 dark:text-neutral-400" : "text-neutral-500"}`}>
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                                <div className="mt-5">
                                    <PricingCtaButton
                                        packageName={el.name}
                                        isFavorite={isFavorite}
                                        ctaLabel={ctaLabel}
                                        favoriteCta={favoriteCta}
                                        whatsappPhone={el.whatsappPhone}
                                        whatsappMessage={el.whatsappMessage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
