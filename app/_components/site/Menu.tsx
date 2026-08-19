import { SectionHeading } from "../ui/SectionHeading";
import { drinksInGroup } from "../../_lib/menu";

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
    <section id="menu" style={{ background: "var(--cream-100)", padding: "clamp(56px, 9vw, 104px) clamp(20px, 5vw, 48px)" }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "clamp(40px, 6vw, 64px) clamp(32px, 6vw, 96px)" }}>
          <MenuColumn heading="Espresso Bar" items={drinksInGroup("Espresso Bar")} />
          <MenuColumn heading="Filter And Beans" items={drinksInGroup("Filter And Beans")} />
        </div>
      </div>
    </section>
  );
}
