import { TaskController } from './controllers/task-controller.js';
import { TaskService} from './services/task-service.js';
import { HeaderController } from './controllers/header-controller.js';
import HttpService from './services/http-service.js';
import {NotFoundController} from './controllers/404-controller.js';
import {TaskDetailController} from './controllers/task-detail-controller.js';

const routes = {
    '/': TaskController,
    '404': NotFoundController,
    'task': TaskDetailController,
};

const services = {
    taskService: new TaskService(new HttpService()),
};

document.addEventListener('DOMContentLoaded', () => {
    const location = window.location.href.split('/').splice(3).join('/') || '/';
    console.log(location);

    HeaderController.bootstrap();

    console.log('loocation', location);


    (routes[location] || routes['404']).bootstrap(services);
});

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

//TODO Movo To Controller when Created
