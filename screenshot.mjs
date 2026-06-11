import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';
const outDir = './temporary screenshots';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

let n = 1;
while (fs.existsSync(path.join(outDir, `screenshot-${n}${label}.png`))) n++;
const outPath = path.join(outDir, `screenshot-${n}${label}.png`);

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle0' });

// Dismiss loader and trigger all scroll animations by scrolling through the page
await page.evaluate(() => {
    // Force loader gone immediately
    const loader = document.getElementById('loader');
    if (loader) { loader.style.opacity = '0'; loader.style.visibility = 'hidden'; }
    // Force all reveal animations in
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => el.classList.add('in'));
});

// Scroll through to ensure lazy images load and animations settle
await page.evaluate(async () => {
    await new Promise((resolve) => {
        let pos = 0;
        const step = 400;
        const timer = setInterval(() => {
            pos += step;
            window.scrollTo(0, pos);
            if (pos >= document.body.scrollHeight) {
                clearInterval(timer);
                window.scrollTo(0, 0);
                resolve();
            }
        }, 40);
    });
});

await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Screenshot saved: ${outPath}`);
