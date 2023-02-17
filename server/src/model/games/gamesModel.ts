import { GameSavedType, GameWinType, rawGameSavedType, rawGameWinType } from 'types';
import { v4 as uuidv4 } from 'uuid';
import GamesMemoryModel from './gamesMemoryModel';
import createError from 'http-errors';
import GamesPostgressModel from './gamesPostgressModel';

class GamesModel {
  dbModel: GamesPostgressModel;
  constructor() {
    this.dbModel = new GamesPostgressModel();
  }

  addWin = async (user: string, obj: rawGameWinType): Promise<GameWinType | Error> => {
    if (!user) {
      //TODO проверить существование пользователя в БД
      throw createError(401, 'Неверно указан ID пользователя');
    }
    const {level, dificulty, score } = obj;

    if (!Number(level)) {
      throw createError(400, 'Неверно указан уровень игры');
    }
    if (dificulty != 'easy' && dificulty != 'normal' && dificulty != 'hard') {
      throw createError(400, 'Неверно указана сложность');
    }
    if (!Number(score)) {
      throw createError(400, 'Неверный скор');
    }
    const newGame: GameWinType = {
      user_id: Number(user),
      dificulty: dificulty,
      score: Number(score),
      level: Number(level),
      date: Date.now().toString(),
      wins_user_id_fkey: Number(user)
    };

    return this.dbModel.addWin(newGame);
  };

  getWinGame = async (id: string): Promise<GameWinType | Error> => {
    if(!id) {
      throw createError(404, 'Нет ID');
    }
    return this.dbModel.getWinGame(id);
  };

  getVeryAllWinGames =async () => {
    return this.dbModel.getVeryAllWinGames();
  };
  
  getAllWinGames = async (id: string): Promise<Array<GameWinType> | Error> => {
    return this.dbModel.getAllWinGames(id);
  };
  
  removeWinGame = async (id: string): Promise<string | Error> => {
    if(!id) {
      throw createError(404, 'Нет ID');
    }
    return this.dbModel.removeWinGame(id);
  };
  
  deleteAllWinGames = async (userId: string) => {
    if(!userId) {
      throw new Error('Нет ID');
    }
    return this.dbModel.deleteAllWinGames(userId);
  };

  saveGame = async (user: string, obj: rawGameSavedType): Promise<any | Error> => {
    if (!user) {
      throw createError(404, 'Неверно указан ID пользователя');
    }
    const {level, dificulty, score, name, state } = obj;

    if (!Number(level)) {
      throw createError(400, 'Неверно указан уровень игры');
    }
    if (dificulty != 'easy' && dificulty != 'normal' && dificulty != 'hard') {
      throw createError(400, 'Неверно указана сложность');
    }
    if (!Number(score)) {
      throw createError(400, 'Неверный скор');
    }
    if (!name) {
      throw createError(400, 'Укажите название');
    }
    if (!state || !JSON.parse(state)) {
      throw createError(400, 'Неверный формат данных');
    }
    const newGame: GameSavedType = {
      user_id: Number(user),
      saved_user_id_fkey: Number(user),
      dificulty: dificulty,
      score: Number(score),
      level: Number(level),
      date: new Date(),
      name: name,
      state: state,
    };
    return this.dbModel.saveGame(newGame);
  };

  getSavedGame = async (id: string): Promise<GameWinType | Error> => {
    if(!id || id == 'user') {
      throw createError(400, 'Нет ID');
    }
    return this.dbModel.getSavedGame(id);
  };

  getAllSaved = async (id: string): Promise<Array<GameSavedType> | Error> => {
    if(!id) {
      throw new Error('Нет ID');
    }
    return this.dbModel.getAllSaved(id);
  };

  deleteSavedGame =async (id:string) => {
    if(!id) {
      throw new Error('Нет ID');
    }
    return this.dbModel.deleteSavedGame(id);
  };

  deleteAllSavedGames = async (userId: string) => {
    if(!userId) {
      throw new Error('Нет ID');
    }
    return this.dbModel.deleteAllSavedGames(userId);
  };
}

export default new GamesModel();
