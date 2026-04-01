"use client"

interface PricingCtaButtonProps {
    packageName: string
    isFavorite: boolean
    ctaLabel: string
    favoriteCta: string
}

export const PricingCtaButton = ({ packageName, isFavorite, ctaLabel, favoriteCta }: PricingCtaButtonProps) => {
    const handleClick = () => {
        const message = encodeURIComponent(`Halo min Gonline, aku mau info soal paket ${packageName} nihh`)
        window.open(`https://wa.me/6285117388880?text=${message}`, '_blank')
    }

    return (
        <button
            onClick={handleClick}
            className={`cursor-pointer w-full py-3 rounded-full font-semibold text-sm transition-all duration-200 ${isFavorite ? "bg-darkColor text-white dark:bg-lightColor dark:text-black hover:invert active:scale-[0.98]" : "bg-black/5 dark:bg-white/10 text-black dark:text-white border border-black/10 dark:border-white/10 hover:bg-white hover:text-black active:scale-[0.98]"}`}>
            {isFavorite ? favoriteCta : ctaLabel}
        </button>
    )
}