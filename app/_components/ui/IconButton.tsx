"use client";

import { useState } from "react";
import { Icon } from "./Icon";

type Variant = "dark" | "tan" | "outline";

export function IconButton({
  icon = "arrow-right",
  variant = "dark",
  size = 40,
  label,
  onClick,
  type = "button",
  style,
}: {
  icon?: string;
  variant?: Variant;
  size?: number;
  label?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  style?: React.CSSProperties;
}) {
  const [hover, setHover] = useState(false);
  const dark = variant === "dark";
  const tan = variant === "tan";
  const bg = dark ? "var(--espresso-900)" : tan ? "var(--tan-400)" : "transparent";
  const hoverBg = dark ? "var(--espresso-700)" : tan ? "var(--tan-500)" : "rgba(27,17,7,.08)";
  return (
    <button
      type={type}
      aria-label={label || icon}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: hover ? hoverBg : bg,
        color: dark ? "var(--cream-100)" : "var(--espresso-900)",
        border: variant === "outline" ? "1px solid var(--border-dark)" : "1px solid transparent",
        borderRadius: "var(--radius-none)",
        cursor: "pointer",
        transition: "background var(--dur) var(--ease-standard)",
        ...style,
      }}
    >
      <Icon name={icon} size={Math.round(size * 0.4)} />
    </button>
  );
}
