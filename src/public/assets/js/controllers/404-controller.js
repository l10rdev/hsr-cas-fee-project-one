export default class NotFoundController {
  constructor() {
    this.template = `
<div>
    <section class="container">
        <h1 class="welcome-message">404</h1>
   </section>
`;

    this.container = document.querySelector('#main');
    this.templateCompiled = Handlebars.compile(this.template);
  }

  async init() {
    this.renderTaskView();
  }

  async renderTaskView() {
    this.container.innerHTML = this.templateCompiled();
  }

  static async bootstrap() {
    await new NotFoundController().init();
  }
}
