import { resumeEvent } from "../../utils/events";
import Control from "../control";
import { popUp } from "../popUp";

export class StartGame extends popUp {
  onLoad: any;
  onNewStart: any;
  constructor (node: HTMLElement) {
    super(node);
    this.window.node.classList.add('start_game', 'start_game__controls');
    const btnResume = new Control(this.window.node, 'button', 'btn start_game__btn', 'Resume game');
    const btnLoad = new Control(this.window.node, 'button', 'btn start_game__btn', 'Load game');
    const btnNew = new Control(this.window.node, 'button', 'btn start_game__btn', 'New game');
    const btnOut = new Control(this.window.node, 'button', 'btn btn--out start_game__btn', 'Sign out');
    btnResume.node.onclick = () => {
      this.node.dispatchEvent(resumeEvent);
      this.node.remove();
    };
    btnLoad.node.onclick = () => {
      this.node.remove();
      this.onLoad();
    };
    btnNew.node.onclick = () => {
      this.node.remove();
      this.onNewStart();
    };
    btnOut.node.onclick = () => {
      this.node.remove();
    };
  }
}
