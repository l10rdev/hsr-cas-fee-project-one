import { TaskController } from './controllers/task-controller.js';
import { TaskService} from './services/task-service.js';
import { HeaderController } from './controllers/header-controller.js';

const routes = {
    '/': TaskController,
};

const services = {
    taskService: new TaskService(),
};

document.addEventListener('DOMContentLoaded', () => {
    const location = window.location.href.split('/').splice(3).join('/') || '/';

    HeaderController.bootstrap();

    routes[location].bootstrap(services);
});


//TODO Movo To Controller when Created
