import palettes from 'nice-color-palettes';
import random from 'canvas-sketch-util/random';
import { lerp } from 'canvas-sketch-util/math';

import useCanvas from '../../hooks/useCanvas';

random.setSeed(random.pick(['513468']));
const palette = random.pick(palettes);

const sketch = ({ gui }) => (initialProps) => {
  const { context } = initialProps;
  let { height, width } = initialProps;

  const balls = [];
  const opt = {
    radiusInc: 1.1,
    ballsCount: 700,
  };

  function inRange(axis, start, end) {
    return axis > start && axis < end;
  }

  function Ball({ x, y, dx, dy, radius }) {
    this.x = lerp(radius, width - radius, x);
    this.y = lerp(radius, height - radius, y);
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = random.pick(palette.slice(0, 3));

    this.draw = () => {
      context.beginPath();
      context.arc(this.x, this.y, this.radius * opt.radiusInc, 0, Math.PI * 2, false);
      context.fillStyle = this.color;
      context.fill();
      context.closePath();
    };
    this.update = () => {
      const r = this.radius;
      if (!inRange(this.x, r, width - r)) this.dx = -this.dx;
      if (!inRange(this.y, r, height - r)) this.dy = -this.dy;

      this.x += this.dx;
      this.y += this.dy;
    };
    this.render = () => {
      this.draw();
      this.update();
    };
  }

  function createBalls() {
    for (let i = 0; i < opt.ballsCount; i++) {
      balls.push(
        new Ball({
          x: Math.random(),
          y: Math.random(),
          dx: random.gaussian(0, 1) * 0.5,
          dy: random.gaussian(0, 1) * 0.5,
          radius: Math.abs(random.gaussian(0, 1)) * 14,
        })
      );
    }
  }

  gui?.show();
  gui?.add(opt, 'radiusInc').min(0.2).max(3).name('Radius');
  gui?.add(opt, 'ballsCount')
    .min(100)
    .max(2000)
    .name('Balls Count')
    .onChange(() => {
      balls.length = 0;
      createBalls();
    });

  createBalls();

  return (updatedProps) => {
    ({ height, width } = updatedProps);

    context.fillStyle = '#000';
    context.clearRect(0, 0, width, height);

    balls.forEach((ball) => ball.render());
  };
};

function Canvas({ gui }) {
  useCanvas({ sketch: () => sketch({ gui }) });
  return '';
}

export default Canvas;
