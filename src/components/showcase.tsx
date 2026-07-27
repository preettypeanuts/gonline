import { getPortfolioWorksByType } from "@/lib/cms/portfolio"
import { TabsClient } from "./tabs-client"
import { Card } from "./card"
import { Button } from "./ui/button"
import Link from "next/link"

export const Showcase = async () => {
    const [websiteWorks, socialWorks] = await Promise.all([
        getPortfolioWorksByType("website"),
        getPortfolioWorksByType("social-media"),
    ])

    const seen = new Set<string>()
    const uniqueWorks = websiteWorks.filter((el) => {
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
                                key={el.id}
                                portfolioId={el.id}
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
                        {socialWorks.map((el, idx) => (
                            <Card
                                key={el.id}
                                portfolioId={el.id}
                                link={el.link}
                                category={el.category}
                                image={el.imagePreview}
                                companyName={el.companyName}
                                brandName={el.brandName}
                                features={el.features}
                                kind={el.kind}
                                className={`md:min-w-100 md:w-100 min-w-70 w-70
                                    ${idx === 0 ? "left-margin" : ""}
                                    ${idx === socialWorks.length - 1 ? "right-margin" : ""}
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
