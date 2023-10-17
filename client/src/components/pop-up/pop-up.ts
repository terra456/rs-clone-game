import Control from '../control';
import './style.scss';

class PopUp extends Control {
  constructor () {
    super(document.body, 'div', 'pop-up');
  }
};

export default PopUp;
