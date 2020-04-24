import { TaskController } from './controllers/task-controller.js';
import {TaskService} from './services/task-service.js';

document.addEventListener('DOMContentLoaded', TaskController.bootstrap({
    taskService: new TaskService(),
}));
