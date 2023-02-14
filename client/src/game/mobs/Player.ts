/* eslint-disable @typescript-eslint/explicit-function-return-type */
class Player {
  position: { x: number, y: number };
  context: CanvasRenderingContext2D;

  constructor (cont: CanvasRenderingContext2D, position: { x: number, y: number }) {
    this.context = cont;
    this.position = position;

    //TODO add propertis
  }

  draw () {
    this.context.fillStyle = 'red';
    this.context.fillRect(this.position.x, this.position.y, 50, 50);
  }

  update () {
    this.draw();
    this.position.y++;
  }
}

export default Player;
