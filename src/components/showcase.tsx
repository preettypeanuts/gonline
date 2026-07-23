import { getWorks } from "@/lib/googleSheets"
import { dataClientSocmed, webWorks as staticWebWorks } from "@/app/data"
import { TabsClient } from "./tabs-client"
import { Card } from "./card"
import { Button } from "./ui/button"
import Link from "next/link"

export const Showcase = async () => {
    const sheetWorks = await getWorks().catch(() => [])
    const webWorks = sheetWorks.length > 0 ? sheetWorks : staticWebWorks

    // Deduplicate by brandName to avoid repeated category cards
    const seen = new Set<string>()
    const uniqueWorks = webWorks.filter((el) => {
        const key = el.brandName.trim().toLowerCase()
        if (seen.has(key)) return false
        seen.add(key)
        return true
    })

    return (
        <section className="spacing">
            <h2 className="margin text-4xl font-medium text-center mb-10">
                Proyek{" "}
                <span className="text-mainColor">Pilihan{" "}</span>
                <span className="text-thirdColor">Kami</span>
            </h2>

            <TabsClient
                website={
                    <div className="flex gap-2 md:gap-6 overflow-x-scroll py-10 no-scrollbar">
                        {uniqueWorks.slice(0, 6).map((el, idx) => (
                            <Card
                                key={`${el.brandName}-${idx}`}
                                link={el.link}
                                category={el.category}
                                image={el.imagePreview}
                                companyName={el.companyName}
                                brandName={el.brandName}
                                features={el.features}
                                kind={el.kind}
                                className={`md:min-w-100 md:w-100 min-w-80 w-80 grow
                                    ${idx === 0 ? "left-margin" : ""}
                                    ${idx === Math.min(5, uniqueWorks.length - 1) ? "right-margin" : ""}
                                `}
                            />
                        ))}
                    </div>
                }
                social={
                    <div className="flex gap-2 md:gap-6 overflow-x-scroll py-10 no-scrollbar">
                        {dataClientSocmed.map((el, idx) => (
                            <Card
                                key={el.name}
                                link={el.link}
                                category="Instagram"
                                image={el.preview}
                                companyName={el.name}
                                brandName={el.brandName}
                                features={[]}
                                kind="social"
                                className={`md:min-w-100 md:w-100 min-w-70 w-70
                                    ${idx === 0 ? "left-margin" : ""}
                                    ${idx === dataClientSocmed.length - 1 ? "right-margin" : ""}
                                `}
                            />
                        ))}
                    </div>
                }
            />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/our-work/website">
                    <Button variant="invert">
                        Semua Portofolio{" "}
                        <span className="text-thirdColor dark:text-mainColor -ml-1">
                            Website
                        </span>
                    </Button>
                </Link>
                <Link href="/website-development" className="text-sm font-semibold text-mainColor underline underline-offset-4">
                    Lihat layanan website →
                </Link>
            </div>
        </section>
    )
}
