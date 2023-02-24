/* eslint-disable @typescript-eslint/explicit-function-return-type */
class TileBlock {
  context: CanvasRenderingContext2D;
  position: { x: number, y: number };
  width: number;
  height: number;
  size: number;
  image: HTMLImageElement;
  cropCoord: { x: number; y: number; };

  constructor (cont: CanvasRenderingContext2D, position: { x: number, y: number }, size: number, image: HTMLImageElement, imgCoord: { x: number, y: number }) {
    this.context = cont;
    this.position = position;
    this.width = size;
    this.height = size;
    this.size = size;
    this.image = image;
    this.cropCoord = imgCoord;
  }

  draw () {
    // this.context.fillStyle = 'rgba(0, 255, 0, 0.5)';
    // this.context.fillRect(this.position.x, this.position.y, this.size, this.size);

    this.context.drawImage(
      this.image,
      this.cropCoord.x,
      this.cropCoord.y,
      this.size,
      this.size,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update () {
    this.draw();
  }
}

export default TileBlock;
