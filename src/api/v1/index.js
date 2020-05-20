const routes = require('express').Router();
const taskRoutes = require('./tasks');

routes.use('/tasks', taskRoutes);

module.exports = routes;
