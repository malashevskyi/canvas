class Cartridge {
  constructor({ context, x, y, dx, dy, angle }) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.angle = angle;
  }

  draw() {
    this.context.beginPath();
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(this.angle);
    this.context.moveTo(0, 0);
    this.context.lineTo(0 + 20, 0);
    this.context.lineTo(0 + 20, 5);
    this.context.lineTo(0, 5);
    this.context.fillStyle = 'red';
    this.context.closePath();
    this.context.fill();
    this.context.restore();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }
}

export default Cartridge;
