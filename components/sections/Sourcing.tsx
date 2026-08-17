import { Button } from "../ds/Button";

export function Sourcing() {
  return (
    <section id="sourcing" style={{ background: "var(--tan-300)", padding: "104px 48px" }}>
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 96,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--espresso-700)",
            }}
          >
            Sourcing
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: 44,
              lineHeight: 1.2,
              color: "var(--text-heading)",
              margin: 0,
            }}
          >
            Bought By The Sack,
            <br />
            Not By The Container
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--espresso-700)", maxWidth: 420, margin: 0 }}>
            We Buy From Nine Farms Across Huila, Kirinyaga And Sidama. Each Lot Arrives Under Sixty Sacks,
            Which Is Small Enough That We Can Taste Every One Before It Ships.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--espresso-700)", maxWidth: 420, margin: 0 }}>
            The Bag Tells You The Farm, The Varietal, What We Paid, And The Week It Was Roasted.
          </p>
          <Button variant="dark" style={{ minWidth: 180 }}>
            View Farm List
          </Button>
        </div>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: -14,
              top: -14,
              right: 14,
              bottom: 14,
              background: "var(--espresso-900)",
            }}
          />
          <div style={{ position: "relative", background: "var(--cream-100)", padding: 12 }}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              autoPlay
              muted
              loop
              playsInline
              src="/uploads/kling_20251120_Image_to_Video_Fresh_coff_923_0.mp4"
              style={{ width: "100%", height: 460, objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
