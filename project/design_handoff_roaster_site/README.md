# Handoff: Roaster — Coffee Shop Marketing Site

## Overview
A single-page marketing homepage for "Roaster", a coffee shop / roastery. The page opens on a
full-viewport video hero that zooms out into a framed block as the user scrolls, then moves through
story, proof stats, best-selling drinks (filterable), a full-bleed video band, a menu price list,
a sourcing feature with a second video, a testimonial, a newsletter signup, and a contact-heavy footer.

Built on the **Caffeine Design System** (coffee-shop brand: espresso / cream / tan palette,
Playfair Display + Lora, zero border radius, Title Case copy everywhere).

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing the
intended look and behavior. They are **not production code to copy directly**.

The task is to **recreate these designs in the target codebase's existing environment** (Next.js,
React, Vue, Astro, SwiftUI, etc.) using its established patterns, component library, and styling
approach. If no codebase exists yet, pick the most appropriate framework — for this design, a
Next.js or Astro static site is the natural fit, since the page is content-driven with one piece of
scroll-linked interactivity — and implement the design there.

`Roaster Site.dc.html` is authored in a proprietary component format and will not run outside its
host. Read it as a spec: the markup structure, inline styles, and the logic class at the bottom of
the file are the source of truth for layout, values, and scroll math. `support.js` is host runtime —
ignore it entirely.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and the scroll interaction are final. Recreate
pixel-accurately. All numeric values below are exact and taken from the prototype.

Design width 1440px, content container 1180px, page gutters 48px, section padding 104px vertical.
No responsive breakpoints were designed — see *Responsive behavior* for guidance.

---

## Screens / Views

There is one page. Sections in document order:

### 1. Hero (scroll-linked video)

**Purpose:** Set atmosphere and get the user to scroll. The single piece of real interactivity.

**Structure:**
- Outer wrapper: `height: 200vh`, `background: --espresso-900`. The extra 100vh is the scroll
  runway for the zoom-out.
- Inner: `position: sticky; top: 0; height: 100vh; overflow: hidden`.
- Video frame (the animated element): `position: absolute; inset: 0; display: flex;`
  `transform-origin: 50% 42%`. Contains the video plus a scrim.
- Video: `position: absolute; top: 50%; left: 50%; width: 104%; height: 104%;`
  `transform: translate(-50%, -52%); object-fit: cover`. The 104% / -52% overscan crops the
  source video's watermark out of frame. `autoplay muted loop playsinline`.
- Scrim over video: `linear-gradient(180deg, rgba(27,17,7,.72) 0%, rgba(27,17,7,.34) 46%, rgba(27,17,7,.78) 100%)`.
- Content overlay: `position: absolute; inset: 0`, flex column, `padding: 24px 48px 48px`,
  `pointer-events: none` (children that need clicks re-enable it).

**Nav bar** (inside the hero overlay, not fixed/sticky — the design system forbids sticky nav):
- `height: 64px`, `padding: 0 24px 0 32px`, `border: 1px solid var(--border-on-dark)`,
  `background: rgba(27,17,7,.55)`, `pointer-events: auto`, radius 0.
- Wordmark "Roaster": Playfair Display 900, 22px, line-height 1.1, letter-spacing -0.01em, `--cream-100`.
- Links (Home, Menu, About Us, Sourcing, Visit): Lora 13px, `gap: 32px`, `margin: 0 auto` to center.
  Active link `--cream-050` at full opacity; the rest `--cream-200` at `opacity: .72`.
- Right cluster: "Sign In" text link (13px, `--cream-050`) + a 34px search IconButton, `gap: 16px`.

**Hero copy block** (centered, `gap: 24px`, this is the element that fades on scroll):
- Eyebrow: "Roasted Daily On Elm Street" — 11px, letter-spacing 0.08em, uppercase, `--tan-300`.
- H1: "Coffee Worth / Slowing Down For" (explicit `<br>`) — Playfair Display 900, 64px,
  line-height 1.18, `--cream-100`, `max-width: 900px`.
- Body: "Small Batches, Named Farms, And A Bar Where Someone Still Pulls Every Shot By Hand." —
  17px, line-height 1.75, `--cream-200`, `max-width: 420px`.
- Buttons, `gap: 16px`, `margin-top: 8px`, `pointer-events: auto`: "Order Now" (primary),
  "Explore Menu" (ghost).

**Hero footer row** (space-between, bottom-aligned): "Scroll" and "Open 7 — 6 Daily", both 11px /
0.08em / uppercase / `--cream-200` at `opacity: .7`.

### 2. Story ("A Roastery With A Counter Attached")
- `background: --cream-100`, padding `104px 48px`.
- Grid `420px 1fr`, `gap: 96px`, `align-items: center`.
- Left: a photo in a tilted cream mat — `assets/img-latte-art.png`, 380×460, tilt `-4deg`,
  12px cream mat, `box-shadow: 0 18px 40px rgba(27,17,7,.28)`.
- Right: eyebrow "Our Story" (11px/0.08em/uppercase, `--text-muted`), H2 44px Playfair 900
  line-height 1.2 with an explicit `<br>`, two 15px/1.7 paragraphs at `max-width: 420px`,
  then an outline "Explore More" button. Column `gap: 24px`, left-aligned.

### 3. Stats band
- `background: --tan-300`, padding `72px 48px`.
- 4-column grid, `gap: 48px`. Values are Playfair 900; labels are 11px/0.08em/uppercase.
- Content: `50+ / Item Of Coffee`, `20+ / Order Running`, `2k+ / Happy Customer`, `9 / Farm Partners`.
  (The first three come verbatim from the design system's source comp.)

### 4. Best Selling Item (filterable grid)
- `background: --cream-100`, padding `104px 48px`. Centered flex column, `gap: 48px`.
- Section heading: title "Best Selling Item", body "Four Drinks Account For Most Of What Leaves The
  Bar Before Ten In The Morning."
- Filter tabs: `All / Black / Espresso / Doppio`. Active tab gets a 1px espresso underline;
  inactive tabs are espresso at 55% opacity.
- Product grid: wrapping flex, `gap: 56px`, `padding: 14px 0 0 14px` (leaves room for the
  offset-block shadow to sit up-and-left). Cards are 300px wide, using the
  **offset block** motif — solid espresso rectangle 14px up-and-left behind a cream panel, square
  image crop, radius 0.
- Data (name, image, category):
  - Cappuccino — img-cappuccino.png — Espresso
  - Americano — img-americano.png — Black
  - Espresso — img-espresso.png — Doppio
  - Iced Latte — img-iced-coffee.png — Espresso
  - Batch Brew — img-hero-cup.png — Black
  - Latte — img-latte-art.png — Espresso
- `All` shows everything; other tabs filter on exact category match.

### 5. Video band ("Roasted Thursday, Rested Until Monday")
- `height: 78vh`, `overflow: hidden`, `background: --espresso-900`.
- Video full-bleed with the same 104% / `translate(-50%,-52%)` overscan; flat scrim
  `rgba(27,17,7,.5)`.
- Centered: H2 52px Playfair 900 / 1.2 / `--cream-100` / `max-width: 760px` with an explicit
  `<br>`, and a 17px/1.75 `--cream-200` paragraph at `max-width: 420px`.

### 6. The Menu (price list)
- `background: --cream-100`, padding `104px 48px`. Column `gap: 56px`.
- Section heading: "The Menu" + "Espresso And Filter, Priced For A Cup You Drink Standing Up Or Sitting Down."
- Two-column grid, `gap: 64px 96px`. Each column: an 11px/0.08em/uppercase eyebrow, then rows at
  `gap: 24px`.
- Row: space-between, `gap: 24px`, `border-bottom: 1px solid var(--border-hairline)`,
  `padding-bottom: 16px` — **except the last row in each column, which has no border or padding**.
  Item name is Playfair 700 17px `--text-heading`; price is Lora 15px `--text-body`.
- Column 1 — "Espresso Bar": Espresso 3.00 · Doppio 3.60 · Cappuccino 4.20 · Flat White 4.40 · Iced Latte 4.80
- Column 2 — "Filter And Beans": Batch Brew 3.40 · Pour Over, Single Origin 5.20 · Cold Brew, On Tap 4.60 · Beans, 250g Bag 16.00 · Beans, 1kg Bag 54.00

### 7. Sourcing ("Bought By The Sack, Not By The Container")
- `background: --tan-300`, padding `104px 48px`. Grid `1fr 1fr`, `gap: 96px`, centered.
- Left: eyebrow "Sourcing" (`--espresso-700`), H2 44px Playfair 900 with `<br>`, two 15px/1.7
  paragraphs in `--espresso-700` at `max-width: 420px`, dark "View Farm List" button.
- Right: the **offset block** motif applied to video — an `--espresso-900` rectangle absolutely
  positioned at `left/top: -14px; right/bottom: 14px`, with a `--cream-100` panel at
  `padding: 12px` on top of it holding a video at `height: 460px; object-fit: cover`.

### 8. Testimonial
- `background: --espresso-900`, padding `104px 48px`. Centered column, `gap: 56px`.
- Light-tone section heading "What Our Customer Says" (singular — verbatim from the design system's voice).
- One testimonial card, 700px wide, 5 stars (gold `#e5c132`, drawn shapes not unicode), round avatar
  `assets/img-avatar.png`, quote: "I Have Been Coming In Since The Bike Shop Days. The Batch Brew
  Is Still The Best Three Pounds I Spend All Week." — Marta Reyes.
- Carousel prev/next nav below it (decorative in the prototype; wire it up if you add more quotes).

### 9. Newsletter
- `background: --cream-100`, padding `104px 48px`. Centered, `gap: 32px`.
- H2 44px Playfair 900 / 1.2, `max-width: 620px`: "Stay Up To Date On All News And Offers".
- Body 15px/1.7 `max-width: 420px`: "One Note A Month: What We Are Roasting, What Is Nearly Gone,
  And When The Next Cupping Is Open."
- Email signup, 420px wide: square input + arrow icon button.

### 10. Footer
- `background: --espresso-900`, padding `96px 48px 48px`. Column `gap: 64px`.
- Grid `1.2fr 1fr 1fr 1fr`, `gap: 48px`:
  1. Wordmark "Roaster" (Playfair 900, 30px, line-height 1.1, -0.01em), body "Enjoy Better And
     Better Quality Coffee With Roaster." (15px/1.7, `--cream-200`, `max-width: 300px`),
     28px social links (tan hairline circles, tinted `--tan-300`).
  2. "Visit" — 12 Elm Street · Open 7 — 6 Daily · Cupping Saturdays, 10am
  3. "Contact" — Call Us: (321) 562 - 57420 · Roaster@Gmail.Com · Wholesale Enquiries (link)
  4. "Menu" — Espresso Bar · Filter And Beans · Sourcing (links)
- Column headers are 11px/0.08em/uppercase `--tan-300`; items 15px `--cream-200`, `gap: 16px`.
- Bottom bar: `border-top: 1px solid rgba(239,223,196,.18)`, `padding-top: 24px`, space-between,
  "Roaster, 2026" / "All Rights Reserved" — 11px/0.08em/uppercase, `--cream-200` at `opacity: .6`.

---

## Interactions & Behavior

### Hero scroll zoom-out — the one non-trivial interaction

A passive `scroll` listener (plus `resize`) computes a 0→1 progress value and writes three
transforms directly to DOM nodes. **Do not** re-render a component tree per scroll event.

```js
const span = wrapper.offsetHeight - window.innerHeight;      // = 100vh of runway
const p = clamp(-wrapper.getBoundingClientRect().top / span, 0, 1);

const end = heroFinalScale;                                   // default 0.72
const s   = 1 - (1 - end) * p;

frame.style.transform  = \`scale(\${s})\`;
frame.style.padding    = \`\${18 * p}px\`;
frame.style.background = p > 0.02 ? 'var(--cream-100)' : 'transparent';

copy.style.opacity   = String(Math.max(0, 1 - p * 1.9));      // fully gone at p ≈ 0.53
copy.style.transform = \`translateY(\${-56 * p}px)\`;

scrim.style.opacity  = String(1 - 0.55 * p);                  // video brightens as it shrinks
```

Net effect: the full-bleed video scales down to `heroFinalScale` about its `50% 42%` origin,
gaining an 18px cream mat so it lands as a framed block; the headline fades and lifts 56px; the
dark scrim lightens. No easing curve is applied — progress is linear in scroll position, which is
what makes it feel directly scrubbed rather than animated.

`heroFinalScale` is a tunable, range 0.5–1.0, step 0.02, **default 0.72**. Expose it as a prop or
CSS variable. (The design reviewer was last previewing 0.56 — a more dramatic shrink — but did not
commit it; ship 0.72 unless told otherwise.)

Call the handler once on mount so a mid-page reload paints the correct state.

### Other behavior
- **Filter tabs** — local state, default `All`, exact-match category filter. Instant, no animation.
- **Nav / footer links** — same-page anchors: `#story`, `#menu`, `#sourcing`, `#visit`.
- **Videos** — `autoplay muted loop playsinline`; call `.play()` on mount and swallow the rejection
  for browsers that block it. Never add controls or sound.
- **Hover** (200ms, `cubic-bezier(.2,.6,.2,1)`, color only): cream buttons → tan; espresso buttons
  lighten to `--espresso-700`; links move toward cream; ghost buttons take a 12% cream wash.
- **Press:** darken one more step (`--tan-500`). No shrink, no lift, no ripple.
- **No entrance animations, no parallax, no bounce** anywhere else — the design system explicitly
  forbids them. The hero zoom is the deliberate single exception.
- **Reduced motion:** honor `prefers-reduced-motion` by skipping the scroll transform (render the
  hero at final scale) and pausing the videos on a poster frame.

### Responsive behavior
Not designed — the prototype is desktop-only at 1440px. When implementing, at minimum: collapse the
two-column grids to one, drop the H1 to ~40px and section H2s to ~32px, reduce gutters to 24px and
section padding to ~64px, and replace the nav link row with a menu button. Keep the hero at
`100vh` / 200vh runway; the scroll math is resolution-independent. Confirm mobile layout with the
designer rather than guessing.

## State Management
Trivial — all local, no data fetching:
- `filter: string` — active product filter, default `'All'`.
- `heroFinalScale: number` — configuration, default `0.72`.
- Scroll progress is **not** state. It is written straight to element styles via refs.
- Newsletter email input is uncontrolled in the prototype; wire it to whatever list service the
  real site uses and add a success/error state (not designed — ask the designer).

## Design Tokens

Load the design system's own token files rather than retyping these; the values are listed so the
README stands alone.

**Colors**
| Token | Value | Use |
|---|---|---|
| `--espresso-900` | `#1b1107` | Darkest sections, offset blocks, page base |
| `--espresso-800` | — | Video container fallback |
| `--espresso-700` | — | Body copy on tan; espresso button hover |
| `--cream-050` / `--cream-100` / `--cream-200` | `--cream-100 = #efdfc4` | Type on dark, cream sections, photo mats |
| `--tan-300` | `#ddb288` | Stats band, sourcing band, eyebrows on dark, social tint |
| `--tan-400` / `--tan-500` | — | Hover / press steps |
| `--gold` | `#e5c132` | Testimonial stars **only** |
| `--text-heading`, `--text-body`, `--text-muted`, `--text-link`, `--text-link-hover` | — | Semantic type colors |
| `--border-hairline` | `rgba(27,17,7,.18)` | Hairlines on light |
| `--border-on-dark` | — | Hairlines on dark |

Custom alphas used in this design: nav `rgba(27,17,7,.55)`; hero scrim stops `.72 / .34 / .78`;
band scrim `rgba(27,17,7,.5)`; footer rule `rgba(239,223,196,.18)`.
No blues, no greys, **no gradients other than the hero scrim** — flat fills only.

**Typography** — Playfair Display 900 (display, all headings and all numbers), Lora 400/700 (body, UI).
Heading scale 64 / 52 / 44 / 30 / 22. Body 17 / 15 / 13. Micro labels 11px, letter-spacing 0.08em,
uppercase — the only uppercase on the page. Body line-height 1.7–1.9, measure capped ~420px.

**Spacing** — 4px base: 4 / 8 / 16 / 24 / 32 / 48 / 56 / 64 / 96 / 104. Container 1180px, gutters 48px.

**Shape** — `border-radius: 0` on every button, card, input, mat, and panel. The only round shapes
in the system are the testimonial avatar and the footer social circles. Borders are 1px hairlines.

**Shadow** — photographs only: `0 18px 40px rgba(27,17,7,.28)`. Panels and cards never carry a
shadow; their depth comes from the hard-edged offset block.

**Motion** — 200ms, `cubic-bezier(.2,.6,.2,1)`, color transitions only.

## Assets

**Images** (in `assets/`) — all cropped from the Caffeine design system's source comp:
`img-latte-art.png` (story photo + Latte card), `img-cappuccino.png`, `img-americano.png`,
`img-espresso.png`, `img-iced-coffee.png`, `img-hero-cup.png` (Batch Brew card),
`img-avatar.png` (testimonial portrait), `img-footer-beans.png` (available, unused).

**Videos** (in `uploads/`) — supplied by the client, vertical/portrait, ~5s each, silent, and each
carries a **KlingAI watermark bottom-right** which the 104% overscan crops out. Preserve that crop.
| File | Placement |
|---|---|
| `kling_20251029_Image_to_Video_The_coffee_5026_0.mp4` | Hero |
| `kling_20260331_Image_to_Video_Cinematic__4482_0.mp4` | Mid-page full-bleed band |
| `kling_20251120_Image_to_Video_Fresh_coff_923_0.mp4` | Sourcing offset block |

Production notes: these are portrait sources filling landscape frames, so they are heavily cropped —
re-encode to web-friendly MP4 + WebM, add a poster frame per video, and consider commissioning
landscape footage. Total weight should be checked before launch.

**Fonts** — Playfair Display and Lora from Google Fonts. Note: the design system flags these as
*substitutions* for the original comp's unidentified faces. If the client has the real font files,
swap them in.

**Icons** — Lucide-derived paths at 1.75px stroke with **square caps and mitre joins**
(arrow-right, arrow-left, search, chevron-down, play, mail, phone, map-pin). Social marks are masked
SVGs from `https://cdn.jsdelivr.net/npm/simple-icons@13/icons/<slug>.svg`, tinted `--tan-300`.
Both are flagged substitutions. **No emoji, no unicode characters as icons** — stars are drawn shapes.

## Content Rules — do not normalize these

The brand writes in **Title Case everywhere**: headings, body copy, buttons, placeholders, even the
email address ("Roaster@Gmail.Com"). Small words are capitalized too ("And", "Of", "The"). No emoji.
No exclamation marks. "What Our Customer Says" is singular on purpose — it is verbatim brand voice.
Button labels are two words, imperative, unpunctuated. A well-meaning copy pass that "fixes" the
capitalization will break the brand; leave the strings exactly as written.

## Files

| File | What it is |
|---|---|
| `Roaster Site.dc.html` | The design. Read the markup for structure and inline style values; the logic class at the bottom holds the scroll math and product data. Proprietary format — spec, not runnable source. |
| `assets/` | Images used by the design. Copy into the target project. |
| `uploads/` | The three client videos. |
| `_ds/caffeine-design-system-.../` | Design system tokens and bundle: `tokens/*.css` (colors, typography, spacing, shape, motion, fonts, base), `styles.css` entry point. Port the token CSS; the JS bundle is host-specific. |

Not included: `support.js` (host runtime) and `frames/` (scratch video stills) — neither is part of
the design.

## Suggested build order
1. Port the token CSS and load the two fonts. Verify a swatch and type ramp against this README.
2. Build the primitives the page repeats: Button (primary / ghost / outline / dark), IconButton,
   Icon, SectionHeading, StatBlock, offset-block Card, tilt+mat PhotoFrame, StarRating,
   TestimonialCard, FilterTabs, SocialLinks, EmailSignup.
3. Lay out sections 2–10 statically at 1440px. They are plain content; get them exact first.
4. Build the hero last, and build it in two steps: the sticky 200vh shell, then the scroll handler.
   This is the only part with a real chance of going wrong.
5. Encode and poster the videos, confirm the watermark is cropped on every one, then check total
   page weight.
