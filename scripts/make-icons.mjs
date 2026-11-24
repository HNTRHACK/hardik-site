// One-off: renders the favicon set from public/favicon.svg. Re-run if the icon changes.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const svg = await readFile('public/favicon.svg');
const png = (size, pad = 0) =>
  sharp(svg, { density: 512 }).resize(size - pad * 2, size - pad * 2)
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: '#F4F1EA' }).png().toBuffer();

await writeFile('public/apple-touch-icon.png', await png(180, 14));
await writeFile('public/icon-192.png', await png(192));
await writeFile('public/icon-512.png', await png(512));
await writeFile('public/icon-maskable-512.png', await png(512, 64));

// favicon.ico holding one 32x32 PNG (valid ICO since Vista).
const p32 = await png(32);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(p32.length, 14); header.writeUInt32LE(22, 18);
await writeFile('public/favicon.ico', Buffer.concat([header, p32]));
console.log('icons written');
