/** Contact, legal, and social constants — source for scripts/generate-jsonld.mjs, footer UI, and generate-llms.mjs founder block.
 *  Ecosystem site URL (WebSite schema, canonical, OG) lives in index.html → promptanatomy.site.
 *  Brand HQ / platform hub → promptanatomy.app (Organization.url, CTAs). */

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
