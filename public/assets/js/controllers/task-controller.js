import { sortTasks } from "../helpers.js";

export default class TaskController {
  constructor(taskService, router) {
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
                    <div class="task__content">
                        <div class="task__header">
                            <div class="task__importance">
                                {{renderPriority priority}}
                            </div>
                            {{renderStatus dueDate done}}
                        </div>

                        <div class="task__title">
                            {{title}}
                        </div>


                        <div>
                            {{renderDueDate dueDate}}
                        </div>

                        <div class="task__description">
                            {{description}}
                        </div>

                        <div class="task__actions">
                            {{#if done}}
                              <button class="action action__state-toggle" data-id="{{_id}}">Reopen</button>
                             {{else}}
                             <button class="action action__state-toggle" data-id="{{_id}}">Set Complete</button>
                             {{/if}}
                            |
                            <button class="action action__edit" data-id="{{_id}}">Edit</button>
                        </div>

                        <div class="task__creation">
                           {{createdAtText createdAt}}
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
    this.router = router;
    this.taskTemplateCompiled = Handlebars.compile(this.template);
    this.taskContainer = document.querySelector('#main');
    this.visibleTasks = [];
    this.orderStrategy = 'finish-date';
    this.includingDoneTask = false;
  }

  initEventListeners() {
    document.getElementById('including-done-task-switch').addEventListener('click', () => this.toggleIncludingDoneTasks());
    document.getElementById('add-task-button').addEventListener('click', () => this.navigateToDetail());

    document.getElementById('add-task-button').addEventListener('click', () => this.navigateToDetail());
    document.getElementById('add-task-button').addEventListener('click', () => this.navigateToDetail());

    [...document.getElementsByClassName('order-filter__radio')].forEach((radio) => {
      radio.onclick = () => {
        this.orderStrategy = radio.value;
        this.renderTaskView();
      };
    });

    [...document.getElementsByClassName('action__state-toggle')].forEach((task) => {
      task.onclick = () => {
        const a = this.tasks.find((b) => b._id === task.dataset.id);
        this.taskDoneToggle(a);
      };
    });

    [...document.getElementsByClassName('action action__edit')].forEach((task) => {
      task.onclick = () => {
        this.navigateToDetail(task.dataset.id);
      };
    });
  }

  async taskDoneToggle(task) {
    // Optimistic Update
    task.done = !task.done;
    this.renderTaskView();

    try {
      await this.taskService.update(task);
    } catch (e) {
      // Undo Optimistic Update
      task.done = !task.done;
      this.renderTaskView();
    }
  }

  toggleIncludingDoneTasks() {
    this.includingDoneTask = !this.includingDoneTask;
    this.renderTaskView();
  }

  navigateToDetail(id) {
    this.router.navigate(`task${id ? `:${id}` : ''}`);
  }

  async init() {
    this.tasks = await this.taskService.getAll();
    this.renderTaskView();
  }

  async renderTaskView() {
    this.visibleTasks = this.tasks.filter((task) => this.includingDoneTask || !task.done);
    this.visibleTasks = sortTasks(this.visibleTasks, this.orderStrategy);
    this.taskContainer.innerHTML = this.taskTemplateCompiled({
      includingDoneTask: this.includingDoneTask,
      tasks: this.visibleTasks,
      orderStrategy: this.orderStrategy,
    });
    this.initEventListeners();
  }

  static async bootstrap({ taskService, router }) {
    await new TaskController(taskService, router).init();
  }
}
