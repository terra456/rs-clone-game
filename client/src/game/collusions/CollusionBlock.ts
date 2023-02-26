import SpriteBase from '../sprite/SpriteBase';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
class CollusionBlock {
  context: CanvasRenderingContext2D;
  position: { x: number, y: number };
  width: number;
  height: number;
  size: number;
  imageSrc: string | undefined;
  img?: SpriteBase;

  constructor (cont: CanvasRenderingContext2D, position: { x: number, y: number }, size: number, imageSrc: string | undefined = undefined) {
    this.context = cont;
    this.position = position;
    this.width = size;
    this.height = size;
    this.size = size;
    if (imageSrc) {
      this.img = new SpriteBase(this.context, position, imageSrc);
    }
  }

  draw () {
    this.context.fillStyle = 'rgba(0, 255, 0, 0.5)';
    this.context.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  update () {
    this.img ? this.img.update() : this.draw();
  }
}

export default CollusionBlock;
