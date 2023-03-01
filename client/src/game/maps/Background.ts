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

  generate (image: string, bgSize: { width: number, height: number }) {
    const BgSprites = [];
    const bgScale = this.height / bgSize.height;
    const newWidth = bgSize.width * bgScale;
    const newheight = bgSize.height * bgScale;
    const repeat = Math.ceil(this.width / (bgSize.width * bgScale));
    for (let i = 0; i <= repeat; i++) {
      const sprite = new SpriteBase(this.context, { x: newWidth * i, y: 0 }, image, bgScale);
      BgSprites.push(sprite);
    }
    return BgSprites;
  }
}

export default BackgroundLoop;
