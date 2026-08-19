const STAR =
  "M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z";

export function StarRating({
  value = 5,
  max = 5,
  size = 14,
  style,
}: {
  value?: number;
  max?: number;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      role="img"
      aria-label={`${value} out of ${max}`}
      style={{ display: "flex", gap: 3, ...style }}
    >
      {Array.from({ length: max }, (_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill={i < value ? "var(--accent-star)" : "rgba(239,223,196,.25)"}
          style={{ display: "block" }}
        >
          <path d={STAR} />
        </svg>
      ))}
    </div>
  );
}
