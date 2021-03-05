import palettes from 'nice-color-palettes';
import random from 'canvas-sketch-util/random';
import { lerp } from 'canvas-sketch-util/math';

import useCanvas from '../../hooks/useCanvas';

random.setSeed(14);
const palette = random.pick(palettes);

const sketch = () => (initialProps) => {
  const { context } = initialProps;
  let { height, width } = initialProps;

  const particles = [];
  let alpha = 0.3;
  let angle = 0;
  class Particle {
    constructor({ x, y, radius, color }) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.random = random.range(-50, 50);
      this.resetXMarker = true;
      this.radiusMarker = true;
    }

    draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius + 1, 0, Math.PI * 2);
      context.shadowColor = this.color;
      context.shadowBlur = 10;
      context.fillStyle = this.color;
      context.fill();
      context.closePath();
    }

    render() {
      this.draw();

      const x0 = this.x === 0;
      const theta = Math.atan2(this.x, this.y);

      if (x0 && this.radiusMarker) {
        this.radius = +7;
        this.radiusMarker = false;
      }
      if (x0 && this.radius > 1) this.radius -= 0.03;

      this.x = (height / 2) * Math.sin(theta);
      this.y += 3;

      if (this.y > height / 2 + 120) {
        if (this.resetXMarker) {
          this.x = 0;
          this.y -= 2;
          this.resetXMarker = false;
        }
        this.x += this.random;
      }
    }
  }

  function getParticle(particleAngle, i, firstRender) {
    return new Particle({
      x: firstRender
        ? lerp(0, (height - 400) * Math.sin(particleAngle * i), 2)
        : lerp(0, Math.sin(angle * i), 2),
      y: firstRender ? lerp(0, (height - 400) * Math.cos(angle * i), 2) : 0,
      radius: Math.random() + 0.5,
      color: random.pick(palette),
    });
  }

  function getParticles(amount) {
    angle = (Math.PI * 2) / amount;

    for (let i = 0; i < amount; i++) {
      particles.push(getParticle(angle, i, true));
    }
  }

  getParticles(100);

  context.fillStyle = '#000';
  context.fillRect(0, 0, width, height);

  return (updatedProps) => {
    ({ width, height } = updatedProps);

    context.fillStyle = `rgba(10, 10, 10, ${alpha})`;
    context.fillRect(0, 0, width, height);

    if (alpha > 0.1 && alpha < 1) {
      alpha -= 0.06;
    } else if (alpha < 1) {
      alpha += 0.2;
    }

    context.save();
    context.translate(width / 2, 0);
    particles.forEach((particle, i) => {
      if (particle.y > height + 20) {
        particles.splice(i, 1, getParticle(angle, i));
      }
      particle.render();
    });
    context.restore();
  };
};

function Canvas({ gui }) {
  useCanvas({ sketch: () => sketch({ gui }) });
  return '';
}

export default Canvas;
