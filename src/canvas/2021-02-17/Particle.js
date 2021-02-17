import random from 'canvas-sketch-util/random';
import gsap from 'gsap';

class Particle {
  constructor({ context, x, y, xTo, yTo, index, color }) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.xTo = xTo;
    this.yTo = yTo;
    this.color = color;
    this.start = false;
    this.index = index + random.rangeFloor(0, 2000);
    this.alpha = 1;
    this.tick = 0;
    this.width = 2;
    this.height = 2;
  }

  draw() {
    this.tick += 50;
    if (this.tick > this.index && !this.start) {
      this.start = true;
      gsap.to(this, {
        duration: 5,
        x: this.xTo,
        y: this.yTo,
        repeatDelay: 5,
        repeat: -1,
        yoyo: true,
        ease: 'power4.in',
      });
    }
    this.context.save()
    this.context.globalAlpha = this.alpha;
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.closePath();
    this.context.fill();
    this.context.restore()
  }
}

export default Particle;