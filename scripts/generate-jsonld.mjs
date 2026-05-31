/**
 * Build-time JSON-LD entity graph patch for index.html.
 * Sources: domains.ts, siteContact.ts, seoFaq.ts
 * Run: npm run generate:jsonld  (also runs as prebuild)
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
const PRODUCT_ID = `${PLATFORM_URL}/#product`;
const ECOSYSTEM_ID = `${SITE_URL}/#ecosystem`;

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

  if (!authorName || !email || !street || !cityStateZip || !country) {
    throw new Error('[generate-jsonld] Failed to parse siteContact.ts');
  }

  const [city, stateZip] = cityStateZip.split(', ');
  const [region, postalCode] = stateZip.split(' ');

  return {
    authorName,
    authorSameAs,
    orgSameAs,
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

function parseSeoFaq(source) {
  const faqs = [];
  const faqRe = /question:\s*'((?:\\'|[^'])*)',\s*\n\s*answer:\s*\n\s*'((?:\\'|[^'])*)'/g;
  let m;
  while ((m = faqRe.exec(source)) !== null) {
    faqs.push({
      question: m[1].replace(/\\'/g, "'"),
      answer: m[2].replace(/\\'/g, "'"),
    });
  }
  if (faqs.length === 0) {
    throw new Error('[generate-jsonld] Failed to parse seoFaq.ts');
  }
  return faqs;
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

function buildGraph({ domains, contact, faqs, ogImageUrl }) {
  const itemListElement = domains.map((d, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: d.isCore ? d.title : stageName(d.title),
    url: `https://${d.domain}/`,
    description: d.role,
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
          'An 8-domain ecosystem covering onboarding, daily automation, content creation, HR, leadership, scaling, and knowledge — built around a central AI operating system for teams.',
        category: 'AI Operating System',
        hasPart: { '@id': ECOSYSTEM_ID },
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
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free ecosystem demo and team assessment at promptanatomy.site',
        },
        publisher: { '@id': ORG_ID },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
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
  const graph = buildGraph({ domains, contact, faqs, ogImageUrl });
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
