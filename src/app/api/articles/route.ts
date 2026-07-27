import { NextRequest, NextResponse } from "next/server";
import { listArticles } from "@/lib/cms/articles";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") ?? undefined;
    const highlight = searchParams.get("highlight");
    const q = searchParams.get("q") ?? searchParams.get("search") ?? undefined;
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 20);

    const result = await listArticles({
      page,
      limit,
      category,
      q,
      highlighted: highlight === "true" ? true : undefined,
    });

    return NextResponse.json({
      data: result.data,
      meta: { pagination: result.pagination },
      total: result.pagination.total,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 },
    );
  }
}
