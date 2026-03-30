"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Atom, Boxes, Clover, Plus } from "lucide-react";
import { Ad } from "@/types/ad";
import Link from "next/link";
import ThemeSwitch from "./theme";
import Image from "next/image";
import SmartImage from "./smart-image";
import { ScrollToTop } from "./scroll-to-top";
import { FloatingButtonWhatsapp } from "./floating-button-whatsapp";

type MenuKey = "services" | "about";

interface MenuItem {
    title: string;
    description: string;
    icon: React.ElementType;
    href?: string;
    col?: string;
    img?: string;
}

interface MegaMenuProps {
    isOpen: boolean;
    items: MenuItem[];
    ads: Ad[];
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

interface NavbarProps {
    ads: Ad[];
}

const AdCarousel = ({ ads }: { ads: Ad[] }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (ads.length <= 1) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % ads.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [ads.length]);

    return (
        <Link href={ads[current]?.href ?? "#"} className="h-full block">
            <div className="relative w-66.5 shrink-0 h-full rounded-secondary overflow-hidden border border-white/30 hover:border-white/40 hover:brightness-85 duration-300">
                {ads.map((ad, i) => (
                    <Image
                        key={i}
                        src={ad.image}
                        alt={`Ad ${i + 1}`}
                        fill
                        className="object-cover transition-opacity duration-700"
                        style={{ opacity: i === current ? 1 : 0 }}
                    />
                ))}
                {ads.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {ads.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.preventDefault(); setCurrent(i); }}
                                className={`rounded-full transition-all duration-300 ${i === current ? "w-3 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"
                                    }`}
                            />
                        ))}˚
                    </div>
                )}
            </div>
        </Link>
    );
};

const MegaMenu = ({ isOpen, items, ads, onMouseEnter, onMouseLeave }: MegaMenuProps) => {
    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="w-full overflow-hidden"
            style={{
                maxHeight: isOpen ? "600px" : "0px",
                opacity: isOpen ? 1 : 0,
                transition: "max-height 500ms ease, opacity 300ms ease",
            }}
        >
            <div className="flex gap-3 items-stretch">
                <div
                    className="grid gap-3 flex-1 h-full"
                    style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`${item.col} min-w-60 min-h-40`}
                            style={{
                                opacity: isOpen ? 1 : 0,
                                transform: isOpen ? "translateY(0px)" : "translateY(15px)",
                                transition: `all 400ms ease ${index * 60}ms`,
                            }}
                        >
                            <Link
                                href={item.href ?? "#"}
                                className="overflow-hidden relative flex flex-col justify-between group p-4 bg-white/5 hover:bg-black/10 dark:bg-black/5 dark:hover:bg-white/10 border border-white/10 dark:border-black/10 hover:border-white/20 transition-all duration-300 h-full rounded-secondary"
                            >
                                <SmartImage
                                    width={300}
                                    height={300}
                                    src={item.img ?? "https://images.unsplash.com/photo-1694327875197-252cfe16f668?q=80&w=2232&auto=format&fit=crop"}
                                    alt={item.title}
                                    className={`${item.img ? "group-hover:scale-110 duration-200 absolute inset-0 z-0 w-full h-full object-cover brightness-110 dark:invert-0 invert dark:hue-rotate-30" : "hidden"}`}
                                />
                                <div className="flex items-center gap-2 mb-2 z-50 text-white dark:text-black">
                                    <item.icon className="size-4.5" />
                                    <h3 className="font-semibold text-md">{item.title}</h3>
                                </div>
                                <p className="opacity-60 text-xs leading-relaxed z-50 text-white dark:text-black">
                                    {item.description}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>

                {ads.length > 0 && (
                    <div
                        style={{
                            opacity: isOpen ? 1 : 0,
                            transform: isOpen ? "translateY(0px)" : "translateY(15px)",
                            transition: "all 400ms ease 180ms",
                        }}
                    >
                        <AdCarousel ads={ads} />
                    </div>
                )}
            </div>
        </div>
    );
};

export const Navbar = ({ ads }: NavbarProps) => {
    const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
    const [activeLabel, setActiveLabel] = useState<string | null>(null);
    const pathname = usePathname();

    const menuData: Record<MenuKey, MenuItem[]> = {
        services: [
            {
                title: "GO Digital",
                description: "A bundled service combining Website Development and Social Media Management to build a complete digital presence for your business.",
                href: "/go-digital",
                col: "row-span-2",
                img: "https://images.unsplash.com/photo-1579543228532-77621eee55a0?q=80&w=1064&auto=format&fit=crop",
                icon: Boxes,
            },
            {
                title: "GO Website",
                description: "Professional website development designed to increase credibility and generate more leads for your business.",
                href: "/website-development",
                col: "row-span-1",
                icon: Atom,
            },
            {
                title: "GO Social",
                description: "End-to-end social media management including content strategy, design, and optimization to grow engagement.",
                href: "/social-media",
                col: "row-span-1",
                icon: Clover,
            },
        ],
        about: [
            { title: "Our Story", description: "How we started & our journey", icon: Clover },
            { title: "Our Team", description: "Meet the experts behind us", icon: Clover },
            { title: "Careers", description: "Join our growing team", icon: Clover },
            { title: "Culture", description: "What drives our company", icon: Clover },
        ],
    };

    const isExpanded = activeMenu !== null;

    const renderNavItem = (label: string, key?: MenuKey, href: string = "#") => {
        const isActiveRoute = !key && href !== "#" && pathname === href;

        const content = (
            <div
                className={`
                    ${isActiveRoute || activeMenu === key
                        ? "px-3 py-1 bg-white text-black! dark:bg-black dark:text-white!"
                        : ""}
                    hover:px-3 hover:py-1 hover:bg-white hover:text-black
                    dark:hover:bg-black dark:hover:text-white
                    rounded-full cursor-pointer duration-500 ease-in-out
                    text-sm font-semibold
                    truncate flex items-center
                    text-lightColor dark:text-darkColor
                `}
            >
                {label}
                {key && (
                    <Plus
                        size={15}
                        className={`ml-1 mb-1 text-xs duration-300 ${activeMenu === key ? "rotate-225 mt-1" : ""}`}
                    />
                )}
            </div>
        );

        return (
            <div
                className="relative"
                onMouseEnter={() => {
                    setActiveLabel(label);
                    setActiveMenu(key ?? null);
                }}
            >
                {key ? (
                    <button className="relative">{content}</button>
                ) : (
                    <Link href={href} className="relative">{content}</Link>
                )}
            </div>
        );
    };

    return (
        <div className="hidden fixed left-1/2 top-5 z-50 -translate-x-1/2 md:flex items-center justify-center w-full">
            <nav className="md:flex items-center gap-1">
                <Link
                    href="/"
                    className="self-start shrink-0 bg-black dark:bg-white rounded-full border border-neutral-200/15 dark:border-neutral-800/10"
                    style={{ transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                >
                    <Image
                        width={100}
                        height={100}
                        src="/icon.png"
                        alt="GONLINE Logo"
                        className="w-27 h-11 object-cover px-1.5 saturate-0 brightness-500 contrast-200 dark:invert"
                    />
                </Link>

                <nav
                    onMouseLeave={() => {
                        setActiveMenu(null);
                        setActiveLabel(null);
                    }}
                    className={`relative bg-black dark:bg-white rounded-main px-2 py-2 overflow-hidden flex flex-col items-center w-full duration-300 ease-in-out transition-all border border-neutral-200/15 dark:border-neutral-800/10 ${isExpanded ? "border-neutral-300/30! dark:border-neutral-800/30 shadow-mainShadow w-200! rounded-main!" : "w-143.5!"}`}
                >
                    <div
                        className="flex gap-10 justify-center items-center w-full!"
                        style={{
                            marginBottom: isExpanded ? "24px" : "0px",
                            transition: "margin-bottom 300ms ease",
                        }}
                    >
                        {renderNavItem("Home", undefined, "/")}
                        {renderNavItem("Services", "services")}
                        {renderNavItem("About", undefined, "/about")}
                        {renderNavItem("Our Works", undefined, "/our-work")}
                        {renderNavItem("Insight", undefined, "/insight")}
                        {renderNavItem("Contact", undefined, "/contact")}
                    </div>

                    <MegaMenu
                        isOpen={isExpanded}
                        items={activeMenu ? menuData[activeMenu] : []}
                        ads={ads}
                        onMouseEnter={() => { if (activeMenu) setActiveMenu(activeMenu); }}
                        onMouseLeave={() => { setActiveMenu(null); setActiveLabel(null); }}
                    />
                </nav>

                <div
                    className="self-start shrink-0 bg-black dark:bg-white rounded-full border border-neutral-200/15 dark:border-neutral-800/10"
                    style={{ transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                >
                    <ThemeSwitch />
                </div>

                <div
                    className="self-start shrink-0 hidden md:block"
                    style={{ transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                >
                    <FloatingButtonWhatsapp />
                </div>

                <div
                    className="self-start shrink-0"
                    style={{ transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                >
                    <ScrollToTop />
                </div>



            </nav>
        </div>
    );
};