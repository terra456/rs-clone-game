export interface IAnimations {
    idle: ISprite;
    idleLeft: ISprite;
    run: ISprite;
    runLeft: ISprite;
    jump: ISprite;
    jumpLeft: ISprite;
    fall: ISprite;
    fallLeft: ISprite;
    image?: HTMLImageElement;
}

export interface ISprite {
    imageSrc: string;
    frameRate: number;
    frameBuffer?: number;
}

export enum Directions {
    left = 'left',
    right = 'right'
}