"use client";

import Link from "next/link";
import SmartImage from "./smart-image";
import { getClientLogos, type ClientLogo } from "@/lib/clients";

function LogoRow({
  logos,
  direction = "left",
}: {
  logos: ClientLogo[];
  direction?: "left" | "right";
}) {
  const track = [...logos, ...logos];

  return (
    <div className="overflow-hidden relative">
      <div
        className={`flex w-max gap-8 ${
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        }`}
        style={{ animationDuration: "80s" }}
      >
        {track.map((item, i) => {
          const inner = (
            <div className="flex items-center justify-center p-4 bg-white dark:bg-secondaryDark rounded-main border border-black/5 dark:border-white/10 min-w-44 h-28">
              <SmartImage
                src={item.companyLogo}
                alt={item.companyName}
                width={160}
                height={80}
                className="h-16 w-auto max-w-36 object-contain rounded-md"
              />
            </div>
          );

          if (!item.href) {
            return (
              <div key={`${direction}-${item.companyName}-${i}`}>{inner}</div>
            );
          }

          return (
            <Link
              key={`${direction}-${item.companyName}-${i}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:opacity-90"
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

export const RunningClientsLogo = () => {
  const clients = getClientLogos();

  if (clients.length === 0) return null;

  const row1 = clients;
  const row2 = shuffleStable(clients);

  return (
    <section className="spacing overflow-hidden relative">
      <div className="text-center mb-12 margin">
        <h2 className="text-3xl font-bold">
          Klien <span className="text-thirdColor">Kami</span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Dipercaya bisnis dari berbagai industri untuk membangun kehadiran digital.
        </p>
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-full w-10 md:w-32 bg-linear-to-r from-lightColor dark:from-darkColor to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-10 md:w-32 bg-linear-to-l from-lightColor dark:from-darkColor to-transparent z-10" />

      <div className="space-y-8 select-none">
        <LogoRow logos={row1} direction="left" />
        <LogoRow logos={row2} direction="right" />
      </div>
    </section>
  );
};
