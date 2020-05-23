export default class TaskDetailController {
  constructor(taskService, router) {
    this.template = `
<div>
    <section class="container">
        <form id="task-form" class="task-form">
            <label class="task-form__label" for="title">Title:</label>
            <input class="task-form__input" type="text" name="title" id="title" required placeholder="Build Lego">
            
            <label class="task-form__label" for="dueDate">Due Date:</label>
            <input class="task-form__input" type="date" name="dueDate" required id="dueDate">
            
             <label class="task-form__label" for="description">Description:</label>
             <textarea class="task-form__textarea" name="description" required id="description"></textarea>
             
             <span  class="task-form__label">Priority:</span>
             <div class="task-form__radio-group">
                    <input class="radio-group__radio" type="radio" id="high-priority" required name="priority" value="1">             
                    <label class="radio-group__label" for="high-priority">High</label>
                
                    <input class="radio-group__radio" type="radio" id="medium-priority" required name="priority" value="2">             
                    <label class="radio-group__label" for="medium-priority">Medium</label>
                
                    <input class="radio-group__radio" type="radio" id="low-priority" required name="priority" value="3">             
                    <label class="radio-group__label" for="low-priority">Low</label>
             </div>
          


            
            <button class="btn task-form__submit">Speichern</button>
       </form>
   </section>
`;

    this.taskService = taskService;
    this.router = router;
    this.editingTask = null;
    this.container = document.querySelector('#main');
    this.templateCompiled = Handlebars.compile(this.template);
  }

  async registerEvenListener() {
    document.querySelector('#task-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const a = {
        title: event.target.title.value,
        dueDate: event.target.dueDate.value,
        description: event.target.description.value,
        priority: event.target.priority.value,
      };

      try {
        if (this.editingTask) {
          await this.taskService.update({ ...this.editingTask, ...a });
        } else {
          await this.taskService.create(a);
        }
        this.router.navigate('home');
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert('An Error occurred. Pleas check your input and try again in couple minutes.');
      }
    });
  }

  async init() {
    this.renderTaskView();

    const idParam = window.location.hash.slice(1).split(':')[1] || null;
    if (idParam) {
      this.editingTask = await this.taskService.getById(idParam);
      this.fillForm(this.editingTask);
    }

    this.registerEvenListener();
  }

  fillForm(task) {
    this.form.title.value = task.title;
    this.form.dueDate.value = task.dueDate;
    this.form.description.value = task.description;
    this.form.priority.value = task.priority;
  }

  async renderTaskView() {
    this.container.innerHTML = this.templateCompiled();
    this.form = document.getElementById('task-form');
  }

  static async bootstrap({ taskService, router }) {
    await new TaskDetailController(taskService, router).init();
  }
}
