import { UserType } from 'types';
import { v4 as uuidv4 } from 'uuid';

const users: Array<UserType> = [
  { id: '1', name: 'Ulbi TV', password: '23' }
];

class UserModel {
  create = async (obj: UserType): Promise<UserType | Error> => {
    if (!obj.name) {
      throw new Error('Укажите имя пользователя');
    }
    if(users.find((el) => el.name === obj.name)) {
      throw new Error('Пользователь уже существует');
    }
    const newUser = {
      id: uuidv4(),
      name: obj.name,
      password: obj.password,
      avatar: obj.avatar,
      settings: obj.settings,
      lastLevel: 0,
      totalScore: 0
    };
    users.push(newUser);
    return newUser;
  };

  getById = async (id: string): Promise<UserType | Error> => {
    const userIndex = users.findIndex((el) => el.id === id);

    if(userIndex === -1) {
      throw new Error('Пользователь не найден');
    }

    return users[userIndex];
  };

  removeById = async (id: string): Promise<string | Error> => {
    const userIndex = users.findIndex((el) => el.id === String(id));

    if(userIndex === -1) {
      throw new Error('Пользователь не найден');
    }

    users.splice(userIndex, 1);

    return id;
  };

  getAll = async (): Promise<Array<UserType> | Error> => {
    return users;
  };

}

export default new UserModel();
