import { Settings } from './components/settings/Settings';
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { StartGame } from "./components/start/StartGame";

const main: HTMLElement | null = document.querySelector('main');
const btnLogin: HTMLElement | null = document.querySelector('#loginBtn');
const btnStartGame: HTMLElement | null = document.querySelector('#startGameBtn');
const btnSettings: HTMLElement | null = document.querySelector('#settingsBtn');

//проверка авторизован ли пользователь
 const isAuthorized: boolean = false;
 isAuthorized ? openApp : openLogin();

if (btnLogin !== null) {
    btnLogin.addEventListener('click', () => {
       openLogin();
    });
}

if (btnStartGame !== null) {
    btnStartGame.addEventListener('click', () => {
        openStartGame();
    });
}

if (btnSettings !== null) {
    btnSettings.addEventListener('click', () => {
        openTab(new Settings().element);
    });
}

export function openApp() {
  //проверка есть ли сохраненные игры
  const hasGames: boolean = true;
  hasGames ? openStartGame() : openForNewUser();
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
    openTab(new Login().element);
    toggleLoginBtn(true);
}

export function openForNewUser() {
    openTab(new Register().element)
    toggleLoginBtn(false);
}
