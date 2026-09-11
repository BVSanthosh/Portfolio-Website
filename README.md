# Portfolio — Venkata Santhosh Basina

Personal site for **Applied AI Engineer** roles. React + TypeScript + Tailwind, built with Vite.

The argument the site makes: *anyone can demo an agent — I build them and measure them.* 

---

## Running it

```bash
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:5173 |
| `npm run build` | Generates the sitemap, typechecks, and builds to `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | oxlint |


---

## Design

A warm paper/ink palette with a single vermillion signal colour, defined once as CSS custom
properties in `src/index.css` under `@theme` and overridden under `[data-theme='dark']`.

Light is the default deliberately — most engineering portfolios are dark, and a carefully typeset
light page stands out in a stack of them. Dark mode is a toggle in the nav, persisted to
`localStorage`, and applied by an inline script in `index.html` before first paint so there is no
flash of the wrong theme.

Type is Instrument Serif for display, Inter for body, JetBrains Mono for metadata.

---

## Accessibility and performance notes

- Every interactive element is reachable by keyboard, with a visible focus ring; there is a skip
  link to `#main`.
- All animation is suppressed under `prefers-reduced-motion`.
- Diagrams carry `<title>` elements describing the architecture in prose for screen readers.
- Wide content (diagrams, the eval table) scrolls inside its own container — the page body never
  scrolls sideways. The eval table becomes a card stack below `md` so the pass rate is never hidden
  behind a horizontal scroll.
