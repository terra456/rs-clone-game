import { type SettingsType, type UserData } from '../../game/types';
import { pausedEvent } from '../../utils/events';
import Button from '../button/button';
import Control from '../control';
import EndMenu from '../end-menu/end-menu';
import Menu from '../menu/menu';
import SettingsMenu from '../settings-menu/settings-menu';

class Header extends Control {
  user: string | null;
  data: UserData | null;
  logout: () => void;
  startGame: (level: number) => Promise<void>;
  pauseGame: () => void;
  continueGame: () => void;
  saveSettings: (settings: SettingsType) => void;
  menu: Menu;
  settingsMenu: SettingsMenu;
  pauseBtn: Button;
  constructor () {
    super(document.body, 'header', 'header');
    const menuBtn = new Button(this.node, 'menu');
    menuBtn.node.onclick = this.menuBtnHandler;
    this.pauseBtn = new Button(this.node, 'pause');
    this.pauseBtn.node.disabled = true;
    this.pauseBtn.node.classList.add('btn_pause');
    this.pauseBtn.node.onclick = () => {
      this.pauseGame();
    };
    const settingsBtn = new Button(this.node, 'settings');
    settingsBtn.node.onclick = this.openSettingsHandler;
  }

  stopGame = (level: number, score?: number): void => {
    if (this.data !== null && score !== undefined) {
      this.data.level = level < 3 ? level + 1 : 1;
    }
    const menu = new EndMenu(level, score);
    menu.logout = this.logout;
    menu.startGame = this.startGame;
  };

  menuBtnHandler = (): void => {
    dispatchEvent(pausedEvent);
    this.destroyAllMenu();
    if (this.data !== null) {
      this.menu = new Menu(this.data);
      this.menu.logout = this.logout;
      this.menu.startGame = this.startGame;
      this.menu.continueGame = this.continueGame;
    }
  };

  openSettingsHandler = (): void => {
    dispatchEvent(pausedEvent);
    this.destroyAllMenu();
    if (this.data !== null) {
      this.settingsMenu = new SettingsMenu(this.data.settings);
      this.settingsMenu.onSave = (data: SettingsType) => {
        this.saveSettings(data);
        this.settingsMenu.destroy();
      };
    }
  };

  addUserData = (data: UserData | null): void => {
    this.data = data;
  };

  destroyAllMenu = (): void => {
    this.menu?.destroy();
    this.settingsMenu?.destroy();
    this.menu?.loadMenu?.destroy();
  };
};

export default Header;
