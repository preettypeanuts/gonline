"use client"

import { useState, useEffect } from "react";
import SmartImage from "./smart-image";

const images = [
    "https://images.unsplash.com/photo-1608048608477-30389696fdc1?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1519397652863-aad621636ac7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1663016143122-45c2c18dd0f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1722005925210-922fe2b198a3?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

export const HomeBannerCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Images */}
            <div className="relative w-full h-screen">
                {images.map((image, index) => (
                    <SmartImage
                        width={1000}
                        height={1000}
                        key={index}
                        src={image}
                        alt={`BG Banner ${index + 1}`}
                        className={`absolute top-0 left-0 w-full h-screen object-cover object-center transition-opacity duration-1000 brightness-90 rounded-br-main ${
                            index === currentIndex
                                ? "opacity-100 blur-none"
                                : "opacity-0 blur-xs"
                        }`}
                    />
                ))}
            </div>

            {/* Indicators */}
            <div className="absolute bottom-5 right-5 flex gap-2 z-20 md:bottom-10 md:right-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 cursor-pointer ${
                            index === currentIndex
                                ? "bg-white w-6 md:w-8"
                                : "bg-white/50 hover:bg-white/75"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </>
    );
};