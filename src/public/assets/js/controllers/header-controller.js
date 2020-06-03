export default class HeaderController {
  constructor(themeService) {
    this.themeService = themeService;
    this.document = window.document;
  }

  addEventListeners() {
    this.document.querySelector('.header__them-switcher--light').addEventListener('click', () => {
      this.themeService.set('dark');
    });

    this.document.querySelector('.header__them-switcher--dark').addEventListener('click', () => {
      this.themeService.set('light');
    });
  }

  init() {
    this.addEventListeners();
  }

  static bootstrap({ themeService }) {
    new HeaderController(themeService).init();
  }
}
