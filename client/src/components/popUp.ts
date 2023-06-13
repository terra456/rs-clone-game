import Control from "./control";

export class popUp extends Control {
  window: Control<HTMLElement>;
  constructor (node: HTMLElement | null) {
    super(node, 'div', 'login');
    this.window = new Control(this.node, 'div', 'login');
  }
}
