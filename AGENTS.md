# IS KENDA — Repo Guide for Agents

## Stack

React 19 + TypeScript + Vite 8 + Tailwind CSS v4 + TanStack Router. SPA for IS KENDA CONSULTORIA & ACADEMIA (Angola, Portuguese).

## Commands

```sh
npm run dev          # vite --port 3000 --host 0.0.0.0
npm run build        # vite build (public/ -> dist/ verbatim)
npm run preview
npm run lint         # eslint .
npm run lint:fix     # eslint . --fix
npm run typecheck    # tsc --noEmit
npm run format       # prettier --write .
npm run format:check # prettier --check .
npm run test         # vitest run
npm run test:watch   # vitest
npm run clean        # rm -rf dist server.js (Unix; Windows: Remove-Item -Recurse -Force dist,server.js)
```

Run `lint`, `typecheck`, `test` and `format:check` before build/PR. Vitest global setup: no explicit globals import needed (`test`, `expect` available due to `globals: true`).

## Env

Copy `.env.example` → `.env` (`.env*` gitignored, `!.env.example`):

- `GEMINI_API_KEY` — Gemini API
- `APP_URL` — Cloud Run URL for callbacks/self-links
- `VITE_API_BASE_URL` — API origin without `/api` suffix (dev `http://localhost:8000`, prod `https://api.iskenda.ao`; empty → `/api` proxy)

## Quirks

- Path alias `@/*` → project root, not `src/` (`tsconfig.json` + `vite.config.ts`)
- `tsconfig`: `target ES2022`, `jsx react-jsx`, `moduleResolution bundler`, `experimentalDecorators true`, `useDefineForClassFields false`
- `DISABLE_HMR=true` disables HMR + file watch (`vite.config.ts`)
- Tailwind v4: `@import "tailwindcss"` in `src/index.css`, tokens under `@theme`, no `tailwind.config.*`
- Canonical `https://iskenda.ao/` (no `www`); `public/.htaccess`, `og-image.png`, `robots.txt`, `sitemap.xml` → `dist/` root
- Brand colors `src/index.css` `@theme` + `paleta.md`: `#092b55`, `#1a4989`, `#fdb721`, `#de9800`

## Architecture

- `src/main.tsx` → `HelmetProvider` + `AuthProvider` + `SiteDataProvider` + `RouterProvider`
- `src/router.tsx` (TanStack Router): `/` → `App.tsx`, `/login` (redirects if `localStorage.auth_token`), `/admin/*` (guard → `/login` if no token). Root renders `HeadTags` + `Outlet`.
- `App.tsx`: 10 sections (`inicio`, `quem-somos`, `equipa`, `valores`, `servicos`, `academia`, `honorarios`, `clientes`, `galeria`, `contactos`) visibility via `SiteDataContext.sections[key] !== false`
- Data: `src/data.ts` is fallback; live data `GET /api/site-data` (`src/services/api.ts`, base `VITE_API_BASE_URL` or `/api`). Icons are Lucide name strings resolved by `SmartIcon.tsx`. Company `address` canonical is `Cabinda, Angola`.
- `src/index.html` holds static SEO shell (title, OG/Twitter, JSON-LD `ProfessionalService` + `Course` + `FAQPage`); Vite preserves head on build.

## Conventions

- Content Portuguese, data-driven — edit `src/data.ts` for fallback or `api.iskenda.ao` admin (`/admin/site-data`, `/admin/site-sections`) for live.
- `express`/`@google/genai`/`dotenv`/`tsx` in deps for optional server API, but no server source under `src/` yet.
- Skills in `.agents/skills/` — activate relevant skill before domain work; `git-workflow` before any code change.
