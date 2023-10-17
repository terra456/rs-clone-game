import Control from '../control';

class RangeInput extends Control<HTMLInputElement> {
  constructor (parentNode: HTMLElement, name: string, value: string, disabled: boolean) {
    super(parentNode, 'input', 'input__range');
    this.node.type = 'range';
    this.node.id = name;
    this.node.name = name;
    this.node.min = String(0);
    this.node.max = String(100);
    this.node.step = String(1);
    this.node.value = value.toString();
    this.node.disabled = !disabled;
  }

  public setIsDisable = (value: boolean): void => {
    this.node.disabled = value;
  };
}

export default RangeInput;
