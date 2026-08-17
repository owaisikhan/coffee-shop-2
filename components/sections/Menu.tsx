import { SectionHeading } from "../ds/SectionHeading";

const ESPRESSO_BAR = [
  { name: "Espresso", price: "3.00" },
  { name: "Doppio", price: "3.60" },
  { name: "Cappuccino", price: "4.20" },
  { name: "Flat White", price: "4.40" },
  { name: "Iced Latte", price: "4.80" },
];

const FILTER_AND_BEANS = [
  { name: "Batch Brew", price: "3.40" },
  { name: "Pour Over, Single Origin", price: "5.20" },
  { name: "Cold Brew, On Tap", price: "4.60" },
  { name: "Beans, 250g Bag", price: "16.00" },
  { name: "Beans, 1kg Bag", price: "54.00" },
];

function MenuColumn({ heading, items }: { heading: string; items: { name: string; price: string }[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <span
        style={{
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        {heading}
      </span>
      {items.map((item, i) => (
        <div
          key={item.name}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
            borderBottom: i < items.length - 1 ? "1px solid var(--border-hairline)" : "none",
            paddingBottom: i < items.length - 1 ? 16 : 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 17,
              color: "var(--text-heading)",
            }}
          >
            {item.name}
          </span>
          <span style={{ fontSize: 15, color: "var(--text-body)" }}>{item.price}</span>
        </div>
      ))}
    </div>
  );
}

export function Menu() {
  return (
    <section id="menu" style={{ background: "var(--cream-100)", padding: "104px 48px" }}>
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 56,
        }}
      >
        <SectionHeading
          title="The Menu"
          body="Espresso And Filter, Priced For A Cup You Drink Standing Up Or Sitting Down."
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px 96px" }}>
          <MenuColumn heading="Espresso Bar" items={ESPRESSO_BAR} />
          <MenuColumn heading="Filter And Beans" items={FILTER_AND_BEANS} />
        </div>
      </div>
    </section>
  );
}
