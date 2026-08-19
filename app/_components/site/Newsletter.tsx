import { EmailSignup } from "../ui/EmailSignup";

export function Newsletter() {
  return (
    <section style={{ background: "var(--cream-100)", padding: "clamp(56px, 9vw, 104px) clamp(20px, 5vw, 48px)" }}>
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 32,
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(28px, 6vw, 44px)",
            lineHeight: 1.2,
            color: "var(--text-heading)",
            margin: 0,
            maxWidth: 620,
          }}
        >
          Stay Up To Date On All News And Offers
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-body)", maxWidth: 420, margin: 0 }}>
          One Note A Month: What We Are Roasting, What Is Nearly Gone, And When The Next Cupping Is Open.
        </p>
        <EmailSignup width={420} />
      </div>
    </section>
  );
}
