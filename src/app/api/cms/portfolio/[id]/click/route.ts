import { recordPortfolioClick } from "@/lib/cms/tracking";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  await recordPortfolioClick(id);
  return new Response(null, { status: 204 });
}
