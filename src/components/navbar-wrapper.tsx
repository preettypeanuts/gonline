import { getMegaMenuBannerSlides } from "@/lib/cms/banners";
import { Navbar } from "./navbar";

export const NavbarWrapper = async () => {
  const megaMenuBanner = await getMegaMenuBannerSlides();
  return <Navbar megaMenuBanner={megaMenuBanner} />;
};
