import { Hero } from "@/components/Hero";
import { IceCubes } from "@/components/IceCubes";
import { Story } from "@/components/sections/Story";
import { StatsBand } from "@/components/sections/StatsBand";
import { BestSellers } from "@/components/sections/BestSellers";
import { VideoBand } from "@/components/sections/VideoBand";
import { Menu } from "@/components/sections/Menu";
import { Sourcing } from "@/components/sections/Sourcing";
import { Testimonial } from "@/components/sections/Testimonial";
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div style={{ background: "var(--cream-100)", fontFamily: "var(--font-body)", color: "var(--text-body)" }}>
      <div style={{ position: "relative" }}>
        <Hero />
        <Story />
        <IceCubes />
      </div>
      <StatsBand />
      <BestSellers />
      <VideoBand />
      <Menu />
      <Sourcing />
      <Testimonial />
      <Newsletter />
      <Footer />
    </div>
  );
}
