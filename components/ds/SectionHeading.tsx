export function SectionHeading({
  title,
  body,
  align = "center",
  tone = "dark",
  size = "lg",
  maxWidth = 620,
  children,
  style,
}: {
  title: string;
  body?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
  size?: "lg" | "sm";
  maxWidth?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const onDark = tone === "light";
  const fs = size === "lg" ? "var(--text-heading-1)" : "var(--text-heading-2)";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align,
        ...style,
      }}
    >
      <h2
        style={{
          fontSize: fs,
          lineHeight: "var(--lh-heading-1)",
          color: onDark ? "var(--text-on-dark)" : "var(--text-heading)",
          margin: 0,
        }}
      >
        {title}
      </h2>
      {body && (
        <p
          style={{
            fontSize: "var(--text-small)",
            lineHeight: "var(--lh-body)",
            color: onDark ? "var(--text-on-dark-muted)" : "var(--text-body)",
            maxWidth,
          }}
        >
          {body}
        </p>
      )}
      {children}
    </div>
  );
}
