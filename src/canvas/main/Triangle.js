import { TimelineMax, Power4 } from 'gsap';
import random from 'canvas-sketch-util/random';

class Triangle {
  constructor({ context, position, sin, cos, last }) {
    this.context = context;
    this.position = position;
    this.positionFrom = Array(3).fill([sin, cos]).flat();
    this.tlSet = false;
    this.alpha = 1;
    this.tick = 0;
    this.lastTriangle = last;
  }
  draw() {
    if (!this.tlSet) {
      this.tlSet = true;

      // set max delay for the last triangle
      // to animate alpha of the second heart after animation of all triangles
      const delay = this.lastTriangle ? 3 : 3 * Math.random();

      this.tl = new TimelineMax({
        delay,
        ease: random.pick([
          Power4.easeIn,
          Power4.easeOut,
        ]),
      });
      this.tl.from(this.position, 3, this.positionFrom);

      if (this.lastTriangle) {
        // animate alpha of the second heart after animation of all 
        // triangles defined in trianglesPoints.js
        this.tl.to(window.MainCanvas.heartAlpha, { delay: 0, duration: 1, value: 1.2 })
      }
    }
    this.tick++;

    // set debounce tl pause,
    // to pause animation after route changing
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.tl.pause();
    }, 25);

    // animate globalAlpha when the first heart is fully formed
    if (this.tick > 400 && this.alpha >= 0.1) {
      this.alpha -= 0.1;
    }
    if (this.alpha >= 0.1) {
      this.context.beginPath();
      this.context.globalAlpha = this.alpha;
      this.context.fillStyle = `rgb(255, 0, 0)`;
      this.context.moveTo(this.position[0], this.position[1]);
      this.context.lineTo(this.position[2], this.position[3]);
      this.context.lineTo(this.position[4], this.position[5]);
      this.context.strokeStyle = 'white';
      this.context.closePath();
      this.context.stroke();
      this.context.fill();
    }
  }
}

export default Triangle;