export default class HeaderController {
  constructor(themeService) {
    this.themeService = themeService;
    this.document = window.document;
  }

  addEventListeners() {
    this.document.querySelector('.header__them-switcher--light').addEventListener('click', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.themeService.set('dark')
    });

    this.document.querySelector('.header__them-switcher--dark').addEventListener('click', () => {
      document.documentElement.removeAttribute('data-theme');
      this.themeService.set('light')
    });
  }

  init() {
    const theme = this.themeService.get();
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    this.addEventListeners();
  }

  static bootstrap({themeService}) {
    new HeaderController(themeService).init();
  }
}
