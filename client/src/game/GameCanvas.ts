import { Directions, IAnimations } from './types';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import Player from './mobs/Player';
import Sprite from './sprite/Sprite';
import { floorCollisions, platformCollisions } from './maps/collisions';
import CollusionField from './collusions/CollusionField';
import Background from './maps/1_level/Background';
import SpriteBase from './sprite/SpriteBase';
import Warior from './mobs/Warior';

class GameCanvas {
  scaledCanvas: { width: number, height: number };
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  scale: number;
  gameField: { width: number, height: number };

  constructor (parentNode: HTMLElement, width = 1024, height = 576) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.gameField = {
      width: 5948,
      height: 1055
    };
    //делим на высоту фона, т.е игрового поля.
    this.scale = this.canvas.height / this.gameField.height;
    console.log(this.scale);
    this.scaledCanvas = {
      width: width * this.scale,
      height: height * this.scale
    };
    parentNode.appendChild(this.canvas);
    const context = this.canvas.getContext('2d');
    if (context != null) {
      this.animate(context, this.canvas.width, this.canvas.height, this.canvas);
    }
  }

  animate (context: CanvasRenderingContext2D, w: number, h: number, scaledCanvas: { width: number, height: number }) {
    const field = scaledCanvas;
    const keys = {
      left: false,
      right: false
    };
    const scale: number = this.scale;
    const camera = {
      position: {
        x: 0,
        y: 0
      }
    };

    const collusionField = new CollusionField(context, 16 / scale);
    const floorCollusions = collusionField.generateCollusionBlocks(floorCollisions);
    const platformCollusions = collusionField.generateCollusionBlocks(platformCollisions);
    // const background = new Background(context, '../../assets/background.png', field.width);
    const background2 = new SpriteBase(context, { x: 0, y: 1055 - 571 }, '../assets/background/1_level/mtn.png', 1);
    const background1 = new SpriteBase(context, { x: 0, y: 0 }, '../assets/background/1_level/bg_1.png', 1);
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
    };
    const player = new Warior(
      context,
      scale,
      { x: 10, y: 300 },
      field,
      floorCollusions,
      platformCollusions,
      '../../assets/warrior/Idle.png',
      8,
      playerAnimation);
    //const player2 = new Player(context, this.scale, { x: 50, y: 50 }, { width: this.canvas.width, height: this.canvas.height }, floorCollusions,'../../assets/warrior/Idle.png', 8);
    function animationLoop () {
      window.requestAnimationFrame(animationLoop);
      context.fillStyle = 'grey';
      context.fillRect(0, 0, w, h);
      context.save();
      context.scale(scale, scale);
      // ecли scale 1, то scaledCanvas.height = this.canvas.height
      context.translate(camera.position.x, 0);
      // background.update();
      background2.position.x = 0;
      background2.update();
      console.log(background2.width, background2.position);
      background1.update();
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
        // if (player.isCameraLeft()) {
        //   camera.position.x -= player.velocity.x;
        // };
        player.isCameraLeft(camera);
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
