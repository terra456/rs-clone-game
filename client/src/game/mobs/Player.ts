/* eslint-disable @typescript-eslint/explicit-function-return-type */
class Player {
  context: CanvasRenderingContext2D;
  position: { x: number, y: number };
  width: number;
  height: number;
  velocity: { x: number, y: number };
  gravity: number;
  field: { width: number; height: number; };

  constructor (cont: CanvasRenderingContext2D, position: { x: number, y: number }, field: { width: number, height: number }) {
    this.context = cont;
    this.position = position;
    this.field = field;
    this.width = 100;
    this.height = 100;
    this.velocity = {
      x: 0,
      y: 1
    };
    this.gravity = 0.5;
  }

  draw () {
    this.context.fillStyle = 'red';
    this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update () {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y < this.field.height) {
      this.velocity.y += this.gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

export default Player;
