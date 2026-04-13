"use client"

import { useState, useEffect, useRef } from "react"
import { Copy, Check, Share2, X, Send, Link2, Share } from "lucide-react"

interface ShareButtonsProps {
    title: string
    excerpt: string
    coverImage: string
    url: string
}

const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
)

const TelegramIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
)

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
)

const XIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
)

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
)

const PinterestIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
)

const LineIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
)

const RedditIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
)

const EmailIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
)

interface Platform {
    name: string
    bg: string
    icon: React.ReactNode
    getUrl: (p: { url: string; title: string; excerpt: string; coverImage: string }) => string
}

const PLATFORMS: Platform[] = [
    {
        name: "WhatsApp",
        bg: "#25D366",
        icon: <WhatsAppIcon />,
        getUrl: ({ url, title, excerpt }) =>
            `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${excerpt.slice(0, 50)}...\n\n${url}`)}`,
    },
    {
        name: "Telegram",
        bg: "#26A5E4",
        icon: <TelegramIcon />,
        getUrl: ({ url, title, excerpt }) =>
            `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${title} — ${excerpt.slice(0, 50)}...`)}`,
    },
    {
        name: "Facebook",
        bg: "#1877F2",
        icon: <FacebookIcon />,
        getUrl: ({ url }) =>
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
        name: "X / Twitter",
        bg: "#000000",
        icon: <XIcon />,
        getUrl: ({ url, title, excerpt }) =>
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${title}\n\n${excerpt.slice(0, 50)}...`)}`,
    },
    {
        name: "LinkedIn",
        bg: "#0A66C2",
        icon: <LinkedInIcon />,
        getUrl: ({ url, title }) =>
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    },
    {
        name: "Pinterest",
        bg: "#E60023",
        icon: <PinterestIcon />,
        getUrl: ({ url, title, excerpt, coverImage }) =>
            `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(coverImage)}&description=${encodeURIComponent(`${title} — ${excerpt.slice(0, 50)}...`)}`,
    },
    {
        name: "LINE",
        bg: "#06C755",
        icon: <LineIcon />,
        getUrl: ({ url, title }) =>
            `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
        name: "Reddit",
        bg: "#FF4500",
        icon: <RedditIcon />,
        getUrl: ({ url, title }) =>
            `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    },
    {
        name: "Email",
        bg: "#6B7280",
        icon: <EmailIcon />,
        getUrl: ({ url, title, excerpt }) =>
            `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n\n${excerpt.slice(0, 50)}...\n\n${url}`)}`,
    },
]

export function ShareButtons({ title, excerpt, coverImage, url }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // Close on outside click
    useEffect(() => {
        if (!menuOpen) return
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [menuOpen])

    // Close on Escape
    useEffect(() => {
        if (!menuOpen) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMenuOpen(false)
        }
        document.addEventListener("keydown", handler)
        return () => document.removeEventListener("keydown", handler)
    }, [menuOpen])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url)
        } catch {
            const el = document.createElement("textarea")
            el.value = url
            document.body.appendChild(el)
            el.select()
            document.execCommand("copy")
            document.body.removeChild(el)
        }
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handlePlatform = (platform: Platform) => {
        const shareUrl = platform.getUrl({ url, title, excerpt, coverImage })
        window.open(shareUrl, "_blank", "noopener,noreferrer,width=620,height=620")
        setMenuOpen(false)
    }

    return (
        <div
            ref={menuRef}
            className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3"
        >
            {/* Share menu panel — slides up from buttons */}
            <div
                className={`
                    transition-all duration-300 ease-out origin-bottom-right
                    ${menuOpen
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 translate-y-3 pointer-events-none"
                    }
                `}
                aria-hidden={!menuOpen}
            >
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/50 p-2.5 w-56">
                    {/* Header */}
                    <div className="flex items-center justify-between px-2 pt-1 pb-2 mb-1 border-b border-neutral-100 dark:border-neutral-800">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                            Bagikan ke
                        </span>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors rounded-md p-0.5"
                            aria-label="Tutup"
                        >
                            <X size={13} />
                        </button>
                    </div>

                    {/* Platform rows */}
                    <div className="flex flex-col gap-0.5">
                        {PLATFORMS.map((platform) => (
                            <button
                                key={platform.name}
                                onClick={() => handlePlatform(platform)}
                                className="flex items-center gap-3 w-full px-2 py-1.5 rounded-xl text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-150 group"
                            >
                                <span
                                    className="flex items-center justify-center w-7 h-7 rounded-lg text-white shrink-0 transition-transform duration-150 group-hover:scale-110"
                                    style={{ backgroundColor: platform.bg }}
                                >
                                    {platform.icon}
                                </span>
                                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                                    {platform.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAB row — copy + share */}
            <div className="flex flex-col items-end gap-2">
                {/* Copy link FAB */}
                <button
                    onClick={handleCopy}
                    aria-label="Salin tautan artikel"
                    title="Salin tautan"
                    className={`
                                 flex items-center justify-center w-11 h-11 rounded-full
                        shadow-lg transition-all duration-200 active:scale-95 relative
                        ${copied
                            ? "bg-green-500 border-green-500 text-white shadow-green-200 dark:shadow-green-900"
                            : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-600 shadow-black/10 dark:shadow-black/40"
                        }
                    `}
                >
                    <span className="transition-transform duration-150" style={{ transform: copied ? "scale(1.1)" : "scale(1)" }}>
                        {copied ? <Check size={15} strokeWidth={2.5} /> : <Link2 size={15} />}
                    </span>
                    {copied && (
                        <span className="absolute -top-1 -left-18 translate-y-1/2 px-2 py-1 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-200 shadow-lg shadow-black/10 dark:shadow-black/40 whitespace-nowrap">
                            Tersalin!
                        </span>
                    )}
                </button>

                {/* Share menu FAB */}
                <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Buka menu bagikan"
                    aria-expanded={menuOpen}
                    title="Bagikan artikel"
                    className={`
                        flex items-center justify-center w-11 h-11 rounded-full
                        shadow-lg transition-all duration-200 active:scale-95
                        ${menuOpen
                            ? "bg-neutral-800 dark:bg-white text-white dark:text-neutral-900 shadow-black/20 dark:shadow-black/50"
                            : "bg-thirdColor text-white hover:opacity-90 shadow-black/15 dark:shadow-black/40 hover:shadow-xl"
                        }
                    `}
                    style={{
                        transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease, background-color 0.2s",
                    }}
                >
                    {menuOpen ? <X size={18} strokeWidth={2} /> : <Share size={18} strokeWidth={2} />}
                </button>
            </div>
        </div>
    )
}