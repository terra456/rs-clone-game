/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { collision } from '../utils';
import { ICollusionBlock, IAnimationsEnemy, Directions } from './../types';
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

  update (): void {
    super.update();
  }

  go () {
    this.velocity.x = -this.speed;
    this.lastDirection = Directions.left;
  }

  stopX (): void {
    const tempX = this.velocity.x;
    this.velocity.x = -tempX;
    console.log(this.lastDirection);
    if (this.lastDirection === Directions.left) {
      console.log('moveLeft');
      this.switchSprite('moveLeft');
      this.lastDirection = Directions.right;
    } else {
      this.switchSprite('move');
      this.lastDirection = Directions.left;
    }
  }
}

export default Enemy;
