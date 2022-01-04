import puppeteer from 'puppeteer';
import config from '../config.mjs';

let browserWSEndpoint = null;

async function init() {
  if (!browserWSEndpoint) {
    const browser = await puppeteer.launch({ headless: config.headless });
    browserWSEndpoint = await browser.wsEndpoint();
  }
}

async function render(url) {
  const start = Date.now();

  const browser = await puppeteer.connect({ browserWSEndpoint });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // Optimizations
  await page.setRequestInterception(true);

  page.on('request', (req) => {
    // 2. Ignore requests for resources that don't produce DOM
    const allowlist = ['document', 'script', 'xhr', 'fetch'];
    if (!allowlist.includes(req.resourceType())) {
      return req.abort();
    }

    // 3. Pass through all other requests.
    return req.continue();
  });

  try {
    await page.goto(url, { waitUntil: 'load' });
    const renderTime = Date.now() - start;
    const screenshot = await page.screenshot({ encoding: 'base64' });
    const html = await page.content();
    await page.close();
    return { renderTime, html, screenshot };
  } catch (error) {
    await page.close();
    return { error: error.message };
  }
}

export { init, render };
