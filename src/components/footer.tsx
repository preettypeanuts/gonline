import Image from "next/image"

export const Footer = () => {
    return (
        <footer className="relative bg-black text-white dark:bg-white dark:text-black mt-40 transition-colors duration-500 overflow-hidden">
            <div className="absolute -top-10 rounded-3xl w-full h-20 bg-lightColor dark:bg-darkColor"></div>

            {/* Huge Background Typography */}
            <div className="absolute -bottom-10 md:-bottom-26 left-1/2 -translate-x-1/2 pointer-events-none select-none">
                <h1 className="text-[18vw] font-semibold tracking-wide text-secondaryLight dark:text-secondaryDark">
                    GONLINE
                </h1>
            </div>

            <div className="relative max-w-7xl mx-auto px-8 pb-32 md:pb-65 pt-24">

                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16">

                    {/* Brand */}
                    <div>
                        <Image
                            src="/icon.png"
                            alt="GONLINE Logo"
                            width={140}
                            height={140}
                            className="w-40 h-20 object-cover -ml-3 saturate-0 brightness-500 contrast-200 dark:invert"
                        />

                        <p className="text-sm opacity-70 leading-relaxed">
                            We help brands build strong digital foundations —
                            through strategy, design, and development.
                        </p>
                    </div>

                    {/* Essential */}
                    <div>
                        <h4 className="text-sm uppercase tracking-widest opacity-50 mb-6">
                            The Essential
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li className="hover:opacity-100 opacity-70 transition">Home</li>
                            <li className="hover:opacity-100 opacity-70 transition">About</li>
                            <li className="hover:opacity-100 opacity-70 transition">Services</li>
                            <li className="hover:opacity-100 opacity-70 transition">Work</li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm uppercase tracking-widest opacity-50 mb-6">
                            The Boring
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li className="hover:opacity-100 opacity-70 transition">Privacy Policy</li>
                            <li className="hover:opacity-100 opacity-70 transition">Terms of Use</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-sm uppercase tracking-widest opacity-50 mb-6">
                            The Social
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li className="hover:opacity-100 opacity-70 transition">Instagram</li>
                            <li className="hover:opacity-100 opacity-70 transition">LinkedIn</li>
                            <li className="hover:opacity-100 opacity-70 transition">Email Us</li>
                        </ul>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-20 pt-8 border-t border-white/10 dark:border-black/10 flex flex-col md:flex-row justify-between text-sm opacity-60 gap-4">
                    <p>© {new Date().getFullYear()} GONLINE. All rights reserved.</p>
                    <p>Built with clarity and purpose.</p>
                </div>

            </div>
        </footer>
    )
}
