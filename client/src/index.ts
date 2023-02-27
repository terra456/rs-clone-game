import { Settings } from './components/settings/Settings';
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { StartGame } from "./components/start/StartGame";
import { getSavedGames } from './utils/db';
import { pausedEvent } from './utils/events';
import GameCanvas from './game/GameCanvas';
import { BaseComponent } from './components/BaseComponent';

const main: HTMLElement | null = document.querySelector('main');
const btnLogin: HTMLElement | null = document.querySelector('#loginBtn');
const btnStartGame: HTMLElement | null = document.querySelector('#startGameBtn');
const btnSettings: HTMLElement | null = document.querySelector('#settingsBtn');

 const isAuthorized: boolean = Number(localStorage.getItem('authorized')) === 0 ? false : true;
 isAuthorized ? openApp() : openLogin();

if (btnLogin !== null) {
    btnLogin.addEventListener('click', () => {
        btnLogin.dispatchEvent(pausedEvent);
    //    document.querySelector('canvas')?.remove();
       openLogin();
    });
}

if (btnStartGame !== null) {
    btnStartGame.addEventListener('click', () => {
        btnStartGame.dispatchEvent(pausedEvent);
        // document.querySelector('canvas')?.remove();
        openStartGame();
    });
}

if (btnSettings !== null) {
    btnSettings.addEventListener('click', () => {
        btnSettings.dispatchEvent(pausedEvent);
        // document.querySelector('canvas')?.remove();
        openTab(new Settings().element);
    });
}

export function openApp() {
  //const userId: string = localStorage.getItem('authorized') || '0';
  getSavedGames('3').then((data) => {
    data !== `Данных в saved где user_id = ${3} не найдено` ? openStartGame() : openForNewUser();
  });
}

function openTab(element: HTMLElement) {
    if (main !== null) {
        main.innerHTML = '';
        main.appendChild(element);
    }
}

function toggleLoginBtn(status: boolean) {
    if (btnLogin !== null) {
        if (status) {
            btnLogin.innerHTML = 'Login';
            btnLogin.classList.remove('btn--out');
        } else {
            btnLogin.innerHTML = 'Sign out';
            btnLogin.classList.add('btn--out');
        }
    }
}

function openStartGame() {
    openTab(new StartGame().element);
    toggleLoginBtn(false);
}

export function openLogin() {
    const loginBlock: HTMLElement | null = document.querySelector('.login');
    if (loginBlock === null && main !== null) main.appendChild(new Login().element);
    toggleLoginBtn(true);
}

export function openForNewUser() {
    openTab(new Register().element)
    toggleLoginBtn(false);
}
