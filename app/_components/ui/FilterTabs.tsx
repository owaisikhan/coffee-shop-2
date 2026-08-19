"use client";

export function FilterTabs({
  items = ["All", "Black", "Espresso", "Doppio"],
  value,
  onChange,
  style,
}: {
  items?: string[];
  value: string;
  onChange: (v: string) => void;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ display: "flex", gap: "var(--space-7)", justifyContent: "center", ...style }}>
      {items.map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          style={{
            background: "none",
            border: "none",
            padding: "0 0 6px",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body)",
            color: i === value ? "var(--espresso-900)" : "rgba(27,17,7,.55)",
            borderBottom: i === value ? "1px solid var(--espresso-900)" : "1px solid transparent",
            transition: "color var(--dur) var(--ease-standard)",
          }}
        >
          {i}
        </button>
      ))}
    </div>
  );
}
