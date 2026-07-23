import type { Article } from "@/types/article";
import { slugify } from "@/lib/slugify";
import { absoluteUrl } from "@/config/seo";
import { ORGANIZATION_ID } from "./organization-schema";
import { JsonLd } from "./json-ld";

interface Props {
  articles: Article[];
}

export function BlogSchema({ articles }: Props) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": absoluteUrl("/insight#blog"),
        name: "GONLINE Insight",
        description:
          "Tips, strategi, dan insight digital marketing, website development, dan social media dari GONLINE.",
        url: absoluteUrl("/insight"),
        inLanguage: "id-ID",
        publisher: { "@id": ORGANIZATION_ID },
        blogPost: articles.map((a) => ({
          "@type": "BlogPosting",
          headline: a.title,
          description: a.excerpt,
          url: absoluteUrl(`/insight/${slugify(a.category)}/${a.slug}`),
          datePublished: a.createdAt || undefined,
          dateModified: a.updatedAt || a.createdAt || undefined,
          image: a.coverImage || undefined,
        })),
      }}
    />
  );
}
