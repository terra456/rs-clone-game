import { type SettingsType, type UserData } from '../game/types';

export const createUser = (name: string): UserData => {
  const userData: UserData = {
    name,
    saved: [],
    wins: [],
    level: 1,
    settings: {
      isMusic: true,
      music: 50,
      isSounds: true,
      sounds: 50,
      hardness: 'norm',
      language: 'ru'
    }
  };

  localStorage.setItem(name + 'Data', JSON.stringify(userData));

  return userData;
};

export const updateLevel = (name: string, level: number): UserData | undefined => {
  const saved = localStorage.getItem(name + 'Data');
  if (saved !== null) {
    const userData = JSON.parse(saved);
    userData.level = level;
    localStorage.setItem(name + 'Data', JSON.stringify(userData));
    return userData;
  }
};

export const saveWin = (name: string, level: number, score: number): UserData | undefined => {
  const saved = localStorage.getItem(name + 'Data');
  if (saved !== null) {
    const userData = JSON.parse(saved) as UserData;
    if (userData.level < level) {
      userData.level = level;
    }
    userData.wins.map((el) => {
      if (el.level === level && el.score < score) {
        return { level, score };
      } else {
        return el;
      }
    });
    localStorage.setItem(name + 'Data', JSON.stringify(userData));
    return userData;
  }
};

export const saveSettings = (name: string, settings: SettingsType): UserData | undefined => {
  const saved = localStorage.getItem(name + 'Data');
  if (saved !== null) {
    const userData = JSON.parse(saved);
    userData.settings = settings;
    localStorage.setItem(name + 'Data', JSON.stringify(userData));
    return userData;
  }
};
