"use client";

import { ArrowRight, Atom, Boxes, Clover, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { revealClassName, useViewportStaging } from "./viewport-reveal";

const services = [
  {
    title: "GO Digital",
    label: "Integrated Growth System",
    description:
      "Website, social media, and digital strategy aligned into one clear system for business growth.",
    href: "/go-digital",
    icon: Boxes,
    className:
      "bg-secondaryColor text-white md:col-span-2 lg:col-span-2 lg:row-span-2",
    chipClassName: "bg-white/15 text-white",
    iconClassName: "bg-thirdColor text-white",
  },
  {
    title: "GO Website",
    label: "Website Development",
    description:
      "Professional websites built for credibility, performance, SEO, and conversion.",
    href: "/website-development",
    icon: Atom,
    className:
      "bg-white text-secondaryColor dark:bg-secondaryDark dark:text-white",
    chipClassName: "bg-mainColor/10 text-mainColor dark:bg-mainColor/20",
    iconClassName: "bg-mainColor text-white",
  },
  {
    title: "GO Social",
    label: "Social Media Management",
    description:
      "Structured content strategy, design, and optimization to grow brand awareness and engagement.",
    href: "/social-media",
    icon: Clover,
    className: "bg-mainColor text-white",
    chipClassName: "bg-white/15 text-white",
    iconClassName: "bg-otherColor text-secondaryColor",
  },
];

export const HomeService = () => {
  const sectionRef = useViewportStaging<HTMLElement>();

  return (
    <section ref={sectionRef} className="spacing relative overflow-hidden">
      <div className="pointer-events-none absolute -left-16 top-10 h-72 w-72 rounded-full bg-mainColor/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-thirdColor/10 blur-3xl" />

      <div className="margin relative">
        <div className="mb-10 grid gap-6 md:grid-cols-10 md:items-end">
          <div className="md:col-span-6">
            <div
              data-stage
              className={`${revealClassName} mb-4 flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-mainColor shadow-secondaryShadow dark:bg-secondaryDark`}
              style={{ transitionDelay: "0ms" }}
            >
              <Sparkles className="size-4 text-thirdColor" />
              What We Do
            </div>
            <h2
              data-stage
              className={`${revealClassName} text-4xl font-semibold leading-tight tracking-[-0.04em] text-secondaryColor md:text-6xl dark:text-lightColor`}
              style={{ transitionDelay: "90ms" }}
            >
              Digital services built to make your business go online.
            </h2>
          </div>

          <p
            data-stage
            className={`${revealClassName} text-base leading-relaxed text-secondaryColor/75 md:col-span-4 md:text-lg dark:text-neutral-300`}
            style={{ transitionDelay: "160ms" }}
          >
            GONLINE helps brands build credibility, visibility, and growth
            through websites, social media systems, and integrated digital
            execution.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={service.href}
                data-stage
                className={`${revealClassName} group relative flex min-h-80 flex-col justify-between overflow-hidden rounded-main p-6 shadow-mainShadow hover:-translate-y-1 ${service.className}`}
                style={{ transitionDelay: `${220 + index * 90}ms` }}
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

                <div className="relative flex items-start justify-between gap-4">
                  <div
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${service.chipClassName}`}
                  >
                    {service.label}
                  </div>
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-full ${service.iconClassName}`}
                  >
                    <Icon className="size-5" />
                  </div>
                </div>

                <div className="relative space-y-5">
                  <div className="space-y-3">
                    <h3 className="text-3xl font-semibold tracking-[-0.04em]">
                      {service.title}
                    </h3>
                    <p className="max-w-md text-sm leading-relaxed opacity-80">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold">
                    Learn more
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div
          data-stage
          className={`${revealClassName} mt-6 flex flex-col gap-4 rounded-main bg-white p-5 shadow-secondaryShadow md:flex-row md:items-center md:justify-between dark:bg-secondaryDark`}
          style={{ transitionDelay: "520ms" }}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-thirdColor">
              Not sure where to start?
            </p>
            <p className="mt-2 text-xl font-semibold text-secondaryColor dark:text-lightColor">
              Start with GO Digital for a complete website and social media
              foundation.
            </p>
          </div>

          <Button
            asChild
            variant="invert"
            className="bg-mainColor text-white hover:bg-secondaryColor"
          >
            <Link href="/go-digital">
              Explore GO Digital
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
