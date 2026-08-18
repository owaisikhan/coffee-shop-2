"use client";

import { useState } from "react";
import { IconButton } from "./IconButton";

export function EmailSignup({
  placeholder = "Enter Your Email Address",
  onSubmit,
  width = 420,
  style,
}: {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  width?: number;
  style?: React.CSSProperties;
}) {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
        setValue("");
      }}
      style={{ display: "flex", width: "100%", maxWidth: width, background: "var(--surface-field)", ...style }}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Email address"
        style={{
          flex: 1,
          height: 52,
          border: "none",
          outline: "none",
          background: "transparent",
          padding: "0 var(--space-4)",
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-small)",
          color: "var(--espresso-900)",
        }}
      />
      <IconButton
        icon="arrow-right"
        variant="dark"
        size={52}
        label="Subscribe"
        style={{ pointerEvents: "none" }}
      />
    </form>
  );
}
