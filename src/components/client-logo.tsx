import {
    FaBuilding,
    FaStore,
    FaUniversity,
    FaIndustry,
    FaTruck,
    FaLaptopCode,
    FaChartLine,
    FaHospital,
} from "react-icons/fa"

export const ClientLogo = () => {
    const clients = [
        { name: "Astra Digital", icon: FaLaptopCode },
        { name: "Nusantara Tech", icon: FaChartLine },
        { name: "Urban Properti", icon: FaBuilding },
        { name: "Sinar Retail", icon: FaStore },
        { name: "Alpha Logistics", icon: FaTruck },
        { name: "Indo Manufacturing", icon: FaIndustry },
        { name: "EduSmart Group", icon: FaUniversity },
        { name: "Medika Care", icon: FaHospital },
    ]

    return (
        <section className="margin spacing">
            {/* Section Header */}
            <div className="text-center mb-14">
                <h2 className="text-4xl font-medium mb-4">
                    Trusted by Growing Companies
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    We collaborate with startups and corporations to build scalable
                    digital infrastructure and structured growth systems.
                </p>
            </div>

            {/* Logo Grid */}
            <div className="flex flex-wrap gap-2 items-center justify-center">
                {clients.map((client, index) => {
                    const Icon = client.icon

                    return (
                        <div
                            key={index}
                            className="flex flex-col items-center gap-3 group"
                        >
                            {/* iOS Style Icon Box */}
                            <div className="bg-white dark:bg-black p-3 w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center group-hover:-translate-y-1 transition-all duration-300 relative "
                            >
                                <Icon className="text-2xl sm:text-3xl text-neutral-700 dark:text-neutral-200 group-hover:opacity-0 duration-300" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-sm text-center text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold">
                                        {client.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}