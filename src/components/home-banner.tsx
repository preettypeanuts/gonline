"use client"

import { useState, useEffect } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { Button } from "./ui/button";

const images = [
    "https://images.unsplash.com/photo-1519397652863-aad621636ac7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1663016143122-45c2c18dd0f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1608048608477-30389696fdc1?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1722005925210-922fe2b198a3?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

export const HomeBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Auto-play setiap 5 detik

        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section className="w-full h-screen relative overflow-hidden">
            {/* Carousel Images */}
            <div className="relative w-full h-screen">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`BG Banner ${index + 1}`}
                        className={`absolute top-0 left-0 w-full h-screen object-cover object-center transition-opacity duration-1000 brightness-90 ${index === currentIndex ? "opacity-100 blur-none" : "opacity-0 blur-xs"
                            }`}
                    />
                ))}
            </div>

            {/* Carousel Indicators */}
            <div className="absolute bottom-5 right-5 transform flex gap-2 z-20 md:bottom-10 md:right-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === currentIndex
                            ? "bg-white w-6 md:w-8"
                            : "bg-white/50 hover:bg-white/75"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Get Started Button - Responsive */}
            <Button
                size={"lg"}
                className="absolute left-4 top-1/2 md:left-6 lg:left-10 text-sm md:text-base md:w-60">
                <div className="flex items-center justify-between! gap-2 text-mainColor w-full">
                    <div>
                        <span className="hidden sm:inline">Get Started</span>
                        <span className="sm:hidden">Start</span>
                    </div>
                    <IoMdArrowForward className="inline-block" />
                </div>
            </Button>

            {/* Bottom Left Content - Responsive */}
            <div className="absolute bottom-0 left-0">
                <div className="pb-6 px-4 pt-6 md:pb-10 md:px-6 md:pt-8 lg:pb-13 lg:px-10 lg:pt-11 bg-lightColor dark:bg-darkColor rounded-tr-2xl md:rounded-tr-3xl">
                    <h1 className="font-light text-3xl sm:text-4xl md:text-5xl lg:text-[85px] text-darkColor dark:text-lightColor leading-tight md:leading-snug lg:leading-11">
                        <p>
                            where ideas
                        </p>
                        <br className="hidden lg:block" />
                        <p className="text-secondaryColor">
                            go online.
                        </p>
                    </h1>
                    <div className="rounded-out-lt-3xl bg-lightColor dark:bg-darkColor"></div>
                    <div className="rounded-out-br-3xl bg-lightColor dark:bg-darkColor"></div>
                </div>
            </div>

            {/* Right Content - Responsive */}
            <div className="absolute right-0 top-1/4 md:top-2/12 p-4 md:p-6 lg:p-10 bg-lightColor rounded-l-2xl md:rounded-l-3xl max-w-[200px] sm:max-w-[250px] md:max-w-xs lg:max-w-none">
                <p className="font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-3 lg:mb-5">
                    <span className="text-thirdColor">100%</span>
                </p>
                <p className="text-xs sm:text-sm md:text-base">
                    We put whats on your mind, GONLINE.
                </p>
                <div>
                    <Button
                        variant={"invert"}
                        className="mt-5 text-white">
                        Learn More
                    </Button>
                </div>
                <div className="rounded-out-rt-3xl bg-lightColor dark:bg-darkColor"></div>
                <div className="rounded-out-rb-3xl bg-lightColor dark:bg-darkColor"></div>
            </div>
        </section>
    );
};