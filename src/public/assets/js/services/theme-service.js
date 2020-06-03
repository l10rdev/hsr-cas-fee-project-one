export default class ThemeService {
  constructor(service) {
    this.service = service;
    this.set(this.service.get('theme'));
  }

  set(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    this.service.set('theme', theme);
  }

  get() {
    return this.service.get('theme');
  }
}
