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
  id: string,
  userId:string,
  date: Date,
  level: number,
  dificulty: string,
  score: number
};

export type rawGameWinType = {
  id?: string,
  userId?:string,
  date?: Date,
  level?: number,
  dificulty?: string,
  score?: number
};

export type GameSavedType = {
  id: string,
  userId:string,
  date: Date,
  level: number,
  dificulty: string,
  score: number,
  name: string,
  state: string
};

export type rawGameSavedType = {
  id?: string,
  userId?: string,
  date?: Date,
  level?: number,
  dificulty?: string,
  score?: number,
  name?: string,
  state?: string
};