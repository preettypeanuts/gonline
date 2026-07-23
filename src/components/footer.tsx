import Image from "next/image"
import Link from "next/link"
import { dataContact } from "@/app/data"
import { LegalDialog } from "./legal-dialog"
import { PrivacyPolicyContent, TermsOfServiceContent } from "./legal-content"

export const Footer = () => {
    const socialLinks = dataContact.filter((item) =>
        ["Instagram", "LinkedIN", "Email"].includes(item.label)
    )

    return (
        <footer className="relative bg-black text-white dark:bg-white dark:text-black mt-40 transition-colors duration-500 overflow-hidden">

            <div className="absolute -top-10 rounded-main w-full h-20 bg-lightColor dark:bg-darkColor"></div>

            <div className="absolute -bottom-10 md:-bottom-26 left-1/2 -translate-x-1/2 pointer-events-none select-none">
                <p className="text-[18vw] font-semibold tracking-wide text-secondaryLight dark:text-secondaryDark select-none" aria-hidden="true">
                    GONLINE
                </p>
            </div>

            <div className="relative md:px-30 px-4 pb-32 md:pb-65 pt-24">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-16">

                    <div>
                        <Image
                            src="/icon.png"
                            alt="GONLINE Logo"
                            width={140}
                            height={140}
                            className="w-40 h-20 object-cover -ml-3 saturate-0 brightness-500 contrast-200 dark:invert"
                        />

                        <p className="text-sm opacity-70 leading-relaxed">
                            Membantu bisnis membangun fondasi digital yang kuat
                            melalui website, social media, dan strategi digital
                            yang terintegrasi.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm uppercase tracking-widest opacity-50 mb-6">
                            Halaman
                        </h4>

                        <ul className="space-y-4 text-sm">
                            <li>
                                <Link href="/" className="hover:opacity-100 opacity-70 transition">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:opacity-100 opacity-70 transition">
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link href="/our-work" className="hover:opacity-100 opacity-70 transition">
                                    Portofolio
                                </Link>
                            </li>
                            <li>
                                <Link href="/insight" className="hover:opacity-100 opacity-70 transition">
                                    Insight
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:opacity-100 opacity-70 transition">
                                    Kontak
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm uppercase tracking-widest opacity-50 mb-6">
                            Layanan
                        </h4>

                        <ul className="space-y-4 text-sm">
                            <li>
                                <Link href="/website-development" className="hover:opacity-100 opacity-70 transition">
                                    Website Development
                                </Link>
                            </li>
                            <li>
                                <Link href="/social-media" className="hover:opacity-100 opacity-70 transition">
                                    Social Media Management
                                </Link>
                            </li>
                            <li>
                                <Link href="/go-digital" className="hover:opacity-100 opacity-70 transition">
                                    GO Digital
                                </Link>
                            </li>
                            <li>
                                <Link href="/our-work/website" className="hover:opacity-100 opacity-70 transition">
                                    Portofolio Website
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm uppercase tracking-widest opacity-50 mb-6">
                            Sosial
                        </h4>

                        <ul className="space-y-4 text-sm">
                            {socialLinks.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:opacity-100 opacity-70 transition"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/10 dark:border-black/10 flex flex-col md:flex-row justify-between text-sm opacity-60 gap-4">
                    <p>© {new Date().getFullYear()} GONLINE. All rights reserved.</p>
                    <div className="flex gap-6">
                        <LegalDialog label="Privacy Policy" title="Privacy Policy">
                            <PrivacyPolicyContent />
                        </LegalDialog>
                        <LegalDialog label="Terms of Service" title="Terms of Service">
                            <TermsOfServiceContent />
                        </LegalDialog>
                    </div>
                </div>
            </div>
        </footer>
    )
}
