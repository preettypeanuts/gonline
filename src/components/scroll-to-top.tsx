"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const ScrollToTop = () => {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 200);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <button
            onClick={scrollToTop}
            className={` bg-black dark:bg-white hover:bg-secondaryDark dark:hover:bg-secondaryLight active:scale-90 cursor-pointer text-thirdColor rounded-full flex items-center justify-center duration-500 border border-neutral-200/15 dark:border-neutral-800/10 transition-all ease-in-out
  ${isScrolled
                    ? "scale-100 opacity-100 translate-x-0 pointer-events-auto md:w-11.5 md:h-11.5 w-11 h-11 blur-none"
                    : "scale-50 -translate-x-10 opacity-0 pointer-events-none w-0 h-0 blur-sm"
                }
`}
        >
            <svg
                className={`${isScrolled ? "w-5.5 h-5.5" : "w-0 h-0"} duration-300 ease-in-out`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                ></path>
            </svg>
        </button>
    )
}