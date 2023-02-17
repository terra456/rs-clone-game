import { IUser } from './types';
const server: String = 'http://127.0.0.1:3000';

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
        const car = await response.json();
        return car;
    } catch(err) {
        console.error(err); 
    }
}