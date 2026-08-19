"use client";

import { Dialog } from "../ui/Dialog";
import { FARMS } from "../../_lib/menu";

// The sourcing copy promises the bag tells you the farm, the varietal and what
// was paid, so "View Farm List" shows exactly that.
export function FarmListDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} title="Where The Coffee Comes From" width={640}>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-body)", margin: "0 0 20px" }}>
        Nine farms across Huila, Kirinyaga and Sidama. Prices are what we paid the
        producer, not the market rate.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr>
              {["Farm", "Origin", "Varietal", "Paid"].map((h) => (
                <th
                  key={h}
                  scope="col"
                  style={{
                    textAlign: h === "Paid" ? "right" : "left",
                    padding: "0 12px 10px 0",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    fontWeight: "var(--weight-medium)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FARMS.map((f) => (
              <tr key={f.farm}>
                <td style={{ padding: "12px 12px 12px 0", borderTop: "1px solid var(--border-hairline)", color: "var(--text-heading)", whiteSpace: "nowrap" }}>
                  {f.farm}
                </td>
                <td style={{ padding: "12px 12px 12px 0", borderTop: "1px solid var(--border-hairline)", color: "var(--text-body)" }}>
                  {f.origin}
                </td>
                <td style={{ padding: "12px 12px 12px 0", borderTop: "1px solid var(--border-hairline)", color: "var(--text-body)" }}>
                  {f.varietal}
                </td>
                <td style={{ padding: "12px 0", borderTop: "1px solid var(--border-hairline)", color: "var(--text-heading)", textAlign: "right", whiteSpace: "nowrap" }}>
                  {f.paid}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dialog>
  );
}
