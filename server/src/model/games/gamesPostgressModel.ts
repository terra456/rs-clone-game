import { GameWinType, GameSavedType } from 'types';
import db from '../../database/dbPool';
import createError from 'http-errors';

class GamesPostgressModel {

  addWin = async (obj: GameWinType): Promise<any | Error> => {
    return await this.create(obj, 'wins');
  };

  getWinGame = async (id: string): Promise<any | Error> => {
    return await this.getBy('id', id, 'wins');
  };

  getVeryAllWinGames = async () => {
    try {
      const res = await db.query('SELECT * FROM wins;');
      if (!res.rows || res.rows.length === 0) {
        throw createError(403, 'Данных в wins не найдено');
      }
      return res.rows;
    } catch (err: any) {
      throw createError(403, err.message);
    }
  };

  removeWinGame = async (id: string): Promise<string | Error> => {
    return await this.removeBy('id', id, 'wins');
  };

  getAllWinGames = async (id: string): Promise<Array<GameWinType> | Error> => {
    return await this.getBy('user_id', id, 'wins');
  };

  deleteAllWinGames = async (userId:string) => {
    return await this.removeBy('user_id', userId, 'wins');
  };

  saveGame = async (obj: GameSavedType) => {
    return await this.create(obj, 'saved');
  };

  getSavedGame = async (id: string): Promise<any | Error> => {
    return await this.getBy('id', id, 'saved');
  };

  deleteSavedGame = async (id: string): Promise<string | Error> => {
    return await this.removeBy('id', id, 'saved');
  };

  getAllSaved = async (id: string) => {
    return await this.getBy('user_id', id, 'saved');
  };

  deleteAllSavedGames = async (userId:string) => {
    return await this.removeBy('user_id', userId, 'saved');
  };

  private create = async (obj: any, table: string): Promise<any[] | Error> => {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    const text = `INSERT INTO ${table} (${keys.join(', ')}) VALUES(${keys.map((el, i) => '$' + (i+1)).join(', ')}) RETURNING *`;
    console.log(text);
    console.log(values);
    try {
      const res = await db.query(text, values);
      if (!res.rows) {
        throw createError(403, 'Ошибка записи в БД');
      }
      return res.rows;
    } catch (err: any) {
      throw createError(403, err.message);
    }
  };

  private getBy = async (param: string, value: string | number, table: string): Promise<any[] | Error> => {
    try {
      const res = await db.query(`SELECT * FROM ${table} WHERE ${param} = ${value};`);
      if (!res.rows || res.rows.length === 0) {
        throw createError(404, `Данных в ${table} где ${param} = ${value} не найдено`);
      }
      return res.rows;
    } catch (err: any) {
      throw createError(404, err.message);
    }
  };

  private removeBy = async (param: string, value: string | number, table: string): Promise<any | Error> => {
    try {
      const res = await db.query(`DELETE FROM ${table} WHERE ${param} = ${value};`);
      if (!res.rowCount || res.rowCount == 0) {
        throw createError(403, `Данных в ${table} где ${param} = ${value} не найдено`);
      }
      return res.rowCount;
    } catch (err: any) {
      throw createError(403, err.message);
    }
  };
}

export default GamesPostgressModel;