/* eslint-disable no-dupe-args */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import CollusionBlock from './CollusionBlock';
import TileBlock from './TileBlock';
import { type TilesFieldType } from '../types';

// import TileBlock from './TileBlock';

class TilesField {
  context: CanvasRenderingContext2D;
  size: number;
  columns: number;
  loaded: boolean;
  image: HTMLImageElement;
  width: number;
  height: number;
  scale: number;

  constructor ({ context, size, columns, imgSrc }: TilesFieldType) {
    this.context = context;
    this.size = size;
    this.columns = columns;
    this.loaded = false;
    this.image = new Image();
    this.image.src = imgSrc;
    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.image.height;
      this.loaded = true;
    };
  }

  generateCollusionBlocks (arr: number[], decreese: number = 0) {
    const collusions2d: number[][] = [];
    const collusionBlocks: TileBlock[] = [];
    for (let i = 0; i < arr.length; i += this.columns) {
      collusions2d.push(arr.slice(i, i + this.columns));
    }
    collusions2d.forEach((row, y) => {
      row.forEach((symb, x) => {
        if (symb !== 0) {
          const imgCoord = this.getTileCoordinates(symb);
          collusionBlocks.push(new TileBlock(this.context, { x: x * this.size, y: y * this.size }, this.size, this.image, imgCoord));
        }
      });
    });
    return collusionBlocks;
  }

  getTileCoordinates (n: number) {
    const atlasCol = 8;
    const tileVal = n - 1;
    const sourceY = Math.floor(tileVal / atlasCol) * this.size;
    const sourceX = (tileVal % atlasCol) * this.size;
    return { x: sourceX, y: sourceY };
  }
};

export default TilesField;
