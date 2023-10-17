import { type UserData } from '../../game/types';
import Button from '../button/button';
import Control from '../control';
import LoadLevelMenu from '../load-level-menu/load-level-menu';
import PopUp from '../pop-up/pop-up';
import './style.scss';
import { isGameStart } from '../../index';

class Menu extends PopUp {
  data: UserData;
  logout: () => void;
  startGame: (level: number) => Promise<void>;
  continueGame: () => void;
  loadMenu: LoadLevelMenu;
  constructor (data: UserData) {
    super();
    const menu = new Control(this.node, 'div', 'menu__conteiner', `Добро пожаловать, ${data.name}`);
    this.data = data;
    if (isGameStart) {
      const continueBtn = new Button(menu.node, 'Продолжить игру');
      continueBtn.node.onclick = this.continueBtnHandler;
    }
    const loadLevelBtn = new Button(menu.node, 'Выбрать уровень');
    loadLevelBtn.node.onclick = this.loadBtnHandler;
    const startBtn = new Button(menu.node, isGameStart ? 'Начать заново' : 'Начать игру');
    startBtn.node.onclick = this.startBtnHandler;
    const logoutBtn = new Button(menu.node, 'Выход');
    logoutBtn.node.onclick = this.logoutBtnHandler;
  }

  continueBtnHandler = (): void => {
    this.continueGame();
    this.destroy();
  };

  loadBtnHandler = (): void => {
    this.destroy();
    this.loadMenu = new LoadLevelMenu(this.data.level);
    this.loadMenu.loadLevel = this.startGame;
  };

  startBtnHandler = async (): Promise<void> => {
    await this.startGame(1);
    this.destroy();
  };

  logoutBtnHandler = (): void => {
    this.logout();
    this.destroy();
  };
}

export default Menu;
