import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'

import setSketch from '../../utils/setSketch';

const sketch = ({ context, width, height }) => {
  random.setSeed(6)
  const palette = random.pick(palettes);
  let tick = 0;
  const balls = [];
  class Ball {
    constructor(angle) {
      this.x = 0;
      this.y = 0;
      this.angle = angle;
      this.color = random.pick(palette);
      this.radius = 1;
      this.dx = Math.cos(angle) / 2;
      this.dy = Math.sin(angle) / 2;
      this.tick = 0;
      this.start = true;
    }

    draw() {
      context.save();
      context.rotate(this.angle);
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fillStyle = this.color;
      context.closePath();
      context.fill();
      context.restore();
    }

    render() {
      this.tick++;
      if (this.radius < 15 && this.start) this.radius += 0.5;

      if (this.radius >= 15) this.start = false;

      if (this.tick > 80 && this.radius > 0.5) this.radius -= 0.5;

      this.x += this.dx;
      this.y += this.dy;
      this.dx += 0.1;
      this.dy += 0.1;
      this.draw();
    }
  }

  const angles = [];
  for (let i = 0; i < 200; i++) {
    angles.push(((Math.PI * 2) / 200) * i);
  }
 
  return (props) => {
    ({height, width} = props)
    tick++;

    if (balls.length < 300 && tick % 3 === 0) {
      balls.push(new Ball(random.pick(angles)));
    }
    console.log('balls', balls.length);

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.save(); 
    context.translate(width / 2, height / 2);
    balls.forEach((ball, i) => {
      let radius = 750;
      if (ball.x > radius || ball.y > radius || ball.x < -radius || ball.y < -radius) {
        balls.splice(i, 1, new Ball(random.pick(angles)));
      }
      ball.render();
    })
    context.restore();
  
  }
};

export default setSketch(
  sketch,
  { animate: true }
);