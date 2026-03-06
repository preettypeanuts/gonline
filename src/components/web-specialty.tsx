import { DataBusinessSpecialties } from "@/app/data"

function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array]

    for (let i = arr.length - 1; i > 0; i--) {
        const j = (i * 7 + 3) % arr.length
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }

    return arr
}

const shuffledSpecialties = shuffleArray(DataBusinessSpecialties)

const Pill = ({ title, icon: Icon }: { title: string; icon: React.ComponentType }) => (
    <div className="flex items-center p-2 bg-white dark:bg-black rounded-full group hover:invert duration-200">
        <div className="text-2xl text-neutral-500 dark:text-neutral-400 p-4 bg-lightColor dark:bg-darkColor rounded-full">
            <Icon />
        </div>

        <h3 className="text-lg font-semibold text-neutral-500 dark:text-neutral-400 px-3">
            Website {title}
        </h3>
    </div>
)

export const WebSpecialty = () => {
    const data = [...shuffledSpecialties, ...shuffledSpecialties]
    return (
        <section className="py-4 overflow-hidden">
            <style>{`
        :root {
          --scroll-speed: 180s;
        }

        @keyframes scroll-x-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scroll-x-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .scroll-track {
          display: flex;
          width: max-content;
          gap: 10px;
          will-change: transform;
        }

        .scroll-left {
          animation: scroll-x-left var(--scroll-speed) linear infinite;
        }

        .scroll-right {
          animation: scroll-x-right var(--scroll-speed) linear infinite;
        }
      `}</style>

            {/* ROW 1 */}
            <div className="scroll-wrapper overflow-hidden cursor-default select-none">
                <div className="scroll-track scroll-left pb-3">
                    {[...DataBusinessSpecialties, ...DataBusinessSpecialties].map((el, idx) => (
                      <Pill key={`top-${idx}`} title={el.title} icon={el.icon} />
                    ))}
                </div>
            </div>

            {/* ROW 2 (REVERSE) */}
            <div className="scroll-wrapper overflow-hidden cursor-default select-none">
                <div className="scroll-track scroll-right">
                    {data.map((el, idx) => (
                       <Pill key={`top-${idx}`} title={el.title} icon={el.icon} />
                    ))}
                </div>
            </div>
        </section>
    )
}