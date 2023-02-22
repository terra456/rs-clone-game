import { IUser } from './types';
const server: String = 'https://rs-clone-game-production.up.railway.app';

enum Paths {
    users = '/api/users'
}

export async function createUser(newUser: IUser) {
    const settings = {
        method: 'POST',
        mode: 'no-cors' as RequestMode,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    };
    try {
        const response = await fetch(`${server}${Paths.users}`, settings);
        const user = await response.json();
        return user;
    } catch(err) {
        console.error(err); 
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