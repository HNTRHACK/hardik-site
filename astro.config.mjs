// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL || 'https://hardik-site.vercel.app';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  build: { inlineStylesheets: 'never' },
  // Keep every script and asset in its own file so the CSP can stay 'self' only.
  vite: { build: { assetsInlineLimit: 0 } },
});
