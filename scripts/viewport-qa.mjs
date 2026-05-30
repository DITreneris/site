/**
 * Viewport QA — checks horizontal overflow at 320 / 768 / 1280 on all three tabs.
 * Run: npm run preview (separate terminal) then node scripts/viewport-qa.mjs
 */
import { chromium } from 'playwright';

const BASE = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4173';
const VIEWPORTS = [
  { width: 320, height: 800, label: '320px' },
  { width: 360, height: 800, label: '360px' },
  { width: 390, height: 844, label: '390px' },
  { width: 430, height: 932, label: '430px' },
  { width: 768, height: 1024, label: '768px' },
  { width: 1280, height: 900, label: '1280px' },
];
const TABS = [
  { id: 'ecosystem', label: 'Ecosystem' },
  { id: 'anatomizer', label: 'Prompt Builder' },
  { id: 'maturity', label: 'Team Assessment' },
];

async function hasHorizontalOverflow(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth > doc.clientWidth + 1;
  });
}

async function clickTab(page, label, viewportWidth) {
  if (viewportWidth < 768) {
    const toggle = page.getByRole('button', { name: 'Toggle navigation' });
    const expanded = await toggle.getAttribute('aria-expanded');
    if (expanded !== 'true') {
      await toggle.click();
    }
  }
  const tab = page.getByRole('tab', { name: label, exact: true });
  await tab.first().click();
  await page.waitForTimeout(400);
}

async function main() {
  const browser = await chromium.launch();
  const failures = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    try {
      await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
    } catch (err) {
      console.error(`Failed to load ${BASE}. Start preview first: npm run preview`);
      process.exit(1);
    }

    for (const tab of TABS) {
      if (tab.id !== 'ecosystem') {
        await clickTab(page, tab.label, vp.width);
      }

      const overflow = await hasHorizontalOverflow(page);
      if (overflow) {
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        failures.push({
          viewport: vp.label,
          tab: tab.label,
          scrollWidth,
          clientWidth,
        });
      }
    }

    // Footer external links reachable (scroll to footer)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(200);
    const footerOverflow = await hasHorizontalOverflow(page);
    if (footerOverflow) {
      failures.push({
        viewport: vp.label,
        tab: 'Footer (scrolled)',
        scrollWidth: await page.evaluate(() => document.documentElement.scrollWidth),
        clientWidth: await page.evaluate(() => document.documentElement.clientWidth),
      });
    }

    await context.close();
  }

  await browser.close();

  if (failures.length) {
    console.error('VIEWPORT QA FAILED:\n', JSON.stringify(failures, null, 2));
    process.exit(1);
  }

  console.log('VIEWPORT QA PASSED: no horizontal overflow at 320 / 360 / 390 / 430 / 768 / 1280 on all tabs + footer.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
