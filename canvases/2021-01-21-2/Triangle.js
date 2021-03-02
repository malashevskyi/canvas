class Triangle {
  constructor({ context, position: { x1, y1, x2, y2, x3, y3 }, sin, cos }) {
    this.context = context;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.positionFrom = Array(3).fill([sin, cos]).flat();
    this.fromX1 = this.positionFrom[0];
    this.fromY1 = this.positionFrom[1];
    this.fromX2 = this.positionFrom[2];
    this.fromY2 = this.positionFrom[3];
    this.fromX3 = this.positionFrom[4];
    this.fromY3 = this.positionFrom[5];
  }
  draw() {
    this.context.beginPath();
    this.context.fillStyle = `rgb(255, 0, 0)`;
    this.context.moveTo(this.x1, this.y1);
    this.context.lineTo(this.x2, this.y2);
    this.context.lineTo(this.x3, this.y3);
    this.context.strokeStyle = 'white';
    this.context.closePath();
    this.context.stroke();
    this.context.fill();
  }
}

export default Triangle;
