"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { OrderDialog } from "./OrderDialog";
import { SearchDialog } from "./SearchDialog";
import { Icon } from "../ui/Icon";
import { IconButton } from "../ui/IconButton";
import { Logo } from "../ui/Logo";

// Kept in sync with the `hero-nav-links` / `hero-burger` breakpoint in globals.css.
const MOBILE_QUERY = "(max-width: 900px)";

const NAV_LINKS = [
  { href: "#story", label: "Home", primary: true },
  { href: "#menu", label: "Menu" },
  { href: "#story", label: "About Us" },
  { href: "#sourcing", label: "Sourcing" },
  { href: "#visit", label: "Visit" },
];

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Desktop: the hero video doesn't autoplay -- it starts as a static frame and
  // scrubs frame-by-frame as the user scrolls through the pinned hero (200vh
  // wrapper). Plain <video src> is often not fully seekable, so we re-fetch it
  // as a blob first to guarantee scrubbing works; if that fails we fall back to
  // a loop.
  //
  // Raw scroll position is jittery (trackpads/wheels deliver it in uneven bursts),
  // so applying it 1:1 to opacity/transform/video-seek every event reads as janky.
  // Instead we track a `target` progress from scroll and ease a `current` value
  // toward it every animation frame (a standard scroll-lerp), so the copy fade,
  // scrim, and video scrub all glide rather than snap.
  //
  // Mobile: scrubbing costs two screens of scrolling before the page even starts,
  // which is tedious on a phone, so the hero is a single screen with the video
  // simply looping. That also skips the blob download entirely. The branch is
  // decided at mount from matchMedia rather than in the markup, so server and
  // client render identically and there is no hydration mismatch.
  useEffect(() => {
    const v0 = videoRef.current;
    // Reduced motion: no scroll-scrubbing and no looping footage -- hold the
    // first frame so the hero is a still image.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v0?.pause();
      return;
    }
    if (window.matchMedia(MOBILE_QUERY).matches) {
      if (v0) {
        v0.loop = true;
        v0.muted = true;
        const play = () => v0.play().catch(() => {});
        play();
        v0.addEventListener("loadeddata", play);
        return () => v0.removeEventListener("loadeddata", play);
      }
      return;
    }

    let scrubbable = false;
    let seeking = false;
    let blobUrl: string | null = null;
    let target = 0;
    let current = 0;
    let rafId = 0;

    const readTarget = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const span = wrap.offsetHeight - window.innerHeight;
      target = Math.max(0, Math.min(1, -wrap.getBoundingClientRect().top / (span || 1)));
    };

    const applyProgress = (p: number) => {
      const c = copyRef.current;
      if (c) {
        c.style.opacity = String(Math.max(0, 1 - p * 1.9));
        c.style.transform = `translateY(${-56 * p}px)`;
      }
      const sc = scrimRef.current;
      if (sc) sc.style.opacity = String(1 - 0.55 * p);

      const v = videoRef.current;
      if (v && scrubbable && v.duration && !seeking) {
        const t = Math.min(v.duration - 0.05, p * v.duration);
        if (Math.abs(t - v.currentTime) > 0.02) {
          seeking = true;
          v.currentTime = t;
        }
      }
    };

    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0005) current = target;
      applyProgress(current);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", readTarget, { passive: true });
    window.addEventListener("resize", readTarget);

    const v = videoRef.current;
    const onSeeked = () => {
      seeking = false;
    };

    if (v) {
      v.pause();
      v.addEventListener("seeked", onSeeked);
      v.addEventListener("loadeddata", readTarget);
      fetch(v.currentSrc || v.src)
        .then((r) => r.blob())
        .then((b) => {
          blobUrl = URL.createObjectURL(b);
          v.src = blobUrl;
          v.load();
          v.addEventListener(
            "loadeddata",
            () => {
              scrubbable = v.seekable.length > 0 && v.seekable.end(0) > 0.5;
              if (!scrubbable) {
                v.loop = true;
                v.play().catch(() => {});
              }
              readTarget();
            },
            { once: true }
          );
        })
        .catch(() => {
          v.loop = true;
          v.play().catch(() => {});
        });
    }

    readTarget();
    current = target;
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", readTarget);
      window.removeEventListener("resize", readTarget);
      if (v) v.removeEventListener("seeked", onSeeked);
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Close on Escape, and stop the page behind the drawer from scrolling.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  return (
    <div ref={wrapRef} className="hero-wrap" style={{ position: "relative", background: "var(--espresso-900)" }}>
      <div
        className="hero-sticky"
        style={{
          position: "sticky",
          top: 0,
          overflow: "hidden",
          background: "var(--espresso-900)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          <div style={{ position: "relative", flex: 1, overflow: "hidden", background: "var(--espresso-800)" }}>
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              src="/uploads/kling_20251029_Image_to_Video_The_coffee_5026_0.mp4"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "100%",
                height: "100%",
                transform: "translate(-50%,-50%)",
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
            padding: "clamp(14px, 3vw, 24px) clamp(16px, 5vw, 48px) clamp(24px, 5vw, 48px)",
            pointerEvents: "none",
          }}
        >
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(16px, 3vw, 48px)",
              height: "clamp(56px, 8vw, 64px)",
              padding: "0 clamp(14px, 3vw, 24px) 0 clamp(16px, 3vw, 32px)",
              border: "1px solid var(--border-on-dark)",
              background: "rgba(27,17,7,.55)",
              pointerEvents: "auto",
              flex: "0 0 auto",
            }}
          >
            <Logo size={22} />
            <div className="hero-nav-links" style={{ display: "flex", gap: "clamp(14px, 2.4vw, 32px)", margin: "0 auto" }}>
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
            {/* marginLeft keeps this group right-aligned once the centre links
                are hidden on narrow screens and their auto margins go with them. */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginLeft: "auto" }}>
              <a href="#visit" style={{ fontSize: 13, color: "var(--cream-050)" }}>
                Sign In
              </a>
              <IconButton icon="search" label="Search" size={34} onClick={() => setSearchOpen(true)} />
              <button
                type="button"
                className="hero-burger"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="hero-menu-drawer"
                onClick={() => setMenuOpen(true)}
                style={{
                  width: 34,
                  height: 34,
                  display: "none",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--border-on-dark)",
                  background: "transparent",
                  color: "var(--cream-050)",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <Icon name="menu" size={18} />
              </button>
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
                fontSize: "clamp(32px, 7.6vw, 64px)",
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
            <p style={{ fontSize: "clamp(15px, 4vw, 17px)", lineHeight: 1.75, color: "var(--cream-200)", maxWidth: 420, margin: 0 }}>
              Small Batches, Named Farms, And A Bar Where Someone Still Pulls Every Shot By Hand.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, pointerEvents: "auto", marginTop: 8 }}>
              <Button variant="primary" style={{ minWidth: 150 }} onClick={() => setOrderOpen(true)}>
                Order Now
              </Button>
              <Button
                variant="ghost"
                style={{ minWidth: 150 }}
                onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              >
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
      <OrderDialog open={orderOpen} onClose={() => setOrderOpen(false)} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Slide-in menu. Fixed and above the beans (z-index 9999) so nothing
          floats over it. Panel is capped well short of full width. */}
      <div
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(27,17,7,.55)",
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 240ms var(--ease-standard)",
          }}
        />
        <aside
          id="hero-menu-drawer"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "min(78vw, 300px)",
            background: "var(--espresso-900)",
            borderLeft: "1px solid var(--border-on-dark)",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 260ms var(--ease-standard)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "20px 24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <Logo size={20} />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              style={{
                width: 34,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--border-on-dark)",
                background: "transparent",
                color: "var(--cream-050)",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <Icon name="close" size={16} />
            </button>
          </div>
          {NAV_LINKS.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 15,
                padding: "12px 0",
                color: "var(--cream-100)",
                borderBottom: "1px solid var(--border-on-dark)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#visit"
            onClick={() => setMenuOpen(false)}
            style={{ fontSize: 15, padding: "12px 0", color: "var(--tan-300)" }}
          >
            Sign In
          </a>
        </aside>
      </div>

    </div>
  );
}
