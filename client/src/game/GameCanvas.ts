import { Directions, IAnimations } from './types';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Player from './mobs/Player';
import Sprite from './sprite/Sprite';
import { floorCollisions, platformCollisions } from './maps/collisions';
import CollusionField from './collusions/CollusionField';

class GameCanvas {
  scaledCanvas: { width: number, height: number };
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  scale: number;

  constructor (parentNode: HTMLElement, width = 1024, height = 576) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.scale = 4;
    this.scaledCanvas = {
      width: width / this.scale,
      height: height / this.scale
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
    const collusionField = new CollusionField(context, 16);
    const floorCollusions = collusionField.generateCollusionBlocks(floorCollisions);
    const platformCollusions = collusionField.generateCollusionBlocks(platformCollisions);
    const background = new Sprite(context, { x: 0, y: 0 }, '../assets/background.png');
    const playerAnimation: IAnimations = {
      idle: {
        imageSrc: '../../assets/warrior/Idle.png',
        frameRate: 8,
        frameBuffer: 3,
      },
      idleLeft: {
        imageSrc: '../../assets/warrior/IdleLeft.png',
        frameRate: 8,
        frameBuffer: 3,
      },
      run: {
        imageSrc: '../../assets/warrior/Run.png',
        frameRate: 8,
        frameBuffer: 5,
      },
      runLeft: {
        imageSrc: '../../assets/warrior/RunLeft.png',
        frameRate: 8,
        frameBuffer: 5,
      },
      jump: {
        imageSrc: '../../assets/warrior/Jump.png',
        frameRate: 2,
        frameBuffer: 3,
      },
      jumpLeft: {
        imageSrc: '../../assets/warrior/JumpLeft.png',
        frameRate: 2,
        frameBuffer: 3,
      },
      fall: {
        imageSrc: '../../assets/warrior/Fall.png',
        frameRate: 2,
        frameBuffer: 3,
      },
      fallLeft: {
        imageSrc: '../../assets/warrior/FallLeft.png',
        frameRate: 2,
        frameBuffer: 3,
      },      
    }
    const player = new Player(context, this.scale, { x: 10, y: 10 }, { width: this.canvas.width, height: this.canvas.height }, floorCollusions, '../../assets/warrior/Idle.png', 8, playerAnimation);
    //const player2 = new Player(context, this.scale, { x: 50, y: 50 }, { width: this.canvas.width, height: this.canvas.height }, floorCollusions,'../../assets/warrior/Idle.png', 8);
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
      player.update();
      player.velocity.x = 0;
      if (keys.left) {
        player.switchSprite('runLeft');
        player.velocity.x = -2;
        player.lastDirection = Directions.left;
      } else if (keys.right) {
        player.switchSprite('run');
        player.velocity.x = 2;
        player.lastDirection = Directions.right;
      } else if (player.velocity.y === 0) {
        player.lastDirection === Directions.right ? player.switchSprite('idle') : player.switchSprite('idleLeft');
      }

      if (player.velocity.y < 0) {
        player.lastDirection === Directions.right ? player.switchSprite('jump') : player.switchSprite('jumpLeft');
      } else if (player.velocity.y > 0) {
        if (player.lastDirection === Directions.right) {
          player.switchSprite('fall');
        } else {
          player.switchSprite('fallLeft');
        }
      }


      //player2.update();
      context.restore();
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
          player.velocity.y = -10;
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
          keys.left = false;
          break;
        case 39:
          keys.right = false;
          break;
        case 40:
          break;
        case 32:
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
