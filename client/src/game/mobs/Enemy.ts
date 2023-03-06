/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ICollusionBlock, IAnimationsEnemy } from './../types';
import Player from "./Player";

class Enemy extends Player {
  baseMoving: string;
  speed: number;
  price: number;

  constructor (
    cont: CanvasRenderingContext2D,
    position: { x: number, y: number },
    field: { width: number, height: number },
    floorCollusions: ICollusionBlock[],
    ceilingCollusions: ICollusionBlock[],
    platformCollusions: ICollusionBlock[],
    imageSrc: string,
    frameRate: number,
    animations: IAnimationsEnemy,
    speed: number,
    price: number
  ) {
    super(cont, position, field, floorCollusions, ceilingCollusions, platformCollusions, imageSrc, frameRate, animations);
    this.speed = speed;
    this.price = price;
  }

  update () {
    this.isDied ? this.switchSprite('hit') : this.switchSprite('move');
    super.update();
  }

  go () {
    this.velocity.x = -this.speed;
  }

  stopX (): void {
    const tempX = this.velocity.x;
    this.velocity.x = -tempX;
    this.image.style.transform = 'scale(-1, 1)';
  }
}

export default Enemy;
