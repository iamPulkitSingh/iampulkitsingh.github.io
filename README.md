# iampulkitsingh.github.io

Live at https://iampulkitsingh.github.io/

Work-profile site for Pulkit Singh, built from his LinkedIn profile and résumé.
Vite + React 19 + Tailwind v4, with the motion and Magic UI pieces of the "Bento Studio" mock (number tickers, animated beams, border beam, shimmer button, marquee).

```bash
npm install
npm run dev     # http://localhost:5190
npm run build   # typecheck + static site in dist/ (relative paths, works from any folder)
```

- **Facts live in `src/profile.ts`** (roles, dates, education, skills, certifications, contact). Durations and "years at EXL" are worked out from the dates, so they stay current.
- `openToWork` in `src/profile.ts` shows or hides the "Open to new roles" badges.
- Sections are in `src/sections/`; copied Magic UI components are in `src/components/magicui/`.

## Deploy

Every push to `main` builds the site and publishes it with GitHub Pages (`.github/workflows/deploy.yml`).
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
