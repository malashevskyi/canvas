import { lerp } from 'canvas-sketch-util/math';

class Particle {
  constructor({ context, x, y, radius, color, velocity }) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
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
    this.velocity.x *= lerp(0.85, 1.02, Math.random());
    this.velocity.y *= lerp(0.85, 1.02, Math.random());
    this.velocity.y += 0.05;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.018;
  }
}

export default Particle;
