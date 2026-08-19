"use client";

import { useState } from "react";
import { IconButton } from "./IconButton";

// Basic shape check only. Anything stricter rejects addresses that are
// perfectly valid, and only a confirmation email can really prove one works.
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

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
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div
        aria-live="polite"
        style={{ width: "100%", maxWidth: width, display: "flex", flexDirection: "column", gap: 8, ...style }}
      >
        <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-heading)", margin: 0 }}>
          You are on the list — one note a month, nothing else.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setValue("");
          }}
          style={{
            alignSelf: "flex-start",
            background: "none",
            border: "none",
            padding: 0,
            font: "inherit",
            fontSize: 13,
            color: "var(--text-link)",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Use a different address
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", maxWidth: width, ...style }}>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (!looksLikeEmail(value)) {
            setError(
              value.trim() === "" ? "Enter an email address first." : "That does not look like an email address."
            );
            return;
          }
          setError(null);
          onSubmit?.(value.trim());
          setDone(true);
        }}
        style={{ display: "flex", background: "var(--surface-field)" }}
      >
        <input
          type="email"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          placeholder={placeholder}
          aria-label="Email address"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "signup-error" : undefined}
          style={{
            flex: 1,
            height: 52,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            padding: "0 var(--space-4)",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-small)",
            color: "var(--espresso-900)",
          }}
        />
        <IconButton icon="arrow-right" variant="dark" size={52} label="Subscribe" type="submit" />
      </form>
      {error && (
        <p id="signup-error" role="alert" style={{ fontSize: 13, color: "var(--danger)", margin: "8px 0 0" }}>
          {error}
        </p>
      )}
    </div>
  );
}
