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

async function isElementInView(page, id) {
  return page.evaluate((elId) => {
    const el = document.getElementById(elId);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.9 && rect.bottom > 64;
  }, id);
}

async function runJourneyPass(browser, failures) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  try {
    await page.goto(`${BASE}/#anatomizer`, { waitUntil: 'networkidle', timeout: 30000 });
  } catch {
    console.error(`Failed to load ${BASE}. Start preview first: npm run preview`);
    process.exit(1);
  }

  await page.evaluate(() => {
    window.location.hash = 'anatomizer-builder';
  });
  await page.waitForTimeout(400);
  const builderState = await page.evaluate(() => {
    const panel = document.getElementById('panel-anatomizer');
    return {
      hidden: panel?.hasAttribute('hidden') ?? true,
      builder: Boolean(document.getElementById('anatomizer-builder')),
    };
  });
  if (builderState.hidden || !builderState.builder) {
    failures.push({ check: '#anatomizer-builder keeps Prompt Builder panel', ...builderState });
  }

  // Fresh document: same-page hashchange to #method keeps the current tab by design.
  await page.goto('about:blank');
  await page.goto(`${BASE}/#method`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(800);
  const methodInView = await isElementInView(page, 'method');
  const ecoSelected = await page
    .getByRole('tablist', { name: 'Site sections' })
    .getByRole('tab', { name: 'Ecosystem', exact: true })
    .getAttribute('aria-selected');
  if (!methodInView || ecoSelected !== 'true') {
    failures.push({
      check: '/#method scrolls to method with ecosystem tab',
      methodInView,
      ecoSelected,
    });
  }

  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
  await page.getByRole('button', { name: /Explore the ecosystem/i }).click();
  await page.waitForTimeout(600);
  const exploreInView = await isElementInView(page, 'main-content');
  if (!exploreInView) {
    failures.push({ check: 'Explore the ecosystem scrolls to #main-content' });
  }

  await page.goto(`${BASE}/#faq`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: 'Prompt Anatomy home' }).click();
  await page.waitForTimeout(600);
  const homeInView = await isElementInView(page, 'main-content');
  const faqStuck = await page.evaluate(() => {
    const faq = document.getElementById('faq');
    if (!faq) return false;
    const rect = faq.getBoundingClientRect();
    return Math.abs(rect.top) < 80;
  });
  if (!homeInView || faqStuck) {
    failures.push({ check: 'logo from /#faq returns to map', homeInView, faqStuck });
  }

  await context.close();
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

  await runJourneyPass(browser, failures);

  await browser.close();

  if (failures.length) {
    console.error('VIEWPORT QA FAILED:\n', JSON.stringify(failures, null, 2));
    process.exit(1);
  }

  console.log(
    'VIEWPORT QA PASSED: no horizontal overflow at 320 / 360 / 390 / 430 / 768 / 1280 on all tabs + footer; 1280 journey pass ok.',
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
