import { QueryResult } from 'pg';
import { UserType } from 'types';
import db from '../../database/dbPool';

class UserPostgresModel {
  create = async (obj: UserType): Promise<any[] | Error> => {
    const values = Object.keys(obj);
    const keys = Object.values(obj);
    const text = `INSERT INTO users (${keys.join(', ')}) VALUES(${keys.map((el, i) => '$' + (i+1)).join(', ')}) RETURNING *`;
    console.log(text);
    console.log(values);
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

  update = async (id:string, obj: UserType): Promise<any | Error> => {
    const user = await this.getById(id);
    if (!user) {
      throw new Error(`Пользователя с id = ${id} не найдено`);
    }
    // const newUser = {
    //   name: obj.name || user.name,
    //   password: obj.password || user.password,
    //   avatar: obj.avatar || user.avatar,
    //   settings: obj.settings || user.settings,
    //   lastLevel: obj.lastLevel || user.lastLevel || 0,
    //   totalScore: obj.totalScore || user.totalScore || 0
    // };
    // const keys = Object.keys(newUser);
    // const values = Object.values(newUser);
    // const text = `UPDATE users (${keys.join(', ')}) VALUES(${keys.map((el, i) => '$' + (i+1)).join(', ')}) WHERE id = ${id};`;
    console.log(id);
    try {
      if (obj.name) {
        const text = `UPDATE users SET name = ${obj.name} WHERE id = ${Number(id)};`;
        console.log(text);
        const res = await db.query(text);
        if (!res) {
          throw new Error('Нет результата');
        }
        return res;
      }
      // const res = await db.query(text, values);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  getById = async (id: string | number): Promise<any | Error> => {
    try {
      const res = await db.query(`SELECT * FROM users WHERE id = ${id};`);
      if (!res.rows || res.rows.length === 0) {
        throw new Error(`Пользователя с id = ${id} не найдено`);
      }
      return res.rows[0];
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  getByName = async (UserName: string | number): Promise<any[] | Error> => {
    try {
      const res = await db.query(`SELECT * FROM users WHERE name = ${UserName};`);
      if (!res.rows || res.rows.length === 0) {
        throw new Error(`Пользователя с name = ${UserName} не найдено`);
      }
      return res.rows;
    } catch (err: any) {
      throw new Error('!!!' + err.message);
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
