import { IAnimations, Directions, hitboxType, ICollusionBlock, IAnimationsEnemy } from './../types';
import type CollusionBlock from '../collusions/CollusionBlock';
import Sprite from '../sprite/Sprite';
import { collision, platformCollision } from '../utils';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
class Player extends Sprite {
  context: CanvasRenderingContext2D;
  position: { x: number, y: number };
  velocity: { x: number, y: number };
  gravity: number;
  field: { width: number, height: number };
  collusions: ICollusionBlock[];
  scale: number;
  imageSrc: string;
  hitbox: hitboxType;
  animations: any;
  lastDirection: Directions;
  platformCollusions: ICollusionBlock[];
  isStayOn: boolean;
  isDied: boolean;
  dieTimer: number;
  sprite: string;

  constructor (cont: CanvasRenderingContext2D, position: { x: number, y: number }, field: { width: number, height: number }, collusions: ICollusionBlock[], floorCollusions: ICollusionBlock[], imageSrc: string, frameRate: number, animations: IAnimations | IAnimationsEnemy) {
    super(cont, position, imageSrc, frameRate);
    this.context = cont;
    this.position = position;
    this.field = field;
    this.velocity = {
      x: 0,
      y: 1
    };
    this.gravity = 0.5;
    this.collusions = collusions;
    this.platformCollusions = floorCollusions;
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: animations.hitbox.width,
      height: animations.hitbox.height,
      offset: {
        x: animations.hitbox.offset.x,
        y: animations.hitbox.offset.y,
      }
    };
    this.animations = animations;
    this.lastDirection = Directions.right;

    this.isDied = false;
    this.isStayOn = false;
    this.dieTimer = 0;

    for (let key in this.animations) {
      const image: HTMLImageElement = new Image();
      image.src = this.animations[key].imageSrc;
      this.animations[key].image = image;
    }
  }

  switchSprite(key: string) {
    this.sprite = key;
    if (this.image === this.animations[key] || !this.loaded) return;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
  }

  update () {
    //квадраты для видимости
    this.context.fillStyle = 'rgba(255, 0, 0, 0.2)';
    this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.context.fillStyle = 'rgba(0, 0, 255, 0.8)';
    this.context.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
    this.updateFrames();
    this.updateHitbox();
    this.draw();
    this.position.x += this.velocity.x;
    this.updateHitbox();
    this.checkForHorizontalCollusions();
    this.applyGravity();
    this.updateHitbox();
    this.checkForVerticalCollusions();
  }

  updateHitbox () {
    this.hitbox.position.x = this.position.x + this.hitbox.offset.x;
    this.hitbox.position.y = this.position.y + this.hitbox.offset.y;
  }

  checkForHorizontalCollusions () {
    for (let i = 0; i < this.collusions.length; i++) {
      const collusionBlock = this.collusions[i];
      if (collision(this.hitbox, collusionBlock)) {
        if (this.velocity.x > 0) {
          this.stopX();
          const offset: number = this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collusionBlock.position.x - offset - 0.01;
          break;
        }
        if (this.velocity.x < 0) {
          this.stopX();
          const offset: number = this.hitbox.position.x - this.position.x;
          this.position.x = collusionBlock.position.x + collusionBlock.width - offset + 0.01;
          break;
        }
      }
    }
  }

  stopX () {
    this.velocity.x = 0;
  }

  checkForVerticalCollusions () {
    for (let i = 0; i < this.collusions.length; i++) {
      const collusionBlock = this.collusions[i];
      if (collision(this.hitbox, collusionBlock)) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.isStayOn = true;
          const offset: number = this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collusionBlock.position.y - offset - 0.01;
          this.touchDown();
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
    //platform collusions
    for (let i = 0; i < this.platformCollusions.length; i++) {
      const platformCollusionBlock = this.platformCollusions[i];
      if (platformCollision(this.hitbox, platformCollusionBlock)) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.isStayOn = true;
          const offset: number = this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = platformCollusionBlock.position.y - offset - 0.01;
          this.touchDown();
          break;
        }
      }
    }
  }

  touchDown () {
    return true;
  }

  applyGravity () {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  dying () {
    this.switchSprite('hit');
  }
}

export default Player;
