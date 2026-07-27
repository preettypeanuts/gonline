import { recordArticleClick } from "@/lib/cms/tracking";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  await recordArticleClick(slug);
  return new Response(null, { status: 204 });
}
