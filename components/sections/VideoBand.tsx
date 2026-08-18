export function VideoBand() {
  return (
    <section style={{ position: "relative", height: "78vh", overflow: "hidden", background: "var(--espresso-900)" }}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        autoPlay
        muted
        loop
        playsInline
        src="/uploads/kling_20260331_Image_to_Video_Cinematic__4482_0.mp4"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "104%",
          height: "104%",
          transform: "translate(-50%,-52%)",
          objectFit: "cover",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(27,17,7,.5)" }} />
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: 24,
          padding: "0 clamp(20px, 5vw, 48px)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(30px, 6.5vw, 52px)",
            lineHeight: 1.2,
            color: "var(--cream-100)",
            margin: 0,
            maxWidth: 760,
          }}
        >
          Roasted Thursday,
          <br />
          Rested Until Monday
        </h2>
        <p style={{ fontSize: "clamp(15px, 4vw, 17px)", lineHeight: 1.75, color: "var(--cream-200)", maxWidth: 420, margin: 0 }}>
          Nothing Leaves The Roastery Before It Has Had Time To Settle. Nothing Stays Longer Than Two Weeks.
        </p>
      </div>
    </section>
  );
}
