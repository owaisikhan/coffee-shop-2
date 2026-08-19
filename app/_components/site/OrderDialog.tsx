"use client";

import { useEffect, useId, useState } from "react";
import { Button } from "../ui/Button";
import { Dialog } from "../ui/Dialog";
import { DRINKS, FEATURED, type Drink } from "../../_lib/menu";

const SIZES = ["Small", "Regular", "Large"] as const;
const SIZE_SURCHARGE: Record<(typeof SIZES)[number], number> = {
  Small: -0.4,
  Regular: 0,
  Large: 0.6,
};

// Every drink, deduplicated by name -- FEATURED repeats some of DRINKS.
const ALL: Drink[] = [...DRINKS, ...FEATURED].filter(
  (d, i, arr) => arr.findIndex((x) => x.name === d.name) === i
);

const label: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
  marginBottom: 8,
  display: "block",
};

const field: React.CSSProperties = {
  width: "100%",
  height: 46,
  border: "1px solid var(--border-dark)",
  background: "var(--cream-050)",
  padding: "0 12px",
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-body)",
  color: "var(--espresso-900)",
  outline: "none",
};

// A pickup order for the counter. There is no backend here, so nothing is
// transmitted -- the confirmation is local and the form resets when reopened.
export function OrderDialog({
  open,
  onClose,
  initialDrink,
}: {
  open: boolean;
  onClose: () => void;
  initialDrink?: string;
}) {
  const [drinkName, setDrinkName] = useState(initialDrink ?? ALL[0].name);
  const [size, setSize] = useState<(typeof SIZES)[number]>("Regular");
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [placed, setPlaced] = useState(false);
  const [touched, setTouched] = useState(false);
  // Hero and BestSellers each mount an OrderDialog, so fixed ids would collide
  // in the DOM and a <label htmlFor> could focus the other dialog's field.
  const uid = useId();
  const drinkId = `${uid}-drink`;
  const qtyId = `${uid}-qty`;
  const nameId = `${uid}-name`;
  const errorId = `${uid}-name-error`;

  // Reopening for a different card should show that card's drink, and never a
  // stale confirmation from the previous order.
  useEffect(() => {
    if (!open) return;
    setDrinkName(initialDrink ?? ALL[0].name);
    setSize("Regular");
    setQty(1);
    setName("");
    setPlaced(false);
    setTouched(false);
  }, [open, initialDrink]);

  const drink = ALL.find((d) => d.name === drinkName) ?? ALL[0];
  const unit = Math.max(0, parseFloat(drink.price) + SIZE_SURCHARGE[size]);
  const total = (unit * qty).toFixed(2);
  const nameValid = name.trim().length > 1;

  return (
    <Dialog open={open} onClose={onClose} title={placed ? "Order Noted" : "Order For Pickup"}>
      {placed ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-body)", margin: 0 }}>
            Thanks {name.trim()} — {qty} × {size.toLowerCase()} {drink.name}, {total} total.
            Ready at the counter in about ten minutes.
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-muted)", margin: 0 }}>
            This is a demo storefront, so nothing was actually sent to the bar.
          </p>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setTouched(true);
            if (nameValid) setPlaced(true);
          }}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <div>
            <label style={label} htmlFor={drinkId}>
              Drink
            </label>
            <select
              id={drinkId}
              value={drinkName}
              onChange={(e) => setDrinkName(e.target.value)}
              style={field}
            >
              {ALL.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name} — {d.price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span style={label}>Size</span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                  style={{
                    flex: "1 1 90px",
                    height: 42,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-small)",
                    border: "1px solid var(--border-dark)",
                    background: size === s ? "var(--espresso-900)" : "transparent",
                    color: size === s ? "var(--cream-100)" : "var(--text-heading)",
                    transition: "background var(--dur) var(--ease-standard)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 120px" }}>
              <label style={label} htmlFor={qtyId}>
                Quantity
              </label>
              <input
                id={qtyId}
                type="number"
                min={1}
                max={20}
                value={qty}
                onChange={(e) => setQty(Math.min(20, Math.max(1, Number(e.target.value) || 1)))}
                style={field}
              />
            </div>
            <div style={{ flex: "2 1 200px" }}>
              <label style={label} htmlFor={nameId}>
                Name for the cup
              </label>
              <input
                id={nameId}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder="Who is collecting?"
                aria-invalid={touched && !nameValid}
                aria-describedby={touched && !nameValid ? errorId : undefined}
                style={{
                  ...field,
                  borderColor: touched && !nameValid ? "var(--danger)" : "var(--border-dark)",
                }}
              />
            </div>
          </div>

          {touched && !nameValid && (
            <p id={errorId} style={{ fontSize: 13, color: "var(--danger)", margin: 0 }}>
              We need a name to call out when it is ready.
            </p>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              borderTop: "1px solid var(--border-hairline)",
              paddingTop: 18,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "var(--text-body-lg)", color: "var(--text-heading)" }}>
              Total <strong>{total}</strong>
            </span>
            <Button variant="primary" type="submit">
              Place Order
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
