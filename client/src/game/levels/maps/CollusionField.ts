/* eslint-disable @typescript-eslint/explicit-function-return-type */
import CollusionBlock from './CollusionBlock';

class CollusionField {
  context: CanvasRenderingContext2D;
  size: number;
  columns: number;

  constructor (context: CanvasRenderingContext2D, size: number) {
    this.context = context;
    this.size = size;
    this.columns = 36;
  }

  generateCollusionBlocks (arr: number[]) {
    const collusions2d: number[][] = [];
    const collusionBlocks: CollusionBlock[] = [];
    for (let i = 0; i < arr.length; i += this.columns) {
      collusions2d.push(arr.slice(i, i + this.columns));
    }
    collusions2d.forEach((row, y) => {
      row.forEach((symb, x) => {
        if (symb === 202) {
          collusionBlocks.push(new CollusionBlock(this.context, { x: x * this.size, y: y * this.size }, this.size));
        }
      });
    });
    return collusionBlocks;
  }
};

export default CollusionField;
