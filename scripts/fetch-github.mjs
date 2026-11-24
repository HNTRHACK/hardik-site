// Fetches the real GitHub contribution calendar and public repo count for the
// Stats section. Runs before every build. If GitHub can't be reached, the
// committed cache in src/data/github.json is kept as-is, so builds never fail
// and the page never shows made-up data.
import { readFile, writeFile } from 'node:fs/promises';

const USER = 'HNTRHACK';
const OUT = new URL('../src/data/github.json', import.meta.url);
const UA = { 'User-Agent': 'hardik-site-build' };
const LEVELS = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };

async function viaGraphQL(token) {
  const query = `query($u:String!){user(login:$u){repositories(privacy:PUBLIC,ownerAffiliations:OWNER){totalCount}
    contributionsCollection{contributionCalendar{weeks{contributionDays{date contributionCount contributionLevel}}}}}}`;
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { ...UA, Authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { u: USER } }),
  });
  if (!res.ok) throw new Error(`GraphQL ${res.status}`);
  const { data } = await res.json();
  const days = data.user.contributionsCollection.contributionCalendar.weeks
    .flatMap((w) => w.contributionDays)
    .map((d) => ({ date: d.date, count: d.contributionCount, level: LEVELS[d.contributionLevel] ?? 0 }));
  return { source: 'graphql', publicRepos: data.user.repositories.totalCount, days };
}

async function viaPublicPage() {
  const res = await fetch(`https://github.com/users/${USER}/contributions`, { headers: UA });
  if (!res.ok) throw new Error(`contributions page ${res.status}`);
  const html = await res.text();
  const counts = new Map();
  for (const m of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const n = m[2].match(/^(\d+) contributions?/);
    counts.set(m[1], n ? Number(n[1]) : 0);
  }
  const days = [];
  for (const m of html.matchAll(/<td[^>]*ContributionCalendar-day[^>]*>/g)) {
    const tag = m[0];
    const date = tag.match(/data-date="([\d-]+)"/)?.[1];
    const level = Number(tag.match(/data-level="(\d)"/)?.[1] ?? 0);
    const id = tag.match(/id="([^"]+)"/)?.[1];
    if (date) days.push({ date, count: counts.get(id) ?? 0, level });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  const api = await fetch(`https://api.github.com/users/${USER}`, { headers: UA });
  if (!api.ok) throw new Error(`users API ${api.status}`);
  const { public_repos: publicRepos } = await api.json();
  return { source: 'public-page', publicRepos, days };
}

function check({ days, publicRepos }) {
  if (!Number.isInteger(publicRepos)) throw new Error('bad repo count');
  if (days.length < 300) throw new Error(`only ${days.length} days parsed`);
  for (let i = 1; i < days.length; i++) {
    const gap = (Date.parse(days[i].date) - Date.parse(days[i - 1].date)) / 864e5;
    if (gap !== 1) throw new Error(`calendar not contiguous at ${days[i].date}`);
  }
}

try {
  const token = process.env.GITHUB_TOKEN;
  const data = token ? await viaGraphQL(token) : await viaPublicPage();
  check(data);
  const total = data.days.reduce((s, d) => s + d.count, 0);
  const out = { user: USER, fetchedAt: new Date().toISOString().slice(0, 10), total, ...data };
  await writeFile(OUT, JSON.stringify(out, null, 1) + '\n');
  console.log(`github: ${out.days.length} days, ${total} contributions, ${out.publicRepos} public repos (${out.source})`);
} catch (err) {
  const cached = JSON.parse(await readFile(OUT, 'utf8').catch(() => 'null'));
  if (!cached) throw new Error(`github fetch failed and no cache exists: ${err.message}`);
  console.log(`github: fetch failed (${err.message}); using cache from ${cached.fetchedAt}`);
}
