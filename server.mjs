import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import * as Task from './models/task.mjs';


const dirname = path.resolve();

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/v1/tasks', async (_req, res) => {
  res.send(await Task.getAll());
});

app.get('/v1/tasks/:id', async (req, res) => {
  res.send(await Task.getById(req.params.id));
});

app.post('/v1/tasks', async (req, res) => {
  const { body } = req;

  if (!body.title || !body.dueDate || !body.priority || !body.description) {
    return res.sendStatus(400);
  }

  await Task.create(body);
  return res.send({});
});

app.put('/v1/tasks/:id', async (req, res) => {
  await Task.update(req.params.id, req.body);
  res.send({});
});

app.use('/', express.static(`${dirname}/public`));

app.get('*', (req, res) => {
  res.sendfile(`${dirname}/public/index.html`);
});


app.listen(port);
