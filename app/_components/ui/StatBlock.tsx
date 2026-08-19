export function StatBlock({
  value,
  label,
  tone = "light",
  style,
}: {
  value: string;
  label: string;
  tone?: "light" | "dark";
  style?: React.CSSProperties;
}) {
  const onDark = tone === "light";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }}>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: "var(--weight-black)",
          fontSize: "var(--text-heading-3)",
          color: onDark ? "var(--text-on-dark)" : "var(--text-heading)",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: "var(--text-micro)",
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
          color: onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
