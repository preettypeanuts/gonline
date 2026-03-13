import { webWorks } from "@/app/data"
import { Title } from "./title"
import { Button } from "./ui/button"
import { ProblemScrollWrapper } from "./problem-scroll"
import { WebWorkCards } from "./web-work-cards"

export const WebWork = () => {
    return (
        <section className="spacing space-y-8">
            <ProblemScrollWrapper
                title={<Title>Our Web Work</Title>}
            >
                <WebWorkCards items={webWorks} />
            </ProblemScrollWrapper>

            <a href="/our-work/website" className="block text-center">
                <Button variant="invert" className="mx-auto mt-4">
                    View All
                </Button>
            </a>
        </section>
    )
}