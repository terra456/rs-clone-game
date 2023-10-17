import Control from '../control';
import './style.scss';

class Button extends Control<HTMLButtonElement> {
  constructor (parentNode: HTMLElement | null, content = '') {
    super(parentNode, 'button', 'btn', content);
  }
}

export default Button;
