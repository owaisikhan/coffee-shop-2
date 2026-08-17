# Caffeine Design System

Caffeine is a coffee shop. The single source supplied for this system is one full-page web template:

- `uploads/coffee shop template.webp` — a 1440×5669 homepage comp, credited in its own footer to "Tophats Agency", 2023.

No codebase, Figma file, repository or font binaries were provided. Everything here was derived from that comp: colours were sampled pixel-by-pixel, imagery was cropped out of it into `assets/`, and the type is a flagged Google Fonts substitution (see **Fonts** below). Where the comp does not show something — a Menu page, a Sign In screen, a logo mark — this system deliberately leaves a hole rather than inventing one.

## Product context

One product: a marketing homepage for a coffee shop that sells by the cup and by the bag. The page sells atmosphere first (a hero cup with beans mid-splash, latte art, a warm café interior) and range second (Cappuccino, Americano, Espresso, filtered by Black / Espresso / Doppio). It closes on social proof, a newsletter and a contact-heavy footer — a local business page, not an e-commerce catalogue.

## Fonts — SUBSTITUTED, please confirm

The comp's faces were not supplied as files. Nearest matches from Google Fonts are in use:

| Role | In use | Notes |
|---|---|---|
| Display | **Playfair Display 900** | High-contrast serif with ball terminals; matches the comp's headline weight and contrast closely. |
| Body | **Lora 400/700** | Small serif body copy and UI labels. |

**If you have the original font files (or the names), send them and I will swap them in and regenerate the type cards.**

## CONTENT FUNDAMENTALS

- **Title Case Everywhere.** Not just headings — body copy, placeholder text and buttons are all Title Cased: "Experience The Rich And Bold Flavors Of Our Exquisite Coffee Blends, Crafted To Awaken Your Senses And Start Your Day Right". This is the single most recognisable writing rule of the brand. Keep it, including small words ("And", "Of", "The").
- **Voice.** Third person about the coffee, second person about the reader: "Enjoy Better And Better Quality Coffee With Caffeine." No "I". No "we" in the marketing copy; "We" only appears in transactional replies.
- **Headline register.** Short, sensory, declarative: "Discover The Art Of Perfect Coffee", "Coffee Heaven", "Best Selling Item", "What Our Customer Says", "Stay Up To Date On All News And Offers." Grammatical slips in the source ("What Our Customer Says", singular) are part of the voice and are reproduced verbatim.
- **Button labels** are two words, imperative, no punctuation: "Order Now", "Explore More", "View All", "Sign In".
- **Proof is numeric and rounded:** "50+ / Item Of Coffee", "20+ / Order Running", "2k+ / Happy Customer". Labels are uppercase micro type; nothing else on the page is uppercase.
- **Body placeholder.** The source runs lorem ipsum in every body slot. Reproduce it as-is in recreations; write real copy only when asked.
- **No emoji, anywhere.** No exclamation marks. Contact details are written out plainly: "Call Us: (321) 562 - 57420", "Caffeine@Gmail.Com" (note the Title Cased email).
- **Testimonials** are first person, unpolished, and mention the brand by name: "I Have Tested Caffeine Coffee Many Times. Really Amazing To Me."

## VISUAL FOUNDATIONS

**Colour.** Three-band page rhythm, repeated top to bottom: espresso `#1b1107` → cream `#efdfc4` → tan `#ddb288` → cream → tan → espresso. Two background colours per page maximum in play at once. Gold `#e5c132` is reserved exclusively for testimonial stars. No blues, no greys, no gradients of any kind — flat fills only.

**Type.** Playfair Display 900 for every heading and every number; Lora for everything else. Headline sizes 64 / 52 / 44 / 30 / 22; body 17 / 15 / 13; micro labels 11px with 0.08em tracking, uppercase. Body line-height is generous (1.7–1.9) and body measure stays under ~420px, which is why the source's paragraphs look narrow and airy.

**Layout.** 1440px design width, 1180px content container, 48px page gutters, ~104px section padding. The nav bar is inset from all three top edges so it floats as an outlined bar rather than a full-bleed header. Nothing is fixed or sticky. Feature rows alternate photo-left / photo-right; everything else is centred.

**Corners and borders.** Radius 0 on every button, card, input, photo mat and panel. The only round shapes in the whole system are the testimonial portrait and the footer's social circles. Borders are 1px hairlines — cream on espresso, `rgba(27,17,7,.18)` on light.

**Cards.** Two structural motifs do all the work:
1. **Offset block** — a solid espresso rectangle sits 14px up-and-left behind a cream panel (product cards, footer photo). It reads as a shadow but is a hard-edged shape.
2. **Tilt + mat** — photographs sit on a 12px cream mat, rotated about ±4°, with hairline triangle outlines poking out behind them and a soft drop shadow (`0 18px 40px rgba(27,17,7,.28)`).

Panels themselves never carry a shadow; only photographs do.

**Backgrounds.** Flat colour, plus two decorative devices from the comp: an oversized `Caffeine` wordmark watermark at ~5% cream behind the hero, and faint coffee-stain swirls on the cream sections. No repeating patterns, no photographic full-bleeds, no grain overlays.

**Imagery.** Warm, low-key coffee photography — amber and cream highlights against dark browns, shallow depth of field, steam and splash motion. Never cool-toned, never black and white, never flat-lay graphic. Crops are square inside cards and portrait inside mats.

**Transparency and blur.** Almost none. Transparency is used for three things only: the hero watermark (5%), hairline borders on dark (15–20%), and the footer's play-button scrim (55% espresso). No backdrop blur, no frosted glass, no protection gradients — the photography is dark enough that cream type sits directly on it.

**Motion.** Restrained: 200ms colour transitions on `cubic-bezier(.2,.6,.2,1)`, nothing else. No entrance animations, no parallax, no bounce, no scale.
- **Hover:** cream buttons go tan; espresso buttons lighten to `--espresso-700`; the tan order bar deepens to `--tan-400`; links move toward cream; ghost buttons take a 12% cream wash.
- **Press:** darken one more step (`--tan-500`). No shrink, no lift, no ripple.
- **Active state:** a 1px espresso underline under the filter tab. Inactive tabs are espresso at 55%.

## ICONOGRAPHY

The comp contains six glyph kinds and nothing more: right arrow, left arrow, search, play triangle, and the footer's contact/social marks. No icon font, no sprite sheet and no SVG files were supplied, so:

- **UI glyphs** (`arrow-right`, `arrow-left`, `search`, `chevron-down`, `play`, `mail`, `phone`, `map-pin`) ship as the `Icon` component: Lucide-derived paths at 1.75px stroke with **square caps and mitre joins** — matching the comp's sharp hairline arrows. **SUBSTITUTION FLAGGED.**
- **Social marks** (Pinterest, Instagram, X/Twitter, Facebook) are loaded as masked SVGs from the simple-icons CDN (`https://cdn.jsdelivr.net/npm/simple-icons@13/icons/<slug>.svg`) and tinted `--tan-300` inside a tan hairline circle. **SUBSTITUTION FLAGGED** — send the real assets if the brand has them.
- Arrows always trail their label, at 16px next to 15px text.
- **No emoji, and no unicode characters used as icons.** Stars are drawn shapes (`StarRating`), not "★".
- **There is no logo mark.** The comp sets the word "Caffeine" in the display serif — that wordmark is the identity. Nothing was drawn or reconstructed; `Logo` renders type only.

## Index

Root files:
- `styles.css` — the single entry point consumers link (imports only).
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `shape.css`, `motion.css`, `base.css`.
- `guidelines/` — 20 specimen cards (Colors, Type, Spacing, Shape, Motion, Brand).
- `assets/` — imagery cropped from the source comp: `img-hero-cup`, `img-latte-art`, `img-iced-coffee`, `img-cappuccino`, `img-americano`, `img-espresso`, `img-footer-beans`, `img-avatar`.
- `thumbnail.html`, `SKILL.md`, `readme.md`.

### Components

| Group | Components |
|---|---|
| `components/core/` | **Logo**, **Button**, **IconButton**, **Icon** |
| `components/content/` | **SectionHeading**, **StatBlock**, **ProductCard**, **PhotoFrame**, **TestimonialCard**, **StarRating** |
| `components/navigation/` | **NavBar**, **FilterTabs**, **CarouselNav**, **SocialLinks** |
| `components/forms/` | **EmailSignup** |

Every family above has a counterpart in the source comp. **Intentional additions:** `Icon` (a wrapper so the arrow/search/play glyphs are one API rather than pasted paths) and `StarRating` (split out of the testimonial so ratings can be reused).

### UI kits

- `ui_kits/website/` — the Caffeine homepage, recreated section by section and interactive. See its README for what the comp does not cover.

No slide template was supplied, so no sample slides were created.
