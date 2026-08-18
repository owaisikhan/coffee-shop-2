"use client";

import { useState } from "react";
import { SectionHeading } from "../ds/SectionHeading";
import { FilterTabs } from "../ds/FilterTabs";
import { ProductCard } from "../ds/ProductCard";

const FILTERS = ["All", "Black", "Espresso", "Doppio"];

const PRODUCTS = [
  { name: "Cappuccino", image: "/assets/img-cappuccino.png", cat: "Espresso" },
  { name: "Americano", image: "/assets/img-americano.png", cat: "Black" },
  { name: "Espresso", image: "/assets/img-espresso.png", cat: "Doppio" },
  { name: "Iced Latte", image: "/assets/img-iced-coffee.png", cat: "Espresso" },
  { name: "Batch Brew", image: "/assets/img-hero-cup.png", cat: "Black" },
  { name: "Latte", image: "/assets/img-latte-art.png", cat: "Espresso" },
];

export function BestSellers() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);

  return (
    <section style={{ background: "var(--cream-100)", padding: "104px 48px" }}>
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
            gap: 56,
            justifyContent: "center",
            padding: "14px 0 0 14px",
          }}
        >
          {shown.map((p) => (
            <div key={p.name} className="product-card-hover">
              <ProductCard name={p.name} image={p.image} width={300} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
