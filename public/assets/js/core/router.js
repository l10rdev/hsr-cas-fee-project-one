export default class Router {
  // eslint-disable-next-line class-methods-use-this
  navigate(page) {
    window.location = `#${page}`;
  }
}
