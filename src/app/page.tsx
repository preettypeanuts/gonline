import { HomeBanner } from "@/components/home-banner";
import { HowWeWork } from "@/components/how-we-work";
import { OpeningStatements } from "@/components/opening-statements";
import ServicesScroll from "@/components/services-vertical";

export default function Home() {
  return (
    <>
      <HomeBanner />
      <OpeningStatements />
      <ServicesScroll/>
      <HowWeWork/>
    </>
  );
}
