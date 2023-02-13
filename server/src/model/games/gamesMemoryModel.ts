import { GameWinType, GameSavedType } from 'types';

class GamesMemoryModel {
  winGames: Array<GameWinType>;
  savedGames: Array<GameSavedType>;
  constructor() {
    this.winGames = [
      { id: '3f684454-fae8-4632-bf35-a3a54f3abc82',
        userId: '3f684454-fae8-4632-bf35-a3a54f3abc81',
        date: new Date(),
        level: 1,
        dificulty: 'normal',
        score: 365
      }
    ];
    this.savedGames = [
      { id: '3f684454-fae8-4632-bf35-a3a54f3abc82',
        userId: '3f684454-fae8-4632-bf35-a3a54f3abc81',
        date: new Date(),
        level: 1,
        dificulty: 'normal',
        score: 365,
        name: 'name',
        state: JSON.stringify({x:1, y:2})
      }
    ];
  }
  addWin = async (obj: GameWinType): Promise<GameWinType | Error> => {
    this.winGames.push(obj);
    return obj;
  };

  getWinGame = async (id: string): Promise<GameWinType | Error> => {
    const winIndex = this.winGames.findIndex((el) => el.id === id);
    if(winIndex === -1) {
      throw new Error('Сохранение не найдено');
    }
    return this.winGames[winIndex];
  };

  getVeryAllWinGames =async () => {
    return this.winGames;
  };

  removeWinGame = async (id: string): Promise<string | Error> => {
    const index = this.winGames.findIndex((el) => el.id === id);
    if(index === -1) {
      throw new Error('Пользователь не найден');
    }
    this.winGames.splice(index, 1);

    return id;
  };

  getAllWinGames = async (id: string): Promise<Array<GameWinType> | Error> => {
    const games = this.winGames.filter((el) => el.id === id);
    if (games) {
      return games;
    } else {
      throw new Error('Оконченных уровней нет');
    }
  };

  deleteAllWinGames = async (userId:string) => {
    this.winGames.filter((el) => el.userId !== userId);
    return true;
  };

  saveGame =async (obj: GameSavedType) => {
    this.savedGames.push(obj);
    return obj;
  };

  getSavedGame = async (id: string): Promise<GameSavedType | Error> => {
    const index = this.savedGames.findIndex((el) => el.id === id);
    if(index === -1) {
      throw new Error('Сохранение не найдено');
    }
    return this.savedGames[index];
  };

  deleteSavedGame = async (id: string): Promise<string | Error> => {
    const index = this.savedGames.findIndex((el) => el.id === id);
    if(index === -1) {
      throw new Error('Сохранение не найдено');
    }
    this.savedGames.splice(index, 1);
    return id;
  };

  getAllSaved = async (id: string) => {
    const games = this.savedGames.filter((el) => el.id === id);
    if (games) {
      return games;
    } else {
      throw new Error('Сохраненных игр нет');
    }
  };

  deleteAllSavedGames = async (userId:string) => {
    this.savedGames.filter((el) => el.userId !== userId);
    return true;
  };
}

export default GamesMemoryModel;