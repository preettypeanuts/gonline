import type { Article } from "@/types/article";
import { articleDate, articlePath } from "@/types/article";
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
          url: absoluteUrl(articlePath(a)),
          datePublished: articleDate(a) || undefined,
          dateModified: a.updatedAt || articleDate(a) || undefined,
          image: a.coverImage || undefined,
        })),
      }}
    />
  );
}
