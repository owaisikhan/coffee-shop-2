import { CoffeeBeans } from "@/app/_components/site/CoffeeBeans";
import { Hero } from "@/app/_components/site/Hero";
import { Story } from "@/app/_components/site/Story";
import { StatsBand } from "@/app/_components/site/StatsBand";
import { BestSellers } from "@/app/_components/site/BestSellers";
import { VideoBand } from "@/app/_components/site/VideoBand";
import { Menu } from "@/app/_components/site/Menu";
import { Sourcing } from "@/app/_components/site/Sourcing";
import { Testimonial } from "@/app/_components/site/Testimonial";
import { Newsletter } from "@/app/_components/site/Newsletter";
import { Footer } from "@/app/_components/site/Footer";

export default function Home() {
  return (
    <div
      style={{
        position: "relative",
        background: "var(--cream-100)",
        fontFamily: "var(--font-body)",
        color: "var(--text-body)",
      }}
    >
      <CoffeeBeans />
      <Hero />
      <Story />
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
