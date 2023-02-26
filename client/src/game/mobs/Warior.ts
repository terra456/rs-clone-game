/* eslint-disable @typescript-eslint/explicit-function-return-type */
import SpriteBase from '../sprite/SpriteBase';
import { coordinatesType, ICollusionBlock, type IAnimations } from '../types';
import { collision } from '../utils';
import Player from './Player';

class Warior extends Player {
  cameraBox: { position: { x: number, y: number }, width: number, height: number, leftPadding: number };
  score: number;
  lifes: number;
  coins: ICollusionBlock[];
  gameOver: () => void;
  isDie: boolean;

  constructor (cont: CanvasRenderingContext2D, scale: number, position: { x: number, y: number }, field: { width: number, height: number }, collusions: ICollusionBlock[], floorCollusions: ICollusionBlock[], coins: ICollusionBlock[], imageSrc: string, frameRate: number, animations: IAnimations, gameOver: () => void) {
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
    this.gameOver = gameOver;
    this.isDie = false;
  }

  update () {
    if (!this.isDie) {
      super.update();
      //квадраты для видимости
      this.context.fillStyle = 'rgba(0, 255, 0, 0.2)';
      this.context.fillRect(this.cameraBox.position.x, this.cameraBox.position.y, this.cameraBox.width, this.cameraBox.height);
      this.updateCameraBox();
      this.checkCoins();
      this.checkFallOut();
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
    if (cameraRightSide >= (this.field.width / this.scale) / 2) {
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

  checkFallOut () {
    if (this.hitbox.position.y + this.hitbox.height >= this.field.height / this.scale) {
      this.die();
    }
  }

  die () {
    this.lifes -= 1;
    if (this.lifes === 0) {
      this.gameOver();
    } else {
      this.position.y -= 200;
      this.position.x -= 500;
    }
  }

  crashIntoMob () {
    this.switchSprite('die');
    this.die();
  }
}

export default Warior;
