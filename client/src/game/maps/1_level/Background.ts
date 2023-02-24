/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import Sprite from '../../sprite/Sprite';
import SpriteBase from '../../sprite/SpriteBase';

class Background {
  images: string[];
  context: CanvasRenderingContext2D;
  imageSprites: SpriteBase[];
  image: any;
  height: number;
  width: number;
  sprite: SpriteBase;
  sprites: SpriteBase[];

  constructor (context: CanvasRenderingContext2D, image: string, width: number) {
    this.context = context;
    this.image = image;
    this.width = width;
    this.sprites = [];
    this.generate();
  }

  generate () {
    const sprite1 = new SpriteBase(this.context, { x: 0, y: 0 }, this.image, 1);
    this.sprites.push(sprite1);
    const repeat = Math.ceil(this.width / sprite1.image.width);
    for (let i = 1; i <= repeat; i++) {
      const sprite = new SpriteBase(this.context, { x: sprite1.image.width * i, y: 0 }, this.image, 1);
      this.sprites.push(sprite);
    }
  }

  update () {
    this.sprites.forEach((el) => { el.update(); });
  }
}

export default Background;
