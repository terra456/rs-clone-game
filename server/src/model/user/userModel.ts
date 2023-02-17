import { QueryResult } from 'pg';
import { UserType } from 'types';
import UserPostgresModel from './userPostgresModel';
// import UserMemoryModel from './userMemoryModel';

class UserModel {
  dbModel: UserPostgresModel;
  constructor() {
    this.dbModel = new UserPostgresModel();
  }

  create = async (obj: UserType): Promise<any[] | Error | undefined> => {
    if (!obj.name) {
      throw new Error('Укажите имя пользователя');
    }
    if (await this.getByName(obj.name)) {
      throw new Error(`Пользователь с именем ${obj.name} уже существует`);
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

  // update = async (id:string, obj: UserType): Promise<UserType | Error> => {
  //   if(!id) {
  //     throw new Error('Нет ID');
  //   }
  //   if(!obj) {
  //     throw new Error('Параметры не получены');
  //   }
  //   return this.dbModel.getById(id)
  //     .then(() => {
  //       return this.dbModel.update(id, obj);
  //     })
  //     .catch((e) => e);
  // };

  getById = async (id: string): Promise<any[] | Error> => {
    if(!id) {
      throw new Error('Нет ID');
    }
    return await this.dbModel.getById(id);
  };

  getByName = async (name: string): Promise<UserType | Error | boolean> => {
    const users = await this.getAll();
    if (Array.isArray(users)) {
      const userIndex = users.findIndex((el) => el.name === name);
      if(userIndex === -1) {
        return false;
      }  
      return users[userIndex];
    }
    return false;
  };

  removeById = async (id: string): Promise<number | Error> => {
    if(!id) {
      throw new Error('Нет ID');
    }
    return await this.dbModel.removeById(id);
  };

  getAll = async (): Promise<Array<UserType> | Error> => {
    const users = await this.dbModel.getAll();
    // if (users.length === 0) {
    //   throw new Error('Пользователей нет в БД');
    // }
    return users;
  };
}

export default new UserModel();
