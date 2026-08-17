"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "../ds/SectionHeading";
import { FilterTabs } from "../ds/FilterTabs";
import { ProductCard3D } from "../ds/ProductCard3D";
import type { CupVariant } from "../three/CoffeeCupModel";

const FILTERS = ["All", "Black", "Espresso", "Doppio"];

const PRODUCTS: { name: string; variant: CupVariant; cat: string }[] = [
  { name: "Cappuccino", variant: "cappuccino", cat: "Espresso" },
  { name: "Americano", variant: "americano", cat: "Black" },
  { name: "Espresso", variant: "espresso", cat: "Doppio" },
  { name: "Iced Latte", variant: "iced", cat: "Espresso" },
  { name: "Batch Brew", variant: "batch", cat: "Black" },
  { name: "Latte", variant: "latte", cat: "Espresso" },
];

export function BestSellers() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const shown = filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
          ref={gridRef}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 40,
            justifyContent: "center",
            padding: "14px 0 0 14px",
          }}
        >
          {shown.map((p) => (
            <ProductCard3D key={p.name} name={p.name} variant={p.variant} active={active} width={300} />
          ))}
        </div>
      </div>
    </section>
  );
}
