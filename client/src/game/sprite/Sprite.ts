/* eslint-disable @typescript-eslint/explicit-function-return-type */
class Sprite {
  image: HTMLImageElement;
  position: { x: number, y: number };
  context: CanvasRenderingContext2D;

  constructor (context: CanvasRenderingContext2D, position: { x: number, y: number }, imageSrc: string) {
    this.context = context;
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw () {
    if (!this.image) {
      return;
    }
    this.context.drawImage(this.image, this.position.x, this.position.y);
  }

  update () {
    this.draw();
  }
}

export default Sprite;
