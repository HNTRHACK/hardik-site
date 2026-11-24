# hardik-site

Personal site of Hardik Bhatia, Full-Stack & AI Developer in Mumbai.
Astro (static), TypeScript strict, plain CSS. About 2 KB of JavaScript on the home page.

```sh
npm install
npm run dev        # http://localhost:4321
npm run check      # type check
npm run build      # fetches GitHub stats, then builds to dist/
npm run preview
```

## Where things live

| What | File |
| --- | --- |
| Home page copy, experience, wins, "also built", off-the-clock cards | `src/data/site.ts` |
| Project pages | `src/data/projects.ts` |
| Screenshots | `src/assets/work/<slug>/` |
| Colours, type, layout | `src/styles/global.css` |
| GitHub heatmap data (refreshed on every build) | `src/data/github.json`, `scripts/fetch-github.mjs` |
| Open Graph images | `src/pages/og/[slug].png.ts` |
| Headers and caching | `vercel.json` |

## Optional extras

- **Portrait:** add `src/assets/me/portrait.jpg` (4:5 works best). It replaces the monogram.
- **Résumé:** add `public/resume.pdf`. A link appears in the Say hi section.
- **Off the clock:** fill in each card's `body` in `src/data/site.ts`, then set `offTheClock.show` to `true`.
- **Favicons:** edit `public/favicon.svg`, then run `node scripts/make-icons.mjs`.

Deploying: see [DEPLOY.md](DEPLOY.md).
