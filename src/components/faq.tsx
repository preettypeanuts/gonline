"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { WebsiteFaq } from "@/app/data"
import { Title } from "./title"

export const FaqSection = () => {
    const half = Math.ceil(WebsiteFaq.length / 2)

    return (
        <section className="spacing space-y-12">

            {/* HEADER */}
            <div className="space-y-2">
                <Title>
                    Got Questions? We <span className="text-thirdColor">Answer</span>
                </Title>
            </div>

            {/* FAQ GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 mx-4 md:mx-10">

                {/* LEFT COLUMN */}
                <Accordion type="single" collapsible>
                    {WebsiteFaq.slice(0, half).map((item, idx) => (
                        <FaqItem key={idx} item={item} index={idx} />
                    ))}
                </Accordion>

                {/* RIGHT COLUMN */}
                <Accordion type="single" collapsible>
                    {WebsiteFaq.slice(half).map((item, idx) => (
                        <FaqItem key={idx} item={item} index={idx + half} />
                    ))}
                </Accordion>

            </div>

        </section>
    )
}

function FaqItem({
    item,
    index,
}: {
    item: { question: string; answer: string }
    index: number
}) {
    return (
        <AccordionItem
            value={`item-${index}`}
            className="border-b-0 mb-2"
        >
            <AccordionTrigger
                className="
                    group flex items-center justify-between w-full
                    px-5 py-4 rounded-xl
                    bg-white hover:bg-neutral-200
                    dark:bg-black dark:hover:bg-neutral-800
                    text-neutral-900 dark:text-neutral-100
                    text-sm font-medium text-left
                    transition-colors duration-150
                    [&>svg]:hidden
                    data-[state=open]:rounded-b-none
                    data-[state=open]:bg-neutral-900 data-[state=open]:text-white
                    dark:data-[state=open]:bg-white dark:data-[state=open]:text-black
                    no-underline hover:no-underline
                "
            >
                <span>{item.question}</span>

                {/* Custom plus/minus icon */}
                <span
                    className="
                        ml-4 shrink-0 size-6 rounded-md
                        flex items-center justify-center
                        bg-neutral-200 dark:bg-neutral-800
                        text-neutral-500 dark:text-neutral-400
                        group-data-[state=open]:bg-white/20 dark:group-data-[state=open]:bg-black/10
                        group-data-[state=open]:text-white dark:group-data-[state=open]:text-black
                        transition-colors duration-150
                    "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                    >
                        <path
                            className="group-data-[state=open]:hidden"
                            d="M6 1v10M1 6h10"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                        <path
                            className="hidden group-data-[state=open]:block"
                            d="M1 6h10"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                    </svg>
                </span>
            </AccordionTrigger>

            <AccordionContent
                className="
                    px-5 py-4
                    bg-neutral-900 dark:bg-white
                    text-neutral-300 dark:text-neutral-600
                    text-sm leading-relaxed
                    rounded-b-xl
                    border-t
                    border-neutral-700 dark:border-neutral-200
                "
            >
                {item.answer}
            </AccordionContent>
        </AccordionItem>
    )
}