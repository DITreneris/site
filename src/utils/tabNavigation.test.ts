import { describe, expect, it } from 'vitest';
import { tabFromHash } from './tabNavigation';

describe('tabFromHash', () => {
  it('opens the prompt builder for its tab and anchor hashes', () => {
    expect(tabFromHash('#anatomizer')).toBe('anatomizer');
    expect(tabFromHash('#anatomizer-builder')).toBe('anatomizer');
  });

  it('keeps the current tab for the method anchor', () => {
    expect(tabFromHash('#method')).toBe('ecosystem');
    expect(tabFromHash('#method', 'maturity')).toBe('maturity');
  });
});
