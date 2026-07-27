"use client"

import { whatsappUrl } from "@/config/contact"

interface PricingCtaButtonProps {
    packageName: string
    isFavorite: boolean
    ctaLabel: string
    favoriteCta: string
    whatsappPhone?: string
    whatsappMessage?: string
}

export const PricingCtaButton = ({
    packageName,
    isFavorite,
    ctaLabel,
    favoriteCta,
    whatsappPhone,
    whatsappMessage,
}: PricingCtaButtonProps) => {
    const handleClick = () => {
        const message =
            whatsappMessage?.trim() ||
            `Halo min Gonline, aku mau info soal paket ${packageName}`

        window.open(
            whatsappUrl(message, whatsappPhone || undefined),
            "_blank",
        )
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`cursor-pointer w-full py-3 rounded-full font-semibold text-sm transition-all duration-200 ${isFavorite ? "bg-darkColor text-white dark:bg-lightColor dark:text-black hover:invert active:scale-[0.98]" : "bg-black/5 dark:bg-white/10 text-black dark:text-white border border-black/10 dark:border-white/10 hover:bg-white hover:text-black active:scale-[0.98]"}`}
        >
            {isFavorite ? favoriteCta : ctaLabel}
        </button>
    )
}
