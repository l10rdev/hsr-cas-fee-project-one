export class HeaderController {

   addEventListeners() {
        document.querySelector('.header__them-switcher--light').addEventListener('click', () => {
            document.documentElement.setAttribute('data-theme', 'dark');
        });

        document.querySelector('.header__them-switcher--dark').addEventListener('click', () => {
            document.documentElement.removeAttribute('data-theme');
        });

    }

    init() {
        this.addEventListeners();
    }

    static bootstrap() {
        new HeaderController().init()
    }
}
