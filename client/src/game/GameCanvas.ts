/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Player from './mobs/Player';
import Sprite from './sprite/Sprite';
import { floorCollisions, platformCollisions } from './levels/maps/collisions';
import CollusionField from './levels/maps/CollusionField';

class GameCanvas {
  scaledCanvas: { width: number, height: number };
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor (parentNode: HTMLElement, width = 1024, height = 576) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.scaledCanvas = {
      width: width / 4,
      height: height / 4
    };
    parentNode.appendChild(this.canvas);
    const context = this.canvas.getContext('2d');
    if (context != null) {
      this.animate(context, this.canvas.width, this.canvas.height, this.scaledCanvas);
    }
  }

  animate (context: CanvasRenderingContext2D, w: number, h: number, scale: { width: number, height: number }) {
    const keys = {
      left: false,
      right: false
    };
    const player = new Player(context, { x: 10, y: 10 }, { width: this.canvas.width, height: this.canvas.height });
    const player2 = new Player(context, { x: 50, y: 50 }, { width: this.canvas.width, height: this.canvas.height });
    const background = new Sprite(context, { x: 0, y: 0 }, '../assets/background.png');
    const collusionField = new CollusionField(context, 16);
    const floorCollusions = collusionField.generateCollusionBlocks(floorCollisions);
    const platformCollusions = collusionField.generateCollusionBlocks(platformCollisions);
    function animationLoop () {
      window.requestAnimationFrame(animationLoop);
      context.fillStyle = 'grey';
      context.fillRect(0, 0, w, h);
      context.save();
      context.scale(4, 4);
      context.translate(0, -Number(background.image.height) + scale.height);
      background.update();
      floorCollusions.forEach((block) => {
        block.update();
      });
      platformCollusions.forEach((block) => {
        block.update();
      });
      context.restore();
      player.update();
      player.velocity.x = 0;
      if (keys.left) {
        player.velocity.x = -3;
      } else if (keys.right) {
        player.velocity.x = 3;
      }
      player2.update();
    };
    animationLoop();
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 37:
          console.log('left');
          keys.left = true;
          break;
        case 38:
          console.log('up');
          player.velocity.y = -15;
          break;
        case 39:
          console.log('right');
          keys.right = true;
          break;
        case 40:
          console.log('down');
          break;
        case 32:
          console.log('space');
          event.preventDefault();
          break;

        default:
          console.log(event.keyCode);
          break;
      }
    });
    window.addEventListener('keyup', (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 37:
          console.log('left');
          keys.left = false;
          break;
        case 39:
          console.log('right');
          keys.right = false;
          break;
        case 40:
          console.log('down');
          break;
        case 32:
          console.log('space');
          event.preventDefault();
          break;

        default:
          console.log(event.keyCode);
          break;
      }
    });
  };
}

export default GameCanvas;
