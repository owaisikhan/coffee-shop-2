"use client";

import { useState } from "react";

export function ProductCard({
  name,
  image,
  action = "Order Now",
  onAction,
  width = 300,
  style,
}: {
  name: string;
  image: string;
  action?: string;
  onAction?: () => void;
  width?: number;
  style?: React.CSSProperties;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ position: "relative", width, ...style }}>
      <div
        style={{
          position: "absolute",
          left: "calc(-1 * var(--offset-frame))",
          top: "calc(-1 * var(--offset-frame))",
          right: "var(--offset-frame)",
          bottom: "var(--offset-frame)",
          background: "var(--espresso-900)",
        }}
      />
      <div style={{ position: "relative", background: "var(--cream-200)" }}>
        <div style={{ padding: "var(--space-3)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={name}
            style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", display: "block" }}
          />
        </div>
        <h3
          style={{
            fontSize: "var(--text-heading-3)",
            textAlign: "center",
            padding: "0 var(--space-4) var(--space-4)",
          }}
        >
          {name}
        </h3>
        <button
          type="button"
          onClick={onAction}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            width: "100%",
            height: "var(--control-h)",
            border: "none",
            borderTop: "1px solid var(--border-hairline)",
            background: hover ? "var(--tan-300)" : "var(--cream-100)",
            color: "var(--espresso-900)",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body)",
            cursor: "pointer",
            transition: "background var(--dur) var(--ease-standard)",
          }}
        >
          {action}
        </button>
      </div>
    </div>
  );
}
