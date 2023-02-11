import { UserType } from 'types';
import UserMemoryModel from './userMemoryModel';

class UserModel {
  dbModel: UserMemoryModel;
  constructor() {
    this.dbModel = new UserMemoryModel();
  }

  create = async (obj: UserType): Promise<UserType | Error> => {
    if (!obj.name) {
      throw new Error('Укажите имя пользователя');
    }
    const newUser: UserType = {
      name: obj.name,
      password: obj.password,
      avatar: obj.avatar,
      settings: obj.settings,
      lastLevel: 0,
      totalScore: 0
    };
    return this.dbModel.create(newUser);
  };

  update = async (id:string, obj: UserType): Promise<UserType | Error> => {
    return this.dbModel.getById(id)
      .then(() => {
        return this.dbModel.update(id, obj);
      })
      .catch((e) => e);
  };

  getById = async (id: string): Promise<UserType | Error> => {
    return this.dbModel.getById(id);
  };

  // getByName = async (name: string): Promise<UserType | Error> => {
  //   const userIndex = users.findIndex((el) => el.name === name);

  //   if(userIndex === -1) {
  //     throw new Error('Пользователь не найден');
  //   }

  //   return users[userIndex];
  // };

  removeById = async (id: string): Promise<string | Error> => {
    return this.dbModel.removeById(id);
  };

  getAll = async (): Promise<Array<UserType> | Error> => {
    return this.dbModel.getAll();
  };
}

export default new UserModel();
