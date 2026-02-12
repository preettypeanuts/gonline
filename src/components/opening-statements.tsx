import Image from "next/image"
import { Button } from "./ui/button"

export const OpeningStatements = () => {
    return (
        <>
            <section className="margin spacing space-y-10 md:space-y-15">
                <div className="flex md:flex-row flex-col justify-between md:items-center gap-5">
                    <h1 className=" text-3xl md:text-6xl lg:text-6xl leading-tight md:leading-tight lg:leading-tight">
                        <span className="px-4 py-2 bg-mainColor rounded-full text-lightColor">
                            Online ≠ Growth
                        </span>
                    </h1>
                    <p className="text-2xl md:text-3xl font-medium">
                        Visibility means nothing without structure.
                    </p>
                </div>

                <div>
                    <h1
                        className="text-3xl md:text-5xl leading-10 md:leading-16 font-medium"
                    >
                        At {" "}
                        <span className="text-mainColor">
                            GONLINE
                        </span>
                        {" "}
                        we connect website credibility,
                        social media presence, and digital strategy into one unified {" "}
                        <span className="text-thirdColor">
                            growth system.
                        </span>
                    </h1>
                </div>

                <div className="md:mt-10 h-70 w-full relative">
                    <Image
                        width={500}
                        height={500}
                        className="h-70 object-cover rounded-3xl w-full"
                        src="https://images.unsplash.com/photo-1527427929977-6c7aeb8677e5?q=80&w=2151&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                    />
                    <Button
                        variant={"outline"}
                        className="absolute bottom-5 right-5 text-white">
                        Start your Project
                    </Button>
                </div>
            </section>
        </>
    )
}