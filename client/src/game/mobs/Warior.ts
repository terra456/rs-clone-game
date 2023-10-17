import { Directions, PlayerSoundType } from '../types';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import SpriteBase from '../sprite/SpriteBase';
import { coordinatesType, hitboxSmallType, hitboxType, ICollusionBlock, type IAnimations } from '../types';
import { collision } from '../utils';
import Enemy from './Enemy';
import Player from './Player';

class Warior extends Player {
  cameraBox: { position: { x: number, y: number }, width: number, height: number, leftPadding: number };
  score: number;
  lifes: number;
  coins: ICollusionBlock[];
  enemies: Enemy[];
  gameOver: () => void;
  isAtack: boolean;
  isRunning: boolean;
  gem: SpriteBase;
  winGame: (score: number) => void;
  sounds: any;
  gameBox: { width: number, height: number };
  isSoundsOn: boolean;

  constructor (
    cont: CanvasRenderingContext2D,
    position: { x: number, y: number },
    field: { width: number, height: number },
    floorCollusions: ICollusionBlock[],
    ceilingCollusions: ICollusionBlock[],
    platformCollusions: ICollusionBlock[],
    coins: ICollusionBlock[],
    enemies: Enemy[],
    imageSrc: string,
    frameRate: number,
    animations: IAnimations,
    gameOver: () => void,
    winGame: (score: number) => void,
    gem: SpriteBase,
    gameBox: { width: number, height: number },
    isSoundsOn: boolean,
    volume: number,
    sounds: any
  ) {
    super(cont, position, field, floorCollusions, ceilingCollusions, platformCollusions, imageSrc, frameRate, animations)
    this.cameraBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: (gameBox.width * 0.8),
      height: 150,
      //вычитаем половину ширины спрайта
      leftPadding: ((gameBox.width * 0.8)) / 2 - 100
    };
    this.gameBox = gameBox;
    this.lifes = 3;
    this.score = 0;
    this.coins = coins;
    this.enemies = enemies;
    this.gameOver = gameOver;
    this.winGame = winGame;
    this.isAtack = false;
    this.gem = gem;
    this.isSoundsOn = isSoundsOn;
    this.isRunning = false;
    this.sounds = {};
    for (const key in sounds) {
      const audio: HTMLAudioElement = new Audio(sounds[key]);
      Object.defineProperty(this.sounds, key, {
        value: audio
      });
      this.sounds[key].volume = volume / 100;
    }
  }

  playAudio (key: string) {
    if (this.isSoundsOn) {
      this.sounds[key].play();
    }
  }

  stopAudio (key: string) {
    if (this.isSoundsOn) {
      this.sounds[key].pause();
    }
  }

  update () {
    super.update();
    // квадраты для видимости
    // this.context.fillStyle = 'rgba(0, 255, 0, 0.2)';
    // this.context.fillRect(this.cameraBox.position.x, this.cameraBox.position.y, this.cameraBox.width, this.cameraBox.height);
    this.updateCameraBox();
    if (!this.isDied) {
      this.checkCoins();
      this.checkFallOut();
      this.checkEnemies();
    } else {
      if (this.isStayOn || this.sprite === 'hit') {
        if (this.currentFrame === this.frameRate - 1) {
          if (this.lifes === 0) {
            this.gameOver();
          } else {
            this.revive();
          }
        }
      }
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
    if (cameraRightSide >= this.field.width) return;
    if (cameraRightSide >= this.gameBox.width + Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x;
    }
  }

  isCameraLeft (camera: { position: coordinatesType }) {
    const cameraLeftSide: number = this.cameraBox.position.x;
    // ширина всей игры
    if (this.cameraBox.position.x <= 0) return;
    // if (cameraLeftSide <= this.cameraBox.leftPadding) return;
    if (cameraLeftSide <= Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x;
    }
  }

  checkCoins () {
    for (let i = 0; i < this.coins.length; i++) {
      const coin = this.coins[i];
      if (collision(this.hitbox, coin)) {
        this.score += 5;
        this.coins.splice(i, 1);
        this.playAudio('coin');
      }
    }
    if (collision(this.hitbox, this.gem)) {
      this.score += 100;
      this.winGame(this.score);
    }
  }

  checkEnemies () {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      if (!enemy.isDied) {
        if (this.isAtack) {
          const hitbox: hitboxSmallType = {
            width: this.hitbox.width * 2,
            height: this.hitbox.height * 2,
            position: {
              x: this.hitbox.position.x - this.hitbox.width / 2,
              y: this.hitbox.position.y + this.hitbox.height / 2
            }
          };
          if (collision(hitbox, enemy)) {
            this.killEnemy(enemy);
          };
        } else {
          if (collision(this.hitbox, enemy)) {
            if (this.hitbox.position.y + this.hitbox.height - 10 <= enemy.position.y) {
              this.killEnemy(enemy);
            } else {
              if (!this.isStayOn) {
                this.velocity.y = 0;
              }
              this.die();
            }
          }
        }
      } else {
        if (enemy.currentFrame === enemy.frameRate - 1) {
          this.enemies.splice(i, 1);
        }
      }
    }
  }

  killEnemy (enemy: Enemy) {
    enemy.isDied = true;
    enemy.dying();
    this.playAudio('kill');
    this.score += enemy.price;
  }

  checkFallOut () {
    if (this.hitbox.position.y + this.hitbox.height >= this.gameBox.height) {
      this.die();
    }
  }

  die () {
    this.lifes -= 1;
    this.isDied = true;
  }

  touchDown () {
    if (this.isDied) {
      this.switchSprite('hit');
      this.playAudio('hit');
    } else {
      this.playAudio('landing');
    }
    return true;
  }

  revive () {
    this.playAudio('revive');
    this.switchSprite('idle');
    const checkPosition = (n: number) => {
      this.position.x = this.position.x - n;
      this.updateHitbox();
      let standing = false;
      for (let i = 0; i < this.floorCollusions.length;) {
        const collusionBlock = this.floorCollusions[i];
        if (this.hitbox.position.x <= collusionBlock.position.x + collusionBlock.width &&
          this.hitbox.position.x + this.hitbox.width >= collusionBlock.position.x) {
          this.isStayOn = true;
          this.velocity.y = 0;
          const offset: number = this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collusionBlock.position.y - offset - 0.01;
          standing = true;
          this.isDied = false;
          break;
        } else {
          i++;
        }
      }
      if (!standing) {
        checkPosition(n + 100);
      }
    };
    checkPosition(200);
  }
}

export default Warior;
