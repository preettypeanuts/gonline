"use client";

import Link from "next/link";
import SmartImage from "./smart-image";
import type { ClientLogo } from "@/lib/cms/clients";

function LogoRow({
  logos,
  direction = "left",
}: {
  logos: ClientLogo[];
  direction?: "left" | "right";
}) {
  // Repeat enough times so short lists still fill the viewport while scrolling
  const repeats = logos.length < 8 ? 4 : 2;
  const track = Array.from({ length: repeats }, () => logos).flat();

  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max items-center gap-5 sm:gap-6 ${
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        }`}
        style={{ animationDuration: "80s" }}
      >
        {track.map((item, i) => {
          const inner = (
            <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-[22%] bg-white p-3 ring-1 ring-black/5 sm:size-24 sm:p-3.5">
              <SmartImage
                src={item.companyLogo}
                alt={item.companyName}
                width={96}
                height={96}
                fillBackground={false}
                className="h-auto w-auto max-h-full max-w-full object-contain"
              />
            </div>
          );

          if (!item.href) {
            return (
              <div key={`${direction}-${item.id}-${i}`} className="shrink-0">
                {inner}
              </div>
            );
          }

          return (
            <Link
              key={`${direction}-${item.id}-${i}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 transition hover:opacity-90"
              aria-label={item.companyName}
            >
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function shuffleStable<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (i * 7 + 3) % arr.length;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function ClientsLogoMarquee({ logos }: { logos: ClientLogo[] }) {
  if (logos.length === 0) return null;

  const row1 = logos;
  const row2 = shuffleStable(logos);

  return (
    <section className="spacing overflow-hidden">
      <div className="margin mb-10 text-center md:mb-12">
        <h2 className="text-3xl font-bold">
          Klien <span className="text-thirdColor">Kami</span>
        </h2>
        <p className="mt-2 text-muted-foreground">
          Dipercaya bisnis dari berbagai industri untuk membangun kehadiran
          digital.
        </p>
      </div>

      {/* Fades only over the logo strip — not the heading */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-lightColor to-transparent dark:from-darkColor md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-lightColor to-transparent dark:from-darkColor md:w-24" />

        <div className="space-y-5 select-none sm:space-y-6">
          <LogoRow logos={row1} direction="left" />
          {row2.length > 1 ? <LogoRow logos={row2} direction="right" /> : null}
        </div>
      </div>
    </section>
  );
}
