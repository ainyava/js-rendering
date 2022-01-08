import { JSDOM } from 'jsdom';
import axios from 'axios';

async function init() {}

async function render(url) {
  try {
    const start = Date.now();
    const req = await axios.get(encodeURI(url));
    const dom = new JSDOM(req.data, { runScripts: 'dangerously' });
    const html = dom.window.document.documentElement.outerHTML;
    const renderTime = Date.now() - start;
    return { html, renderTime };
  } catch (error) {
    return { error };
  }
}

export { init, render };
