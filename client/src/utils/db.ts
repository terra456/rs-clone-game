import { IUser, IUserFull } from './types';
const server: String = 'https://rs-clone-game-production.up.railway.app';

enum Paths {
    users = '/api/users'
}

export async function createUser(newUser: IUser) {
    const settings: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser),
    };
    console.log(settings);
    try {
        const response = await fetch(`${server}${Paths.users}`, settings);
        const user = await response.json();
        return user;
    } catch(err) {
        console.error('err', err); 
    }
}

export async function getUsers() {
    const settings = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    try {
        const response = await fetch(`${server}${Paths.users}`, settings);
        const users = await response.json();
        return users;
    } catch(err) {
        console.error(err); 
    }
}

export function loginUser(data: IUserFull[], login: string, pass: string): boolean {
    const user: IUserFull | undefined = data.find((x: IUser) => x.name === login && x.password === pass);
    if (user === undefined) {
        return false;
    } else {
        localStorage.setItem('authorized', user.id.toString());
        return true;
    }
}