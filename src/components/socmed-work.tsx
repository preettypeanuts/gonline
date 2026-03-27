import { dataClientSocmed } from "@/app/data"
import { Title } from "./title"
import { ProblemScrollWrapper } from "./problem-scroll"
import { SocmedItems } from "./socmed-items"

export const SocmedWork = () => {
    return (
        <section className="spacing space-y-8">
            <ProblemScrollWrapper
                title={
                    <Title>
                        Our Socmed <span className="text-thirdColor dark:text-mainColor">Work</span>
                    </Title>
                }
            >
                <SocmedItems items={dataClientSocmed} />
            </ProblemScrollWrapper>
        </section>
    )
}