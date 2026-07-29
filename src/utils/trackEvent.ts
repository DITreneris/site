import { track } from '@vercel/analytics';

export function trackEvent(
  name: string,
  data?: Record<string, string | number | boolean | null | undefined>,
) {
  track(name, data);
}
