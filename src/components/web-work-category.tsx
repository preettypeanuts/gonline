import Link from "next/link"
import SmartImage from "./smart-image"
import { WebWork } from "@/types/web-work"
import { ReusableBanner } from "./reusable-banner"

interface Props {
    works: WebWork[]
}

export const WebWorkByCategory = ({ works }: Props) => {
    const grouped = works.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = []
        acc[item.category].push(item)
        return acc
    }, {} as Record<string, WebWork[]>)

    return (
        <>
            <ReusableBanner
                title="Our Websites"
                highlight="Work"
                imageUrl="https://images.unsplash.com/photo-1770048792381-55d47c183faa?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <section className="spacing py-10 space-y-16">
                {Object.entries(grouped).map(([category, items]) => (
                    <div key={category}>
                        <div className="flex flex-row items-center justify-between mb-8">
                            <div className="pl-10 py-3 pr-3 rounded-r-3xl bg-black dark:bg-white dark:text-black text-white relative w-fit">
                                <div className="rounded-out-lt-3xl bg-darkColor dark:bg-lightColor"></div>
                                <div className="rounded-out-lb-3xl bg-darkColor dark:bg-lightColor"></div>
                                <h2 className="text-2xl sm:text-3xl font-bold tracking-wide">
                                    {category}
                                </h2>
                            </div>
                            <div className="pr-10 py-3 pl-3 rounded-l-3xl bg-black dark:bg-white dark:text-black text-white relative w-fit ml-auto">
                                <div className="rounded-out-rt-3xl bg-darkColor dark:bg-lightColor"></div>
                                <div className="rounded-out-rb-3xl bg-darkColor dark:bg-lightColor"></div>
                                <h2 className="text-xs font-bold uppercase p-3 bg-white rounded-full aspect-square text-black dark:bg-black dark:text-white h-fit w-fit">
                                    {items.length}
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-10">
                            {items.map((el, idx) => (
                                <Link href={el.link} key={idx} target="_blank" rel="noopener noreferrer">
                                    <div className="bg-white dark:bg-black rounded-main transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl h-full">
                                        <SmartImage
                                            width={500}
                                            height={300}
                                            src={el.imagePreview}
                                            alt={el.brandName}
                                            className="rounded-t-3xl w-full h-48 object-cover"
                                        />
                                        <div className="p-5 sm:p-6 space-y-2">
                                            <h1 className="font-bold text-lg sm:text-xl">
                                                {el.brandName}
                                            </h1>
                                            <p className="text-thirdColor uppercase font-semibold text-xs">
                                                {el.kind}
                                            </p>
                                            <div className="flex flex-wrap gap-1">
                                                {el.features.map((feature, featureIdx) => (
                                                    <p
                                                        key={featureIdx}
                                                        className="px-2 py-1 bg-darkColor w-fit rounded-full text-white dark:bg-lightColor dark:text-black text-xs font-medium"
                                                    >
                                                        {feature}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </>

    )
}