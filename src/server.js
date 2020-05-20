const bodyParser = require('body-parser');
const cron = require('node-cron');
const express = require('express');
const path = require('path');
const apiRoutes = require('./api/v1');
const TaskService = require('./services/task.service');

const dirname = path.resolve();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(`${dirname}/src/public`));
app.use('/api/v1', apiRoutes);
app.get('*', (req, res) => res.sendfile(`${dirname}/src/public/index.html`));

cron.schedule('00 00 * * *', () => TaskService.clearAll());

app.listen(port);
