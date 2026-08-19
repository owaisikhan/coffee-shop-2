# UI conventions

## Design tokens

Colour, spacing, type and motion all come from custom properties in
`app/_styles/tokens.css`. Use the token, not the literal:

```tsx
// yes
style={{ background: "var(--espresso-900)", padding: "var(--space-4)" }}
// no
style={{ background: "#1b1107", padding: 16 }}
```

Styling is inline `style={{}}`. There is no Tailwind and no CSS-in-JS. Global
rules live in `app/_styles/globals.css`, which is reserved for things inline
styles cannot express: resets, element defaults, `@media` blocks and `:hover`.

## Responsive: prefer fluid values to breakpoints

Most of this site has no breakpoints at all. Two patterns cover it:

**Fluid scalars** — padding, type, gaps:

```tsx
padding: "clamp(56px, 9vw, 104px) clamp(20px, 5vw, 48px)"
fontSize: "clamp(28px, 6vw, 44px)"
```

**Self-collapsing grids** — instead of redefining columns per breakpoint, let
the grid decide:

```tsx
gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))"
```

The inner `min(320px, 100%)` matters: without it the track cannot shrink below
320px and the layout overflows on a narrow screen.

Fixed pixel widths on a component should be a **max**, never a floor:

```tsx
style={{ width: "100%", maxWidth: width }}
```

Add a media query only when the layout genuinely changes rather than scales.
Currently that is: hiding the nav links behind the drawer (≤900px), and the
hero's height and video fit (≤900px).

## Motion

Hand-rolled `requestAnimationFrame`, no animation library. The shared pattern:

1. A scroll/pointer handler writes a **target**.
2. A rAF loop eases a **current** value toward it and writes `transform`.

```ts
current += (target - current) * 0.12;
el.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`;
```

Easing toward the target is what stops it feeling janky — wheel and trackpad
events arrive in uneven bursts, so applying scroll 1:1 visibly stutters.

Only ever animate `transform`, `opacity` and `filter`. Never animate layout
properties.

### Reduced motion

Ambient motion must stop under `prefers-reduced-motion: reduce`:

```ts
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
```

Applies to the beans, the hero scrub, and decorative video. Motion the user
initiates — dragging a bean — may continue.

### Hover

Gate hover affordances so they cannot stick after a tap:

```css
@media (hover: hover) {
  .product-card-hover:hover { transform: translate(14px, 14px); }
}
```

## Media

- Decorative video uses `<AmbientVideo>`: `preload="none"` + a poster, started by
  an IntersectionObserver near the viewport. Never `autoPlay` a heavy clip.
- Every video needs a `poster`, otherwise the section is an empty box until it
  decodes.
- Run `scripts/optimise-video.sh` before committing a video and check the SSIM.
  If the re-encode is not smaller, keep the original.
- Cut transparent PNGs with `scripts/cutout.py`. JPEG cannot hold alpha, so
  "transparent" source art often arrives with a checkerboard baked into pixels.

## Accessibility

- Decorative imagery gets `aria-hidden` and empty `alt`.
- Interactive controls need a real `<button>`/`<a>`, an accessible name, and a
  visible focus state.
- Colour is never the only cue.
