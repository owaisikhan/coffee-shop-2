"use client";

import { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { FilterTabs } from "../ui/FilterTabs";
import { ProductCard } from "../ui/ProductCard";
import { OrderDialog } from "./OrderDialog";
import { FEATURED } from "../../_lib/menu";

const FILTERS = ["All", "Black", "Espresso", "Doppio"];

export function BestSellers() {
  const [filter, setFilter] = useState("All");
  const [ordering, setOrdering] = useState<string | null>(null);
  const shown = filter === "All" ? FEATURED : FEATURED.filter((p) => p.cat === filter);

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
              <ProductCard
                name={p.name}
                image={p.image}
                video={p.video}
                width={300}
                onAction={() => setOrdering(p.name)}
              />
            </div>
          ))}
        </div>
      </div>
      <OrderDialog
        open={ordering !== null}
        onClose={() => setOrdering(null)}
        initialDrink={ordering ?? undefined}
      />
    </section>
  );
}
