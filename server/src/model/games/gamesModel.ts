import { GameSavedType, GameWinType, rawGameSavedType, rawGameWinType } from 'types';
import { v4 as uuidv4 } from 'uuid';
import GamesMemoryModel from './gamesMemoryModel';

class GamesModel {
  dbModel: GamesMemoryModel;
  constructor() {
    this.dbModel = new GamesMemoryModel();
  }

  addWin = async (user: string, obj: rawGameWinType): Promise<GameWinType | Error> => {
    if (!user) {
      throw new Error('Неверно указан ID пользователя');
    }
    const {level, dificulty, score } = obj;

    if (!Number(level)) {
      throw new Error('Неверно указан уровень игры');
    }
    if (dificulty !== ('easy' || 'normal' || 'hard')) {
      throw new Error('Неверно указана сложность');
    }
    if (!Number(score)) {
      throw new Error('Неверный скор');
    }
    const newGame: GameWinType = {
      id: uuidv4(),
      userId: user,
      dificulty: dificulty,
      score: Number(score),
      level: Number(level),
      date: new Date()
    };
    return this.dbModel.addWin(newGame);
  };

  getWinGame = async (id: string): Promise<GameWinType | Error> => {
    if(!id) {
      throw new Error('Нет ID');
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
      throw new Error('Нет ID');
    }
    return this.dbModel.removeWinGame(id);
  };
  
  deleteAllWinGames = async (userId: string) => {
    if(!userId) {
      throw new Error('Нет ID');
    }
    return this.dbModel.deleteAllWinGames(userId);
  };

  saveGame = async (user: string, obj: rawGameSavedType): Promise<GameSavedType | Error> => {
    if (!user) {
      throw new Error('Неверно указан ID пользователя');
    }
    const {level, dificulty, score, name, state } = obj;

    if (!Number(level)) {
      throw new Error('Неверно указан уровень игры');
    }
    if (dificulty !== ('easy' || 'normal' || 'hard')) {
      throw new Error('Неверно указана сложность');
    }
    if (!Number(score)) {
      throw new Error('Неверный скор');
    }
    if (!name) {
      throw new Error('Укажите название');
    }
    if (JSON.stringify(state)) {
      throw new Error('Неверный формат данных');
    }
    const newGame: GameSavedType = {
      id: uuidv4(),
      userId: user,
      dificulty: dificulty,
      score: Number(score),
      level: Number(level),
      date: new Date(),
      name: name,
      state: JSON.stringify(state)
    };
    return this.dbModel.saveGame(newGame);
  };

  getSavedGame = async (id: string): Promise<GameWinType | Error> => {
    if(!id) {
      throw new Error('Нет ID');
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
