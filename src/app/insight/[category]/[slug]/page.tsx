import {
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/cms/articles"
import { notFound, redirect } from "next/navigation"
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
import { articleDate, articlePath } from "@/types/article"

interface Props {
  params: Promise<{ category: string; slug: string }>
  searchParams: Promise<{ preview?: string }>
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { slug } = await params
  const { preview } = await searchParams
  const article = await getArticleBySlug(slug, {
    preview: Boolean(preview),
  })

  if (!article) {
    return {
      title: "Artikel tidak ditemukan",
      robots: { index: false, follow: true },
    }
  }

  const url = absoluteUrl(articlePath(article))
  const description =
    article.metaDescription || article.excerpt || article.title
  const title = article.metaTitle || article.title
  const image = article.coverImage

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "id_ID",
      type: "article",
      publishedTime: article.publishedAt || article.createdAt,
      modifiedTime: article.updatedAt || article.createdAt,
      tags: article.tags,
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: article.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
    robots:
      article.status === "published" ? INDEXABLE_ROBOTS : { index: false, follow: false },
  }
}

export default async function ArticleDetailPage({
  params,
  searchParams,
}: Props) {
  const { category, slug } = await params
  const { preview } = await searchParams

  const article = await getArticleBySlug(slug, {
    preview: Boolean(preview),
  })

  if (!article) notFound()

  // Keep URL category segment in sync with CMS category id
  if (category !== article.category) {
    redirect(`${articlePath(article)}${preview ? "?preview=1" : ""}`)
  }

  const articleUrl = absoluteUrl(articlePath(article))
  const related = await getRelatedArticles(slug, 5)

  return (
    <section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.excerpt,
          image: article.coverImage ? [article.coverImage] : undefined,
          datePublished: article.publishedAt || article.createdAt,
          dateModified: article.updatedAt || article.createdAt,
          inLanguage: "id-ID",
          author: {
            "@type": "Person",
            name: article.authorName || SITE_NAME,
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
          articleSection: article.categoryLabel || article.category,
          isAccessibleForFree: true,
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Insight", path: "/insight" },
          {
            name: article.categoryLabel || article.category,
            path: `/insight?category=${article.category}`,
          },
          {
            name: article.title,
            path: articlePath(article),
          },
        ]}
      />

      <main className="margin mt-4 md:mt-30 pb-10 max-w-4xl mx-4 md:mx-auto bg-white dark:bg-black rounded-main md:p-10 p-5">
        <div className="space-y-4 mb-8">
          <p className="text-thirdColor uppercase font-semibold text-xs">
            {article.categoryLabel || article.category}
          </p>
          <h1 className="font-bold text-3xl md:text-4xl leading-tight">
            {article.title}
          </h1>
          <p className="text-neutral-500 text-sm">{article.excerpt}</p>
          <p className="font-semibold text-xs uppercase text-neutral-400">
            {formatDate(articleDate(article))}
            {article.authorName ? ` · ${article.authorName}` : ""}
          </p>
        </div>

        {article.coverImage ? (
          <SmartImage
            width={800}
            height={450}
            src={article.coverImage}
            alt={article.title}
            className="w-full rounded-3xl object-cover aspect-video mb-8"
            priority
          />
        ) : null}

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
        articles={related}
        currentArticleSlug={article.slug}
      />
    </section>
  )
}
