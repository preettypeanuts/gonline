import Image from "next/image";
import Link from "next/link";

interface CardProps {
    link: string;
    category: string;
    image: string;
    companyName: string;
    brandName: string;
    features: string[];
    kind: string;
    className?: string;
}

export const Card = ({
    link,
    category,
    image,
    companyName,
    brandName,
    features,
    kind,
    className,
}: CardProps) => {
    return (
        <Link
            href={link}
            target="_blank"
            className={`group ${className}`}
        >
            <div className="duration-300 px-4 py-2 bg-white dark:bg-black w-fit rounded-t-2xl text-xs font-medium uppercase tracking-wide relative text-mainColor">
                {category}
                <div className="bg-white dark:bg-black rounded-out-br-2xl"></div>
            </div>
            <div className="flex flex-col justify-between bg-white dark:bg-black rounded-3xl rounded-tl-none space-y-4 p-5 hover:shadow-xl duration-300">
                <div>
                    <h3 className="text-lg font-semibold">{brandName}</h3>
                    <p className="text-sm text-neutral-500">{companyName}</p>
                </div>

                {/* Image */}
                <div className="overflow-hidden rounded-xl shadow">
                    <Image
                        src={image}
                        alt={brandName}
                        width={800}
                        height={600}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 "
                    />
                </div>
            </div>
        </Link>
    );
};
