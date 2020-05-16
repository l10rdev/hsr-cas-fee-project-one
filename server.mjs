import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as Task from './models/task.mjs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/v1/tasks', async (_req, res) => {
    res.send(await Task.getAll())
});

app.post('/v1/tasks', async (req, res) => {
   await Task.create(req.body);
    res.sendStatus(200);
});

app.use('/', express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.sendfile(__dirname+'/public/index.html');
});

app.listen(port);
