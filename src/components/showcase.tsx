import { webWorks, dataClientSocmed } from "@/app/data"
import { TabsClient } from "./tabs-client"
import { Card } from "./card"
import { Button } from "./ui/button"

export const Showcase = () => {
    return (
        <section className="spacing">
            <h1 className="margin text-4xl font-medium text-center mb-10">
                Our{" "}
                <span className="text-mainColor">Beloved{" "}</span>
                <span className="text-thirdColor">Projects</span>
            </h1>

            <TabsClient
                website={
                    <div className="flex gap-2 md:gap-6 overflow-x-scroll py-10 no-scrollbar">
                        {webWorks.slice(0, 6).map((el, idx) => (
                            <Card
                                key={idx}
                                link={el.link}
                                category={el.category}
                                image={el.imagePreview}
                                companyName={el.companyName}
                                brandName={el.brandName}
                                features={el.features}
                                kind={el.kind}
                                className={`md:min-w-100 md:w-100 min-w-80 w-80 grow
                                    ${idx === 0 ? "left-margin" : ""}
                                    ${idx === 5 ? "right-margin" : ""}
                                `}
                            />
                        ))}
                    </div>
                }
                social={
                    <div className="flex gap-2 md:gap-6 overflow-x-scroll py-10 no-scrollbar">
                        {dataClientSocmed.map((el, idx) => (
                            <Card
                                key={idx}
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

            <a href="/our-work/website" className="block text-center">
                <Button variant="invert" className="mx-auto">
                    View All<span className="text-thirdColor dark:text-mainColor -ml-1">Projects</span>
                </Button>
            </a>
        </section>
    )
}