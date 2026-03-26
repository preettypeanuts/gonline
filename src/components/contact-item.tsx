import { dataContact } from "@/app/data"
import Link from "next/link"

export const ContactItems = () => {
    return (
        <section className="margin spacing">
            <div className="flex flex-wrap gap-1">
                {dataContact.map(((el, idx) => (
                    <Link key={idx} href={el.link} className="grow">
                        <div className="grow p-10 bg-white dark:bg-black rounded-main hover:-translate-y-1 duration-300 active:scale-95 hover:invert" key={idx}>
                            <div className="flex items-center gap-1 uppercase text-xs font-semibold mb-10">
                                {el.icon} {el.label}
                            </div>

                            <div>
                                <h1 className="text-lg text-wrap md:text-2xl font-light text-mainColor dark:text-thirdColor">
                                    {el.data}
                                </h1>
                            </div>
                        </div>
                    </Link>
                )))}
            </div>
        </section>
    )
}