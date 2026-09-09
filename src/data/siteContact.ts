/** Contact, legal, and social constants — source for scripts/generate-jsonld.mjs, footer UI, and generate-llms.mjs founder block.
 *  Ecosystem site URL (WebSite schema, canonical, OG) lives in index.html → promptanatomy.site.
 *  Brand HQ / platform hub → promptanatomy.app (Organization.url, CTAs).
 *
 *  Credential split:
 *  - AUTHOR.sameAs + SOCIAL_LINKS → footer + core Person profiles
 *  - AUTHOR_MEDIA → Person.sameAs (SEO only; not footer)
 *  - AUTHOR_PUBLICATIONS → Book JSON-LD + llms.txt (SEO/GEO only; not footer or hero) */

import SPOKE_CANONICAL from './spokeCanonical.json';

export const SITE_URL = 'https://promptanatomy.site/' as const;
export const PLATFORM_URL = 'https://promptanatomy.app/' as const;
export const LESSON_URL = 'https://promptanatomy.cloud/' as const;
export const EXEC_KIT_URL = 'https://promptanatomy.pro/' as const;
/** Hub QW1b sibling entity footer — www + UTM; do not use for conversion CTAs (use platformHref). */
export const ENTITY_FOOTER_URL =
  'https://www.promptanatomy.app/?utm_source=site&utm_medium=entity_footer&utm_campaign=ecosystem' as const;

/** Gateway UTM on conversion outbounds. Do not use for ENTITY_FOOTER_URL. */
export function withGatewayUtm(baseUrl: string, medium: string): string {
  const trimmed = baseUrl.replace(/\/$/, '');
  const params = new URLSearchParams({
    utm_source: 'site',
    utm_medium: medium,
    utm_campaign: 'gateway',
  });
  return `${trimmed}/?${params.toString()}`;
}

export function platformHref(medium: string): string {
  return withGatewayUtm(PLATFORM_URL, medium);
}

export function lessonHref(medium: string): string {
  return withGatewayUtm(LESSON_URL, medium);
}

export function execKitHref(medium: string): string {
  return withGatewayUtm(EXEC_KIT_URL, medium);
}

/** Live 200 storefronts for conversion CTAs. Schema / llms / legal stay bare apex — do not reuse this map there. */
export { SPOKE_CANONICAL };

function spokeHostKey(host: string): string {
  try {
    const url = new URL(host.includes('://') ? host : `https://${host}`);
    return url.hostname.replace(/^www\./i, '').toLowerCase();
  } catch {
    return host
      .replace(/^https?:\/\//i, '')
      .replace(/[/?#].*$/, '')
      .replace(/^www\./i, '')
      .replace(/\/$/, '')
      .toLowerCase();
  }
}

/** Spoke kit/playbook URL with gateway UTM. Host may be `promptanatomy.info` or a full origin. */
export function kitHref(host: string, medium: string): string {
  const key = spokeHostKey(host);
  const canonical = (SPOKE_CANONICAL as Record<string, string>)[key];
  const base = canonical ?? `https://${key}/`;
  return withGatewayUtm(base, medium);
}

export const ORGANIZATION = {
  name: 'Prompt Anatomy',
  email: 'info@promptanatomy.app',
  address: {
    street: '1311 Park St, Unit #654',
    cityStateZip: 'Alameda, CA 94501',
    country: 'US',
  },
} as const;

export const AUTHOR = {
  name: 'Tomas Staniulis',
  title: 'Founder, Prompt Anatomy',
  aboutUrl: 'https://www.promptanatomy.blog/about/',
  sameAs: [
    'https://www.linkedin.com/in/staniulis',
    'https://x.com/TStaniulis_NFT',
    'https://medium.com/@tomas.staniulis76',
    'https://www.facebook.com/tomas.staniulis/',
  ],
} as const;

/** Founder media — JSON-LD Person.sameAs + llms only (not footer). */
export const AUTHOR_MEDIA = [
  { label: 'YouTube', url: 'https://www.youtube.com/mrbulletLT' },
] as const;

/** Founder publications — Book JSON-LD + llms only (not footer or hero). */
export const AUTHOR_PUBLICATIONS = [
  {
    title: 'Quantum Physics and Organizational Structure Management',
    url: 'https://www.amazon.com/-/es/Quantum-Physics-Organizational-Structure-Management/dp/9955689234',
  },
  {
    title: 'Tomas Staniulis',
    url: 'https://www.amazon.com/-/he/Tomas-Staniulis-ebook/dp/B01174T96S',
  },
] as const;

export const ORG_SAME_AS = [
  'https://promptanatomy.app/',
  'https://promptanatomy.site/',
  'https://t.me/prompt_anatomy',
] as const;

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/staniulis' },
  { label: 'X (Twitter)', href: 'https://x.com/TStaniulis_NFT' },
  { label: 'Medium', href: 'https://medium.com/@tomas.staniulis76' },
  { label: 'Facebook', href: 'https://www.facebook.com/tomas.staniulis/' },
] as const;

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: 'https://www.promptanatomy.blog/privacy/' },
  { label: 'Terms of Service', href: 'https://www.promptanatomy.blog/terms/' },
  { label: 'Cookies & tracking', href: 'https://www.promptanatomy.blog/privacy/#cookies' },
] as const;

export const TWITTER_HANDLE = '@TStaniulis_NFT';
