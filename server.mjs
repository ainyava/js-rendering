import express from 'express';
import mustacheExpresss from 'mustache-express';
import config from './config.mjs';
import { init, render } from './renderers/zombie.mjs';

const app = express();
app.engine('mustache', mustacheExpresss());
app.set('view engine', 'mustache');
app.use(express.static('public'));

init().then().catch();

app.get('/', (req, res) => res.render('index'));

app.get('/render', async (req, res) => {
  const renderResult = await render(req.query.url);
  return res.status(200).json(renderResult);
});

app.listen(config.port, () => console.log(`Listening on port ${config.port}...`));
