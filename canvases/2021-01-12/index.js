import random from 'canvas-sketch-util/random';

import useCanvas from '../../hooks/useCanvas';

const sketch = () => (initialProps) => {
  const { context } = initialProps;
  let { height, width } = initialProps;

  random.setSeed(2);

  const TWO_PI = Math.PI * 2;
  const balls = [];
  const c = [];

  let tick = 0;

  class Ball {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.color = random.pick(['#495F8C', '#F2E205', '#F2B705', '#F29F05', '#F25C05']);
      this.dx = 1;
      this.radius = 20;
      this.tick = 0;
    }

    draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fillStyle = this.color;
      context.fill();
      context.closePath();
    }

    update() {
      if (this.tick > 45 && this.radius > 0.5) {
        this.radius -= 0.5;
      }

      this.tick += 1;

      this.x += this.dx;
      this.y += this.dx;
      this.draw();
    }
  }

  function createCords(count, radius, array) {
    const angle = (Math.PI * 2) / count;
    for (let i = 0; i < count; i++) {
      array.push({
        x: radius * Math.cos(angle * i),
        y: radius * Math.sin(angle * i),
      });
    }
  }

  function init() {
    context.clearRect(0, 0, width, height);
    balls.length = 0;
    c.length = 0;
    tick = 0;
    for (let i = 0; i <= 30; i++) {
      balls.push(new Ball());
    }
    createCords(450, 200, c);
  }
  init();

  const countCircles = 9;
  const circleParts = 2;

  return {
    render(updatedProps) {
      ({ width, height } = updatedProps);

      tick += 1;

      context.translate(width / 2, height / 2);

      if (tick < 100) {
        context.save();
        context.rotate(tick);
        context.translate(c[tick % c.length].x + 30, c[tick % c.length].y - 0);

        for (let i = 25; i <= 30; i++) {
          context.save();
          context.rotate(
            (TWO_PI / circleParts) * (tick % circleParts) + (TWO_PI / countCircles) * i
          );
          balls[i].update();
          context.restore();
        }
        context.restore();

        for (let i = 0; i < 4; i++) {
          context.save();
          context.rotate((Math.PI / 2) * i);
          context.translate(c[tick % c.length].x - 170, c[tick % c.length].y - 0);

          for (let j = 0; j <= 5; j++) {
            context.save();
            context.rotate(
              (TWO_PI / circleParts) * (tick % circleParts) + (TWO_PI / countCircles) * (i * 6 + j)
            );
            balls[i * 6 + j].update();
            context.restore();
          }
          context.restore();
        }
      }
    },
    resize() {
      init();
    },
  };
};

function Canvas({ gui }) {
  useCanvas({ sketch: () => sketch({ gui }) });
  return '';
}

export default Canvas;
