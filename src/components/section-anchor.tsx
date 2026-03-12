export const SectionAnchor = ({
    id,
    children,
}: {
    id: string
    children: React.ReactNode
}) => (
    <div id={id}>
        {children}
    </div>
)