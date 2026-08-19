import { AmbientVideo } from "../ds/AmbientVideo";
import { Button } from "../ds/Button";

export function Sourcing() {
  return (
    <section id="sourcing" style={{ background: "var(--tan-300)", padding: "clamp(56px, 9vw, 104px) clamp(20px, 5vw, 48px)" }}>
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
          gap: "clamp(32px, 6vw, 96px)",
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
              fontSize: "clamp(28px, 6vw, 44px)",
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
          <AmbientVideo
            src="/uploads/kling_20251120_Image_to_Video_Fresh_coff_923_0.mp4"
            poster="/assets/poster-sourcing.jpg"
            style={{
              width: "100%",
              height: "clamp(280px, 46vw, 492px)",
              objectFit: "cover",
              display: "block",
              mixBlendMode: "multiply",
              WebkitMaskImage:
                "radial-gradient(115% 108% at 58% 46%,#000 42%,rgba(0,0,0,.55) 70%,transparent 96%)",
              maskImage:
                "radial-gradient(115% 108% at 58% 46%,#000 42%,rgba(0,0,0,.55) 70%,transparent 96%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
