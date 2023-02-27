import { openLogin } from "../../index";
import { setUserAuthorized } from "../../utils/db";
import { BaseComponent } from "../BaseComponent";
import './register.scss';

export class Register extends BaseComponent {
    constructor() {
        super('div', 'new');
        this.element.innerHTML = `
          <button class="btn new__btn">Begin game</button>
          <button class="btn btn--out new__btn">Sign out</button>
        `;

        const btnOut: HTMLElement | null = this.element.querySelector('.btn--out');
        if (btnOut !== null) {
          btnOut.addEventListener('click', () => {
            setUserAuthorized(0);
            openLogin();
          });
        }
    }
}