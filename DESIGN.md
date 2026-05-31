# Design

Visual system for the ТМ «Біорост» homepage redesign. Strategy comes from [PRODUCT.md](./PRODUCT.md): **brand** register, regenerative + dependable, mobile-first, AA + older-user comfort. Source of truth for tokens is `src/css/tokens.css`.

## Theme

Light, committed regenerative green. A warm clay-tinted off-white grounds the page; deep living-green carries hero and full-bleed bands; earth-brown grounds; a single scarce yellow drives CTAs. Outdoor-readable contrast over decoration.

Color strategy: **Committed** (one saturated color carries 30–60% of surface). Not Restrained, not Drenched.

## Color (OKLCH, semantic roles)

| Token | Value | Role |
|---|---|---|
| `--bg` | `oklch(0.97 0.012 130)` | Page background, warm clay-tinted off-white |
| `--surface` | `oklch(1 0 0)` | Cards, panels, raised surfaces |
| `--surface-sunk` | `oklch(0.95 0.012 130)` | Insets, wells |
| `--brand` | `oklch(0.52 0.13 150)` | Primary green; carries hero + bands (≈ legacy `#137e39`) |
| `--brand-strong` | `oklch(0.43 0.12 152)` | Hover/pressed green |
| `--brand-ink` | `oklch(0.30 0.07 150)` | Large green-black headings |
| `--on-brand` | `oklch(0.98 0.01 130)` | Text/icons on green surfaces |
| `--ink` | `oklch(0.26 0.02 120)` | Body text — ≥7:1 on `--bg` (outdoor legible) |
| `--muted` | `oklch(0.50 0.02 120)` | Secondary text — still ≥4.5:1 on `--bg` |
| `--soil` | `oklch(0.38 0.04 60)` | Earth-brown grounding accent |
| `--accent` | `oklch(0.80 0.15 85)` | Yellow — CTAs/highlights only, scarce (legacy `--yellow`) |
| `--on-accent` | `oklch(0.26 0.03 80)` | Text on yellow |
| `--line` | `oklch(0.88 0.01 130)` | Hairline borders |

Rules: green carries large surfaces; yellow stays scarce (CTAs, active states); neutrals tint toward the brand hue (130/120), never generic warm. Color is never the sole signal (active filter pairs color with weight/underline). Contrast verified: `--ink`/`--bg` ≈ 9:1, `--muted`/`--bg` ≈ 4.7:1, `--on-brand`/`--brand` ≥ 5:1.

## Typography

- **Display:** `Unbounded` (Kyiv foundry; distinctive, full Cyrillic) — h1/h2, hero. Letter-spacing ≥ -0.02em; `text-wrap: balance`.
- **Body/UI:** `Onest` (humanist, Cyrillic-first; high legibility for older users) — paragraphs, labels, controls.
- **Fallback:** `"Open Sans", system-ui, sans-serif` (currently shipping; safe until fonts are wired in Phase 2).
- *Cyrillic subset coverage to be confirmed against the live Google Fonts CSS when the `<link>` is added (Phase 2).*

Fluid modular scale, ratio ≥ 1.25, `clamp()` for headings (display max ≤ 6rem). Base 1.0625rem (17px) — bumped for older-user comfort. Body line length capped 65–75ch; `text-wrap: pretty` on prose.

## Spacing

8px-based scale: `--space-1` .25rem → `--space-2` .5 → `--space-3` .75 → `--space-4` 1 → `--space-6` 1.5 → `--space-8` 2 → `--space-12` 3 → `--space-16` 4 → `--space-24` 6rem. Section rhythm via fluid `clamp()`; vary tight groupings vs. generous separations.

## Radii & Elevation

Radii: `--radius-sm` 8px, `--radius-md` 14px, `--radius-lg` 24px, `--radius-full` 999px. Shadows are soft and green-tinted, not gray: `--shadow-1`, `--shadow-2`. Avoid glassmorphism (banned).

## Motion

Ease-out only (`--ease-out-quart`, `--ease-out-expo`); no bounce/elastic. Durations `--dur-fast` 160ms, `--dur` 240ms, `--dur-slow` 420ms. Every animation has a `prefers-reduced-motion: reduce` alternative (crossfade/instant). One orchestrated entrance, not fade-on-scroll-everything.

## Z-index scale

`--z-base` 0 → `--z-dropdown` 100 → `--z-sticky` 200 → `--z-backdrop` 300 → `--z-modal` 400 → `--z-toast` 500 → `--z-tooltip` 600. No arbitrary 999/9999.

## Breakpoints (mobile-first)

Base = mobile. `min-width: 480px`, `768px` (tablet/desktop split already used), `1024px`, `1280px` (container max). All component CSS scoped; global only for tokens + reset + `.container`/`.section` primitives.

## Component conventions

- `components/ui/` — `BaseButton`, `BaseBadge`, `SectionHeading`, `TagFilter` primitives.
- `components/product/` — `ProductCard` (front pack + keyboard/tap-revealable spec back), `ProductGallery` (Composition API slider, reduced-motion aware), `ProductCategoryFilter` (mobile-first segmented control, real `<button>`s).
- Vue 3 Composition API for new/refactored components. Scoped styles consuming tokens. Tap targets ≥ 44px.

## Anti-patterns (from PRODUCT.md + skill bans)

No side-stripe borders, no gradient text, no glassmorphism default, no hero-metric template, no per-section uppercase eyebrows, no numbered section markers, no colored-block placeholders where imagery belongs. Not agro-corporate, not AI-SaaS, not marketplace.
