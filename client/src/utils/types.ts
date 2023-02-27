export interface IUserFull {
    id: number
    name: string,
    password: string,
    avatar: string,
    settings: string,
    lastLevel: number,
    totalScore: number
}

export type IUser = Omit<IUserFull, "id">;

export interface IGame {
    id: number,
    user_id: number,
    name: string,
    date: string,
    level: number,
    difficulty: string,
    score: number,
    state: string
}