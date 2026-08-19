"use client";

import { useEffect, useRef } from "react";
import { Icon } from "./Icon";

// Centred modal used by the order, search and farm-list flows. Same behaviour
// contract as the nav drawer: close on backdrop click, close on Escape, lock
// the page behind it, and sit above the beans layer (z-index 9999) so nothing
// floats over it.
export function Dialog({
  open,
  onClose,
  title,
  children,
  width = 520,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: number;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    // Move focus into the dialog so keyboard and screen-reader users land here.
    panelRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        pointerEvents: open ? "auto" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 4vw, 32px)",
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(27,17,7,.6)",
          opacity: open ? 1 : 0,
          transition: "opacity 220ms var(--ease-standard)",
        }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: width,
          maxHeight: "min(84vh, 720px)",
          overflowY: "auto",
          background: "var(--cream-100)",
          border: "1px solid var(--border-dark)",
          padding: "clamp(20px, 4vw, 32px)",
          transform: open ? "translateY(0)" : "translateY(12px)",
          opacity: open ? 1 : 0,
          transition: "transform 240ms var(--ease-standard), opacity 240ms var(--ease-standard)",
          outline: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(22px, 4vw, 30px)",
              lineHeight: 1.2,
              color: "var(--text-heading)",
              margin: 0,
            }}
          >
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            style={{
              flex: "0 0 auto",
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--border-dark)",
              background: "transparent",
              color: "var(--text-heading)",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <Icon name="close" size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
