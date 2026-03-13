import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"

export const CtaWebsite = () => {
    return (
        <section className="my-10 relative">
            <div className="rounded-out-lt-main bg-black dark:bg-white"></div>
            <div className="rounded-out-rt-main bg-black dark:bg-white"></div>
            <div className="rounded-out-lb-main bg-black dark:bg-white"></div>
            <div className="rounded-out-rb-main bg-black dark:bg-white"></div>

            <div className="
                relative overflow-hidden
                bg-black dark:bg-white
                px-8 py-14 md:px-13 md:py-20
            ">

                {/* BG GRID TEXTURE */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.09] dark:opacity-[0.06] dark:invert"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, white 1px, transparent 1px),
                            linear-gradient(to bottom, white 1px, transparent 1px)
                        `,
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10">

                    {/* LEFT — TEXT */}
                    <div className="space-y-4 max-w-xl">

                        {/* EYEBROW */}
                        <p className="
                            inline-flex items-center gap-2
                            text-xs font-semibold tracking-widest uppercase
                            text-neutral-400 dark:text-neutral-500
                        ">
                            <span className="size-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                            Siap Memulai?
                        </p>

                        {/* HEADLINE */}
                        <h2 className="
                            text-3xl md:text-5xl font-bold leading-tight tracking-tight
                            text-white dark:text-neutral-900
                        ">
                            Wujudkan website
                            <br />
                            impian Anda{" "}
                            <span className="
                                relative inline-block
                                after:content-[''] after:absolute after:left-0 after:bottom-1
                                after:w-full after:h-0.75
                                after:bg-white dark:after:bg-neutral-900
                                after:rounded-full
                            ">
                                bersama kami.
                            </span>
                        </h2>

                        {/* SUBTEXT */}
                        <p className="text-sm text-neutral-400 dark:text-neutral-500 leading-relaxed max-w-md">
                            Dari landing page sederhana hingga platform kompleks — kami bantu dari konsep hingga launching.
                        </p>

                    </div>

                    {/* RIGHT — BUTTONS */}
                    <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:items-end shrink-0">

                        {/* PRIMARY */}
                        <Link
                            href="/contact"
                            className="
                                group flex items-center justify-center gap-2
                                px-7 py-3.5 rounded-xl
                                bg-white dark:bg-neutral-900
                                text-neutral-900 dark:text-white
                                text-sm font-semibold
                                hover:bg-neutral-100 dark:hover:bg-neutral-800
                                transition-colors duration-150
                                whitespace-nowrap
                            "
                        >
                            Mulai Sekarang
                            <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-1" />
                        </Link>

                        {/* SECONDARY */}
                        <Link
                            href="https://wa.me/YOUR_NUMBER"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                group flex items-center justify-center gap-2
                                px-7 py-3.5 rounded-xl
                                bg-transparent
                                border border-neutral-700 dark:border-neutral-300
                                text-neutral-300 dark:text-neutral-600
                                text-sm font-medium
                                hover:border-neutral-400 dark:hover:border-neutral-500
                                hover:text-white dark:hover:text-neutral-900
                                transition-colors duration-150
                                whitespace-nowrap
                            "
                        >
                            <MessageCircle className="size-4" />
                            Hubungi via WhatsApp
                        </Link>

                    </div>

                </div>

            </div>

        </section>
    )
}