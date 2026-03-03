import { FeaturedInsight } from "@/components/featured-insight";
import { InsightFilter } from "@/components/insight-fliter";
import { NewsCard } from "@/components/news-card";

export default function Insight() {
    return (
        <>
            <FeaturedInsight />
            <InsightFilter />
            <NewsCard />
        </>
    )
}