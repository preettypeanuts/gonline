import Image from "next/image"

export const ReusableBanner = () => {
    return (
        <>
            <section className="flex justify-center">
                <div className="mt- w-full h-[65vh] relative">
                    <Image
                        width={1000}
                        height={1000}
                        className="w-full  h-[65vh] object-cover rounded-b-3xl"
                        src="https://images.unsplash.com/photo-1628702110466-aa2107a82d8e?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="" />
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-lightColor dark:bg-darkColor rounded-t-3xl px-3 pt-3 text-center">
                        <div className="rounded-out-bl-3xl bg-lightColor dark:bg-darkColor"></div>
                        <div className="rounded-out-br-3xl bg-lightColor dark:bg-darkColor"></div>

                        <div className="px-4 py-2 bg-linear-to-t from-white dark:from-black rounded-b-3xl text-center">
                            <h2 className="text-3xl md:text-7xl font-semibold leading-tight mb-4">
                                Get To Know {" "}
                                <span className="text-mainColor">Us</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}