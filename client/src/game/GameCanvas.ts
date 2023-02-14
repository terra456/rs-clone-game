/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Player from './mobs/Player';
import Sprite from './sprite/Sprite';

class GameCanvas {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  constructor (parentNode: HTMLElement, width = 1024, height = 576) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    parentNode.appendChild(this.canvas);
    const context = this.canvas.getContext('2d');
    if (context != null) {
      this.animate(context, width, height);
    }
  }

  animate (context: CanvasRenderingContext2D, w: number, h: number) {
    const player = new Player(context, { x: 10, y: 10 });
    const player2 = new Player(context, { x: 50, y: 50 });
    const background = new Sprite(context, { x: 10, y: 10 }, '../assets/background.png');
    function animationLoop () {
      window.requestAnimationFrame(animationLoop);
      context.fillStyle = 'grey';
      context.fillRect(0, 0, w, h);
      background.draw();
      player.update();
      player2.update();
    };
    animationLoop();
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 37:
          console.log('left');
          break;
        case 38:
          console.log('up');
          break;
        case 39:
          console.log('right');
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
