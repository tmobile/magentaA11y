/*
  Checks every URL the site should serve, against the local server.

  Builds its own list from src/shared/content.json and src/utils/path-mapping.ts,
  so it cannot drift from the real routes and nobody has to maintain a list.

  Usage:
    node serve-pages.js      (in one terminal, leave running)
    node check-routes.js     (in another)
    (or BASE=http://localhost:3001 node check-routes.js if you changed the port)

  A pass means the server returned the app shell, so the page will boot and
  route. It does not prove React rendered the right component, so also work
  through the MANUAL list printed at the end.

  This file is for local testing only.
*/
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = process.env.BASE || 'http://localhost:3000';

// ---------- build the route list ----------
const content = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'src/shared/content.json'), 'utf8')
);

const contentRoutes = [];
for (const [section, items] of Object.entries(content)) {
  for (const cat of items) {
    contentRoutes.push(`/${section}-criteria/${cat.name}/overview`);
    for (const child of cat.children || []) {
      contentRoutes.push(`/${section}-criteria/${cat.name}/${child.name}`);
    }
  }
}

const staticRoutes = [
  '/',
  '/home',
  '/about-us',
  '/my-criteria',
  '/basic-accessible-webpage',
  '/basic-inaccessible-webpage',
];

const mappingSrc = fs.readFileSync(
  path.join(__dirname, 'src/utils/path-mapping.ts'),
  'utf8'
);
const legacyRoutes = [
  ...new Set([...mappingSrc.matchAll(/["'](\/[^"']+)["']\s*:/g)].map((m) => m[1])),
].filter((p) => p !== '/your-old-path');

const pass = [];
const fail = [];

async function check(url, label) {
  try {
    const res = await fetch(BASE + url, { redirect: 'manual' });
    // 200 = a real file was served.
    // 404 = 404.html was served, which is the expected fallback and is exactly
    //       what production does. Both mean the app boots and routes.
    const okStatus = res.status === 200 || res.status === 404;
    const body = await res.text();
    const isShell =
      body.includes('<div id="root"') || body.includes('pathSegmentsToKeep');
    if (okStatus && isShell) {
      pass.push(`${label} ${url}`);
    } else {
      fail.push(`${label} ${url}   status=${res.status} shell=${isShell}`);
    }
  } catch (e) {
    fail.push(`${label} ${url}   ERROR ${e.message}`);
  }
}

console.log(`Checking ${BASE}\n`);

for (const r of staticRoutes) await check(r, '[static] ');
for (const r of contentRoutes) await check(r, '[content]');
for (const r of legacyRoutes) await check(r, '[legacy] ');
await check('/web-criteria/component/button?tab=1', '[query]  ');

console.log(`Passed: ${pass.length}`);
console.log(`Failed: ${fail.length}\n`);

if (fail.length) {
  console.log('FAILURES');
  fail.forEach((f) => console.log('  ' + f));
  console.log('');
}

const amp = contentRoutes.filter((r) => r.includes('&'));
console.log('MANUAL CHECKS, open these in a browser:\n');
console.log('  Ampersand paths, page loads and URL stays intact:');
amp.forEach((r) => console.log(`    ${BASE}${r}`));
console.log('\n  Legacy hash URLs, should rewrite to a clean path:');
console.log(`    ${BASE}/#/web-criteria/component/button`);
console.log(`    ${BASE}/#/native-criteria/controls/button`);
console.log('\n  Query preserved through a hash URL, should keep tab=1:');
console.log(`    ${BASE}/#/web-criteria/component/button?tab=1`);
console.log('\n  In-page anchor, address bar should update and focus should move:');
console.log(`    ${BASE}/web-criteria/component/footnote`);
console.log('\n  Invalid URL, the app NotFound page should render:');
console.log(`    ${BASE}/this-route-does-not-exist`);
console.log('\n  Then navigate a few pages and test back and forward.\n');

process.exit(fail.length ? 1 : 0);
