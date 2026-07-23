import { ArrowRight } from "lucide-react";
import { dataContact, webWorks } from "@/app/data";
import { HomePortfolioCarousel } from "./home-portfolio-carousel";
import { Button } from "./ui/button";

export const HomeBanner = () => {
  const heroWorks = webWorks.slice(0, 7).map((work) => ({
    link: work.link,
    imagePreview: work.imagePreview,
    brandName: work.brandName,
    category: work.category,
  }));

  return (
    <section className="relative hidden h-[110vh] w-full bg-lightColor pt-24 text-center md:block dark:bg-darkColor">
      <div className="pointer-events-none absolute left-1/2 top-20 h-52 w-52 -translate-x-1/2 rounded-full bg-mainColor/20 blur-3xl" />
      <div className="pointer-events-none absolute left-16 top-1/3 h-56 w-56 rounded-full bg-thirdColor/15 blur-3xl" />
      <div className="pointer-events-none absolute right-12 top-1/4 h-60 w-60 rounded-full bg-otherColor/25 blur-3xl dark:bg-otherColorDark/20" />
   
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 mt-15">

        <h1 className="max-w-5xl text-6xl font-semibold leading-[0.92] tracking-[-0.06em] text-darkColor md:text-7xl lg:text-[82px] dark:text-lightColor">
          <span className="sr-only">GONLINE — </span>
          Build{" "}
          <span className="text-secondaryColor dark:text-mainColor">
            credibility.
          </span>
          <br />
          <span className="text-mainColor">Grow</span>{" "}
          <span className="text-thirdColor">online.</span>
        </h1>

        <p className="mt-4 max-w-2xl text-base text-secondaryColor/75 dark:text-neutral-300">
          Website development, social media management, and digital strategy
          built as one growth system for your business.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <a href={dataContact[2].link}>
            <Button
              size="lg"
              variant="invert"
              className="bg-mainColor px-7 text-white hover:bg-secondaryColor dark:bg-mainColor dark:text-white dark:hover:bg-secondaryColor"
            >
              Mulai Proyek
              <ArrowRight />
            </Button>
          </a>
          <a href="/our-work/website">
            <Button
              size="lg"
              variant="default"
              className="bg-white px-7 text-secondaryColor shadow-secondaryShadow hover:bg-otherColor/40 dark:bg-secondaryDark dark:text-lightColor dark:hover:bg-mainColor/30"
            >
              Lihat Karya
            </Button>
          </a>
        </div>
      </div>

      <div className="absolute -bottom-10 left-0 w-screen">
        <HomePortfolioCarousel items={heroWorks} />
      </div>
    </section>
  );
};
