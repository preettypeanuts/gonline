import { webWorks } from "@/app/data";

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
