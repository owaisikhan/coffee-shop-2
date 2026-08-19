const PATHS: Record<string, string> = {
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  "arrow-left": "M19 12H5M11 18l-6-6 6-6",
  search: "M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM21 21l-4.35-4.35",
  "chevron-down": "M6 9l6 6 6-6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  play: "M7 4l12 8-12 8z",
  mail: "M3 6h18v12H3zM3 6l9 7 9-7",
  phone: "M4 4h5l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v5a15 15 0 0 1-16-16z",
  "map-pin":
    "M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
};

export type IconName = keyof typeof PATHS;

export function Icon({
  name = "arrow-right",
  size = 18,
  strokeWidth = 1.75,
  fill = false,
  color = "currentColor",
  style,
}: {
  name?: string;
  size?: number;
  strokeWidth?: number;
  fill?: boolean;
  color?: string;
  style?: React.CSSProperties;
}) {
  const d = PATHS[name] || PATHS["arrow-right"];
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ display: "block", flex: "0 0 auto", ...style }}
      fill={fill ? color : "none"}
      stroke={fill ? "none" : color}
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d={d} />
    </svg>
  );
}
