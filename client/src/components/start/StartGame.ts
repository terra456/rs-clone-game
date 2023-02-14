import { openLogin } from "../../index";
import { BaseComponent } from "../BaseComponent";
import './start.scss';

export class StartGame extends BaseComponent {
    constructor() {
        super('div', 'start_game');
        this.element.innerHTML = `
          <button class="btn start_game__btn">Continue game</button>
          <button class="btn start_game__btn">Load game</button>
          <button class="btn start_game__btn">New game</button>
          <button class="btn btn--out start_game__btn">Sign out</button>
        `;

        const btnOut: HTMLElement | null = this.element.querySelector('.btn--out');
        if (btnOut !== null) {
          btnOut.addEventListener('click', () => {
            openLogin();
          });
        }
    }
}