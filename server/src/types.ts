export type UserType = {
  id?: string,
  name: string,
  password?: string,
  avatar?: string,
  settings?: string,
  lastLevel?: number,
  totalScore?: number
};

export type GameWinType = {
  id?: string,
  user_id:string | number,
  date?: Date | string | any,
  level: number,
  dificulty: string,
  score: number,
  wins_user_id_fkey?: number
};

export type rawGameWinType = {
  id?: string,
  userId?:string,
  date?: Date | string,
  level?: number,
  dificulty?: string,
  score?: number
};

export type GameSavedType = {
  id?: string,
  user_id?: number,
  userId?:string,
  saved_user_id_fkey?: number
  date?: Date | Date,
  level: number,
  dificulty: string,
  score: number,
  name: string,
  state: string
};

export type rawGameSavedType = {
  id?: string,
  userId?: string,
  date?: Date | Date,
  level?: number,
  dificulty?: string,
  score?: number,
  name?: string,
  state?: string
};