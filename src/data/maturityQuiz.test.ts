import { describe, expect, it } from 'vitest';
import { calculateQuizResult } from './maturityQuiz';

describe('calculateQuizResult', () => {
  it('sends a score of 5 to Enter', () => {
    const result = calculateQuizResult(5, {});
    expect(result.recommendedId).toBe('cloud');
    expect(result.title).toContain('Tier 1');
  });

  it('sends scores of 6 and 9 to Use', () => {
    expect(calculateQuizResult(6, {}).recommendedId).toBe('info');
    const upper = calculateQuizResult(9, {});
    expect(upper.recommendedId).toBe('info');
    expect(upper.title).toContain('Tier 2');
  });

  it('sends a score of 10 to Decide', () => {
    const result = calculateQuizResult(10, {});
    expect(result.recommendedId).toBe('pro');
    expect(result.title).toContain('Tier 3');
  });
});
