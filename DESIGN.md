# Design

Visual system for the ТМ «Біорост» site. Strategy comes from [PRODUCT.md](./PRODUCT.md): **brand** register, regenerative + dependable, mobile-first, AA + older-user comfort. Source of truth for tokens is `src/css/tokens.css`.

## Theme

Light, **committed clay**. The soil itself is the brand: a warm off-white (faint clay tint, not cream) grounds the page; deep clay/terracotta carries identity, headings and full-bleed bands; living green is the action colour (CTAs, links, growth); harvest amber is a scarce spark (active states, badges, highlights); deep earth-brown grounds the footer and deepest surfaces. Outdoor-readable contrast over decoration.

Color strategy: **Committed** (one saturated colour – clay – carries 30–60% of surface). Not Restrained, not Drenched. Distinct from every green agro competitor.

## Color (OKLCH, semantic roles)

Palette: **Field & Lab** – clay carries the brand, green carries action, amber is the scarce harvest spark, earth-brown grounds.

| Token             | Value                   | Role                                               |
| ----------------- | ----------------------- | -------------------------------------------------- |
| `--bg`            | `oklch(0.985 0.004 60)` | Page background – off-white, faint clay warmth     |
| `--surface`       | `oklch(1 0 0)`          | Cards, panels, raised surfaces                     |
| `--surface-sunk`  | `oklch(0.965 0.006 55)` | Insets, wells, tab tracks                          |
| `--line`          | `oklch(0.9 0.008 55)`   | Hairline borders                                   |
| `--line-strong`   | `oklch(0.82 0.012 55)`  | Input borders, stronger dividers                   |
| `--brand`         | `oklch(0.5 0.115 45)`   | Clay/terracotta – identity, accents                |
| `--brand-strong`  | `oklch(0.42 0.105 42)`  | Body-text-safe clay bands                          |
| `--brand-deep`    | `oklch(0.34 0.085 42)`  | Deepest band stop                                  |
| `--brand-ink`     | `oklch(0.42 0.11 42)`   | Clay headings on light                             |
| `--on-brand`      | `oklch(0.97 0.012 70)`  | Warm white text on clay                            |
| `--brand-wash`    | `oklch(0.95 0.018 50)`  | Tinted fill behind clay content / active nav       |
| `--ink`           | `oklch(0.255 0.018 50)` | Body text – ≈9:1 on `--bg` (outdoor legible)       |
| `--muted`         | `oklch(0.455 0.02 48)`  | Secondary text – ≥4.6:1 on `--bg`                  |
| `--accent`        | `oklch(0.52 0.12 150)`  | Living green – CTAs, links, growth                 |
| `--accent-strong` | `oklch(0.45 0.11 150)`  | Green bg + white text ≈5:1                         |
| `--on-accent`     | `oklch(0.98 0.02 150)`  | Text on green                                      |
| `--accent-wash`   | `oklch(0.95 0.03 150)`  | Tinted green fill / hover                          |
| `--spark`         | `oklch(0.8 0.13 75)`    | Harvest amber – scarce: badges, counts, highlights |
| `--spark-strong`  | `oklch(0.72 0.13 72)`   | Amber hover/pressed                                |
| `--on-spark`      | `oklch(0.3 0.05 60)`    | Text on amber                                      |
| `--soil`          | `oklch(0.3 0.045 45)`   | Deep earth – footer, deepest surfaces              |
| `--soil-2`        | `oklch(0.36 0.05 42)`   | Lighter earth band stop                            |
| `--on-soil`       | `oklch(0.94 0.012 70)`  | Text on earth                                      |

Rules: clay carries identity + large bands; green is the single action colour (CTAs/links); amber stays scarce; earth grounds the chrome. Neutrals tint faintly toward clay (hue ~55), never generic warm/cream. Colour is never the sole signal (active filter/tab pairs colour with a solid fill + weight). Contrast verified: `--ink`/`--bg` ≈ 9:1, `--muted`/`--bg` ≈ 4.6:1, `--on-brand`/`--brand` ≥ 6:1, `--on-accent`/`--accent-strong` ≈ 5:1.

## Typography

- **Display:** `Unbounded` (Kyiv foundry; distinctive, full Cyrillic) – h1/h2, hero, card titles. Letter-spacing -0.02em to -0.03em; `text-wrap: balance`.
- **Body/UI:** `Onest` (humanist, Cyrillic-first; high legibility for older users) – paragraphs, labels, controls.
- **Fallback:** `system-ui, sans-serif`. Both families wired via Google Fonts.

Fluid modular scale, ratio ≥ 1.25, `clamp()` for headings (`--text-display` max 5rem). Base `--text-base` 1.0625rem (17px) – bumped for older-user comfort. Body line length capped 65–75ch; `text-wrap: pretty` on prose.

## Spacing

8px-based scale: `--space-1` .25rem → `2` .5 → `3` .75 → `4` 1 → `5` 1.25 → `6` 1.5 → `8` 2 → `12` 3 → `16` 4 → `24` 6rem. Section rhythm via fluid `clamp()`; vary tight groupings vs. generous separations.

## Radii & Elevation

Radii: `--radius-sm` 8px, `--radius-md` 14px, `--radius-lg` 24px, `--radius-xl` 36px, `--radius-full` 999px. Shadows are soft and warm clay-tinted, not gray: `--shadow-1` → `--shadow-3`. No glassmorphism (banned).

## Motion

Ease-out only (`--ease-out-quart`, `--ease-out-expo`); no bounce/elastic. Durations `--dur-fast` 160ms, `--dur` 240ms, `--dur-slow` 420ms. Route changes use a fade `<transition>`. Every animation has a `prefers-reduced-motion: reduce` alternative (crossfade/instant).

## Z-index scale

`--z-base` 0 → `--z-dropdown` 100 → `--z-sticky` 200 → `--z-backdrop` 300 → `--z-modal` 400 → `--z-toast` 500 → `--z-tooltip` 600. No arbitrary 999/9999.

## Architecture (multi-page SPA)

Vue Router 4 (`createWebHistory`, lazy routes, hash/scroll behaviour). Six routes prerendered at build (`@prerenderer/rollup-plugin` + puppeteer, `renderAfterTime: 5000`): `/`, `/products`, `/maps`, `/about`, `/news`, `/contacts`. Per-route SEO via `usePageSeo()`; site-wide chrome + JSON-LD via `useSiteHead()` (`src/js/seo.js`, `@unhead/vue` v2 – pinned for Vite 5).

- `src/pages/` – one component per route (`HomePage`, `ProductsPage`, `MapsPage`, `AboutPage`, `NewsPage`, `ContactPage`).
- `src/components/` – chrome (`Navbar`, `FooterComponent`, `Layout`), shared (`SearchComponent`, `InjTableComponent`, modals), `product/` gallery + filter + card.
- `src/css/` – `tokens.css` (source of truth), `base.css` (root + legacy var bridge), `style.css` (imports + `.container`/`.section`/`.title`/`.lead`/`.btn` primitives).

## Component conventions

- Clay carries the commercial core: `/products` puts the category filter + gallery on a clay→deep-clay band; white cards pop against it.
- Maps: segmented crop switcher (real `<button>`s, ≥44px) + `InjTableComponent` (rowspan table desktop, tap-expandable rows mobile).
- About: shared accordion pattern for philosophy + vacancies; team cards; certificate band on earth ground + modal.
- Contact: token-styled form (emailjs), inline validation, toast, Google map iframe; `applyForJob` event bridges About vacancies → contact form.
- Scoped styles consuming tokens. Tap targets ≥ 44px. `lang="uk"`.

## Anti-patterns (from PRODUCT.md + skill bans)

No side-stripe borders, no gradient text, no glassmorphism default, no hero-metric template, no per-section uppercase eyebrows, no numbered section markers, no cream/sand body bg, no identical icon-heading-text card grids, no colored-block placeholders where imagery belongs. Not agro-corporate, not AI-SaaS, not marketplace.
