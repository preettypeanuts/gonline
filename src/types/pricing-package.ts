/** Shared pricing card shape (CMS-mapped or static). */
export type PricingPackage = {
  name: string;
  favorite?: boolean;
  pricing: {
    /** Strikethrough / gimmick price — only when `showStartingFrom` is false. */
    gimmick: number;
    fixed: number;
  };
  /**
   * Per-package CMS flag. When true → "Starting from" label, no strikethrough.
   * Do not infer from gimmick === 0.
   */
  showStartingFrom?: boolean;
  deliverables?: string[];
  /** CMS WhatsApp CTA — preferred over the hardcoded fallback. */
  whatsappPhone?: string;
  whatsappMessage?: string;
};
