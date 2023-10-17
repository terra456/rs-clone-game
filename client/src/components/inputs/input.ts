import Control from '../control';
import './style.scss';

class Input extends Control<HTMLInputElement> {
  constructor (parentNode: HTMLElement, type: string, name: string, value?: string) {
    const fildset = new Control(parentNode, 'fieldset', 'fieldset');
    super(fildset.node, 'input', 'input');
    this.node.type = type;
    this.node.id = value ?? name;
    this.node.name = name;
    if (value !== undefined) {
      this.node.value = value;
    }
    const label = new Control<HTMLLabelElement>(fildset.node, 'label', 'input__label', value ?? name);
    label.node.htmlFor = value ?? name;
  }
}

export default Input;
