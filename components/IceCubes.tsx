"use client";

import { useEffect, useRef } from "react";

// Decorative ice-cube cluster that travels down through the Hero into the
// Story section as the user scrolls, then shrinks + fades out ("zooms away")
// once Story is in view. Rendered as an absolutely-positioned overlay inside
// a wrapper that also contains <Hero /> and <Story />, so it automatically
// spans exactly their combined height with no hardcoded numbers.
//
// Motion is scroll-linked but eased toward the target every animation frame
// (the same lerp approach as Hero's video scrub) rather than snapping 1:1 to
// raw scroll events, so it glides instead of jittering.
export function IceCubes() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let target = 0;
    let current = 0;
    let rafId = 0;

    const readTarget = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const span = wrap.offsetHeight - window.innerHeight;
      target = Math.max(0, Math.min(1, -wrap.getBoundingClientRect().top / (span || 1)));
    };

    const apply = (p: number) => {
      const el = imgRef.current;
      if (!el) return;

      // 0 -> 0.55: travels down the (fixed) viewport through the hero, tilting
      // flat as it "arrives"; 0.55 -> 1: shrinks, blurs, and fades away as the
      // Story section takes over. Position is expressed purely as a function of
      // progress `p` (not layered on top of native scroll motion), since the
      // element is position:fixed and otherwise wouldn't move with the page at all.
      const settle = Math.min(1, p / 0.55);
      const zoom = Math.max(0, (p - 0.55) / 0.45);

      const topVh = 12 + settle * 58 + zoom * 10; // 12vh -> 70vh -> drifts to 80vh while fading
      const rotateX = 26 - settle * 26; // starts tilted back in 3D, flattens as it settles
      const rotateZ = -12 + p * 30;
      const translateZ = -160 + settle * 160;
      const scale = 1 - zoom * 0.7;
      const blur = zoom * 6;

      const fadeIn = p < 0.05 ? p / 0.05 : 1;
      const opacity = Math.max(0, Math.min(1, fadeIn) * (1 - zoom));

      el.style.top = `${topVh}vh`;
      el.style.transform = `perspective(1400px) translate3d(-50%, 0, ${translateZ}px) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(${Math.max(0, scale)})`;
      el.style.opacity = String(opacity);
      el.style.filter = `drop-shadow(0 30px 36px rgba(27,17,7,.35)) blur(${blur}px)`;
    };

    const tick = () => {
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.0005) current = target;
      apply(current);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", readTarget, { passive: true });
    window.addEventListener("resize", readTarget);
    readTarget();
    current = target;
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", readTarget);
      window.removeEventListener("resize", readTarget);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Invisible measuring anchor: stretches to exactly the combined height of
          the <Hero /> + <Story /> siblings it shares a parent with, so readTarget()
          can derive scroll progress without any hardcoded section heights. */}
      <div ref={wrapRef} aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src="/assets/img-ice-cubes.png"
        alt=""
        aria-hidden
        style={{
          position: "fixed",
          top: "12vh",
          left: "50%",
          width: 520,
          maxWidth: "44vw",
          pointerEvents: "none",
          zIndex: 6,
          opacity: 0,
          willChange: "transform, opacity, filter",
        }}
      />
    </>
  );
}
