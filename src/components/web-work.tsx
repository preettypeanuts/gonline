import { getPortfolioWorksByType } from "@/lib/cms/portfolio"
import { Title } from "./title"
import { Button } from "./ui/button"
import { ProblemScrollWrapper } from "./problem-scroll"
import { WebWorkCards } from "./web-work-cards"
import Link from "next/link"

export const WebWork = async () => {
  const works = await getPortfolioWorksByType("website")

  const seen = new Set<string>()
  const unique = works.filter((w) => {
    const key = w.brandName.trim().toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  if (unique.length === 0) return null

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
