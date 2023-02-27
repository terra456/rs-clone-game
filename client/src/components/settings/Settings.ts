import { openApp } from "../../index";
import { BaseComponent } from "../BaseComponent";
import './settings.scss';

export class Settings extends BaseComponent {
    constructor() {
        super('div', 'settings');
        this.element.innerHTML = `
          <div class="settings__block">
            <p>Music</p>
            <button class="settings__toggle">On</button>
            <input type="range">
          </div>
          <div class="settings__block">
            <p>Sounds</p>
            <button class="settings__toggle" id="soundsToggle">On</button>
            <input id="soundsInput" type="range" min="1" max="5" step="1" value="5">
          </div>
          <div class="settings__block">
            <p>Difficulty</p>
            <ul class="settings__list">
              <li class="settings__diff">Easy</li>
              <li class="settings__diff">Normal</li>
              <li class="settings__diff">Hard</li>
            </ul>
          </div>
          <div class="settings__block">
            <p>Language</p>
            <button class="settings__lang">Eng</button>
          </div>
          <div class="settings__controls">
            <button class="btn" id="btnSave">Save</button>
            <button class="btn settings__cancel">Cancel</button>
          </div>
        `;

        const difficultyItems: HTMLInputElement[] | null = Array.from(this.element.querySelectorAll('.settings__diff'));
        if (difficultyItems !== null) {
            difficultyItems.forEach((x) => x.addEventListener('click', () => {
                difficultyItems.forEach((y) => y.classList.remove('settings__diff--chosen'));
                x.classList.add('settings__diff--chosen');
            }))
        }

        const toggles: HTMLInputElement[] | null = Array.from(this.element.querySelectorAll('.settings__toggle'));
        if (toggles !== null) {
            toggles.forEach((x) => x.addEventListener('click', () => {
                if (x.innerHTML === 'On') {
                    x.innerHTML = 'Off';
                    x.classList.add('settings__toggle--off')
                } else {
                    x.innerHTML = 'On';
                    x.classList.remove('settings__toggle--off')
                }
            }))
        }

        const soundsToggle: HTMLElement | null = this.element.querySelector('#soundsToggle');
        if (soundsToggle !== null) {
          soundsToggle.innerHTML = localStorage.getItem('soundsOn') || 'On';
        }

        const langToggle: HTMLElement | null = this.element.querySelector('.settings__lang');
        if (langToggle !== null) {
            langToggle.addEventListener('click', () => {
                langToggle.innerHTML === 'Eng' ? langToggle.innerHTML = 'Ru' : langToggle.innerHTML = 'Eng';
            });
        }

        const soundsRange: HTMLInputElement | null = this.element.querySelector('#soundsInput');
        if (soundsRange !== null) {
          soundsRange.value = localStorage.getItem('soundsVolume') || '5';
        }

        const btnSave: HTMLElement | null = this.element.querySelector('#btnSave');
        if (btnSave !== null && soundsRange !== null && soundsToggle !== null) {
          btnSave.addEventListener('click', () => {
            localStorage.setItem('soundsVolume', soundsRange.value);
            localStorage.setItem('soundsOn', soundsToggle.innerHTML);
          });
        }

        const btnCancel: HTMLElement | null = this.element.querySelector('.settings__cancel');
        if (btnCancel !== null) {
          btnCancel.addEventListener('click', () => {
            openApp();
          });
        }
    }
}