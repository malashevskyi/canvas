const random = require('canvas-sketch-util/random');

const ease = (time, start, dRest, duration) => {
  let t = time;
  t /= Math.floor(duration / 1.8);
  if (t < 1) {
    return dRest * 0.55 * t * t + start;
  }
  return (-dRest / 2) * ((t - 1) * (t - 3) - 1) + start;
};

class Point {
  constructor({ context, x, y }) {
    this.context = context;
    this.anchorX = x;
    this.anchorY = y;
    this.x = x;
    this.y = y;
    this.setTarget();
  }

  setTarget() {
    this.initialX = this.x;
    this.initialY = this.y;
    this.targetX = this.anchorX + random.rangeFloor(0, 20) - 20;
    this.targetY = this.anchorY + random.rangeFloor(0, 80) - 80;
    this.tick = 0;
    this.duration = random.rangeFloor(30, 70);
  }

  update() {
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (Math.abs(dist) <= 0) {
      this.setTarget();
    } else {
      const t = this.tick;
      let start = this.initialY;
      let dRest = this.targetY - start;
      const d = this.duration;
      this.y = ease(t, start, dRest, d);

      start = this.initialX;
      dRest = this.targetX - start;
      this.x = ease(t, start, dRest, d);

      this.tick += 1;
    }
  }
  
  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, 4, 0, Math.PI * 2);
    this.context.fillStyle = 'orange';
    this.context.fill();
  }
}

export default Point;
