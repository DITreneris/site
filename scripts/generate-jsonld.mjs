/**
 * Build-time JSON-LD entity graph patch for index.html.
 * Sources: domains.ts, siteContact.ts, seoFaq.ts
 * Run: npm run generate:jsonld  (also runs as prebuild)
 *
 * FAQPage is included when Q&A matches on-page FaqSection (seoFaq.ts).
 * Capsules also feed generate-llms.mjs (llms-full.txt).
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DOMAINS_PATH = join(ROOT, 'src', 'data', 'domains.ts');
const SITE_CONTACT_PATH = join(ROOT, 'src', 'data', 'siteContact.ts');
const SEO_FAQ_PATH = join(ROOT, 'src', 'data', 'seoFaq.ts');
const INDEX_HTML = join(ROOT, 'index.html');

const PLATFORM_URL = 'https://promptanatomy.app';
const SITE_URL = 'https://promptanatomy.site';
const ORG_ID = `${PLATFORM_URL}/#organization`;
const FOUNDER_ID = `${PLATFORM_URL}/#founder`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;
const PRODUCT_ID = `${PLATFORM_URL}/#product`;
const ECOSYSTEM_ID = `${SITE_URL}/#ecosystem`;
const FAQ_ID = `${SITE_URL}/#faq`;

const FREE_DEMO_OFFER = {
  '@type': 'Offer',
  availability: 'https://schema.org/InStock',
  url: `${SITE_URL}/`,
  description:
    'Free ecosystem demo, Anatomizer, and team assessment at promptanatomy.site. Training plans and checkout live on promptanatomy.app.',
};

const START_MARKER = '<!-- STRUCTURED_DATA:START -->';
const END_MARKER = '<!-- STRUCTURED_DATA:END -->';

function parseStringArray(block) {
  const values = [];
  const urlRe = /'(https:\/\/[^']+)'/g;
  let urlMatch;
  while ((urlMatch = urlRe.exec(block)) !== null) {
    values.push(urlMatch[1]);
  }
  return values;
}

function parseDomains(source) {
  const domains = [];
  const blockRe =
    /domain:\s*'([^']+)'[\s\S]*?title:\s*'([^']+)'[\s\S]*?role:\s*'([^']+)'[\s\S]*?description:\s*\n\s*'([^']+)'[\s\S]*?isCore:\s*(true|false)/g;
  let m;
  while ((m = blockRe.exec(source)) !== null) {
    domains.push({
      domain: m[1],
      title: m[2],
      role: m[3],
      description: m[4],
      isCore: m[5] === 'true',
    });
  }
  if (domains.length === 0) {
    throw new Error('[generate-jsonld] Failed to parse domains from domains.ts');
  }
  return domains;
}

function parseSeoFaq(source) {
  const faqs = [];
  const blockRe =
    /question:\s*'((?:\\'|[^'])*)'[\s\S]*?answer:\s*\n\s*'((?:\\'|[^'])*)'/g;
  let m;
  while ((m = blockRe.exec(source)) !== null) {
    faqs.push({
      question: m[1].replace(/\\'/g, "'"),
      answer: m[2].replace(/\\'/g, "'"),
    });
  }
  if (faqs.length === 0) {
    throw new Error('[generate-jsonld] Failed to parse SEO_FAQ from seoFaq.ts');
  }
  return faqs;
}

function parseLabeledUrls(source, exportName) {
  const block = source.match(
    new RegExp(`export const ${exportName} = \\[([\\s\\S]*?)\\] as const;`),
  )?.[1];
  if (!block) return [];
  const entries = [];
  const entryRe = /label:\s*'([^']+)'[\s\S]*?url:\s*'(https:\/\/[^']+)'/g;
  let m;
  while ((m = entryRe.exec(block)) !== null) {
    entries.push({ label: m[1], url: m[2] });
  }
  return entries;
}

function parsePublications(source) {
  const block = source.match(
    /export const AUTHOR_PUBLICATIONS = \[([\s\S]*?)\] as const;/,
  )?.[1];
  if (!block) return [];
  const entries = [];
  const entryRe = /title:\s*'([^']+)'[\s\S]*?url:\s*'(https:\/\/[^']+)'/g;
  let m;
  while ((m = entryRe.exec(block)) !== null) {
    entries.push({ title: m[1], url: m[2] });
  }
  return entries;
}

function parseSiteContact(source) {
  const authorName = source.match(/name:\s*'([^']+)',\s*\n\s*title:\s*'Founder/)?.[1];
  const email = source.match(/email:\s*'([^']+)'/)?.[1];
  const street = source.match(/street:\s*'([^']+)'/)?.[1];
  const cityStateZip = source.match(/cityStateZip:\s*'([^']+)'/)?.[1];
  const country = source.match(/country:\s*'([^']+)'/)?.[1];

  const authorSameAsBlock = source.match(
    /export const AUTHOR = \{[\s\S]*?sameAs:\s*\[([\s\S]*?)\],[\s\S]*?\} as const;/,
  )?.[1];
  const orgSameAsBlock = source.match(
    /export const ORG_SAME_AS = \[([\s\S]*?)\] as const;/,
  )?.[1];

  const authorSameAs = authorSameAsBlock ? parseStringArray(authorSameAsBlock) : [];
  const orgSameAs = orgSameAsBlock ? parseStringArray(orgSameAsBlock) : [];
  const authorMedia = parseLabeledUrls(source, 'AUTHOR_MEDIA');
  const publications = parsePublications(source);
  const personSameAs = [...authorSameAs, ...authorMedia.map((m) => m.url)];

  if (!authorName || !email || !street || !cityStateZip || !country) {
    throw new Error('[generate-jsonld] Failed to parse siteContact.ts');
  }

  const [city, stateZip] = cityStateZip.split(', ');
  const [region, postalCode] = stateZip.split(' ');

  return {
    authorName,
    authorSameAs: personSameAs,
    orgSameAs,
    publications,
    email,
    address: {
      streetAddress: street,
      addressLocality: city,
      addressRegion: region,
      postalCode,
      addressCountry: country,
    },
  };
}

function stageName(title) {
  return title.replace(/^\d+\.\s*/, '');
}

function extractOgImageUrl(html) {
  const match = html.match(/https:\/\/promptanatomy\.site\/og_2\.png\?v=[a-f0-9]+/);
  if (!match) {
    throw new Error('[generate-jsonld] og_2.png URL not found in index.html — run generate:og first');
  }
  return match[0];
}

function buildBookNodes(publications) {
  return publications.map((book) => ({
    '@type': 'Book',
    '@id': `${book.url}#book`,
    name: book.title,
    url: book.url,
    author: { '@id': FOUNDER_ID },
  }));
}

function buildGraph({ domains, contact, faqs, ogImageUrl, dateModified }) {
  const itemListElement = domains.map((d, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: d.isCore ? d.title : stageName(d.title),
    url: `https://${d.domain}/`,
    description: d.role,
  }));

  const faqMainEntity = faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': FOUNDER_ID,
        name: contact.authorName,
        jobTitle: 'Founder',
        worksFor: { '@id': ORG_ID },
        sameAs: contact.authorSameAs,
      },
      ...buildBookNodes(contact.publications),
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'Prompt Anatomy',
        url: `${PLATFORM_URL}/`,
        logo: `${PLATFORM_URL}/favicon.svg`,
        description:
          'An AI Operating System for modern teams: structured templates, workflows, and frameworks that turn ad-hoc prompting into repeatable execution.',
        email: contact.email,
        founder: { '@id': FOUNDER_ID },
        address: {
          '@type': 'PostalAddress',
          ...contact.address,
        },
        sameAs: contact.orgSameAs,
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: 'Prompt Anatomy',
        publisher: { '@id': ORG_ID },
      },
      {
        '@type': 'WebPage',
        '@id': WEBPAGE_ID,
        url: `${SITE_URL}/`,
        name: 'Prompt Anatomy — AI Operating System for Teams',
        description:
          'Prompt Anatomy is an AI Operating System for modern teams. Explore the nine-domain ecosystem, build structured prompts, and assess your team\'s AI maturity.',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
        dateModified,
        primaryImageOfPage: ogImageUrl,
        offers: FREE_DEMO_OFFER,
      },
      {
        '@type': 'ItemList',
        '@id': ECOSYSTEM_ID,
        name: 'Prompt Anatomy Ecosystem Modules',
        numberOfItems: domains.length,
        itemListElement,
      },
      {
        '@type': 'Product',
        '@id': PRODUCT_ID,
        name: 'Prompt Anatomy AI Operating System',
        url: `${PLATFORM_URL}/`,
        image: ogImageUrl,
        brand: { '@id': ORG_ID },
        description:
          '6-block methodology training (META, INPUT, OUTPUT, REASONING, QUALITY, ADVANCED) plus six role kits (Enter, Use, Create, Hire, Manage, Decide), Deepen, and Play (Corporate Ladder), around one core hub — an AI operating system for teams.',
        category: 'AI Operating System',
        hasPart: { '@id': ECOSYSTEM_ID },
        offers: FREE_DEMO_OFFER,
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Prompt Anatomy',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: `${PLATFORM_URL}/`,
        description:
          'AI Operating System for modern teams: structured templates, workflows, and frameworks that turn ad-hoc prompting into repeatable execution.',
        image: ogImageUrl,
        offers: FREE_DEMO_OFFER,
        publisher: { '@id': ORG_ID },
      },
      {
        '@type': 'FAQPage',
        '@id': FAQ_ID,
        url: `${SITE_URL}/#faq`,
        isPartOf: { '@id': WEBPAGE_ID },
        mainEntity: faqMainEntity,
      },
    ],
  };
}

function buildScriptBlock(graph) {
  const json = JSON.stringify(graph, null, 2);
  return `${START_MARKER}\n    <script type="application/ld+json">\n${json}\n    </script>\n    ${END_MARKER}`;
}

async function main() {
  const [domainsSrc, contactSrc, faqSrc, html] = await Promise.all([
    readFile(DOMAINS_PATH, 'utf8'),
    readFile(SITE_CONTACT_PATH, 'utf8'),
    readFile(SEO_FAQ_PATH, 'utf8'),
    readFile(INDEX_HTML, 'utf8'),
  ]);

  const domains = parseDomains(domainsSrc);
  const contact = parseSiteContact(contactSrc);
  const faqs = parseSeoFaq(faqSrc);
  const ogImageUrl = extractOgImageUrl(html);
  const dateModified = new Date().toISOString().slice(0, 10);
  const graph = buildGraph({ domains, contact, faqs, ogImageUrl, dateModified });
  const block = buildScriptBlock(graph);

  const markerPattern = new RegExp(`${START_MARKER}[\\s\\S]*?${END_MARKER}`);

  if (!markerPattern.test(html)) {
    throw new Error(
      `[generate-jsonld] Markers not found in index.html — add ${START_MARKER} and ${END_MARKER}`,
    );
  }

  const updated = html.replace(markerPattern, block);
  await writeFile(INDEX_HTML, updated, 'utf8');
  console.log('[generate-jsonld] Patched index.html structured data');
}

main().catch((err) => {
  console.error('[generate-jsonld] Failed:', err);
  process.exit(1);
});
