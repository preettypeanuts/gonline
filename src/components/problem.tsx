import { webProblem } from "@/app/data"
import { Title } from "./title"
import { ProblemCards } from "./problem-cards"
import { ProblemScrollWrapper } from "./problem-scroll"

interface ProblemProps {
    title?: string
    items?: typeof webProblem
    scrollAmount?: number
}

export const Problem = ({
    title = "We Fix Your Problems",
    items = webProblem,
    scrollAmount = 380,
}: ProblemProps) => {
    return (
        <section className="spacing space-y-8">
            <ProblemScrollWrapper
                title={<Title>{title}</Title>}
                scrollAmount={scrollAmount}
            >
                <ProblemCards items={items} />
            </ProblemScrollWrapper>
        </section>
    )
}