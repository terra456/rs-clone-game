/* eslint-disable @typescript-eslint/explicit-function-return-type */
class Sprite {
  image: HTMLImageElement;
  position: { x: number, y: number };
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  frameRate: any;
  currentFrame: number;
  frameBuffer: number;
  elapsedFrames: number;
  scale: any;
  loaded: boolean;

  constructor (context: CanvasRenderingContext2D, position: { x: number, y: number }, imageSrc: string, frameRate: number = 1, frameBuffer: number = 3, scale: number = 1) {
    this.context = context;
    this.position = position;
    this.scale = scale;
    this.loaded = false;
    this.image = new Image();
    this.image.onload = () => {
      this.width = (this.image.width / this.frameRate) * this.scale;
      this.height = this.image.height * this.scale;
      this.loaded = true;
      console.log(this.width);
    };
    this.image.src = imageSrc;
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.frameBuffer = frameBuffer;
    this.elapsedFrames = 0;
  }

  draw () {
    if (!this.image) {
      return;
    }

    const cropBox = {
      position: {
        x: this.currentFrame * this.image.width / this.frameRate,
        y: 0
      },
      width: this.image.width / this.frameRate,
      height: this.image.height,
    }

    this.context.drawImage(
      this.image,
      cropBox.position.x,
      cropBox.position.y,
      cropBox.width,
      cropBox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
      );
  }

  update () {
    this.draw();
    this.updateFrames();
  }

  updateFrames() {
    this.elapsedFrames++;
    if (this.elapsedFrames % this.frameBuffer === 0) {
      this.currentFrame < this.frameRate - 1 ? this.currentFrame++ : this.currentFrame = 0;
    }
  }
}

export default Sprite;
