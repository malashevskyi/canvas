class Particle {
  constructor({ context, x, y, color }) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.alpha = 1;
  }

  draw() {
    this.context.save();
    this.context.globalAlpha = this.alpha;
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.rect(this.x, this.y, 2, 2);
    this.context.closePath();
    this.context.fill();
    this.context.restore();
  }
}

export default Particle;