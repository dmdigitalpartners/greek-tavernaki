import puppeteer from 'puppeteer';

const BASE = process.argv[2] || 'http://localhost:3050';
const paths = ['/', '/menu', '/about', '/parties', '/contact', '/nonexistent-page-test'];

async function run() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const p of paths) {
    const page = await browser.newPage();
    const issues = [];
    page.on('console', msg => { if (msg.type() === 'error') issues.push('CONSOLE ERROR: ' + msg.text()); });
    page.on('pageerror', err => issues.push('PAGE ERROR: ' + err.message));
    page.on('requestfailed', req => issues.push('REQUEST FAILED: ' + req.url() + ' (' + req.failure()?.errorText + ')'));
    page.on('response', res => { if (res.status() >= 400) issues.push('HTTP ' + res.status() + ': ' + res.url()); });
    try {
      await page.goto(BASE + p, { waitUntil: 'networkidle0', timeout: 30000 });
    } catch (e) {
      issues.push('NAVIGATION ERROR: ' + e.message);
    }
    console.log(`\n=== ${p} ===`);
    if (issues.length === 0) console.log('  clean');
    else issues.forEach(i => console.log('  ' + i));
    await page.close();
  }
  await browser.close();
}
run();
