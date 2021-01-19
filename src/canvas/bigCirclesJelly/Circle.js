import { onCircle } from 'canvas-sketch-util/random';

class Circle {
  constructor(context, x, y, radius) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw(radius, color) {
    radius *= 30;
    this.context.save();
    this.context.beginPath();
    this.context.arc(
      this.x,
      this.y,
      this.radius * (30 - radius),
      0,
      2 * Math.PI,
      true
    );
    this.context.fillStyle = color;
    this.context.strokeWidth = 1;
    this.context.fill();
    this.context.restore();
  }
}

export default Circle;
