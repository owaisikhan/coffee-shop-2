import { Logo } from "../ds/Logo";
import { SocialLinks } from "../ds/SocialLinks";

export function Footer() {
  return (
    <footer id="visit" style={{ background: "var(--espresso-900)", padding: "clamp(56px, 8vw, 96px) clamp(20px, 5vw, 48px) clamp(32px, 4vw, 48px)" }}>
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 64,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "clamp(32px, 4vw, 48px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
            <Logo size={30} />
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--cream-200)", maxWidth: 300, margin: 0 }}>
              Enjoy Better And Better Quality Coffee With Roaster.
            </p>
            <SocialLinks size={28} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--tan-300)",
              }}
            >
              Visit
            </span>
            <span style={{ fontSize: 15, color: "var(--cream-200)" }}>12 Elm Street</span>
            <span style={{ fontSize: 15, color: "var(--cream-200)" }}>Open 7 &mdash; 6 Daily</span>
            <span style={{ fontSize: 15, color: "var(--cream-200)" }}>Cupping Saturdays, 10am</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--tan-300)",
              }}
            >
              Contact
            </span>
            <span style={{ fontSize: 15, color: "var(--cream-200)" }}>Call Us: (321) 562 - 57420</span>
            <span style={{ fontSize: 15, color: "var(--cream-200)" }}>Roaster@Gmail.Com</span>
            <a href="#menu" style={{ fontSize: 15 }}>
              Wholesale Enquiries
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--tan-300)",
              }}
            >
              Menu
            </span>
            <a href="#menu" style={{ fontSize: 15 }}>
              Espresso Bar
            </a>
            <a href="#menu" style={{ fontSize: 15 }}>
              Filter And Beans
            </a>
            <a href="#sourcing" style={{ fontSize: 15 }}>
              Sourcing
            </a>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(239,223,196,.18)",
            paddingTop: 24,
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--cream-200)",
              opacity: 0.6,
            }}
          >
            Roaster, 2026
          </span>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--cream-200)",
              opacity: 0.6,
            }}
          >
            All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
