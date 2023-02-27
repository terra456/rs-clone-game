/* eslint-disable @typescript-eslint/explicit-function-return-type */
import SpriteBase from '../sprite/SpriteBase';
import { coordinatesType, ICollusionBlock, type IAnimations } from '../types';
import { collision } from '../utils';
import Enemy from './Enemy';
import Player from './Player';

class Warior extends Player {
  cameraBox: { position: { x: number, y: number }, width: number, height: number, leftPadding: number };
  score: number;
  lifes: number;
  coins: ICollusionBlock[];
  enemies: Enemy[];
  gameOver: () => void;

  constructor (cont: CanvasRenderingContext2D, scale: number, position: { x: number, y: number }, field: { width: number, height: number }, collusions: ICollusionBlock[], floorCollusions: ICollusionBlock[], coins: ICollusionBlock[], enemies: Enemy[], imageSrc: string, frameRate: number, animations: IAnimations, gameOver: () => void) {
    super(cont, scale, position, field, collusions, floorCollusions, imageSrc, frameRate, animations)

    this.cameraBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: 300 / this.scale,
      height: 150 / this.scale,
      //вычитаем ширину спрайта
      leftPadding: ((300 - 160) / this.scale) / 2
    };
    this.lifes = 3;
    this.score = 0;
    this.coins = coins;
    this.enemies = enemies;
    this.gameOver = gameOver;
  }

  update () {
    super.update();
    //квадраты для видимости
    this.context.fillStyle = 'rgba(0, 255, 0, 0.2)';
    this.context.fillRect(this.cameraBox.position.x, this.cameraBox.position.y, this.cameraBox.width, this.cameraBox.height);
    this.updateCameraBox();
    if (!this.isDied) {
      this.checkCoins();
      this.checkFallOut();
      this.checkEnemies();
    } else {
      if (this.dieTimer >= 30) {
        if (this.lifes === 0) {
          this.gameOver();
        } else {
          this.isDied = false;
          this.dieTimer = 0;
          this.switchSprite('idle');
          this.position.y -= 200;
          this.position.x -= 500;
        }
      } else {
        this.switchSprite('hit');
      }
    }
  };

  updateCameraBox (): void {
    this.cameraBox.position = {
      // позиционирование камеры примерно посередине
      x: this.position.x - this.cameraBox.leftPadding,
      y: this.position.y
    };
  }

  isCameraRight (camera: { position: coordinatesType }) {
    const cameraRightSide: number = this.cameraBox.position.x + this.cameraBox.width;
    // ширина всей игры
    if (cameraRightSide >= 6000) return;
    if (cameraRightSide >= this.field.width) {
      camera.position.x -= this.velocity.x;
    }
  }

  isCameraLeft (camera: { position: coordinatesType }) {
    const cameraLeftSide: number = this.cameraBox.position.x;
    // ширина всей игры
    // if (cameraLeftSide <= 0) return;
    if (cameraLeftSide >= 0) {
      camera.position.x -= this.velocity.x;
    }
  }

  checkCoins () {
    for (let i = 0; i < this.coins.length; i++) {
      const coin = this.coins[i];
      if (collision(this.hitbox, coin)) {
        this.score += 5;
        this.coins.splice(i, 1);
      }
    }
  }

  checkEnemies () {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      if (!enemy.isDied) {
        if (collision(this.hitbox, enemy)) {
          console.log('crash');
          if (this.velocity.y > 0) {
            enemy.isDied = true;
            this.score += enemy.price;
          } else {
            this.die();
          }
        }
      }
      if (enemy.dieTimer >= 16) {
        this.enemies.splice(i, 1);
      }
    }
  }

  checkFallOut () {
    if (this.hitbox.position.y + this.hitbox.height >= this.field.height / this.scale) {
      this.die();
    }
  }

  die () {
    this.lifes -= 1;
    this.isDied = true;
  }
}

export default Warior;
