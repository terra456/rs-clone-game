/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { beeAnimation, boarAnimation, snailAnimation } from '../mobs/animations';
import Enemy from '../mobs/Enemy';
import SpriteBase from '../sprite/SpriteBase';
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

  generateEnemies (arr: number[], params: any) {
    const collusions2d: number[][] = [];
    const enemiesBlocks: Enemy[] = [];
    for (let i = 0; i < arr.length; i += this.columns) {
      collusions2d.push(arr.slice(i, i + this.columns));
    }
    collusions2d.forEach((row, y) => {
      row.forEach((symb, x) => {
        if (symb !== 0) {
          // enemiesBlocks.push(symb);
          if (symb === 34) {
            const boar = new Enemy(
              this.context,
              params.scale,
              { x: x * this.size, y: y * this.size - 25 },
              params.field,
              params.tiles,
              params.tiles1,
              './assets/enemy/Boar/Walk-Base-Sheet.png',
              6,
              boarAnimation,
              2,
              25
            );
            console.log('boar', boar.position.x * boar.scale);
            enemiesBlocks.push(boar);
          }
          if (symb === 39) {
            const snail = new Enemy(
              this.context,
              params.scale,
              { x: x * this.size - 5, y: y * this.size },
              params.field,
              params.tiles,
              params.tiles1,
              './assets/enemy/snail/walk-Sheet.png',
              8,
              snailAnimation,
              0.5,
              50
            );
            enemiesBlocks.push(snail);
          }
          if (symb === 22) {
            const bee = new Enemy(
              this.context,
              params.scale,
              { x: x * this.size, y: y * this.size },
              params.field,
              params.tiles,
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
