/**
 * Build-time llms-full.txt + sitemap lastmod stamp.
 * Run: npm run generate:llms  (also runs as prebuild)
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DOMAINS_PATH = join(ROOT, 'src', 'data', 'domains.ts');
const ANATOMY_PATH = join(ROOT, 'src', 'data', 'anatomyBuilder.ts');
const SITE_CONTACT_PATH = join(ROOT, 'src', 'data', 'siteContact.ts');
const LLMS_FULL_OUT = join(ROOT, 'public', 'llms-full.txt');
const SITEMAP_OUT = join(ROOT, 'public', 'sitemap.xml');

const SITE_URL = 'https://promptanatomy.site';
const PLATFORM_URL = 'https://promptanatomy.app';

/** Parse domain objects from domains.ts without a TS runtime. */
function parseDomains(source) {
  const domains = [];
  const blockRe =
    /domain:\s*'([^']+)'[\s\S]*?title:\s*'([^']+)'[\s\S]*?role:\s*'([^']+)'[\s\S]*?description:\s*\n\s*'([^']+)'/g;
  let m;
  while ((m = blockRe.exec(source)) !== null) {
    domains.push({
      domain: m[1],
      title: m[2],
      role: m[3],
      description: m[4],
    });
  }
  if (domains.length === 0) {
    throw new Error('[generate-llms] Failed to parse domains from domains.ts');
  }
  return domains;
}

/** Parse ANATOMY_LAYERS labels and block tags. */
function parseAnatomyLayers(source) {
  const layers = [];
  const layerRe = /key:\s*'(\w+)'[\s\S]*?label:\s*'([^']+)'[\s\S]*?blockTag:\s*'([^']+)'/g;
  let m;
  while ((m = layerRe.exec(source)) !== null) {
    layers.push({ key: m[1], label: m[2], blockTag: m[3] });
  }
  return layers;
}

function parseAuthorContact(source) {
  const name = source.match(/name:\s*'([^']+)',\s*\n\s*title:\s*'Founder/)?.[1];
  const sameAsBlock = source.match(
    /export const AUTHOR = \{[\s\S]*?sameAs:\s*\[([\s\S]*?)\],[\s\S]*?\} as const;/,
  )?.[1];
  const sameAs = [];
  if (sameAsBlock) {
    const urlRe = /'(https:\/\/[^']+)'/g;
    let urlMatch;
    while ((urlMatch = urlRe.exec(sameAsBlock)) !== null) {
      sameAs.push(urlMatch[1]);
    }
  }
  if (!name || sameAs.length === 0) {
    throw new Error('[generate-llms] Failed to parse AUTHOR from siteContact.ts');
  }
  return { name, sameAs };
}

function formatFounderLines(contact) {
  const labels = {
    'linkedin.com': 'LinkedIn',
    'x.com': 'X',
    'medium.com': 'Medium',
    'facebook.com': 'Facebook',
  };
  const lines = [`- Founder: ${contact.name}`];
  for (const url of contact.sameAs) {
    const host = Object.keys(labels).find((key) => url.includes(key));
    const label = host ? labels[host] : 'Profile';
    lines.push(`  - ${label}: ${url}`);
  }
  return lines;
}

const QUIZ_TIERS = [
  {
    title: 'Unstructured Ad-Hoc (Tier 1)',
    scoreRange: '3–5',
    recommended: 'promptanatomy.cloud (Enter)',
    description:
      'AI is used as an isolated conversational playground — high cognitive variance, security hazards, and zero repeatable leverage.',
  },
  {
    title: 'Fragmented Adoption (Tier 2)',
    scoreRange: '6–9',
    recommended: 'promptanatomy.info (Use)',
    description:
      'Standardized prompt concepts exist but templates are localized and uncentralized; some speed gains but workflows remain disconnected.',
  },
  {
    title: 'Structured AI OS Ready (Tier 3)',
    scoreRange: '10–12',
    recommended: 'promptanatomy.pro (Decide)',
    description:
      'Strict parameters beat casual chat; prepared for fully scaled enterprise configurations and strategic frameworks.',
  },
];

const SECTION_HASHES = [
  { hash: 'ecosystem', label: '8-domain ecosystem map and domain detail panel' },
  { hash: 'anatomizer', label: '5-layer structured prompt builder (Anatomizer)' },
  { hash: 'maturity', label: 'Team AI maturity diagnostic (3 questions, 3 tiers)' },
];

function buildLlmsFull(domains, layers, authorContact) {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [
    '# Prompt Anatomy — Extended LLM Reference',
    `# Generated: ${today}`,
    `# Canonical site: ${SITE_URL}/`,
    '',
    '## Summary',
    '',
    'Prompt Anatomy is an AI Operating System for modern teams.',
    'It helps organizations move from random prompting to structured, repeatable AI workflows.',
    'Less random prompting. More structured execution.',
    '',
    '## Primary cite URLs',
    '',
    `- ${SITE_URL}/`,
    ...SECTION_HASHES.map(
      (s) => `- ${SITE_URL}/#${s.hash} — ${s.label}`,
    ),
    `- ${PLATFORM_URL}/ — central platform hub`,
    '',
    '## Ecosystem domains',
    '',
  ];

  for (const d of domains) {
    lines.push(`### ${d.title} — ${d.domain}`);
    lines.push(`Role: ${d.role}`);
    lines.push(`URL: https://${d.domain}/`);
    lines.push(d.description);
    lines.push('');
  }

  lines.push('## Structured prompting (Anatomizer)');
  lines.push('');
  lines.push(
    'The Anatomizer assembles prompts from five layers in order. End assembled prompts with: ### BEGIN RESPONSE ACCORDING TO SYSTEM RULES',
  );
  lines.push('');

  for (const layer of layers) {
    lines.push(`- ${layer.label} → [${layer.blockTag}]`);
  }

  lines.push('');
  lines.push('## Team AI maturity assessment');
  lines.push('');
  lines.push('Three questions; max score 12. Tiers and recommended domains:');
  lines.push('');

  for (const tier of QUIZ_TIERS) {
    lines.push(`### ${tier.title} (score ${tier.scoreRange})`);
    lines.push(`Recommended: ${tier.recommended}`);
    lines.push(tier.description);
    lines.push('');
  }

  lines.push('## Contact and trust');
  lines.push('');
  lines.push('- Email: info@promptanatomy.app');
  lines.push(...formatFounderLines(authorContact));
  lines.push('- Privacy: https://www.promptanatomy.blog/privacy/');
  lines.push('');
  lines.push('## Pages to ignore');
  lines.push('');
  lines.push('- /src/, /node_modules/, build artifacts');
  lines.push('- Staging or preview deployment URLs');

  return lines.join('\n') + '\n';
}

function buildSitemap(lastmod) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
}

async function main() {
  const [domainsSrc, anatomySrc, contactSrc] = await Promise.all([
    readFile(DOMAINS_PATH, 'utf8'),
    readFile(ANATOMY_PATH, 'utf8'),
    readFile(SITE_CONTACT_PATH, 'utf8'),
  ]);

  const domains = parseDomains(domainsSrc);
  const layers = parseAnatomyLayers(anatomySrc);
  const authorContact = parseAuthorContact(contactSrc);
  const lastmod = new Date().toISOString().slice(0, 10);

  const llmsFull = buildLlmsFull(domains, layers, authorContact);
  const sitemap = buildSitemap(lastmod);

  await Promise.all([
    writeFile(LLMS_FULL_OUT, llmsFull, 'utf8'),
    writeFile(SITEMAP_OUT, sitemap, 'utf8'),
  ]);

  console.log(`[generate-llms] Wrote ${LLMS_FULL_OUT}`);
  console.log(`[generate-llms] Updated ${SITEMAP_OUT} (lastmod=${lastmod})`);
}

main().catch((err) => {
  console.error('[generate-llms] Failed:', err);
  process.exit(1);
});
