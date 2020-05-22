export default class ThemeService {
  constructor(service) {
    this.service = service;
  }

 set(theme) {
    this.service.set('theme', theme);
 }

 get() {
   return this.service.get('theme');
 }
}
