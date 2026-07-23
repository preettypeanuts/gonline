/**
 * Canonical site config for SEO.
 * Lock to www — live Vercel redirects apex → www.
 */
export const SITE_URL = "https://www.gonline.id" as const;
export const SITE_NAME = "GONLINE";
export const SITE_LOCALE = "id_ID";
export const SITE_LANG = "id";

export const SITE_TAGLINE =
  "Digital agency Indonesia — website, social media, dan strategi digital untuk pertumbuhan bisnis.";

export const DEFAULT_DESCRIPTION =
  "GONLINE membantu bisnis membangun kredibilitas dan pertumbuhan online melalui pembuatan website profesional, pengelolaan social media, serta strategi digital yang terintegrasi.";

export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "GONLINE Digital Agency",
} as const;

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: "GONLINE",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  email: "gonlinecreative@gmail.com",
  telephone: "+62-851-7388-8880",
  sameAs: [
    "https://www.instagram.com/gonline_id",
    "https://www.linkedin.com/company/gonline-creative/",
    "https://www.facebook.com/share/1CHyvzr49e/",
  ],
  areaServed: "ID",
  description: DEFAULT_DESCRIPTION,
} as const;

/** Absolute URL helper — path must start with `/` or be empty. */
export function absoluteUrl(path = ""): string {
  if (!path || path === "/") return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function defaultOpenGraph(overrides?: {
  title?: string;
  description?: string;
  url?: string;
  images?: { url: string; width?: number; height?: number; alt?: string }[];
}) {
  return {
    type: "website" as const,
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    title: overrides?.title ?? `${SITE_NAME} — Website & Social Media Agency`,
    description: overrides?.description ?? DEFAULT_DESCRIPTION,
    url: overrides?.url ?? SITE_URL,
    images: overrides?.images ?? [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  };
}

export function defaultTwitter(overrides?: {
  title?: string;
  description?: string;
  images?: string[];
}) {
  return {
    card: "summary_large_image" as const,
    title: overrides?.title ?? `${SITE_NAME} — Website & Social Media Agency`,
    description: overrides?.description ?? DEFAULT_DESCRIPTION,
    images: overrides?.images ?? [OG_IMAGE.url],
  };
}

export const INDEXABLE_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-video-preview": -1,
    "max-snippet": -1,
  },
};
