import { StatBlock } from "../ds/StatBlock";

const STATS = [
  { value: "50+", label: "Item Of Coffee" },
  { value: "20+", label: "Order Running" },
  { value: "2k+", label: "Happy Customer" },
  { value: "9", label: "Farm Partners" },
];

export function StatsBand() {
  return (
    <section style={{ background: "var(--tan-300)", padding: "72px 48px" }}>
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 48,
        }}
      >
        {STATS.map((s) => (
          <StatBlock key={s.label} value={s.value} label={s.label} tone="dark" />
        ))}
      </div>
    </section>
  );
}
