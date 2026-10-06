/** Gateway UTM for conversion CTAs. Shared by siteContact.ts and scripts/verify-kit-href.mjs. */

export function withGatewayUtm(baseUrl, medium) {
  const trimmed = baseUrl.replace(/\/$/, '');
  const params = new URLSearchParams({
    utm_source: 'site',
    utm_medium: medium,
    utm_campaign: 'gateway',
  });
  return `${trimmed}/?${params.toString()}`;
}

export function spokeHostKey(host) {
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

/** `map` is spokeCanonical.json. Unknown hosts fall back to https://{host}/. */
export function kitHref(host, medium, map) {
  const key = spokeHostKey(host);
  const canonical = map[key];
  const base = canonical ?? `https://${key}/`;
  return withGatewayUtm(base, medium);
}
