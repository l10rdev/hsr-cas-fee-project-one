
export class TaskController {
    template = `
<div class="container">
    <div class="filter">
            <div class="filter-order">
                <div class="filter-order--selector-wrapper">
                    <input type="radio" class="filter-order--radio" id="finish-date" name="filter-order" value="finish-date" checked="checked">
                    <label class="filter-order--label" for="finish-date"> By finish Date</label>
                </div>
                <div class="filter-order--selector-wrapper">
                    <input type="radio"  class="filter-order--radio" id="creation-date" name="filter-order" value="creation-date">
                    <label class="filter-order--label" for="creation-date">By created Date</label>
                </div>
                <div class="filter-order--selector-wrapper">
                    <input type="radio"  class="filter-order--radio" id="importance" name="filter-order" value="importance">
                    <label class="filter-order--label" for="importance">By Importance</label>
                </div>
            </div>
            <button class="btn btn-secondary filters__inOrExcluding-filter filters__inOrExcluding-filter--excluding">
                Include completed tasks.
            </button>
            <button class="btn btn-secondary filters__inOrExcluding-filter filters__inOrExcluding-filter--including">
                Exclude completed tasks.
            </button>
   </div>
    <div class="task-list">
        {{#if tasks}}
            {{#each tasks}}
                <div class="task-list__task">
                    <div class="task__status task__status--1"></div>
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
                            {{createdAt}}
                        </div>
                    </div>
                </div>
            {{/each}}
        {{else}}
            <div class="task-list--empty">
                <img class="theme-switcher--logo" src="assets/img/getan.svg" alt="Darth Vader"  />
                You have no task. <br /> Enjoy your free day.
            </div>
        {{/if}}
    </div>
    </div>
    <button class="btn add-button">+</button>
`;

    constructor(taskService) {
        this.taskService = taskService;
        /*this.taskTemplateCompiled = Handlebars.compile(
            document.querySelector('#tasklist-template').innerHTML
        );*/
        this.taskTemplateCompiled = Handlebars.compile(this.template);
        this.taskContainer = document.querySelector('#main');
    }

    init() {
        console.log('test');
        // setTimeout(() => this.renderTaskView(), 1000);
    }

    async renderTaskView() {
        this.taskContainer.innerHTML = this.taskTemplateCompiled({
            tasks: [{
                title: 'Lorem Impsum',
                priority: 'Low',
                dueDate: '14.05.2020',
                createdAt: '10.04.2020',
            }, {
                title: 'Lorem Impsum 2',
                priority: 'Low',
                dueDate: '14.05.2020',
                createdAt: '10.04.2020',
            }]
        });
    }

    static bootstrap({taskService}) {
        new TaskController(taskService).init()
    }
}
