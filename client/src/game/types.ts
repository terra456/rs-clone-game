/* eslint-disable @typescript-eslint/consistent-type-definitions */
export interface IAnimations {
  idle: ISprite
  idleLeft: ISprite
  run: ISprite
  runLeft: ISprite
  jump: ISprite
  jumpLeft: ISprite
  fall: ISprite
  fallLeft: ISprite
  die: ISprite
  image?: HTMLImageElement
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

export type hitboxType = {
  position: coordinatesType
  width: number
  height: number
  offset: coordinatesType
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
