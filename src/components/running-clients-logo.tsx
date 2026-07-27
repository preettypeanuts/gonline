import { getClientLogos } from "@/lib/cms/clients";
import { ClientsLogoMarquee } from "./clients-logo-marquee";

/**
 * Server-fetched client logo strip.
 * Source: `GET /api/public/clients` → `logo` only (skip empty).
 * Never uses portfolio `coverImage`.
 */
export async function RunningClientsLogo() {
  const logos = await getClientLogos();
  if (logos.length === 0) return null;
  return <ClientsLogoMarquee logos={logos} />;
}
