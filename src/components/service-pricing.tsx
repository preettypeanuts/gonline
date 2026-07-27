import { PricingCard } from "@/components/pricing-card";
import { getPricingPackages } from "@/lib/cms/prices";
import type { PriceServiceSlug } from "@/types/price";

type ServicePricingProps = {
  serviceSlug: PriceServiceSlug;
  title: string;
  showStartingFrom?: boolean;
  ctaLabel?: string;
  favoriteCta?: string;
};

/**
 * Server-fetched pricing for a service page.
 * Hides the whole section when brand lacks `prices` or API returns empty.
 */
export async function ServicePricing({
  serviceSlug,
  title,
  showStartingFrom,
  ctaLabel,
  favoriteCta,
}: ServicePricingProps) {
  const packages = await getPricingPackages(serviceSlug);
  if (packages.length === 0) return null;

  return (
    <PricingCard
      packages={packages}
      title={title}
      showStartingFrom={showStartingFrom}
      ctaLabel={ctaLabel}
      favoriteCta={favoriteCta}
    />
  );
}
