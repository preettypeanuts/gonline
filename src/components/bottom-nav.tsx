"use client"

import { useState } from "react"
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
    BarChart3,
    HouseHeart,
    LucideMessageCircleHeart,
} from "lucide-react";
import MobileThemeSwitch from "./mobile-theme-switch"

const navItems = [
    { label: "Home", icon: IconHome, href: "/" },
    { label: "Insight", icon: IconInsight, href: "/insight" },
    { label: "Menu", icon: IconService },
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
                            const isActive = item.href ? pathname === item.href : serviceOpen
                            const Icon = item.icon

                            const content = (
                                <div className={`relative flex items-center justify-center duration-300
                                ${idx === 0 && isActive && !serviceOpen && "-ml-4"}
                                ${idx === navItems.length - 1 && isActive && !serviceOpen && "-mr-4"}
                                ${isActive && !serviceOpen ? "px-3 py-2 bg-black/30 dark:bg-white/30 rounded-full  flex-row" : "flex-col"}`}>

                                    <Icon
                                        filled={true}
                                        className={`
                                        ${serviceOpen ? "-translate-y-5" : ""} ${item.label === "Menu" && serviceOpen && "rotate-45"}
                                        size-6 relative z-10 transition-all duration-200 ${isActive ? "text-white" : "text-neutral-300"}`}
                                    />
                                    {isActive && !serviceOpen && (
                                        <div className={`text-xs ml-1.5 duration-300
                                            ${isActive ? "text-white font-bold" : "text-neutral-300"}`}>
                                            {item.label}
                                        </div>
                                    )}
                                    <span className={`
                                            duration-300 absolute
                                            ${serviceOpen ? "" : "translate-y-1 scale-90 opacity-0"} 
                                            ${isActive ? "text-white" : "text-neutral-300"} text-[9px]`}>
                                        {item.label}
                                    </span>

                                </div>
                            )

                            if (!item.href) {
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

                </nav >
            </div >
        </>
    )
}