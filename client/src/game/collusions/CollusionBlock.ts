/* eslint-disable @typescript-eslint/explicit-function-return-type */
class CollusionBlock {
  context: CanvasRenderingContext2D;
  position: { x: number, y: number };
  width: number;
  height: number;
  size: number;

  constructor (cont: CanvasRenderingContext2D, position: { x: number, y: number }, size: number) {
    this.context = cont;
    this.position = position;
    this.width = size;
    this.height = size;
    this.size = size;
  }

  draw () {
    this.context.fillStyle = 'rgba(255, 0, 0, 0.5)';
    this.context.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  update () {
    this.draw();
  }
}

export default CollusionBlock;
