"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { CupVariant } from "../three/CoffeeCupModel";

const CoffeeCupCanvas = dynamic(() => import("../three/CoffeeCupCanvas"), { ssr: false });

export function ProductCard3D({
  name,
  variant,
  active,
  action = "Order Now",
  onAction,
  width = 300,
}: {
  name: string;
  variant: CupVariant;
  active: boolean;
  action?: string;
  onAction?: () => void;
  width?: number;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ width, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ width: "100%", height: 260 }}>
        <CoffeeCupCanvas variant={variant} active={active} />
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "var(--text-heading-3)",
          color: "var(--text-heading)",
          textAlign: "center",
          margin: 0,
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
          border: "none",
          background: "none",
          padding: "6px 0 0",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-body)",
          color: hover ? "var(--tan-500)" : "var(--espresso-900)",
          borderBottom: `1px solid ${hover ? "var(--tan-500)" : "var(--espresso-900)"}`,
          transition: "color var(--dur) var(--ease-standard), border-color var(--dur) var(--ease-standard)",
        }}
      >
        {action}
      </button>
    </div>
  );
}
