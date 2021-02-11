import random from 'canvas-sketch-util/random'
import { lerp } from 'canvas-sketch-util/math'
import palettes from 'nice-color-palettes'

import setSketch from '../../utils/setSketch';
import getGui from '../../utils/getGui';

// random.setSeed(random.pick(['964335', '372336', '513468', '414867']))
random.setSeed(random.pick(['513468']))
const palette = random.pick(palettes);

const sketch = ({ context, width, height }) => {
  const balls = [];
  const opt = {
    radiusInc: 1.1,
    ballsCount: 700
  }

  function inRange(axis, start, end) {
    return axis > start && axis < end;
  }
 
  function Ball(x, y, dx, dy, radius) {
    this.x = lerp(radius, width - radius, x);
    this.y = lerp(radius, height - radius, y);
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = random.pick(palette.slice(0, 3));

    this.draw = function () {
      context.beginPath();
      context.arc(this.x, this.y, this.radius * opt.radiusInc, 0, Math.PI * 2, false);
      context.fillStyle = this.color;
      context.fill();
      context.closePath();
    };
    this.update = function () {
      const r = this.radius;
      if (!inRange(this.x, r, width - r)) this.dx = -this.dx;
      if (!inRange(this.y, r, height - r)) this.dy = -this.dy;

      this.x += this.dx;
      this.y += this.dy;
    };
    this.render = function () {
      this.draw();
      this.update();
    };
  }

  function createBalls() {
    for (let i = 0; i < opt.ballsCount; i++) {
      balls.push(
        new Ball(
          Math.random(),
          Math.random(),
          random.gaussian(0, 1) * 0.5,
          random.gaussian(0, 1) * 0.5,
          Math.abs(random.gaussian(0, 1)) * 14
        )
      );
    }
  }

  const gui = (gui) => {
    gui.add(opt, 'radiusInc').min(0.2).max(3).name('Radius')
    gui.add(opt, 'ballsCount').min(100).max(2000).name('Balls Count')
    .onChange(() => {
      balls.length = 0;
      createBalls();
    })
  };

  getGui(gui);

  createBalls();

  return (props) => {

    ({height, width} = props)
  
    context.fillStyle = '#000'
    context.clearRect(0, 0, width, height);
  
    balls.forEach((ball) => ball.render());
  };
};

export default setSketch(
  sketch,
  { animate: true }
);