"use client";

import { useEffect, useRef, useState } from "react";

// bean-1.png is kept in public/assets for future use.
const BEAN_IMAGE = "/assets/bean-5.png";
const BEAN_COUNT = 15;
const BEAN_SIZE = 72; // px, uniform across every bean
// A phone screen is a fraction of the width but nearly the same height, so the
// desktop count reads as clutter and the beans swallow too many taps. Scaled
// down once on mount (never re-randomised on resize, which would teleport them).
const MOBILE_BREAKPOINT = 760;
const MOBILE_BEAN_COUNT = 6;
const MOBILE_BEAN_SIZE = 46;

const RESTITUTION = 0.72; // energy kept per wall bounce
const DAMP_HALFLIFE = 0.7; // sec for a thrown bean's speed to halve
const SETTLE_SPEED = 40; // px/sec below which a free bean rejoins the ambient drift
const MAX_THROW_SPEED = 2400; // px/sec cap, so a fast flick can't ricochet forever
const BEAN_RESTITUTION = 0.55; // bounciness of a bean-on-bean hit
const BEAN_RADIUS_SCALE = 0.42; // collision circle vs. image box (beans are oval)
const MAX_SPIN = 1200; // deg/sec, keeps a hard knock from blurring into a whirl
// An ambient bean's position is recomputed from its wander formula every frame,
// so a purely positional fix gets undone. Overlapping pairs always get at least
// this much separation speed, which knocks them into free mode so they actually
// part instead of resting merged into one another.
const MIN_SEPARATION_SPEED = 70; // px/sec
// Touch-only: a tap that isn't a drag still kicks the bean, so poking one on a
// phone sends it off rather than doing nothing until you drag.
const TAP_SLOP = 10; // px of travel below which a touch counts as a tap, not a drag
const TAP_MS = 400; // and it has to be quick -- a long press isn't a poke
const TAP_KICK_SPEED = 820; // px/sec imparted by a tap

type Bean = {
  topPercent: number;
  leftPercent: number;
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
  downT: number;
  downPageX: number;
  downPageY: number;
  moved: number;
  pointerIsTouch: boolean;
  // Ambient terms cached each frame so a bean that settles after a collision
  // can rejoin the drift exactly where it stopped.
  wanderX: number;
  wanderY: number;
  drift: number;
  ambientRot: number;
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

function clampSpin(v: number) {
  return Math.max(-MAX_SPIN, Math.min(MAX_SPIN, v));
}

// Bounce a free-flying bean off the current viewport edges. The walls move
// with the page, so they are expressed in document coordinates.
function bounceWalls(s: BeanState, scrollX: number, scrollY: number, viewW: number, viewH: number) {
  const minX = scrollX;
  const maxX = scrollX + viewW - s.w;
  const minY = scrollY;
  const maxY = scrollY + viewH - s.h;
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
  const [size, setSize] = useState(BEAN_SIZE);
  const wrapRef = useRef<HTMLDivElement>(null);
  const elRefs = useRef<(HTMLImageElement | null)[]>([]);
  const stateRefs = useRef<BeanState[]>([]);
  const baseRefs = useRef<{ x: number; y: number }[]>([]);
  const isNarrowRef = useRef(false);

  useEffect(() => {
    const rand = mulberry32(20260818);
    const narrow = window.innerWidth <= MOBILE_BREAKPOINT;
    isNarrowRef.current = narrow;
    const count = narrow ? MOBILE_BEAN_COUNT : BEAN_COUNT;
    setSize(narrow ? MOBILE_BEAN_SIZE : BEAN_SIZE);
    const list: Bean[] = Array.from({ length: count }, (_, i) => {
      const bandStart = (i / count) * 100;
      const bandSize = 100 / count;
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
      downT: 0,
      downPageX: 0,
      downPageY: 0,
      moved: 0,
      pointerIsTouch: false,
      wanderX: 0,
      wanderY: 0,
      drift: 0,
      ambientRot: 0,
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
      // Wall bounds and collision radii need the box size for every bean, not
      // just ones that have been picked up.
      elRefs.current.forEach((el, i) => {
        const st = stateRefs.current[i];
        if (!el || !st) return;
        st.w = el.offsetWidth;
        st.h = el.offsetHeight;
      });
    };

    const start = performance.now();
    let lastNow = start;
    let rafId = 0;
    // docX/docY begin at 0, so the first frame's position delta is meaningless.
    // Prime them before deriving any velocity or resolving contacts.
    let primed = false;

    // Runs every frame (not just on scroll) so the beans keep drifting and
    // spinning at rest, and so thrown beans keep integrating their physics.
    //
    // Three phases per frame: work out where every bean wants to be, resolve
    // any bean-on-bean contacts, then write the transforms. Positions are kept
    // in document space for every mode (not just drag/free) so the collision
    // pass can treat all beans uniformly.
    const tick = (now: number) => {
      const y = window.scrollY;
      const elapsedSec = (now - start) / 1000;
      const dt = Math.min(0.05, (now - lastNow) / 1000);
      lastNow = now;

      const viewW = document.documentElement.clientWidth;
      const viewH = document.documentElement.clientHeight;
      const scrollX = window.scrollX;
      const damp = Math.pow(0.5, dt / DAMP_HALFLIFE);
      const n = elRefs.current.length;

      // --- phase 1: advance each bean -------------------------------------
      for (let i = 0; i < n; i++) {
        const el = elRefs.current[i];
        if (!el) continue;
        const b = beans[i];
        const s = stateRefs.current[i];
        const base = baseRefs.current[i] ?? { x: 0, y: 0 };

        const drift = y * (1 - b.parallax); // lags behind native scroll by (1 - parallax)
        s.wanderX = Math.sin(elapsedSec * b.wanderFreqX + b.wanderPhaseX) * b.wanderAmpX;
        s.wanderY = Math.sin(elapsedSec * b.wanderFreqY + b.wanderPhaseY) * b.wanderAmpY;
        s.drift = drift;
        s.ambientRot = b.rotation + (y / 1000) * b.scrollSpin + elapsedSec * b.idleSpinSpeed;

        const prevX = s.docX;
        const prevY = s.docY;

        if (s.mode === "ambient") {
          s.docX = base.x + s.homeDX + s.wanderX;
          s.docY = base.y + s.homeDY + drift + s.wanderY;
          s.rot = s.ambientRot + s.rotOffset;
        } else if (s.mode === "free") {
          s.docX += s.vx * dt;
          s.docY += s.vy * dt;
          bounceWalls(s, scrollX, y, viewW, viewH);
          s.vx *= damp;
          s.vy *= damp;
          s.rotVel *= damp;
          s.rot += s.rotVel * dt;
        }
        // drag mode: docX/docY are driven by the pointer handler.

        // Numerically derived velocity, so an ambient bean's wander and a
        // dragged bean's pointer motion both carry real momentum into a hit.
        if (s.mode !== "free" && dt > 0 && primed) {
          s.vx = (s.docX - prevX) / dt;
          s.vy = (s.docY - prevY) / dt;
        }
      }

      // --- phase 2: bean-on-bean collisions --------------------------------
      const r = size * BEAN_RADIUS_SCALE;
      const minDist = r * 2;
      if (primed) {
        for (let i = 0; i < n; i++) {
          const a = stateRefs.current[i];
          if (!elRefs.current[i]) continue;
          for (let j = i + 1; j < n; j++) {
            const b2 = stateRefs.current[j];
            if (!elRefs.current[j]) continue;

            let dx = b2.docX - a.docX;
            let dy = b2.docY - a.docY;
            let dist = Math.hypot(dx, dy);
            if (dist >= minDist) continue;
            if (dist < 0.001) {
              // Exactly coincident: pick an arbitrary axis to separate along.
              dx = 1;
              dy = 0;
              dist = 1;
            }
            const nx = dx / dist;
            const ny = dy / dist;

            // A bean held by the pointer is immovable, so it shoves the others.
            const aFixed = a.mode === "drag";
            const bFixed = b2.mode === "drag";
            if (aFixed && bFixed) continue;

            // Push the pair apart so they never visibly sink into each other.
            const overlap = minDist - dist;
            const aShare = aFixed ? 0 : bFixed ? 1 : 0.5;
            const bShare = 1 - aShare;
            a.docX -= nx * overlap * aShare;
            a.docY -= ny * overlap * aShare;
            b2.docX += nx * overlap * bShare;
            b2.docY += ny * overlap * bShare;

            // Equal masses, so the impulse just swaps the normal components
            // (scaled by restitution), with a floor so a pair that overlaps
            // without closing still parts instead of resting merged.
            const rvn = (b2.vx - a.vx) * nx + (b2.vy - a.vy) * ny;
            const share = aFixed || bFixed ? 1 : 2;
            const bounce = rvn < 0 ? (-(1 + BEAN_RESTITUTION) * rvn) / share : 0;
            const jImpulse = Math.max(bounce, MIN_SEPARATION_SPEED / share);
            const ix = jImpulse * nx;
            const iy = jImpulse * ny;
            const spin = jImpulse * 1.6;

            if (!aFixed) {
              a.vx -= ix;
              a.vy -= iy;
              a.rotVel = clampSpin(a.rotVel - spin);
              // An ambient bean has no physics of its own, so knock it loose --
              // it will fly, bounce, slow down and rejoin the drift where it lands.
              if (a.mode === "ambient") a.mode = "free";
            }
            if (!bFixed) {
              b2.vx += ix;
              b2.vy += iy;
              b2.rotVel = clampSpin(b2.rotVel + spin);
              if (b2.mode === "ambient") b2.mode = "free";
            }
          }
        }
      } else {
        primed = true;
      }

      // --- phase 3: settle + render ----------------------------------------
      for (let i = 0; i < n; i++) {
        const el = elRefs.current[i];
        if (!el) continue;
        const s = stateRefs.current[i];
        const base = baseRefs.current[i] ?? { x: 0, y: 0 };

        if (s.mode === "free" && Math.hypot(s.vx, s.vy) < SETTLE_SPEED) {
          // Rejoin ambient drift from exactly where it stopped, so there
          // is no visible jump back to the original layout position.
          s.homeDX = s.docX - base.x - s.wanderX;
          s.homeDY = s.docY - base.y - s.drift - s.wanderY;
          s.rotOffset = s.rot - s.ambientRot;
          s.mode = "ambient";
        }

        el.style.transform = `translate(${s.docX - base.x}px, ${s.docY - base.y}px) rotate(${s.rot}deg)`;
      }

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
  }, [beans, size]);

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
    s.downT = s.lastMoveT;
    s.downPageX = e.pageX;
    s.downPageY = e.pageY;
    s.moved = 0;
    s.pointerIsTouch = e.pointerType === "touch";
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
    s.moved = Math.hypot(e.pageX - s.downPageX, e.pageY - s.downPageY);
  };

  const endDrag = (i: number) => (e: React.PointerEvent<HTMLImageElement>) => {
    const el = elRefs.current[i];
    const s = stateRefs.current[i];
    if (!el || !s || s.mode !== "drag") return;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);

    // A tap on a touch screen (no real drag) still sends the bean moving,
    // pushed away from wherever the finger landed on it -- poke the left edge
    // and it heads right. Touch-only, so a desktop click stays inert, and it
    // just seeds a velocity: the existing free-flight physics does the rest.
    if (isNarrowRef.current && s.pointerIsTouch && s.moved < TAP_SLOP && performance.now() - s.downT < TAP_MS) {
      let kx = s.grabDX - s.w / 2;
      let ky = s.grabDY - s.h / 2;
      let mag = Math.hypot(kx, ky);
      if (mag < 4) {
        // Tapped dead centre, so there's no direction to infer -- send it along
        // the way it was already drifting.
        kx = s.vx;
        ky = s.vy;
        mag = Math.hypot(kx, ky);
      }
      if (mag < 1) {
        kx = 0;
        ky = -1;
        mag = 1;
      }
      s.vx = (-kx / mag) * TAP_KICK_SPEED;
      s.vy = (-ky / mag) * TAP_KICK_SPEED;
      s.rotVel = clampSpin(s.vx * 1.2);
      s.mode = "free";
      return;
    }

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
            width: size,
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
