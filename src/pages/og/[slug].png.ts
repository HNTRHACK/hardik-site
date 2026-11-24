// Builds a 1200x630 Open Graph image per page: a paper card with a marigold circle.
import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'node:fs/promises';
import satori from 'satori';
import sharp from 'sharp';
import { projects } from '../../data/projects';
import { site } from '../../data/site';

interface Card { title: string; kicker: string; line: string }

export const getStaticPaths = (() => [
  { params: { slug: 'home' }, props: { title: site.name, kicker: site.role, line: 'AI systems and full-stack products, built in Mumbai.' } },
  ...projects.map((p) => ({
    params: { slug: p.slug },
    props: { title: p.headline, kicker: p.event.includes(p.team) ? p.event : `${p.event} · ${p.team}`, line: p.oneLiner },
  })),
]) satisfies GetStaticPaths;

const font = (w: number) => readFile(`node_modules/@fontsource/geist-sans/files/geist-sans-latin-${w}-normal.woff`);

type Node = { type: string; props: { style?: Record<string, unknown>; children?: (Node | string)[] | Node | string } };
const el = (type: string, style: Record<string, unknown>, children?: Node['props']['children']): Node => ({ type, props: { style, children } });

export const GET: APIRoute = async ({ props }) => {
  const { title, kicker, line } = props as Card;
  const host = new URL(import.meta.env.SITE).host;
  const tree = el('div', { width: 1200, height: 630, display: 'flex', position: 'relative', background: '#0E0E0C' }, [
    el('div', {
      position: 'absolute', left: 40, top: 40, width: 1120, height: 550, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden',
      background: '#F4F1EA', borderRadius: 28, padding: '56px 64px', color: '#141412',
    }, [
      el('div', { position: 'absolute', width: 460, height: 460, borderRadius: 230, background: '#F2A20C', right: -60, bottom: -150 }),
      el('div', { display: 'flex', flexDirection: 'column' }, [
        el('div', { fontSize: 26, color: '#5C5850', fontWeight: 500 }, kicker),
        el('div', { fontSize: title.length > 24 ? 72 : 92, fontWeight: 600, letterSpacing: -3, lineHeight: 1.02, marginTop: 20, maxWidth: 820 }, title),
        el('div', { fontSize: 32, lineHeight: 1.3, marginTop: 28, maxWidth: 720, color: '#141412' }, line),
      ]),
      el('div', { fontSize: 24, color: '#5C5850', fontWeight: 500 }, `${site.name} · ${host}`),
    ]),
  ]);
  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Geist', data: await font(500), weight: 500, style: 'normal' },
      { name: 'Geist', data: await font(600), weight: 600, style: 'normal' },
    ],
  });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
