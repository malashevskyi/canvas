import setSketch from '../utils/setSketch';

import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';

const sketch = ({ width, height, context }) => {
  random.setSeed(1);
  const palette = random.pick(palettes);

  class Ball {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.color = 'red';
    }
    draw() {
      context.beginPath();
      context.arc(this.x, this.y, 20, 0, Math.PI * 2);
      context.fillStyle = this.color;
      context.fill();
      context.closePath();
    }
    update(x, y, color) {
      this.color = color;
      this.x = x + y;
      this.y = y;
      this.draw();
    }
  }

  const balls = [];
  const cords = [];
  let tick = 20;

  function createBalls() {
    for (let i = 0; i < 7; i++) {
      balls.push(new Ball(0, 0));
    }
  }
  createBalls();

  function createCoords() {
    const angle = (Math.PI * 2) / 200;
    for (let i = 0; i < 200; i++) {
      cords.push({
        x: 300 * Math.cos(angle * i),
        y: 300 * Math.sin(angle * i),
      });
    }
  }
  createCoords();

  function clearCanvas() {
    context.fillStyle = 'rgba(255, 255, 255, 1)';
    context.fillRect(0, 0, width, height);
  }

  return (props) => {
    ({ height, width } = props);

    clearCanvas();
    context.translate(width / 2, height / 2);

    tick += 1;

    balls[0].draw();
    const dt = [1.2, 1.7, 1.4, 1.8, 1.5, 1.3];
    const dc = [1, 1, 1, 2, 3, 1.3];
    for (let i = 0; i < 6; i++) {
      balls[1].update(
        cords[Math.floor(tick / dt[i]) % cords.length].x /
          dc[i],
        cords[Math.floor(tick / dt[i]) % cords.length].y /
          dc[i],
        palette[i]
      );
    }
  };
};

export default setSketch(sketch, { animate: true });
