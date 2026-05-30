import type { TabId } from '../types';

export const TAB_HASH: Record<TabId, string> = {
  ecosystem: 'ecosystem',
  anatomizer: 'anatomizer',
  maturity: 'maturity',
};

const HASH_TO_TAB = Object.fromEntries(
  (Object.entries(TAB_HASH) as [TabId, string][]).map(([tab, hash]) => [hash, tab]),
) as Record<string, TabId>;

export function tabFromHash(hash: string): TabId {
  const key = hash.replace(/^#/, '').trim();
  return HASH_TO_TAB[key] ?? 'ecosystem';
}

export function hashForTab(tab: TabId): string {
  return `#${TAB_HASH[tab]}`;
}
