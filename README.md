# Growthmak — Web

Modern marketing and communications website built with Next.js.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP
- **Deployment:** Vercel

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Font

Place `ruder_plakat_llregular.woff2` in `public/fonts/` for the brand typeface. Otherwise Verdana is used. Obtain from [Lineto](https://lineto.com/typefaces/ruder-plakat/).

## Scripts

| Command | Description |
|--------|--------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run content:seed` | Generate JSON from CSV (runs before build) |

## Content — CSV as Single Source of Truth

Edit `content/content.csv` in Excel or Google Sheets. Add a row to add an item. No code changes.

**Data flow:** `content/content.csv` → `npm run content:seed` → `content/*.json` → `lib/data/loader` → components

1. Edit `content/content.csv` — add rows for news, work, products, nav links, team, config, etc.
2. Run `npm run content:seed` (or `npm run build` — seed runs first)
3. Build as usual

**CSV types:** `news`, `work`, `product`, `featured_work`, `service`, `client`, `nav_link`, `social_link`, `team_member`, `about_image`, `config`, `parrish_work`

**Config keys** (type: config): `hero_headline_1`, `hero_headline_2`, `hero_tagline`, `cta_heading`, `cta_button`, `cta_href`, `newsletter_heading`, `newsletter_subline`, `newsletter_placeholder`, `about_hero_title`, `about_hero_image`

## Project Structure

```
app/           # Routes, layouts, globals.css
components/    # sections/, ui/, layout/, providers/
content/       # content.csv (source) → *.json (generated)
layouts/       # MainLayout
lib/           # data/loader, utils
public/
```

- **`lib/data/`** — Loader reads `content/*.json`; exposes getters for all UI.
- **`components/sections/`** — Page sections (Hero, About, Services, News, Work, CTA, Footer, etc.).
- **`components/ui/`** — Shared primitives (Button, Container, FilterSelect, NewsletterForm).

## Design System

Tokens in `app/globals.css` (`@theme`). Use semantic classes:

| Token | Usage |
|-------|-------|
| `bg-bg`, `bg-surface` | Backgrounds |
| `text-accent` | Brand green (headlines, CTAs) |
| `text-foreground`, `text-foreground-inverse` | Text on dark/light |
| `font-display`, `font-body` | Typography |
| `Container` | `variant="content"` \| `"narrow"` \| `"wide"` |

## Scalability

1. **New page** → Add route in `app/`, create content getter in `lib/data/loader.ts`, compose sections.
2. **New section** → Add to `components/sections/`, accept data via props.
3. **CMS integration** → Replace loader imports with API calls; types stay the same.

## Performance

- **Code splitting:** Below-fold sections (About, Services, etc.) dynamic-imported.
- **Memoization:** Memo on list components (NewsCard, WorkCard, ServiceCard, Clients).
- **Images:** Next.js `Image` with `sizes`, `priority` for above-fold, `loading="lazy"` for below-fold.
- **GSAP:** `optimizePackageImports` in `next.config.ts` for tree-shaking.
