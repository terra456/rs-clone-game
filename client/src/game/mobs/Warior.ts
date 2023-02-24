/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { coordinatesType, type CollusionBlock, type IAnimations } from '../types';
import { collision } from '../utils';
import Player from './Player';

class Warior extends Player {
  cameraBox: { position: { x: number, y: number }, width: number, height: number, leftPadding: number };
  score: number;
  lifes: number;
  coins: CollusionBlock[];

  constructor (cont: CanvasRenderingContext2D, scale: number, position: { x: number, y: number }, field: { width: number, height: number }, collusions: CollusionBlock[], floorCollusions: CollusionBlock[], coins: CollusionBlock[], imageSrc: string, frameRate: number, animations: IAnimations) {
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
  }

  update () {
    super.update();
    //квадраты для видимости
    this.context.fillStyle = 'rgba(0, 255, 0, 0.2)';
    this.context.fillRect(this.cameraBox.position.x, this.cameraBox.position.y, this.cameraBox.width, this.cameraBox.height);
    this.updateCameraBox();
    this.checkCoins();
  };

  updateCameraBox (): void {
    this.cameraBox.position = {
      // позиционирование камеры примерно посередине
      x: this.position.x - this.cameraBox.leftPadding,
      y: this.position.y
    };
  }

  isCameraLeft (camera: { position: coordinatesType }) {
    const cameraRightSide: number = this.cameraBox.position.x + this.cameraBox.width;
    // ширина всей игры
    if (cameraRightSide >= 6000) return;
    if (cameraRightSide >= this.field.width) {
      camera.position.x -= this.velocity.x;
    }
  }

  checkCoins () {
    for (let i = 0; i < this.coins.length; i++) {
      const coin = this.coins[i];
      if (collision(this.hitbox, coin)) {
        this.score += 5;
        this.coins.splice(i, 1);
        console.log(this.score);
      }
    }
  }
}

export default Warior;
