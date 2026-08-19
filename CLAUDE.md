# Roaster — working notes

Marketing site for a fictional coffee roastery. Next.js 15 App Router,
TypeScript, React 19. No database, no API routes, no auth — it is a single
static page that prerenders.

## Layout

```
app/
  _components/ui/     design-system primitives (Button, Icon, Dialog, …)
  _components/site/   page sections + the dialogs they own
  _lib/               shared data (menu, farms, testimonials)
  _styles/            globals.css + tokens.css
  icon.png            file-based favicon (Next generates the <link> tags)
  layout.tsx page.tsx
docs/                 CHANGELOG, UI conventions
scripts/              asset tooling (image cutouts, video re-encoding)
public/assets/        images served to the browser
public/uploads/       videos served to the browser
project/              original Claude Design handoff + video masters (NOT served)
```

`_components` and `_styles` use the leading underscore so the App Router treats
them as private and never routes to them.

`project/` is ~38MB and holds the untouched originals of every video. Nothing
imports from it; it is the source of truth to re-derive optimised assets from.
Don't serve anything out of it.

## Conventions

- **Styling is inline `style={{}}` plus CSS custom properties** from
  `_styles/tokens.css`. There is no Tailwind and no CSS-in-JS. Reach for a token
  (`var(--espresso-900)`, `var(--space-4)`) rather than a literal.
- **Responsiveness comes from fluid values, not breakpoints.** `clamp()` for
  padding/type, and `repeat(auto-fit, minmax(min(Npx, 100%), 1fr))` for grids so
  they collapse on their own. Media queries exist only where layout genuinely
  has to change (the nav drawer, the hero height) — see `docs/UI_CONVENTIONS.md`.
- **Animation is hand-rolled rAF**, no animation library. The pattern throughout
  is: read a target from scroll, ease a current value toward it each frame, then
  write `transform`. Never animate layout properties.
- **Honour `prefers-reduced-motion`.** Ambient motion (beans, hero scrub,
  decorative video) must stop for those users. User-initiated motion — dragging
  a bean — is fine to keep.

## Gotchas

- **The headless browser here cannot decode H.264.** Videos render blank in
  screenshots; that is the environment, not a bug. Verify video *behaviour* via
  the DOM (`paused`, `currentSrc`, network requests) rather than pixels.
- **Hero behaviour forks at 900px.** Desktop scrubs the video frame-by-frame
  across a 200vh pinned wrapper; mobile is one screen with the video looping.
  The branch is chosen at mount from `matchMedia`, deliberately *not* in the
  markup, so SSR and client render the same HTML.
- **Beans intercept pointer events** so they can be dragged. A bean sitting over
  a button will swallow that click.
- **Two `OrderDialog`s are mounted** (Hero and BestSellers). Field ids come from
  `useId()` for that reason — do not hard-code them back.
- Media is the dominant cost. Before adding a video, run
  `scripts/optimise-video.sh` and check the reported SSIM.

## Commands

```
npm run dev
npm run build      # also runs lint + typecheck
npx tsc --noEmit -p .
```
