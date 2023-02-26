import { Directions, IAnimations, IAnimationsEnemy } from './types';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import Player from './mobs/Player';
import Sprite from './sprite/Sprite';
import Background from './maps/Background';
import SpriteBase from './sprite/SpriteBase';
import Warior from './mobs/Warior';
import TilesField from './collusions/TilesField';
import { layers } from './maps/1_level/map';
import CollusionField from './collusions/CollusionField';
import Enemy from './mobs/Enemy';

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

    let myReq: any;

    const gameOver = (): void => {
      cancelAnimationFrame(myReq);
      context.strokeText('Game Ower', w / 2 - 100, h / 2);
    };
    const tilesField = new TilesField(context, 16, layers[0].width, '../assets/background/1_level/Tileset.png', scale);
    const tiles = tilesField.generateCollusionBlocks(layers[0].data);
    const tiles1 = tilesField.generateCollusionBlocks(layers[1].data);
    const collisionField = new CollusionField(context, 16, layers[0].width);
    const coins = collisionField.generateCollusionBlocks(layers[2].data, '../assets/icons/coin.png');
    const background1 = new SpriteBase(context, { x: 0, y: 0 }, '../assets/background/1_level/bg_1.png', 1);
    const bgLoop = new Background(context, scaledCanvas, scale);
    const bgImages = bgLoop.generate('../assets/background/1_level/mtn.png', { width: 2618, height: 571 });
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
      die: {
        imageSrc: '../../assets/warrior/Die.png',
        frameRate: 8,
        frameBuffer: 3,
      },
    };
    const coinImg = new SpriteBase(context, { x: w - 120, y: 15 }, '../assets/icons/coin.png');
    const lifeHearts: SpriteBase[] = [];
    for (let i = 0; i < 3; i++) {
      lifeHearts.push(new SpriteBase(context, { x: 30 + i * 30, y: 15 }, '../assets/icons/heart.png', 0.5));
    }
    const player = new Warior(
      context,
      scale,
      { x: 10, y: 300 },
      field,
      tiles,
      tiles1,
      coins,
      '../../assets/warrior/Idle.png',
      8,
      playerAnimation,
      gameOver);

    const mobAnimation: IAnimationsEnemy = {
      fly: {
        imageSrc: '../../assets/enemy/fly.png',
        frameRate: 4,
        frameBuffer: 3,
      },
      flyLeft: {
        imageSrc: '../../assets/enemy/flyLeft.png',
        frameRate: 4,
        frameBuffer: 3,
      },
      attack: {
        imageSrc: '../../assets/enemy/attack.png',
        frameRate: 4,
        frameBuffer: 3,
      },
      attackLeft: {
        imageSrc: '../../assets/enemy/attackLeft.png',
        frameRate: 4,
        frameBuffer: 3,
      },
      hit: {
        imageSrc: '../../assets/enemy/hit.png',
        frameRate: 4,
        frameBuffer: 3,
      },
    }
    const enemyMob = new Enemy(
      context,
      scale,
      {x: 30, y: 400},
      field,
      tiles,
      tiles1,
      '../../assets/enemy/fly.png',
      4,
      mobAnimation
    );

    function animationLoop () {
      myReq = window.requestAnimationFrame(animationLoop);
      context.fillStyle = 'grey';
      context.fillRect(0, 0, w, h);
      context.save();
      context.scale(scale, scale);
      // ecли scale 1, то scaledCanvas.height = this.canvas.height
      context.translate(camera.position.x, 0);
      bgImages.forEach((block) => {
        block.update();
      });
      background1.update();
      tiles.forEach((block) => {
        block.update();
      });
      tiles1.forEach((block) => {
        block.update();
      });
      coins.forEach((block) => {
        block.update();
      });
      player.update();
      player.velocity.x = 0;
      if (keys.left) {
        player.switchSprite('runLeft');
        player.velocity.x = -5;
        player.lastDirection = Directions.left;
        player.isCameraLeft(camera);
      } else if (keys.right) {
        player.switchSprite('run');
        player.velocity.x = 5;
        player.lastDirection = Directions.right;
        player.isCameraRight(camera);
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

      enemyMob.update();

      context.restore();
      if (lifeHearts.length > player.lifes) {
        lifeHearts.pop();
      }
      lifeHearts.forEach((el) => {
        el.update();
      });
      coinImg.update();
      context.strokeText(player.score.toString(), w - 50, 50);
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
          player.crashIntoMob();
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
