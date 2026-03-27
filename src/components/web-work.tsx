import { getWorks } from "@/lib/googleSheets"
import { Title } from "./title"
import { Button } from "./ui/button"
import { ProblemScrollWrapper } from "./problem-scroll"
import { WebWorkCards } from "./web-work-cards"

export const WebWork = async () => {
    const works = await getWorks()

    return (
        <section className="spacing space-y-8">
            <ProblemScrollWrapper
                title={<Title>Our Web Work</Title>}
            >
                <WebWorkCards items={works} />
            </ProblemScrollWrapper>

            <a href="/our-work/website" className="block text-center">
                <Button variant="invert" className="mx-auto mt-4">
                    View All
                </Button>
            </a>
        </section>
    )
}