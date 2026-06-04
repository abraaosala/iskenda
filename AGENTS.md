# IS KENDA — Repo Guide for Agents

## What this is

React 19 + TypeScript SPA (Vite 6, Tailwind CSS v4) for "IS KENDA CONSULTORIA & ACADEMIA", a consulting and training firm in Angola. Built for Google AI Studio deployment with server-side Gemini API support.

## Developer commands

```sh
npm run dev       # vite dev server on port 3000, bound 0.0.0.0
npm run build     # vite build
npm run preview   # vite preview
npm run lint      # tsc --noEmit (no ESLint, no Prettier)
npm run clean     # rm -rf dist server.js
```

`npm run lint` is the only static check — run it before any build or PR.

## Env setup

Copy `.env.example` to `.env.local`. Two vars:
- `GEMINI_API_KEY` — required for Gemini AI API calls
- `APP_URL` — where the app is hosted (for OAuth callbacks, self-links)

AI Studio injects these at runtime from user secrets. `.env*` is gitignored (except `.env.example`).

## Key config quirks

- **Path alias**: `@/*` → project root (not `src/`). Configured in `tsconfig.json` and `vite.config.ts`.
- **HMR disable**: Set `DISABLE_HMR=true` to disable HMR + file watching (AI Studio workflow; saves CPU during agent edits). See `vite.config.ts`.
- **tsconfig**: `target: ES2022`, `jsx: react-jsx`, `moduleResolution: bundler`, `experimentalDecorators: true`, `useDefineForClassFields: false`.
- **Tailwind v4**: Imported via `@import "tailwindcss"` in CSS (no `tailwind.config.*`). Custom theme tokens under `@theme` in `src/index.css`.
- **Custom scrollbar**: Styled via `::-webkit-scrollbar` pseudo-elements in CSS.
- No React Router — sections are full-page divs with `id` anchors + scroll-based active section detection.

## App structure

```
src/
  main.tsx            — entrypoint, mounts <App />
  App.tsx             — scroll-based section orchestrator (8 sections)
  components/         — 11 components (Navbar, Hero, About, Values, Services, Pricing, Academy, Clients, Contact, Footer, SmartIcon)
  data.ts             — all static content (services, clients, courses, values, company info)
  types.ts            — TypeScript interfaces (Service, Client, Course, AcademyOffer, CompanyValue)
  index.css           — Tailwind v4 imports, custom theme, fonts, animations, scrollbar
  assets/images/      — static images (hero_workspace_...png)
```

All content is in Portuguese. Data-driven — edit `src/data.ts` to change text, icons use Lucide React icon names as strings (resolved by `SmartIcon.tsx`).

## Server-side Gemini API

The `metadata.json` declares `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`. `express`, `@google/genai`, `dotenv`, and `tsx` are in dependencies for a server-side API endpoint, but no server source exists under `src/` yet. If adding an API route, use express + `@google/genai`, load env with dotenv, and run with `tsx`.

## Testing

No test framework is configured. No test files exist.

## Clean script note

`npm run clean` uses `rm -rf` (Unix). On Windows in PowerShell, use `Remove-Item -Recurse -Force dist, server.js` instead.
