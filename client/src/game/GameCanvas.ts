import { Directions, IAnimations, IAnimationsEnemy, layerType, tilemapType } from './types';
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
  context: CanvasRenderingContext2D | null;
  scale: number;
  gameField: { width: number, height: number };
  tileSise: { width: number; height: number; };
  mapSise: { width: number; height: number; };
  isSoundsOn: boolean;
  soundsVolume: number;
  isAudioOn: boolean;
  audioVolume: number;
  
  constructor (parentNode: HTMLElement = document.body, width = 1024, height = 600) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    //делим на высоту фона, т.е игрового поля.
    this.scaledCanvas = {
      width: this.canvas.width / this.scale,
      height: this.canvas.height / this.scale
    };
    parentNode.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
    this.isSoundsOn = (localStorage.getItem('soundsOn') != null) ? localStorage.getItem('soundsOn') === 'On' : true;
    this.soundsVolume = (localStorage.getItem('soundsVolume') != null) ? Number(localStorage.getItem('soundsVolume')) : 5;
    this.isAudioOn = (localStorage.getItem('audioOn') != null) ? localStorage.getItem('audioOn') === 'On' : true;
    this.audioVolume = (localStorage.getItem('audioVolume') != null) ? Number(localStorage.getItem('audioVolume')) : 5;
  }

  async startGame () {
    await import('./maps/honey-grot')
      .then((data) => {
        this.gameField = {
          width: data.width * data.tilewidth,
          height: data.height * data.tileheight
        };
        this.scale = this.canvas.height / this.gameField.height;
        this.scaledCanvas = {
          width: this.canvas.width / this.scale,
          height: this.canvas.height / this.scale
        };
        this.tileSise = {
          width: data.tilewidth,
          height: data.tileheight
        };
        this.mapSise = {
          width: data.width,
          height: data.height
        };
        const layers = {};
        data.layers.forEach((el) => {
          Object.defineProperty(layers, el.name, {
            value: el.data,
            writable: false
          });
        });
        if (this.context != null) {
          this.animate(
            this.context,
            { width: this.canvas.width, height: this.canvas.height },
            this.scale,
            this.scaledCanvas,
            this.gameField,
            this.tileSise,
            this.mapSise,
            data.tilemap,
            layers
          );
        }
      });
  }

  animate (
    context: CanvasRenderingContext2D,
    canvas: { width: number, height: number },
    scale: number,
    scaledCanvas: { width: number, height: number },
    gameField: { width: number, height: number },
    tileSize: { width: number, height: number },
    mapSize: { width: number, height: number },
    tilemap: tilemapType,
    layers: any
  ) {
    let myReq: any;
    let isPaused: boolean = false;
    const keys = {
      left: false,
      right: false,
      atack: false
    };
    const camera = {
      position: {
        x: 0,
        y: 0
      }
    };

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

    const changeScaling = (): void => {
      if (!document.fullscreenElement) {
        this.canvas.requestFullscreen()
          .then(() => {
            console.log(canvas.width, canvas.height);
          })
          .catch((err: Error) => {
            console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
          });
      } else {
        document.exitFullscreen()
          .catch((err: Error) => {
            console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
          });
      }
    };

    if (this.isAudioOn) {
      const audio: HTMLAudioElement = new Audio('./assets/audio/sounds/platformer_level03.mp3');
      audio.volume = this.audioVolume / 100;
      audio.play();
    }

    const tilesField = new TilesField({
      context,
      size: tileSize.width,
      columns: mapSize.width,
      imgSrc: tilemap.file,
      tileColumns: tilemap.columns
    });
    const floors = tilesField.generateCollusionBlocks(layers.floor);
    const ceiling = tilesField.generateCollusionBlocks(layers.ceiling);
    const platforms = tilesField.generateCollusionBlocks(layers.platforms);
    const spikes = tilesField.generateCollusionBlocks(layers.spikes);
    const decors = tilesField.generateCollusionBlocks(layers.decors);
    const fon = tilesField.generateCollusionBlocks(layers.fon);
    const collisionField = new CollusionField(context, tileSize.width, mapSize.width);
    const coins = collisionField.generateCollusionBlocks(layers.coins, './assets/icons/coin.png');
    const enemies = collisionField.generateEnemies(layers.enemy, gameField, floors, ceiling, platforms);
    const background1 = new SpriteBase(context, { x: 0, y: 0 }, './assets/background/1_level/bg_1.png', 1);
    const bgLoop = new Background(context, gameField);
    const bgImages = bgLoop.generate('./assets/background/1_level/mtn.png', { width: 2618, height: 571 });
    const coinImg = new SpriteBase(context, { x: canvas.width - 120, y: 15 }, './assets/icons/coin.png');
    const gem = new SpriteBase(context, { x: gameField.width - 200, y: gameField.height * 0.7 }, './assets/icons/gem.png');
    const lifeHearts: SpriteBase[] = [];
    for (let i = 0; i < 3; i++) {
      lifeHearts.push(new SpriteBase(context, { x: 30 + i * 30, y: 15 }, './assets/icons/heart.png', 0.5));
    }
    const playerSounds = {
      attack: './assets/audio/sounds/12_Player_Movement_SFX/56_Attack_03.wav',
      run: './assets/audio/sounds/12_Player_Movement_SFX/03_Step_grass_03.wav',
      hit: './assets/audio/sounds/10_Battle_SFX/55_Encounter_02.wav',
      jump: './assets/audio/sounds/12_Player_Movement_SFX/30_Jump_03.wav',
      landing: './assets/audio/sounds/12_Player_Movement_SFX/45_Landing_01.wav',
      coin: './assets/audio/sounds/10_UI_Menu_SFX/079_Buy_sell_01.wav',
      kill: './assets/audio/sounds/10_Battle_SFX/69_Enemy_death_01.wav',
      revive: './assets/audio/sounds/8_Buffs_Heals_SFX/30_Revive_03.wav',
      gameOver: './assets/audio/sounds/10_Battle_SFX/17_Def_buff_01.wav'
    };
    const player = new Warior(
      context,
      { x: 10, y: 300 },
      gameField,
      floors,
      ceiling,
      platforms,
      coins,
      enemies,
      './assets/warrior/Idle.png',
      8,
      wariorAnimation,
      gameOver,
      winGame,
      gem,
      scaledCanvas,
      this.isSoundsOn,
      this.soundsVolume,
      playerSounds
    );

    function animationLoop () {
      myReq = window.requestAnimationFrame(animationLoop);
      context.fillStyle = 'grey';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.scale(scale, scale);
      context.translate(camera.position.x, 0);
      bgImages.forEach((block) => {
        block.update();
      });
      background1.update();
      floors.forEach((block) => { block.update(); });
      ceiling.forEach((block) => { block.update(); });
      platforms.forEach((block) => { block.update(); });
      spikes.forEach((block) => { block.update(); });
      decors.forEach((block) => { block.update(); });
      fon.forEach((block) => { block.update(); });
      coins.forEach((block) => { block.update(); });
      gem.update();
      player.update();
      player.velocity.x = 0;
      if (!player.isDied) {
        if (keys.atack) {
          player.lastDirection === Directions.right ? player.switchSprite('atack') : player.switchSprite('atackLeft');
          player.playAudio('attack');
          if (player.currentFrame === player.frameRate - 1) {
            player.isAtack = false;
            keys.atack = false;
            player.lastDirection === Directions.right ? player.switchSprite('idle') : player.switchSprite('idleLeft');
          }
        }
        if (keys.left) {
          player.switchSprite('runLeft');
          player.velocity.x = -5;
          player.lastDirection = Directions.left;
          player.isCameraLeft(camera);
          player.playAudio('run');
        } else if (keys.right) {
          player.switchSprite('run');
          player.velocity.x = 5;
          player.lastDirection = Directions.right;
          player.isCameraRight(camera);
          player.playAudio('run');
        } else if (player.velocity.y === 0 && !keys.atack) {
          player.isRunning = false;
          player.lastDirection === Directions.right ? player.switchSprite('idle') : player.switchSprite('idleLeft');
        }
        if (player.velocity.y < 0 && !keys.atack) {
          player.playAudio('jump');
          player.isStayOn = false;
          player.lastDirection === Directions.right ? player.switchSprite('jump') : player.switchSprite('jumpLeft');
        } else if (player.velocity.y > 0 && !keys.atack) {
          player.lastDirection === Directions.right ? player.switchSprite('fall') : player.switchSprite('fallLeft');
        }
      }
      enemies.forEach((el) => {
        if (el.velocity.x === 0) {
          if (-camera.position.x + scaledCanvas.width >= el.position.x) {
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
      context.strokeText(player.score.toString(), canvas.width - 50, 50);
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
          // если добавить && player.isStayOn, то будет прыгать только когда стоит на поверхности.
          if (!player.isDied) {
            player.velocity.y = -10;
          }
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

        case 122:
          event.preventDefault();
          changeScaling();
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
          break;
      }
    });
    window.addEventListener('pauseTheGame', () => {
      if (!isPaused) {
        pauseGame();
      }
    });
    window.addEventListener('resumeTheGame', () => {
      if (isPaused) {
        resumeGame();
      }
    });
  };
}

export default GameCanvas;
