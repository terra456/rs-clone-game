import { IGame } from './../../utils/types';
import { openLogin } from "../../index";
import { getSavedGames, setUserAuthorized } from "../../utils/db";
import { BaseComponent } from "../BaseComponent";
import './start.scss';

export class StartGame extends BaseComponent {
    constructor() {
        super('div', 'start_game');
        this.element.innerHTML = `
          <div class="start_game__controls">
          <button class="btn start_game__btn">Continue game</button>
          <button class="btn start_game__btn" id="btnLoad">Load game</button>
          <button class="btn start_game__btn">New game</button>
          <button class="btn btn--out start_game__btn">Sign out</button>
          </div>
          <div class="start_game__loaded start_game__loaded--invisible">
          </div>
        `;

        const btnLoad: HTMLElement| null = this.element.querySelector('#btnLoad');
        const btnOut: HTMLElement | null = this.element.querySelector('.btn--out');
        const loadedBlock: HTMLElement | null = this.element.querySelector('.start_game__loaded');

        if (btnLoad !== null) {
          btnLoad.addEventListener('click', () => {
            const userId: string = localStorage.getItem('authorized') || '0';
            getSavedGames(userId).then((data) => {
              if (data !== `Данных в saved где user_id = ${userId} не найдено` && loadedBlock !== null) {
                data.forEach((game: IGame) => {
                  const item: HTMLElement = document.createElement('button');
                  item.classList.add('btn');
                  item.innerHTML = game.name;
                  loadedBlock.append(item)
                });
                loadedBlock.classList.remove('start_game__loaded--invisible');
              };
            });
          });
        }

        if (btnOut !== null) {
          btnOut.addEventListener('click', () => {
            setUserAuthorized(0);
            openLogin();
          });
        }
    }
}