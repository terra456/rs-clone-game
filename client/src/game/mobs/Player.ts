import { IAnimations, Directions } from './../types';
import type CollusionBlock from '../collusions/CollusionBlock';
import Sprite from '../sprite/Sprite';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
class Player extends Sprite {
  context: CanvasRenderingContext2D;
  position: { x: number, y: number };
  //width: number;
  //height: number;
  velocity: { x: number, y: number };
  gravity: number;
  field: { width: number, height: number };
  collusions: CollusionBlock[];
  scale: number;
  imageSrc: string;
  hitbox: { position: { x: number; y: number; }; width: number; height: number; };
  animations: any;
  lastDirection: Directions;

  constructor (cont: CanvasRenderingContext2D, scale: number, position: { x: number, y: number }, field: { width: number, height: number }, collusions: CollusionBlock[], imageSrc: string, frameRate: number, animations: IAnimations) {
    super(cont, position, imageSrc, frameRate, scale);
    this.context = cont;
    this.position = position;
    this.field = field;
    this.scale = scale;
    //this.width = 100 / this.scale;
    //this.height = 100 / this.scale;
    this.velocity = {
      x: 0,
      y: 1
    };
    this.gravity = 0.5;
    this.collusions = collusions;
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    }
    this.animations = animations;
    this.lastDirection = Directions.right;

    for (let key in this.animations) {
      const image: HTMLImageElement = new Image();
      image.src = this.animations[key].imageSrc;
      this.animations[key].image = image;
    }
  }

  //draw () {
    //this.context.fillStyle = 'red';
    //this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
  //}

  switchSprite(key: string) {
    if (this.image === this.animations[key] || !this.loaded) return;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
  }

  update () {
    this.updateFrames();
    this.updateHitbox();
    this.draw();
    this.position.x += this.velocity.x;
    this.updateHitbox();
    this.checkForHorizontalCollusions();
    this.applyGravity();
    this.updateHitbox();
    this.checkForVerticalCollusions();
    // this.position.y += this.velocity.y;
    // if (this.position.y + this.height + this.velocity.y < this.field.height) {
    //   this.velocity.y += this.gravity;
    // } else {
    //   this.velocity.y = 0;
    // }
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 35,
        y: this.position.y + 26,
      },
      width: 14,
      height: 27,
    }
  }

  checkForHorizontalCollusions () {
    for (let i = 0; i < this.collusions.length; i++) {
      const collusionBlock = this.collusions[i];
      if (this.hitbox.position.y + this.hitbox.height >= collusionBlock.position.y &&
        this.hitbox.position.y <= collusionBlock.position.y + collusionBlock.height &&
        this.hitbox.position.x <= collusionBlock.position.x + collusionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >= collusionBlock.position.x) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          const offset: number = this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collusionBlock.position.x - offset - 0.01;
          break;
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          const offset: number = this.hitbox.position.x - this.position.x;
          this.position.x = collusionBlock.position.x + collusionBlock.width - offset + 0.01;
          break;
        }
      }
    }
  }

  checkForVerticalCollusions () {
    for (let i = 0; i < this.collusions.length; i++) {
      const collusionBlock = this.collusions[i];
      if (this.hitbox.position.y + this.hitbox.height >= collusionBlock.position.y &&
        this.hitbox.position.y <= collusionBlock.position.y + collusionBlock.height &&
        this.hitbox.position.x <= collusionBlock.position.x + collusionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >= collusionBlock.position.x) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset: number = this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collusionBlock.position.y - offset - 0.01;
          break;
        }
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset: number = this.hitbox.position.y - this.position.y;
          this.position.y = collusionBlock.position.y + collusionBlock.height - offset + 0.01;
          break;
        }
      }
    }
  }

  applyGravity () {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }
}

export default Player;
