"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

type SmartImageProps = ImageProps & {
    fallbackSrc?: string;
};

const getBlurDataURL = (url: string) => {
    if (!url) return "/placeholder.png";

    if (url.includes("cloudinary")) {
        return url.replace("/upload/", "/upload/w_20,e_blur:1000,q_10/");
    }

    if (url.includes("unsplash")) {
        return `${url}&w=20&blur=50&q=10`;
    }

    return "/placeholder.png";
};

export default function SmartImage({
    src,
    fallbackSrc = "/placeholder.png",
    className = "",
    ...props
}: SmartImageProps) {
    const [imgSrc, setImgSrc] = useState(src as string);

    return (
        <Image
            {...props}
            src={imgSrc}
            placeholder="blur"
            blurDataURL={getBlurDataURL(imgSrc)}
            onError={() => setImgSrc(fallbackSrc)}
            className={`bg-neutral-300 dark:bg-neutral-700 ${className}`}
        />
    );
}