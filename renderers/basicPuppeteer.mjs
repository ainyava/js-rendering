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

  try {
    await page.goto(url, { waitUntil: 'networkidle0' });
    const renderTime = Date.now() - start;
    const screenshot = await page.screenshot({ encoding: 'base64' });
    const html = await page.content();
    await page.close();
    return { html, renderTime, screenshot };
  } catch (error) {
    await page.close();
    return { error: error.message };
  }
}

export { init, render };
