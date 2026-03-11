import { webWorks } from "@/app/data"
import { Card } from "./card"

export const PortoWebsite = () => {
    return (
        <>
            <div className="flex gap-6 overflow-x-scroll py-10 no-scrollbar">
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
                        className={`min-w-100 w-100
                                                    ${idx === 0 ? "ml-4 md:ml-10" : ""}
                                                    ${idx === 5 ? "mr-4 md:mr-10" : ""}
                        `}
                    />
                ))}
            </div>
        </>
    )
}