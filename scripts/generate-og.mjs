/**
 * Build-time OG image — 1200×630 PNG via Satori + resvg.
 * Run: npm run generate:og  (also runs as prebuild)
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'public', 'og-image.png');

const HEADLINE = 'Structured AI. Repeatable Teams.';
const DOMAIN = 'promptanatomy.site';

async function loadInterFont(weight = 400) {
  const file =
    weight >= 700
      ? 'inter-latin-800-normal.woff'
      : weight >= 600
        ? 'inter-latin-600-normal.woff'
        : 'inter-latin-400-normal.woff';
  const path = join(ROOT, 'node_modules', '@fontsource', 'inter', 'files', file);
  return readFile(path);
}

function ogTemplate() {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#0b1320',
        backgroundImage:
          'linear-gradient(135deg, rgba(207,167,58,0.08) 0%, transparent 50%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '100% 100%, 32px 32px, 32px 32px',
        padding: '72px 80px',
        fontFamily: 'Inter',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    width: '8px',
                    height: '48px',
                    backgroundColor: '#cfa73a',
                    borderRadius: '4px',
                  },
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '22px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#cfa73a',
                  },
                  children: 'Prompt Anatomy',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              fontSize: '64px',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              maxWidth: '900px',
            },
            children: HEADLINE,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              marginTop: '28px',
              fontSize: '24px',
              fontWeight: 500,
              fontFamily: 'monospace',
              color: '#94a3b8',
              letterSpacing: '0.02em',
            },
            children: DOMAIN,
          },
        },
      ],
    },
  };
}

async function main() {
  const [font400, font700, font800] = await Promise.all([
    loadInterFont(400),
    loadInterFont(700),
    loadInterFont(800),
  ]);
  const fonts = [
    { name: 'Inter', data: font400, weight: 400, style: 'normal' },
    { name: 'Inter', data: font700, weight: 700, style: 'normal' },
    { name: 'Inter', data: font800, weight: 800, style: 'normal' },
  ];

  const svg = await satori(ogTemplate(), {
    width: 1200,
    height: 630,
    fonts,
  });

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const png = resvg.render().asPng();

  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, png);
  console.log(`[generate-og] Wrote ${OUT} (${png.length} bytes)`);
}

main().catch((err) => {
  console.error('[generate-og] Failed:', err);
  process.exit(1);
});
