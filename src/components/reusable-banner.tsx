import Image from "next/image"

interface ReusableBannerProps {
  title: string
  highlight?: string
  imageUrl: string
}

export const ReusableBanner = ({
  title,
  highlight,
  imageUrl,
}: ReusableBannerProps) => {
  return (
    <section className="flex justify-center">
      <div className="w-full h-[45vh] sm:h-[55vh] md:h-[65vh] relative">

        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          className="object-cover rounded-b-3xl"
          sizes="100vw"
        />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-lightColor dark:bg-darkColor rounded-t-3xl px-3 pt-3 text-center">

          <div className="rounded-out-bl-3xl bg-lightColor dark:bg-darkColor"></div>
          <div className="rounded-out-br-3xl bg-lightColor dark:bg-darkColor"></div>

          <div className="px-4 py-2 md:px-6 md:py-3 bg-linear-to-t from-white dark:from-black rounded-b-3xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-semibold leading-tight">
              {title}{" "}
              {highlight && (
                <span className="text-mainColor">
                  {highlight}
                </span>
              )}
            </h2>
          </div>

        </div>
      </div>
    </section>
  )
}
