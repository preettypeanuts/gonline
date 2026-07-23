import { getWorks } from "@/lib/googleSheets"
import { webWorks as staticWebWorks } from "@/app/data"
import type { WebWork as WebWorkItem } from "@/types/web-work"
import { Title } from "./title"
import { Button } from "./ui/button"
import { ProblemScrollWrapper } from "./problem-scroll"
import { WebWorkCards } from "./web-work-cards"
import Link from "next/link"

function toWebWorks(items: typeof staticWebWorks): WebWorkItem[] {
  return items.map((w, index) => ({
    id: `static-${index}`,
    status: true,
    link: w.link,
    category: w.category,
    imagePreview: w.imagePreview,
    companyName: w.companyName,
    brandName: w.brandName,
    features: w.features,
    kind: w.kind,
  }))
}

export const WebWork = async () => {
  const sheetWorks = await getWorks().catch(() => [])
  const works = sheetWorks.length > 0 ? sheetWorks : toWebWorks(staticWebWorks)

  const seen = new Set<string>()
  const unique = works.filter((w) => {
    const key = w.brandName.trim().toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  return (
    <section className="spacing space-y-8">
      <ProblemScrollWrapper title={<Title>Hasil Karya Website</Title>}>
        <WebWorkCards items={unique} />
      </ProblemScrollWrapper>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/our-work/website">
          <Button variant="invert" className="mx-auto mt-4">
            Lihat Semua
          </Button>
        </Link>
        <Link
          href="/go-digital"
          className="text-sm font-semibold text-mainColor underline underline-offset-4 mt-4"
        >
          Atau pilih paket GO Digital →
        </Link>
      </div>
    </section>
  )
}
