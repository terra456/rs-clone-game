import { UserType } from 'types';
import db from '../../database/dbPool';

class UserPostgresModel {
  create = async (obj: UserType): Promise<UserType | Error> => {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    // eslint-disable-next-line quotes
    const text = `INSERT INTO users(${keys.join(', ')}) VALUES(${keys.map((el, i) => '$' + (i+1)).join(', ')}) RETURNING *`;
    console.log(text);
    db.query(text, values)
      .then(res => {
        console.log(res.rows[0]);
      })
      .catch(e => console.error(e.stack));
    return obj;
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

  // getByName = async (name: string): Promise<UserType | Error> => {
  //   const userIndex = users.findIndex((el) => el.name === name);

  //   if(userIndex === -1) {
  //     throw new Error('Пользователь не найден');
  //   }

  //   return users[userIndex];
  // };

  // removeById = async (id: string): Promise<string | Error> => {
  //   const userIndex = users.findIndex((el) => el.id === String(id));

  //   if(userIndex === -1) {
  //     throw new Error('Пользователь не найден');
  //   }

  //   users.splice(userIndex, 1);

  //   return id;
  // };

  getAll = async (): Promise<any> => {
    try {
      const res = await db.query('SELECT NOW() as now');
      console.log(res);
      if (res) {
        return res;
      }
    } catch (err) {
      throw new Error('Ошибка в БД');
    }
  };

}

export default UserPostgresModel;
