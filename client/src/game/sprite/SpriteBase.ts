/* eslint-disable @typescript-eslint/explicit-function-return-type */
class SpriteBase {
  image: HTMLImageElement;
  position: { x: number, y: number };
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  scale: any;
  loaded: boolean;

  constructor (context: CanvasRenderingContext2D, position: { x: number, y: number }, imageSrc: string, scale: number = 1) {
    this.context = context;
    this.position = position;
    this.scale = scale;
    this.loaded = false;
    this.image = new Image();
    this.image.src = imageSrc;
    this.image.onload = () => {
      this.width = this.image.width * this.scale;
      this.height = this.image.height * this.scale;
      this.loaded = true;
    };
  }

  draw () {
    if (!this.image) {
      return;
    }

    this.context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update () {
    this.draw();
  };
}

export default SpriteBase;
