import express from 'express';
import mustacheExpresss from 'mustache-express';
import config from './config.mjs';
import { init as jsdomInit, render as jsdomRender } from './renderers/jsdom.mjs';
import { init as zombieInit, render as zombieRender } from './renderers/zombie.mjs';
import { init as puppeteerInit, render as puppeteerRender } from './renderers/basicPuppeteer.mjs';
import {
  init as optimizedPuppeteerInit,
  render as optimizedPuppeteerRender,
} from './renderers/optimizedPuppeteer.mjs';

// Configure renderers
const renderers = {
  jsdom: [jsdomInit, jsdomRender],
  zombie: [zombieInit, zombieRender],
  puppeteer: [puppeteerInit, puppeteerRender],
  optimizedPuppeteer: [optimizedPuppeteerInit, optimizedPuppeteerRender],
};
// Setup express
const app = express();
app.engine('mustache', mustacheExpresss());
app.set('view engine', 'mustache');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('index'));

app.get('/render', async (req, res) => {
  console.log(`Render request: ${req.query.url}`);
  const [init, render] = renderers[req.query.renderer || 'jsdom'];
  await init();
  return res.status(200).json(await render(req.query.url));
});

app.listen(config.port, () => console.log(`Listening on port ${config.port}...`));
