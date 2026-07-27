export type CmsBanner = {
  id: string;
  brandId: string;
  name: string;
  key: string;
  images: string[];
  redirectUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

/** Normalized slide for FE carousels (image + click target). */
export type BannerSlide = {
  image: string;
  href: string;
};
