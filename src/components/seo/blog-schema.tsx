import { Article } from "@/types/article"

interface Props {
    articles: Article[]
}

export function BlogSchema({ articles }: Props) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "GONLINE Insight",
        description: "Articles about digital growth and website development",
        url: "https://gonline.id/insight",
        blogPost: articles.map((a) => ({
            "@type": "BlogPosting",
            headline: a.title,
            description: a.excerpt,
        })),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}