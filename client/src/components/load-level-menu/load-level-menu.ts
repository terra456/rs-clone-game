import Button from '../button/button';
import Control from '../control';
import RadioInput from '../inputs/radio-input';
import PopUp from '../pop-up/pop-up';
import './style.scss';
import { isGameStart } from '../../index';

class LoadLevelMenu extends PopUp {
  level: number;
  continueGame: () => void;
  loadLevel: (level: number) => Promise<void>;
  constructor (level: number) {
    super();
    const menu = new Control(this.node, 'div', 'menu__conteiner', 'Выберите уровень');
    this.level = level;
    [1, 2, 3].forEach((el) => {
      const radioInput = new RadioInput(menu.node, 'level', el.toString());
      radioInput.node.checked = el === this.level;
      radioInput.node.onchange = () => {
        this.level = el;
      };
    });
    const loadLevelBtn = new Button(menu.node, 'Загрузить уровень');
    loadLevelBtn.node.onclick = this.loadBtnHandler;
    const startBtn = new Button(menu.node, 'Начать игру');
    startBtn.node.onclick = async () => {
      await this.loadLevel(1);
    };
    if (isGameStart) {
      const continueBtn = new Button(menu.node, 'Продолжить игру');
      continueBtn.node.onclick = this.continueBtnHandler;
    }
  }

  continueBtnHandler = (): void => {
    this.continueGame();
    this.destroy();
  };

  loadBtnHandler = async (): Promise<void> => {
    await this.loadLevel(this.level);
    this.destroy();
  };
}

export default LoadLevelMenu;
