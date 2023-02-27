/* eslint-disable @typescript-eslint/consistent-type-definitions */
export interface IAnimationsBase {
  hitbox: {
    width: number,
    height: number,
    offset: {
      x: number,
      y: number,
    }
  },
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
  hit: ISprite
}

export interface ISprite {
  imageSrc: string
  frameRate: number
  frameBuffer?: number
}

export enum Directions {
  left = 'left',
  right = 'right'
}

export interface IPlayerSound {
  attack: string
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
