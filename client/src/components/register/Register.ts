import GameCanvas from "../../game/GameCanvas";
import { openLogin } from "../../index";
import { setUserAuthorized } from "../../utils/db";
import { BaseComponent } from "../BaseComponent";
import './register.scss';

export class Register extends BaseComponent {
    constructor() {
        super('div', 'new');
        this.element.innerHTML = `
          <button class="btn new__btn" id="btnNew">Begin game</button>
          <button class="btn btn--out new__btn">Sign out</button>
        `;

        const btnOut: HTMLElement | null = this.element.querySelector('.btn--out');
        const btnNew: HTMLElement | null = this.element.querySelector('#btnNew');

        if (btnOut !== null) {
          btnOut.addEventListener('click', () => {
            setUserAuthorized(0);
            openLogin();
          });
        }

        if (btnNew !== null) {
          btnNew.addEventListener('click', () => {
            this.element.remove();
            const gameCanvas = new GameCanvas(document.body);
          });
        }
    }
}