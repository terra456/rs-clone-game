import type CollusionBlock from '../collusions/CollusionBlock';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
class Player {
  context: CanvasRenderingContext2D;
  position: { x: number, y: number };
  width: number;
  height: number;
  velocity: { x: number, y: number };
  gravity: number;
  field: { width: number, height: number };
  collusions: CollusionBlock[];
  scale: number;

  constructor (cont: CanvasRenderingContext2D, scale: number, position: { x: number, y: number }, field: { width: number, height: number }, collusions: CollusionBlock[]) {
    this.context = cont;
    this.position = position;
    this.field = field;
    this.scale = scale;
    this.width = 100 / this.scale;
    this.height = 100 / this.scale;
    this.velocity = {
      x: 0,
      y: 1
    };
    this.gravity = 0.5;
    this.collusions = collusions;
  }

  draw () {
    this.context.fillStyle = 'red';
    this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update () {
    this.draw();
    this.position.x += this.velocity.x;
    this.checkForHorizontalCollusions();
    this.applyGravity();
    this.checkForVerticalCollusions();
    // this.position.y += this.velocity.y;
    // if (this.position.y + this.height + this.velocity.y < this.field.height) {
    //   this.velocity.y += this.gravity;
    // } else {
    //   this.velocity.y = 0;
    // }
  }

  checkForHorizontalCollusions () {
    for (let i = 0; i < this.collusions.length; i++) {
      const collusionBlock = this.collusions[i];
      if (this.position.y + this.height >= collusionBlock.position.y &&
        this.position.y <= collusionBlock.position.y + collusionBlock.height &&
        this.position.x <= collusionBlock.position.x + collusionBlock.width &&
        this.position.x + this.width >= collusionBlock.position.x) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          this.position.x = collusionBlock.position.x - this.width - 0.01;
          break;
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          this.position.x = collusionBlock.position.x + collusionBlock.width + 0.01;
          break;
        }
      }
    }
  }

  checkForVerticalCollusions () {
    for (let i = 0; i < this.collusions.length; i++) {
      const collusionBlock = this.collusions[i];
      if (this.position.y + this.height >= collusionBlock.position.y &&
        this.position.y <= collusionBlock.position.y + collusionBlock.height &&
        this.position.x <= collusionBlock.position.x + collusionBlock.width &&
        this.position.x + this.width >= collusionBlock.position.x) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.position.y = collusionBlock.position.y - this.height - 0.01;
          break;
        }
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.position.y = collusionBlock.position.y + collusionBlock.height + 0.01;
          break;
        }
      }
    }
  }

  applyGravity () {
    this.position.y += this.velocity.y;
    this.velocity.y += this.gravity;
  }
}

export default Player;
