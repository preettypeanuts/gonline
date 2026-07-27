import { recordActivityClick } from "@/lib/cms/tracking";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  await recordActivityClick(id);
  return new Response(null, { status: 204 });
}
