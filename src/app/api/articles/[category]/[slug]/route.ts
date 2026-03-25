import { NextRequest, NextResponse } from "next/server";
import { getArticleBySlug } from "@/lib/googleSheets";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ category: string; slug: string }> },
) {
  try {
    const { category, slug } = await params;
    const article = await getArticleBySlug(category, slug);

    if (!article) {
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
