import math from 'canvas-sketch-util/math';

const smooth = [
  ...math.linspace(80, 0, 1),
  ...Array(200).fill(1),
  ...math.linspace(80, 0, 1).reverse(),
];

class Circle {
  constructor({ context, radius, offsetAngle, index }) {
    this.context = context;
    this.radius = radius;
    this.offsetAngle = offsetAngle;
    this.index = index;
    this.tick = 0;
  }

  draw(startAngle, width, height) {
    this.tick++;
    this.color = `hsl(${this.index * 5 + this.tick / 5 + 110}, 50%, 50%)`;

    this.context.beginPath();

    for (let i = 0; i < 360; i++) {
      const angle = ((i + startAngle) * Math.PI) / 180;

      const ampRadius = 10;
      let amp = smooth[i] * Math.sin(angle * 6 + this.offsetAngle) * ampRadius;
      let x = width / 2 + Math.cos(angle) * (this.radius + amp);
      let y = height / 2 + Math.sin(angle) * (this.radius + amp);
      i > 0 ? this.context.lineTo(x, y) : this.context.moveTo(x, y);
    }
    this.context.closePath();
    this.context.fillStyle = this.color;
    this.context.fill();
  }
}

export default Circle;
