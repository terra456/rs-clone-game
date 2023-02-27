/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ICollusionBlock, IAnimationsEnemy } from './../types';
import Player from "./Player";

class Enemy extends Player {
  baseMoving: string;
  speed: number;
  price: number;

  constructor (cont: CanvasRenderingContext2D, scale: number, position: { x: number, y: number }, field: { width: number, height: number }, collusions: ICollusionBlock[], floorCollusions: ICollusionBlock[], imageSrc: string, frameRate: number, animations: IAnimationsEnemy, speed: number, price: number) {
    super(cont, scale, position, field, collusions, floorCollusions, imageSrc, frameRate, animations);
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
}

export default Enemy;
