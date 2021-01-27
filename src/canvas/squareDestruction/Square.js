import random from 'canvas-sketch-util/random';
import { TweenMax, Power4 } from 'gsap';

class Square {
  constructor(context, maxSide, [x, y], color) {
    this.context = context;
    this.angle = random.range(0, Math.PI * 2);
    this.x = [Math.cos(this.angle) * maxSide / 3  + 100];
    this.y = [Math.sin(this.angle) * maxSide / 3  + 100];
    this.fx = x;
    this.fy = y + 20;
    this.random = Math.random() * 2 + 0.5;
    this.tlx = TweenMax.from(this.x, { delay: this.random, ease: Power4.easeIn, yoyo: true, repeat: -1, repeatDelay: 0, duration: 7, 0: this.fx })
    this.tly = TweenMax.from(this.y, { delay: this.random, ease: Power4.easeIn, yoyo: true, repeat: -1, repeatDelay: 0, duration: 7, 0: this.fy })
    this.tick = 50;
    // this.color = color;
  }
  
  render() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.tlx.pause();
      this.tly.pause();
    }, 25);
    this.tick += 0.2;
    this.color = `hsl(${this.tick}, 50%, 50%)`;
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.rect(this.x[0], this.y[0], 10, 10);
    this.context.strokeStyle = this.color;
    this.context.stroke()
    this.context.fill()
    this.context.closePath();
  }
}

export default Square;