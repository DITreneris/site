/**
 * Build-time OG cache bust + GitHub social preview copy.
 * Source: public/og_2.png (hand-maintained).
 * Patches index.html og_2.png cache-bust query param; copies to .github/social-preview.png.
 * Run: npm run generate:og  (also runs as prebuild)
 */
import { createHash } from 'node:crypto';
import { readFile, writeFile, copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { OG, OG_GITHUB_WARN_BYTES, OG_WARN_BYTES } from './og-constants.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE = join(ROOT, 'public', OG.sourceFile);
const GITHUB_OUT = join(ROOT, '.github', 'social-preview.png');
const INDEX_HTML = join(ROOT, 'index.html');

function warnSize(label, bytes) {
  if (bytes > OG_GITHUB_WARN_BYTES) {
    console.warn(
      `[generate-og] ${label} is ${bytes} bytes (>${OG_GITHUB_WARN_BYTES} GitHub social preview limit). Consider compressing ${OG.sourceFile}.`,
    );
  } else if (bytes > OG_WARN_BYTES) {
    console.warn(
      `[generate-og] ${label} is ${bytes} bytes (>${OG_WARN_BYTES} WhatsApp threshold).`,
    );
  }
}

async function patchIndexHtmlCacheBust(png) {
  const hash = createHash('sha256').update(png).digest('hex').slice(0, 8);
  const imageUrl = `${OG.siteUrl}/${OG.sourceFile}?v=${hash}`;
  const html = await readFile(INDEX_HTML, 'utf8');

  const urlPattern = new RegExp(
    `https:\\/\\/promptanatomy\\.site\\/${OG.sourceFile.replace('.', '\\.')}(\\?v=[^"']*)?`,
    'g',
  );
  if (!urlPattern.test(html)) {
    throw new Error(
      `[generate-og] No ${OG.sourceFile} URLs found in index.html to patch.`,
    );
  }

  urlPattern.lastIndex = 0;
  const patched = html.replace(urlPattern, imageUrl);
  if (patched === html) {
    console.log(`[generate-og] index.html cache bust unchanged (?v=${hash})`);
    return;
  }

  await writeFile(INDEX_HTML, patched);
  console.log(`[generate-og] Patched index.html cache bust ?v=${hash}`);
}

async function main() {
  let png;
  try {
    png = await readFile(SOURCE);
  } catch {
    throw new Error(`[generate-og] Missing source asset: public/${OG.sourceFile}`);
  }

  warnSize(`public/${OG.sourceFile}`, png.length);
  console.log(`[generate-og] Using public/${OG.sourceFile} (${png.length} bytes, ${OG.width}×${OG.height})`);

  await patchIndexHtmlCacheBust(png);

  await mkdir(dirname(GITHUB_OUT), { recursive: true });
  await copyFile(SOURCE, GITHUB_OUT);
  console.log(`[generate-og] Copied to ${GITHUB_OUT}`);
}

main().catch((err) => {
  console.error('[generate-og] Failed:', err);
  process.exit(1);
});
