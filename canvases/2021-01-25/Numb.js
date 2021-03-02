import random from 'canvas-sketch-util/random';

class Numb {
  constructor(context, palette) {
    this.context = context;
    this.color = random.pick(palette);
    this.text = random.pick([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    this.initial();
  }

  initial() {
    this.gaussian = random.gaussian(-0.2, 0.2) + 0.3;
    this.x = this.gaussian;
    this.y = 0;
    this.dx = this.gaussian;
    this.dy = 0.5;
    this.tick = 0;
    this.scale = 1;
  }

  draw() {
    this.context.save();
    this.context.beginPath();
    this.context.scale(this.scale, this.scale);
    this.context.fillStyle = this.color;
    this.context.font = `10px Potta One`;
    this.context.fillText(this.text, this.x, this.y);
    this.context.closePath();
    this.context.fill();
    this.context.restore();
  }

  render() {
    this.scale += 0.05;
    this.tick++;
    this.x -= this.dx;
    this.y -= this.dy;
    this.dx /= 1.01;
    this.draw();
  }
}

export default Numb;
