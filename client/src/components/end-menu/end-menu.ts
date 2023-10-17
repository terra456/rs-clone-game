import { type UserData } from '../../game/types';
import Button from '../button/button';
import Control from '../control';
import PopUp from '../pop-up/pop-up';
import './style.scss';

class EndMenu extends PopUp {
  data: UserData;
  logout: () => void;
  startGame: (level: number) => Promise<void>;
  constructor (level: number, score?: number) {
    super();
    const menu = new Control(this.node, 'div', 'menu__conteiner', score !== undefined ? `Поздравляем, вы набрали ${score} очков` : 'Вы проиграли');
    const startBtn = new Button(menu.node, score !== undefined ? 'Следующий уровень' : 'Попробовать снова');
    startBtn.node.onclick = async () => {
      await this.startBtnHandler(level, score);
    };
    const logoutBtn = new Button(menu.node, 'Выход');
    logoutBtn.node.onclick = this.logoutBtnHandler;
  }

  startBtnHandler = async (level: number, score?: number): Promise<void> => {
    let newLevel: number;
    if (score !== undefined) {
      newLevel = level < 3 ? level + 1 : 1;
    } else {
      newLevel = level;
    }
    await this.startGame(newLevel);
    this.destroy();
  };

  logoutBtnHandler = (): void => {
    this.logout();
    this.destroy();
  };
}

export default EndMenu;
