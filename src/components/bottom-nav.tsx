"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
    IconHome,
    IconInsight,
    IconService,
    IconWork,
    IconContact,
} from "@/components/icons"

import {
    Boxes,
    Atom,
    Clover,
    HouseHeart,
    LucideMessageCircleHeart,
} from "lucide-react";

import MobileThemeSwitch from "./mobile-theme-switch"
import { handleWhatsApp } from "./floating-button-whatsapp"

const navItems = [
    { label: "Home", icon: IconHome, href: "/" },
    { label: "Insight", icon: IconInsight, href: "/insight" },
    { label: "Menu", icon: IconService, href: "menu" },
    { label: "Work", icon: IconWork, href: "/our-work" },
    { label: "Contact", icon: IconContact, href: "/contact" },
]

interface ServiceItem {
    title: string;
    description: string;
    icon: React.ElementType;
    href: string;
}

const serviceItems: ServiceItem[] = [
    {
        title: "GO Digital",
        description: "Website + Social Media bundled for full digital presence.",
        icon: Boxes,
        href: "/go-digital",
    },
    {
        title: "GO Website",
        description: "Professional web development to grow your leads.",
        icon: Atom,
        href: "/website-development",
    },
    {
        title: "GO Social",
        description: "Content strategy, design & social media management.",
        icon: Clover,
        href: "/social-media",
    },
    {
        title: "About Us",
        description: "Know more about Gonline",
        icon: HouseHeart,
        href: "/about",
    },
];

export const BottomNav = () => {
    const pathname = usePathname()
    const [serviceOpen, setServiceOpen] = useState(false)

    useEffect(() => {
        setServiceOpen(false)
    }, [pathname])

    const isActive = (link: string) => {
        if (link === "/") {
            return pathname === link;
        }
        return pathname.startsWith(link);
    };

    return (
        <>
            <div
                className={`fixed inset-0 z-40 transition-opacity duration-300 bg-black/20 ${serviceOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setServiceOpen((prev) => !prev)}
            />

            <div className="fixed left-4 right-4 bottom-4 z-50 md:hidden">
                <nav className={`
                flex flex-col items-center px-1.5 py-2 rounded-main overflow-hidden border border-neutral-300/20
                ${serviceOpen ? "bg-black/90 backdrop-blur-xs backdrop-brightness-90" : "bg-neutral-700/40 backdrop-blur-min backdrop-brightness-90"}
                `}>


                    {/* Mega Menu — expands upward smoothly */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateRows: serviceOpen ? "1fr" : "0fr",
                            opacity: serviceOpen ? 1 : 0,
                            transition: "grid-template-rows 350ms ease, opacity 300ms ease",
                            width: "100%",
                        }}
                    >

                        <div style={{ overflow: "hidden" }}>
                            <div className="flex gap-2 w-full">
                                <div className="flex flex-row items-center gap-2 p-3 w-full rounded-secondary group text-neutral-300 bg-white/5"
                                >
                                    <LucideMessageCircleHeart />
                                    <span className="text-sm font-medium">
                                        WhatsApp
                                    </span>
                                </div>
                                <MobileThemeSwitch />
                            </div>


                            <div className="grid grid-cols-2 gap-2 pb-1 mb-10 mt-2">
                                {serviceItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        onClick={() => setServiceOpen(false)}
                                        className="flex flex-col gap-2 p-3 rounded-secondary group"
                                        style={{
                                            background: "rgba(255,255,255,0.05)",
                                            transition: `opacity 350ms ease ${index * 55 + 80}ms, transform 350ms ease ${index * 55 + 80}ms, background 200ms ease, border-color 200ms ease`,
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)";
                                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                                        }}
                                    >
                                        <div
                                            className="w-7 h-7 rounded-lg flex items-center justify-center"
                                            style={{ background: "rgba(255,255,255,0.08)" }}
                                        >
                                            <item.icon
                                                size={14}
                                                strokeWidth={1.8}
                                                style={{ color: "rgba(255,255,255,0.8)" }}
                                            />
                                        </div>
                                        <div>
                                            <p
                                                className="text-xs font-semibold leading-tight"
                                                style={{ color: "rgba(255,255,255,0.9)" }}
                                            >
                                                {item.title}
                                            </p>
                                            <p
                                                className="text-[10px] leading-relaxed mt-0.5"
                                                style={{ color: "rgba(255,255,255,0.4)" }}
                                            >
                                                {item.description}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Nav Bar */}
                    <div className="flex items-center justify-around w-full">
                        {navItems.map((item, idx) => {

                            const Icon = item.icon

                            const content = (
                                <div className={`relative flex items-center justify-center duration-300
                                    ${!isActive(item.href ? item.href : "") && "py-1.5"}
                                    ${idx === 0 && isActive(item.href ? item.href : "") && !serviceOpen && "-ml-4"}
                                    ${idx === navItems.length - 1 && isActive(item.href ? item.href : "") && !serviceOpen && "-mr-4"}
                                    ${isActive(item.href ? item.href : "") && !serviceOpen ? "px-3 py-2 bg-black/30 dark:bg-white/30 rounded-full  flex-row" : "flex-col"}`}>


                                    <Icon
                                        filled={true}
                                        className={`
                                        ${serviceOpen ? "-translate-y-5" : ""} ${item.label === "Menu" && serviceOpen && "rotate-45"}
                                        size-6 relative z-10 transition-all duration-200 ${isActive(item.href ? item.href : "") ? "text-white" : "text-neutral-300"}`}
                                    />
                                    {isActive(item.href ? item.href : "") && !serviceOpen && (
                                        <div className={`text-xs ml-1.5 duration-300
                                            ${isActive(item.href ? item.href : "") ? "text-white font-bold" : "text-neutral-300"}`}>
                                            {item.label}
                                        </div>
                                    )}
                                    <span className={`
                                            duration-300 absolute
                                            ${serviceOpen ? "" : "translate-y-1 scale-90 opacity-0"} 
                                            ${isActive(item.href ? item.href : "") ? "text-white" : "text-neutral-300"} text-[9px]`}>
                                        {item.label}
                                    </span>

                                </div>
                            )

                            if (item.href === "menu") {
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setServiceOpen((prev) => !prev)}
                                    >
                                        {content}
                                    </button>
                                )
                            }

                            return (
                                <Link key={idx} href={item.href}>
                                    {content}
                                </Link>
                            )
                        })}
                    </div>

                </nav>
            </div>

            <div className="block md:hidden fixed top-4 right-4 z-100">
                <button
                    onClick={handleWhatsApp}
                    aria-label="Chat via WhatsApp"
                    className="aspect-square bg-black dark:bg-white text-green-400 dark:text-[#31c529] hover:bg-secondaryDark dark:hover:bg-secondaryLight active:scale-95 duration-300 ease-in-out p-2.5 rounded-full cursor-pointer flex items-center justify-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        width="18"
                        height="18"
                        fill="currentColor"
                    >
                        <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809 8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507zM16.062 28.228c-2.319 0-4.489-0.64-6.342-1.753l-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852-0.799-0.74-1.484-1.587-2.037-2.521-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604 0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463-0.802 0.761-1.3 1.834-1.3 3.023 0.131 1.467 0.681 2.784 1.527 3.857 1.604 2.379 3.742 4.282 6.251 5.564 0.548 0.248 1.25 0.513 1.968 0.74 0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078 1.069-0.223 1.956-0.868 2.497-1.749 0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542-0.092-0.155-0.34-0.247-0.712-0.434z" />
                    </svg>
                </button>
            </div>
        </>
    )
}