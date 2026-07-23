import Link from "next/link"
import SmartImage from "./smart-image"
import { whatsappUrl } from "@/config/contact"

function CtaPanel() {
    return (
        <div className="bg-white dark:bg-black rounded-2xl px-4 py-6 md:px-8 md:py-10 text-center">
            <p className="text-xs md:text-sm uppercase tracking-widest text-thirdColor font-medium mb-2 md:mb-3">
                Siap Mulai?
            </p>

            <h2 className="text-2xl md:text-5xl font-semibold leading-tight mb-3 md:mb-4">
                Mari bangun sesuatu <br />
                <span className="text-mainColor">yang berdampak bersama.</span>
            </h2>

            <p className="text-sm md:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-6 md:mb-8">
                Kami bantu brand tumbuh lewat strategi digital yang terstruktur,
                desain yang rapi, dan eksekusi yang bertujuan.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <Link
                    href="/contact"
                    className="w-full sm:w-auto px-8 py-3 rounded-full bg-mainColor text-white font-medium hover:opacity-90 transition text-center"
                >
                    Mulai Proyek
                </Link>
                <Link
                    href={whatsappUrl("Halo GONLINE, saya ingin jadwalkan konsultasi.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-3 rounded-full border border-neutral-300 dark:border-neutral-600 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-center"
                >
                    Chat WhatsApp
                </Link>
            </div>
        </div>
    )
}

export const CTA = () => {
    return (
        <section className="spacing">
            <div className="relative">
                <div className="w-full h-20 bg-lightColor dark:bg-darkColor rounded-main absolute -top-15" />
                <SmartImage
                    width={700}
                    height={700}
                    className="w-full h-[50lvh] md:h-[70lvh] object-cover rounded-b-main"
                    src="https://images.unsplash.com/photo-1459664018906-085c36f472af?q=80&w=2070&auto=format&fit=crop"
                    alt="Tim GONLINE siap membantu bisnis go digital"
                />

                <div className="block md:hidden absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-xs">
                    <div className="rounded-out-bl-3xl bg-lightColor dark:bg-darkColor" />
                    <div className="rounded-out-br-3xl bg-lightColor dark:bg-darkColor" />
                    <CtaPanel />
                </div>

                <div className="md:block hidden absolute bottom-0 left-1/2 -translate-x-1/2 bg-lightColor dark:bg-darkColor rounded-t-3xl px-2.5 pt-2.5 md:px-3 md:pt-3 w-full max-w-4xl">
                    <div className="rounded-out-bl-3xl bg-lightColor dark:bg-darkColor" />
                    <div className="rounded-out-br-3xl bg-lightColor dark:bg-darkColor" />
                    <CtaPanel />
                </div>
            </div>
        </section>
    )
}
