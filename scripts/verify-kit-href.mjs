/**
 * Asserts conversion CTA prefixes from src/data/spokeCanonical.json.
 * Does not live-curl (build must stay offline). Run: npm run verify:hrefs
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { kitHref } from '../src/data/gatewayHref.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MAP_PATH = join(ROOT, 'src', 'data', 'spokeCanonical.json');

const REQUIRED_HOSTS = [
  'promptanatomy.cloud',
  'promptanatomy.info',
  'promptanatomy.space',
  'promptanatomy.help',
  'promptanatomy.ceo',
  'promptanatomy.pro',
  'promptanatomy.blog',
  'promptanatomy.lol',
];

const EN_PATH_HOSTS = new Set([
  'promptanatomy.space',
  'promptanatomy.help',
  'promptanatomy.ceo',
]);

function assert(cond, message) {
  if (!cond) {
    throw new Error(message);
  }
}

const map = JSON.parse(readFileSync(MAP_PATH, 'utf8'));
const failures = [];

try {
  assert(!('promptanatomy.app' in map), 'do not put .app in spokeCanonical (hub stays platformHref)');
  assert(!('promptanatomy.site' in map), 'do not put .site in spokeCanonical');

  for (const host of REQUIRED_HOSTS) {
    assert(typeof map[host] === 'string' && map[host].startsWith('https://'), `missing https base for ${host}`);
    if (EN_PATH_HOSTS.has(host)) {
      assert(map[host].includes('/en/'), `${host} must be the /en/ 200 storefront`);
    } else {
      assert(!map[host].includes('/en/'), `do not invent /en/ for ${host}`);
    }
    const href = kitHref(host, 'footer', map);
    assert(href.startsWith(map[host].replace(/\/$/, '')), `${host} href must start with canonical origin+path`);
    assert(href.includes('utm_source=site'), `${host} missing utm_source=site`);
    assert(href.includes('utm_medium=footer'), `${host} missing utm_medium`);
    assert(href.includes('utm_campaign=gateway'), `${host} missing utm_campaign=gateway`);
  }

  const infoViaWww = kitHref('https://www.promptanatomy.info/', 'footer', map);
  const infoViaHost = kitHref('promptanatomy.info', 'footer', map);
  assert(infoViaWww === infoViaHost, 'www. and apex host keys must resolve to the same href');

  const unknown = kitHref('example.test', 'footer', map);
  assert(
    unknown === 'https://example.test/?utm_source=site&utm_medium=footer&utm_campaign=gateway',
    `unknown host must keep apex fallback, got ${unknown}`,
  );

  console.log(`[verify-kit-href] ok (${REQUIRED_HOSTS.length} spokes)`);
} catch (err) {
  failures.push(err instanceof Error ? err.message : String(err));
}

if (failures.length > 0) {
  for (const f of failures) {
    console.error(`[verify-kit-href] ${f}`);
  }
  process.exit(1);
}
