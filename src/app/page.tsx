import { CTA } from "@/components/cta";
import { HomeBanner } from "@/components/home-banner";
import { HowWeWork } from "@/components/how-we-work";
import { OpeningStatements } from "@/components/opening-statements";
import { ServicesVertical } from "@/components/services-vertical";
import { Showcase } from "@/components/showcase";

export default function Home() {
  return (
    <>
      <HomeBanner />
      <OpeningStatements />
      <ServicesVertical/>
      <HowWeWork/>
      <Showcase/>
      <CTA/>
    </>
  );
}
