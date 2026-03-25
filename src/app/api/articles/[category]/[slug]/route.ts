import { NextRequest, NextResponse } from "next/server";
import { getArticleBySlug } from "@/lib/googleSheets";

export async function GET(
  _req: NextRequest,
  { params }: { params: { category: string; slug: string } }
) {
  try {
    const article = await getArticleBySlug(params.category, params.slug);

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ data: article });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}