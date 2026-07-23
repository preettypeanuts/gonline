import Link from "next/link";
import SmartImage from "./smart-image";
import { getFeaturedCaseStudies } from "@/lib/clients";
import { ArrowUpRight } from "lucide-react";

/**
 * Honest social proof from real portfolio projects.
 * No invented metrics — only project type + brand + live link.
 */
export function CaseHighlights() {
  const cases = getFeaturedCaseStudies(3);
  if (cases.length === 0) return null;

  return (
    <section className="spacing margin">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-thirdColor mb-3">
          Bukti Kerja
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Studi kasus dari proyek nyata
        </h2>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          Cuplikan hasil kerja GONLINE untuk klien — fokus pada kredibilitas brand
          dan kehadiran digital yang siap dipakai bisnis.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cases.map((item) => (
          <Link
            key={item.brandName}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-main bg-white dark:bg-black overflow-hidden border border-black/5 dark:border-white/10 hover:scale-[0.99] transition duration-300"
          >
            <SmartImage
              src={item.imagePreview}
              alt={item.brandName}
              width={600}
              height={360}
              className="w-full aspect-video object-cover"
            />
            <div className="p-6 flex flex-col grow gap-3">
              <p className="text-xs font-semibold uppercase text-thirdColor">
                {item.kind}
              </p>
              <h3 className="text-xl font-bold group-hover:text-mainColor transition-colors">
                {item.brandName}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed grow">
                {item.summary}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-lightColor dark:bg-secondaryDark"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-mainColor mt-2">
                Lihat proyek
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/our-work/website"
          className="text-sm font-semibold text-secondaryColor dark:text-lightColor underline underline-offset-4 hover:text-mainColor"
        >
          Lihat semua portofolio website
        </Link>
      </div>
    </section>
  );
}
