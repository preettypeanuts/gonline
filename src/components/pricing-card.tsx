import { Title } from "./title"
import { PricingItems } from "./pricing-items"
import { ProblemScrollWrapper } from "./problem-scroll"

export type PricingPackage = {
    name: string
    favorite?: boolean
    pricing: {
        gimmick: number
        fixed: number
    }
    deliverables?: string[]
}

const GRID_COLS: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
}

type PricingCardProps = {
    packages: PricingPackage[]
    title?: string
    showStartingFrom?: boolean
    ctaLabel?: string
    favoriteCta?: string
}

export const PricingCard = ({
    packages,
    title = "Packages",
    showStartingFrom,
    ctaLabel = "Get Started",
    favoriteCta = "Get Started Now",
}: PricingCardProps) => {
    const useGrid = packages.length <= 3

    const items = (
        <PricingItems
            packages={packages}
            useGrid={useGrid}
            ctaLabel={ctaLabel}
            favoriteCta={favoriteCta}
            showStartingFrom={showStartingFrom}
        />
    )

    return (
        <section className="spacing space-y-8">
            {useGrid ? (
                <>
                    <Title>{title}</Title>
                    <div className={`grid gap-13 md:gap-5 py-16 px-4 md:px-10 ${GRID_COLS[packages.length] ?? "grid-cols-3"}`}>
                        {items}
                    </div>
                </>
            ) : (
                <ProblemScrollWrapper
                    scrollAmount={380}
                    title={<Title>{title}</Title>}
                >
                    {items}
                </ProblemScrollWrapper>
            )}
        </section>
    )
}