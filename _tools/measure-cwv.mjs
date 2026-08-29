/**
 * Core Web Vitals measurement for the Tavernaki site.
 *
 * Drives the already-installed Puppeteer against the local server and reports
 * LCP, CLS, FCP, TBT, request count and transfer weight for mobile + desktop.
 *
 *   node serve.mjs                                  # in another terminal
 *   node _tools/measure-cwv.mjs http://localhost:3000
 *   node _tools/measure-cwv.mjs http://localhost:3000 --json > before.json
 *
 * Caveat: transfer sizes are measured against the local server, which serves
 * uncompressed and unthrottled. Treat them as a relative before/after signal,
 * not as production numbers — use PageSpeed Insights on the deployed URL for
 * field-accurate figures.
 */

import puppeteer from 'puppeteer';

const ORIGIN = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
const AS_JSON = process.argv.includes('--json');

const ROUTES = ['/', '/menu', '/about', '/contact', '/parties'];

const PROFILES = {
  mobile: {
    viewport: { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
    // Roughly Moto G Power on Slow 4G, matching Lighthouse's mobile preset
    cpuThrottling: 4,
    network: { downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8, latency: 150 },
  },
  desktop: {
    viewport: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
    cpuThrottling: 1,
    network: { downloadThroughput: (10 * 1024 * 1024) / 8, uploadThroughput: (10 * 1024 * 1024) / 8, latency: 40 },
  },
};

/** Injected before any page script; collects vitals via PerformanceObserver. */
function installCollectors() {
  window.__vitals = { lcp: 0, cls: 0, longTasks: 0, lcpElement: null };

  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const last = entries[entries.length - 1];
    window.__vitals.lcp = last.startTime;
    window.__vitals.lcpElement = last.element
      ? `${last.element.tagName.toLowerCase()}${last.element.className ? '.' + String(last.element.className).split(' ')[0] : ''}`
      : last.url || null;
  }).observe({ type: 'largest-contentful-paint', buffered: true });

  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // Only shifts without recent user input count toward CLS
      if (!entry.hadRecentInput) window.__vitals.cls += entry.value;
    }
  }).observe({ type: 'layout-shift', buffered: true });

  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // Total Blocking Time: the portion of each long task beyond 50ms
      window.__vitals.longTasks += Math.max(0, entry.duration - 50);
    }
  }).observe({ type: 'longtask', buffered: true });
}

async function measure(browser, route, profile) {
  const page = await browser.newPage();
  const client = await page.createCDPSession();

  await page.setViewport(profile.viewport);
  await client.send('Network.enable');
  await client.send('Network.emulateNetworkConditions', { offline: false, ...profile.network });
  await client.send('Emulation.setCPUThrottlingRate', { rate: profile.cpuThrottling });

  await page.evaluateOnNewDocument(installCollectors);

  const consoleErrors = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 160)); });
  page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${String(e).slice(0, 160)}`));

  await page.goto(ORIGIN + route, { waitUntil: 'networkidle2', timeout: 120000 });
  // Let late layout shifts and deferred media settle
  await new Promise((r) => setTimeout(r, 4000));

  const result = await page.evaluate(() => {
    const res = performance.getEntriesByType('resource');
    const nav = performance.getEntriesByType('navigation')[0] || {};
    const fcp = performance.getEntriesByName('first-contentful-paint')[0];
    const byType = {};
    for (const r of res) {
      const key = r.initiatorType || 'other';
      byType[key] = (byType[key] || 0) + (r.transferSize || 0);
    }
    return {
      lcpMs: Math.round(window.__vitals.lcp),
      lcpElement: window.__vitals.lcpElement,
      cls: Number(window.__vitals.cls.toFixed(4)),
      tbtMs: Math.round(window.__vitals.longTasks),
      fcpMs: fcp ? Math.round(fcp.startTime) : null,
      ttfbMs: Math.round((nav.responseStart || 0) - (nav.requestStart || 0)),
      domInteractiveMs: Math.round(nav.domInteractive || 0),
      requests: res.length,
      transferKB: Math.round(res.reduce((a, r) => a + (r.transferSize || 0), 0) / 1024),
      byTypeKB: Object.fromEntries(
        Object.entries(byType)
          .map(([k, v]) => [k, Math.round(v / 1024)])
          .filter(([, v]) => v > 0)
          .sort((a, b) => b[1] - a[1])
      ),
      images: document.images.length,
      imagesWithoutDims: [...document.images].filter((i) => !i.getAttribute('width') || !i.getAttribute('height')).length,
    };
  });

  result.consoleErrors = consoleErrors;
  await page.close();
  return result;
}

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const report = { origin: ORIGIN, measuredAt: new Date().toISOString(), profiles: {} };

for (const [name, profile] of Object.entries(PROFILES)) {
  report.profiles[name] = {};
  for (const route of ROUTES) {
    report.profiles[name][route] = await measure(browser, route, profile);
  }
}

await browser.close();

if (AS_JSON) {
  console.log(JSON.stringify(report, null, 2));
} else {
  // Google's "good" thresholds
  const flag = (v, good, poor) => (v <= good ? 'good' : v <= poor ? 'needs-work' : 'POOR');
  console.log(`\nCore Web Vitals — ${ORIGIN}`);
  console.log(`${report.measuredAt}\n${'='.repeat(78)}`);
  for (const [name, routes] of Object.entries(report.profiles)) {
    console.log(`\n### ${name.toUpperCase()}`);
    console.log(
      `${'route'.padEnd(10)} ${'LCP'.padStart(9)} ${'CLS'.padStart(8)} ${'TBT'.padStart(8)} ${'FCP'.padStart(8)} ${'reqs'.padStart(5)} ${'weight'.padStart(9)}`
    );
    for (const [route, m] of Object.entries(routes)) {
      console.log(
        `${route.padEnd(10)} ${(m.lcpMs + 'ms').padStart(9)} ${String(m.cls).padStart(8)} ${(m.tbtMs + 'ms').padStart(8)} ${(m.fcpMs + 'ms').padStart(8)} ${String(m.requests).padStart(5)} ${(m.transferKB + 'KB').padStart(9)}   ${flag(m.lcpMs, 2500, 4000)}/${flag(m.cls, 0.1, 0.25)}`
      );
    }
    const home = routes['/'];
    if (home) console.log(`\n  / payload by type: ${JSON.stringify(home.byTypeKB)}`);
    if (home?.lcpElement) console.log(`  / LCP element: ${home.lcpElement}`);
  }
  const allErrors = new Set();
  for (const routes of Object.values(report.profiles))
    for (const m of Object.values(routes)) m.consoleErrors.forEach((e) => allErrors.add(e));
  if (allErrors.size) {
    console.log(`\n### CONSOLE ERRORS (${allErrors.size} unique)`);
    for (const e of allErrors) console.log(`  x ${e}`);
  }
  console.log('');
}
