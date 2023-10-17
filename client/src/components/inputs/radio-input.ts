import Input from './input';

class RadioInput extends Input {
  constructor (parentNode: HTMLElement, name: string, value: string) {
    super(parentNode, 'radio', name, value);
  }
}

export default RadioInput;
