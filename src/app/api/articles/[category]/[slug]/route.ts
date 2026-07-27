import { NextRequest, NextResponse } from "next/server";
import { getArticleBySlug } from "@/lib/cms/articles";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ category: string; slug: string }> },
) {
  try {
    const { category, slug } = await params;
    const preview = req.nextUrl.searchParams.get("preview");
    const article = await getArticleBySlug(slug, {
      preview: Boolean(preview),
    });

    if (!article || (category && article.category !== category)) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ data: article });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 },
    );
  }
}
