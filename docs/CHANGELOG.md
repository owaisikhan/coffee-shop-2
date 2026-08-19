# Changelog

Newest first. Dates are when the work landed on `main`.

## Unreleased

### Added
- Every control on the page now does something. "Order Now" (hero and each
  product card) opens a pickup-order dialog with size, quantity and a validated
  name, and confirms with a summary; the card variant preselects its own drink.
  The nav search searches the menu. "View Farm List" opens the nine farms with
  origin, varietal and what was paid. "Explore Menu" and "Explore More" scroll
  to their sections. The testimonial arrows cycle three quotes. The newsletter
  validates the address, reports errors, and shows a success state.
- Menu, featured drinks, farms and testimonials moved into `app/_lib/`, so the
  price list, the cards and search all read one source instead of three copies.
- Full metadata: `metadataBase`, Open Graph, Twitter card, canonical, keywords,
  robots and `themeColor`, plus a generated `app/opengraph-image.png`. Links to
  the site previewed as bare text before.
- `next/image` for the product shots, story photo and avatar. The beans stay raw
  `<img>` on purpose — they are transform-driven and already tiny.

### Changed
- Reorganised into `app/_components/{ui,site}` and `app/_styles`, following the
  App Router private-folder convention. Added `docs/`, `scripts/`, `CLAUDE.md`,
  and a file-based `app/icon.png` favicon.

## 2026-08-19

### Performance
- `public/` cut from 39MB to 23MB. Two clips were encoded at wildly
  disproportionate bitrates — the sourcing video at 26.5 Mbps (16MB for five
  seconds) and VideoBand at 6.5 Mbps. Both re-encoded at CRF 20 with no change
  in resolution: 16MB → 5.7MB and 4.0MB → 1.5MB, at SSIM 0.982 and 0.990.
  The other seven videos were deliberately left untouched — they were already
  efficiently encoded and re-encoding made them larger.
- Removed `bean5.png`, 3.5MB of unreferenced source art that was still shipping.
- Section videos moved to `<AmbientVideo>`: `preload="none"` plus a poster,
  started by an IntersectionObserver instead of autoplaying. Visitors who never
  scroll that far no longer download ~7MB of video.

### Accessibility
- `prefers-reduced-motion` previously only disabled smooth scrolling. Beans now
  render static, the hero holds a still frame, and ambient video stays on its
  poster. Dragging still works — that motion is user-initiated.

## Coffee beans

- Tap a bean on a touch screen to send it moving, pushed away from where the
  finger landed. Desktop clicks stay inert.
- Bean-on-bean collisions: equal-mass impulses with restitution and spin. A bean
  held under the pointer is immovable, so dragging one ploughs through the rest.
- Beans are draggable, and fly with the flick's momentum on release, bouncing
  off the viewport walls until they slow and rejoin the ambient drift.
- Counts settled at 15 on desktop, 6 on mobile, at a uniform size.

## Layout and responsiveness

- Mobile had 353px of horizontal overflow at 390px wide. Fixed with fluid
  `clamp()` values and self-collapsing grids rather than breakpoints; verified
  0px overflow at 390 / 768 / 1400.
- Burger button opens a right-hand drawer capped at `min(78vw, 300px)`. Closes
  on backdrop tap, Escape, or picking a link.
- The hero forks at 900px: desktop scrubs the video across a 200vh pinned
  wrapper, mobile is one screen with the video looping — scrolling two screens
  before the page starts was tedious on a phone.

## Initial build

- Implemented the Roaster design from the Claude Design handoff in `project/`:
  hero, story, stats, best sellers, video band, menu, sourcing, testimonial,
  newsletter, footer.
- Product cards play a looping video in place of a static image, paused when
  scrolled out of view.
