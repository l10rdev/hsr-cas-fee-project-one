import { TaskController } from './controllers/task-controller.js';
import {TaskService} from './services/task-service.js';

document.addEventListener('DOMContentLoaded', TaskController.bootstrap({
    taskService: new TaskService(),
}));

//TODO Movo To Controller when Created
document.querySelector('.header__them-switcher--light').addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
});

document.querySelector('.header__them-switcher--dark').addEventListener('click', () => {
    document.documentElement.removeAttribute('data-theme');
});
