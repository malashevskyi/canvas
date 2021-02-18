import random from 'canvas-sketch-util/random';
import gsap from 'gsap';

class Particle {
  constructor({ context, x, y, index, color }) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.start = false;
    this.index = Math.floor(index * (Math.random() * 5));
    this.alpha = 1;
    this.tick = 0;
  }

  setGSAP() {
    gsap.to(this, {
      duration: 5,
      x: random.rangeFloor(400, 900),
      y: 500,
      ease: 'power4.in',
    });
    gsap.to(this, {
      duration: 1,
      alpha: 0,
      delay: 3.5,
      ease: 'linear',
    });
  }

  draw() {
    this.tick += 15;
    if (this.tick > this.index && !this.start) {
      this.start = true;
      this.setGSAP();
    }
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
