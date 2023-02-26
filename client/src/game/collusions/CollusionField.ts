/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
};

export default CollusionField;
