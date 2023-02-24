import { IUser } from './types';
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
