import { sortTasks } from '../helpers.js';

export default class TaskListController {
  constructor(taskService, router, localStorageService) {
    this.template = `
<div>
    <section class="container">
        <h1 class="welcome-message">{{renderGreeting}} <br /> Get your tasks done!</h1>
        <hr class="space-bar">
        <div class="filters">
            <div class="filters__order-filter">
                <input type="radio" class="order-filter__radio" id="due-date" name="order-filter" value="dueDate" {{#ifEquals orderStrategy "dueDate"}} checked {{/ifEquals}}>
                <label class="order-filter__label" for="due-date"> Due Date</label>
                <input type="radio"  class="order-filter__radio" id="creation-date" name="order-filter" value="creationDate"   {{#ifEquals orderStrategy "creationDate"}} checked {{/ifEquals}}>
                <label class="order-filter__label" for="creation-date">Creation Date</label>
                <input type="radio"  class="order-filter__radio" id="priority" name="order-filter" value="priority"  {{#ifEquals orderStrategy "priority"}} checked {{/ifEquals}}>
                <label class="order-filter__label" for="priority">Priority</label>
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
                            <div class="task__priority">
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
                              <button class="action action__state-toggle" data-id="{{_id}}" data-action="toggleState">Reopen</button>
                             {{else}}
                             <button class="action action__state-toggle" data-id="{{_id}}" data-action="toggleState">Set Complete</button>
                             {{/if}}
                            |
                            <button class="action action__edit" data-id="{{_id}}" data-action="edit">Edit</button>
                            |
                            <button class="action action__delete" data-id="{{_id}}" data-action="delete">Delete</button>
                        </div>

                        <div class="task__creation">
                           {{renderCreatedAt createdAt}}
                        </div>
                    </div>
                </div>
            {{/each}}
        {{else}}
            <div class="task-list__block--empty">
                <img class="task-list__block-image" src="assets/img/complete.svg" alt="Everything Completed"  on/>
                You have no task. <br /> Enjoy your free day.
            </div>
        {{/if}}
    </div>
    </div>
    <button id="add-task-button" class="btn add-button">+</button>
`;

    this.localStorageService = localStorageService;
    this.taskService = taskService;
    this.router = router;
    this.taskTemplateCompiled = Handlebars.compile(this.template);
    this.taskContainer = document.querySelector('#main');
    this.visibleTasks = [];
    this.orderStrategy = localStorageService.get('orderStrategy') || 'dueDate';
    this.includingDoneTask = false;
  }

  initEventListeners() {
    document.querySelector('#including-done-task-switch').addEventListener('click', () => this.toggleIncludingDoneTasks());
    document.querySelector('#add-task-button').addEventListener('click', () => this.navigateToDetail());

    document.querySelector('.filters__order-filter').addEventListener('click', (event) => {
      const orderStrategy = event.target.value;
      if (orderStrategy) {
        this.orderStrategy = orderStrategy;
        this.localStorageService.set('orderStrategy', orderStrategy)
        this.visibleTasks = [];
        this.renderTaskView();
      }
    });

    document.querySelector('.task-list').addEventListener('click', (event) => {
      const { action, id } = event.target.dataset;
      if (!action || !id) {
        return;
      }

      const targetTask = this.tasks.find((task) => task._id === id);

      switch (action) {
        case 'toggleState':
          this.taskDoneToggle(targetTask);
          break;
        case 'edit':
          this.navigateToDetail(targetTask._id);
          break;
        case 'delete':
          this.deleteTask(targetTask);
          break;
        default:
          throw new Error('unexpected action');
      }
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

  async deleteTask(task) {
    // Optimistic Update
    this.tasks = this.tasks.filter((a) => a._id !== task._id);
    this.renderTaskView();

    try {
      await this.taskService.delete(task);
    } catch (e) {
      // Undo Optimistic Update
      this.tasks = [...this.tasks, task];
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

  static async bootstrap({ taskService, router, localStorageService }) {
    await new TaskListController(taskService, router, localStorageService).init();
  }
}
