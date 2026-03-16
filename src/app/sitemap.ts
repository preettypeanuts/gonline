import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gonline.id"

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/website`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/social-media`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/go-digital`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/our-work`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/insight`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
  ]
}