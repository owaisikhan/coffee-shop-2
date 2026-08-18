"use client";

import { useEffect, useRef } from "react";

// Decorative ice-cube cluster that falls from the top of the page as the user
// scrolls, tilting in 3D, and lands squarely in the Iced Latte product card's
// cup (tagged with data-ice-cubes-target in BestSellers.tsx) -- shrinking,
// blurring, and fading out right as it "drops in", rather than animating
// against a fixed section span.
//
// Progress is derived directly from window.scrollY vs. the target card's live
// page position (not a wrapping element's height), so it keeps landing on the
// cup correctly regardless of how much content sits between the top of the
// page and the BestSellers section. Motion is eased toward that target every
// animation frame (lerp), so it glides rather than snapping to raw scroll
// events.
export function IceCubes() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let target = 0;
    let current = 0;
    let targetX = window.innerWidth / 2;
    let hasTarget = false;
    let rafId = 0;

    const readTarget = () => {
      const el = document.querySelector<HTMLElement>("[data-ice-cubes-target]");
      if (!el) return; // keep last known values if the card is filtered out mid-scroll
      const rect = el.getBoundingClientRect();
      // Aim for roughly the middle of the product image within the card (the
      // "cup"), not the card's full box (which includes the title + button).
      const cupCenterY = window.scrollY + rect.top + rect.height * 0.32;
      const endScrollY = Math.max(1, cupCenterY - window.innerHeight / 2);
      target = Math.max(0, Math.min(1, window.scrollY / endScrollY));
      targetX = rect.left + rect.width / 2;
      hasTarget = true;
    };

    const apply = (p: number) => {
      const el = imgRef.current;
      if (!el || !hasTarget) return;

      // 0 -> 0.8: falls from the top of the page toward the cup, tilting flat
      // as it settles; 0.8 -> 1: sinks in, shrinking/blurring/fading away.
      const settle = Math.min(1, p / 0.8);
      const drop = Math.max(0, (p - 0.8) / 0.2);

      const vh = window.innerHeight;
      const topPx = vh * (0.1 + settle * 0.4) + drop * vh * 0.08;
      const leftPx = window.innerWidth / 2 + (targetX - window.innerWidth / 2) * settle;

      const rotateX = 28 - settle * 28; // tilted back in 3D at first, flattens as it lands
      const rotateZ = -14 + p * 34;
      const translateZ = -180 + settle * 180;
      const scale = 1 - drop * 0.85;
      const blur = drop * 7;

      const fadeIn = p < 0.05 ? p / 0.05 : 1;
      const opacity = Math.max(0, Math.min(1, fadeIn) * (1 - drop)) * 0.82; // "a bit transparent" throughout

      el.style.top = `${topPx}px`;
      el.style.left = `${leftPx}px`;
      el.style.transform = `perspective(1400px) translate3d(-50%, 0, ${translateZ}px) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(${Math.max(0, scale)})`;
      el.style.opacity = String(opacity);
      el.style.filter = `drop-shadow(0 30px 36px rgba(27,17,7,.35)) blur(${blur}px)`;
    };

    const tick = () => {
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.0005) current = target;
      readTarget(); // cup position can shift (responsive layout), so keep it live
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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src="/assets/img-ice-cubes.png"
      alt=""
      aria-hidden
      style={{
        position: "fixed",
        top: "10vh",
        left: "50%",
        width: 760,
        maxWidth: "58vw",
        pointerEvents: "none",
        zIndex: 6,
        opacity: 0,
        willChange: "transform, opacity, filter",
      }}
    />
  );
}
