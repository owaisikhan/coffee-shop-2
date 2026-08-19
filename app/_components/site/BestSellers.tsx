"use client";

import { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { FilterTabs } from "../ui/FilterTabs";
import { ProductCard } from "../ui/ProductCard";

const FILTERS = ["All", "Black", "Espresso", "Doppio"];

const PRODUCTS = [
  { name: "Cappuccino", image: "/assets/img-cappuccino.png", video: "/uploads/cappuccino-loop.mp4", cat: "Espresso" },
  { name: "Americano", image: "/assets/img-americano.png", video: "/uploads/americano-loop.mp4", cat: "Black" },
  { name: "Espresso", image: "/assets/img-espresso.png", video: "/uploads/espresso-loop.mp4", cat: "Doppio" },
  { name: "Iced Latte", image: "/assets/img-iced-coffee.png", video: "/uploads/iced-latte-loop.mp4", cat: "Espresso" },
  { name: "Batch Brew", image: "/assets/img-hero-cup.png", video: "/uploads/batch-brew-loop.mp4", cat: "Black" },
  { name: "Latte", image: "/assets/img-latte-art.png", video: "/uploads/latte-loop.mp4", cat: "Espresso" },
];

export function BestSellers() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);

  return (
    <section style={{ background: "var(--cream-100)", padding: "clamp(56px, 9vw, 104px) clamp(20px, 5vw, 48px)" }}>
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 48,
          alignItems: "center",
        }}
      >
        <SectionHeading
          title="Best Selling Item"
          body="Four Drinks Account For Most Of What Leaves The Bar Before Ten In The Morning."
        />
        <FilterTabs items={FILTERS} value={filter} onChange={setFilter} />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(28px, 5vw, 56px)",
            justifyContent: "center",
            padding: "14px 0 0 14px",
          }}
        >
          {shown.map((p) => (
            <div key={p.name} className="product-card-hover">
              <ProductCard name={p.name} image={p.image} video={p.video} width={300} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
