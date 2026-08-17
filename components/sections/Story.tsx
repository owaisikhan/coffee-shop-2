import { PhotoFrame } from "../ds/PhotoFrame";
import { Button } from "../ds/Button";

export function Story() {
  return (
    <section id="story" style={{ background: "var(--cream-100)", padding: "104px 48px" }}>
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "420px 1fr",
          gap: 96,
          alignItems: "center",
        }}
      >
        <PhotoFrame
          src="/assets/img-latte-art.png"
          alt="Latte art poured at the bar"
          width={380}
          height={460}
          tilt={-4}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Our Story
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
            A Roastery With A
            <br />
            Counter Attached
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-body)", maxWidth: 420, margin: 0 }}>
            Roaster Began In 2016 With One Drum Roaster In The Back Of A Bike Shop. We Still Roast Every
            Thursday Morning, Rest The Beans Four Days, And Sell Them Before The Fortnight Is Out.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-body)", maxWidth: 420, margin: 0 }}>
            Everything On The Menu Starts With Coffee We Bought Directly From The Farm, At A Price We Are
            Happy To Print On The Bag.
          </p>
          <Button variant="outline" style={{ minWidth: 160 }}>
            Explore More
          </Button>
        </div>
      </div>
    </section>
  );
}
