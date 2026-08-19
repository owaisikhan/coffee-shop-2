"use client";

import { useEffect, useRef, useState } from "react";
import { Dialog } from "../ui/Dialog";
import { searchDrinks } from "../../_lib/menu";

// Searches the menu. Picking a result closes the dialog and scrolls the menu
// section into view, since that is where the full list lives.
export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    // Let the dialog's own focus call land first, then take the caret.
    const id = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(id);
  }, [open]);

  const results = searchDrinks(query);

  return (
    <Dialog open={open} onClose={onClose} title="Search The Menu">
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Try 'cold brew', 'beans', 'espresso'"
        aria-label="Search drinks"
        style={{
          width: "100%",
          height: 48,
          border: "1px solid var(--border-dark)",
          background: "var(--cream-050)",
          padding: "0 14px",
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-body)",
          color: "var(--espresso-900)",
          outline: "none",
        }}
      />

      <div aria-live="polite" style={{ marginTop: 20 }}>
        {query.trim() === "" ? (
          <p style={{ fontSize: 14, color: "var(--text-muted)", margin: 0 }}>
            Start typing to search the espresso bar, filter coffee and retail bags.
          </p>
        ) : results.length === 0 ? (
          <p style={{ fontSize: 14, color: "var(--text-muted)", margin: 0 }}>
            Nothing on the menu matches “{query.trim()}”.
          </p>
        ) : (
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {results.map((d) => (
              <li key={d.name}>
                <a
                  href="#menu"
                  onClick={onClose}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "12px 0",
                    borderBottom: "1px solid var(--border-hairline)",
                    color: "var(--text-heading)",
                  }}
                >
                  <span>
                    <span style={{ fontSize: 15 }}>{d.name}</span>
                    <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 10 }}>
                      {d.group}
                    </span>
                  </span>
                  <span style={{ fontSize: 15 }}>{d.price}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Dialog>
  );
}
