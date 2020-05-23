const taskRoutes = require('express').Router();
const TaskService = require('../../services/task.service');

taskRoutes.get('/', async (_req, res) => {
  try {
    return res.send(await TaskService.getAll());
  } catch (e) {
    return res.sendStatus(500);
  }
});

taskRoutes.get('/:id', async (req, res) => {
  try {
    return res.send(await TaskService.getById(req.params.id));
  } catch (_error) {
    return res.sendStatus(500);
  }
});

taskRoutes.post('/', async (req, res) => {
  const { body } = req;

  if (!body.title || !body.dueDate || !body.priority || !body.description) {
    return res.sendStatus(400);
  }

  try {
    await TaskService.create(body);
    return res.sendStatus(201);
  } catch (e) {
    return res.sendStatus(500);
  }
});

taskRoutes.put('/:id', async (req, res) => {
  try {
    await TaskService.update(req.params.id, req.body);
    return res.sendStatus(204);
  } catch (e) {
    return res.sendStatus(500);
  }
});

taskRoutes.delete('/:id', async (req, res) => {
  try {
    await TaskService.remove(req.params.id);
    return res.sendStatus(204);
  } catch (e) {
    return res.sendStatus(500);
  }
});

module.exports = taskRoutes;
