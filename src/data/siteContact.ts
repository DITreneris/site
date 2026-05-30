/** Contact, legal, and social constants — keep Organization fields in sync with index.html JSON-LD.
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
  linkedin: 'https://www.linkedin.com/in/staniulis',
  aboutUrl: 'https://www.promptanatomy.blog/about/',
} as const;

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/staniulis' },
  { label: 'X (Twitter)', href: 'https://x.com/TStaniulis_NFT' },
  { label: 'Telegram', href: 'https://t.me/prompt_anatomy' },
] as const;

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: 'https://www.promptanatomy.blog/privacy/' },
  { label: 'Terms of Service', href: 'https://www.promptanatomy.blog/terms/' },
  { label: 'Cookies & tracking', href: 'https://www.promptanatomy.blog/privacy/#cookies' },
] as const;

export const TWITTER_HANDLE = '@TStaniulis_NFT';
