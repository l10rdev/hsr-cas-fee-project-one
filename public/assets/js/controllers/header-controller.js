export default class HeaderController {
  constructor() {
    this.document = window.document;
  }

  addEventListeners() {
    this.document.querySelector('.header__them-switcher--light').addEventListener('click', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    this.document.querySelector('.header__them-switcher--dark').addEventListener('click', () => {
      document.documentElement.removeAttribute('data-theme');
    });
  }

  init() {
    this.addEventListeners();
  }

  static bootstrap() {
    new HeaderController().init();
  }
}
