import { webWorks } from "@/app/data";
import { TabsClient } from "./tabs-client";
import { Card } from "./card";

export const Showcase = () => {
    return (
        <section className="spacing">
            <h1 className="margin text-4xl font-medium text-center mb-10">
                Our {" "}
                <span className="text-mainColor">
                    Beloved {" "}
                </span>
                <span className="text-thirdColor">
                    Projects
                </span>
            </h1>

            <TabsClient
                website={
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
                }
                social={
                    <div className="flex items-center justify-center py-20 text-neutral-500">
                        Social media works coming soon.
                    </div>
                }
            />
        </section>
    );
};
