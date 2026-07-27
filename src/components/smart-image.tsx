"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SmartImageProps = ImageProps & {
  fallbackSrc?: string;
  /**
   * Gray fill behind the image (skeleton / letterbox).
   * Set false for transparent logos — otherwise PNG alpha shows as gray/dark.
   */
  fillBackground?: boolean;
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
  fillBackground = true,
  ...props
}: SmartImageProps) {
  const [imgSrc, setImgSrc] = useState(src as string);

  return (
    <Image
      {...props}
      src={imgSrc}
      placeholder={fillBackground ? "blur" : "empty"}
      blurDataURL={fillBackground ? getBlurDataURL(imgSrc) : undefined}
      onError={() => setImgSrc(fallbackSrc)}
      className={cn(
        fillBackground && "bg-neutral-300 dark:bg-neutral-700",
        className,
      )}
    />
  );
}
