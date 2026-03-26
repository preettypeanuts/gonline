import { getAds } from "@/lib/googleSheets"
import { Navbar } from "./navbar"

export const NavbarWrapper = async () => {
  const ads = await getAds()
  return <Navbar ads={ads} />
}