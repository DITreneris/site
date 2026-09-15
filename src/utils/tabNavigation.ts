import type { TabId } from '../types';

export const TAB_HASH: Record<TabId, string> = {
  ecosystem: 'ecosystem',
  anatomizer: 'anatomizer',
  maturity: 'maturity',
};

export const PAGE_ANCHORS = ['method', 'faq', 'anatomizer-builder'] as const;
export type PageAnchor = (typeof PAGE_ANCHORS)[number];

const HASH_TO_TAB = Object.fromEntries(
  (Object.entries(TAB_HASH) as [TabId, string][]).map(([tab, hash]) => [hash, tab]),
) as Record<string, TabId>;

const ANCHOR_TO_TAB: Partial<Record<string, TabId>> = {
  'anatomizer-builder': 'anatomizer',
};

export type NavigateOpts = {
  anchor?: string;
  forceScroll?: boolean;
};

export function hashKey(hash: string): string {
  return hash.replace(/^#/, '').trim();
}

export function isPageAnchor(key: string): key is PageAnchor {
  return (PAGE_ANCHORS as readonly string[]).includes(key);
}

export function tabFromHash(hash: string, fallback: TabId = 'ecosystem'): TabId {
  const key = hashKey(hash);
  if (HASH_TO_TAB[key]) return HASH_TO_TAB[key];
  if (ANCHOR_TO_TAB[key]) return ANCHOR_TO_TAB[key] as TabId;
  return fallback;
}

export function hashForTab(tab: TabId): string {
  return `#${TAB_HASH[tab]}`;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Scroll a page anchor, or `#main-content` for tab hashes / empty. */
export function scrollToHash(hash: string, behavior: ScrollBehavior = 'auto'): void {
  const key = hashKey(hash);
  const id = isPageAnchor(key) ? key : 'main-content';
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior, block: 'start' });
}
