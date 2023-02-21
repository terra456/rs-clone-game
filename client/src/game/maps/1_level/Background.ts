/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import Sprite from '../../sprite/Sprite';
import SpriteBase from '../../sprite/SpriteBase';

class Background extends SpriteBase {
  images: string[];
  context: CanvasRenderingContext2D;
  imageSprites: SpriteBase[];
  image: any;
  height: number;
  width: number;

  constructor (context: CanvasRenderingContext2D, image: string) {
    super(context, { x: 0, y: 0 }, image, 1);
  }

}

export default Background;
