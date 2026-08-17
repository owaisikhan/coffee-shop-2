"use client";

import { useState } from "react";
import { Icon } from "./Icon";

type Variant = "primary" | "dark" | "ghost" | "outline";

const V: Record<Variant, { background: string; color: string; border: string; hover: string }> = {
  primary: {
    background: "var(--btn-primary-bg)",
    color: "var(--btn-primary-fg)",
    border: "1px solid var(--btn-primary-bg)",
    hover: "var(--btn-primary-bg-hover)",
  },
  dark: {
    background: "var(--btn-dark-bg)",
    color: "var(--btn-dark-fg)",
    border: "1px solid var(--btn-dark-bg)",
    hover: "var(--btn-dark-bg-hover)",
  },
  ghost: {
    background: "transparent",
    color: "var(--btn-ghost-fg)",
    border: "1px solid var(--btn-ghost-border)",
    hover: "var(--btn-ghost-bg-hover)",
  },
  outline: {
    background: "transparent",
    color: "var(--text-heading)",
    border: "1px solid var(--border-dark)",
    hover: "rgba(27,17,7,.08)",
  },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon = "arrow-right",
  showIcon = true,
  disabled,
  onClick,
  style,
}: {
  children: React.ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  icon?: string;
  showIcon?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  const [hover, setHover] = useState(false);
  const v = V[variant] || V.primary;
  const sm = size === "sm";
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: sm ? 8 : 10,
        height: sm ? "var(--control-h-sm)" : "var(--control-h)",
        padding: sm ? "0 14px" : "0 var(--control-px)",
        fontFamily: "var(--font-body)",
        fontSize: sm ? "var(--text-small)" : "var(--text-body)",
        fontWeight: "var(--weight-medium)",
        letterSpacing: "var(--tracking-normal)",
        borderRadius: "var(--radius-none)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        background: hover && !disabled ? v.hover : v.background,
        color: v.color,
        border: v.border,
        transition:
          "background var(--dur) var(--ease-standard), color var(--dur) var(--ease-standard)",
        ...style,
      }}
    >
      <span style={{ whiteSpace: "nowrap", flex: "0 0 auto" }}>{children}</span>
      {showIcon && <Icon name={icon} size={sm ? 14 : 16} />}
    </button>
  );
}
