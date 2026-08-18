"use client";

import { useEffect, useRef, useState } from "react";

const BEAN_IMAGES = ["/assets/bean-1.png", "/assets/bean-2.png", "/assets/bean-3.png", "/assets/bean-4.png"];
const BEAN_COUNT = 30;

type Bean = {
  img: string;
  topPercent: number;
  leftPercent: number;
  size: number;
  rotation: number;
  scrollSpin: number; // deg of extra rotation per 1000px scrolled
  idleSpinSpeed: number; // deg/sec, continuous -- keeps spinning even at rest
  parallax: number; // 0 (drifts with the page, slow) .. 1 (moves 1:1 with scroll)
};

// Deterministic PRNG so server and client agree on "random" values (avoids
// hydration mismatches) -- seeded once, not Math.random().
function mulberry32(seed: number) {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Coffee beans scattered across the full height of the page. Each one drifts
// at its own parallax rate and slowly tumbles as the page scrolls -- some lag
// behind the content (feel distant/slow), others move almost 1:1 (feel close).
// Positions are generated once from a seeded RNG, stratified into height
// bands so the beans land spread apart rather than clumping together.
export function CoffeeBeans() {
  const [beans, setBeans] = useState<Bean[] | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const elRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const rand = mulberry32(20260818);
    const list: Bean[] = Array.from({ length: BEAN_COUNT }, (_, i) => {
      const bandStart = (i / BEAN_COUNT) * 100;
      const bandSize = 100 / BEAN_COUNT;
      return {
        img: BEAN_IMAGES[Math.floor(rand() * BEAN_IMAGES.length)],
        topPercent: bandStart + rand() * bandSize * 0.9,
        leftPercent: 3 + rand() * 90,
        size: 38 + rand() * 58,
        rotation: rand() * 360,
        scrollSpin: (rand() - 0.5) * 160,
        idleSpinSpeed: (rand() - 0.5) * 90,
        parallax: 0.25 + rand() * 0.65,
      };
    });
    setBeans(list);
  }, []);

  useEffect(() => {
    if (!beans) return;

    const setHeight = () => {
      const wrap = wrapRef.current;
      if (wrap) wrap.style.height = `${document.documentElement.scrollHeight}px`;
    };

    const start = performance.now();
    let rafId = 0;

    // Runs every frame (not just on scroll) so the beans keep gently spinning
    // even while the page is at rest, on top of the scroll-driven drift/tumble.
    const tick = (now: number) => {
      const y = window.scrollY;
      const elapsedSec = (now - start) / 1000;
      elRefs.current.forEach((el, i) => {
        if (!el) return;
        const b = beans[i];
        const drift = y * (1 - b.parallax); // lags behind native scroll by (1 - parallax)
        const rot = b.rotation + (y / 1000) * b.scrollSpin + elapsedSec * b.idleSpinSpeed;
        el.style.transform = `translateY(${drift}px) rotate(${rot}deg)`;
      });
      rafId = requestAnimationFrame(tick);
    };

    setHeight();
    window.addEventListener("resize", setHeight);
    const ro = new ResizeObserver(setHeight);
    ro.observe(document.body);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", setHeight);
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [beans]);

  if (!beans) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      style={{ position: "absolute", top: 0, left: 0, width: "100%", pointerEvents: "none", zIndex: 9999, overflow: "hidden" }}
    >
      {beans.map((b, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          ref={(el) => {
            elRefs.current[i] = el;
          }}
          src={b.img}
          alt=""
          style={{
            position: "absolute",
            top: `${b.topPercent}%`,
            left: `${b.leftPercent}%`,
            width: b.size,
            opacity: 1,
            filter: "drop-shadow(0 6px 10px rgba(27,17,7,.3))",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
