/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import Sprite from '../../sprite/Sprite';
import SpriteBase from '../sprite/SpriteBase';

class BackgroundLoop {
  context: CanvasRenderingContext2D;
  image: string;
  height: number;
  width: number;
  sprite: SpriteBase;
  sprites: SpriteBase[];
  scale: number;

  constructor (context: CanvasRenderingContext2D, field: { width: number, height: number }, scale: number) {
    this.context = context;
    this.width = field.width;
    this.height = field.height;
    this.scale = scale;
  }

  generate (image: string, size: { width: number, height: number }) {
    const BgSprites = [];
    const repeat = Math.ceil(this.width / size.width);
    for (let i = 0; i <= repeat; i++) {
      const sprite = new SpriteBase(this.context, { x: size.width * i, y: this.height - size.height }, image, this.scale);
      BgSprites.push(sprite);
    }
    return BgSprites;
  }
}

export default BackgroundLoop;
