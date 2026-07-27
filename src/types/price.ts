export type LocaleCode = "id" | "en" | "zh";

export type LocalizedText = Record<LocaleCode, string>;

export type PriceSummary = {
  id: string;
  brandId: string;
  slug: string;
  serviceSlug: string;
  category: string;
  highlighted: boolean;
  service: LocalizedText;
  packageName: LocalizedText;
  price: number;
  strikethroughPrice: number;
  whatsappPhone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PriceFeature = {
  id: string;
  name: LocalizedText;
};

export type Price = PriceSummary & {
  description: LocalizedText;
  whatsappMessage: LocalizedText;
  features: PriceFeature[];
};

export type PriceCategory = {
  id: string;
  brandId: string;
  label: string;
  createdAt: string;
  updatedAt: string;
};

/** CMS category / serviceSlug values used on service pages. */
export const PRICE_SERVICE_SLUG = {
  website: "website-development",
  social: "social-media-management",
  goDigital: "go-digital",
} as const;

export type PriceServiceSlug =
  (typeof PRICE_SERVICE_SLUG)[keyof typeof PRICE_SERVICE_SLUG];
