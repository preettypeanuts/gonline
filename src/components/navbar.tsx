"use client";

import Link from "next/link";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import ThemeSwitch from "./theme";

/* ============================= */
/* Types                         */
/* ============================= */

type MenuKey = "services" | "about";

interface MenuItem {
    title: string;
    description: string;
    icon: string;
    href?: string;
}

interface MegaMenuProps {
    isOpen: boolean;
    items: MenuItem[];
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

/* ============================= */
/* Mega Menu                     */
/* ============================= */

const MegaMenu = ({
    isOpen,
    items,
    onMouseEnter,
    onMouseLeave,
}: MegaMenuProps) => {
    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`grid gap-3 w-full overflow-hidden ${isOpen ? "pb-3" : "p-0"
                }`}
            style={{
                gridTemplateColumns: isOpen
                    ? "repeat(2, 1fr)"
                    : "repeat(2, 0fr)",
                maxHeight: isOpen ? "600px" : "0px",
                opacity: isOpen ? 1 : 0,
                transition:
                    "max-height 500ms ease, opacity 300ms ease, grid-template-columns 400ms ease",
            }}
        >
            {items.map((item, index) => (
                <div
                    key={index}
                    style={{
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen
                            ? "translateY(0px)"
                            : "translateY(15px)",
                        transition: `all 400ms ease ${index * 60}ms`,
                    }}
                >
                    <Link
                        href={item.href ?? "#"}
                        className="block group p-4 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10  border border-white/10 hover:border-white/20 transition-all duration-300 h-full rounded-2xl"
                    >
                        <div className="text-2xl mb-2 transition-transform">
                            {item.icon}
                        </div>
                        <h3 className="font-semibold text-sm mb-1">
                            {item.title}
                        </h3>
                        <p className="opacity-60 text-xs leading-relaxed">
                            {item.description}
                        </p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

/* ============================= */
/* Navbar                        */
/* ============================= */

export const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState<MenuKey | null>(
        null
    );

    const menuData: Record<MenuKey, MenuItem[]> = {
        services: [
            {
                title: "Web Development",
                description: "Custom websites & web applications",
                icon: "🌐",
            },
            {
                title: "Mobile Apps",
                description: "iOS & Android development",
                icon: "📱",
            },
            {
                title: "UI/UX Design",
                description: "Beautiful & functional interfaces",
                icon: "🎨",
            },
            {
                title: "Consulting",
                description: "Strategic tech guidance",
                icon: "💡",
            },
            {
                title: "Consulting",
                description: "Strategic tech guidance",
                icon: "💡",
            }, {
                title: "Consulting",
                description: "Strategic tech guidance",
                icon: "💡",
            },

        ],
        about: [
            {
                title: "Our Story",
                description: "How we started & our journey",
                icon: "📖",
            },
            {
                title: "Our Team",
                description: "Meet the experts behind us",
                icon: "👥",
            },
            {
                title: "Careers",
                description: "Join our growing team",
                icon: "🚀",
            },
            {
                title: "Culture",
                description: "What drives our company",
                icon: "🏢",
            },
        ],
    };

    const isExpanded = activeMenu !== null;

    const renderNavItem = (label: string, key?: MenuKey) => (
        <div
            className="relative"
            onMouseEnter={() =>
                key ? setActiveMenu(key) : null
            }
        >
            <button className="opacity-70 hover:opacity-100 relative">
                <div className={`${activeMenu === key ? "rounded-full px-3 py-1 bg-black text-lightColor dark:bg-white dark:text-darkColor" : ""} cursor-pointer duration-500 ease-in-out text-sm font-semibold`}>
                    {label}
                    <span>
                        {key && <GrAdd className={`inline-block ml-1 mb-1 text-xs duration-300 ${activeMenu === key ? "rotate-225 mb-0 mt-0.5" : ""}`} />}
                    </span>
                </div>
            </button>
        </div>
    );

    return (
        <nav className="hidden fixed left-1/2 top-5 z-50 -translate-x-1/2 md:flex items-start gap-1">
            <div
                onMouseLeave={() => setActiveMenu(null)}
                className={`relative bg-white dark:bg-black rounded-[25px] px-4 pt-2 pb-3 flex flex-col items-center w-full ${isExpanded ? "shadow-mainColor/50 shadow-mainShadow" : ""}`}
                style={{
                    transition: "width 5000ms ease",
                }}
            >
                {/* Top Links */}
                <div
                    className="flex gap-10 justify-center items-center w-full"
                    style={{
                        marginBottom: isExpanded ? "24px" : "0px",
                        transition: "margin-bottom 300ms ease",
                    }}
                >
                    {renderNavItem("Home")}
                    {renderNavItem("Services", "services")}
                    {renderNavItem("About", "about")}
                    {renderNavItem("Our Works")}
                    {renderNavItem("Insight")}
                    {renderNavItem("Contact")}
                </div>

                {/* Single MegaMenu */}
                <MegaMenu
                    isOpen={isExpanded}
                    items={
                        activeMenu
                            ? menuData[activeMenu]
                            : []
                    }
                    onMouseEnter={() => {
                        if (activeMenu)
                            setActiveMenu(activeMenu);
                    }}
                    onMouseLeave={() => setActiveMenu(null)}
                />
            </div>
            <ThemeSwitch />
        </nav>
    );
};
