// import Control from './components/control';
import GameCanvas from './game/GameCanvas';
import Header from './components/header/header';
import { type SettingsType, type UserData } from './game/types';
import Login from './components/login/login';
import { createUser, saveSettings, saveWin } from './utils/local-storage';
import { pausedEvent, resumeEvent } from './utils/events';

const user = localStorage.getItem('user');
export let isPaused = false;
export let isGameStart = false;

const pageHeader = new Header();

const gameCanvas = new GameCanvas(document.body);

function addDataToHeader (data: string): void {
  const uploadData = JSON.parse(data) as UserData;
  pageHeader.addUserData(uploadData);
};

function login (name: string): void {
  localStorage.setItem('user', name);
  const data = localStorage.getItem(name + 'Data');
  if (data !== null) {
    addDataToHeader(data);
  } else {
    const newUserData = createUser(name);
    pageHeader.addUserData(newUserData);
  }
  pageHeader.menuBtnHandler();
};

gameCanvas.stopGame = (level: number, score?: number): void => {
  isPaused = false;
  isGameStart = false;
  pageHeader.pauseBtn.node.disabled = true;
  if (user !== null && score !== undefined) {
    saveWin(user, level, score);
  }
  pageHeader.stopGame(level, score);
};

pageHeader.continueGame = (): void => {
  isPaused = false;
  dispatchEvent(resumeEvent);
};

pageHeader.startGame = async (level: number): Promise<void> => {
  isPaused = false;
  isGameStart = true;
  pageHeader.pauseBtn.node.disabled = false;
  await gameCanvas.startGame(level);
};

pageHeader.logout = (): void => {
  console.log('logoutBtnHandler');
  localStorage.removeItem('user');
  pageHeader.addUserData(null);
  isPaused = false;
  isGameStart = false;
  pageHeader.pauseBtn.node.disabled = true;
  const loginMenu = new Login();
  loginMenu.loginHandler = login;
};

pageHeader.saveSettings = (settings: SettingsType): void => {
  if (user !== null) {
    saveSettings(user, settings);
    gameCanvas.setSettings(settings);
  }
};

pageHeader.pauseGame = () => {
  if (isPaused) {
    isPaused = false;
    pageHeader.pauseBtn.node.innerText = 'Пауза';
    dispatchEvent(resumeEvent);
  } else {
    isPaused = true;
    pageHeader.pauseBtn.node.innerText = 'Продолжить';
    dispatchEvent(pausedEvent);
  }
};

if (user === null) {
  const loginMenu = new Login();
  loginMenu.loginHandler = login;
} else {
  const data = localStorage.getItem(user + 'Data');
  if (data !== null) {
    addDataToHeader(data);
  }
  pageHeader.menuBtnHandler();
}

document.addEventListener('keydown', (event: KeyboardEvent) => {
  switch (event.keyCode) {
    case 19:
      pageHeader.pauseGame();
      break;
    case 27:
      pageHeader.menuBtnHandler();
      break;
  }
});
