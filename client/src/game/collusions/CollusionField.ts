/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { beeAnimation, boarAnimation, boarBlackAnimation, snailAnimation } from '../mobs/animations';
import Enemy from '../mobs/Enemy';
import SpriteBase from '../sprite/SpriteBase';
import { ICollusionBlock } from '../types';
import CollusionBlock from './CollusionBlock';

class CollusionField {
  context: CanvasRenderingContext2D;
  size: number;
  columns: number;

  constructor (context: CanvasRenderingContext2D, size: number, columns: number) {
    this.context = context;
    this.size = size;
    this.columns = columns;
  }

  generateCollusionBlocks (arr: number[], imgSrc: string | undefined = undefined) {
    const collusions2d: number[][] = [];
    const collusionBlocks: Array<CollusionBlock | SpriteBase> = [];
    for (let i = 0; i < arr.length; i += this.columns) {
      collusions2d.push(arr.slice(i, i + this.columns));
    }
    collusions2d.forEach((row, y) => {
      row.forEach((symb, x) => {
        if (symb !== 0) {
          collusionBlocks.push(new CollusionBlock(this.context, { x: x * this.size, y: y * this.size }, this.size, imgSrc));
        }
      });
    });
    return collusionBlocks;
  }

  generateEnemies (arr: number[],
    field: { width: number, height: number },
    floorCollusions: ICollusionBlock[],
    ceilingCollusions: ICollusionBlock[],
    platformCollusions: ICollusionBlock[]
  ) {
    const collusions2d: number[][] = [];
    const enemiesBlocks: Enemy[] = [];
    for (let i = 0; i < arr.length; i += this.columns) {
      collusions2d.push(arr.slice(i, i + this.columns));
    }
    collusions2d.forEach((row, y) => {
      row.forEach((symb, x) => {
        if (symb !== 0) {
          console.log(symb);
          if (symb === 34 || symb === 6) {
            const boar = new Enemy(
              this.context,
              { x: x * this.size, y: y * this.size - 25 },
              field,
              floorCollusions,
              ceilingCollusions,
              platformCollusions,
              './assets/enemy/Boar/Walk-Base-Sheet.png',
              6,
              boarAnimation,
              2,
              25
            );
            enemiesBlocks.push(boar);
          }
          if (symb === 6) {
            const boar = new Enemy(
              this.context,
              { x: x * this.size, y: y * this.size - 25 },
              field,
              floorCollusions,
              ceilingCollusions,
              platformCollusions,
              './assets/enemy/Boar/Walk-Base-SheetBlack.png',
              6,
              boarBlackAnimation,
              2,
              25
            );
            enemiesBlocks.push(boar);
          }
          if (symb === 39) {
            const snail = new Enemy(
              this.context,
              { x: x * this.size - 5, y: y * this.size },
              field,
              floorCollusions,
              ceilingCollusions,
              platformCollusions,
              './assets/enemy/snail/walk-Sheet.png',
              8,
              snailAnimation,
              0.5,
              50
            );
            enemiesBlocks.push(snail);
          }
          if (symb === 22 || symb === 7) {
            const bee = new Enemy(
              this.context,
              { x: x * this.size, y: y * this.size },
              field,
              floorCollusions,
              ceilingCollusions,
              [],
              './assets/enemy/bee/fly.png',
              4,
              beeAnimation,
              1,
              100
            );
            bee.gravity = 0;
            bee.velocity.y = 0;
            enemiesBlocks.push(bee);
          }
        }
      });
    });
    return enemiesBlocks;
  }
};

export default CollusionField;
