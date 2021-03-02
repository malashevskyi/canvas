import random from 'canvas-sketch-util/random';

import useCanvas from '../../hooks/useCanvas';

const sketch = () => (initialProps) => {
  const { context, canvas } = initialProps;
  let { height, width } = initialProps;

  const mouse = {
    x: null,
    y: null,
  };
  let widthHalf, heightHalf;
  const dots = [];

  class DrawCircle {
    constructor(x, y, radius = 2, color = 'rgba(0, 0, 0, 0.2)') {
      this.x = x;
      this.y = y;
      this.originalX = x;
      this.originalY = y;
      this.vx = 0;
      this.vy = 0;
      this.radius = radius;
      this.color = color;
      this.friction = 0.7;
      this.springFactor = 0.5;
      this.waveCount = 1;
      this.waveChange = 1;
    }

    render() {
      context.save();
      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }

    update() {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;

      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        const angle = Math.atan2(dy, dx);

        let tx = mouse.x + Math.cos(angle) * 50;
        let ty = mouse.y + Math.sin(angle) * 50;

        this.vx += (tx - this.x) / 8;
        this.vy += (ty - this.y) / 8;
      }

      if (this.waveCount === -130) this.waveChange = 1;
      this.waveCount += this.waveChange;
      if (this.waveCount === 130) this.waveChange = -1;

      this.x += random.gaussian(-1, 1) / 2 + (random.gaussian(-1, 1) * this.waveCount) / 250;
      this.y += random.gaussian(-1, 1) / 2 + (random.gaussian(-1, 1) * this.waveCount) / 250;

      this.animateCount++;

      let dx1 = -(this.x - this.originalX);
      let dy1 = -(this.y - this.originalY);

      this.vx += (dx1 * this.springFactor) / 2;
      this.vy += (dy1 * this.springFactor) / 2;

      this.vx *= this.friction;
      this.vy *= this.friction;

      this.x += this.vx;
      this.y += this.vy;
    }
  }

  function connectDots(dots) {
    context.beginPath();

    let pathSmall = new Path2D();
    let pathBig = new Path2D();

    for (let i = 0, l = dots.length; i <= l; i++) {
      let p0 = dots[i === l ? 0 : i];
      let p1 = dots[i + 1 >= l ? i + 1 - l : i + 1];

      pathSmall.quadraticCurveTo(p0.x, p0.y, (p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5);
      pathBig.quadraticCurveTo(
        p0.x - widthHalf,
        p0.y - heightHalf,
        (p0.x - widthHalf + p1.x - widthHalf) * 0.5,
        (p0.y - heightHalf + p1.y - heightHalf) * 0.5
      );
    }

    context.save();
    context.translate(width / 2, height / 2);
    context.scale(1.4, 1.4);
    context.fillStyle = 'yellow';
    context.rotate(1);
    context.fill(pathBig);
    context.restore();

    context.save();
    context.fillStyle = 'orange';
    context.fill(pathSmall);
    context.restore();
  }

  function getDots() {
    const count = 20;
    for (let i = 0; i < count; i++) {
      dots.push(
        new DrawCircle(
          widthHalf + 200 * Math.cos((i * Math.PI * 2) / count),
          heightHalf + 200 * Math.sin((i * Math.PI * 2) / count)
        )
      );
    }
  }

  function clearCanvas() {
    context.clearRect(0, 0, width, height);
    context.fillStyle = 'rgba(255, 255, 255, 1)';
    context.fillRect(0, 0, width, height);
  }

  function mouseMoveHandler(e) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
  }
  function touchMoveHandler(e) {
    e.preventDefault();
    mouse.x = e.changedTouches[0].clientX;
    mouse.y = e.changedTouches[0].clientY;
  }

  function getM(props) {
    ({ height, width } = props);
    widthHalf = width / 2;
    heightHalf = height / 2;
  }

  getDots();

  canvas.addEventListener('mousemove', mouseMoveHandler);
  canvas.addEventListener('touchmove', touchMoveHandler);

  return {
    render(updatedProps) {
      getM(updatedProps);

      clearCanvas();

      connectDots(dots);

      dots.forEach((circle) => {
        circle.update();
        circle.render(); // dots
      });
      new DrawCircle(mouse.x, mouse.y, 150, 'rgba(255, 0, 0, .05').render();
    },
    resize(updatedProps) {
      getM(updatedProps);
      if (context) {
        dots.length = 0;
        getDots();
      }
    },
  };
};

function Canvas({ gui }) {
  useCanvas({ sketch: () => sketch({ gui }) });
  return '';
}

export default Canvas;
