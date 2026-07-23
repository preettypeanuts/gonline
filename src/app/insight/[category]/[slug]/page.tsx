import { getArticles } from "@/lib/googleSheets"
import { slugify } from "@/lib/slugify"
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/formatDateTime"
import type { Metadata } from "next"
import { ArticleRecommendations } from "@/components/article-reccomendations"
import SmartImage from "@/components/smart-image"
import { ShareButtons } from "@/components/share-buttons"
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema"
import { JsonLd } from "@/components/seo/json-ld"
import { ORGANIZATION_ID } from "@/components/seo/organization-schema"
import {
  absoluteUrl,
  INDEXABLE_ROBOTS,
  ORGANIZATION,
  SITE_NAME,
  SITE_URL,
} from "@/config/seo"

interface Props {
  params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const articles = await getArticles()
  const article = articles.find(
    (a) => slugify(a.category) === category && a.slug === slug,
  )

  if (!article) {
    return {
      title: "Artikel tidak ditemukan",
      robots: { index: false, follow: true },
    }
  }

  const url = absoluteUrl(`/insight/${category}/${slug}`)

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      siteName: SITE_NAME,
      locale: "id_ID",
      type: "article",
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt || article.createdAt,
      tags: article.tags,
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
    robots: INDEXABLE_ROBOTS,
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { category, slug } = await params
  const articles = await getArticles()
  const article = articles.find(
    (a) => slugify(a.category) === category && a.slug === slug,
  )

  if (!article) notFound()

  const articleUrl = absoluteUrl(`/insight/${category}/${slug}`)

  const related = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 5)

  const recommendations =
    related.length >= 5
      ? related
      : [
          ...related,
          ...articles
            .filter(
              (a) =>
                a.slug !== article.slug &&
                !related.find((r) => r.slug === a.slug),
            )
            .filter((a) => a.highlight)
            .slice(0, 5 - related.length),
        ]

  return (
    <section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.excerpt,
          image: article.coverImage ? [article.coverImage] : undefined,
          datePublished: article.createdAt,
          dateModified: article.updatedAt || article.createdAt,
          inLanguage: "id-ID",
          author: {
            "@type": "Organization",
            "@id": ORGANIZATION_ID,
            name: SITE_NAME,
            url: SITE_URL,
          },
          publisher: {
            "@type": "Organization",
            "@id": ORGANIZATION_ID,
            name: SITE_NAME,
            url: SITE_URL,
            logo: {
              "@type": "ImageObject",
              url: ORGANIZATION.logo,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": articleUrl,
          },
          keywords: article.tags.join(", "),
          articleSection: article.category,
          isAccessibleForFree: true,
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Insight", path: "/insight" },
          {
            name: article.category,
            path: `/insight?category=${slugify(article.category)}`,
          },
          {
            name: article.title,
            path: `/insight/${category}/${slug}`,
          },
        ]}
      />

      <main className="margin mt-4 md:mt-30 pb-10 max-w-4xl mx-4 md:mx-auto bg-white dark:bg-black rounded-main md:p-10 p-5">
        <div className="space-y-4 mb-8">
          <p className="text-thirdColor uppercase font-semibold text-xs">
            {article.category}
          </p>
          <h1 className="font-bold text-3xl md:text-4xl leading-tight">
            {article.title}
          </h1>
          <p className="text-neutral-500 text-sm">{article.excerpt}</p>
          <p className="font-semibold text-xs uppercase text-neutral-400">
            {formatDate(article.updatedAt)}
          </p>
        </div>

        <SmartImage
          width={800}
          height={450}
          src={article.coverImage}
          alt={article.title}
          className="w-full rounded-3xl object-cover aspect-video mb-8"
          priority
        />

        <article
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-semibold border border-neutral-200 dark:border-neutral-800 text-neutral-500"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <ShareButtons
          title={article.title}
          excerpt={article.excerpt}
          coverImage={article.coverImage}
          url={articleUrl}
        />
      </main>

      <ArticleRecommendations
        articles={recommendations}
        currentArticleSlug={article.slug}
      />
    </section>
  )
}
