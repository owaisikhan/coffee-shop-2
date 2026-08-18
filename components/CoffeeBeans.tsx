"use client";

import { useEffect, useRef, useState } from "react";

const BEAN_IMAGE = "/assets/bean-1.png";
const BEAN_COUNT = 30;

const RESTITUTION = 0.72; // energy kept per wall bounce
const DAMP_HALFLIFE = 0.7; // sec for a thrown bean's speed to halve
const SETTLE_SPEED = 40; // px/sec below which a free bean rejoins the ambient drift
const MAX_THROW_SPEED = 2400; // px/sec cap, so a fast flick can't ricochet forever

type Bean = {
  topPercent: number;
  leftPercent: number;
  size: number;
  rotation: number;
  scrollSpin: number; // deg of extra rotation per 1000px scrolled
  idleSpinSpeed: number; // deg/sec, continuous -- keeps spinning even at rest
  parallax: number; // 0 (drifts with the page, slow) .. 1 (moves 1:1 with scroll)
  wanderAmpX: number; // px, independent side-to-side wander
  wanderFreqX: number; // rad/sec
  wanderPhaseX: number;
  wanderAmpY: number; // px, independent up/down wander (on top of scroll drift)
  wanderFreqY: number; // rad/sec
  wanderPhaseY: number;
};

// Per-bean mutable physics state, kept in a ref (never React state) so the
// animation loop can mutate it every frame without re-rendering.
type BeanState = {
  mode: "ambient" | "drag" | "free";
  // Persistent offset from the bean's laid-out position. Ambient motion is
  // applied on top of this, so a bean that's been thrown somewhere new keeps
  // drifting around its *new* home rather than snapping back.
  homeDX: number;
  homeDY: number;
  rotOffset: number;
  // Absolute document-space position + velocity, used while dragging/flying.
  docX: number;
  docY: number;
  vx: number;
  vy: number;
  rot: number;
  rotVel: number;
  w: number;
  h: number;
  grabDX: number;
  grabDY: number;
  lastMoveT: number;
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
// at its own parallax rate, wanders on independent sine waves, and spins as
// the page scrolls. Positions come from a seeded RNG, stratified into height
// bands so the beans land spread apart rather than clumping together.
//
// Beans are also grabbable: drag one and it follows the pointer (clamped to
// the viewport, so it visibly hits the screen edges); let go and it flies off
// with the flick's momentum, bouncing off the viewport walls until it slows
// down and rejoins the ambient drift from wherever it came to rest.
export function CoffeeBeans() {
  const [beans, setBeans] = useState<Bean[] | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const elRefs = useRef<(HTMLImageElement | null)[]>([]);
  const stateRefs = useRef<BeanState[]>([]);
  const baseRefs = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const rand = mulberry32(20260818);
    const list: Bean[] = Array.from({ length: BEAN_COUNT }, (_, i) => {
      const bandStart = (i / BEAN_COUNT) * 100;
      const bandSize = 100 / BEAN_COUNT;
      // Weighted toward the left/right margins so the beans frame the content
      // instead of crowding the centred headline copy; a few still cross the
      // middle so the page doesn't look like two tidy columns.
      const sideRoll = rand();
      const leftPercent =
        sideRoll < 0.42
          ? 1 + rand() * 24 // left margin
          : sideRoll < 0.84
            ? 68 + rand() * 24 // right margin
            : 32 + rand() * 36; // occasional centre crossing
      return {
        topPercent: bandStart + rand() * bandSize * 0.9,
        leftPercent,
        size: 26 + rand() * 92,
        rotation: rand() * 360,
        scrollSpin: (rand() - 0.5) * 160,
        idleSpinSpeed: (rand() - 0.5) * 90,
        parallax: 0.25 + rand() * 0.65,
        wanderAmpX: 30 + rand() * 70,
        wanderFreqX: 0.15 + rand() * 0.35,
        wanderPhaseX: rand() * Math.PI * 2,
        wanderAmpY: 16 + rand() * 34,
        wanderFreqY: 0.15 + rand() * 0.35,
        wanderPhaseY: rand() * Math.PI * 2,
      };
    });
    stateRefs.current = list.map(() => ({
      mode: "ambient" as const,
      homeDX: 0,
      homeDY: 0,
      rotOffset: 0,
      docX: 0,
      docY: 0,
      vx: 0,
      vy: 0,
      rot: 0,
      rotVel: 0,
      w: 0,
      h: 0,
      grabDX: 0,
      grabDY: 0,
      lastMoveT: 0,
    }));
    setBeans(list);
  }, []);

  useEffect(() => {
    if (!beans) return;

    // offsetLeft/offsetTop are the untransformed layout position inside the
    // wrapper (which sits at document origin), so they double as document
    // coordinates. Cached here rather than read per frame to avoid 30 forced
    // reflows every tick.
    const measure = () => {
      const wrap = wrapRef.current;
      if (wrap) wrap.style.height = `${document.documentElement.scrollHeight}px`;
      baseRefs.current = elRefs.current.map((el) => ({
        x: el ? el.offsetLeft : 0,
        y: el ? el.offsetTop : 0,
      }));
    };

    const start = performance.now();
    let lastNow = start;
    let rafId = 0;

    // Runs every frame (not just on scroll) so the beans keep drifting and
    // spinning at rest, and so thrown beans keep integrating their physics.
    const tick = (now: number) => {
      const y = window.scrollY;
      const elapsedSec = (now - start) / 1000;
      const dt = Math.min(0.05, (now - lastNow) / 1000);
      lastNow = now;

      const viewW = document.documentElement.clientWidth;
      const viewH = document.documentElement.clientHeight;
      const scrollX = window.scrollX;
      const damp = Math.pow(0.5, dt / DAMP_HALFLIFE);

      elRefs.current.forEach((el, i) => {
        if (!el) return;
        const b = beans[i];
        const s = stateRefs.current[i];
        const base = baseRefs.current[i] ?? { x: 0, y: 0 };

        const drift = y * (1 - b.parallax); // lags behind native scroll by (1 - parallax)
        const wanderX = Math.sin(elapsedSec * b.wanderFreqX + b.wanderPhaseX) * b.wanderAmpX;
        const wanderY = Math.sin(elapsedSec * b.wanderFreqY + b.wanderPhaseY) * b.wanderAmpY;
        const ambientRot = b.rotation + (y / 1000) * b.scrollSpin + elapsedSec * b.idleSpinSpeed;

        let tx: number;
        let ty: number;
        let rot: number;

        if (s.mode === "ambient") {
          tx = s.homeDX + wanderX;
          ty = s.homeDY + drift + wanderY;
          rot = ambientRot + s.rotOffset;
        } else {
          if (s.mode === "free") {
            s.docX += s.vx * dt;
            s.docY += s.vy * dt;

            // Bounce off the current viewport edges (walls move with scroll).
            const minX = scrollX;
            const maxX = scrollX + viewW - s.w;
            const minY = y;
            const maxY = y + viewH - s.h;
            if (s.docX < minX) {
              s.docX = minX + (minX - s.docX) * RESTITUTION;
              s.vx = Math.abs(s.vx) * RESTITUTION;
              s.rotVel = -s.rotVel * RESTITUTION;
            } else if (s.docX > maxX) {
              s.docX = maxX - (s.docX - maxX) * RESTITUTION;
              s.vx = -Math.abs(s.vx) * RESTITUTION;
              s.rotVel = -s.rotVel * RESTITUTION;
            }
            if (s.docY < minY) {
              s.docY = minY + (minY - s.docY) * RESTITUTION;
              s.vy = Math.abs(s.vy) * RESTITUTION;
              s.rotVel = -s.rotVel * RESTITUTION;
            } else if (s.docY > maxY) {
              s.docY = maxY - (s.docY - maxY) * RESTITUTION;
              s.vy = -Math.abs(s.vy) * RESTITUTION;
              s.rotVel = -s.rotVel * RESTITUTION;
            }

            s.vx *= damp;
            s.vy *= damp;
            s.rotVel *= damp;
            s.rot += s.rotVel * dt;

            if (Math.hypot(s.vx, s.vy) < SETTLE_SPEED) {
              // Rejoin ambient drift from exactly where it stopped, so there
              // is no visible jump back to the original layout position.
              s.homeDX = s.docX - base.x - wanderX;
              s.homeDY = s.docY - base.y - drift - wanderY;
              s.rotOffset = s.rot - ambientRot;
              s.mode = "ambient";
            }
          }
          tx = s.docX - base.x;
          ty = s.docY - base.y;
          rot = s.rot;
        }

        el.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
      });

      rafId = requestAnimationFrame(tick);
    };

    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [beans]);

  const onPointerDown = (i: number) => (e: React.PointerEvent<HTMLImageElement>) => {
    const el = elRefs.current[i];
    const s = stateRefs.current[i];
    if (!el || !s) return;
    e.preventDefault();
    el.setPointerCapture(e.pointerId);

    const rect = el.getBoundingClientRect();
    s.w = rect.width;
    s.h = rect.height;
    s.docX = rect.left + window.scrollX;
    s.docY = rect.top + window.scrollY;
    s.grabDX = e.pageX - s.docX;
    s.grabDY = e.pageY - s.docY;
    s.vx = 0;
    s.vy = 0;
    s.rotVel = 0;
    // Carry the current on-screen rotation over so grabbing doesn't snap it.
    const match = /rotate\(([-0-9.]+)deg\)/.exec(el.style.transform);
    s.rot = match ? parseFloat(match[1]) : 0;
    s.lastMoveT = performance.now();
    s.mode = "drag";
  };

  const onPointerMove = (i: number) => (e: React.PointerEvent<HTMLImageElement>) => {
    const s = stateRefs.current[i];
    if (!s || s.mode !== "drag") return;

    const now = performance.now();
    const dt = Math.max(0.008, (now - s.lastMoveT) / 1000);
    s.lastMoveT = now;

    const prevX = s.docX;
    const prevY = s.docY;

    // Clamp into the viewport so a dragged bean visibly hits the screen edges
    // instead of disappearing past them.
    const viewW = document.documentElement.clientWidth;
    const viewH = document.documentElement.clientHeight;
    const nextX = e.pageX - s.grabDX;
    const nextY = e.pageY - s.grabDY;
    s.docX = Math.min(Math.max(nextX, window.scrollX), window.scrollX + viewW - s.w);
    s.docY = Math.min(Math.max(nextY, window.scrollY), window.scrollY + viewH - s.h);

    // Track pointer velocity so the release throw carries the flick's momentum.
    s.vx = (s.docX - prevX) / dt;
    s.vy = (s.docY - prevY) / dt;
    s.rot += ((s.docX - prevX) * 0.6) % 360;
  };

  const endDrag = (i: number) => (e: React.PointerEvent<HTMLImageElement>) => {
    const el = elRefs.current[i];
    const s = stateRefs.current[i];
    if (!el || !s || s.mode !== "drag") return;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);

    // A stale velocity from a pointer that paused before releasing shouldn't
    // fling the bean, so drop it if the last move was a while ago.
    if (performance.now() - s.lastMoveT > 120) {
      s.vx = 0;
      s.vy = 0;
    }
    let speed = Math.hypot(s.vx, s.vy);
    if (speed > MAX_THROW_SPEED) {
      const k = MAX_THROW_SPEED / speed;
      s.vx *= k;
      s.vy *= k;
      speed = MAX_THROW_SPEED;
    }
    s.rotVel = Math.max(-900, Math.min(900, s.vx * 1.2)) + (speed > 400 ? 180 : 0);
    s.mode = "free";
  };

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
          src={BEAN_IMAGE}
          alt=""
          draggable={false}
          onPointerDown={onPointerDown(i)}
          onPointerMove={onPointerMove(i)}
          onPointerUp={endDrag(i)}
          onPointerCancel={endDrag(i)}
          style={{
            position: "absolute",
            top: `${b.topPercent}%`,
            left: `${b.leftPercent}%`,
            width: b.size,
            opacity: 1,
            filter: "drop-shadow(0 6px 10px rgba(27,17,7,.3))",
            willChange: "transform",
            // Only the beans themselves take pointer events; the wrapper stays
            // transparent to clicks so page content underneath stays usable.
            pointerEvents: "auto",
            cursor: "grab",
            touchAction: "none",
            userSelect: "none",
          }}
        />
      ))}
    </div>
  );
}
