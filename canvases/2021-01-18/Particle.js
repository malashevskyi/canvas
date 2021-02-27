class Particle {
  constructor(context, x, y, radius, color, speed) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.alpha = 1;
  }

  draw() {
    this.context.save();
    this.context.globalAlpha = this.alpha;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.restore();
  }

  render() {
    this.draw();
    this.x += this.speed.x;
    this.y += this.speed.y;
    this.alpha -= 0.008;
  }
}

export default Particle;