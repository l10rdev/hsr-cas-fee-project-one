import TaskService from './services/task-service.js';
import ThemeService from './services/theme-service.js';
import * as LocalStorageService from './services/local-service.js';
import HttpService from './services/http-service.js';
import * as Router from './core/router.js';

import HeaderController from './controllers/header-controller.js';
import TaskListController from './controllers/task-list-controller.js';
import NotFoundController from './controllers/404-controller.js';
import TaskDetailController from './controllers/task-detail-controller.js';

const routes = {
  home: TaskListController,
  404: NotFoundController,
  task: TaskDetailController,
};

const services = {
  taskService: new TaskService(new HttpService(), '/api/v1/tasks'),
  router: Router,
  themeService: new ThemeService(LocalStorageService),
};

document.addEventListener('DOMContentLoaded', () => {
  HeaderController.bootstrap(services);
  (routes[Router.getCurrentLocation() || 'home'] || routes['404']).bootstrap(services);
});

window.addEventListener('hashchange', () => {
  (routes[Router.getCurrentLocation() || 'home'] || routes['404']).bootstrap(services);
});
