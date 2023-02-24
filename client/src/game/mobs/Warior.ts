/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { coordinatesType, type CollusionBlock, type IAnimations } from '../types';
import Player from './Player';

class Warior extends Player {
  cameraBox: { position: { x: number, y: number }, width: number, height: number, leftPadding: number };

  constructor (cont: CanvasRenderingContext2D, scale: number, position: { x: number, y: number }, field: { width: number, height: number }, collusions: CollusionBlock[], floorCollusions: CollusionBlock[], imageSrc: string, frameRate: number, animations: IAnimations) {
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
    console.log(this.cameraBox.leftPadding);
  }

  update () {
    super.update();
    //квадраты для видимости
    this.context.fillStyle = 'rgba(0, 255, 0, 0.2)';
    this.context.fillRect(this.cameraBox.position.x, this.cameraBox.position.y, this.cameraBox.width, this.cameraBox.height);
    this.updateCameraBox();
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
}

export default Warior;
