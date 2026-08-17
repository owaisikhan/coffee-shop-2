"use client";

const CDN = "https://cdn.jsdelivr.net/npm/simple-icons@13/icons/";

export function SocialLinks({
  networks = ["pinterest", "instagram", "x", "facebook"],
  size = 28,
  style,
}: {
  networks?: string[];
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ display: "flex", gap: "var(--space-3)", ...style }}>
      {networks.map((n) => (
        <a
          key={n}
          href="#"
          aria-label={n}
          onClick={(e) => e.preventDefault()}
          style={{
            width: size,
            height: size,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--tan-300)",
            borderRadius: "var(--radius-full)",
          }}
        >
          <span
            style={{
              width: size * 0.45,
              height: size * 0.45,
              background: "var(--tan-300)",
              WebkitMaskImage: `url(${CDN}${n}.svg)`,
              maskImage: `url(${CDN}${n}.svg)`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              display: "block",
            }}
          />
        </a>
      ))}
    </div>
  );
}
