import Browser from 'zombie';

let browser = null;

async function init() {
  if (!browser) {
    browser = new Browser();
  }
}

const request = (url) =>
  new Promise((resolve, reject) => {
    browser.visit(encodeURI(url), () => {
      if (browser.error) {
        reject(browser.error);
      }
      resolve(browser.source);
    });
  });

async function render(url) {
  try {
    const start = Date.now();
    const html = await request(url);
    const renderTime = Date.now() - start;
    return { html, renderTime };
  } catch (error) {
    return { error };
  }
}

export { init, render };
