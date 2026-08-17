import { StarRating } from "./StarRating";

export function TestimonialCard({
  quote,
  name,
  avatar,
  rating = 5,
  width = 700,
  style,
}: {
  quote: string;
  name: string;
  avatar?: string;
  rating?: number;
  width?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ position: "relative", width, paddingTop: 44, ...style }}>
      {avatar && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatar}
          alt={name}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 88,
            height: 88,
            borderRadius: "var(--radius-full)",
            objectFit: "cover",
            border: "3px solid var(--cream-100)",
          }}
        />
      )}
      <div
        style={{
          background: "var(--surface-card-dark)",
          padding: "68px var(--space-9) var(--space-7)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--space-5)",
        }}
      >
        <p
          style={{
            fontSize: "var(--text-body)",
            lineHeight: "var(--lh-body)",
            color: "var(--text-on-dark-muted)",
          }}
        >
          {quote}
        </p>
        <StarRating value={rating} />
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-bold)",
            fontSize: "var(--text-body-lg)",
            color: "var(--text-on-dark)",
          }}
        >
          {name}
        </span>
      </div>
    </div>
  );
}
