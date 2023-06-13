import { Settings } from './components/settings/Settings';
import { Login } from "./components/login/Login";
import { StartGame } from "./components/start/StartGame";
import { getSavedGames } from './utils/db';
import { pausedEvent } from './utils/events';
import Control from './components/control';
import GameCanvas from './game/GameCanvas';

const main: HTMLElement | null = document.querySelector('main');
const header: HTMLElement | null = document.querySelector('header');
const btnLogin = new Control(header, 'button', 'btn header__btn', 'Login');
const btnStartGame = new Control(header, 'button', 'btn header__btn', 'Start game');
// const btnStartGame: HTMLElement | null = document.querySelector('#startGameBtn');
// const btnSettings: HTMLElement | null = document.querySelector('#settingsBtn');

const gameCanvas = new GameCanvas(document.body);

// const isAuthorized: boolean = Number(localStorage.getItem('authorized')) === 0 ? false : true;
// isAuthorized ? openApp() : openLogin();

let isAuthorized: boolean = false;

btnLogin.node.addEventListener('click', () => {
  btnLogin.node.dispatchEvent(pausedEvent);
  //    document.querySelector('canvas')?.remove();
//   openLogin();
});

btnStartGame.node.addEventListener('click', () => {
  btnStartGame.node.dispatchEvent(pausedEvent);
  // document.querySelector('canvas')?.remove();
  const startGame = new StartGame(main);
  startGame.onLoad = (): void => {
    // loadGames();
  };
  startGame.onNewStart = (): void => {
    void gameCanvas.startGame(1);
  };
});

const login = new Login();
main?.appendChild(login.element);
login.openForNewUser = () => {
  void gameCanvas.startGame(1);
};

login.startGame = () => {
  void gameCanvas.startGame(1);
};


// if (btnSettings !== null) {
//   btnSettings.addEventListener('click', () => {
//     btnSettings.dispatchEvent(pausedEvent);
//     // document.querySelector('canvas')?.remove();
//     openTab(new Settings().element);
//   });
// }

// export function openApp() {
//   //const userId: string = localStorage.getItem('authorized') || '0';
//   getSavedGames('3').then((data) => {
//     data !== `Данных в saved где user_id = ${3} не найдено` ? openStartGame() : openForNewUser();
//   });
// }

function openTab(element: HTMLElement) {
  if (main !== null) {
    main.innerHTML = '';
    main.appendChild(element);
  }
}

function toggleLoginBtn(status: boolean): void {
  if (btnLogin !== null) {
    if (status) {
      btnLogin.node.innerText = 'Login';
      btnLogin.node.classList.remove('btn--out');
    } else {
      btnLogin.node.innerHTML = 'Sign out';
      btnLogin.node.classList.add('btn--out');
    }
  }
}

// function openStartGame() {
//   openTab(new StartGame().element);
//   toggleLoginBtn(false);
// }

// export function openLogin() {
//   // что за блок и откуда он?
// //   const loginBlock: HTMLElement | null = document.querySelector('.login');
//   if (main !== null) main.appendChild(new Login().element);
// //   toggleLoginBtn(true);
// }

// export function openForNewUser (): void {
//   openTab(new Register().element);
//   toggleLoginBtn(false);
// }
