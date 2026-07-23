import { webWorks } from "@/app/data";

export type ClientLogo = {
  companyName: string;
  companyLogo: string;
  href?: string;
};

/** Unique clients from portfolio — no external API dependency. */
export function getClientLogos(): ClientLogo[] {
  const seen = new Set<string>();
  const logos: ClientLogo[] = [];

  for (const work of webWorks) {
    const key = work.brandName.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    logos.push({
      companyName: work.brandName,
      companyLogo: work.imagePreview,
      href: work.link,
    });
  }

  return logos;
}

/** Prefer custom domains for social proof / case highlights. */
export function getFeaturedCaseStudies(limit = 3) {
  return webWorks
    .filter((w) => !w.link.includes("vercel.app"))
    .slice(0, limit)
    .map((w) => ({
      brandName: w.brandName,
      companyName: w.companyName,
      kind: w.kind,
      category: w.category,
      imagePreview: w.imagePreview,
      link: w.link,
      features: w.features.slice(0, 4),
      summary: `Proyek ${w.kind.toLowerCase()} untuk ${w.companyName} — fokus pada kredibilitas brand dan kehadiran digital yang profesional.`,
    }));
}
