import { QueryResult } from 'pg';
import { UserType } from 'types';
import db from '../../database/dbPool';

class UserPostgresModel {
  create = async (obj: UserType): Promise<any[] | Error> => {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    const text = `INSERT INTO users(${keys.join(', ')}) VALUES(${keys.map((el, i) => '$' + (i+1)).join(', ')}) RETURNING *`;
    try {
      const res = await db.query(text, values);
      if (!res.rows) {
        throw new Error('Ошибка записи в БД');
      }
      return res.rows;
    } catch (err) {
      throw new Error('Ошибка записи в БД');
    }
  };

  // update = async (id:string, obj: UserType): Promise<UserType | Error> => {
  //   const userIndex = users.findIndex((el) => el.id === id);
  //   const user = users[userIndex];
  //   const newUser = {
  //     id: user.id,
  //     name: obj.name || user.name,
  //     password: obj.password || user.password,
  //     avatar: obj.avatar || user.avatar,
  //     settings: obj.settings || user.settings,
  //     lastLevel: obj.lastLevel || user.lastLevel || 0,
  //     totalScore: obj.totalScore || user.totalScore || 0
  //   };
  //   users.splice(userIndex, 1, newUser);
  //   return newUser;userPostgresModel
  //     throw new Error('Пользователь не найден');
  //   }

  //   return users[userIndex];
  // };

  getById = async (id: string | number): Promise<any[] | Error> => {
    try {
      const res = await db.query(`SELECT * FROM users WHERE id = ${id};`);
      if (!res.rows || res.rows.length === 0) {
        throw new Error(`Пользователя с id = ${id} не найдено`);
      }
      return res.rows;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  getByName = async (name: string | number): Promise<any[] | Error> => {
    try {
      const res = await db.query(`SELECT * FROM users WHERE name = ${name};`);
      if (!res.rows || res.rows.length === 0) {
        throw new Error(`Пользователя с id = ${name} не найдено`);
      }
      return res.rows;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  removeById = async (id: string): Promise<number | Error> => {
    try {
      const res = await db.query(`DELETE FROM users WHERE id = ${id};`);
      if (!res.rowCount || res.rowCount == 0) {
        throw new Error(`Пользователя с id = ${id} не найдено`);
      }
      return res.rowCount;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  getAll = async (): Promise<any> => {
    try {
      const res = await db.query('SELECT * FROM users;');
      if (res.rows) {
        return res.rows;
      }
    } catch (err) {
      throw new Error('Ошибка в БД');
    }
  };

}

export default UserPostgresModel;
