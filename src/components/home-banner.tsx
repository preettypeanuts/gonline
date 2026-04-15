import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { HomeBannerCarousel } from "./home-banner-carousel";
import { dataContact } from "@/app/data";

export const HomeBanner = () => {
    return (
        <section className="hidden md:block w-full h-[75lvh] md:h-screen relative overflow-hidden rounded-br-main">
            {/* Carousel — isolated client boundary */}
            <HomeBannerCarousel />

            {/* Get Started Button */}
            <a href={dataContact[2].link}>
                <Button
                    size="lg"
                    variant="default"
                    className="absolute left-4 top-1/2 md:left-6 lg:left-10 text-sm md:text-base md:w-60"
                >
                    <div className="flex items-center justify-between! gap-2 text-mainColor dark:text-white w-full">
                        <div>Start Project</div>
                        <ArrowRight className="inline-block" />
                    </div>
                </Button>
            </a>

            {/* Bottom Left Content */}
            <div className="absolute bottom-0 left-0">
                <div className="pb-6 px-4 pt-6 md:pb-10 md:px-6 md:pt-8 lg:pb-13 lg:px-10 lg:pt-11 bg-lightColor dark:bg-darkColor rounded-tr-main">
                    <h1 className="font-light text-3xl sm:text-4xl md:text-5xl lg:text-[85px] text-darkColor dark:text-lightColor leading-tight md:leading-snug lg:leading-11">
                        <p>where ideas</p>
                        <br className="hidden lg:block" />
                        <p className="text-secondaryColor dark:text-mainColor">go online.</p>
                    </h1>
                    <div className="rounded-out-lt-main bg-lightColor dark:bg-darkColor" />
                    <div className="rounded-out-br-main bg-lightColor dark:bg-darkColor" />
                </div>
            </div>

            {/* Right Content */}
            <div className="absolute right-0 top-1/4 md:top-2/12 p-4 md:p-6 lg:p-10 bg-lightColor dark:bg-darkColor rounded-l-main max-w-50 sm:max-w-62.5 md:max-w-xs lg:max-w-none">
                <p className="font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-3 lg:mb-5">
                    <span className="text-thirdColor">100%</span>
                </p>
                <p className="text-xs sm:text-sm md:text-base">
                    We put whats on your mind, GONLINE.
                </p>
                <div>
                    <Button variant="invert" className="mt-5">
                        Learn More
                    </Button>
                </div>
                <div className="rounded-out-rt-main bg-lightColor dark:bg-darkColor" />
                <div className="rounded-out-rb-main bg-lightColor dark:bg-darkColor" />
            </div>
        </section>
    );
};