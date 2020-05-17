import { TaskController } from './controllers/task-controller.js';
import { TaskService} from './services/task-service.js';
import { HeaderController } from './controllers/header-controller.js';
import HttpService from './services/http-service.js';
import {NotFoundController} from './controllers/404-controller.js';
import {TaskDetailController} from './controllers/task-detail-controller.js';
import {Router} from './core/router.js';

const routes = {
    'home': TaskController,
    '404': NotFoundController,
    'task': TaskDetailController,
};

const services = {
    taskService: new TaskService(new HttpService()),
    router: new Router(),
};

document.addEventListener('DOMContentLoaded', () => {
    const location = window.location.hash.slice(1).split(':')[0] || 'home';

    HeaderController.bootstrap();
    (routes[location] || routes['404']).bootstrap(services);
});

window.addEventListener('hashchange', (event) => {
   const location = window.location.hash.slice(1).split(':')[0] || 'home';
   console.log(window.location.hash);
   (routes[location] || routes['404']).bootstrap(services);
});

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('createdAtText', function(createdAt) {
    const createdAtMoment = moment(createdAt);
    const now = moment();

    const dayAgo = now.startOf('day').diff(createdAtMoment.startOf('day'), 'days');

    return dayAgo > 2 ? `Created at ${createdAtMoment.format('DD.MM.YYYY')}` : `Created ${createdAtMoment.fromNow()}`;

});

Handlebars.registerHelper('renderPriority', function(priority) {
    const priorityMap = {
        1: 'High',
        2: 'Medium',
        3: 'Low',
        'default': 'Low',
    };

    return priorityMap[priority] || priorityMap['defalt'];
});

Handlebars.registerHelper('renderDueDate', function(dueDate) {
    const dueDateMoment = moment(dueDate);
    const now = moment();

    const dayDifference = dueDateMoment.startOf('day').diff(now.startOf('day'), 'days');

    console.log(dueDateMoment);
    console.log(now);
    console.log(dayDifference);

    if(dayDifference === 0 ) {
        return 'Due until today';
    }
    if(dayDifference === 1 ) {
        return 'Due until tomorrow';
    }
    if(dayDifference === -1 ) {
        return 'Due until yesterday';
    }

   return `Due until ${dueDateMoment.format('DD.MM.YYYY')}`;
});

Handlebars.registerHelper('renderStatus', function(dueDate, isDone) {
    if (isDone) {
        return new Handlebars.SafeString('<div class="task__status task__status--done">Done</div>');
    }
    const dueDateMoment = moment(dueDate);
    const now = moment();

    const dayDifference = dueDateMoment.startOf('day').diff(now.startOf('day'), 'days');

    if (dayDifference < 0) {
        return new Handlebars.SafeString('<div class="task__status task__status--late">Late</div>');
    }

    return new Handlebars.SafeString('<div class="task__status task__status--open">Open</div>');
});


//TODO Movo To Controller when Created
