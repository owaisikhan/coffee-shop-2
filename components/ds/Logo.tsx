export function Logo({
  size = 22,
  color = "var(--cream-100)",
  style,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span style={style}>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: "var(--weight-black)",
          fontSize: size,
          lineHeight: 1.1,
          color,
          letterSpacing: "var(--tracking-tight)",
        }}
      >
        Roaster
      </span>
    </span>
  );
}
