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