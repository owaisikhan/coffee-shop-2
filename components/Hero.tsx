"use client";

import { useEffect, useRef } from "react";
import { Button } from "./ds/Button";
import { IconButton } from "./ds/IconButton";
import { Logo } from "./ds/Logo";

const HERO_FINAL_SCALE = 0.72;

const NAV_LINKS = [
  { href: "#story", label: "Home", primary: true },
  { href: "#menu", label: "Menu" },
  { href: "#story", label: "About Us" },
  { href: "#sourcing", label: "Sourcing" },
  { href: "#visit", label: "Visit" },
];

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const span = wrap.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -wrap.getBoundingClientRect().top / (span || 1)));
      const end = HERO_FINAL_SCALE;
      const s = 1 - (1 - end) * p;
      const f = frameRef.current;
      if (f) {
        f.style.transform = `scale(${s})`;
        f.style.padding = `${18 * p}px`;
        f.style.background = p > 0.02 ? "var(--cream-100)" : "transparent";
      }
      const c = copyRef.current;
      if (c) {
        c.style.opacity = String(Math.max(0, 1 - p * 1.9));
        c.style.transform = `translateY(${-56 * p}px)`;
      }
      const sc = scrimRef.current;
      if (sc) sc.style.opacity = String(1 - 0.55 * p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    videoRef.current?.play().catch(() => {});
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "relative", height: "200vh", background: "var(--espresso-900)" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "var(--espresso-900)",
        }}
      >
        <div ref={frameRef} style={{ position: "absolute", inset: 0, display: "flex", transformOrigin: "50% 42%" }}>
          <div style={{ position: "relative", flex: 1, overflow: "hidden", background: "var(--espresso-800)" }}>
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              src="/uploads/kling_20251029_Image_to_Video_The_coffee_5026_0.mp4"
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
            <div
              ref={scrimRef}
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg,rgba(27,17,7,.72) 0%,rgba(27,17,7,.34) 46%,rgba(27,17,7,.78) 100%)",
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            padding: "24px 48px 48px",
            pointerEvents: "none",
          }}
        >
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 48,
              height: 64,
              padding: "0 24px 0 32px",
              border: "1px solid var(--border-on-dark)",
              background: "rgba(27,17,7,.55)",
              pointerEvents: "auto",
              flex: "0 0 auto",
            }}
          >
            <Logo size={22} />
            <div style={{ display: "flex", gap: 32, margin: "0 auto" }}>
              {NAV_LINKS.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  style={{
                    fontSize: 13,
                    color: link.primary ? "var(--cream-050)" : "var(--cream-200)",
                    opacity: link.primary ? 1 : 0.72,
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <a href="#visit" style={{ fontSize: 13, color: "var(--cream-050)" }}>
                Sign In
              </a>
              <IconButton icon="search" label="Search" size={34} />
            </div>
          </nav>

          <div
            ref={copyRef}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              gap: 24,
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--tan-300)",
              }}
            >
              Roasted Daily On Elm Street
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: 64,
                lineHeight: 1.18,
                color: "var(--cream-100)",
                margin: 0,
                maxWidth: 900,
              }}
            >
              Coffee Worth
              <br />
              Slowing Down For
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--cream-200)", maxWidth: 420, margin: 0 }}>
              Small Batches, Named Farms, And A Bar Where Someone Still Pulls Every Shot By Hand.
            </p>
            <div style={{ display: "flex", gap: 16, pointerEvents: "auto", marginTop: 8 }}>
              <Button variant="primary" style={{ minWidth: 150 }}>
                Order Now
              </Button>
              <Button variant="ghost" style={{ minWidth: 150 }}>
                Explore Menu
              </Button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--cream-200)",
                opacity: 0.7,
              }}
            >
              Scroll
            </span>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--cream-200)",
                opacity: 0.7,
              }}
            >
              Open 7 &mdash; 6 Daily
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
