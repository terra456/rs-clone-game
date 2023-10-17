import Button from '../button/button';
import Control from '../control';
import PopUp from '../pop-up/pop-up';

class Login extends PopUp {
  textInput: Control<HTMLInputElement>;
  loginHandler: (name: string) => void;
  parentNode: Control<HTMLElement>;

  constructor () {
    super();
    const modal = new Control(this.node, 'div', 'menu__conteiner', 'Введите имя пользователя');
    this.textInput = new Control<HTMLInputElement>(modal.node, 'input', 'input');
    this.textInput.node.type = 'text';
    this.textInput.node.name = 'userName';
    this.textInput.node.placeholder = 'Имя';
    const loginBtn = new Button(modal.node, 'Продолжить');
    loginBtn.node.onclick = this.loginBtnHandler;
  }

  loginBtnHandler = (): void => {
    if (this.textInput.node.value !== undefined) {
      this.loginHandler(this.textInput.node.value);
      this.destroy();
    }
  };
}

export default Login;
