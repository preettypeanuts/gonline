import SmartImage from "./smart-image"

interface ReusableBannerProps {
  title: string
  highlight?: string
  imageUrl: string
  className?: string
}

export const ReusableBanner = ({
  title,
  highlight,
  imageUrl,
  className = "",
}: ReusableBannerProps) => {
  return (
    <section className={`flex justify-center ${className}`}>
      <div className="w-full h-[45vh] sm:h-[55vh] md:h-[65vh] relative">

        <SmartImage
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
            <h1 className="text-xl md:text-5xl lg:text-7xl font-bold leading-tight truncate">
              {title}{" "}
              {highlight && (
                <span className="text-mainColor">
                  {highlight}
                </span>
              )}
            </h1>
          </div>

        </div>
      </div>
    </section>
  )
}
