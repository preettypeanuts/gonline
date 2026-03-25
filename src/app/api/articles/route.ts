import { NextRequest, NextResponse } from "next/server";
import { getArticles } from "@/lib/googleSheets";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const highlight = searchParams.get("highlight");

    let articles = await getArticles();

    if (category) {
      articles = articles.filter(
        (a) => a.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (highlight === "true") {
      articles = articles.filter((a) => a.highlight);
    }

    return NextResponse.json({ data: articles, total: articles.length });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}