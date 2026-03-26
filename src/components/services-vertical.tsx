"use client"

import { useEffect, useRef, useState } from 'react';

export const ServicesVertical = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const services = [
        'What We Do?',
        'Web Development',
        'Social Media Management',
        'Mobile App Design',
        'Web Design',
        'Expertise',
        'Visual Identity',
        'Digital Marketing',
        'Consulting',
        'E-commerce Solutions',
        'Content Creation',
        'SEO Optimization',
        'Brand Strategy',
        'UX/UI Design',
        'Analytics & Reporting',
        'Maintenance & Support',
    ];

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const containerRect = container.getBoundingClientRect();
            const containerCenter = containerRect.top + containerRect.height / 2;

            let closestIndex = 0;
            let closestDistance = Infinity;

            itemRefs.current.forEach((item, index) => {
                if (!item) return;

                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.top + itemRect.height / 2;

                const distance = Math.abs(containerCenter - itemCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            setActiveIndex(closestIndex);
        };

        container.addEventListener('scroll', handleScroll);
        handleScroll(); // initial check

        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToNext = () => {
        const container = containerRef.current;
        if (!container) return;

        const nextIndex = activeIndex + 1 >= services.length ? 0 : activeIndex + 1;

        const target = itemRefs.current[nextIndex];
        if (!target) return;

        container.scrollTo({
            top: target.offsetTop - container.clientHeight / 2 + target.clientHeight / 2,
            behavior: 'smooth',
        });
    };
    return (
        <div
            className="h-[70lvh] spacing flex justify-center overflow-hidden relative font-sans margin rounded-main">

            <div className="bg-white dark:bg-black rounded-main">
                <div
                    ref={containerRef}
                    className="w-full h-full overflow-y-scroll scrollbar-hide py-48 no-scrollbar overscroll-auto"
                    style={{
                        scrollSnapType: 'y mandatory',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)'
                    }}
                >
                    {services.map((service, index) => {
                        const distance = Math.abs(activeIndex - index);
                        const isActive = distance === 0;

                        return (
                            <div
                                key={index}
                                ref={(el) => { itemRefs.current[index] = el; }}
                                className={`
                  text-center py-5 px-10 cursor-pointer transition-all duration-500 ease-out snap-center
                  ${isActive ? 'text-4xl md::text-7xl font-bold' : 'text-thirdColor/50 text-3xl md:text-6xl font-medium'}
                `}
                                style={{
                                    opacity: distance === 0 ? 1 : distance === 1 ? 0.5 : 0.2,
                                    transform: `scale(${distance === 0 ? 1 : distance === 1 ? 0.85 : 0.7})`
                                }}
                            >
                                {service}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Floating Arrow Button */}
            <button
                onClick={scrollToNext}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 cursor-pointer
             w-12 h-12 rounded-b-full 
             flex items-center justify-center  hover:scale-110 transition-all duration-300"
            >
                ↓
            </button>
        </div>
    )
}