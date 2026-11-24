# Deploy

The site is a static Astro build. These steps create a public GitHub repo called
`hardik-site` and deploy it as a new Vercel project.

## 1. Check it builds

Needs Node 24 (Astro 7 requires 22.23 or newer). `package.json` pins `24.x`,
which Vercel reads.

```sh
npm ci
npm run check
npm run build
npm run preview   # open http://localhost:4321 and click around
```

`npm run build` first runs `scripts/fetch-github.mjs`, which refreshes
`src/data/github.json` (the contribution heatmap and repo count). If GitHub
can't be reached it keeps the committed copy, so the build never fails on it.

## 2. Create the GitHub repo

With the GitHub CLI (signed in as HNTRHACK):

```sh
gh repo create hardik-site --public --source=. --remote=origin
git push -u origin main
```

Or on the website: github.com/new, name `hardik-site`, Public, no README,
no .gitignore, no licence. Then:

```sh
git remote add origin https://github.com/HNTRHACK/hardik-site.git
git push -u origin main
```

## 3. Create the Vercel project

1. vercel.com/new, then **Import** `HNTRHACK/hardik-site`.
2. Framework preset: **Astro** (detected). Build command `npm run build`,
   output directory `dist`. `vercel.json` already sets both.
3. Environment variables (Settings, Environment Variables, all environments):
   - `SITE_URL` = the final URL with no trailing slash, e.g.
     `https://hardik-site.vercel.app`. Used for canonical links, Open Graph
     images and the sitemap. If you skip it, that default is used.
   - Optional: `GITHUB_TOKEN` = a fine-grained token with no extra
     permissions (public data only). With it the heatmap comes from GitHub's
     GraphQL API instead of the public contributions page.
4. **Deploy**.

If Vercel gives the project a different URL (for example because
`hardik-site.vercel.app` is taken), set `SITE_URL` to the real one and redeploy.

## 4. Verify

- Open the site: home, each `/work/<slug>/` page, and a missing URL like `/nope/` (shows the 404 page).
- `https://<your-url>/sitemap-index.xml` and `/robots.txt` list the real URL.
- Response headers on `/` (browser devtools, Network tab): `content-security-policy`,
  `strict-transport-security`, `x-frame-options: DENY`, `x-content-type-options: nosniff`.
  Files under `/_astro/` should have `cache-control: public, max-age=31536000, immutable`.
- Browser console is empty on the home page and a project page.
- Paste the home URL and one project URL into https://www.opengraph.xyz to check the preview cards.
- Run Lighthouse (Chrome devtools, Mobile and Desktop) on `/` and `/work/omen/`.

## Updating later

Edit the content in `src/data/site.ts` and `src/data/projects.ts`, commit and
push. Vercel rebuilds on every push to `main`, which also refreshes the heatmap.
To refresh the heatmap without content changes, redeploy from the Vercel dashboard.
