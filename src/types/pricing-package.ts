/** Shared pricing card shape (CMS-mapped or static). */
export type PricingPackage = {
  name: string;
  favorite?: boolean;
  pricing: {
    gimmick: number;
    fixed: number;
  };
  deliverables?: string[];
  /** CMS WhatsApp CTA — preferred over the hardcoded fallback. */
  whatsappPhone?: string;
  whatsappMessage?: string;
};
