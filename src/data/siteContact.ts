/** Contact, legal, and social constants — source for scripts/generate-jsonld.mjs, footer UI, and generate-llms.mjs founder block.
 *  Ecosystem site URL (WebSite schema, canonical, OG) lives in index.html → promptanatomy.site.
 *  Brand HQ / platform hub → promptanatomy.app (Organization.url, CTAs).
 *
 *  Credential split:
 *  - AUTHOR.sameAs + SOCIAL_LINKS → footer + core Person profiles
 *  - AUTHOR_MEDIA → Person.sameAs (SEO only; not footer)
 *  - AUTHOR_PUBLICATIONS → Book JSON-LD + llms.txt (SEO/GEO only; not footer or hero) */

export const SITE_URL = 'https://promptanatomy.site/' as const;
export const PLATFORM_URL = 'https://promptanatomy.app/' as const;

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
