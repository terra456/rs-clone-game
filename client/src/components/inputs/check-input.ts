import Input from './input';

class CheckInput extends Input {
  constructor (parentNode: HTMLElement, name: string) {
    super(parentNode, 'checkbox', name);
  }
}

export default CheckInput;
