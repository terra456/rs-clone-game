import { UserType } from 'types';
import { v4 as uuidv4 } from 'uuid';

class UserMemoryModel {
  users: Array<UserType>;
  constructor() {
    this.users = [
      { id: '3f684454-fae8-4632-bf35-a3a54f3abc81', name: 'Sam', password: '23' }
    ];
  }
  create = async (obj: UserType): Promise<UserType | Error> => {
    const userIndex = this.users.findIndex((el) => el.name === obj.name);

    if(userIndex >= 0) {
      throw new Error(`Пользователь c именем ${obj.name} существует`);
    }
    obj.id = uuidv4();
    this.users.push(obj);
    return obj;
  };

  update = async (id:string, obj: UserType): Promise<UserType | Error> => {
    const userIndex = this.users.findIndex((el) => el.id === id);
    Object.assign(this.users[userIndex], obj);
    return this.users[userIndex];
  };

  getById = async (id: string): Promise<UserType | Error> => {
    const userIndex = this.users.findIndex((el) => el.id === id);
    if(userIndex === -1) {
      throw new Error('Пользователь не найден');
    }
    return this.users[userIndex];
  };

  getByName = async (name: string): Promise<UserType | Error> => {
    const userIndex = this.users.findIndex((el) => el.name == name);
    if(userIndex === -1) {
      throw new Error(`Пользователь c именем ${name} не найден`);
    }
    return this.users[userIndex];
  };

  removeById = async (id: string): Promise<string | Error> => {
    const userIndex = this.users.findIndex((el) => el.id === String(id));

    if(userIndex === -1) {
      throw new Error('Пользователь не найден');
    }

    this.users.splice(userIndex, 1);

    return id;
  };

  getAll = async (): Promise<Array<UserType>> => {
    return this.users;
  };
}

export default UserMemoryModel;