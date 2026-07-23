import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { HomeBanner } from "@/components/home-banner";
import { HomeService } from "@/components/home-service";
import { InsightRecommendations } from "@/components/insight-reccomendations";
import { MobileBanner } from "@/components/mobile-banner";
import { RunningClientsLogo } from "@/components/running-clients-logo";
import { WebsiteSchema } from "@/components/seo/website-schema";
import { ViewportReveal } from "@/components/viewport-reveal";
import {
  DEFAULT_DESCRIPTION,
  INDEXABLE_ROBOTS,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  defaultOpenGraph,
  defaultTwitter,
} from "@/config/seo";

const ServicesVertical = dynamic(
  () =>
    import("@/components/services-vertical").then(
      (mod) => mod.ServicesVertical,
    ),
  {
    loading: () => <div className="h-100 animate-pulse bg-muted rounded-xl" />,
  },
);

const HowWeWork = dynamic(
  () => import("@/components/how-we-work").then((mod) => mod.HowWeWork),
  {
    loading: () => <div className="h-100 animate-pulse bg-muted rounded-xl" />,
  },
);

const Showcase = dynamic(
  () => import("@/components/showcase").then((mod) => mod.Showcase),
  {
    loading: () => <div className="h-100 animate-pulse bg-muted rounded-xl" />,
  },
);

const CTA = dynamic(() => import("@/components/cta").then((mod) => mod.CTA), {
  loading: () => <div className="h-50 animate-pulse bg-muted rounded-xl" />,
});

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} — Digital Agency | Website & Social Media Indonesia`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "GONLINE",
    "gonline",
    "digital agency indonesia",
    "website development",
    "jasa pembuatan website",
    "social media management",
    "jasa social media management",
    "jasa digital marketing",
    "agency website company profile",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  robots: INDEXABLE_ROBOTS,
  openGraph: defaultOpenGraph({
    title: `${SITE_NAME} — Digital Agency Indonesia`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  }),
  twitter: defaultTwitter({
    title: `${SITE_NAME} — Digital Agency Indonesia`,
    description: DEFAULT_DESCRIPTION,
  }),
};

export default function Home() {
  return (
    <>
      <WebsiteSchema />
      <ViewportReveal>
        <MobileBanner />
      </ViewportReveal>
      <ViewportReveal>
        <HomeBanner />
      </ViewportReveal>
      <ViewportReveal>
        <HomeService />
      </ViewportReveal>
      <ViewportReveal>
        <ServicesVertical />
      </ViewportReveal>
      <ViewportReveal>
        <HowWeWork />
      </ViewportReveal>
      <ViewportReveal>
        <Showcase />
      </ViewportReveal>
      <ViewportReveal>
        <InsightRecommendations heading="Insight Pilihan" limit={6} />
      </ViewportReveal>
      <ViewportReveal>
        <RunningClientsLogo />
      </ViewportReveal>
      <ViewportReveal>
        <CTA />
      </ViewportReveal>
    </>
  );
}
