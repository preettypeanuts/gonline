import { PricingCard } from "@/components/pricing-card";
import { getPricingPackages } from "@/lib/cms/prices";
import type { PriceServiceSlug } from "@/types/price";

type ServicePricingProps = {
  serviceSlug: PriceServiceSlug;
  title: string;
  ctaLabel?: string;
  favoriteCta?: string;
};

/**
 * Server-fetched pricing for a service page.
 * Hides the whole section when brand lacks `prices` or API returns empty.
 * Per-package "Starting from" / gimmick comes from CMS `showStartingFrom`.
 */
export async function ServicePricing({
  serviceSlug,
  title,
  ctaLabel,
  favoriteCta,
}: ServicePricingProps) {
  const packages = await getPricingPackages(serviceSlug);
  if (packages.length === 0) return null;

  return (
    <PricingCard
      packages={packages}
      title={title}
      ctaLabel={ctaLabel}
      favoriteCta={favoriteCta}
    />
  );
}
