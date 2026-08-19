export function PhotoFrame({
  src,
  alt = "",
  width = 300,
  height = 380,
  tilt = -4,
  mat = 12,
  decor = true,
  style,
}: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  tilt?: number;
  mat?: number;
  decor?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    // width/height stay numeric for the decor geometry below, but the frame
    // itself is fluid: it shrinks to its column on narrow screens and keeps
    // the intended proportions via aspect-ratio instead of a fixed height.
    <div style={{ position: "relative", width: "100%", maxWidth: width, aspectRatio: `${width} / ${height}`, ...style }}>
      {decor && (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, overflow: "visible" }}
          fill="none"
          stroke="var(--decor-outline)"
          strokeWidth="1"
        >
          <path d={`M${width * 0.18} -18 L${width * 0.62} -18 L${width * 0.18} 42 Z`} />
          <path
            d={`M${width * 0.82} ${height - 42} L${width + 18} ${height - 96} L${width + 18} ${
              height - 18
            } Z`}
          />
        </svg>
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `rotate(${tilt}deg)`,
          background: "var(--surface-photo-mat)",
          padding: mat,
          boxShadow: "var(--shadow-photo)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </div>
  );
}
