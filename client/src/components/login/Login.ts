import { IUser } from './../../utils/types';
import { openApp, openForNewUser } from "../../index";
import { BaseComponent } from "../BaseComponent";
import './login.scss';
import './../../style.scss';
import { createUser, getUsers, loginUser } from "../../utils/db";

export class Login extends BaseComponent {
    constructor() {
        super('div', 'login');
        this.element.innerHTML = `
          <input id="nameInput" class="login__input" placeholder="Username" type="text">
          <input id="passInput" class="login__input" placeholder="Password" type="password">
          <div class="login__controls">
            <button class="btn" id="btnLogin">Login</button>
            <button class="btn login__register" id="btnRegister">Register</button>
          </div>
          <p class="login__error">Please fill inputs</p>
          <button class="btn">Play now</button>
        `;

        const btnRegister: HTMLElement | null = this.element.querySelector('#btnRegister');
        const btnLogin: HTMLElement | null = this.element.querySelector('#btnLogin');
        const error: HTMLElement | null = this.element.querySelector('.login__error');

        if (btnRegister !== null) {
            btnRegister.addEventListener('click', () => {
                error?.classList.remove('login__error--visible');
                if (this.validateInputs()) {
                    const name: string = (this.element.querySelector('#nameInput') as HTMLInputElement).value;
                    const pass: string = (this.element.querySelector('#passInput') as HTMLInputElement).value;
                    const newUser: IUser = {
                        name: name,
                        password: pass,
                        avatar: "",
                        settings: "",
                        lastLevel: 1,
                        totalScore: 0,
                    }
                    createUser(newUser).then((data) =>{
                        console.log(data);
                        openForNewUser();
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
                } else {
                    error?.classList.add('login__error--visible');
                }
            });
        }

        if (btnLogin !== null) {
            btnLogin.addEventListener('click', () => {
                error?.classList.remove('login__error--visible');
                if (this.validateInputs()) {
                    const name: string = (this.element.querySelector('#nameInput') as HTMLInputElement).value;
                    const pass: string = (this.element.querySelector('#passInput') as HTMLInputElement).value;
                    getUsers().then((data) =>{
                        if (loginUser(data, name, pass)) openApp();
                    });
                } else {
                    error?.classList.add('login__error--visible');
                }
            });
        }
    }

    validateInputs(): boolean {
        const inputs: HTMLInputElement[] | null = Array.from(this.element.querySelectorAll('.login__input'));
        if (inputs !== null) {
            return inputs.every((x) => x.value.length > 0);
        }
        return false;
    }
}