import { Directions, IAnimations, IAnimationsEnemy } from './types';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import Player from './mobs/Player';
import Background from './maps/Background';
import SpriteBase from './sprite/SpriteBase';
import Warior from './mobs/Warior';
import TilesField from './collusions/TilesField';
import { layers } from './maps/1_level/map';
import CollusionField from './collusions/CollusionField';
import { wariorAnimation } from './mobs/animations';

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
      right: false,
      atack: false
    };
    const scale: number = this.scale;
    const camera = {
      position: {
        x: 0,
        y: 0
      }
    };

    let myReq: any;
    let isPaused: boolean = false;

    const gameOver = (): void => {
      cancelAnimationFrame(myReq);
    };

    const winGame = (score: number): void => {
      cancelAnimationFrame(myReq);
      console.log('win!!!', score);
    };

    const pauseGame = (): void => {
      isPaused = true;
      cancelAnimationFrame(myReq);
    };

    const resumeGame = (): void => {
      isPaused = false;
      animationLoop();
    };

    const tilesField = new TilesField(context, 16, layers[0].width, '../assets/background/1_level/Tileset.png', scale);
    const tiles = tilesField.generateCollusionBlocks(layers[0].data);
    const tiles1 = tilesField.generateCollusionBlocks(layers[1].data);
    const params = {
      scale,
      field,
      tiles,
      tiles1
    };
    const collisionField = new CollusionField(context, 16, layers[0].width);
    const coins = collisionField.generateCollusionBlocks(layers[2].data, '../assets/icons/coin.png');
    const enemies = collisionField.generateEnemies(layers[3].data, params);
    const background1 = new SpriteBase(context, { x: 0, y: 0 }, '../assets/background/1_level/bg_1.png', 1);
    const bgLoop = new Background(context, scaledCanvas, scale);
    const bgImages = bgLoop.generate('../assets/background/1_level/mtn.png', { width: 2618, height: 571 });
    const coinImg = new SpriteBase(context, { x: w - 120, y: 15 }, '../assets/icons/coin.png');
    const gem = new SpriteBase(context, { x: this.gameField.width - 200, y: this.gameField.height * 0.7 }, '../assets/icons/gem.png');
    console.log(this.gameField.width - 200, this.gameField.height * 0.7);
    const lifeHearts: SpriteBase[] = [];
    for (let i = 0; i < 3; i++) {
      lifeHearts.push(new SpriteBase(context, { x: 30 + i * 30, y: 15 }, '../assets/icons/heart.png', 0.5));
    }
    const playerSounds = {
      attack: '../assets/audio/sounds/12_Player_Movement_SFX/56_Attack_03.wav',
      run: '../assets/audio/sounds/12_Player_Movement_SFX/03_Step_grass_03.wav',
      hit: '../assets/audio/sounds/12_Player_Movement_SFX/61_Hit_03.wav',
      jump: '../assets/audio/sounds/12_Player_Movement_SFX/30_Jump_03.wav',
      landing: '../assets/audio/sounds/12_Player_Movement_SFX/45_Landing_01.wav',
      coin: '../assets/audio/sounds/10_UI_Menu_SFX/079_Buy_sell_01.wav'
    }
    const player = new Warior(
      context,
      scale,
      { x: 10, y: 300 },
      field,
      tiles,
      tiles1,
      coins,
      enemies,
      '../../assets/warrior/Idle.png',
      8,
      wariorAnimation,
      gameOver,
      winGame,
      gem,
      playerSounds
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
      gem.update();
      player.update();
      player.velocity.x = 0;
      if (!player.isDied) {
        if (keys.atack) {
          player.isRunning = false;
          player.lastDirection === Directions.right ? player.switchSprite('atack') : player.switchSprite('atackLeft');
          player.playShortAudio(player.sounds.attack);
          if (player.currentFrame === player.frameRate - 1) {
            player.isAtack = false;
            keys.atack = false;
            player.isRunning = false;
            player.lastDirection === Directions.right ? player.switchSprite('idle') : player.switchSprite('idleLeft');
          }
        }
        if (keys.left) {
          player.switchSprite('runLeft');
          player.velocity.x = -5;
          player.lastDirection = Directions.left;
          player.isCameraLeft(camera);
          if (!player.isRunning) {
            player.isRunning = true;
            player.playRunAudio();
          }
        } else if (keys.right) {
          player.switchSprite('run');
          player.velocity.x = 5;
          player.lastDirection = Directions.right;
          player.isCameraRight(camera);
          if (!player.isRunning) {
            player.isRunning = true;
            player.playRunAudio();
          }
        } else if (player.velocity.y === 0 && !keys.atack) {
          player.isRunning = false;
          player.lastDirection === Directions.right ? player.switchSprite('idle') : player.switchSprite('idleLeft');
        }
        if (player.velocity.y < 0 && !keys.atack) {
          if (!player.isAudioPlaying) player.playJumpAudio();
          player.lastDirection === Directions.right ? player.switchSprite('jump') : player.switchSprite('jumpLeft');
        } else if (player.velocity.y > 0 && !keys.atack) {
          player.playShortAudio(player.sounds.landing);
          player.lastDirection === Directions.right ? player.switchSprite('fall') : player.switchSprite('fallLeft');
        }
      } else {
        player.isRunning = false;
        player.playShortAudio(player.sounds.hit);
        player.switchSprite('hit');
      }
      enemies.forEach((el) => {
        if (el.velocity.x === 0) {
          if (-camera.position.x + scaledCanvas.width >= el.position.x * el.scale) {
            el.go();
          }
        }
        el.update();
      });

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
          event.preventDefault();
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
          // player.switchSprite('atack');
          keys.atack = true;
          player.isAtack = true;
          break;

        case 19:
          console.log('pause');
          event.preventDefault();
          // player.switchSprite('atack');
          !isPaused ? pauseGame() : resumeGame();
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
