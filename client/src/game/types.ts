import { type } from './maps/honey-grot';

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export interface IAnimationsBase {
  hitbox: {
    width: number
    height: number
    offset: {
      x: number
      y: number
    }
  }
}

export interface IAnimations extends IAnimationsBase {
  idle: ISprite
  idleLeft: ISprite
  run: ISprite
  runLeft: ISprite
  jump: ISprite
  jumpLeft: ISprite
  fall: ISprite
  fallLeft: ISprite
  hit: ISprite
  atack: ISprite
  atackLeft: ISprite
  image?: HTMLImageElement
}

export interface IAnimationsEnemy extends IAnimationsBase {
  idle?: ISprite
  move: ISprite
  moveLeft?: ISprite
  run?: ISprite
  attack?: ISprite
  attackLeft?: ISprite
  hide?: ISprite
  hideLeft?: ISprite
  hit: ISprite
  hitLeft?: ISprite
}

export interface ISprite {
  imageSrc?: string
  frameRate: number
  frameBuffer?: number
}

export enum Directions {
  left = 'left',
  right = 'right'
}

export type PlayerSoundType = {
  attack: string
  run: string
  hit: string
  jump: string
  landing: string
  coin: string
  kill: string
}

export type hitboxType = {
  position: coordinatesType
  width: number
  height: number
  offset: coordinatesType
};

export type hitboxSmallType = {
  position: coordinatesType
  width: number
  height: number
};

export type coordinatesType = {
  x: number
  y: number
}

export interface ICollusionBlock {
  context: CanvasRenderingContext2D
  position: { x: number, y: number }
  width: number
  height: number
  size?: number
  imgSrc?: string
  draw: () => void
  update: () => void
}

export type TilesFieldType = {
  context: CanvasRenderingContext2D
  size: number
  columns: number
  imgSrc: string
  loaded?: boolean
  scale?: number
  tileColumns: number
}

export type layerType = {
  data: number[]
  height: number
  id: number
  name: string
  opacity: number
  type: string
  visible: boolean
  width: number
  x: number
  y: number
};

export type tilemapType = {
  file: string
  tilecount: number
  columns: number
  width: number
  height: number
}

export type UserData = {
  name: string
  saved: []
  level: number
  settings: SettingsType
  wins: WinGameInfo[]
}

export type SettingsType = {
  isMusic: boolean
  music: number
  isSounds: boolean
  sounds: number
  hardness: 'norm' | 'easy' | 'hard' | string
  language: 'ru' | 'en' | string
}

export type WinGameInfo = {
  level: number
  score: number
}
