import {compareByDueDate, compareByCreationDate, compareByImportance} from '../helpers.js';

export class TaskController {

    constructor(taskService) {
        this.template = `
<div>
    <section class="container">
        <h1 class="welcome-message">Good Morning! <br /> Get It Done</h1>
        <hr class="space-bar">
        <div class="filters">
            <div class="filters__order-filter">
                <input type="radio" class="order-filter__radio" id="finish-date" name="order-filter" value="finish-date" {{#ifEquals orderStrategy "finish-date"}} checked {{/ifEquals}}>
                <label class="order-filter__label" for="finish-date"> Due Date</label>
                <input type="radio"  class="order-filter__radio" id="creation-date" name="order-filter" value="creation-date"   {{#ifEquals orderStrategy "creation-date"}} checked {{/ifEquals}}>
                <label class="order-filter__label" for="creation-date">Creation Date</label>
                <input type="radio"  class="order-filter__radio" id="importance" name="order-filter" value="importance"  {{#ifEquals orderStrategy "importance"}} checked {{/ifEquals}}>
                <label class="order-filter__label" for="importance">Importance</label>
            </div>
                    
            <button id="including-done-task-switch" class="btn filters__inExcluding-filter {{#if includingDoneTask}} filters__inExcluding-filter--including {{else}} filters__inExcluding-filter--excluding {{/if}}">
               {{#if includingDoneTask}}Exclude completed tasks {{else}} Inclucde completed tasks{{/if}}
            </button>
        </div>
   </section>
   <div class="section-spacer"></div>
    <div class="container task-list">
        {{#if tasks}}
            {{#each tasks}}
                <div class="task">
                    <div class="task__status task__status--{{status}}"></div>
                    <div class="task__content">
                        <div class="task__header">
                            <div class="task__importance">
                                {{priority}}
                            </div>
                            <div class="task__due-date">
                                {{dueDate}}
                            </div>
                        </div>

                        <div class="task__title">
                            {{title}}
                        </div>

                        <div class="task__creation">
                            Created: {{createdAt}}
                        </div>
                    </div>
                </div>
            {{/each}}
        {{else}}
            <div class="task-list__block--empty">
                <img class="task-list__block-image" src="assets/img/getan.svg" alt="Darth Vader"  on/>
                You have no task. <br /> Enjoy your free day.
            </div>
        {{/if}}
    </div>
    </div>
    <button id="add-task-button" class="btn add-button">+</button>
`;

        this.taskService = taskService;
        console.log('servies', taskService);
        this.taskTemplateCompiled = Handlebars.compile(this.template);
        this.taskContainer = document.querySelector('#main');
        this.visibleTasks = [];
        this.orderStrategy = 'finish-date';
        this.includingDoneTask = false;
    }

    sortTasks(orderStrategy) {
        this.orderStrategy = orderStrategy;
        const orderStrategyMap = {
            'creation-date': compareByCreationDate,
            'importance': compareByImportance,
            'finish-date': compareByDueDate,
        };
        this.visibleTasks = [...this.visibleTasks].sort(orderStrategyMap[orderStrategy]);
        this.renderTaskView();
    }


    initEventListeners() {
        document.getElementById('add-task-button').addEventListener('click', () => this.addTask());
        document.getElementById('including-done-task-switch').addEventListener('click', () => this.toggleIncludingDoneTasks());
        const radios = document.getElementsByClassName('order-filter__radio');
        [...document.getElementsByClassName('order-filter__radio')].forEach(radio => {
            radio.onclick = () => {this.sortTasks(radio.value)}
        })
    }

    addTask() {
        let status = '';
        switch(this.tasks.length % 3) {
            case 0:
                status = 'ok';
                break;
            case 1:
                status = 'endanger';
                break;
            case 2:
                status = 'late';
                break;
        }

        this.tasks.push({
            title: 'Lorem Impsum',
            status: 'ok',
            priority: 'Low',
            dueDate: '14.05.2020',
            createdAt: '10.04.2020',
        });

        this.renderTaskView();
    }

    toggleIncludingDoneTasks() {
        this.includingDoneTask = !this.includingDoneTask;
        this.visibleTasks = this.tasks.filter(task => this.includingDoneTask || task.status !== 'done');
        this.renderTaskView();
    }

    async init() {
        this.tasks = await this.taskService.getAll();
        console.log('task', this.tasks);
        this.visibleTasks = this.tasks.filter(task => this.includingDoneTask || task.status !== 'done');
        this.renderTaskView();
    }

    async renderTaskView() {
        this.taskContainer.innerHTML = this.taskTemplateCompiled({
            includingDoneTask: this.includingDoneTask,
            tasks: this.visibleTasks,
            orderStrategy: this.orderStrategy,
        });
        this.initEventListeners();
    }

    static async bootstrap({taskService}) {
        await new TaskController(taskService).init()
    }
}
